import { PALETTE_RESULTS, type HeroQuery } from '../../lib/landing-data';
import styles from './HeroPalette.module.css';

type Props = {
  current: HeroQuery;
  typed: string;
};

export default function HeroPalette({ current, typed }: Props) {
  const riskMatch = current.filter.match(/risk:(\w+)/);
  const riskKey = riskMatch ? riskMatch[1] : 'LLM01';
  const results = PALETTE_RESULTS[riskKey] ?? PALETTE_RESULTS.LLM01;

  return (
    <div className={styles.palette}>
      <div className={styles.chrome}>
        <div className={styles.dots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <div className={styles.title}>yuntona · search</div>
        <div className={styles.cmdK}>⌘K</div>
      </div>

      <div className={styles.searchBar}>
        <div className={styles.searchLine}>
          <span className={styles.prompt}>›</span>
          <span className={styles.typed}>{typed}</span>
          <span className={styles.cursor} />
        </div>
        <div className={styles.filters}>
          {current.filter.split(' ').map((f) => {
            const [k, v] = f.split(':');
            return (
              <span key={f} className={styles.filterChip}>
                <span className={styles.filterKey}>{k}</span>
                <span>{v}</span>
              </span>
            );
          })}
          <span className={styles.hits}>{current.hits} results</span>
        </div>
      </div>

      <div className={styles.results}>
        {results.map((r, i) => (
          <div key={r.name} className={`${styles.row} ${i === 0 ? styles.rowActive : ''}`}>
            <span className={styles.rowNum}>{String(i + 1).padStart(2, '0')}</span>
            <div>
              <div className={styles.rowMeta}>
                <span className={styles.rowName}>{r.name}</span>
                <span className={styles.rowStage}>{r.stage}</span>
              </div>
              <div className={styles.rowDesc}>{r.desc}</div>
            </div>
            <div className={styles.rowTags}>
              {r.tags.map((t) => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.hints}>
        <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
        <span><kbd>↵</kbd> open</span>
        <span><kbd>/</kbd> filter</span>
        <span className={styles.hintsRight}>yuntona.ai</span>
      </div>
    </div>
  );
}
