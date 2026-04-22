PR 2 — CSP-strict landing page (rev 2)
=======================================

Contents
--------
  index.html                         — drop-in replacement
  landing/landing.css                — base styles
  landing/react.min.js               — self-hosted React 18.3.1 (10 KB)
  landing/react-dom.min.js           — self-hosted ReactDOM 18.3.1 (132 KB)
  landing/bundle.js                  — precompiled components (50 KB)
  scripts/build-landing.js           — local precompile helper
  package.json                       — declares build:landing script

You ALSO need your existing editable JSX sources. They're in the project under
/landing/*.jsx — keep them in the repo, edit them, run the build script to
regenerate bundle.js. Those files are NOT loaded by the browser.

Files you'll place in the repo
------------------------------
  /index.html                  (replaces current)
  /landing/landing.css         (new)
  /landing/react.min.js        (new — self-hosted React)
  /landing/react-dom.min.js    (new — self-hosted ReactDOM)
  /landing/bundle.js           (new — precompiled)
  /landing/app.jsx             (keep — editable source)
  /landing/data.jsx            (keep — editable source)
  /landing/logo.jsx            (keep — editable source)
  /landing/hero.jsx            (keep — editable source)
  /landing/sections.jsx        (keep — editable source)
  /landing/footer-faq.jsx      (keep — editable source)
  /scripts/build-landing.js    (new)
  /package.json                (new — only if you don't already have one)

"Self-hosted React" in plain English
------------------------------------
It means instead of the browser loading React from a CDN like unpkg.com, the
two React files live in YOUR repo at /landing/react.min.js and /landing/react-dom.min.js.
Netlify serves them from your own origin. Result: the browser only ever fetches
scripts from yuntona.ai, which is exactly what "script-src 'self'" allows.

No build tooling required at runtime. The files are just two plain .js files
sitting next to your HTML.

Full CSP line for /_headers
---------------------------
Replace the existing Content-Security-Policy line with this ONE line:

  Content-Security-Policy: default-src 'none'; script-src 'self' 'sha256-zX1/LG6hfjT+m5soQNDJ0S9GT5FWTB9xvA/mj7tU/dg='; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com; font-src 'self' https://fonts.gstatic.com https://cdn.fontshare.com; img-src 'self' data: https://img.logo.dev; connect-src 'self' https://*.a1.typesense.net https://plausible.io; frame-ancestors 'none'; base-uri 'self'; form-action 'self'

All 9 directives present (default-src, script-src, style-src, font-src, img-src,
connect-src, frame-ancestors, base-uri, form-action). Only changes vs before:
 • script-src: removed cdnjs, added sha256 for inline JSON-LD
 • style-src: added 'unsafe-inline' for React inline style="" attributes
   (style-attribute only — cannot execute code; follow-up PR can remove it)

Setup commands (one-time, local machine)
----------------------------------------
If you don't already have Node.js installed:
  # Ubuntu
  sudo apt update && sudo apt install -y nodejs npm
  node --version   # should be >= 18

Then in the repo:
  cd ~/GitHub/yuntona
  git checkout redesign/landing

  # 1. Copy all the new files into place (from your downloaded pr2/ folder)
  cp pr2/index.html                 ./index.html
  cp pr2/landing/landing.css        landing/landing.css
  cp pr2/landing/react.min.js       landing/react.min.js
  cp pr2/landing/react-dom.min.js   landing/react-dom.min.js
  cp pr2/landing/bundle.js          landing/bundle.js
  mkdir -p scripts
  cp pr2/scripts/build-landing.js   scripts/build-landing.js
  cp pr2/package.json               ./package.json   # only if you don't already have one

  # 2. One-time: install Babel locally so the build script can run
  npm install
  # creates node_modules/ and package-lock.json
  # add node_modules/ to .gitignore if it's not there:
  grep -qxF node_modules .gitignore || echo "node_modules" >> .gitignore

  # 3. Verify build works locally
  npm run build:landing
  # should print: [build-landing] wrote .../landing/bundle.js (~50 KB, 6 sources)

  # 4. Update /_headers per the CSP line above
  nano _headers

  # 5. Sanity check
  grep -E "cdnjs|unpkg|sha256-zX" index.html _headers
  grep -E "bundle.js|react.min" index.html

  # 6. Commit and push
  git add index.html landing/ scripts/ package.json package-lock.json _headers .gitignore
  git commit -m "PR 2: precompile JSX, self-host React, restore strict CSP"
  git push

Future workflow (when editing landing components)
-------------------------------------------------
  1. Edit any /landing/*.jsx file
  2. Run: npm run build:landing
  3. Commit both the .jsx source AND the regenerated bundle.js
  4. Push — Netlify serves the new bundle
