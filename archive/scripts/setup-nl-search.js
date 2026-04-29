#!/usr/bin/env node
'use strict';

/**
 * setup-nl-search.js
 * One-time setup: registers a Gemini NL search model with Typesense Cloud.
 * Run once, then NL search is available for all queries.
 *
 * Usage:
 *   TYPESENSE_HOST=xyz.a1.typesense.net \
 *   TYPESENSE_ADMIN_KEY=your-admin-key \
 *   GEMINI_API_KEY=your-gemini-key \
 *   node scripts/setup-nl-search.js
 *
 * To get a Gemini API key: https://aistudio.google.com/app/apikey
 */

const https = require('https');

const HOST = process.env.TYPESENSE_HOST;
const API_KEY = process.env.TYPESENSE_ADMIN_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const PORT = parseInt(process.env.TYPESENSE_PORT || '443', 10);

if (!HOST || !API_KEY || !GEMINI_KEY) {
  console.error('Required env vars: TYPESENSE_HOST, TYPESENSE_ADMIN_KEY, GEMINI_API_KEY');
  process.exit(1);
}

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

const NL_MODEL_ID = 'yuntona-gemini';

const SYSTEM_PROMPT = `You are a search assistant for Yuntona, a curated database of AI security tools, frameworks, and standards.

The collection has these filterable fields:
- category (string): One of: "AI Guardrails & Firewalls", "AI Red Teaming", "AI Governance & Standards", "AI Identity & Access", "AI-SPM & Posture", "Third-Party Risk", "Compliance Automation", "AI Development Tools", "Foundation Models", "Agentic Frameworks"
- riskRaw (string): Risk level — "safe", "caution", "red-flag"
- audience (string): "CISO", "Builder", "Both"
- agentic (bool): true if the tool is related to agentic AI
- complexity (string): "Plug & Play", "Guided Setup", "Expert Required", "Enterprise Only"
- owaspLLM (string[]): OWASP LLM Top 10 2025 codes like "LLM01", "LLM02", ... "LLM10"
- owaspASI (string[]): OWASP Agentic Security Top 10 2026 codes like "ASI01", "ASI02", ... "ASI10"
- stages (string[]): LLMSecOps lifecycle stages like "Design", "Develop", "Deploy", "Operate", "Monitor"
- tags (string[]): Feature tags like "open source", "SaaS", "enterprise", "prompt injection", etc.

OWASP LLM Top 10 mapping:
LLM01=Prompt Injection, LLM02=Sensitive Information Disclosure, LLM03=Supply Chain Vulnerabilities,
LLM04=Data and Model Poisoning, LLM05=Improper Output Handling, LLM06=Excessive Agency,
LLM07=System Prompt Leakage, LLM08=Vector and Embedding Weaknesses, LLM09=Misinformation,
LLM10=Unbounded Consumption

OWASP Agentic Top 10 mapping:
ASI01=Excessive Agency & Privilege, ASI02=Insufficient Sandboxing, ASI03=Broken Trust Boundaries,
ASI04=Inadequate Guardrails, ASI05=Improper Multi-Agent Orchestration, ASI06=Unreliable Output Compliance,
ASI07=Data Leakage & Spillover, ASI08=Fragile Operational Resilience, ASI09=Logging & Audit Gaps,
ASI10=Uncontrolled Cascading Effects

Important rules:
- When users mention "prompt injection" or "injection", filter by owaspLLM:=LLM01
- When users mention "agentic" or "agent security", set agentic:=true
- When users say "safe" or "low risk", filter by riskRaw:=safe
- When users say "red flag" or "high risk", filter by riskRaw:=red-flag
- When users mention "CISO" or "security leader", filter by audience:=CISO
- When users mention "developer" or "builder", filter by audience:=Builder
- When users mention "easy" or "plug and play" or "simple", filter by complexity:=Plug & Play
- For OWASP references like "LLM01" or "ASI03", use the owaspLLM or owaspASI filter directly
- Prefer filtering over keyword search when the query maps clearly to structured fields`;

async function main() {
  // Check if model already exists
  console.log('Checking for existing NL search model...');
  try {
    const existing = await typesenseRequest('GET', `/nl_search_models/${NL_MODEL_ID}`);
    console.log(`Model "${NL_MODEL_ID}" already exists. Updating...`);
    await typesenseRequest('PUT', `/nl_search_models/${NL_MODEL_ID}`, {
      model_name: 'google/gemini-2.5-flash',
      api_key: GEMINI_KEY,
      max_bytes: 16000,
      temperature: 0.0,
      system_prompt: SYSTEM_PROMPT
    });
    console.log('✓ Updated NL search model');
  } catch (e) {
    if (e.message.includes('404')) {
      // Create new model
      console.log('Creating NL search model...');
      await typesenseRequest('POST', '/nl_search_models', {
        id: NL_MODEL_ID,
        model_name: 'google/gemini-2.5-flash',
        api_key: GEMINI_KEY,
        max_bytes: 16000,
        temperature: 0.0,
        system_prompt: SYSTEM_PROMPT
      });
      console.log('✓ Created NL search model: ' + NL_MODEL_ID);
    } else {
      throw e;
    }
  }

  // Verify
  const models = await typesenseRequest('GET', '/nl_search_models');
  console.log('\nRegistered NL search models:');
  (Array.isArray(models) ? models : [models]).forEach(m => {
    console.log(`  • ${m.id} (${m.model_name})`);
  });

  console.log('\n✓ NL Search is ready!');
  console.log('  Users can now type natural language queries like:');
  console.log('  "show me open source guardrails for prompt injection"');
  console.log('  "enterprise tools for agentic AI security"');
  console.log('  "safe tools a CISO can deploy quickly"');
}

main().catch(err => {
  console.error('Setup failed:', err.message);
  process.exit(1);
});
