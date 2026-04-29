# Yuntona Redesign — Claude Code Handoff

This package ports the new Yuntona visual language into the existing `craftedbyfabio/yuntona` repo (static HTML/CSS/JS on Netlify).

**What changes:** design tokens (colors, fonts), section composition, new component patterns (command palette, coverage heatmap, TOC rail, YAML block).

**What doesn't:** `data/tools.json`, Typesense search, D3 graph, Plausible, CSP, SRI, URL structure, routing. The presentation layer is the only target.

## Files in this package

- `00-design-tokens.md` — the new CSS variables + typography rules. Drop-in replacement for the `:root{}` block in `css/site.css`.
- `01-migration-plan.md` — ordered checklist of what to do, in what sequence, with acceptance criteria per step.
- `02-landing-spec.md` — annotated spec for `index.html` with the new section-by-section patterns.
- `03-methodology-spec.md` — annotated spec for `methodology.html` (TOC rail + numbered sections).
- `04-directory-spec.md` — annotated spec for `directory/index.html` (faceted sidebar + rows + grid).
- `05-tool-detail-spec.md` — annotated spec for tool detail pages.
- `06-shared-components.md` — nav, footer, buttons, chips, cards: the updated component library.
- `07-copy-this-into-site-css.css` — ready-to-paste replacement tokens + shared styles.

## Recommended execution order for Claude Code / Cursor

1. Start on a new branch: `git checkout -b redesign/kelp-coral`.
2. Apply `07-copy-this-into-site-css.css` — replaces the `:root` block + shared nav/footer styles in `css/site.css`. Push, preview on Netlify. Site should already look different (new palette, new fonts) with **no structural changes yet**.
3. Work page by page in order: methodology → landing → directory → tool. Each has its own spec file and acceptance criteria.
4. Each page: update HTML structure per spec, replace its dedicated CSS (`css/landing.css` etc.) with the patterns in the spec file, verify against the acceptance criteria.
5. Do not touch `js/app.js`, `js/typesense-search.js`, `js/graph.js`, or any data files.

## Design rationale (give this to the dev)

- **Audience:** the existing site reads like a SaaS landing. The redesign is targeted at a technical practitioner audience — security engineers, red teamers, researchers. The aesthetic shift is "data product / engineering docs" not "AI startup landing".
- **Palette:** dark kelp green (`#1f6b5e` / `#7fb8aa`) as primary, coral (`#c96442`) as accent, deep near-black (`#0a0e14`) base. Drawn from the octopus logo. More muted and editorial than cyan.
- **Type:** Fraunces (serif display) + Instrument Serif (italic accent) + JetBrains Mono (metadata/code). Replaces Clash Display + General Sans. The serif + monospace pairing is what signals "for engineers who read RFCs".
- **Density:** mono-stamped metadata everywhere — version numbers, counts, dates, section numbers. This signals "living technical document", not "marketing page".
- **Components:** every section gets a mono kicker label; every list of features becomes a numbered P.01/P.02 pattern; every coverage metric gets a mono data-strip. Consistency > variety.
