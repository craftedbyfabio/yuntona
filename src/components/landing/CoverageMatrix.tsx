import { useState } from 'react';
import { LLM_RISKS, ASI_RISKS } from '../../lib/landing-data';
import styles from './CoverageMatrix.module.css';

type Tab = 'LLM' | 'ASI';

const TABS: Array<[Tab, string]> = [
  ['LLM', 'OWASP LLM Top 10 · 2025'],
  ['ASI', 'OWASP Agentic Top 10 · 2026'],
];

export default function CoverageMatrix() {
  const [tab, setTab] = useState<Tab>('LLM');
  const risks = tab === 'LLM' ? LLM_RISKS : ASI_RISKS;
  const max = Math.max(...risks.map((r) => r.count));

  return (
    <div className={styles.inner}>
      <p className={styles.lead}>
        Twenty risk categories. 161 tools. Every cell below is a live filter — one click takes you
        to the tools that cover that specific risk.
      </p>

      <div className={styles.tabs} role="tablist">
        {TABS.map(([k, l]) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={tab === k}
            className={`${styles.tab} ${tab === k ? styles.tabActive : ''}`}
            onClick={() => setTab(k)}
          >
            {l}
          </button>
        ))}
      </div>

      <div className={styles.heatmap}>
        {risks.map((r) => {
          const pct = (r.count / max) * 100;
          return (
            <a key={r.id} href={`/directory?risk=${r.id}`} className={styles.row}>
              <span className={styles.rowId}>{r.id}</span>
              <span className={styles.rowName}>{r.name}</span>
              <div className={styles.bar}>
                <div className={styles.barFill} style={{ width: `${pct}%` }} />
              </div>
              <span className={styles.rowCount}>
                {String(r.count).padStart(3, ' ')}{' '}
                <span className={styles.rowCountLabel}>tools</span>
              </span>
            </a>
          );
        })}
      </div>

      <div className={styles.metaRow}>
        <span>· Counts updated 2026-04-22</span>
        <span>· v1.7.0</span>
        <span>· Tools may address multiple risks</span>
      </div>
    </div>
  );
}
