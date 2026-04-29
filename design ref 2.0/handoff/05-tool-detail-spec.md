# 05 · Tool Detail Page Spec

Reference preview: `Yuntona Tool Page.html` in the design project.

**Existing generation:** The repo's `tools/` folder suggests each tool page is generated from `data/tools.json` (verify by opening one HTML file + any build script). Keep whatever generation mechanism exists — only the HTML template and CSS change.

## HTML structure

```html
<section class="tool-page">
  <!-- Hero -->
  <header class="tool-hero">
    <div class="tool-hero-inner">
      <div class="tool-hero-glyph">L</div>
      <div class="tool-hero-body">
        <div class="tool-hero-meta">
          <span class="tool-type-badge tool-type-badge--agentic">Agentic</span>
          <span class="tool-bread"><a href="/directory">directory</a> / <span>lakera-guard</span></span>
        </div>
        <h1 class="tool-hero-name">Lakera Guard</h1>
        <p class="tool-hero-tagline">Runtime AI guardrails that detect prompt injection, PII leakage, and toxic output before they reach users.</p>
        <div class="tool-hero-cta">
          <a href="https://lakera.ai" class="btn-primary">Visit site ↗</a>
          <button class="btn-ghost" data-copy-yaml>Copy YAML</button>
          <a href="https://github.com/craftedbyfabio/yuntona/issues/new?template=tool-suggestion.md" class="btn-ghost">Suggest edit</a>
        </div>
      </div>
    </div>
  </header>

  <div class="tool-grid">
    <!-- Main content (left) -->
    <main class="tool-body">
      <section class="tool-section">
        <div class="section-num">01</div>
        <h2>What it does</h2>
        <p>...hand-written description...</p>
      </section>

      <section class="tool-section">
        <div class="section-num">02</div>
        <h2>Security relevance</h2>
        <p>...</p>
      </section>

      <section class="tool-section">
        <div class="section-num">03</div>
        <h2>When to use it</h2>
        <p>...</p>
      </section>

      <section class="tool-section">
        <div class="section-num">04</div>
        <h2>OWASP coverage</h2>
        <div class="owasp-strip">
          <div class="owasp-strip-label">LLM Top 10 · 2025</div>
          <div class="owasp-strip-grid">
            <!-- 10 cells, covered ones filled -->
            <div class="cell on" title="LLM01"></div>
            <div class="cell on" title="LLM02"></div>
            <div class="cell" title="LLM03"></div>
            <div class="cell" title="LLM04"></div>
            <div class="cell on" title="LLM05"></div>
            <div class="cell" title="LLM06"></div>
            <div class="cell" title="LLM07"></div>
            <div class="cell" title="LLM08"></div>
            <div class="cell" title="LLM09"></div>
            <div class="cell" title="LLM10"></div>
          </div>
          <div class="owasp-chips">
            <a class="risk-chip risk-chip--llm">LLM01 · Prompt Injection</a>
            <a class="risk-chip risk-chip--llm">LLM02 · Sensitive Disclosure</a>
            <a class="risk-chip risk-chip--llm">LLM05 · Improper Output Handling</a>
          </div>
        </div>
        <div class="owasp-strip">
          <div class="owasp-strip-label">Agentic Top 10 · 2026</div>
          <div class="owasp-strip-grid">
            <div class="cell" title="ASI01"></div>
            <div class="cell on" title="ASI02"></div>
            <!-- ... -->
          </div>
          <div class="owasp-chips">
            <a class="risk-chip risk-chip--asi">ASI06 · Lack of Runtime Guardrails</a>
          </div>
        </div>
      </section>

      <section class="tool-section">
        <div class="section-num">05</div>
        <h2>The raw record</h2>
        <pre class="yaml-block"><code><span class="yaml-k">id:</span> <span class="yaml-v">lakera-guard</span>
<span class="yaml-k">name:</span> <span class="yaml-v">Lakera Guard</span>
<span class="yaml-k">vendor:</span> <span class="yaml-v">Lakera AI</span>
<span class="yaml-k">category:</span> <span class="yaml-v">AI Guardrails &amp; Firewalls</span>
<span class="yaml-k">owasp_llm:</span> <span class="yaml-v">[LLM01, LLM02, LLM05]</span>
<span class="yaml-k">owasp_asi:</span> <span class="yaml-v">[ASI06]</span>
<span class="yaml-k">complexity:</span> <span class="yaml-v">Guided Setup</span>
<span class="yaml-k">pricing:</span> <span class="yaml-v">SaaS</span>
<span class="yaml-k">url:</span> <span class="yaml-v">https://lakera.ai</span>
<span class="yaml-k">updated:</span> <span class="yaml-v">2026-03-12</span>
</code></pre>
      </section>

      <section class="tool-section">
        <div class="section-num">06</div>
        <h2>Activity</h2>
        <ul class="timeline">
          <li><span class="timeline-date">2026-03-12</span><span class="timeline-kind">release</span><span class="timeline-desc">v2.4 — Expanded MCP tool-call inspection</span></li>
          <li><span class="timeline-date">2026-02-08</span><span class="timeline-kind">audit</span><span class="timeline-desc">SOC 2 Type II recertified</span></li>
          <li><span class="timeline-date">2025-11-20</span><span class="timeline-kind">announce</span><span class="timeline-desc">Series B funding, $40M</span></li>
        </ul>
      </section>
    </main>

    <!-- Sidebar (right) -->
    <aside class="tool-aside">
      <div class="aside-card">
        <div class="kicker">At a glance</div>
        <dl class="glance">
          <dt>Category</dt><dd>AI Guardrails &amp; Firewalls</dd>
          <dt>Stage</dt><dd>Runtime</dd>
          <dt>Audience</dt><dd>Builder · Blue team</dd>
          <dt>Complexity</dt><dd>Guided setup</dd>
          <dt>Pricing</dt><dd>SaaS · Enterprise</dd>
          <dt>Agentic</dt><dd>Yes</dd>
          <dt>Updated</dt><dd>2026-03-12</dd>
        </dl>
      </div>
      <div class="aside-card">
        <div class="kicker">Certifications</div>
        <div class="cert-list">
          <span class="cred-tag">SOC 2 Type II</span>
          <span class="cred-tag">ISO 27001</span>
          <span class="cred-tag">GDPR ready</span>
        </div>
      </div>
      <div class="aside-meta">
        <div>id · lakera-guard</div>
        <div>added · 2024-06-18</div>
        <div>reviewed · 2026-03-12</div>
      </div>
    </aside>
  </div>

  <!-- Related tools -->
  <section class="tool-related">
    <div class="container">
      <div class="kicker">Related tools</div>
      <h2>Alternatives &amp; complements</h2>
      <div class="related-grid">
        <!-- 3 tool cards (reuse .tool-row styles from directory) -->
      </div>
    </div>
  </section>
</section>
```

## CSS

```css
/* Hero */
.tool-hero { border-bottom: 1px solid var(--border); padding: 48px 0; }
.tool-hero-inner { max-width: 1240px; margin: 0 auto; padding: 0 32px; display: grid; grid-template-columns: 72px 1fr; gap: 24px; align-items: flex-start; }
.tool-hero-glyph { width: 72px; height: 72px; border-radius: var(--radius-lg); background: var(--surface-2); display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 34px; color: var(--kelp-soft); border: 1px solid var(--border); }
.tool-hero-meta { display: flex; gap: 14px; align-items: center; margin-bottom: 10px; }
.tool-type-badge { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 10px; border-radius: 3px; }
.tool-type-badge--llm { background: var(--kelp-glow); color: var(--kelp-soft); border: 1px solid var(--kelp-border); }
.tool-type-badge--agentic { background: var(--coral-glow); color: var(--coral); border: 1px solid var(--coral-border); }
.tool-bread { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); }
.tool-bread a { color: var(--text-dim); text-decoration: none; }
.tool-hero-name { font-size: clamp(36px, 5vw, 56px); margin: 6px 0 12px; letter-spacing: -0.02em; }
.tool-hero-tagline { font-size: 17px; color: var(--text-muted); line-height: 1.55; max-width: 720px; margin: 0 0 22px; }
.tool-hero-cta { display: flex; gap: 10px; flex-wrap: wrap; }

/* Two-column body */
.tool-grid { max-width: 1240px; margin: 0 auto; padding: 48px 32px; display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 56px; }
.tool-body { min-width: 0; }

/* Sections — number ABOVE title (fix narrow-viewport wrap) */
.tool-section { margin-bottom: 56px; }
.tool-section .section-num { font-family: var(--font-mono); font-size: 12px; color: var(--coral); letter-spacing: 0.08em; margin-bottom: 6px; }
.tool-section h2 { font-size: 30px; margin: 0 0 18px; line-height: 1.1; }
.tool-section p { font-size: 15px; color: var(--text-muted); line-height: 1.7; margin: 0 0 16px; }

/* OWASP strips */
.owasp-strip { margin-bottom: 28px; padding: 18px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); }
.owasp-strip-label { font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px; }
.owasp-strip-grid { display: grid; grid-template-columns: repeat(10, minmax(0, 1fr)); gap: 4px; margin-bottom: 14px; }
.owasp-strip-grid .cell { height: 28px; border-radius: 3px; min-width: 0; background: var(--surface-3); border: 1px solid var(--border); }
.owasp-strip-grid .cell.on { background: linear-gradient(180deg, var(--kelp), var(--kelp-deep)); border-color: var(--kelp-border); }
.owasp-strip .risk-chip--asi.on, /* when strip is agentic, use coral */
.owasp-strip.asi .cell.on { background: linear-gradient(180deg, var(--coral), #a85234); border-color: var(--coral-border); }
.owasp-chips { display: flex; gap: 6px; flex-wrap: wrap; }

/* YAML block */
.yaml-block { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 20px; font-family: var(--font-mono); font-size: 13px; line-height: 1.7; overflow-x: auto; color: var(--text-muted); }
.yaml-k { color: var(--kelp-soft); }
.yaml-v { color: var(--text); }

/* Timeline */
.timeline { list-style: none; padding: 0; margin: 0; position: relative; border-left: 1px dashed var(--border); padding-left: 20px; }
.timeline li { position: relative; padding: 10px 0; display: grid; grid-template-columns: 100px 100px 1fr; gap: 12px; font-size: 13px; }
.timeline li::before { content: ''; position: absolute; left: -26px; top: 18px; width: 8px; height: 8px; border-radius: 50%; background: var(--coral); border: 2px solid var(--bg); }
.timeline-date { font-family: var(--font-mono); color: var(--text-faint); }
.timeline-kind { font-family: var(--font-mono); color: var(--kelp-soft); text-transform: uppercase; letter-spacing: 0.08em; font-size: 11px; padding-top: 1px; }
.timeline-desc { color: var(--text-muted); }

/* Sidebar */
.tool-aside { position: sticky; top: 90px; align-self: start; display: flex; flex-direction: column; gap: 14px; }
.aside-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 18px 20px; }
.aside-card .kicker { margin-bottom: 12px; }
.glance { display: grid; grid-template-columns: auto 1fr; gap: 8px 16px; margin: 0; font-size: 13px; }
.glance dt { font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); letter-spacing: 0.08em; text-transform: uppercase; align-self: center; }
.glance dd { margin: 0; color: var(--text); }
.cert-list { display: flex; gap: 6px; flex-wrap: wrap; }
.aside-meta { font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); line-height: 1.8; padding: 14px 20px; }

/* Related */
.tool-related { border-top: 1px solid var(--border); padding: 64px 0; }
.tool-related h2 { font-size: 30px; margin: 8px 0 28px; }
.related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }

/* Responsive */
@media (max-width: 900px) {
  .tool-grid { grid-template-columns: 1fr; gap: 32px; }
  .tool-aside { position: static; }
  .related-grid { grid-template-columns: 1fr; }
  .tool-hero-inner { grid-template-columns: 1fr; }
}
```

## JS — copy YAML

```js
document.querySelectorAll('[data-copy-yaml]').forEach(btn => {
  btn.addEventListener('click', async () => {
    const yaml = document.querySelector('.yaml-block').textContent;
    try { await navigator.clipboard.writeText(yaml); btn.textContent = 'Copied ✓'; setTimeout(() => btn.textContent = 'Copy YAML', 1500); } catch {}
  });
});
```

## Acceptance

- Section numbers stack ABOVE headings (not inline flex) — no awkward wraps at 900–1100px viewports
- OWASP heatmap cells use `repeat(10, minmax(0, 1fr))` — never wrap to a second row
- `.risk-chip` has `white-space: nowrap` — labels don't break mid-chip
- Sidebar sticks on desktop, inlines on mobile
- YAML is keyboard-selectable and copyable
- Risk chips link to directory filtered by that risk: `href="/directory?risk=LLM01"`
- Breadcrumb links back to directory
