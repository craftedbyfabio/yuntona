# 01 · Migration Plan

Execute in this order. Each step has an acceptance criterion; do not proceed to the next step until the current one passes.

---

## Branch setup

```bash
git checkout -b redesign/kelp-coral
```

---

## Step 1 — Apply new tokens + shared styles

**Files to edit:**
- `css/site.css` — replace the `:root` block with tokens from `00-design-tokens.md`; apply updated nav/footer styles from `07-copy-this-into-site-css.css`
- `index.html`, `methodology.html`, `directory/index.html`, any tool HTML — replace the Fontshare `<link>` with the Google Fonts link from `00-design-tokens.md`

**Don't change any HTML structure yet.**

**Acceptance:**
- Site loads on Netlify preview with new colors (dark near-black + coral CTAs instead of cyan)
- Headings now render in Fraunces; body in Inter; mono in JetBrains Mono
- Nav bar uses new palette; dropdowns still work
- No JS or layout regressions
- CSP still passes (no new inline styles or unsafe-inline)

---

## Step 2 — Methodology page (`methodology.html` + `css/methodology.css`)

Reference: `03-methodology-spec.md`.

**HTML changes:**
- Replace the single-column body with a two-column grid: 220px sticky TOC rail + content column (max 760px)
- Add breadcrumb + page header with Fraunces h1, italic "curate" accent, and three mono metadata stamps
- Convert each `<h2>` section to a numbered section pattern (`.section` with `.section-num` + `.section-title`)
- Convert the 4 principles from a flat list to a 2×2 grid of P.01/P.02/P.03/P.04 cards
- Convert the 5 sources to a table-row layout: name · mono chips · description
- Add the pipeline diagram (sources › discovery › evaluation › mapping › published)
- Replace the inline callout with a kelp-green callout using `.callout--kelp`
- Criteria ("What gets listed") becomes a C.1/C.2/C.3 stacked table

**CSS changes:** `css/methodology.css` gets replaced with the CSS from `03-methodology-spec.md`.

**Acceptance:**
- Sticky TOC rail highlights active section on scroll
- All six sections visible with mono numbers + Fraunces titles
- Principles grid is 2×2 on desktop, 1 column on mobile (<768px)
- Callout has kelp-green border and AI-ASSISTED kicker
- No console errors
- Mobile: TOC rail collapses to top; grid becomes single column

---

## Step 3 — Landing page (`index.html` + `css/landing.css`)

Reference: `02-landing-spec.md`.

**HTML changes:**
- Announcement bar: restyle with mono type + coral accent (still a single `<a>`)
- Hero: replace split grid with left-aligned headline + live command-palette mock on the right
  - Headline uses Fraunces 56–64px with Instrument Serif italic accent word ("kelp", "signal", "curation" — pick one)
  - Command palette: animated filter-result cycler showing three example queries
- Replace "Problem/Solution" compare-grid with an OWASP coverage matrix: tabs (LLM / Agentic) + horizontal bars with tool counts (matching the data already in `index.html`)
- "Three paths" (Products) becomes numbered "paths in" with code-sample blocks
- Positioning section: side-by-side table awesome-lists / Yuntona / analyst reports
- Founder card: restyle with mono cred tags + code-chip treatment
- FAQ: numbered accordion (01/02/03...) with Fraunces questions and mono numbers
- Final CTA + footer: mono metadata row with version, count, updated date

**CSS changes:** `css/landing.css` replaced per spec.

**Acceptance:**
- Hero command palette cycles through 3 queries on a loop
- OWASP coverage matrix switches between LLM and Agentic tabs; counts match `data/tools.json`
- Positioning table reads as a real comparison (not marketing)
- No data changes; all numbers still come from `site-config.js`
- Mobile: grid collapses; palette mock remains readable

---

## Step 4 — Directory page (`directory/index.html` + `css/directory.css`)

Reference: `04-directory-spec.md`.

**HTML changes:**
- Header bar with `⌘K` styled search, view toggle (list/grid), sort dropdown
- Left sidebar: 6 collapsible facet groups (OWASP risk w/ LLM-Agentic tab, category, lifecycle, audience, complexity, pricing) — each with counts
- Active-filter pills row: `cat:runtime ×` mono chips
- Tool rows: glyph chip + name + description + OWASP tags + meta badges
- Grid view: card layout alternate

**Don't touch:**
- `js/app.js`, `js/typesense-search.js` — just rewire the DOM selectors where needed. Keep the same class names on filter inputs and result containers so the JS keeps working.
- Map new class names on the OUTSIDE; keep original JS-hook classes intact.

**Acceptance:**
- Search still works (Typesense)
- Filters still apply and update count
- Hash routing still works (`/directory#tool-slug`)
- Grid/list toggle works
- No Typesense index changes

---

## Step 5 — Tool detail pages (`tools/*.html` template or rendering logic + `css/tool.css`)

Reference: `05-tool-detail-spec.md`.

**HTML changes:**
- Header block: large glyph, type badge, breadcrumb, Fraunces name, tagline, CTA row (visit / copy YAML / suggest edit)
- Two-column body: 6 numbered sections (What it does, Security relevance, When to use it, OWASP coverage, Raw YAML, Activity) + sticky "At a glance" sidebar
- OWASP coverage: two 10-cell heatmap strips (LLM + Agentic) with colored cells for covered risks + chips listing specific risk codes
- YAML block: monospace with syntax coloring (just two colors — keys in kelp-soft, values in text)
- Activity timeline: dotted vertical line with event dots
- Related tools: 3-up card grid at the bottom

**Acceptance:**
- Numbered sections stack number above heading (not inline) — prevents wrap issues
- OWASP heatmap cells use `grid-template-columns: repeat(10, minmax(0, 1fr))` so they never wrap
- Risk chips have `white-space: nowrap`
- Sidebar is sticky on desktop, inline on mobile

---

## Step 6 — Final polish

- Update the SVG `<path fill="#22d3ee">` in the footer brand block across all pages to `fill="#c96442"`
- Update any PNG/SVG favicon assets if they encoded the cyan accent
- Update `css/site.css` `.announce-bar a` color from `var(--accent)` — will now be coral, verify contrast
- Check CSP in `_headers` still allows Google Fonts (`fonts.googleapis.com` + `fonts.gstatic.com`)
- Run the schema.org JSON-LD through Google's rich results test — no structure changed, should still pass
- Lighthouse pass: aim for 95+ on all categories

---

## What NOT to change

- `data/tools.json` — single source of truth, untouched
- `scripts/index-typesense.js` — indexing unchanged
- `js/app.js`, `js/graph.js`, `js/typesense-search.js`, `js/site-config.js` — behavior unchanged
- URL structure, redirects, sitemap
- CSP, CORP, SRI, headers
- Plausible tracking

---

## Rollback

Every step is a separate commit on the branch. If a step breaks something, revert the commit; the previous step's state is deployable.
