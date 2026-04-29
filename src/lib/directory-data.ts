export type FacetEntry = readonly [id: string, name: string, count: number];

export const FACETS = {
  category: [
    ['runtime',  'Runtime guardrails',      38],
    ['eval',     'Evaluation & red team',   29],
    ['supply',   'Supply chain & SBOM',     17],
    ['gateway',  'AI gateway / proxy',      14],
    ['obs',      'Observability & tracing', 13],
    ['iam',      'Identity & access',       11],
    ['policy',   'Policy & governance',      9],
    ['scan',     'Model scanning',           7],
    ['dlp',      'DLP & redaction',          5],
    ['training', 'Training-time defences',   4],
    ['research', 'Research & datasets',      0],
  ] satisfies FacetEntry[],
  stage: [
    ['ideation', 'Ideation',       11],
    ['preprod',  'Pre-production', 41],
    ['ci',       'CI/CD',          24],
    ['prod',     'Production',     82],
    ['incident', 'Incident',       12],
  ] satisfies FacetEntry[],
  audience: [
    ['dev', 'Developer',         67],
    ['sec', 'Security engineer', 74],
    ['grc', 'GRC / Risk',        19],
    ['ops', 'MLOps',             42],
  ] satisfies FacetEntry[],
  complexity: [
    ['drop-in',  'Drop-in',     28],
    ['config',   'Configured',  51],
    ['integ',    'Integration', 54],
    ['platform', 'Platform',    14],
  ] satisfies FacetEntry[],
  pricing: [
    ['oss',        'Open source', 44],
    ['free',       'Free tier',   23],
    ['paid',       'Commercial',  61],
    ['enterprise', 'Enterprise',  19],
  ] satisfies FacetEntry[],
} as const;

export const LLM_TOP10: FacetEntry[] = [
  ['LLM01', 'Prompt Injection',                 53],
  ['LLM02', 'Sensitive Information Disclosure', 46],
  ['LLM03', 'Supply Chain',                     19],
  ['LLM04', 'Data & Model Poisoning',           13],
  ['LLM05', 'Improper Output Handling',         18],
  ['LLM06', 'Excessive Agency',                 51],
  ['LLM07', 'System Prompt Leakage',            41],
  ['LLM08', 'Vector & Embedding Weaknesses',    37],
  ['LLM09', 'Misinformation',                   19],
  ['LLM10', 'Unbounded Consumption',             8],
];

export const ASI_TOP10: FacetEntry[] = [
  ['ASI01', 'Agent Goal Hijack',                    53],
  ['ASI02', 'Tool Misuse & Exploitation',           51],
  ['ASI03', 'Identity & Privilege Abuse',           32],
  ['ASI04', 'Agentic Supply Chain Vulnerabilities', 41],
  ['ASI05', 'Unexpected Code Execution',            25],
  ['ASI06', 'Memory & Context Poisoning',           20],
  ['ASI07', 'Insecure Inter-Agent Communication',   26],
  ['ASI08', 'Cascading Failures',                   16],
  ['ASI09', 'Human-Agent Trust Exploit',            16],
  ['ASI10', 'Rogue Agents',                         17],
];

export type DirectoryTool = {
  id: string;
  name: string;
  cat: string;
  desc: string;
  risks: string[];
  stage: string;
  audience: string[];
  complexity: string | null;
  pricing: string | null;
  added: string;
  updated: string;
  stars?: string | null;
  glyph: string;
  glyphBg: string;
  // Optional rich fields populated from tool_full
  url?: string;
  catName?: string;
  pricingName?: string;
  complexityName?: string;
  isAgentic?: boolean;
  isOpenSource?: boolean | null;
  backWhat?: string;
  backSecurity?: string;
  backWhen?: string;
  llmRisks?: string[];
  agenticRisks?: string[];
  stages?: string[];
  tags?: string[];
  logoDomain?: string;
  numericId?: number;
};

export const FIXTURE_TOOLS: DirectoryTool[] = [
  { id:'mintmcp', name:'MintMCP', cat:'iam', desc:'Agent governance platform — hosted MCP gateway with access control, audit logging, and guardrails. Official Cursor partner. SOC 2 Type II certified.', risks:['LLM06','ASI01','ASI02','ASI04','ASI06','ASI08'], stage:'prod', audience:['sec','grc'], complexity:'platform', pricing:'enterprise', added:'2025-11-03', updated:'2026-04-17', glyph:'M', glyphBg:'#1f3b2a' },
  { id:'promptarmor', name:'PromptArmor', cat:'runtime', desc:'Runtime prompt-injection firewall for LLM applications. Policy-based classifier deployed at the gateway, with audit trails and bypass metrics.', risks:['LLM01','LLM07','ASI01','ASI02'], stage:'prod', audience:['sec','dev'], complexity:'integ', pricing:'paid', added:'2024-11', updated:'2026-03', stars:null, glyph:'PA', glyphBg:'#1e2a3b' },
  { id:'hiddenlayer', name:'HiddenLayer', cat:'scan', desc:'Model supply-chain threat intel and adversarial ML scanning for model artefacts before deployment.', risks:['LLM03','LLM04','ASI04'], stage:'ci', audience:['sec','ops'], complexity:'integ', pricing:'enterprise', added:'2024-06', updated:'2026-02', glyph:'HL', glyphBg:'#2a1f3b' },
  { id:'lakera', name:'Lakera Guard', cat:'runtime', desc:'SaaS guardrail for LLM input/output — policy DSL, content filters, PII detection, jailbreak classification.', risks:['LLM01','LLM02','LLM05','LLM07'], stage:'prod', audience:['dev','sec'], complexity:'drop-in', pricing:'paid', added:'2024-02', updated:'2026-04', glyph:'LK', glyphBg:'#2a3b1f' },
  { id:'nemo', name:'NeMo Guardrails', cat:'runtime', desc:'Programmable guardrails via Colang DSL. Dialogue-level rails, tool-use policies, grounding on retrieval sources.', risks:['LLM01','LLM05','LLM06','LLM09'], stage:'prod', audience:['dev'], complexity:'config', pricing:'oss', added:'2023-08', updated:'2026-03', stars:'4.2k', glyph:'N', glyphBg:'#3b2f1f' },
  { id:'patronus', name:'Patronus AI', cat:'eval', desc:'Automated evaluation harnesses for LLM and agent systems. Hallucination, safety, factuality, task-success scoring.', risks:['LLM02','LLM09','LLM05','ASI02'], stage:'preprod', audience:['ops','sec'], complexity:'integ', pricing:'paid', added:'2024-05', updated:'2026-04', glyph:'P', glyphBg:'#3b1f2a' },
  { id:'robust', name:'Robust Intelligence', cat:'eval', desc:'Continuous AI validation platform — adversarial testing, drift, and bias across model lifecycle.', risks:['LLM04','LLM09','ASI06'], stage:'preprod', audience:['sec','ops','grc'], complexity:'platform', pricing:'enterprise', added:'2023-02', updated:'2026-01', glyph:'RI', glyphBg:'#1f3b2a' },
  { id:'protectai', name:'Protect AI', cat:'supply', desc:'ModelScan + Guardian — detect unsafe serialisation, backdoored weights, insecure Jupyter patterns. CI-native.', risks:['LLM03','LLM04'], stage:'ci', audience:['ops','sec'], complexity:'integ', pricing:'paid', added:'2023-10', updated:'2026-02', glyph:'PR', glyphBg:'#1e3b3b' },
  { id:'calypso', name:'CalypsoAI', cat:'gateway', desc:'Enterprise AI gateway — per-user policies, audit trails, redaction, usage controls across model providers.', risks:['LLM02','LLM01','LLM10'], stage:'prod', audience:['sec','grc'], complexity:'platform', pricing:'enterprise', added:'2024-01', updated:'2026-03', glyph:'CA', glyphBg:'#2a2a3b' },
  { id:'rebuff', name:'Rebuff', cat:'runtime', desc:'Self-hardening prompt-injection detector. Heuristics + vector DB of known attacks + LLM judge + canary tokens.', risks:['LLM01','LLM07'], stage:'prod', audience:['dev'], complexity:'config', pricing:'oss', added:'2023-05', updated:'2025-11', stars:'1.1k', glyph:'R', glyphBg:'#3b1f1f' },
  { id:'invariant', name:'Invariant Labs', cat:'obs', desc:'Agent trace analysis — detect tool misuse, policy violations, and goal hijack in production traces.', risks:['ASI01','ASI02','ASI06'], stage:'prod', audience:['sec','ops'], complexity:'integ', pricing:'paid', added:'2025-01', updated:'2026-04', glyph:'IL', glyphBg:'#1f2a3b' },
  { id:'giskard', name:'Giskard', cat:'eval', desc:'Open-source test-suite generation for LLMs and agents. Scan-style reports with actionable findings.', risks:['LLM09','LLM05','ASI02'], stage:'preprod', audience:['dev','ops'], complexity:'config', pricing:'oss', added:'2023-04', updated:'2026-02', stars:'4.8k', glyph:'G', glyphBg:'#2a3b2a' },
  { id:'garak', name:'garak', cat:'eval', desc:'LLM vulnerability scanner — probes for jailbreaks, leakage, toxicity, hallucination with ~120 detectors.', risks:['LLM01','LLM02','LLM07','LLM09'], stage:'preprod', audience:['sec'], complexity:'drop-in', pricing:'oss', added:'2023-11', updated:'2026-03', stars:'3.6k', glyph:'ga', glyphBg:'#3b3b1f' },
  { id:'snyk', name:'Snyk for AI', cat:'supply', desc:'Dependency and artefact scanning extended to ML packages — PyTorch, TF, HF hub references.', risks:['LLM03'], stage:'ci', audience:['dev','ops'], complexity:'drop-in', pricing:'paid', added:'2024-09', updated:'2026-01', glyph:'SN', glyphBg:'#2a1e3b' },
  { id:'private-ai', name:'Private AI', cat:'dlp', desc:'Pre-tokenisation PII detection and reversible redaction for training data and inference requests.', risks:['LLM02'], stage:'prod', audience:['sec','grc'], complexity:'integ', pricing:'paid', added:'2024-03', updated:'2026-02', glyph:'PI', glyphBg:'#1f3b3b' },
  { id:'nightfall', name:'Nightfall AI', cat:'dlp', desc:'Inline DLP for LLM traffic — SOC2 / HIPAA tuned policies, quarantine, and human-review flows.', risks:['LLM02','LLM05'], stage:'prod', audience:['sec','grc'], complexity:'integ', pricing:'paid', added:'2024-02', updated:'2026-01', glyph:'NF', glyphBg:'#3b2a1f' },
  { id:'purple', name:'PurpleLlama', cat:'eval', desc:"Meta's open toolkit — Llama Guard, CyberSecEval, Prompt Guard for benchmark-style evals.", risks:['LLM01','LLM02','LLM05'], stage:'preprod', audience:['sec','dev'], complexity:'config', pricing:'oss', added:'2024-04', updated:'2026-02', stars:'5.3k', glyph:'PL', glyphBg:'#2a1f3b' },
  { id:'langfuse', name:'Langfuse Guardrails', cat:'obs', desc:'Open-source LLM observability with inline guardrail hooks — traces, evals, datasets, prompts.', risks:['LLM01','LLM06','LLM10'], stage:'prod', audience:['dev','ops'], complexity:'config', pricing:'oss', added:'2024-07', updated:'2026-03', stars:'9.1k', glyph:'LF', glyphBg:'#1e3b2a' },
  { id:'credal', name:'Credal.ai', cat:'gateway', desc:'Enterprise AI gateway with data-source permissioning — access controls propagated through the LLM boundary.', risks:['LLM02','ASI03'], stage:'prod', audience:['sec','grc'], complexity:'platform', pricing:'enterprise', added:'2024-06', updated:'2026-03', glyph:'CR', glyphBg:'#3b1f2a' },
  { id:'straiker', name:'Straiker', cat:'runtime', desc:'Agentic runtime defence — per-action authorisation, blast-radius limits, and rollback playbooks.', risks:['ASI01','ASI02','ASI05','ASI08'], stage:'prod', audience:['sec','ops'], complexity:'integ', pricing:'paid', added:'2025-03', updated:'2026-04', glyph:'ST', glyphBg:'#2a2a1f' },
  { id:'cai', name:'CyberSecEval', cat:'eval', desc:'Static and dynamic benchmark for cyber-risk capability of code-generating LLMs.', risks:['LLM05','LLM06'], stage:'preprod', audience:['sec'], complexity:'drop-in', pricing:'oss', added:'2024-01', updated:'2025-12', glyph:'CE', glyphBg:'#1f2a1e' },
  { id:'mlflow-sec', name:'MLflow Guardian', cat:'policy', desc:'Policy engine for MLflow — attach approval workflows, signed model provenance, and region controls.', risks:['LLM03','LLM04','ASI04'], stage:'ci', audience:['ops','grc'], complexity:'integ', pricing:'paid', added:'2025-02', updated:'2026-03', glyph:'MF', glyphBg:'#3b2a2a' },
  { id:'agenta', name:'Agenta Shield', cat:'iam', desc:'Identity-aware access control for agents — short-lived tool credentials, audit of delegated actions.', risks:['ASI03','ASI07','ASI10'], stage:'prod', audience:['sec','ops'], complexity:'integ', pricing:'paid', added:'2025-05', updated:'2026-04', glyph:'AG', glyphBg:'#1f2a3b' },
];
