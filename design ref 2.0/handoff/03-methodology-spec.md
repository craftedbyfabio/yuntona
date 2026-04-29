# 03 · Methodology Spec (`methodology.html` + `css/methodology.css`)

Reference preview: `Yuntona Methodology.html`.

## Layout

Two-column on desktop: 220px sticky TOC rail + max-760px content column, inside a 1240px container with 32px horizontal padding. Collapses to single column at 900px.

## HTML (body content, inside existing nav + footer)

```html
<div class="method-page">
  <div class="method-bread">
    <a href="/">~</a> <span>/</span> <span class="method-bread-cur">methodology</span>
  </div>

  <header class="method-header">
    <div class="kicker">Methodology · v1.7.0</div>
    <h1>How we <em class="italic-accent">curate</em>.</h1>
    <p class="method-lead">
      Yuntona is built on practitioner-led continuous intelligence gathering with expert curation — not automated scraping or vendor self-submission.
    </p>
    <div class="meta-strip">
      <span>Last reviewed · 2026-03-18</span>
      <span>·</span>
      <span>Single maintainer · accountable</span>
      <span>·</span>
      <span>MIT · open source</span>
    </div>
  </header>

  <div class="method-grid">
    <aside class="method-toc">
      <div class="kicker toc-label">On this page</div>
      <nav class="toc-nav">
        <a href="#philosophy"><span>01</span> Philosophy</a>
        <a href="#principles"><span>02</span> Curation principles</a>
        <a href="#sources"><span>03</span> Intelligence sources</a>
        <a href="#mapping"><span>04</span> OWASP risk mapping</a>
        <a href="#inclusion"><span>05</span> What gets listed</a>
        <a href="#transparency"><span>06</span> Transparency</a>
      </nav>
      <div class="toc-meta">
        <div><span data-stat="tools">161</span> tools indexed</div>
        <div>20 OWASP risks</div>
        <div>11 categories</div>
        <div>v1.7.0 · 2026-03-18</div>
      </div>
    </aside>

    <main class="method-body">
      <section id="philosophy" class="method-section">
        <div class="section-num">01</div>
        <h2>Philosophy</h2>
        <p>The AI security tooling landscape moves faster than any automated system can meaningfully evaluate. New tools, frameworks, and attack surfaces emerge weekly. Keeping pace requires continuous immersion in the practitioner community — not periodic desk research.</p>
        <p>Every entry has been individually evaluated by a security professional with <strong>over a decade</strong> of experience spanning SOC/NOC operations, third-party risk, financial services regulation, and hands-on AI-security research. The directory reflects professional judgement informed by real-world operational context — not algorithmic scoring.</p>
        <blockquote class="pull-quote">Curation quality depends on accountability, not volume.</blockquote>
      </section>

      <section id="principles" class="method-section">
        <div class="section-num">02</div>
        <h2>Curation principles</h2>
        <p>Four commitments that shape every decision, from discovery to inclusion to retirement.</p>
        <div class="principle-grid">
          <div class="principle">
            <div class="principle-num">P.01</div>
            <h3>Multi-source intelligence</h3>
            <p>Discovery draws from practitioner discourse on LinkedIn and specialist forums, conference proceedings, standards body publications, OWASP working groups, industry intelligence newsletters, and direct engagement with AI-security thought leaders.</p>
          </div>
          <div class="principle">
            <div class="principle-num">P.02</div>
            <h3>Expert signal filtering</h3>
            <p>Not everything discovered gets listed. Each candidate is assessed against the current threat landscape, mapped to OWASP categories, and evaluated for genuine operational utility. Duplicates without meaningful differentiation are excluded.</p>
          </div>
          <div class="principle">
            <div class="principle-num">P.03</div>
            <h3>Community-embedded discovery</h3>
            <p>The best tools surface in comment threads, conference hallway conversations, and working-group Slacks — not product launch pages. Following the people who build and break AI systems is how tools reach us before mainstream awareness.</p>
          </div>
          <div class="principle">
            <div class="principle-num">P.04</div>
            <h3>Continuous, not periodic</h3>
            <p>The directory updates on a rolling basis. This is not a quarterly report. It is a living artefact maintained through daily engagement with the AI-security ecosystem.</p>
          </div>
        </div>
      </section>

      <section id="sources" class="method-section">
        <div class="section-num">03</div>
        <h2>Intelligence sources</h2>
        <p>Where the signal comes from. Five channels feeding one pipeline.</p>
        <div class="source-table">
          <div class="source-row">
            <span class="source-name">Standards bodies</span>
            <div class="source-chips"><span class="chip">OWASP</span><span class="chip">NIST</span><span class="chip">CSA</span><span class="chip">MITRE</span><span class="chip">ISO/IEC</span></div>
            <span class="source-desc">Publications + working group output</span>
          </div>
          <div class="source-row">
            <span class="source-name">Industry intelligence</span>
            <div class="source-chips"><span class="chip">CB Insights</span><span class="chip">analyst reports</span><span class="chip">market research</span></div>
            <span class="source-desc">Vendor-neutral coverage of emerging tech</span>
          </div>
          <div class="source-row">
            <span class="source-name">Conferences &amp; events</span>
            <div class="source-chips"><span class="chip">NHIcon</span><span class="chip">CSA summits</span><span class="chip">AI security workshops</span></div>
            <span class="source-desc">Vendor-neutral industry events</span>
          </div>
          <div class="source-row">
            <span class="source-name">Practitioner networks</span>
            <div class="source-chips"><span class="chip">OWASP AIUC</span><span class="chip">LinkedIn groups</span><span class="chip">specialist forums</span></div>
            <span class="source-desc">Thought-leader commentary</span>
          </div>
          <div class="source-row">
            <span class="source-name">Primary research</span>
            <div class="source-chips"><span class="chip">academic papers</span><span class="chip">arXiv</span><span class="chip">vendor docs</span><span class="chip">GitHub</span></div>
            <span class="source-desc">First-hand documentation</span>
          </div>
        </div>

        <div class="pipeline">
          <div class="kicker pipeline-label">Pipeline</div>
          <div class="pipeline-grid">
            <div class="pipeline-step"><div class="pipeline-k">Sources</div><div class="pipeline-v">5 channels</div></div>
            <div class="pipeline-arrow">›</div>
            <div class="pipeline-step"><div class="pipeline-k">Discovery</div><div class="pipeline-v">raw signal</div></div>
            <div class="pipeline-arrow">›</div>
            <div class="pipeline-step"><div class="pipeline-k">Evaluation</div><div class="pipeline-v">3 criteria</div></div>
            <div class="pipeline-arrow">›</div>
            <div class="pipeline-step"><div class="pipeline-k">Mapping</div><div class="pipeline-v">OWASP fit</div></div>
            <div class="pipeline-arrow">›</div>
            <div class="pipeline-step"><div class="pipeline-k">Published</div><div class="pipeline-v">directory</div></div>
          </div>
        </div>
      </section>

      <section id="mapping" class="method-section">
        <div class="section-num">04</div>
        <h2>OWASP risk mapping</h2>
        <p>Every tool is mapped against the <strong>OWASP LLM Top 10 (2025)</strong> and the <strong>OWASP Agentic Top 10 (2026)</strong>. Mappings are derived from each tool's documented capabilities, target threat model, and operational scope — assessed against the published risk descriptions.</p>

        <div class="coverage-cards">
          <div class="coverage-card">
            <div class="kicker">LLM Top 10 · 2025</div>
            <div class="coverage-num">10 <span>/ 10</span></div>
            <div class="coverage-note">Full coverage</div>
            <div class="coverage-bar-10">
              <span></span><span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>
          <div class="coverage-card">
            <div class="kicker">Agentic Top 10 · 2026</div>
            <div class="coverage-num">10 <span>/ 10</span></div>
            <div class="coverage-note">Full coverage</div>
            <div class="coverage-bar-10">
              <span></span><span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>
        </div>

        <div class="callout callout--kelp">
          <div class="callout-label"><span class="callout-dot"></span>AI-assisted, human-designed</div>
          <p>OWASP risk mappings across <span data-stat="tools">161</span> tools and 20 categories were produced using AI as an analytical engine. The methodology, evaluation schema, and framework inputs were designed by the curator. Every output was reviewed and validated against the published OWASP standards. This is <em class="italic-accent">human-directed analysis at scale</em> — not automated classification.</p>
        </div>
      </section>

      <section id="inclusion" class="method-section">
        <div class="section-num">05</div>
        <h2>What gets listed</h2>
        <p>A tool is added when it meets three criteria. All three. No two-out-of-three.</p>
        <div class="criteria">
          <div class="criterion">
            <span class="criterion-num">C.1</span>
            <div><strong>Addresses a genuine security risk</strong><span>in the generative or agentic AI stack, mapped to at least one OWASP category.</span></div>
          </div>
          <div class="criterion">
            <span class="criterion-num">C.2</span>
            <div><strong>Operational or near-operational</strong><span>not vaporware, not a concept paper, not a GitHub readme without code.</span></div>
          </div>
          <div class="criterion">
            <span class="criterion-num">C.3</span>
            <div><strong>Offers meaningful capability</strong><span>not already covered by existing entries; differentiated in scope, approach, or depth.</span></div>
          </div>
        </div>
        <p class="method-footer-note">Open-source tools, commercial platforms, and frameworks are all eligible. <strong>Vendor sponsorship does not influence inclusion or risk ratings.</strong></p>
      </section>

      <section id="transparency" class="method-section">
        <div class="section-num">06</div>
        <h2>Transparency</h2>
        <p>Yuntona is maintained by a single practitioner. The directory reflects one expert's informed judgement — not committee consensus, not crowd-sourced voting. This is a deliberate choice.</p>
        <div class="disclosure">
          <div class="kicker">Affiliation disclosure</div>
          <p>Yuntona™ is an independent, open-source project. It is <strong>not affiliated with or endorsed by</strong> OWASP, NIST, MITRE, or any vendor listed in the directory.</p>
          <p>OWASP risk categories are used under the Creative Commons licence.</p>
        </div>
        <div class="method-ctas">
          <a href="/submit" class="btn-primary">Submit a tool for review →</a>
          <a href="https://github.com/craftedbyfabio/yuntona" class="btn-ghost">View source ↗</a>
        </div>
      </section>
    </main>
  </div>
</div>
```

## CSS (`css/methodology.css` — full replacement)

```css
.method-page { max-width: 1240px; margin: 0 auto; padding: 24px 32px 80px; }

/* Breadcrumb */
.method-bread { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); margin-bottom: 24px; }
.method-bread a { color: var(--text-dim); text-decoration: none; }
.method-bread-cur { color: var(--coral); }
.method-bread span { margin: 0 6px; }

/* Header */
.method-header { padding-bottom: 36px; border-bottom: 1px solid var(--border); }
.method-header h1 { font-size: clamp(40px, 5.5vw, 64px); margin: 14px 0 20px; letter-spacing: -0.03em; line-height: 1.02; }
.method-lead { font-size: 18px; color: var(--text-muted); line-height: 1.6; max-width: 720px; margin: 0; }
.meta-strip { display:flex; gap: 12px; margin-top: 28px; flex-wrap: wrap; font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); }

/* Grid */
.method-grid { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 56px; padding-top: 48px; }
.method-body { max-width: 760px; }

/* TOC rail */
.method-toc { position: sticky; top: 90px; align-self: start; }
.toc-label { margin-bottom: 14px; }
.toc-nav { display: flex; flex-direction: column; }
.toc-nav a { display: grid; grid-template-columns: 28px 1fr; gap: 8px; align-items: center; padding: 7px 8px; margin-bottom: 2px; border-left: 2px solid transparent; border-radius: 5px; text-decoration: none; color: var(--text-dim); font-size: 13px; }
.toc-nav a span { font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); }
.toc-nav a.active { background: var(--coral-glow); border-left-color: var(--coral); color: var(--text); }
.toc-nav a.active span { color: var(--coral); }
.toc-meta { margin-top: 28px; padding-top: 18px; border-top: 1px solid var(--border); font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); line-height: 1.8; }

/* Sections */
.method-section { margin-bottom: 64px; scroll-margin-top: 100px; }
.section-num { font-family: var(--font-mono); font-size: 12px; color: var(--coral); letter-spacing: 0.08em; margin-bottom: 6px; }
.method-section h2 { font-size: 36px; margin: 0 0 22px; }
.method-section p { font-size: 15.5px; color: var(--text-muted); line-height: 1.75; margin: 0 0 18px; }
.method-section strong { color: var(--text); font-weight: 500; }

/* Pull quote */
.pull-quote { margin: 28px 0; padding: 18px 24px; border-left: 3px solid var(--coral); font-family: var(--font-italic); font-style: italic; font-size: 22px; line-height: 1.35; color: var(--text); background: var(--coral-glow); }

/* Principles */
.principle-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 28px; }
.principle { padding: 20px; border: 1px solid var(--border); border-radius: var(--radius-lg); background: var(--surface); }
.principle-num { font-family: var(--font-mono); font-size: 10px; color: var(--coral); letter-spacing: 0.1em; margin-bottom: 10px; }
.principle h3 { font-size: 20px; margin: 0 0 8px; }
.principle p { font-size: 13px; color: var(--text-dim); line-height: 1.6; }

/* Sources */
.source-table { margin-top: 28px; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; background: var(--surface); }
.source-row { display: grid; grid-template-columns: 140px minmax(0, 1fr) minmax(0, 1fr); gap: 20px; align-items: center; padding: 16px 20px; border-bottom: 1px solid var(--border); }
.source-row:last-child { border-bottom: none; }
.source-name { font-family: var(--font-display); font-size: 16px; font-weight: 500; }
.source-chips { display: flex; gap: 4px; flex-wrap: wrap; }
.source-desc { font-size: 13px; color: var(--text-dim); }

/* Pipeline */
.pipeline { margin-top: 28px; padding: 22px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); }
.pipeline-label { margin-bottom: 16px; }
.pipeline-grid { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 11px; }
.pipeline-step { flex: 1; text-align: center; padding: 10px 8px; background: var(--coral-glow); border: 1px solid var(--coral-border); border-radius: var(--radius); }
.pipeline-k { color: var(--coral); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; }
.pipeline-v { color: var(--text-muted); font-size: 10px; margin-top: 4px; }
.pipeline-arrow { color: var(--text-faint); font-size: 14px; }

/* Coverage */
.coverage-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 24px; }
.coverage-card { padding: 18px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); }
.coverage-num { font-family: var(--font-display); font-size: 40px; font-weight: 500; letter-spacing: -0.03em; line-height: 1; margin-top: 6px; }
.coverage-num span { font-size: 24px; color: var(--text-faint); font-weight: 400; }
.coverage-note { font-family: var(--font-mono); font-size: 11px; color: var(--kelp-soft); margin-top: 4px; }
.coverage-bar-10 { display: grid; grid-template-columns: repeat(10, minmax(0, 1fr)); gap: 3px; margin-top: 14px; }
.coverage-bar-10 span { height: 6px; border-radius: 2px; background: linear-gradient(90deg, var(--kelp-deep), var(--kelp-soft)); }

/* Callout */
.callout { margin-top: 28px; padding: 22px 24px; border-radius: var(--radius-lg); }
.callout p { font-size: 14px; color: var(--text-muted); line-height: 1.65; margin: 0; }
.callout--kelp { background: linear-gradient(180deg, var(--kelp-glow), transparent); border: 1px solid var(--kelp-border); }
.callout-label { font-family: var(--font-mono); font-size: 10px; color: var(--kelp-soft); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
.callout-dot { width: 6px; height: 6px; border-radius: 3px; background: var(--kelp-soft); }

/* Criteria */
.criteria { margin-top: 28px; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; background: var(--surface); }
.criterion { display: grid; grid-template-columns: 52px minmax(0, 1fr); gap: 18px; padding: 18px 22px; border-bottom: 1px solid var(--border); align-items: flex-start; }
.criterion:last-child { border-bottom: none; }
.criterion-num { font-family: var(--font-mono); font-size: 11px; color: var(--coral); letter-spacing: 0.1em; }
.criterion strong { display: block; color: var(--text); font-weight: 500; margin-bottom: 4px; font-size: 15px; }
.criterion span { font-size: 13px; color: var(--text-dim); line-height: 1.55; }
.method-footer-note { margin-top: 22px; }

/* Disclosure */
.disclosure { margin-top: 24px; padding: 22px 24px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); }
.disclosure .kicker { margin-bottom: 12px; color: var(--text-faint); }
.disclosure p { font-size: 14px; color: var(--text-muted); line-height: 1.65; margin: 0 0 12px; }
.disclosure p:last-child { margin-bottom: 0; }

.method-ctas { margin-top: 28px; display: flex; gap: 10px; flex-wrap: wrap; }

/* Responsive */
@media (max-width: 900px) {
  .method-grid { grid-template-columns: 1fr; gap: 32px; }
  .method-toc { position: static; }
  .principle-grid, .coverage-cards { grid-template-columns: 1fr; }
  .source-row { grid-template-columns: 1fr; gap: 8px; }
  .pipeline-grid { flex-wrap: wrap; }
}
```

## JS (add to a new `js/methodology.js` loaded on methodology.html)

```js
// TOC active-section on scroll
(function() {
  const sections = ['philosophy','principles','sources','mapping','inclusion','transparency'];
  const links = {};
  sections.forEach(id => links[id] = document.querySelector(`.toc-nav a[href="#${id}"]`));

  function update() {
    const y = window.scrollY + 200;
    let active = sections[0];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= y) active = id;
    }
    Object.entries(links).forEach(([id, a]) => a && a.classList.toggle('active', id === active));
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();
```

Add `<script src="/js/methodology.js"></script>` just before `</body>` on `methodology.html`.

## Acceptance

- All six sections rendered with mono number above Fraunces title (stacked, not inline)
- Sticky TOC highlights on scroll, collapses above main column on mobile
- Kelp callout visually distinct from other surfaces
- `.coverage-bar-10` uses `minmax(0, 1fr)` so cells never wrap
- All existing `data-stat="tools"` hooks still populated by `site-config.js`
- No console errors, CSP still passes
