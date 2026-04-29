import styles from './Graph.module.css';

export type LegendItem = { dot?: string; label: string };

type Props = {
  title: string;
  items: LegendItem[];
  footnote?: string;
};

export default function ViewLegend({ title, items, footnote }: Props) {
  return (
    <div className={styles.legend}>
      <div className={styles.legendTitle}>{title}</div>
      <div className={styles.legendItems}>
        {items.map((it, i) => (
          <div key={i} className={styles.legendItem}>
            {it.dot ? (
              <span className={styles.legendDot} style={{ background: it.dot }} />
            ) : (
              <span className={styles.legendBar} />
            )}
            <span>{it.label}</span>
          </div>
        ))}
      </div>
      {footnote && <div className={styles.legendFootnote}>{footnote}</div>}
    </div>
  );
}
