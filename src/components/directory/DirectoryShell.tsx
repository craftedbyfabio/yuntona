import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { LLM_TOP10, ASI_TOP10, type DirectoryTool } from '../../lib/directory-data';
import styles from './Directory.module.css';

type Props = { tools: DirectoryTool[] };

type SortKey = 'relevance' | 'updated' | 'name';
type View = 'list' | 'grid';
type RiskTab = 'LLM' | 'ASI';

type FacetEntry = { value: string; label: string; count: number };

function toggleSet<T>(set: Set<T>, key: T): Set<T> {
  const n = new Set(set);
  if (n.has(key)) n.delete(key);
  else n.add(key);
  return n;
}

function stagesOf(t: DirectoryTool): string[] {
  if (t.stages && t.stages.length > 0) return t.stages;
  return t.stage ? [t.stage] : [];
}

function bumpCount(map: Map<string, FacetEntry>, value: string, label: string) {
  const e = map.get(value);
  if (e) e.count++;
  else map.set(value, { value, label, count: 1 });
}

function sortByCountThenLabel(entries: FacetEntry[]): FacetEntry[] {
  return [...entries].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export default function DirectoryShell({ tools }: Props) {
  const [query, setQuery] = useState('');
  const [activeCats, setActiveCats] = useState<Set<string>>(new Set());
  const [activeRisks, setActiveRisks] = useState<Set<string>>(new Set());
  const [activeStages, setActiveStages] = useState<Set<string>>(new Set());
  const [activeAud, setActiveAud] = useState<Set<string>>(new Set());
  const [activeComp, setActiveComp] = useState<Set<string>>(new Set());
  const [activePrice, setActivePrice] = useState<Set<string>>(new Set());
  const [riskTab, setRiskTab] = useState<RiskTab>('LLM');
  const [view, setView] = useState<View>('list');
  const [sort, setSort] = useState<SortKey>('relevance');

  // Pre-populate filters from URL query params on mount.
  // Supported: ?risk=LLM01,ASI03 ?cat=foo ?stage=foo ?audience=foo ?complexity=foo ?pricing=foo ?q=text
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const setFromParam = (key: string, setter: (s: Set<string>) => void) => {
      const raw = params.get(key);
      if (!raw) return;
      const values = raw.split(',').map((v) => v.trim()).filter(Boolean);
      if (values.length) setter(new Set(values));
    };
    setFromParam('risk',       setActiveRisks);
    setFromParam('cat',        setActiveCats);
    setFromParam('stage',      setActiveStages);
    setFromParam('audience',   setActiveAud);
    setFromParam('complexity', setActiveComp);
    setFromParam('pricing',    setActivePrice);

    const q = params.get('q');
    if (q) setQuery(q);

    const risk = params.get('risk');
    if (risk && risk.startsWith('ASI')) setRiskTab('ASI');
  }, []);

  const facets = useMemo(() => {
    const cats = new Map<string, FacetEntry>();
    const stages = new Map<string, FacetEntry>();
    const audiences = new Map<string, FacetEntry>();
    const complexities = new Map<string, FacetEntry>();
    const pricings = new Map<string, FacetEntry>();
    const riskCounts = new Map<string, number>();

    for (const t of tools) {
      if (t.cat) bumpCount(cats, t.cat, t.catName ?? t.cat);
      for (const s of stagesOf(t)) bumpCount(stages, s, s);
      for (const a of t.audience) bumpCount(audiences, a, a);
      if (t.complexity) bumpCount(complexities, t.complexity, t.complexity);
      if (t.pricing) bumpCount(pricings, t.pricing, t.pricing);
      for (const r of t.risks) riskCounts.set(r, (riskCounts.get(r) ?? 0) + 1);
    }

    const buildRisk = (top10: typeof LLM_TOP10): FacetEntry[] =>
      top10.map(([id, name]) => ({
        value: id,
        label: name,
        count: riskCounts.get(id) ?? 0,
      }));

    return {
      cats: sortByCountThenLabel([...cats.values()]),
      stages: sortByCountThenLabel([...stages.values()]),
      audiences: sortByCountThenLabel([...audiences.values()]),
      complexities: sortByCountThenLabel([...complexities.values()]),
      pricings: sortByCountThenLabel([...pricings.values()]),
      risksLLM: buildRisk(LLM_TOP10),
      risksASI: buildRisk(ASI_TOP10),
    };
  }, [tools]);

  const results = useMemo(() => {
    let r = tools.slice();
    if (query) {
      const q = query.toLowerCase();
      r = r.filter(
        (t) => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q),
      );
    }
    if (activeCats.size) r = r.filter((t) => activeCats.has(t.cat));
    if (activeRisks.size) r = r.filter((t) => t.risks.some((x) => activeRisks.has(x)));
    if (activeStages.size) r = r.filter((t) => stagesOf(t).some((x) => activeStages.has(x)));
    if (activeAud.size) r = r.filter((t) => t.audience.some((x) => activeAud.has(x)));
    if (activeComp.size) r = r.filter((t) => t.complexity !== null && activeComp.has(t.complexity));
    if (activePrice.size) r = r.filter((t) => t.pricing !== null && activePrice.has(t.pricing));
    if (sort === 'updated') r.sort((a, b) => b.updated.localeCompare(a.updated));
    if (sort === 'name') r.sort((a, b) => a.name.localeCompare(b.name));
    return r;
  }, [tools, query, activeCats, activeRisks, activeStages, activeAud, activeComp, activePrice, sort]);

  const activeCount =
    activeCats.size +
    activeRisks.size +
    activeStages.size +
    activeAud.size +
    activeComp.size +
    activePrice.size;

  const clearAll = () => {
    setActiveCats(new Set());
    setActiveRisks(new Set());
    setActiveStages(new Set());
    setActiveAud(new Set());
    setActiveComp(new Set());
    setActivePrice(new Set());
    setQuery('');
  };

  const riskList = riskTab === 'LLM' ? facets.risksLLM : facets.risksASI;

  return (
    <div className={styles.layout}>
      <aside className={styles.aside}>
        <div className={styles.asideHeader}>
          <div className={styles.asideTitle}>Filters</div>
          {activeCount > 0 && (
            <button type="button" className={styles.clearBtn} onClick={clearAll}>
              clear · {activeCount}
            </button>
          )}
        </div>

        <FacetGroup title="OWASP risk">
          <div className={styles.riskTabs}>
            {([['LLM', 'LLM · 2025'], ['ASI', 'Agentic · 2026']] as const).map(([k, l]) => (
              <button
                key={k}
                type="button"
                className={`${styles.riskTab} ${riskTab === k ? styles.riskTabActive : ''}`}
                onClick={() => setRiskTab(k)}
              >
                {l}
              </button>
            ))}
          </div>
          {riskList.map((f) => (
            <FacetRow
              key={f.value}
              count={f.count}
              active={activeRisks.has(f.value)}
              onClick={() => setActiveRisks((s) => toggleSet(s, f.value))}
              label={
                <>
                  <span className={styles.riskCode}>{f.value}</span>
                  {f.label}
                </>
              }
            />
          ))}
        </FacetGroup>

        {facets.cats.length > 0 && (
          <FacetGroup title="Category">
            {facets.cats.map((f) => (
              <FacetRow
                key={f.value}
                count={f.count}
                active={activeCats.has(f.value)}
                onClick={() => setActiveCats((s) => toggleSet(s, f.value))}
                label={f.label}
              />
            ))}
          </FacetGroup>
        )}

        {facets.stages.length > 0 && (
          <FacetGroup title="Lifecycle stage">
            {facets.stages.map((f) => (
              <FacetRow
                key={f.value}
                count={f.count}
                active={activeStages.has(f.value)}
                onClick={() => setActiveStages((s) => toggleSet(s, f.value))}
                label={f.label}
              />
            ))}
          </FacetGroup>
        )}

        {facets.audiences.length > 0 && (
          <FacetGroup title="Audience">
            {facets.audiences.map((f) => (
              <FacetRow
                key={f.value}
                count={f.count}
                active={activeAud.has(f.value)}
                onClick={() => setActiveAud((s) => toggleSet(s, f.value))}
                label={f.label}
              />
            ))}
          </FacetGroup>
        )}

        {facets.complexities.length > 0 && (
          <FacetGroup title="Complexity">
            {facets.complexities.map((f) => (
              <FacetRow
                key={f.value}
                count={f.count}
                active={activeComp.has(f.value)}
                onClick={() => setActiveComp((s) => toggleSet(s, f.value))}
                label={f.label}
              />
            ))}
          </FacetGroup>
        )}

        {facets.pricings.length > 0 && (
          <FacetGroup title="Pricing">
            {facets.pricings.map((f) => (
              <FacetRow
                key={f.value}
                count={f.count}
                active={activePrice.has(f.value)}
                onClick={() => setActivePrice((s) => toggleSet(s, f.value))}
                label={f.label}
              />
            ))}
          </FacetGroup>
        )}
      </aside>

      <main>
        <div className={styles.headerBlock}>
          <div className={styles.breadRow}>
            <span className={styles.breadKicker}>Directory</span>
            <span className={styles.breadPath}>/directory</span>
          </div>
          <h1 className={styles.title}>
            {tools.length} <em>AI security</em> tools
          </h1>
        </div>

        <div className={styles.searchRow}>
          <div className={styles.searchBar}>
            <span className={styles.searchPrompt}>›</span>
            <input
              className={styles.searchInput}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools or ask in plain English — 'prompt injection for production'"
            />
            <kbd className={styles.searchKbd}>⌘K</kbd>
          </div>
          <div className={styles.viewToggle}>
            {([['list', 'List'], ['grid', 'Grid']] as const).map(([k, l]) => (
              <button
                key={k}
                type="button"
                className={`${styles.viewBtn} ${view === k ? styles.viewBtnActive : ''}`}
                onClick={() => setView(k)}
              >
                {l}
              </button>
            ))}
          </div>
          <select
            className={styles.sortSelect}
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            aria-label="Sort"
          >
            <option value="relevance">sort: relevance</option>
            <option value="updated">sort: updated</option>
            <option value="name">sort: name</option>
          </select>
        </div>

        <div className={styles.resultCount}>
          {results.length} result{results.length === 1 ? '' : 's'}
        </div>

        <ActivePills
          activeCats={activeCats}      setActiveCats={setActiveCats}
          activeRisks={activeRisks}    setActiveRisks={setActiveRisks}
          activeStages={activeStages}  setActiveStages={setActiveStages}
          activeAud={activeAud}        setActiveAud={setActiveAud}
          activeComp={activeComp}      setActiveComp={setActiveComp}
          activePrice={activePrice}    setActivePrice={setActivePrice}
        />

        {view === 'list' ? (
          <div className={styles.listWrap}>
            {results.length === 0 ? (
              <EmptyState onClear={clearAll} />
            ) : (
              results.map((t) => <ToolRow key={t.id} t={t} />)
            )}
          </div>
        ) : (
          <div className={styles.gridWrap}>
            {results.map((t) => <ToolCard key={t.id} t={t} />)}
          </div>
        )}

        <div className={styles.metaFooter}>
          <span>Showing {results.length} of {tools.length}</span>
          <span>v1.7.0 · last indexed 2026-04-22</span>
        </div>
      </main>
    </div>
  );
}

function FacetGroup({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className={styles.facetGroup}>
      <button type="button" className={styles.facetTitle} onClick={() => setOpen((v) => !v)}>
        <span>{title}</span>
        <span className={`${styles.facetCaret} ${!open ? styles.facetCaretClosed : ''}`}>▾</span>
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

function FacetRow({
  label,
  count,
  active,
  onClick,
}: {
  label: ReactNode;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  const disabled = count === 0;
  return (
    <button
      type="button"
      className={`${styles.facetRow} ${active ? styles.facetRowActive : ''} ${disabled ? styles.facetRowDisabled : ''}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <span className={`${styles.facetCheckbox} ${active ? styles.facetCheckboxOn : ''}`}>
        {active ? '✓' : ''}
      </span>
      <span className={`${styles.facetLabel} ${active ? styles.facetLabelActive : ''}`}>{label}</span>
      <span className={styles.facetCount}>{count}</span>
    </button>
  );
}

function ActivePills(props: {
  activeCats: Set<string>;     setActiveCats: (s: Set<string>) => void;
  activeRisks: Set<string>;    setActiveRisks: (s: Set<string>) => void;
  activeStages: Set<string>;   setActiveStages: (s: Set<string>) => void;
  activeAud: Set<string>;      setActiveAud: (s: Set<string>) => void;
  activeComp: Set<string>;     setActiveComp: (s: Set<string>) => void;
  activePrice: Set<string>;    setActivePrice: (s: Set<string>) => void;
}) {
  const groups: Array<{ kind: string; set: Set<string>; setter: (s: Set<string>) => void }> = [
    { kind: 'cat',         set: props.activeCats,   setter: props.setActiveCats   },
    { kind: 'risk',        set: props.activeRisks,  setter: props.setActiveRisks  },
    { kind: 'stage',       set: props.activeStages, setter: props.setActiveStages },
    { kind: 'audience',    set: props.activeAud,    setter: props.setActiveAud    },
    { kind: 'complexity',  set: props.activeComp,   setter: props.setActiveComp   },
    { kind: 'pricing',     set: props.activePrice,  setter: props.setActivePrice  },
  ];

  const pills: ReactNode[] = [];
  for (const g of groups) {
    g.set.forEach((k) => {
      pills.push(
        <span key={`${g.kind}-${k}`} className={styles.pill}>
          {g.kind}:{k}
          <button
            type="button"
            className={styles.pillRemove}
            onClick={() => {
              const n = new Set(g.set);
              n.delete(k);
              g.setter(n);
            }}
          >
            ×
          </button>
        </span>,
      );
    });
  }

  if (pills.length === 0) return null;
  return <div className={styles.pillsRow}>{pills}</div>;
}

function ToolRow({ t }: { t: DirectoryTool }) {
  const catLabel = t.catName ?? t.cat;
  const stageLabel = (t.stages && t.stages[0]) ?? t.stage ?? '—';
  const priceLabel = t.pricing ?? '—';
  const compLabel = t.complexity ?? '—';

  return (
    <a className={styles.row} href={`/tool/${t.id}`}>
      <div className={styles.rowGlyph} style={{ background: t.glyphBg }}>{t.glyph}</div>
      <div className={styles.rowMain}>
        <div className={styles.rowHeader}>
          <span className={styles.rowName}>{t.name}</span>
          {t.stars && <span className={styles.rowStars}>★ {t.stars}</span>}
          <span className={styles.rowCat}>· {catLabel}</span>
        </div>
        <div className={styles.rowDesc}>{t.desc}</div>
      </div>
      <div className={styles.rowRisks}>
        {t.risks.slice(0, 4).map((r) => (
          <span
            key={r}
            className={`${styles.riskChip} ${r.startsWith('ASI') ? styles.riskChipASI : styles.riskChipLLM}`}
          >
            {r}
          </span>
        ))}
        {t.risks.length > 4 && <span className={styles.riskMore}>+{t.risks.length - 4}</span>}
      </div>
      <div className={styles.rowMeta}>
        <div className={styles.rowMetaLine}>
          <span className={styles.rowMetaKey}>stage</span>
          <span className={styles.rowMetaVal}>{stageLabel}</span>
        </div>
        <div className={styles.rowMetaLine}>
          <span className={styles.rowMetaKey}>pricing</span>
          <span
            className={
              priceLabel.toLowerCase().includes('open') ? styles.rowMetaValOss : styles.rowMetaVal
            }
          >
            {priceLabel}
          </span>
        </div>
        <div className={styles.rowMetaLine}>
          <span className={styles.rowMetaKey}>complexity</span>
          <span className={styles.rowMetaVal}>{compLabel}</span>
        </div>
      </div>
    </a>
  );
}

function ToolCard({ t }: { t: DirectoryTool }) {
  const catLabel = t.catName ?? t.cat;
  return (
    <a className={styles.card} href={`/tool/${t.id}`}>
      <div className={styles.cardHeader}>
        <div className={styles.cardGlyph} style={{ background: t.glyphBg }}>{t.glyph}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className={styles.cardName}>{t.name}</div>
          <div className={styles.cardCat}>{catLabel}</div>
        </div>
      </div>
      <div className={styles.cardDesc}>{t.desc}</div>
      <div className={styles.rowRisks}>
        {t.risks.slice(0, 3).map((r) => (
          <span
            key={r}
            className={`${styles.riskChip} ${r.startsWith('ASI') ? styles.riskChipASI : styles.riskChipLLM}`}
          >
            {r}
          </span>
        ))}
      </div>
    </a>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className={styles.empty}>
      <div className={styles.emptyTitle}>No tools match.</div>
      <div className={styles.emptyCopy}>Try widening your filters or clearing them.</div>
      <button type="button" className={styles.emptyBtn} onClick={onClear}>
        Clear all filters
      </button>
    </div>
  );
}
