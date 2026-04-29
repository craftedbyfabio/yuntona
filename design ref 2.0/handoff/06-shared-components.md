# 06 · Shared Components

Patterns used across every page. If you're porting incrementally, apply these first in `css/site.css` so they're available everywhere.

## Site nav

Existing HTML stays the same. Only the palette changes via the token update. Two small additions:

```css
/* Stronger bg opacity so scrolled content doesn't bleed through sticky nav */
.site-nav {
  background: rgba(10, 14, 20, 0.92);
  backdrop-filter: blur(16px) saturate(140%);
}

/* Active-route underline uses coral */
.site-nav .nav-link[aria-current="page"]::after,
.site-nav .nav-link:hover::after { background: var(--coral); }

/* Updated wordmark type — Fraunces small caps feel */
.site-nav .wordmark { font-family: var(--font-mono); font-size: 13px; letter-spacing: 0.18em; font-weight: 600; }
```

## Footer

Update the inline octopus SVG's cyan tentacle:

```html
<!-- OLD: fill="#22d3ee" -->
<path d="M58 50 L86 15 L68 15 L50 50 Z" fill="#c96442"/>
```

## Announce bar

```css
.announce-bar { background: var(--surface); border-bottom: 1px solid var(--border); padding: 10px 20px; text-align: center; }
.announce-bar a { font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); text-decoration: none; letter-spacing: 0.04em; }
.announce-bar a strong { color: var(--coral); font-weight: 600; }
.announce-bar a .sep { color: var(--text-faint); margin: 0 10px; }
```

## Buttons

```css
.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--coral); color: var(--bg);
  font-family: var(--font-body); font-weight: 600; font-size: 14px;
  padding: 12px 22px; border-radius: var(--radius);
  text-decoration: none; border: 1px solid var(--coral);
  transition: filter 0.2s, transform 0.2s;
  cursor: pointer;
}
.btn-primary:hover { filter: brightness(1.08); transform: translateY(-1px); }

.btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  background: transparent; color: var(--text);
  font-family: var(--font-body); font-weight: 500; font-size: 14px;
  padding: 12px 22px; border-radius: var(--radius);
  text-decoration: none; border: 1px solid var(--border-hover);
  cursor: pointer;
  transition: border-color 0.2s;
}
.btn-ghost:hover { border-color: var(--text-muted); }
```

## Chips & badges (shared everywhere)

```css
/* Generic kelp chip — tags, filters, neutral metadata */
.chip {
  font-family: var(--font-mono); font-size: 11px;
  color: var(--kelp-soft);
  background: var(--kelp-glow);
  border: 1px solid var(--kelp-border);
  padding: 4px 8px; border-radius: 4px;
  white-space: nowrap;
}
.chip em { font-style: normal; color: var(--text); }

/* Risk chip — LLM (kelp) / ASI (coral) */
.risk-chip {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-mono); font-size: 11px;
  padding: 4px 8px; border-radius: 4px;
  white-space: nowrap;          /* CRITICAL — prevents intra-chip wrap */
  text-decoration: none;
}
.risk-chip--llm { background: var(--kelp-glow); color: var(--kelp-soft); border: 1px solid var(--kelp-border); }
.risk-chip--asi { background: var(--coral-glow); color: var(--coral); border: 1px solid var(--coral-border); }

/* Meta badge — stage / pricing / complexity */
.meta-badge {
  font-family: var(--font-mono); font-size: 10px;
  color: var(--text-faint);
  background: var(--bg);
  border: 1px solid var(--border);
  padding: 2px 7px; border-radius: 3px;
  letter-spacing: 0.02em;
}

/* Cred tag — certifications, credentials */
.cred-tag {
  font-family: var(--font-mono); font-size: 11px;
  color: var(--text-muted);
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 4px 10px; border-radius: 4px;
}

/* Active-filter pill (directory) */
.pill {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-mono); font-size: 11px;
  color: var(--coral);
  background: var(--coral-glow);
  border: 1px solid var(--coral-border);
  padding: 4px 4px 4px 10px; border-radius: 4px;
}
.pill button { background: none; border: none; color: var(--coral); cursor: pointer; padding: 0 6px; font-size: 14px; line-height: 1; }
```

## Kickers & mono labels

```css
.kicker {
  font-family: var(--font-mono);
  font-size: 11px; font-weight: 500;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--coral);
}

.meta-strip {
  display: flex; gap: 12px; flex-wrap: wrap;
  font-family: var(--font-mono); font-size: 11px;
  color: var(--text-faint);
}
```

## Italic-accent span (for display headlines)

```css
.italic-accent {
  font-family: var(--font-italic);
  font-style: italic;
  font-weight: 400;
  color: var(--kelp-soft);
}
```

Use inside Fraunces headings only, for a single word or short phrase:

```html
<h1>How we <em class="italic-accent">curate</em>.</h1>
```

## Section numbers (universal pattern)

Always stack number *above* title — never inline. Prevents narrow-viewport wraps:

```css
.section-num {
  font-family: var(--font-mono);
  font-size: 12px; color: var(--coral);
  letter-spacing: 0.08em; margin-bottom: 6px;
}
```

```html
<section>
  <div class="section-num">01</div>
  <h2>Philosophy</h2>
  ...
</section>
```

## Callouts

```css
.callout { padding: 22px 24px; border-radius: var(--radius-lg); margin: 28px 0; }
.callout p { font-size: 14px; color: var(--text-muted); line-height: 1.65; margin: 0; }
.callout-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
.callout-dot { width: 6px; height: 6px; border-radius: 3px; }

.callout--kelp { background: linear-gradient(180deg, var(--kelp-glow), transparent); border: 1px solid var(--kelp-border); }
.callout--kelp .callout-label { color: var(--kelp-soft); }
.callout--kelp .callout-dot { background: var(--kelp-soft); }

.callout--coral { background: var(--coral-glow); border: 1px solid var(--coral-border); border-left: 3px solid var(--coral); }
.callout--coral .callout-label { color: var(--coral); }
.callout--coral .callout-dot { background: var(--coral); }

.callout--warm { background: var(--warm-glow); border: 1px solid var(--warm-border); }
.callout--warm .callout-label { color: var(--warm); }
.callout--warm .callout-dot { background: var(--warm); }
```

## Pull quote (long-form)

```css
.pull-quote {
  margin: 28px 0;
  padding: 18px 24px;
  border-left: 3px solid var(--coral);
  font-family: var(--font-italic);
  font-style: italic;
  font-size: 22px;
  line-height: 1.35;
  color: var(--text);
  background: var(--coral-glow);
}
```

## Cards

```css
.card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 22px; transition: border-color 0.2s, transform 0.2s; }
.card:hover { border-color: var(--border-hover); transform: translateY(-1px); }
```

## Input (search)

```css
.input-field {
  display: flex; align-items: center; gap: 10px;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 10px 14px;
  font-family: var(--font-mono);
}
.input-field:focus-within { border-color: var(--coral-border); }
.input-field input {
  flex: 1; background: transparent; border: none; outline: none;
  color: var(--text); font-family: var(--font-body); font-size: 14px;
}
.input-field input::placeholder { color: var(--text-faint); }
```
