import { useMemo } from 'react';
import type { Category, Risk, Stage, ToolNode } from '../../lib/graph-data';
import styles from './Graph.module.css';

export type Selection = { stage?: string; risk?: string } | null;

type Props = {
  selection: Selection;
  toolNodes: ToolNode[];
  categories: Category[];
  stages: Stage[];
  llmRisks: Risk[];
  asiRisks: Risk[];
  onClose: () => void;
};

export default function SidePanel({
  selection,
  toolNodes,
  categories,
  stages,
  llmRisks,
  asiRisks,
  onClose,
}: Props) {
  if (!selection) return null;

  const stage = selection.stage ? stages.find((s) => s.id === selection.stage) : undefined;
  const risk = selection.risk
    ? [...llmRisks, ...asiRisks].find((r) => r.id === selection.risk)
    : undefined;

  const matched = useMemo(() => {
    return toolNodes.filter((t) => {
      if (selection.stage && !t.stages.includes(selection.stage)) return false;
      if (selection.risk && !t.risks.includes(selection.risk)) return false;
      return true;
    });
  }, [toolNodes, selection]);

  const queryParts: string[] = [];
  if (selection.stage) queryParts.push(`stage=${selection.stage}`);
  if (selection.risk) queryParts.push(`risk=${selection.risk}`);
  const catalogHref = `/directory${queryParts.length > 0 ? '?' + queryParts.join('&') : ''}`;

  return (
    <aside className={styles.sidepanel} role="complementary" aria-label="Selection details">
      <div className={styles.spHeader}>
        <div className={styles.spHeaderRow}>
          <div className={styles.spLabel}>Intersection</div>
          <button type="button" className={styles.spClose} onClick={onClose} aria-label="Close panel">
            ×
          </button>
        </div>
        <div className={styles.spChips}>
          {stage && <span className={styles.spStageChip}>{stage.label}</span>}
          {stage && risk && <span className={styles.spX}>×</span>}
          {risk && (
            <span className={styles.spRiskChip}>
              {risk.id} · {risk.label}
            </span>
          )}
        </div>
        <div className={styles.spCount}>
          {matched.length} tool{matched.length === 1 ? '' : 's'} at this intersection
        </div>
      </div>

      <div className={styles.spList}>
        {matched.length === 0 ? (
          <div className={styles.spEmpty}>
            No tools match this intersection yet — coverage gap.
          </div>
        ) : (
          matched.map((t) => {
            const cat = categories.find((c) => c.id === t.cat);
            return (
              <a key={t.id} href={`/tool/${t.id}`} className={styles.spItem}>
                <div className={styles.spItemHeader}>
                  <div className={styles.spItemName}>{t.name}</div>
                  <svg
                    className={styles.spItemArrow}
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </div>
                {t.desc && <div className={styles.spItemDesc}>{t.desc}</div>}
                {cat && (
                  <div className={styles.spItemCat}>
                    <span className={styles.catDot} style={{ background: cat.color }} />
                    <span className={styles.spItemCatLabel}>{cat.label}</span>
                  </div>
                )}
              </a>
            );
          })
        )}
      </div>

      <div className={styles.spFooter}>
        <a href={catalogHref} className={styles.spCta}>
          Open in catalog →
        </a>
        <button type="button" className={styles.spCtaSecondary} disabled>
          Compare
        </button>
      </div>
    </aside>
  );
}
