# 02 · Landing Page Spec (`index.html` + `css/landing.css`)

Reference preview in the design project: `Yuntona Landing.html`.

Keep existing:
- `<nav class="site-nav">` structure and classes (update palette only, via tokens — no HTML changes)
- `data-stat="tools"` / `data-stat="tags"` hooks — `site-config.js` injects live counts
- JSON-LD schema block in `<head>`
- Announce bar `<a href="/directory">` — single link, as today

## Section order (new)

1. Announce bar
2. Site nav (existing, updated colors)
3. **Hero** (split — copy left, command palette right)
4. **OWASP Coverage Matrix** (tabbed heatmap, replacing the Problem/Solution compare grid)
5. **Three Paths In** (numbered 01/02/03 with code-block samples)
6. **Positioning Table** (awesome-lists vs Yuntona vs analyst reports)
7. **Curator** (Fabio card, restyled)
8. **FAQ** (numbered accordion)
9. **Final CTA + metadata footer**
10. Site footer (existing, updated palette)

---

## 3 · Hero

### HTML

```html
<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <div class="kicker">
        <span class="kicker-dot"></span>
        Open Source · v1.7.0 · Updated 2026-03-18
      </div>
      <h1 class="hero-title">
        Security controls for your <em class="italic-accent">AI stack</em>.
      </h1>
      <p class="hero-sub">
        A curated index of <span data-stat="tools">161</span> AI security tools, mapped to the OWASP LLM Top 10 and Agentic Top 10. Search by risk, ask in plain English, or explore the knowledge graph.
      </p>
      <div class="hero-actions">
        <a href="/directory" class="btn-primary">Explore directory →</a>
        <a href="/graph" class="btn-ghost">Knowledge graph</a>
      </div>
      <div class="hero-stats">
        <div class="stat"><span class="stat-value" data-stat="tools">161</span><span class="stat-label">Tools</span></div>
        <div class="stat"><span class="stat-value">11</span><span class="stat-label">Categories</span></div>
        <div class="stat"><span class="stat-value">20</span><span class="stat-label">OWASP risks</span></div>
        <div class="stat"><span class="stat-value" data-stat="tags">233</span><span class="stat-label">Tags</span></div>
      </div>
    </div>

    <div class="palette">
      <div class="palette-bar">
        <span class="palette-prompt">›</span>
        <span class="palette-query" id="paletteQuery">tools for prompt injection in production</span>
        <span class="palette-caret"></span>
        <span class="palette-kbd">↵</span>
      </div>
      <div class="palette-filters">
        <span class="chip">risk:<em>LLM01</em></span>
        <span class="chip">stage:<em>runtime</em></span>
        <span class="chip">+2 more</span>
      </div>
      <div class="palette-results" id="paletteResults">
        <!-- populated via JS; 3 result rows -->
      </div>
      <div class="palette-footer">
        <span class="palette-count"><span id="paletteCount">3</span> results</span>
        <span>· 0.2s</span>
        <span>· Typesense + Gemini</span>
      </div>
    </div>
  </div>
</section>
```

### CSS

```css
.hero { padding: 80px 0 64px; border-bottom: 1px solid var(--border); }
.hero-grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: 64px; align-items: center; }

.kicker-dot { display:inline-block; width:6px; height:6px; border-radius:50%; background: var(--coral); margin-right:8px; vertical-align: 2px; }

.hero-title { font-size: clamp(40px, 5.5vw, 64px); margin: 18px 0 20px; max-width: 520px; }
.hero-sub { font-size: 17px; color: var(--text-muted); line-height: 1.65; max-width: 480px; margin: 0 0 28px; }

.hero-actions { display:flex; gap: 10px; flex-wrap: wrap; }
.hero-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 40px; padding-top: 28px; border-top: 1px solid var(--border); max-width: 520px; }
.stat-value { display:block; font-family: var(--font-mono); font-size: 22px; font-weight: 600; color: var(--text); }
.stat-label { display:block; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-faint); margin-top: 4px; }

/* Command palette mock */
.palette { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 18px; box-shadow: var(--shadow); }
.palette-bar { display:flex; align-items:center; gap:10px; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 12px 14px; font-family: var(--font-mono); }
.palette-prompt { color: var(--coral); }
.palette-query { flex:1; color: var(--text); font-size: 13px; }
.palette-caret { width: 2px; height: 14px; background: var(--coral); animation: blink 1s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }
.palette-kbd { font-size: 10px; color: var(--text-faint); border: 1px solid var(--border); border-radius: 4px; padding: 2px 6px; }

.palette-filters { display:flex; gap:6px; margin: 12px 0 14px; flex-wrap: wrap; }
.chip { font-family: var(--font-mono); font-size: 11px; color: var(--kelp-soft); background: var(--kelp-glow); border: 1px solid var(--kelp-border); padding: 4px 8px; border-radius: 4px; }
.chip em { font-style: normal; color: var(--text); }

.palette-results { display:flex; flex-direction:column; gap: 6px; }
.palette-row { display:flex; justify-content:space-between; align-items:center; padding: 10px 12px; background: var(--surface-2); border: 1px solid var(--border); border-radius: var(--radius); }
.palette-row-name { font-size: 13px; color: var(--text); }
.palette-row-meta { font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); margin-top: 2px; }
.palette-row-badge { font-family: var(--font-mono); font-size: 10px; padding: 3px 7px; border-radius: 3px; background: var(--kelp-glow); color: var(--kelp-soft); border: 1px solid var(--kelp-border); }

.palette-footer { display:flex; gap:4px; font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); margin-top: 14px; padding-top: 12px; border-top: 1px dashed var(--border); }
.palette-count { color: var(--coral); }
```

### JS (add to `js/landing.js`)

```js
// Cycling command-palette queries
const PALETTE_QUERIES = [
  { q: 'tools for prompt injection in production',
    filters: [['risk','LLM01'],['stage','runtime']],
    results: [
      { name: 'PromptArmor', meta: 'AI-native TPRM · LLM01, LLM02', badge: 'Enterprise' },
      { name: 'Lakera Guard', meta: 'Runtime guardrails · LLM01', badge: 'SaaS' },
      { name: 'Rebuff', meta: 'Self-hardening detector · LLM01', badge: 'Open Source' },
    ]
  },
  { q: 'MCP governance for agentic stacks',
    filters: [['cat','MCP Security'],['stage','govern']],
    results: [
      { name: 'Stacklok/ToolHive', meta: 'MCP runtime · ASI04', badge: 'Open Source' },
      { name: 'MintMCP', meta: 'MCP governance · ASI04, ASI02', badge: 'Enterprise' },
      { name: 'Runlayer', meta: 'Enterprise MCP · ASI04', badge: 'SaaS' },
    ]
  },
  { q: 'red-team evaluation for LLM apps',
    filters: [['cat','AI Red Teaming'],['stage','test']],
    results: [
      { name: 'garak', meta: 'LLM vulnerability scanner · LLM01, LLM02', badge: 'Open Source' },
      { name: 'Promptfoo', meta: 'Prompt eval harness · LLM01', badge: 'Open Source' },
      { name: 'HiddenLayer', meta: 'Enterprise AI security · LLM01', badge: 'Enterprise' },
    ]
  },
];
// Rotate every 3.5s — typewriter effect on .palette-query
```

---

## 4 · OWASP Coverage Matrix

Reuse the existing data (hardcoded risk counts in current `index.html`). New presentation: tabbed heatmap rather than compare-grid.

```html
<section class="coverage-matrix">
  <div class="container">
    <div class="kicker">OWASP mapping · 20 categories · 100% coverage</div>
    <h2>Every risk, every tool that addresses it.</h2>

    <div class="fw-tabs" role="tablist">
      <button class="fw-tab active" data-fw="llm">LLM Top 10 (2025)</button>
      <button class="fw-tab" data-fw="asi">Agentic Top 10 (2026)</button>
    </div>

    <div class="fw-panel active" id="fw-llm">
      <div class="risk-row">
        <span class="risk-code llm">LLM01</span>
        <span class="risk-name">Prompt Injection</span>
        <span class="risk-count">53</span>
        <span class="risk-bar" style="--pct: 100%;"></span>
      </div>
      <!-- LLM02–LLM10 same pattern, counts from existing HTML -->
    </div>
    <div class="fw-panel" id="fw-asi">
      <!-- ASI01–ASI10 same pattern -->
    </div>
  </div>
</section>
```

### CSS

```css
.coverage-matrix { padding: 80px 0; border-bottom: 1px solid var(--border); }
.coverage-matrix h2 { font-size: 40px; margin: 14px 0 32px; max-width: 600px; }

.fw-tabs { display:inline-flex; gap: 2px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 3px; margin-bottom: 24px; }
.fw-tab { font-family: var(--font-mono); font-size: 11px; background: transparent; border: none; padding: 8px 16px; border-radius: 5px; color: var(--text-faint); cursor: pointer; letter-spacing: 0.04em; }
.fw-tab.active { background: var(--coral); color: var(--bg); }

.fw-panel { display: none; }
.fw-panel.active { display: block; }

.risk-row { display: grid; grid-template-columns: 70px 1fr 48px 200px; align-items: center; gap: 16px; padding: 12px 0; border-bottom: 1px solid var(--border); }
.risk-row:last-child { border-bottom: none; }
.risk-code { font-family: var(--font-mono); font-size: 12px; font-weight: 600; }
.risk-code.llm { color: var(--kelp-soft); }
.risk-code.asi { color: var(--coral); }
.risk-name { font-size: 15px; color: var(--text); }
.risk-count { font-family: var(--font-mono); font-size: 13px; font-weight: 600; text-align: right; color: var(--text); }
.risk-bar { height: 4px; background: var(--surface-2); border-radius: 2px; position: relative; overflow: hidden; }
.risk-bar::after { content: ''; position: absolute; inset: 0; width: var(--pct); background: linear-gradient(90deg, var(--kelp-deep), var(--kelp-soft)); border-radius: 2px; }
.fw-panel#fw-asi .risk-bar::after { background: linear-gradient(90deg, var(--accent-dark), var(--coral)); }
```

Compute `--pct` inline per row: `max-count` is 53 (LLM01); scale others relative to it. E.g. `style="--pct: calc(13 / 53 * 100%);"`.

---

## 5 · Three Paths In

```html
<section class="paths">
  <div class="container">
    <div class="kicker">Entry points · pick your path</div>
    <h2>Three ways to find what you need.</h2>
    <div class="paths-grid">
      <a href="/directory?risk=LLM01" class="path-card">
        <div class="path-num">01</div>
        <div class="path-title">Filter by risk</div>
        <p class="path-desc">Start from a specific OWASP code. The directory filters to matching tools with category counts.</p>
        <pre class="path-code">GET /directory<span>?risk=LLM01</span></pre>
      </a>
      <a href="/directory?q=" class="path-card">
        <div class="path-num">02</div>
        <div class="path-title">Ask in plain English</div>
        <p class="path-desc">Natural-language search parses intent, extracts filters, and returns ranked results.</p>
        <pre class="path-code"><span>›</span> open source tools for MCP security</pre>
      </a>
      <a href="/graph" class="path-card">
        <div class="path-num">03</div>
        <div class="path-title">Explore the graph</div>
        <p class="path-desc">Interactive network of every tool, risk, and lifecycle stage. Click to reveal coverage clusters.</p>
        <pre class="path-code">nodes <span>161</span> · edges <span>420+</span></pre>
      </a>
    </div>
  </div>
</section>
```

```css
.paths { padding: 80px 0; border-bottom: 1px solid var(--border); }
.paths h2 { font-size: 40px; margin: 14px 0 32px; max-width: 600px; }
.paths-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.path-card { display:block; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 28px; text-decoration:none; color: inherit; transition: border-color .2s, transform .2s; }
.path-card:hover { border-color: var(--border-hover); transform: translateY(-2px); }
.path-num { font-family: var(--font-mono); font-size: 11px; color: var(--coral); letter-spacing: 0.1em; margin-bottom: 18px; }
.path-title { font-family: var(--font-display); font-size: 22px; font-weight: 500; margin-bottom: 10px; }
.path-desc { font-size: 13px; color: var(--text-muted); line-height: 1.6; margin-bottom: 18px; }
.path-code { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 10px 12px; overflow-x: auto; }
.path-code span { color: var(--kelp-soft); }
```

---

## 6 · Positioning Table

Replace the compare-grid with an actual three-column table:

```html
<section class="positioning">
  <div class="container">
    <div class="kicker">Positioning</div>
    <h2>Between an awesome-list and an analyst report.</h2>
    <div class="pos-table">
      <div class="pos-row pos-header">
        <span></span>
        <span>Awesome-lists</span>
        <span class="pos-yuntona">Yuntona</span>
        <span>Analyst reports</span>
      </div>
      <div class="pos-row"><span>Risk mapping</span><span>—</span><span class="pos-yuntona">OWASP LLM + Agentic</span><span>Partial</span></div>
      <div class="pos-row"><span>Practitioner evaluation</span><span>Crowd-sourced</span><span class="pos-yuntona">Hand-written</span><span>Analyst-written</span></div>
      <div class="pos-row"><span>Search</span><span>Ctrl+F</span><span class="pos-yuntona">Typesense + LLM</span><span>PDF</span></div>
      <div class="pos-row"><span>Price</span><span>Free</span><span class="pos-yuntona">Free · MIT</span><span>$$$</span></div>
      <div class="pos-row"><span>Update cadence</span><span>When PR merged</span><span class="pos-yuntona">Rolling</span><span>Quarterly</span></div>
      <div class="pos-row"><span>Accountability</span><span>—</span><span class="pos-yuntona">Single curator</span><span>Analyst firm</span></div>
    </div>
  </div>
</section>
```

```css
.positioning { padding: 80px 0; border-bottom: 1px solid var(--border); }
.pos-table { border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
.pos-row { display: grid; grid-template-columns: 1.2fr 1fr 1fr 1fr; padding: 14px 20px; border-bottom: 1px solid var(--border); font-size: 14px; }
.pos-row:last-child { border-bottom: none; }
.pos-header { background: var(--surface); font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-faint); }
.pos-row > span:first-child { color: var(--text-muted); }
.pos-row > span:not(:first-child) { color: var(--text-faint); }
.pos-yuntona { color: var(--text) !important; background: var(--coral-glow); padding: 4px 10px; border-radius: 4px; margin: -4px -4px; font-weight: 500; }
.pos-header .pos-yuntona { background: transparent; color: var(--coral) !important; }
```

---

## 7 · Curator card

```html
<section class="curator">
  <div class="container curator-grid">
    <div>
      <div class="kicker">Curator · single accountable</div>
      <h2><em class="italic-accent">One</em> practitioner. No committee.</h2>
      <p class="curator-bio">Security practitioner with over a decade spanning SOC/NOC operations, third-party cyber risk, financial services regulation, and hands-on AI security research.</p>
      <div class="cred-tags">
        <span class="cred-tag">CISSP</span>
        <span class="cred-tag">MSc InfoSec · Royal Holloway</span>
        <span class="cred-tag">GCHQ-certified</span>
        <span class="cred-tag">FCA · TPRM</span>
      </div>
      <div class="curator-links">
        <a href="https://www.linkedin.com/in/fbaumeler" target="_blank" rel="noopener">LinkedIn ↗</a>
        <a href="https://github.com/craftedbyfabio" target="_blank" rel="noopener">GitHub ↗</a>
        <a href="/methodology">Methodology →</a>
      </div>
    </div>
    <div class="curator-card">
      <img src="/img/fabio.jpg" alt="Fabio Baumeler" width="120" height="120" class="curator-avatar">
      <div class="curator-name">Fabio Baumeler</div>
      <div class="curator-role">Third-Party Cyber Risk Lead<br>Financial Conduct Authority</div>
    </div>
  </div>
</section>
```

Two-column, photo on the right, bio + creds on the left. Photo frame uses `border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 32px; background: var(--surface);` — treat it like a well-designed polaroid.

---

## 8 · FAQ (numbered accordion)

Keep existing `<div class="faq-item">` structure (JS toggle logic in `landing.js` stays), but update the visual:

```css
.faq { padding: 80px 0; border-bottom: 1px solid var(--border); }
.faq-item { border-bottom: 1px solid var(--border); padding: 0; background: none; border-radius: 0; }
.faq-item:hover { border-color: var(--border); }
.faq-q { display:grid; grid-template-columns: 48px 1fr auto; gap: 16px; align-items:center; padding: 24px 0; cursor: pointer; }
.faq-q::before { content: attr(data-num); font-family: var(--font-mono); font-size: 11px; color: var(--coral); }
.faq-q-title { font-family: var(--font-display); font-size: 20px; font-weight: 500; color: var(--text); }
.faq-icon { color: var(--text-faint); }
.faq-item.open .faq-icon { color: var(--coral); }
.faq-a { padding: 0 0 24px 64px; }
.faq-a p { font-size: 15px; color: var(--text-muted); line-height: 1.65; max-width: 600px; }
```

Add `data-num="01"`, `data-num="02"` etc. to each `.faq-q`.

---

## 9 · Final CTA + metadata

Drop the boxy `.cta-box` and replace with a full-bleed quiet CTA:

```html
<section class="final-cta">
  <div class="container">
    <h2><em class="italic-accent">Close</em> the blind spots in your AI risk coverage.</h2>
    <div class="final-actions">
      <a href="/directory" class="btn-primary">Explore directory →</a>
      <a href="https://github.com/craftedbyfabio/yuntona" class="btn-ghost">Star on GitHub ★</a>
    </div>
    <div class="meta-strip">
      <span>v1.7.0</span>
      <span>·</span>
      <span><span data-stat="tools">161</span> tools</span>
      <span>·</span>
      <span>20 OWASP risks</span>
      <span>·</span>
      <span>Last updated 2026-03-18</span>
      <span>·</span>
      <span>MIT · Open source</span>
    </div>
  </div>
</section>
```

```css
.final-cta { padding: 96px 0; text-align: center; }
.final-cta h2 { font-size: 48px; max-width: 720px; margin: 0 auto 32px; }
.final-actions { display:flex; gap: 10px; justify-content:center; margin-bottom: 48px; }
.meta-strip { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); }
```

---

## Buttons

```css
.btn-primary { display:inline-flex; align-items:center; gap:8px; background: var(--coral); color: var(--bg); font-weight: 600; font-size: 14px; padding: 12px 22px; border-radius: var(--radius); text-decoration: none; border: 1px solid var(--coral); transition: filter .2s, transform .2s; }
.btn-primary:hover { filter: brightness(1.08); transform: translateY(-1px); }
.btn-ghost { display:inline-flex; align-items:center; gap:8px; background: transparent; color: var(--text); font-weight: 500; font-size: 14px; padding: 12px 22px; border-radius: var(--radius); text-decoration: none; border: 1px solid var(--border-hover); }
.btn-ghost:hover { border-color: var(--text-muted); }
```

---

## Responsive

- `.hero-grid`, `.paths-grid`, `.curator-grid`, `.pos-table` all collapse to single column at 768px
- `.palette` compresses padding and stays visible
- Hero h1 already uses `clamp()`
- Stat row collapses to 2×2 on mobile
