# jorge-pezo

My about-me page, built with Fredrin.

**Live site:** https://devtemporacle.github.io/jorge-pezo/


## Deploy

The site is a static export (`output: "export"` in `next.config.ts`):
`npm run build` writes plain HTML/CSS/JS to `out/`, with no server runtime,
so it can be hosted for free on either option below.

### Vercel

1. Import the GitHub repo in Vercel (or connect it through Fredrin's Vercel app).
   The Next.js preset is detected automatically — no settings to change.
2. Every branch/PR gets a preview deployment; merging to `main` deploys to production.

Leave `NEXT_PUBLIC_BASE_PATH` unset on Vercel so the site is served from the root.

### GitHub Pages

1. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Push to `main` (or run the workflow manually from the **Actions** tab).
   `.github/workflows/deploy.yml` builds the export and publishes `out/`.

The workflow sets `NEXT_PUBLIC_BASE_PATH` to the Pages base path, so a project
site is served correctly from `https://<user>.github.io/<repo>/`.

To preview a sub-path build locally:

```bash
NEXT_PUBLIC_BASE_PATH=/jorge-pezo npm run build
```

(On Git Bash for Windows, prefix it with `MSYS_NO_PATHCONV=1` so the path isn't
rewritten to `C:/Program Files/Git/jorge-pezo`.)
