// Shared data: OWASP risks with tool counts, FAQs, featured tools.
// Pulled directly from the existing landing page so numbers stay honest.

const LLM_RISKS = [
  { id: 'LLM01', name: 'Prompt Injection',               count: 53 },
  { id: 'LLM02', name: 'Sensitive Info Disclosure',      count: 46 },
  { id: 'LLM03', name: 'Supply Chain Vulnerabilities',   count: 19 },
  { id: 'LLM04', name: 'Data & Model Poisoning',         count: 13 },
  { id: 'LLM05', name: 'Improper Output Handling',       count: 18 },
  { id: 'LLM06', name: 'Excessive Agency',               count: 51 },
  { id: 'LLM07', name: 'System Prompt Leakage',          count: 41 },
  { id: 'LLM08', name: 'Vector & Embedding Weaknesses',  count: 37 },
  { id: 'LLM09', name: 'Misinformation',                 count: 19 },
  { id: 'LLM10', name: 'Unbounded Consumption',          count: 8  },
];

const ASI_RISKS = [
  { id: 'ASI01', name: 'Agent Goal Hijack',              count: 53 },
  { id: 'ASI02', name: 'Tool Misuse & Exploitation',     count: 51 },
  { id: 'ASI03', name: 'Identity & Privilege Abuse',     count: 32 },
  { id: 'ASI04', name: 'Agentic Supply Chain',           count: 41 },
  { id: 'ASI05', name: 'Unexpected Code Execution',      count: 25 },
  { id: 'ASI06', name: 'Memory & Context Poisoning',     count: 20 },
  { id: 'ASI07', name: 'Insecure Inter-Agent Comms',     count: 26 },
  { id: 'ASI08', name: 'Cascading Failures',             count: 16 },
  { id: 'ASI09', name: 'Human-Agent Trust Exploit',      count: 16 },
  { id: 'ASI10', name: 'Rogue Agents',                   count: 17 },
];

// Representative tools for the hero search preview — made up from realistic
// vendors the site already name-drops (PromptArmor, HiddenLayer, Patronus AI)
// plus common AI-sec categories. Purely for visual fidelity.
const SAMPLE_TOOLS = [
  { name: 'PromptArmor',      risks: ['LLM01','LLM07','ASI01'], category: 'Runtime guardrail',   stage: 'Production' },
  { name: 'HiddenLayer',      risks: ['LLM04','LLM03','ASI04'], category: 'Model threat defence', stage: 'Production' },
  { name: 'Patronus AI',      risks: ['LLM02','LLM09','LLM05'], category: 'Evaluation',           stage: 'Pre-prod' },
  { name: 'Lakera Guard',     risks: ['LLM01','LLM07'],         category: 'Runtime guardrail',   stage: 'Production' },
  { name: 'Protect AI',       risks: ['LLM03','LLM04'],         category: 'Supply chain',        stage: 'CI/CD' },
  { name: 'Robust Intelligence', risks: ['LLM04','LLM09','ASI06'], category: 'Evaluation',       stage: 'Pre-prod' },
  { name: 'CalypsoAI',        risks: ['LLM02','LLM01'],         category: 'Runtime guardrail',   stage: 'Production' },
  { name: 'NeMo Guardrails',  risks: ['LLM01','LLM05','LLM06'], category: 'Runtime guardrail',   stage: 'Production' },
];

const FAQS = [
  {
    q: 'What criteria gate a tool into the directory?',
    a: 'Three: (1) addresses a real risk in the generative or agentic AI stack, (2) operational or near-operational (no vaporware), (3) offers capability not already covered. Discovery from OWASP WGs, conferences, practitioner networks, primary research. Duplicates without differentiation are excluded.'
  },
  {
    q: 'Free? Source-available?',
    a: 'MIT licensed. No login, no paywall, no sign-up wall. Source on GitHub — fork it, audit it, open a PR.'
  },
  {
    q: 'How much of this is AI-generated?',
    a: 'Discovery is practitioner-led. OWASP risk mappings use LLMs as an analytical engine — the schema and methodology are human-designed, every output validated against published standards. Human-directed analysis at scale, not crowd-sourced or model-hallucinated classification.'
  },
  {
    q: 'Who stands behind the assessments?',
    a: 'Fabio Baumeler — CISSP, MSc Information Security (Royal Holloway, GCHQ-certified), Third-Party Cyber Risk Lead. Single-maintainer accountability — one expert\'s judgement, not vendor self-submission or crowd voting.'
  },
  {
    q: 'How fresh is the data?',
    a: 'Continuously updated as tools emerge and mature. Version tagged — currently v1.7.0, 161 tools. Every entry dated; re-reviewed on cadence.'
  },
  {
    q: 'Can I contribute?',
    a: 'Yes. Suggest a tool via GitHub issue template, report gaps, or open a PR against the YAML source. Vendor submissions welcome but held to the same evaluation bar.'
  },
];