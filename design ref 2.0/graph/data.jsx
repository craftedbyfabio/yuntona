// Mock graph data — small enough to render statically, shaped like the real thing.
// Stages × Tools × Risks. In production this comes from Supabase.

const STAGES = [
  { id:'plan',    label:'Plan',    n:11 },
  { id:'design',  label:'Design',  n:18 },
  { id:'develop', label:'Develop', n:42 },
  { id:'test',    label:'Test',    n:31 },
  { id:'deploy',  label:'Deploy',  n:22 },
  { id:'operate', label:'Operate', n:48 },
  { id:'monitor', label:'Monitor', n:39 },
  { id:'augment', label:'Augment', n:14 },
];

const LLM_RISKS = [
  { id:'LLM01', label:'Prompt Injection',           n:38 },
  { id:'LLM02', label:'Sensitive Info Disclosure',  n:24 },
  { id:'LLM03', label:'Supply Chain',               n:19 },
  { id:'LLM04', label:'Data & Model Poisoning',     n:14 },
  { id:'LLM05', label:'Improper Output Handling',   n:22 },
  { id:'LLM06', label:'Excessive Agency',           n:11 },
  { id:'LLM07', label:'System Prompt Leakage',      n:9  },
  { id:'LLM08', label:'Vector & Embedding Weak.',   n:13 },
  { id:'LLM09', label:'Misinformation',             n:7  },
  { id:'LLM10', label:'Unbounded Consumption',      n:16 },
];

const ASI_RISKS = [
  { id:'ASI01', label:'Agent Goal Hijack',                n:15 },
  { id:'ASI02', label:'Tool Misuse',                      n:21 },
  { id:'ASI03', label:'Identity & Privilege Abuse',       n:18 },
  { id:'ASI04', label:'Memory Tampering',                 n:9  },
  { id:'ASI05', label:'Unexpected Code Execution (RCE)',  n:12 },
  { id:'ASI06', label:'Unsafe Multi-Modal Inputs',        n:7  },
  { id:'ASI07', label:'Insecure Inter-Agent Comm.',       n:8  },
  { id:'ASI08', label:'Resource Overload & DoS',          n:11 },
  { id:'ASI09', label:'Untraceable Audit Trail',          n:14 },
  { id:'ASI10', label:'Cascading Hallucinations',         n:6  },
];

const CATEGORIES = [
  { id:'red-team',   label:'Red Teaming',          color:'#e85d75' },
  { id:'guardrails', label:'Guardrails',           color:'#c96442' },
  { id:'governance', label:'Governance',           color:'#7fb89f' },
  { id:'code-asst',  label:'Code Assistants',      color:'#5b9bd5' },
  { id:'compliance', label:'Compliance',           color:'#b18cd6' },
  { id:'foundation', label:'Foundation Models',    color:'#e8b75d' },
  { id:'identity',   label:'Identity & AppSec',    color:'#5dc8b8' },
  { id:'dev-tools',  label:'Development Tools',    color:'#7588a8' },
];

// Heatmap intersection counts (Stage × LLM Risk).
// Tuned to look realistic — Operate × Prompt Injection is densest.
const HEATMAP_LLM = {
  // stage:        LLM01 LLM02 LLM03 LLM04 LLM05 LLM06 LLM07 LLM08 LLM09 LLM10
  plan:    [  0,    1,    2,    1,    0,    0,    0,    0,    0,    0],
  design:  [  3,    4,    3,    2,    1,    1,    1,    2,    1,    1],
  develop: [  6,    5,    7,    3,    4,    2,    2,    3,    1,    2],
  test:    [ 11,    7,    4,    5,    8,    3,    4,    3,    2,    4],
  deploy:  [  8,    6,    3,    2,    5,    2,    1,    3,    1,    5],
  operate: [ 14,    9,    2,    1,    7,    4,    1,    2,    2,    8],
  monitor: [  9,    7,    1,    2,    4,    2,    1,    3,    3,    6],
  augment: [  4,    3,    1,    1,    2,    1,    0,    2,    1,    1],
};

// Sankey flows: from-stage → category → to-risk.
// Each row: [stageId, riskId, weight].
const SANKEY_FLOWS = [
  ['develop','LLM01', 8],['develop','LLM03', 7],['develop','LLM04', 5],
  ['test','LLM01', 11],['test','LLM05', 8],['test','LLM02', 6],['test','LLM10', 4],
  ['deploy','LLM01', 6],['deploy','LLM02', 5],['deploy','LLM10', 5],
  ['operate','LLM01', 14],['operate','LLM02', 9],['operate','LLM05', 7],['operate','LLM10', 8],['operate','LLM06', 4],
  ['monitor','LLM01', 9],['monitor','LLM02', 7],['monitor','LLM05', 4],['monitor','LLM10', 6],
  ['design','LLM03', 3],['design','LLM06', 2],
  ['plan','LLM03', 2],['plan','LLM02', 1],
  ['augment','LLM01', 4],['augment','LLM05', 2],
];

// Featured tools shown in the side panel on intersection click.
const SAMPLE_TOOLS = {
  'operate-LLM01': [
    { name:'Lakera Guard', cat:'guardrails', desc:'Runtime prompt-injection detection at the LLM gateway.' },
    { name:'Protect AI Recon', cat:'red-team', desc:'Continuous adversarial probing for production prompts.' },
    { name:'NVIDIA NeMo Guardrails', cat:'guardrails', desc:'Programmable guardrails for conversational LLM apps.' },
    { name:'Robust Intelligence AI Firewall', cat:'guardrails', desc:'Inline filtering for prompt injection + output abuse.' },
  ],
};

window.GraphData = {
  STAGES, LLM_RISKS, ASI_RISKS, CATEGORIES, HEATMAP_LLM, SANKEY_FLOWS, SAMPLE_TOOLS,
};
