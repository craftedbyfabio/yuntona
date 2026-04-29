import { useEffect, useState } from 'react';
import { HERO_QUERIES } from '../../lib/landing-data';
import HeroPalette from './HeroPalette';
import styles from './Hero.module.css';

const STATS = [
  ['161', 'tools'],
  ['20',  'risks'],
  ['11',  'categories'],
  ['233', 'tags'],
] as const;

export default function Hero() {
  const [qi, setQi] = useState(0);
  const [typed, setTyped] = useState('');
  const current = HERO_QUERIES[qi];

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      if (i > current.q.length) {
        clearInterval(id);
        setTimeout(() => {
          setQi((v) => (v + 1) % HERO_QUERIES.length);
          setTyped('');
        }, 2800);
        return;
      }
      setTyped(current.q.slice(0, i));
    }, 38);
    return () => clearInterval(id);
  }, [qi, current.q]);

  return (
    <section className={styles.hero}>
      <div className={styles.gridBackdrop} aria-hidden="true" />

      <div className={styles.inner}>
        <div>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            <span>161 TOOLS · OWASP LLM + AGENTIC TOP 10 · MIT</span>
          </div>

          <h1 className={styles.headline}>
            Security controls<br />
            for your <em>AI stack</em>,<br />
            indexed by risk.
          </h1>

          <p className={styles.lead}>
            The OWASP LLM &amp; Agentic Top 10 describe <em>what</em> can go wrong. Yuntona is the
            practitioner-curated map from each risk to the specific tools that address it.
          </p>

          <div className={styles.ctaRow}>
            <a href="/directory" className={styles.ctaPrimary}>
              Browse directory
              <span className={styles.arrow}>→</span>
            </a>
            <a href="/graph" className={styles.ctaGhost}>
              Explore knowledge graph
            </a>
          </div>

          <div className={styles.statRow}>
            {STATS.map(([n, l]) => (
              <div key={l}>
                <div className={styles.statValue}>{n}</div>
                <div className={styles.statLabel}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <HeroPalette current={current} typed={typed} />
      </div>
    </section>
  );
}
