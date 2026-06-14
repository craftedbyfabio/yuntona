#!/usr/bin/env node
/**
 * scripts/setup-nl-model.mjs
 *
 * One-time setup: registers a Gemini-backed `nl_search_model` resource
 * on the Typesense cluster. Used by SearchPalette when the user submits
 * a sentence-length query — Typesense calls Gemini server-side to parse
 * the sentence into `filter_by` / `sort_by` / `q` parameters and runs
 * the resulting structured search.
 *
 * Idempotent — DELETE then POST. Safe to re-run after schema changes,
 * vocabulary tweaks, or model upgrades.
 *
 * Required env (all server-only — never reach the browser):
 *   TYPESENSE_HOST
 *   TYPESENSE_ADMIN_KEY
 *   GEMINI_API_KEY    (from https://aistudio.google.com/app/apikey)
 *
 * Run with: npm run setup:nl-model
 */

const MODEL_ID = 'gemini-nl-1';
const MODEL_NAME = 'google/gemini-2.5-flash';

const TS_HOST = process.env.TYPESENSE_HOST;
const TS_KEY = process.env.TYPESENSE_ADMIN_KEY;
const TS_PORT = parseInt(process.env.TYPESENSE_PORT ?? '443', 10);
const TS_PROTOCOL = process.env.TYPESENSE_PROTOCOL ?? 'https';
const GEMINI_KEY = process.env.GEMINI_API_KEY;

if (!TS_HOST || !TS_KEY) {
  console.error('[setup-nl-model] TYPESENSE_HOST / TYPESENSE_ADMIN_KEY missing');
  process.exit(1);
}
if (!GEMINI_KEY) {
  console.error('[setup-nl-model] GEMINI_API_KEY missing (get one at https://aistudio.google.com/app/apikey)');
  process.exit(1);
}

const TS_BASE = `${TS_PROTOCOL}://${TS_HOST}:${TS_PORT}`;

// Domain vocabulary the LLM should know about. Typesense auto-generates
// a baseline prompt from the schema facets; this appends Yuntona-specific
// mappings so phrases like "in production" or "supply chain" get parsed
// into the right filter_by expression instead of being guessed.
const systemPrompt = `You are parsing user search queries about AI security tools into Typesense filter expressions for the \`tools_v2\` collection.

Domain vocabulary — apply these mappings whenever the user uses these phrases:

Lifecycle stages (\`lifecycle_stages\` field, string array):
- "in production" / "prod" / "production" → lifecycle_stages:=[deploy, operate, monitor]
- "pre-prod" / "CI" / "CI/CD" / "before deploy" → lifecycle_stages:=[develop, build, test]
- "design phase" / "during development" → lifecycle_stages:=[scope, design, develop]
- "monitoring" / "runtime" → lifecycle_stages:=[operate, monitor]
- "incident" / "post-deploy" → lifecycle_stages:=[monitor, augment]

OWASP LLM risks (\`llm_risks\` field, string array of codes):
- "prompt injection" / "jailbreak" / "jailbreaking" → llm_risks:=LLM01
- "sensitive info" / "data leak" / "PII" / "PHI" / "redaction" → llm_risks:=LLM02
- "supply chain" / "model artefact" / "dependency" → llm_risks:=LLM03 (also see agentic ASI04)
- "data poisoning" / "model poisoning" / "training data attack" → llm_risks:=LLM04
- "output handling" / "XSS" / "SSRF" / "improper output" → llm_risks:=LLM05
- "excessive agency" / "over-permissioned" → llm_risks:=LLM06
- "system prompt leak" / "prompt extraction" → llm_risks:=LLM07
- "vector weakness" / "embedding attack" → llm_risks:=LLM08
- "misinformation" / "hallucination" / "factuality" → llm_risks:=LLM09
- "unbounded consumption" / "DOS" / "rate limit" / "cost attack" → llm_risks:=LLM10

OWASP Agentic risks (\`agentic_risks\` field, string array of codes):
- "agent goal hijack" / "hijacked agent" → agentic_risks:=ASI01
- "tool misuse" / "tool abuse" / "agent abuse" → agentic_risks:=ASI02
- "identity abuse" / "privilege abuse" → agentic_risks:=ASI03
- "agentic supply chain" → agentic_risks:=ASI04
- "code execution" / "RCE in agents" → agentic_risks:=ASI05
- "memory poisoning" / "context poisoning" → agentic_risks:=ASI06
- "inter-agent communication" → agentic_risks:=ASI07

Type / flavour:
- "agentic" / "agent" / "AI agent" → is_agentic:=true
- "generative" / "LLM only" / "non-agentic" → is_agentic:=false
- "open source" / "OSS" / "free-as-in-freedom" → is_open_source:=true
- "free" / "no cost" → pricing_name:=[Free, Freemium]
- "enterprise" / "commercial" / "paid" → pricing_name:=[Enterprise, Paid]

Categories (\`category_slug\` field):
- "red team" / "red teaming" / "adversarial testing" / "evaluation" → category_slug:=ai-red-teaming
- "guardrails" / "firewall" / "input filter" → category_slug:=ai-guardrails-and-firewalls
- "governance" / "standards" / "framework" → category_slug:=ai-governance-and-standards
- "MCP" / "model context protocol" → category_slug:=mcp-security
- "third-party risk" / "TPRM" / "vendor risk" → category_slug:=third-party-risk
- "identity" / "AppSec" / "authentication" → category_slug:=identity-and-appsec
- "compliance" → category_slug:=compliance-automation
- "code assistant" / "copilot" → category_slug:=ai-code-assistants
- "foundation model" → category_slug:=foundation-models
- "dev tools" / "tracing" / "observability" → category_slug:=ai-development-tools
- "education" / "research" → category_slug:=education-and-research

Combine multiple mappings with \`&&\` (AND). Use \`:=[a,b]\` for value OR within a single field. Leave \`q\` non-empty when there are still meaningful keywords (e.g. tool names or feature words like "scanner"); use \`q: *\` when the entire query is filter-able terms.`;

async function ts(method, path, body) {
  const res = await fetch(`${TS_BASE}${path}`, {
    method,
    headers: {
      'X-TYPESENSE-API-KEY': TS_KEY,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (res.status === 404 && method === 'DELETE') return null;
  if (!res.ok) {
    throw new Error(`${method} ${path} → ${res.status}: ${text}`);
  }
  return text ? JSON.parse(text) : null;
}

async function main() {
  console.log(`[setup-nl-model] Connecting to ${TS_BASE}`);

  console.log(`[setup-nl-model] Removing existing model '${MODEL_ID}' (if any) …`);
  await ts('DELETE', `/nl_search_models/${MODEL_ID}`);

  console.log(`[setup-nl-model] Registering ${MODEL_NAME} as '${MODEL_ID}' …`);
  const result = await ts('POST', '/nl_search_models', {
    id: MODEL_ID,
    model_name: MODEL_NAME,
    api_key: GEMINI_KEY,
    max_bytes: 16000,
    temperature: 0.0,
    system_prompt: systemPrompt,
  });

  console.log(`[setup-nl-model] ✓ Done`);
  console.log(`  id:         ${result.id}`);
  console.log(`  model_name: ${result.model_name}`);
  console.log(`  max_bytes:  ${result.max_bytes}`);
  console.log(`  temperature:${result.temperature ?? '0 (default)'}`);
  console.log('');
  console.log('Verify with:');
  console.log(`  curl -H "X-TYPESENSE-API-KEY: <admin>" ${TS_BASE}/nl_search_models/${MODEL_ID}`);
}

main().catch((err) => {
  console.error('[setup-nl-model] FAILED:', err.message);
  process.exit(1);
});
