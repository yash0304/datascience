# yash0304 · portfolio

My portfolio, laid out like an Instagram profile: each project is a post with a slide carousel and a caption, the story highlights are an About section, and the "Tagged" tab shows which technologies each project uses.

**Stack:** Next.js 15 (App Router) · React 19 · Tailwind CSS 4 · TypeScript. Fully static, no backend.

## Edit the content

All the content lives in two files. You shouldn't need to touch the components.

| File | What's in it |
|---|---|
| `data/profile.ts` | Name, bio, links, email, avatar, résumé, story highlights |
| `data/projects.ts` | One entry per project: caption, features, stack, cover colours, carousel slides |

Search for `TODO` to find the drafted fields worth checking.

- **Photo:** put `avatar.jpg` in `public/` and set `avatar: "/avatar.jpg"`.
- **Résumé:** put `resume.pdf` in `public/` and set `resumeUrl: "/resume.pdf"`. A Résumé button then appears.
- **Project screenshot:** put an image in `public/projects/` and set `cover.image` (FinSight does this with its app icon).
- **Public repo:** set `repo` to the GitHub URL instead of `"private"`. The post then gets a link to the code.

Posts can be linked directly: `https://<your-site>/#p/finsight`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build, the same one Vercel runs
```

## Deploy on Vercel

1. Go to https://vercel.com/new and sign in with GitHub.
2. Import `yash0304/datascience`. Vercel detects Next.js; leave every setting at its default.
3. Under **Git**, set the production branch to the one this site is on (or merge it into `master` first).
4. Click **Deploy**. Every push after that redeploys automatically.

To get a nicer URL, rename the project in Vercel (Settings → General), e.g. `yashmodi.vercel.app`.

`first.R` is the repo's original Coursera file, kept as is.
