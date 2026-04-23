# PR 3 — Methodology Page Redesign

Branch: `redesign/methodology`
Scope: `methodology.html` + `css/methodology.css` (new) + `js/methodology.js` (new)
Risk: Low — pure layout/style change, content preserved.

## What this PR does

Replaces the methodology page with a two-column document layout:
sticky TOC rail (220px) + max-760px content column, inside a 1240px container.
Six numbered sections (01–06) with mono section numbers above Fraunces headings,
a pull-quote, principle grid, sources table, pipeline diagram, coverage cards,
a kelp callout, inclusion criteria, and a transparency disclosure.

Uses PR 1 design tokens from `css/site.css` (colors, type, spacing, shared
components like `.kicker`, `.callout`, `.meta-strip`). No new tokens.

## Files in this folder

| Path                          | Action | Destination in repo          |
|-------------------------------|--------|------------------------------|
| `methodology.body.html`       | body replacement fragment + diff notes | `methodology.html` |
| `css/methodology.css`         | NEW    | `css/methodology.css`        |
| `js/methodology.js`           | NEW    | `js/methodology.js`          |

## Apply to your repo

```bash
git checkout main
git pull
git checkout -b redesign/methodology

# 1. Drop in the new stylesheet + script
cp pr3/css/methodology.css css/methodology.css
cp pr3/js/methodology.js  js/methodology.js

# 2. Edit methodology.html:
#    a. Inside <head>, add:
#         <link rel="stylesheet" href="/css/methodology.css">
#    b. Replace the current page body (everything BETWEEN
#       <nav class="site-nav"> and <footer class="site-footer">)
#       with the <div class="method-page">…</div> block from
#       pr3/methodology.body.html.
#    c. Just before </body>, add:
#         <script src="/js/methodology.js"></script>

# 3. Sanity check locally
# (open methodology.html in a browser, scroll through all six sections,
#  confirm TOC highlights, mobile collapses at <900px)

git add css/methodology.css js/methodology.js methodology.html
git commit -m "PR 3: Methodology page redesign — TOC rail + numbered sections"
git push -u origin redesign/methodology
```

## Acceptance checklist

- [ ] All six sections render with mono number above Fraunces title (stacked, not inline)
- [ ] Sticky TOC highlights the active section on scroll
- [ ] Below 900px: TOC collapses above main column, principle grid + coverage cards stack single-column
- [ ] `.coverage-bar-10` uses `minmax(0, 1fr)` — 10 cells never wrap
- [ ] Existing `data-stat="tools"` hooks still populated by `site-config.js`
- [ ] Nav highlights "Methodology" as current page
- [ ] No console errors, CSP still passes
- [ ] Coral accent color appears on: breadcrumb current, section numbers, principle numbers, criterion numbers, pull-quote border, pipeline steps, CTA button
- [ ] Kelp accent color appears on: "curate" italic in H1, coverage bars, source chips, callout border
