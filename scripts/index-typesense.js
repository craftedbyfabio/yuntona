#!/usr/bin/env node
'use strict';

/**
 * index-typesense.js
 * Reads data/tools.json and indexes all tools into Typesense Cloud.
 * Run as part of Netlify build: node scripts/index-typesense.js
 *
 * Required environment variables:
 *   TYPESENSE_HOST       — cluster hostname (e.g. xyz123.a1.typesense.net)
 *   TYPESENSE_ADMIN_KEY  — admin API key (never expose client-side)
 *   TYPESENSE_PORT       — optional, defaults to 443
 *   TYPESENSE_PROTOCOL   — optional, defaults to https
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const HOST = process.env.TYPESENSE_HOST;
const API_KEY = process.env.TYPESENSE_ADMIN_KEY;
const PORT = parseInt(process.env.TYPESENSE_PORT || '443', 10);
const PROTOCOL = process.env.TYPESENSE_PROTOCOL || 'https';
const COLLECTION = 'tools';

if (!HOST || !API_KEY) {
  console.error('Missing TYPESENSE_HOST or TYPESENSE_ADMIN_KEY environment variables.');
  process.exit(1);
}

// --- HTTP helper (no external dependencies) ---
function typesenseRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: HOST,
      port: PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'X-TYPESENSE-API-KEY': API_KEY
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data ? JSON.parse(data) : {});
        } else if (res.statusCode === 404 && method === 'DELETE') {
          resolve({}); // Collection didn't exist, that's fine
        } else {
          reject(new Error(`${method} ${path} → ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// --- Collection schema ---
const schema = {
  name: COLLECTION,
  fields: [
    { name: 'name',           type: 'string' },
    { name: 'url',            type: 'string',   index: false },
    { name: 'category',       type: 'string',   facet: true },
    { name: 'desc',           type: 'string' },
    { name: 'riskRaw',        type: 'string',   facet: true, optional: true },
    { name: 'audience',       type: 'string',   facet: true },
    { name: 'tags',           type: 'string[]',  facet: true },
    { name: 'llm',            type: 'string[]',  facet: true },
    { name: 'stages',         type: 'string[]',  facet: true },
    { name: 'agentic',        type: 'bool',      facet: true },
    { name: 'complexity',     type: 'string',    facet: true, optional: true },
    { name: 'backWhat',       type: 'string' },
    { name: 'backSecurity',   type: 'string' },
    { name: 'backWhen',       type: 'string' }
  ],
  default_sorting_field: undefined
};

// --- Complexity tier logic (mirrors app.js assess/parseTier) ---
const TL = ['Plug & Play', 'Guided Setup', 'Expert Required', 'Enterprise Only'];
const TK = ['plug-and-play', 'guided-setup', 'expert-required', 'enterprise-only'];

function parseTier(override) {
  if (!override) return null;
  const idx = TL.indexOf(override);
  return idx !== -1 ? idx : null;
}

function assessComplexity(r) {
  // Simplified scoring — mirrors the logic in app.js
  const oi = parseTier(r.complexityOverride);
  if (oi !== null) return TL[oi];

  let s = 0;
  const cat = r.category || '';
  const risk = (r.riskRaw || '').toLowerCase();
  const tags = (r.tags || []).map(t => t.toLowerCase());
  const desc = (r.desc || '').toLowerCase();

  if (cat === 'AI Red Teaming') s = Math.max(s, 2);
  if (cat === 'Foundation Models') s = Math.max(s, 1);
  if (risk === 'high' || risk === 'critical') s = Math.max(s, 2);
  if (tags.includes('enterprise') || tags.includes('platform')) s = Math.max(s, 3);
  if (tags.includes('open source') || tags.includes('github')) s = Math.max(s, 1);
  if (tags.includes('saas') || tags.includes('browser')) s = Math.min(s, 1);
  if (desc.includes('plug') || desc.includes('no setup')) s = 0;
  if (desc.includes('enterprise') || desc.includes('procurement')) s = 3;

  return TL[Math.min(s, 3)];
}

// --- Main ---
async function main() {
  // Load tools
  const toolsPath = path.join(__dirname, '..', 'data', 'tools.json');
  const tools = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));
  console.log(`Loaded ${tools.length} tools from ${toolsPath}`);

  // Delete existing collection (clean re-index every deploy)
  console.log('Deleting existing collection (if any)...');
  await typesenseRequest('DELETE', `/collections/${COLLECTION}`);

  // Create collection
  console.log('Creating collection with schema...');
  await typesenseRequest('POST', '/collections', schema);

  // Prepare documents
  const docs = tools.map((t, i) => ({
    id: String(i),
    name: t.name,
    url: t.url,
    category: t.category,
    desc: t.desc,
    riskRaw: t.riskRaw || '',
    audience: t.audience || 'Builder',
    tags: t.tags || [],
    llm: t.llm || [],
    stages: t.stages || [],
    agentic: !!t.agentic,
    complexity: assessComplexity(t),
    backWhat: t.backWhat || '',
    backSecurity: t.backSecurity || '',
    backWhen: t.backWhen || ''
  }));

  // Bulk import using JSONL
  console.log(`Importing ${docs.length} documents...`);
  const jsonl = docs.map(d => JSON.stringify(d)).join('\n');

  const importResult = await new Promise((resolve, reject) => {
    const options = {
      hostname: HOST,
      port: PORT,
      path: `/collections/${COLLECTION}/documents/import?action=create`,
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'X-TYPESENSE-API-KEY': API_KEY
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const lines = data.trim().split('\n').map(l => JSON.parse(l));
        const failures = lines.filter(l => !l.success);
        resolve({ total: lines.length, failures });
      });
    });

    req.on('error', reject);
    req.write(jsonl);
    req.end();
  });

  if (importResult.failures.length > 0) {
    console.error(`${importResult.failures.length} import failures:`);
    importResult.failures.forEach(f => console.error(f));
    process.exit(1);
  }

  console.log(`✓ Indexed ${importResult.total} tools into Typesense (${HOST})`);
}

main().catch(err => {
  console.error('Indexing failed:', err.message);
  process.exit(1);
});
