import { LLM_TOP10, ASI_TOP10, type DirectoryTool } from './directory-data';

export type Stage = { id: string; label: string; count: number };
export type Risk = { id: string; label: string; count: number };
export type Category = { id: string; label: string; color: string; count: number };

export type ToolNode = {
  id: string;
  name: string;
  desc: string;
  cat: string;
  stages: string[];
  risks: string[];
};

export type SankeyFlow = readonly [stage: string, risk: string, weight: number];

export type GraphData = {
  stages: Stage[];
  llmRisks: Risk[];
  asiRisks: Risk[];
  categories: Category[];
  heatmapLLM: number[][];
  heatmapASI: number[][];
  sankeyLLM: SankeyFlow[];
  sankeyASI: SankeyFlow[];
  toolNodes: ToolNode[];
};

const STAGE_ORDER = [
  'plan',
  'scope',
  'govern',
  'develop',
  'build',
  'test',
  'deploy',
  'release',
  'operate',
  'monitor',
  'augment',
];

const STAGE_LABELS: Record<string, string> = {
  plan:    'Plan',
  scope:   'Scope',
  govern:  'Govern',
  develop: 'Develop',
  build:   'Build',
  test:    'Test',
  deploy:  'Deploy',
  release: 'Release',
  operate: 'Operate',
  monitor: 'Monitor',
  augment: 'Augment',
};

const CATEGORY_COLORS: Record<string, string> = {
  'ai-red-teaming':              '#e85d75',
  'ai-guardrails-and-firewalls': '#c96442',
  'ai-governance-and-standards': '#7fb89f',
  'ai-code-assistants':          '#5b9bd5',
  'compliance-automation':       '#b18cd6',
  'foundation-models':           '#e8b75d',
  'identity-and-appsec':         '#5dc8b8',
  'ai-development-tools':        '#7588a8',
  'third-party-risk':            '#9988c9',
  'education-and-research':      '#e0a963',
  'mcp-security':                '#7fb8aa',
};

function fallbackColor(slug: string): string {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  const palette = ['#e85d75', '#c96442', '#7fb89f', '#5b9bd5', '#b18cd6', '#e8b75d', '#5dc8b8', '#7588a8'];
  return palette[Math.abs(h) % palette.length];
}

export function buildGraphData(tools: DirectoryTool[]): GraphData {
  // STAGES — distinct values, sorted by lifecycle order, count = number of tools mapping to each.
  const stageCounts = new Map<string, number>();
  for (const t of tools) {
    const stages = (t.stages && t.stages.length > 0 ? t.stages : t.stage ? [t.stage] : []);
    for (const s of stages) stageCounts.set(s, (stageCounts.get(s) ?? 0) + 1);
  }
  const stages: Stage[] = STAGE_ORDER
    .filter((s) => stageCounts.has(s))
    .map((s) => ({ id: s, label: STAGE_LABELS[s] ?? s, count: stageCounts.get(s) ?? 0 }));
  // Append any unknown stages we didn't anticipate, alphabetised.
  for (const s of [...stageCounts.keys()].sort()) {
    if (!STAGE_ORDER.includes(s)) {
      stages.push({ id: s, label: s.charAt(0).toUpperCase() + s.slice(1), count: stageCounts.get(s) ?? 0 });
    }
  }

  // RISKS — fixed order from canonical lists; count = tools mapping to each.
  const llmCounts = new Map<string, number>();
  const asiCounts = new Map<string, number>();
  for (const t of tools) {
    for (const r of t.llmRisks ?? []) llmCounts.set(r, (llmCounts.get(r) ?? 0) + 1);
    for (const r of t.agenticRisks ?? []) asiCounts.set(r, (asiCounts.get(r) ?? 0) + 1);
  }
  const llmRisks: Risk[] = LLM_TOP10.map(([id, label]) => ({ id, label, count: llmCounts.get(id) ?? 0 }));
  const asiRisks: Risk[] = ASI_TOP10.map(([id, label]) => ({ id, label, count: asiCounts.get(id) ?? 0 }));

  // CATEGORIES — distinct slugs, count, color from CATEGORY_COLORS or fallback.
  const catMap = new Map<string, { label: string; count: number }>();
  for (const t of tools) {
    if (!t.cat) continue;
    const e = catMap.get(t.cat);
    if (e) e.count++;
    else catMap.set(t.cat, { label: t.catName ?? t.cat, count: 1 });
  }
  const categories: Category[] = [...catMap.entries()]
    .map(([id, { label, count }]) => ({
      id,
      label,
      color: CATEGORY_COLORS[id] ?? fallbackColor(id),
      count,
    }))
    .sort((a, b) => b.count - a.count);

  // HEATMAP MATRICES — [stages.length][10] (10 risks per standard).
  const stageIdx = new Map(stages.map((s, i) => [s.id, i]));
  const llmIdx = new Map(LLM_TOP10.map(([id], i) => [id, i]));
  const asiIdx = new Map(ASI_TOP10.map(([id], i) => [id, i]));

  const heatmapLLM: number[][] = stages.map(() => Array.from({ length: LLM_TOP10.length }, () => 0));
  const heatmapASI: number[][] = stages.map(() => Array.from({ length: ASI_TOP10.length }, () => 0));

  for (const t of tools) {
    const tStages = t.stages && t.stages.length > 0 ? t.stages : t.stage ? [t.stage] : [];
    for (const s of tStages) {
      const si = stageIdx.get(s);
      if (si === undefined) continue;
      for (const r of t.llmRisks ?? []) {
        const ri = llmIdx.get(r);
        if (ri !== undefined) heatmapLLM[si][ri]++;
      }
      for (const r of t.agenticRisks ?? []) {
        const ri = asiIdx.get(r);
        if (ri !== undefined) heatmapASI[si][ri]++;
      }
    }
  }

  // SANKEY FLOWS — flatten heatmap into (stage, risk, count) tuples, drop zeros.
  const sankeyLLM: SankeyFlow[] = [];
  const sankeyASI: SankeyFlow[] = [];
  for (let si = 0; si < stages.length; si++) {
    for (let ri = 0; ri < LLM_TOP10.length; ri++) {
      const w = heatmapLLM[si][ri];
      if (w > 0) sankeyLLM.push([stages[si].id, LLM_TOP10[ri][0], w]);
    }
    for (let ri = 0; ri < ASI_TOP10.length; ri++) {
      const w = heatmapASI[si][ri];
      if (w > 0) sankeyASI.push([stages[si].id, ASI_TOP10[ri][0], w]);
    }
  }

  // TOOL NODES — one per tool, with raw stages + risks for layout positioning.
  const toolNodes: ToolNode[] = tools.map((t) => ({
    id: t.id,
    name: t.name,
    desc: t.desc,
    cat: t.cat,
    stages: t.stages && t.stages.length > 0 ? t.stages : t.stage ? [t.stage] : [],
    risks: t.risks ?? [],
  }));

  return {
    stages,
    llmRisks,
    asiRisks,
    categories,
    heatmapLLM,
    heatmapASI,
    sankeyLLM,
    sankeyASI,
    toolNodes,
  };
}
