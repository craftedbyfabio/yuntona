import type { APIRoute } from 'astro';
import { getApprovedTools } from '../lib/queries';
import { LLM_TOP10, ASI_TOP10 } from '../lib/directory-data';
import { buildGraphData } from '../lib/graph-data';

export const prerender = true;

export const GET: APIRoute = async () => {
  const tools = await getApprovedTools();
  const data = buildGraphData(tools);

  const payload = {
    tools: tools.map((t) => ({
      slug: t.id,
      name: t.name,
      desc: t.desc,
      cat: t.cat,
      catName: t.catName ?? t.cat,
      tags: t.tags ?? [],
      isAgentic: t.isAgentic ?? false,
    })),
    risks: [
      ...LLM_TOP10.map(([id, label]) => ({ id, label, kind: 'llm' as const })),
      ...ASI_TOP10.map(([id, label]) => ({ id, label, kind: 'asi' as const })),
    ],
    categories: data.categories.map((c) => ({ slug: c.id, label: c.label })),
    stages: data.stages.map((s) => ({ id: s.id, label: s.label })),
    pages: [
      { label: 'Directory',         href: '/directory',   kind: 'directory' },
      { label: 'Knowledge Graph',   href: '/graph',       kind: 'graph' },
      { label: 'Methodology',       href: '/methodology', kind: 'methodology' },
      { label: 'Home',              href: '/',            kind: 'home' },
    ],
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=600',
    },
  });
};
