export type Risk = { id: string; name: string; count: number };

export const LLM_RISKS: Risk[] = [
  { id: 'LLM01', name: 'Prompt Injection',                 count: 53 },
  { id: 'LLM02', name: 'Sensitive Information Disclosure', count: 46 },
  { id: 'LLM03', name: 'Supply Chain',                     count: 19 },
  { id: 'LLM04', name: 'Data & Model Poisoning',           count: 13 },
  { id: 'LLM05', name: 'Improper Output Handling',         count: 18 },
  { id: 'LLM06', name: 'Excessive Agency',                 count: 51 },
  { id: 'LLM07', name: 'System Prompt Leakage',            count: 41 },
  { id: 'LLM08', name: 'Vector & Embedding Weaknesses',    count: 37 },
  { id: 'LLM09', name: 'Misinformation',                   count: 19 },
  { id: 'LLM10', name: 'Unbounded Consumption',            count: 8  },
];

export const ASI_RISKS: Risk[] = [
  { id: 'ASI01', name: 'Agent Goal Hijack',                  count: 53 },
  { id: 'ASI02', name: 'Tool Misuse & Exploitation',         count: 51 },
  { id: 'ASI03', name: 'Identity & Privilege Abuse',         count: 32 },
  { id: 'ASI04', name: 'Agentic Supply Chain Vulnerabilities', count: 41 },
  { id: 'ASI05', name: 'Unexpected Code Execution',          count: 25 },
  { id: 'ASI06', name: 'Memory & Context Poisoning',         count: 20 },
  { id: 'ASI07', name: 'Insecure Inter-Agent Communication', count: 26 },
  { id: 'ASI08', name: 'Cascading Failures',                 count: 16 },
  { id: 'ASI09', name: 'Human-Agent Trust Exploit',          count: 16 },
  { id: 'ASI10', name: 'Rogue Agents',                       count: 17 },
];

export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  {
    q: 'What criteria gate a tool into the directory?',
    a: 'Three: (1) addresses a real risk in the generative or agentic AI stack, (2) operational or near-operational (no vaporware), (3) offers capability not already covered. Discovery from OWASP WGs, conferences, practitioner networks, primary research. Duplicates without differentiation are excluded.',
  },
  {
    q: 'Free? Source-available?',
    a: 'MIT licensed. No login, no paywall, no sign-up wall. Source on GitHub — fork it, audit it, open a PR.',
  },
  {
    q: 'How much of this is AI-generated?',
    a: 'Discovery is practitioner-led. OWASP risk mappings use LLMs as an analytical engine — the schema and methodology are human-designed, every output validated against published standards. Human-directed analysis at scale, not crowd-sourced or model-hallucinated classification.',
  },
  {
    q: 'Who stands behind the assessments?',
    a: "Fabio Baumeler — CISSP, MSc Information Security (Royal Holloway, GCHQ-certified), Third-Party Cyber Risk Lead. Single-maintainer accountability — one expert's judgement, not vendor self-submission or crowd voting.",
  },
  {
    q: 'How fresh is the data?',
    a: 'Continuously updated as tools emerge and mature. Version tagged — currently v1.7.0, 161 tools. Every entry dated; re-reviewed on cadence.',
  },
  {
    q: 'Can I contribute?',
    a: 'Yes. Suggest a tool via GitHub issue template, report gaps, or open a PR against the YAML source. Vendor submissions welcome but held to the same evaluation bar.',
  },
];

export type HeroQuery = {
  q: string;
  filter: string;
  hits: number;
};

export const HERO_QUERIES: HeroQuery[] = [
  { q: 'tools for prompt injection in production',    filter: 'risk:LLM01 stage:production',     hits: 24 },
  { q: 'evaluate agentic tool misuse',                filter: 'risk:ASI02 category:evaluation',  hits: 11 },
  { q: 'supply chain scanners for model artefacts',   filter: 'risk:LLM03 stage:ci',             hits: 9  },
  { q: 'runtime guardrails with PII redaction',       filter: 'risk:LLM02 category:runtime',     hits: 18 },
];

export type PaletteResult = {
  name: string;
  desc: string;
  tags: string[];
  stage: string;
};

export const PALETTE_RESULTS: Record<string, PaletteResult[]> = {
  LLM01: [
    { name: 'PromptArmor',     desc: 'Runtime prompt-injection firewall',           tags: ['LLM01', 'LLM07'], stage: 'prod' },
    { name: 'Lakera Guard',    desc: 'Policy-based LLM input/output scanner',       tags: ['LLM01', 'LLM05'], stage: 'prod' },
    { name: 'NeMo Guardrails', desc: 'Programmable guardrails (Colang)',            tags: ['LLM01', 'LLM06'], stage: 'prod' },
    { name: 'Rebuff',          desc: 'Self-hardening prompt injection detector',    tags: ['LLM01'],          stage: 'prod' },
  ],
  ASI02: [
    { name: 'Invariant Labs', desc: 'Agent behaviour trace analysis',                tags: ['ASI02', 'ASI01'], stage: 'pre-prod' },
    { name: 'Patronus AI',    desc: 'Agentic eval harnesses',                        tags: ['ASI02', 'LLM09'], stage: 'pre-prod' },
    { name: 'Giskard',        desc: 'Test-suite generation for tool-using agents',   tags: ['ASI02'],          stage: 'pre-prod' },
  ],
  LLM03: [
    { name: 'Protect AI',  desc: 'ModelScan + scanning for unsafe serialization', tags: ['LLM03', 'LLM04'], stage: 'ci' },
    { name: 'HiddenLayer', desc: 'Model supply-chain threat intel',                tags: ['LLM03'],          stage: 'ci' },
    { name: 'Snyk for AI', desc: 'Dependency + artefact scanning',                 tags: ['LLM03'],          stage: 'ci' },
  ],
  LLM02: [
    { name: 'CalypsoAI',    desc: 'PII + secret redaction at gateway', tags: ['LLM02', 'LLM01'], stage: 'prod' },
    { name: 'Nightfall AI', desc: 'Inline DLP for LLM traffic',         tags: ['LLM02'],          stage: 'prod' },
    { name: 'Private AI',   desc: 'Pre-tokenisation PII removal',       tags: ['LLM02'],          stage: 'prod' },
  ],
};
