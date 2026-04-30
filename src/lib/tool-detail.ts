import { FACETS, LLM_TOP10, ASI_TOP10, FIXTURE_TOOLS, type DirectoryTool } from './directory-data';

export type RiskTuple = readonly [code: string, name: string];

export type ActivityType = 'release' | 'announcement' | 'audit' | 'mention' | string;

export type ActivityItem = {
  date: string;
  type: ActivityType;
  title: string;
  source: string;
};

export type Section = {
  n: string;
  k: string;
  p: string[];
};

export type RelatedRef = {
  id: string;
  name: string;
  cat: string;
  glyph: string;
  bg: string;
  desc: string;
};

export type ToolDetail = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  type: 'Agentic' | 'Generative' | 'Mixed';
  reviewed: string;
  added: string;
  updated: string;
  url?: string;
  links: { website: string; twitter?: string; linkedin?: string };
  glyph: string;
  glyphBg: string;
  glyphAccent: string;
  certs: string[];
  sections: Section[];
  glance: {
    complexity: string;
    pricing: string;
    audience: string;
    lifecycle: string[];
    tags: string[];
  };
  risks: { LLM: RiskTuple[]; ASI: RiskTuple[] };
  related: RelatedRef[];
  activity: ActivityItem[];
};

const lookup = (entries: ReadonlyArray<readonly [string, string, number]>, k: string, fb: string) =>
  entries.find((e) => e[0] === k)?.[1] ?? fb;

const MINTMCP_FIXTURE: ToolDetail = {
  slug: 'mintmcp',
  name: 'MintMCP',
  tagline: 'Agent governance platform — hosted MCP gateway with access control, audit logging, and guardrails. Official Cursor partner. SOC 2 Type II certified.',
  category: 'MCP Security',
  type: 'Agentic',
  reviewed: '2026-04-17',
  added: '2025-11-03',
  updated: '2026-04-17',
  url: 'mintmcp.com',
  links: { website: 'https://mintmcp.com' },
  glyph: 'M',
  glyphBg: '#1f3b2a',
  glyphAccent: '#7fb8aa',
  certs: ['SOC 2 Type II'],
  sections: [
    {
      n: '01',
      k: 'What it does',
      p: [
        'MCP governance platform that lets enterprises deploy Claude, Cursor, and other AI agents with centralised control. Hosts 10,000+ MCP servers with enterprise authentication (SSO via SAML/OIDC), granular access controls per tool/dataset/action, and real-time activity monitoring.',
        'The MintMCP Gateway provides pre-configured MCP servers with one-click deployment, custom MCP registries, and role-based endpoints. The Agent Monitor traces tool calls, commands, and file access in real time.',
        'Official Cursor partner (announced on Cursor blog). SOC 2 Type II certified. Customers include Coursera CTO.',
      ],
    },
    {
      n: '02',
      k: 'Security relevance',
      p: [
        'Provides the governance layer missing from raw MCP deployments: centralised credential management, audit-ready compliance logs with full data access trails, and intelligent guardrails that detect and block risky agent actions.',
        'The MCP Gateway enforces least-privilege per role — engineers get different tool access than data scientists. Activity monitoring enables detection of shadow MCP usage and unauthorised tool invocations.',
      ],
    },
    {
      n: '03',
      k: 'When to use it',
      p: [
        'Use when rolling out AI coding agents (Cursor, Claude) to teams beyond early adopters. The governance gap hits when you move from 5 developers using MCP informally to 50+ across an organisation.',
        'MintMCP provides the admin layer — who can use which tools, what data flows through, and who approved it. SaaS deployment, no infrastructure to manage.',
      ],
    },
  ],
  glance: {
    complexity: 'Enterprise only',
    pricing: 'Commercial',
    audience: 'CISO · Platform eng',
    lifecycle: ['Deploy', 'Monitor'],
    tags: ['MCP Security', 'Governance', 'Agent Security', 'SaaS', 'Commercial'],
  },
  risks: {
    LLM: [['LLM06', 'Excessive Agency']],
    ASI: [
      ['ASI01', 'Agent Goal Hijack'],
      ['ASI02', 'Tool Misuse & Exploitation'],
      ['ASI04', 'Agentic Supply Chain'],
      ['ASI06', 'Memory & Context Poisoning'],
      ['ASI08', 'Cascading Failures'],
    ],
  },
  // related[] is filled at call time from live getRelatedTools() — no hardcoded slugs.
  related: [],
  // activity[] stays empty until tool_news is wired to Supabase (deferred).
  activity: [],
};

function partitionRisks(risks: string[]): { LLM: RiskTuple[]; ASI: RiskTuple[] } {
  const LLM: RiskTuple[] = [];
  const ASI: RiskTuple[] = [];
  for (const r of risks) {
    if (r.startsWith('LLM')) {
      const found = LLM_TOP10.find((x) => x[0] === r);
      LLM.push([r, found?.[1] ?? r]);
    } else if (r.startsWith('ASI')) {
      const found = ASI_TOP10.find((x) => x[0] === r);
      ASI.push([r, found?.[1] ?? r]);
    }
  }
  return { LLM, ASI };
}

function mapRelated(relatedTools: DirectoryTool[]): RelatedRef[] {
  return relatedTools.slice(0, 3).map((r) => ({
    id: r.id,
    name: r.name,
    cat: r.catName ?? lookup(FACETS.category, r.cat, r.cat),
    glyph: r.glyph,
    bg: r.glyphBg,
    desc: r.desc,
  }));
}

export function deriveToolDetail(t: DirectoryTool, relatedTools: DirectoryTool[]): ToolDetail {
  if (t.id === 'mintmcp') {
    return { ...MINTMCP_FIXTURE, related: mapRelated(relatedTools) };
  }

  const llmCodes = t.llmRisks ?? t.risks.filter((r) => r.startsWith('LLM'));
  const asiCodes = t.agenticRisks ?? t.risks.filter((r) => r.startsWith('ASI'));
  const isAgentic = t.isAgentic ?? asiCodes.length > 0;
  const hasBoth = llmCodes.length > 0 && asiCodes.length > 0;
  const type: 'Agentic' | 'Generative' | 'Mixed' = hasBoth ? 'Mixed' : isAgentic ? 'Agentic' : 'Generative';

  const categoryLabel = t.catName ?? lookup(FACETS.category, t.cat, t.cat);
  const stageLabel = lookup(FACETS.stage, t.stage, t.stage);
  const pricingLabel = t.pricingName ?? lookup(FACETS.pricing, t.pricing ?? '', t.pricing ?? '');
  const complexityLabel = t.complexityName ?? lookup(FACETS.complexity, t.complexity ?? '', t.complexity ?? '');
  const audienceLabels = t.audience.map((a) => lookup(FACETS.audience, a, a));

  const sections: Section[] = [];
  let n = 1;
  const pad = () => String(n++).padStart(2, '0');

  if (t.backWhat) sections.push({ n: pad(), k: 'What it does',         p: [t.backWhat] });
  else if (t.desc) sections.push({ n: pad(), k: 'What it does',        p: [t.desc] });

  if (t.backSecurity) sections.push({ n: pad(), k: 'Security relevance', p: [t.backSecurity] });

  if (t.backWhen) sections.push({ n: pad(), k: 'When to use it', p: [t.backWhen] });
  else sections.push({
    n: pad(),
    k: 'When to use it',
    p: [
      `Targeted at ${audienceLabels.join(' and ').toLowerCase() || 'security and engineering teams'} during the ${stageLabel.toLowerCase()} stage of the AI lifecycle.`,
    ],
  });

  const websiteUrl = t.url ?? '#';
  const websiteDisplay = t.url ? t.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : undefined;

  const partitionedLLM: RiskTuple[] = llmCodes.map((r) => {
    const found = LLM_TOP10.find((x) => x[0] === r);
    return [r, found?.[1] ?? r];
  });
  const partitionedASI: RiskTuple[] = asiCodes.map((r) => {
    const found = ASI_TOP10.find((x) => x[0] === r);
    return [r, found?.[1] ?? r];
  });

  return {
    slug: t.id,
    name: t.name,
    tagline: t.desc,
    category: categoryLabel,
    type,
    reviewed: t.updated,
    added: t.added,
    updated: t.updated,
    url: websiteDisplay,
    links: { website: websiteUrl },
    glyph: t.glyph,
    glyphBg: t.glyphBg,
    glyphAccent: '#7fb8aa',
    certs: [],
    sections,
    glance: {
      complexity: complexityLabel || '—',
      pricing: pricingLabel || '—',
      audience: audienceLabels.join(' · ') || '—',
      lifecycle: [stageLabel],
      tags: t.tags && t.tags.length > 0 ? t.tags : [categoryLabel, type, pricingLabel].filter(Boolean) as string[],
    },
    risks: { LLM: partitionedLLM, ASI: partitionedASI },
    related: mapRelated(relatedTools),
    activity: [],
  };
}

export function getAllSlugs(): string[] {
  return FIXTURE_TOOLS.map((t) => t.id);
}
