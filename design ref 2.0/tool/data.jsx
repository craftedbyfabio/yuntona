// Tool detail page — GitHub/Linear-inspired two-column layout.
// Matches the landing + directory aesthetic: dark, monospace metadata,
// Fraunces for display, coral/kelp accents.

const TOOL = {
  slug: 'mintmcp',
  name: 'MintMCP',
  tagline: 'Agent governance platform — hosted MCP gateway with access control, audit logging, and guardrails. Official Cursor partner. SOC 2 Type II certified.',
  category: 'MCP Security',
  type: 'Agentic',
  reviewed: '2026-04-17',
  added: '2025-11-03',
  updated: '2026-04-17',
  url: 'mintmcp.com',
  links: {
    website: 'https://mintmcp.com',
    twitter: '#',
    linkedin: '#',
  },
  glyph: 'M',
  glyphBg: '#1f3b2a',
  glyphAccent: '#7fb8aa',
  certs: ['SOC 2 Type II'],
  funder: 'Vendor',
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
  related: [
    { id: 'runlayer', name: 'Runlayer', cat: 'MCP Security', glyph: 'RL', bg: '#1e2a3b',
      desc: 'Enterprise MCP security with $11M seed funding and MCP creator as advisor.' },
    { id: 'enkrypt', name: 'Enkrypt AI MCP Security', cat: 'MCP Security', glyph: 'EK', bg: '#2a1f3b',
      desc: 'Red teaming and runtime protection specifically for MCP server deployments.' },
    { id: 'operant', name: 'Operant AI', cat: 'AI Guardrails', glyph: 'OP', bg: '#3b1f2a',
      desc: 'Runtime AI security featured in all four Gartner 2025 AI security guides.' },
  ],
  activity: [
    { date: '2026-04-12', type: 'release', title: 'Gateway v4.2 — custom MCP registries', source: 'mintmcp.com/changelog' },
    { date: '2026-03-28', type: 'announcement', title: 'Named official Cursor integration partner', source: 'cursor.com/blog' },
    { date: '2026-02-14', type: 'audit', title: 'Achieved SOC 2 Type II certification', source: 'mintmcp.com' },
    { date: '2026-01-20', type: 'release', title: 'Agent Monitor — real-time tool call traces', source: 'mintmcp.com' },
  ],
};

Object.assign(window, { TOOL });
