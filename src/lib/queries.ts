import { supabase, hasSupabase } from './supabase';
import { FIXTURE_TOOLS, type DirectoryTool } from './directory-data';

export type ToolFull = Record<string, unknown> & {
  id: string;
  slug: string;
  name: string;
  status: string;
};

export type ToolNews = Record<string, unknown> & {
  id: string;
  tool_id: string;
  published_at: string;
};

const GLYPH_PALETTE = [
  '#1e2a3b', '#2a1f3b', '#2a3b1f', '#3b2f1f', '#3b1f2a',
  '#1f3b2a', '#1e3b3b', '#2a2a3b', '#3b1f1f', '#1f2a3b',
  '#2a3b2a', '#3b3b1f', '#2a1e3b', '#1f3b3b', '#3b2a1f',
  '#1e3b2a', '#3b2a2a', '#2a2a1f', '#1f2a1e',
];

function hashTo(str: string, n: number): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h) % n;
}

function deriveGlyph(name: string): string {
  const cleaned = name.replace(/[^a-zA-Z0-9 ]+/g, ' ').trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return cleaned.slice(0, 2).toUpperCase() || '?';
}

function formatStars(n: unknown): string | null {
  if (typeof n !== 'number' || n <= 0) return null;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function ymOf(iso: unknown): string {
  if (typeof iso !== 'string' || iso.length < 7) return '';
  return iso.slice(0, 7);
}

function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => String(x)).filter((s) => s.length > 0);
}

function mapToolRow(row: Record<string, unknown>): DirectoryTool {
  const name = (row.name as string) ?? '';
  const slug = (row.slug as string) ?? '';
  const llmRisks = asStringArray(row.llm_risks);
  const agenticRisks = asStringArray(row.agentic_risks);
  const stages = asStringArray(row.lifecycle_stages);
  const audiences = asStringArray(row.audiences);
  const tags = asStringArray(row.tags);
  const categoryName = (row.category_name as string) ?? null;
  const pricingName = (row.pricing_name as string) ?? null;
  const rawComplexity = (row.complexity_name as string) ?? null;
  // tool_full has null complexity_name for tools at the lowest tier; per the
  // complexity_tiers source table, tier 1 ("Plug & Play") is the implicit default.
  const complexityName =
    rawComplexity && rawComplexity.trim().length > 0 ? rawComplexity : 'Plug & Play';

  return {
    id: slug || String(row.id ?? ''),
    name,
    cat: (row.category_slug as string) ?? 'unknown',
    desc: (row.description as string) ?? '',
    risks: [...llmRisks, ...agenticRisks],
    stage: stages[0] ?? '',
    audience: audiences,
    complexity: complexityName,
    pricing: pricingName,
    added: ymOf(row.created_at),
    updated: ymOf(row.updated_at),
    stars: formatStars(row.github_stars),
    glyph: deriveGlyph(name),
    glyphBg: GLYPH_PALETTE[hashTo(slug || name, GLYPH_PALETTE.length)],
    url: (row.url as string) ?? undefined,
    catName: categoryName ?? undefined,
    pricingName: pricingName ?? undefined,
    complexityName: complexityName ?? undefined,
    isAgentic: (row.is_agentic as boolean) ?? undefined,
    isOpenSource: (row.is_open_source as boolean | null) ?? null,
    backWhat: (row.back_what as string) ?? undefined,
    backSecurity: (row.back_security as string) ?? undefined,
    backWhen: (row.back_when as string) ?? undefined,
    llmRisks,
    agenticRisks,
    stages,
    tags,
    logoDomain: (row.logo_domain as string) ?? undefined,
    numericId: typeof row.id === 'number' ? row.id : undefined,
  };
}

export async function getApprovedTools(): Promise<DirectoryTool[]> {
  if (!supabase) return FIXTURE_TOOLS;
  const { data, error } = await supabase
    .from('tool_full')
    .select('*')
    .eq('status', 'active')
    .order('featured', { ascending: false })
    .order('name', { ascending: true });
  if (error) {
    console.warn('[queries] getApprovedTools failed, using fixture:', error.message);
    return FIXTURE_TOOLS;
  }
  if (!data || data.length === 0) return FIXTURE_TOOLS;
  return data.map(mapToolRow);
}

export async function getToolBySlug(slug: string): Promise<DirectoryTool | null> {
  if (!supabase) {
    return FIXTURE_TOOLS.find((t) => t.id === slug) ?? null;
  }
  const { data, error } = await supabase
    .from('tool_full')
    .select('*')
    .eq('status', 'active')
    .eq('slug', slug)
    .maybeSingle();
  if (error) {
    console.warn('[queries] getToolBySlug failed, using fixture:', error.message);
    return FIXTURE_TOOLS.find((t) => t.id === slug) ?? null;
  }
  return data ? mapToolRow(data) : null;
}

export async function getRelatedTools(
  categorySlug: string,
  currentId: string,
  limit = 3,
): Promise<DirectoryTool[]> {
  if (!supabase) {
    return FIXTURE_TOOLS.filter((t) => t.cat === categorySlug && t.id !== currentId).slice(0, limit);
  }
  const { data, error } = await supabase
    .from('tool_full')
    .select('*')
    .eq('status', 'active')
    .eq('category_slug', categorySlug)
    .neq('id', currentId)
    .order('featured', { ascending: false })
    .limit(limit);
  if (error || !data) {
    return FIXTURE_TOOLS.filter((t) => t.cat === categorySlug && t.id !== currentId).slice(0, limit);
  }
  return data.map(mapToolRow);
}

export async function getToolNews(toolId: string, limit = 12): Promise<ToolNews[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('tool_news')
    .select('*')
    .eq('tool_id', toolId)
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return data as ToolNews[];
}

export type LandingCounts = {
  tools: number;
  risks: number;
  categories: number;
  tags: number;
};

const HARDCODED_COUNTS: LandingCounts = { tools: 161, risks: 20, categories: 11, tags: 233 };

export async function getLandingCounts(): Promise<LandingCounts> {
  if (!supabase) return HARDCODED_COUNTS;
  const tools = await supabase
    .from('tool_full')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'active');
  if (tools.error) return HARDCODED_COUNTS;
  return {
    ...HARDCODED_COUNTS,
    tools: tools.count ?? HARDCODED_COUNTS.tools,
  };
}

export { hasSupabase };
