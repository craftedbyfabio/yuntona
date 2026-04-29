import { useEffect, useState } from 'react';
import styles from './MethodologyTOC.module.css';

export type Section = { id: string; n: string; k: string };

type Props = { sections: Section[] };

export default function MethodologyTOC({ sections }: Props) {
  const [active, setActive] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= y) {
          setActive(sections[i].id);
          return;
        }
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [sections]);

  return (
    <aside className={styles.toc}>
      <div className={styles.label}>On this page</div>
      <nav className={styles.list}>
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`${styles.link} ${active === s.id ? styles.linkActive : ''}`}
          >
            <span className={styles.num}>{s.n}</span>
            <span className={styles.title}>{s.k}</span>
          </a>
        ))}
      </nav>
      <div className={styles.footer}>
        <div>161 tools indexed</div>
        <div>20 OWASP risks</div>
        <div>11 categories</div>
        <div>v1.7.0 · 2026-03-18</div>
      </div>
    </aside>
  );
}
