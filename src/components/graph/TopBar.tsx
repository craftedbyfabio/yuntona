import type { Category } from '../../lib/graph-data';
import styles from './Graph.module.css';

export type View = 'sankey' | 'network' | 'heatmap';
export type Scope = 'all' | 'llm' | 'lifecycle' | 'asi';

type Props = {
  view: View;
  setView: (v: View) => void;
  scope: Scope;
  setScope: (s: Scope) => void;
  activeCats: string[];
  setActiveCats: (ids: string[]) => void;
  categories: Category[];
  toolCount: number;
  stageCount: number;
};

const VIEW_OPTS: Array<{ id: View; label: string; icon: JSX.Element }> = [
  {
    id: 'sankey',
    label: 'Sankey',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6h4c4 0 4 12 8 12h6" />
        <path d="M3 12h4c4 0 4 0 8 0h6" opacity=".55" />
        <path d="M3 18h4c4 0 4-12 8-12h6" opacity=".75" />
      </svg>
    ),
  },
  {
    id: 'network',
    label: 'Network',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="12" cy="13" r="2" />
        <circle cx="6" cy="19" r="2" />
        <circle cx="18" cy="19" r="2" />
        <path d="M7.5 7.5 11 12M16.5 7.5 13 12M11 14l-3.5 3.5M13 14l3.5 3.5" />
      </svg>
    ),
  },
  {
    id: 'heatmap',
    label: 'Heatmap',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="6" height="6" />
        <rect x="10" y="3" width="6" height="6" opacity=".4" />
        <rect x="17" y="3" width="4" height="6" opacity=".7" />
        <rect x="3" y="10" width="6" height="6" opacity=".7" />
        <rect x="10" y="10" width="6" height="6" />
        <rect x="17" y="10" width="4" height="6" opacity=".4" />
        <rect x="3" y="17" width="6" height="4" opacity=".4" />
        <rect x="10" y="17" width="6" height="4" opacity=".7" />
        <rect x="17" y="17" width="4" height="4" />
      </svg>
    ),
  },
];

const SCOPE_OPTS: Array<{ id: Scope; label: string }> = [
  { id: 'all',       label: 'All' },
  { id: 'llm',       label: 'LLM Risks' },
  { id: 'lifecycle', label: 'Lifecycle' },
  { id: 'asi',       label: 'ASI Risks' },
];

export default function TopBar({
  view,
  setView,
  scope,
  setScope,
  activeCats,
  setActiveCats,
  categories,
  toolCount,
  stageCount,
}: Props) {
  const totalRiskCount = 20;

  return (
    <div className={styles.topbar}>
      <div className={styles.row1}>
        <div>
          <div className={styles.kicker}>Knowledge graph</div>
          <div className={styles.summary}>
            {toolCount} tools · {stageCount} stages · {totalRiskCount} risks
          </div>
        </div>

        <div className={styles.spacer} />

        <button
          type="button"
          className={styles.searchBox}
          data-search-trigger
          aria-label="Open search"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(240,238,233,0.5)"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <span className={styles.searchInput} style={{ color: 'rgba(240,238,233,0.5)' }}>
            Search tools, risks, stages…
          </span>
          <kbd className={styles.searchKbd}>⌘K</kbd>
        </button>

        <div className={styles.viewToggle} role="tablist" aria-label="View">
          {VIEW_OPTS.map((o) => {
            const on = view === o.id;
            return (
              <button
                key={o.id}
                type="button"
                role="tab"
                aria-selected={on}
                className={`${styles.viewBtn} ${on ? styles.viewBtnActive : ''}`}
                onClick={() => setView(o.id)}
              >
                {o.icon}
                {o.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.row2}>
        <div className={styles.pillset}>
          <span className={styles.kicker}>Scope</span>
          <div className={styles.pillsetOptions}>
            {SCOPE_OPTS.map((o) => {
              const on = scope === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  className={`${styles.pill} ${on ? styles.pillActive : ''}`}
                  onClick={() => setScope(o.id)}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </div>

        <span className={styles.divider} />

        <span className={styles.kicker}>Category</span>
        <div className={styles.catChips}>
          <button
            type="button"
            className={`${styles.catChip} ${activeCats.length === 0 ? styles.catChipActive : ''}`}
            onClick={() => setActiveCats([])}
            style={
              activeCats.length === 0
                ? {
                    background: 'rgba(201,100,66,0.16)',
                    borderColor: 'rgba(201,100,66,0.5)',
                  }
                : undefined
            }
          >
            <span className={styles.catDot} style={{ background: 'var(--coral)' }} />
            All
          </button>
          {categories.map((c) => {
            const on = activeCats.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                className={`${styles.catChip} ${on ? styles.catChipActive : ''}`}
                onClick={() =>
                  setActiveCats(on ? activeCats.filter((x) => x !== c.id) : [...activeCats, c.id])
                }
                style={
                  on
                    ? { background: `${c.color}28`, borderColor: `${c.color}80` }
                    : undefined
                }
              >
                <span className={styles.catDot} style={{ background: c.color }} />
                {c.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
