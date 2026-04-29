# 04 · Directory Spec (`directory/index.html` + `css/directory.css`)

Reference preview: `Yuntona Directory.html` in the design project.

**Critical constraint:** The existing JS (`js/app.js`, `js/typesense-search.js`) wires up behaviour via DOM IDs and class names. **Preserve every existing hook** — add new presentation classes *alongside* the old ones, don't replace them.

Open `js/app.js` before touching the HTML to see which selectors are queried (`#searchInput`, `.filter-option`, `.tool-card` etc.) and keep those intact.

## Layout

- Top bar: site-nav (unchanged)
- Sub-header: search + view-toggle + sort (sticky)
- Main grid: 280px sidebar + content column
- Active-filter pill row above results
- Tool rows (list view) or tool cards (grid view)

## HTML sketch

```html
<section class="dir-page">
  <!-- Sub-header -->
  <div class="dir-subhead">
    <div class="dir-subhead-inner">
      <div class="dir-search">
        <span class="dir-search-prompt">›</span>
        <input id="searchInput" type="text" placeholder="Ask in plain English, or filter by risk / category..." autocomplete="off">
        <span class="dir-search-kbd">⌘K</span>
      </div>
      <div class="dir-subhead-right">
        <div class="dir-view-toggle" role="tablist">
          <button class="active" data-view="list" aria-label="List view">☰</button>
          <button data-view="grid" aria-label="Grid view">▦</button>
        </div>
        <select class="dir-sort">
          <option>Sort · Recently added</option>
          <option>Sort · Alphabetical</option>
          <option>Sort · Most-tagged</option>
        </select>
      </div>
    </div>
  </div>

  <div class="dir-layout">
    <!-- Sidebar -->
    <aside class="dir-sidebar">
      <div class="facet-group">
        <button class="facet-head" aria-expanded="true">
          <span>OWASP risk</span>
          <span class="facet-chevron">▾</span>
        </button>
        <div class="facet-body">
          <div class="facet-subtabs">
            <button class="active" data-fw="llm">LLM</button>
            <button data-fw="asi">Agentic</button>
          </div>
          <label class="facet-option"><input type="checkbox" value="LLM01"> <span>LLM01 · Prompt Injection</span> <span class="facet-count">53</span></label>
          <label class="facet-option"><input type="checkbox" value="LLM02"> <span>LLM02 · Sensitive Disclosure</span> <span class="facet-count">46</span></label>
          <!-- … remaining LLM risks -->
        </div>
      </div>

      <div class="facet-group">
        <button class="facet-head" aria-expanded="true"><span>Category</span><span class="facet-chevron">▾</span></button>
        <div class="facet-body">
          <label class="facet-option"><input type="checkbox"> <span>AI Red Teaming</span> <span class="facet-count">31</span></label>
          <label class="facet-option"><input type="checkbox"> <span>AI Guardrails &amp; Firewalls</span> <span class="facet-count">24</span></label>
          <label class="facet-option"><input type="checkbox"> <span>Identity &amp; AppSec</span> <span class="facet-count">22</span></label>
          <!-- populate from data/tools.json category counts -->
        </div>
      </div>

      <div class="facet-group">
        <button class="facet-head" aria-expanded="false"><span>Lifecycle stage</span><span class="facet-chevron">▾</span></button>
        <div class="facet-body">
          <!-- Scope · Govern · Develop · Test · Deploy · Operate · Monitor -->
        </div>
      </div>

      <div class="facet-group">
        <button class="facet-head" aria-expanded="false"><span>Audience</span><span class="facet-chevron">▾</span></button>
        <div class="facet-body"><!-- Builder / Blue / Red / CISO / Architect --></div>
      </div>

      <div class="facet-group">
        <button class="facet-head" aria-expanded="false"><span>Complexity</span><span class="facet-chevron">▾</span></button>
        <div class="facet-body"><!-- Plug & Play / Guided / Expert / Enterprise --></div>
      </div>

      <div class="facet-group">
        <button class="facet-head" aria-expanded="false"><span>Pricing</span><span class="facet-chevron">▾</span></button>
        <div class="facet-body"><!-- Open Source / Freemium / SaaS / Enterprise --></div>
      </div>
    </aside>

    <!-- Results column -->
    <main class="dir-main">
      <div class="dir-meta-row">
        <div class="dir-count"><strong id="resultCount">161</strong> tools</div>
        <div class="dir-active-filters" id="activeFilters">
          <!-- mono chips injected by JS -->
          <!-- e.g. <span class="pill">cat:runtime <button>×</button></span> -->
        </div>
      </div>

      <div class="dir-list" id="toolList">
        <!-- List view: tool row template -->
        <a class="tool-row" href="#tool-slug">
          <div class="tool-glyph">L</div>
          <div class="tool-body">
            <div class="tool-head">
              <span class="tool-name">Lakera Guard</span>
              <span class="tool-vendor">· Lakera AI</span>
            </div>
            <p class="tool-desc">Runtime guardrails for prompt injection, PII leakage, and toxic output. Deployed as API or sidecar.</p>
            <div class="tool-tags">
              <span class="risk-chip risk-chip--llm">LLM01</span>
              <span class="risk-chip risk-chip--llm">LLM02</span>
              <span class="risk-chip risk-chip--asi">ASI06</span>
              <span class="meta-badge">Runtime</span>
              <span class="meta-badge">SaaS</span>
              <span class="meta-badge">Guided setup</span>
            </div>
          </div>
        </a>
        <!-- more rows -->
      </div>

      <!-- Grid view (hidden by default; JS toggles) -->
      <div class="dir-grid" id="toolGrid" hidden>
        <!-- card template with same content, different layout -->
      </div>
    </main>
  </div>
</section>
```

## CSS

```css
/* ─── Sub-header ─── */
.dir-subhead { position: sticky; top: 56px; background: rgba(10,14,20,0.92); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); z-index: 9; }
.dir-subhead-inner { max-width: 1240px; margin: 0 auto; padding: 14px 32px; display: grid; grid-template-columns: 1fr auto; gap: 20px; align-items: center; }

.dir-search { display: flex; align-items: center; gap: 10px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 10px 14px; font-family: var(--font-mono); }
.dir-search:focus-within { border-color: var(--coral-border); }
.dir-search-prompt { color: var(--coral); font-size: 14px; }
.dir-search input { flex: 1; background: transparent; border: none; outline: none; color: var(--text); font-family: var(--font-body); font-size: 14px; }
.dir-search input::placeholder { color: var(--text-faint); }
.dir-search-kbd { font-size: 10px; color: var(--text-faint); border: 1px solid var(--border); border-radius: 4px; padding: 2px 6px; }

.dir-subhead-right { display: flex; gap: 12px; align-items: center; }
.dir-view-toggle { display: inline-flex; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 2px; }
.dir-view-toggle button { background: transparent; border: none; color: var(--text-faint); padding: 6px 10px; border-radius: 5px; cursor: pointer; }
.dir-view-toggle button.active { background: var(--surface-3); color: var(--text); }
.dir-sort { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-muted); font-family: var(--font-mono); font-size: 11px; padding: 8px 12px; }

/* ─── Layout ─── */
.dir-layout { max-width: 1240px; margin: 0 auto; padding: 28px 32px 80px; display: grid; grid-template-columns: 280px minmax(0, 1fr); gap: 40px; }

/* ─── Sidebar ─── */
.dir-sidebar { position: sticky; top: 130px; align-self: start; max-height: calc(100vh - 150px); overflow-y: auto; padding-right: 8px; }
.facet-group { border-bottom: 1px solid var(--border); padding: 16px 0; }
.facet-head { width: 100%; display: flex; justify-content: space-between; align-items: center; background: none; border: none; color: var(--text); font-family: var(--font-body); font-size: 13px; font-weight: 500; cursor: pointer; padding: 0 0 10px; }
.facet-head[aria-expanded="false"] + .facet-body { display: none; }
.facet-chevron { color: var(--text-faint); font-size: 10px; transition: transform 0.2s; }
.facet-head[aria-expanded="false"] .facet-chevron { transform: rotate(-90deg); }

.facet-subtabs { display: inline-flex; gap: 2px; background: var(--surface); border: 1px solid var(--border); border-radius: 5px; padding: 2px; margin-bottom: 10px; font-family: var(--font-mono); font-size: 10px; }
.facet-subtabs button { background: transparent; border: none; color: var(--text-faint); padding: 4px 10px; border-radius: 3px; cursor: pointer; }
.facet-subtabs button.active { background: var(--coral); color: var(--bg); }

.facet-option { display: grid; grid-template-columns: 16px 1fr auto; gap: 8px; align-items: center; padding: 5px 0; font-size: 12.5px; color: var(--text-muted); cursor: pointer; }
.facet-option input { accent-color: var(--coral); }
.facet-option:hover { color: var(--text); }
.facet-count { font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); }

/* ─── Meta row ─── */
.dir-meta-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; gap: 16px; flex-wrap: wrap; }
.dir-count { font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); }
.dir-count strong { color: var(--text); font-weight: 600; }
.dir-active-filters { display: flex; gap: 6px; flex-wrap: wrap; }
.pill { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 11px; background: var(--coral-glow); color: var(--coral); border: 1px solid var(--coral-border); padding: 4px 4px 4px 10px; border-radius: 4px; }
.pill button { background: transparent; border: none; color: var(--coral); cursor: pointer; padding: 0 6px; font-size: 14px; line-height: 1; }

/* ─── Tool rows (list view) ─── */
.dir-list { display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; background: var(--surface); }
.tool-row { display: grid; grid-template-columns: 48px minmax(0, 1fr); gap: 16px; padding: 18px 20px; border-bottom: 1px solid var(--border); text-decoration: none; color: inherit; transition: background 0.15s; }
.tool-row:last-child { border-bottom: none; }
.tool-row:hover { background: var(--surface-2); }
.tool-glyph { width: 44px; height: 44px; border-radius: var(--radius); background: var(--surface-3); display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 20px; color: var(--kelp-soft); }
.tool-head { display: flex; align-items: baseline; gap: 6px; }
.tool-name { font-size: 15px; font-weight: 500; color: var(--text); }
.tool-vendor { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); }
.tool-desc { font-size: 13.5px; color: var(--text-muted); line-height: 1.55; margin: 4px 0 10px; }
.tool-tags { display: flex; gap: 5px; flex-wrap: wrap; }

/* Risk chips (LLM vs Agentic) */
.risk-chip { display: inline-flex; gap: 4px; align-items: center; font-family: var(--font-mono); font-size: 11px; padding: 3px 8px; border-radius: 3px; white-space: nowrap; }
.risk-chip--llm { background: var(--kelp-glow); color: var(--kelp-soft); border: 1px solid var(--kelp-border); }
.risk-chip--asi { background: var(--coral-glow); color: var(--coral); border: 1px solid var(--coral-border); }

/* Meta badges (stage / pricing / complexity) */
.meta-badge { font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); background: var(--bg); border: 1px solid var(--border); padding: 2px 7px; border-radius: 3px; letter-spacing: 0.02em; }

/* ─── Grid view ─── */
.dir-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; }
.dir-grid .tool-row { grid-template-columns: 1fr; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 20px; }
.dir-grid .tool-row:hover { border-color: var(--border-hover); background: var(--surface-2); }
.dir-grid .tool-glyph { margin-bottom: 14px; }

/* Responsive */
@media (max-width: 960px) {
  .dir-layout { grid-template-columns: 1fr; }
  .dir-sidebar { position: static; max-height: none; overflow: visible; }
  .dir-subhead-inner { grid-template-columns: 1fr; }
  .dir-subhead-right { flex-wrap: wrap; }
}
```

## JS integration

Don't rewrite `js/app.js`. Instead:

1. **Keep existing IDs:** `#searchInput`, any result container, any filter checkbox class hooks used by `app.js` and `typesense-search.js`. Read those files first.
2. **Add the new facet accordion toggle** as a small add-on in `app.js` (or a new `js/facet-accordion.js`):
   ```js
   document.querySelectorAll('.facet-head').forEach(btn => {
     btn.addEventListener('click', () => {
       const expanded = btn.getAttribute('aria-expanded') === 'true';
       btn.setAttribute('aria-expanded', !expanded);
     });
   });
   ```
3. **Risk sub-tabs** (LLM/Agentic inside the first facet) toggle which subset of risk checkboxes is visible — wire with a small add-on, don't rebuild search.
4. **View toggle** (list/grid) flips `hidden` on `#toolList` / `#toolGrid` and updates `.active` on the button. Add-on, not a rewrite.
5. **Active-filter pill row** — when `app.js` applies a filter, have it also render a pill via `insertAdjacentHTML` into `#activeFilters`. Add-on, additive.

The existing Typesense query, hash routing, autocomplete, and deep linking should all keep working.

## Acceptance

- Search box returns same Typesense results as before
- Filter counts match `data/tools.json`
- Facet groups collapse/expand
- LLM/Agentic sub-tab inside OWASP facet swaps the visible risk checkbox set
- List / grid toggle works without a page refresh
- Active filters render as mono pills with × buttons
- Hash deep-links (`#tool-slug`) still open the right tool
- Sidebar is sticky on desktop, stacks above results on mobile
- Responsive: sidebar stacks above results below 960px
