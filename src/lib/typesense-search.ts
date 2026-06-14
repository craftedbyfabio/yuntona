// Client-side Typesense search wrapper.
//
// Used by SearchPalette to hit the `tools_v2` collection via multi_search.
// Combines keyword + auto-embedding fields in one query (rank fusion via
// `alpha`) to deliver hybrid scoring. The browser only ever sees the
// publishable, search-only, GET-only `PUBLIC_TYPESENSE_SEARCH_KEY`.
//
// Server-side admin/index operations live in scripts/sync-typesense.mjs.

// Both must be PUBLIC_-prefixed — Vite/Astro only inlines that prefix
// into client bundles. The host is also returned in every network
// request anyway, so exposing it is not a security regression.
const HOST = import.meta.env.PUBLIC_TYPESENSE_HOST;
const KEY = import.meta.env.PUBLIC_TYPESENSE_SEARCH_KEY;
const COLLECTION = 'tools_v2';

// Default hybrid blend: 0.5 = 50% semantic + 50% keyword. Tune in PR E.
const DEFAULT_ALPHA = 0.5;

export type TypesenseHit = {
  slug: string;
  name: string;
  desc: string;
  cat: string;
  catName: string;
  tags: string[];
  isAgentic: boolean;
  highlight?: string;
};

export type HybridSearchResult = {
  hits: TypesenseHit[];
  found: number;
  parsedNL?: ParsedNLQuery | null;
};

export type ParsedNLQuery = {
  filter_by?: string;
  sort_by?: string;
  q?: string;
};

export type HybridSearchOptions = {
  perPage?: number;
  alpha?: number;
  filterBy?: string;
  signal?: AbortSignal;
  /** PR D: when true, sends nl_query=true&nl_model_id=<id> */
  nlMode?: { modelId: string };
};

export function isTypesenseConfigured(): boolean {
  return Boolean(HOST && KEY);
}

type TSDocument = {
  slug?: string;
  name?: string;
  desc?: string;
  category_slug?: string;
  category_name?: string;
  tags?: string[];
  is_agentic?: boolean;
};

type TSHit = {
  document: TSDocument;
  highlights?: Array<{ field: string; snippet?: string }>;
  text_match?: number;
  vector_distance?: number;
};

type TSSearchResponse = {
  results: Array<{
    hits?: TSHit[];
    found?: number;
    parsed_nl_query?: {
      generated_params?: ParsedNLQuery;
    };
  }>;
};

/**
 * Run a hybrid (or hybrid + NL) search against the `tools_v2` collection.
 *
 * Throws on network / 4xx / 5xx errors. Callers should catch and fall
 * back to a local substring index for graceful degradation.
 */
export async function hybridSearch(
  query: string,
  opts: HybridSearchOptions = {},
): Promise<HybridSearchResult> {
  if (!HOST || !KEY) {
    throw new Error('Typesense not configured');
  }

  const alpha = opts.alpha ?? DEFAULT_ALPHA;
  const perPage = opts.perPage ?? 12;

  const searchParams: Record<string, unknown> = {
    collection: COLLECTION,
    q: query || '*',
    query_by: 'name,desc,back_what,back_security,tags,category_name,embedding',
    vector_query: `embedding:([], alpha: ${alpha})`,
    num_typos: 2,
    prefix: true,
    drop_tokens_threshold: 0,
    per_page: perPage,
    include_fields: 'slug,name,desc,category_slug,category_name,tags,is_agentic',
    highlight_full_fields: 'name,desc',
    highlight_start_tag: '<mark>',
    highlight_end_tag: '</mark>',
  };

  if (opts.filterBy) {
    searchParams.filter_by = opts.filterBy;
  }

  // PR D: NL parsing. `nl_query=true` triggers Gemini server-side; the
  // model_config holds the API key. Result includes parsed_nl_query in
  // the response body.
  let urlQuery = '';
  if (opts.nlMode) {
    const sp = new URLSearchParams({
      nl_query: 'true',
      nl_model_id: opts.nlMode.modelId,
    });
    urlQuery = `?${sp.toString()}`;
  }

  const res = await fetch(`https://${HOST}/multi_search${urlQuery}`, {
    method: 'POST',
    headers: {
      'X-TYPESENSE-API-KEY': KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ searches: [searchParams] }),
    signal: opts.signal,
  });

  if (!res.ok) {
    throw new Error(`Typesense ${res.status}: ${await res.text()}`);
  }

  const data = (await res.json()) as TSSearchResponse;
  const first = data.results?.[0];
  if (!first) return { hits: [], found: 0, parsedNL: null };

  const hits: TypesenseHit[] = (first.hits ?? []).map((h) => {
    const d = h.document ?? {};
    const nameHl = h.highlights?.find((hi) => hi.field === 'name')?.snippet;
    return {
      slug: d.slug ?? '',
      name: d.name ?? '',
      desc: d.desc ?? '',
      cat: d.category_slug ?? '',
      catName: d.category_name ?? '',
      tags: d.tags ?? [],
      isAgentic: Boolean(d.is_agentic),
      highlight: nameHl,
    };
  });

  const parsedNL = first.parsed_nl_query?.generated_params ?? null;

  return { hits, found: first.found ?? hits.length, parsedNL };
}
