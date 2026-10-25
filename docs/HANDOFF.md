# HANDOFF — Portfolio — 2026-10-25

## Where we are
- Issue #1 done: the site builds clean (`npm run build`, static, ~112 kB first load), checked by screenshots at 1280px and 390px in light and dark with no console errors and no horizontal scroll.
- Not deployed yet. Vercel import is a manual step for Yash (README → "Deploy on Vercel").

## Files
- `data/profile.ts`, `data/projects.ts`: all content. Fields marked TODO are drafts.
- `components/`: `ProfileHeader`, `Highlights` (story viewer), `Feed` (grid + Tagged tab + `#p/<slug>` deep links), `PostModal`, `Cover`.

## Next action
1. Yash: fill in the TODOs, especially the Memory Lane and Shreeji Schemes captions (drafted from repo names only).
2. Deploy on Vercel from this branch, or merge it into `master` and deploy from there.

## Open questions
- Which URL to use (e.g. `yashmodi.vercel.app`)?
- Add the public ML repos later as a second tab? (backlog #6)
