#!/usr/bin/env node
/**
 * scripts/sync-typesense.mjs
 *
 * Build-time indexer for Typesense Cloud. Runs as `npm run sync:typesense`
 * (and via the `prebuild` hook on Netlify production builds).
 *
 * Reads `tool_full` from Supabase (anon, RLS-gated), maps each row to a
 * Typesense document, recreates the `tools_v2` collection from scratch,
 * bulk-imports via JSONL, and attaches the synonym set.
 *
 * Required env (all server-only):
 *   TYPESENSE_HOST       e.g. xyz123.a1.typesense.net
 *   TYPESENSE_ADMIN_KEY  admin/write key
 *   SUPABASE_URL
 *   SUPABASE_ANON_KEY
 *
 * Optional:
 *   TYPESENSE_PORT       defaults to 443
 *   TYPESENSE_PROTOCOL   defaults to https
 *
 * Skipped automatically when CONTEXT=deploy-preview (Netlify previews).
 * Skipped gracefully (exit 0) when TYPESENSE_* vars are unset, so
 * `npm run build` works locally for contributors without the secrets.
 */

import { createClient } from '@supabase/supabase-js';

const COLLECTION = 'tools_v2';
const SYNONYM_SET = 'tools-synonyms';
const EMBED_MODEL = 'ts/all-MiniLM-L12-v2';

// ─── Pre-flight ─────────────────────────────────────────────────────────────

if (process.env.CONTEXT === 'deploy-preview') {
  console.log('[sync-typesense] Skipping on deploy-preview');
  process.exit(0);
}

const TS_HOST = process.env.TYPESENSE_HOST;
const TS_KEY = process.env.TYPESENSE_ADMIN_KEY;
const TS_PORT = parseInt(process.env.TYPESENSE_PORT ?? '443', 10);
const TS_PROTOCOL = process.env.TYPESENSE_PROTOCOL ?? 'https';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

if (!TS_HOST || !TS_KEY) {
  console.log(
    '[sync-typesense] TYPESENSE_HOST / TYPESENSE_ADMIN_KEY not set — skipping indexing. Astro build will continue.',
  );
  process.exit(0);
}

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('[sync-typesense] SUPABASE_URL / SUPABASE_ANON_KEY missing');
  process.exit(1);
}

const TS_BASE = `${TS_PROTOCOL}://${TS_HOST}:${TS_PORT}`;

// ─── Helpers ────────────────────────────────────────────────────────────────

async function ts(method, path, body, { rawBody = false } = {}) {
  const headers = {
    'X-TYPESENSE-API-KEY': TS_KEY,
  };
  let payload;
  if (body !== undefined) {
    if (rawBody) {
      headers['Content-Type'] = 'text/plain';
      payload = body;
    } else {
      headers['Content-Type'] = 'application/json';
      payload = JSON.stringify(body);
    }
  }
  const res = await fetch(`${TS_BASE}${path}`, { method, headers, body: payload });
  const text = await res.text();
  if (res.status === 404 && method === 'DELETE') return null; // collection didn't exist
  if (!res.ok) {
    throw new Error(`${method} ${path} → ${res.status}: ${text}`);
  }
  return text ? (rawBody ? text : JSON.parse(text)) : null;
}

function ymOf(iso) {
  if (typeof iso !== 'string' || iso.length < 7) return '';
  return iso.slice(0, 7);
}

function asStringArray(v) {
  if (!Array.isArray(v)) return [];
  return v.map((x) => String(x)).filter((s) => s.length > 0);
}

// Same coercion as src/lib/queries.ts mapToolRow: null complexity → "Plug & Play"
function normalizeComplexity(name) {
  if (typeof name !== 'string' || name.trim().length === 0) return 'Plug & Play';
  return name;
}

function mapToolToDoc(row) {
  const name = row.name ?? '';
  const slug = row.slug ?? String(row.id ?? '');
  return {
    id: slug,
    slug,
    name,
    desc: row.description ?? '',
    url: row.url ?? '',
    category_name: row.category_name ?? '',
    category_slug: row.category_slug ?? '',
    complexity_name: normalizeComplexity(row.complexity_name),
    pricing_name: row.pricing_name ?? '',
    is_agentic: !!row.is_agentic,
    is_open_source: row.is_open_source === true,
    lifecycle_stages: asStringArray(row.lifecycle_stages),
    audiences: asStringArray(row.audiences),
    llm_risks: asStringArray(row.llm_risks),
    agentic_risks: asStringArray(row.agentic_risks),
    tags: asStringArray(row.tags),
    back_what: row.back_what ?? '',
    back_security: row.back_security ?? '',
    back_when: row.back_when ?? '',
    updated_ym: ymOf(row.updated_at),
    added_ym: ymOf(row.created_at),
    logo_domain: row.logo_domain ?? '',
    featured: row.featured ? 1 : 0,
  };
}

// ─── Schema ─────────────────────────────────────────────────────────────────

const schema = {
  name: COLLECTION,
  fields: [
    { name: 'slug',            type: 'string' },
    { name: 'name',            type: 'string' },
    { name: 'desc',            type: 'string' },
    { name: 'url',             type: 'string', optional: true },
    { name: 'category_name',   type: 'string',   facet: true, optional: true },
    { name: 'category_slug',   type: 'string',   facet: true, optional: true },
    { name: 'complexity_name', type: 'string',   facet: true, optional: true },
    { name: 'pricing_name',    type: 'string',   facet: true, optional: true },
    { name: 'is_agentic',      type: 'bool',     facet: true },
    { name: 'is_open_source',  type: 'bool',     facet: true, optional: true },
    { name: 'lifecycle_stages',type: 'string[]', facet: true, optional: true },
    { name: 'audiences',       type: 'string[]', facet: true, optional: true },
    { name: 'llm_risks',       type: 'string[]', facet: true, optional: true },
    { name: 'agentic_risks',   type: 'string[]', facet: true, optional: true },
    { name: 'tags',            type: 'string[]', facet: true, optional: true },
    { name: 'back_what',       type: 'string',   optional: true },
    { name: 'back_security',   type: 'string',   optional: true },
    { name: 'back_when',       type: 'string',   optional: true },
    { name: 'updated_ym',      type: 'string',   facet: true, optional: true },
    { name: 'added_ym',        type: 'string',   facet: true, optional: true },
    { name: 'logo_domain',     type: 'string',                optional: true },
    { name: 'featured',        type: 'int32' },
    {
      name: 'embedding',
      type: 'float[]',
      embed: {
        from: ['name', 'desc', 'back_what', 'back_security', 'back_when', 'tags'],
        model_config: { model_name: EMBED_MODEL },
      },
    },
  ],
  default_sorting_field: 'featured',
};

// ─── Synonyms (ported verbatim from archive/scripts/index-typesense.js) ────

const synonymItems = [
  { id: 'tprm',         synonyms: ['tprm', 'third-party risk', 'vendor risk', 'supply chain risk', 'third party'] },
  { id: 'injection',    synonyms: ['injection', 'prompt injection', 'jailbreak', 'jailbreaking'] },
  { id: 'guard',        synonyms: ['guardrails', 'guardrail', 'guard', 'firewall', 'llm firewall'] },
  { id: 'governance',   synonyms: ['governance', 'compliance', 'regulation', 'standard', 'policy', 'framework'] },
  { id: 'redteam',      synonyms: ['red team', 'red teaming', 'adversarial', 'pentesting', 'pentest'] },
  { id: 'identity',     synonyms: ['identity', 'iam', 'authentication', 'authorization', 'nhi', 'non-human identity'] },
  { id: 'observability',synonyms: ['observability', 'monitoring', 'tracing', 'logging'] },
  { id: 'agent',        synonyms: ['agent', 'agentic', 'agentic ai', 'ai agent'] },
  { id: 'codegen',      synonyms: ['code assistant', 'copilot', 'code generation', 'ai coding'] },
  { id: 'llm',          synonyms: ['llm', 'large language model', 'foundation model', 'language model'] },
  { id: 'spm',          synonyms: ['ai-spm', 'ai spm', 'security posture management', 'posture management'] },
];

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log(`[sync-typesense] Connecting to ${TS_BASE}`);

  // Pull active tools from Supabase
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });
  console.log('[sync-typesense] Querying Supabase tool_full where status=active …');
  const { data, error } = await supabase
    .from('tool_full')
    .select('*')
    .eq('status', 'active')
    .order('name', { ascending: true });
  if (error) {
    console.error('[sync-typesense] Supabase error:', error.message);
    process.exit(1);
  }
  const rows = data ?? [];
  console.log(`[sync-typesense] Got ${rows.length} active tools`);

  // Drop & recreate collection
  console.log(`[sync-typesense] Dropping existing collection '${COLLECTION}' (if any) …`);
  await ts('DELETE', `/collections/${COLLECTION}`);

  console.log(`[sync-typesense] Creating collection '${COLLECTION}' with auto-embedding (${EMBED_MODEL}) …`);
  await ts('POST', '/collections', schema);

  // Bulk import via JSONL
  const docs = rows.map(mapToolToDoc);
  const jsonl = docs.map((d) => JSON.stringify(d)).join('\n');
  console.log(`[sync-typesense] Importing ${docs.length} documents (action=create) …`);
  const importResultText = await ts(
    'POST',
    `/collections/${COLLECTION}/documents/import?action=create`,
    jsonl,
    { rawBody: true },
  );
  const lines = importResultText.trim().split('\n').map((l) => JSON.parse(l));
  const failures = lines.filter((l) => !l.success);
  if (failures.length > 0) {
    console.error(`[sync-typesense] ${failures.length} import failures:`);
    failures.slice(0, 5).forEach((f) => console.error(' ', JSON.stringify(f)));
    process.exit(1);
  }
  console.log(`[sync-typesense] ✓ Indexed ${lines.length} documents`);

  // Synonym set (PUT replaces; safe to re-run)
  console.log(`[sync-typesense] Writing synonym set '${SYNONYM_SET}' (${synonymItems.length} groups) …`);
  await ts('PUT', `/synonym_sets/${SYNONYM_SET}`, { items: synonymItems });

  // Link synonyms to collection
  console.log(`[sync-typesense] Linking synonyms to '${COLLECTION}' …`);
  await ts('PATCH', `/collections/${COLLECTION}`, { synonym_sets: [SYNONYM_SET] });

  console.log('[sync-typesense] ✓ Done');
}

main().catch((err) => {
  console.error('[sync-typesense] FAILED:', err.message);
  process.exit(1);
});
