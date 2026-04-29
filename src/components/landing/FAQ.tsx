import { useState } from 'react';
import { FAQS } from '../../lib/landing-data';
import styles from './FAQ.module.css';

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <div className={styles.list}>
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={styles.item}>
            <button
              type="button"
              className={styles.button}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.q}>{f.q}</span>
              <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}>+</span>
            </button>
            <div className={`${styles.body} ${isOpen ? styles.bodyOpen : ''}`}>
              <div className={styles.answer}>{f.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
