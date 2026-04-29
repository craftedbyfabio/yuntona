import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './SearchPalette.module.css';

type SearchTool = {
  slug: string;
  name: string;
  desc: string;
  cat: string;
  catName: string;
  tags: string[];
  isAgentic: boolean;
};

type SearchRisk = { id: string; label: string; kind: 'llm' | 'asi' };
type SearchCategory = { slug: string; label: string };
type SearchStage = { id: string; label: string };
type SearchPage = { label: string; href: string; kind: string };

type SearchIndex = {
  tools: SearchTool[];
  risks: SearchRisk[];
  categories: SearchCategory[];
  stages: SearchStage[];
  pages: SearchPage[];
};

type ResultKind = 'tool' | 'risk-llm' | 'risk-asi' | 'category' | 'stage' | 'page';

type Result = {
  kind: ResultKind;
  label: string;
  sub: string;
  href: string;
  glyph: string;
  score: number;
};

let cachedIndex: SearchIndex | null = null;
let pendingFetch: Promise<SearchIndex> | null = null;

function fetchIndex(): Promise<SearchIndex> {
  if (cachedIndex) return Promise.resolve(cachedIndex);
  if (pendingFetch) return pendingFetch;
  pendingFetch = fetch('/search-index.json')
    .then((r) => r.json())
    .then((data: SearchIndex) => {
      cachedIndex = data;
      return data;
    })
    .catch((err) => {
      pendingFetch = null;
      throw err;
    });
  return pendingFetch;
}

function deriveGlyph(name: string): string {
  const cleaned = name.replace(/[^a-zA-Z0-9 ]+/g, ' ').trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return cleaned.slice(0, 2).toUpperCase() || '?';
}

function scoreMatch(haystack: string, needle: string): number {
  if (!needle) return 0;
  const h = haystack.toLowerCase();
  const n = needle.toLowerCase();
  if (h === n) return 100;
  if (h.startsWith(n)) return 80;
  const idx = h.indexOf(n);
  if (idx === 0) return 70;
  if (idx > 0) return 40;
  return 0;
}

function search(index: SearchIndex, query: string): Result[] {
  const q = query.trim();
  if (!q) {
    // Empty query: show top-level pages first, then a sample of tools.
    return [
      ...index.pages.map((p) => ({
        kind: 'page' as const,
        label: p.label,
        sub: p.href,
        href: p.href,
        glyph: '/',
        score: 100,
      })),
      ...index.tools.slice(0, 8).map((t) => ({
        kind: 'tool' as const,
        label: t.name,
        sub: t.catName,
        href: `/tool/${t.slug}`,
        glyph: deriveGlyph(t.name),
        score: 50,
      })),
    ];
  }

  const results: Result[] = [];

  for (const t of index.tools) {
    let s = 0;
    s = Math.max(s, scoreMatch(t.name, q));
    s = Math.max(s, scoreMatch(t.slug, q));
    s = Math.max(s, scoreMatch(t.catName, q) * 0.6);
    if (s < 40) {
      const descScore = scoreMatch(t.desc, q);
      s = Math.max(s, descScore * 0.5);
    }
    for (const tag of t.tags) {
      s = Math.max(s, scoreMatch(tag, q) * 0.7);
    }
    if (s > 0) {
      results.push({
        kind: 'tool',
        label: t.name,
        sub: t.catName,
        href: `/tool/${t.slug}`,
        glyph: deriveGlyph(t.name),
        score: s,
      });
    }
  }

  for (const r of index.risks) {
    const s = Math.max(scoreMatch(r.id, q), scoreMatch(r.label, q));
    if (s > 0) {
      results.push({
        kind: r.kind === 'llm' ? 'risk-llm' : 'risk-asi',
        label: `${r.id} · ${r.label}`,
        sub: r.kind === 'llm' ? 'OWASP LLM Top 10' : 'OWASP Agentic Top 10',
        href: `/directory?risk=${r.id}`,
        glyph: r.id.slice(3),
        score: s + 5,
      });
    }
  }

  for (const c of index.categories) {
    const s = scoreMatch(c.label, q);
    if (s > 0) {
      results.push({
        kind: 'category',
        label: c.label,
        sub: 'Category',
        href: `/directory?cat=${c.slug}`,
        glyph: deriveGlyph(c.label),
        score: s,
      });
    }
  }

  for (const st of index.stages) {
    const s = scoreMatch(st.label, q);
    if (s > 0) {
      results.push({
        kind: 'stage',
        label: st.label,
        sub: 'Lifecycle stage',
        href: `/directory?stage=${st.id}`,
        glyph: deriveGlyph(st.label),
        score: s,
      });
    }
  }

  for (const p of index.pages) {
    const s = scoreMatch(p.label, q);
    if (s > 0) {
      results.push({
        kind: 'page',
        label: p.label,
        sub: p.href,
        href: p.href,
        glyph: '/',
        score: s + 2,
      });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 24);
}

const GROUP_TITLES: Record<ResultKind, string> = {
  tool: 'Tools',
  'risk-llm': 'OWASP risks',
  'risk-asi': 'OWASP risks',
  category: 'Categories',
  stage: 'Lifecycle stages',
  page: 'Pages',
};

const GROUP_ORDER: ResultKind[] = ['tool', 'risk-llm', 'risk-asi', 'category', 'stage', 'page'];

const GLYPH_CLASS: Record<ResultKind, string> = {
  tool: styles.glyphTool,
  'risk-llm': styles.glyphRiskLLM,
  'risk-asi': styles.glyphRiskASI,
  category: styles.glyphCategory,
  stage: styles.glyphStage,
  page: styles.glyphPage,
};

export default function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<SearchIndex | null>(null);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Open / close listeners
  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('search-palette:open', onOpen as EventListener);
    window.addEventListener('search-palette:close', onClose as EventListener);
    document.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('search-palette:open', onOpen as EventListener);
      window.removeEventListener('search-palette:close', onClose as EventListener);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Lazy-load index on first open
  useEffect(() => {
    if (open && !index) {
      fetchIndex()
        .then(setIndex)
        .catch((err) => console.warn('[search] failed to load index:', err));
    }
    if (open) {
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQuery('');
    }
  }, [open, index]);

  const results = useMemo(() => (index ? search(index, query) : []), [index, query]);

  // Group results
  const groups = useMemo(() => {
    const map = new Map<ResultKind, Result[]>();
    for (const r of results) {
      const arr = map.get(r.kind) ?? [];
      arr.push(r);
      map.set(r.kind, arr);
    }
    const ordered: Array<{ kind: ResultKind; items: Result[] }> = [];
    const seenTitles = new Set<string>();
    for (const k of GROUP_ORDER) {
      const items = map.get(k);
      if (!items || items.length === 0) continue;
      const title = GROUP_TITLES[k];
      // Merge llm + asi into a single 'OWASP risks' group visually
      if (seenTitles.has(title)) {
        const existing = ordered[ordered.length - 1];
        if (existing && existing.items[0] && GROUP_TITLES[existing.kind] === title) {
          existing.items.push(...items);
          continue;
        }
      }
      seenTitles.add(title);
      ordered.push({ kind: k, items });
    }
    return ordered;
  }, [results]);

  // Flat list for keyboard nav
  const flatResults = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  useEffect(() => {
    if (active >= flatResults.length) setActive(Math.max(0, flatResults.length - 1));
  }, [flatResults.length, active]);

  const navigate = (href: string) => {
    setOpen(false);
    if (typeof window !== 'undefined') window.location.href = href;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(flatResults.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const r = flatResults[active];
      if (r) navigate(r.href);
    }
  };

  if (!open) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className={styles.modal}>
        <div className={styles.inputRow}>
          <span className={styles.icon}>›</span>
          <input
            ref={inputRef}
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search tools, risks, categories…"
            spellCheck={false}
            autoComplete="off"
          />
          <kbd className={styles.escKbd}>esc</kbd>
        </div>

        <div className={styles.results}>
          {!index ? (
            <div className={styles.empty}>Loading…</div>
          ) : flatResults.length === 0 ? (
            <div className={styles.empty}>
              No matches{query ? <> for <strong>“{query}”</strong></> : null}.
            </div>
          ) : (
            (() => {
              let cursor = 0;
              return groups.map((g, gi) => (
                <div key={gi}>
                  <div className={styles.groupTitle}>{GROUP_TITLES[g.kind]}</div>
                  {g.items.map((r) => {
                    const isActive = cursor === active;
                    const myIdx = cursor;
                    cursor++;
                    return (
                      <button
                        key={`${r.kind}-${r.href}-${myIdx}`}
                        type="button"
                        className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
                        onMouseEnter={() => setActive(myIdx)}
                        onClick={() => navigate(r.href)}
                      >
                        <span className={`${styles.glyph} ${GLYPH_CLASS[r.kind]}`}>{r.glyph}</span>
                        <div className={styles.body}>
                          <span className={styles.label}>{r.label}</span>
                          <span className={styles.sub}>{r.sub}</span>
                        </div>
                        <span className={styles.kindTag}>↵</span>
                      </button>
                    );
                  })}
                </div>
              ));
            })()
          )}
        </div>

        <div className={styles.footer}>
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>esc</kbd> close</span>
          <span className={styles.footerRight}>{flatResults.length} result{flatResults.length === 1 ? '' : 's'}</span>
        </div>
      </div>
    </div>
  );
}
