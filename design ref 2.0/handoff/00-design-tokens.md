# 00 · Design Tokens

Replace the `:root{}` block at the top of `css/site.css` with these tokens. Everything else in that file (nav, footer, utility classes) can stay — the tokens cascade through.

## Color palette

```css
:root {
  /* Base — deep near-black with cooler cast */
  --bg:          #0a0e14;
  --surface:     #10161f;       /* cards, panels */
  --surface-2:   #161d28;       /* elevated surfaces, input bg */
  --surface-3:   #1d2530;       /* hover states */

  /* Borders */
  --border:       rgba(255, 255, 255, 0.08);
  --border-hover: rgba(255, 255, 255, 0.16);
  --border-strong: rgba(255, 255, 255, 0.22);

  /* Text */
  --text:        #f0eee9;       /* warm off-white — not pure */
  --text-muted:  #c2cbd4;
  --text-dim:    #9aa6b2;
  --text-faint:  #6b7a88;

  /* Brand — kelp green (from octopus logo) */
  --kelp-deep:   #1f6b5e;       /* structural, borders, fills */
  --kelp:        #2d8572;       /* default kelp — links, active */
  --kelp-soft:   #7fb8aa;       /* text on dark, italic accent */
  --kelp-glow:   rgba(127, 184, 170, 0.08);
  --kelp-border: rgba(127, 184, 170, 0.30);

  /* Accent — coral (from the "o" in logo) */
  --coral:       #c96442;       /* CTAs, section numbers, emphasis */
  --coral-soft:  #e08a6b;       /* hover */
  --coral-glow:  rgba(201, 100, 66, 0.08);
  --coral-border:rgba(201, 100, 66, 0.30);

  /* Legacy aliases — keep so any existing uses don't break */
  --accent:       var(--coral);
  --accent-glow:  var(--coral-glow);
  --accent-glow2: rgba(201, 100, 66, 0.04);
  --accent-border:var(--coral-border);
  --accent-dark:  #a85234;

  /* Semantic */
  --warm:   #e0a963;
  --warm-glow:   rgba(224, 169, 99, 0.08);
  --warm-border: rgba(224, 169, 99, 0.30);
  --green:  #7fb8aa;             /* reuse kelp-soft for "good" */
  --red:    #e07373;
  --purple: #9988c9;

  /* Typography */
  --font-display: 'Fraunces', Georgia, serif;
  --font-italic:  'Instrument Serif', Georgia, serif;
  --font-body:    'Inter', system-ui, -apple-system, sans-serif;
  --font-mono:    'JetBrains Mono', ui-monospace, Menlo, monospace;

  /* Legacy aliases — pre-existing code uses these */
  --font-brand:   var(--font-display);

  /* Radii */
  --radius-sm: 4px;
  --radius:    8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
  --shadow:    0 8px 24px rgba(0,0,0,0.35);
  --shadow-lg: 0 24px 48px rgba(0,0,0,0.5);
}
```

## Font loading — replace the Fontshare link in every `<head>`

**Remove:**
```html
<link rel="preconnect" href="https://api.fontshare.com">
<link href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=general-sans@300,400,500,600,700&display=swap" rel="stylesheet">
```

**Replace with:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

## Type scale

```css
/* Body — Inter */
body { font-family: var(--font-body); font-size: 15px; line-height: 1.55; color: var(--text); }

/* Display headings — Fraunces */
h1 { font-family: var(--font-display); font-weight: 500; letter-spacing: -0.02em; line-height: 1.02; }
h2 { font-family: var(--font-display); font-weight: 500; letter-spacing: -0.02em; line-height: 1.05; }
h3 { font-family: var(--font-display); font-weight: 500; letter-spacing: -0.01em; line-height: 1.15; }

/* Hero h1: 56–64px. Section h2: 30–36px. Subsection h3: 20–24px. */

/* Italic accent — use sparingly, only in headings */
.italic-accent {
  font-family: var(--font-italic);
  font-style: italic;
  font-weight: 400;
  color: var(--kelp-soft);
}

/* Monospace kicker — above every section heading */
.kicker {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--coral);
}

/* Mono metadata — timestamps, counts, versions */
.meta-mono {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-faint);
  letter-spacing: 0.02em;
}
```

## Usage rules

1. **Coral** is for: primary CTAs, section number markers (01/02/...), the kicker color, link underlines on hover, the "active" state in nav. Never use it for body text.
2. **Kelp-soft** is for: italic display accents (in `<em class="italic-accent">`), "good" status (replacing green), sparing data highlights.
3. **Coral + kelp together** only in data dashboards (e.g. coverage cards) — do not mix them in decorative contexts.
4. **Mono** is for: all numbers, all dates/versions, all section markers, filter chips, code blocks, nav labels in admin contexts. Never for body copy.
5. **Fraunces** for all headings always. **Instrument Serif** italic only as a single word or short phrase accent within a heading.
