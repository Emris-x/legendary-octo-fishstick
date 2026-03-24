# Campus Pay PWA Upgrade TODO

## Current Progress (Original): 8/8 ✅ Live at https://emris-x.github.io/legendary-octo-fishstick/

## New Refactor Plan Steps:

1. ✅ **PWA Files** - manifest.json (fixed), sw.js (cache/offline), junk cleanup.

2. **styles.css** - Full mobile-first (480/768/1024px+), hamburger menu, fintech cards/gradients/shadows, animations, relative units, touch 48px+ buttons, clamp fonts.

3. **script.js** - Hamburger toggle, PWA install prompt, lazy load, form validation/loading, page transitions.

4. **Update all HTML** - Add <link rel=\"manifest\"> <script>if('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js')</script>, hamburger nav structure, lazy imgs loading=\"lazy\", meta apple-touch, no input zoom (font-size:16px).

5. **Perf/UI tweaks** - Inline critical CSS? Image opt.

6. **Test & Lighthouse** - Audit 90+ PWA/perf/accessibility.

7. **Redeploy** - git add/commit/push gh-pages.

Progress: 1/7

Next: styles.css upgrade.

