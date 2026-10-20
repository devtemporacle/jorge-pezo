---
name: verify-app
description: Launch, health-check and drive Jorge Pezo's one-page "About Me" site (static Next.js export) to prove a change renders, with desktop + mobile screenshots. Use when asked to verify, run, screenshot or smoke-test the site, or before finishing any ticket that changes what the page shows.
---

# verify-app

The site is a single static page (`/`) built with Next.js `output: "export"`.
There is no server runtime, database or API — verifying it means building the
export, serving `out/` as plain files, and looking at the rendered page.

All scratch output (logs, screenshots) goes under `.fredrin/tmp/verify/`
(git-ignored). Run every command from the repo root.

## Doctor (read-only health)

Run these before launching; each must exit 0. None of them changes tracked files.

```bash
node -v                       # Node 20.9+ (Next.js 16 requirement)
npm ls next react react-dom   # deps installed; if it fails: npm ci
npx tsc --noEmit              # typecheck
npm run lint                  # eslint
npm run build                 # static export -> out/ (needs network for next/font Google fonts)
test -f out/index.html        # export produced the page
```

`npm run build` failing on a font fetch means the machine is offline — that is an
environment problem, not a code one; say so instead of reporting a pass.

## Launch (from a clean state)

1. Clean build: `rm -rf .next out && npm run build`.
2. Serve the export on a free port and remember the PID so cleanup only kills
   what this skill started:

   ```bash
   mkdir -p .fredrin/tmp/verify
   PORT=4317
   npx --yes serve@14.2.4 out -l $PORT > .fredrin/tmp/verify/serve.log 2>&1 &
   echo $! > .fredrin/tmp/verify/serve.pid
   ```

3. Ready means usable — not just "port open". Poll until the hero H1 is in the HTML:

   ```bash
   for i in $(seq 1 30); do
     curl -fs http://localhost:$PORT/ | grep -q "Full-stack engineer building with AI." && echo READY && break
     sleep 1
   done
   ```

   No `READY` after 30s: read `serve.log`, report the failure, go to Cleanup.

(For iterating on styles you may use `npm run dev` instead — ready when
`http://localhost:3000/` contains the same H1 — but verification evidence should
come from the static export, which is what ships.)

## Drive

Use Fredrin's browser (the ticket's Live pane when a ticket is bound):

```bash
fredrin browser navigate http://localhost:4317/
fredrin browser text            # must contain the strings below, in order
fredrin browser console         # must show no errors
```

Assert, in this order, on the visible text:

- `jorge pezo · software engineer` (eyebrow)
- `Full-stack engineer building with AI.` (H1 — exactly one `<h1>`)
- `// what i do`, `// projects`, `// outside of work`, `// contact` (section H2s)

Structural asserts (via `fredrin browser eval`):

```js
// one h1 with the right text; section headings in order; no horizontal overflow
JSON.stringify({
  h1: [...document.querySelectorAll('h1')].map(e => e.textContent),
  h2: [...document.querySelectorAll('h2')].map(e => e.textContent),
  bg: getComputedStyle(document.body).backgroundColor,   // rgb(10, 10, 15)
  overflow: document.documentElement.scrollWidth > window.innerWidth,
})
```

## Evidence

Record the action → rendered state, plus screenshots at a desktop (1280px) and a
mobile (390px, device-emulated) width. `fredrin browser` cannot resize its
viewport, and `chrome/msedge --headless --screenshot --window-size=390,…` clamps
the window to a ~500px minimum (the capture comes out cropped, which looks like
overflow but is not), so use the bundled `screenshot.mjs`: it drives an installed
Chrome/Edge through puppeteer-core with real viewport emulation, prints
`{vw, sw, h1, h1px}` per width (`sw > vw` means horizontal overflow) and writes
full-page `desktop.png` / `mobile.png`. puppeteer-core is installed in a scratch
folder, never in the site's `package.json`:

```bash
mkdir -p .fredrin/tmp/verify-shot && cp .claude/skills/verify-app/screenshot.mjs .fredrin/tmp/verify-shot/
(cd .fredrin/tmp/verify-shot && [ -d node_modules/puppeteer-core ] || (npm init -y >/dev/null && npm i puppeteer-core@24.10.0 --silent))
CHROME="C:/Program Files/Google/Chrome/Application/chrome.exe"   # or msedge.exe / /usr/bin/google-chrome
node .fredrin/tmp/verify-shot/screenshot.mjs http://localhost:4317/ .fredrin/tmp/verify "$CHROME"
```

Open each PNG and check: dark `#0a0a0f` background with the indigo/green glow,
gradient H1 fully visible (no clipping or horizontal scroll at 390px), stub or
real sections below it. On a ticket, upload them:
`./.fredrin/fredrin ticket upload <png> --kind after --pair <screen-slug>`.

## Cleanup

Kill only the server this skill started; keep the screenshots.

```bash
kill "$(cat .fredrin/tmp/verify/serve.pid)" 2>/dev/null
rm -f .fredrin/tmp/verify/serve.pid
# The saved PID is the npx wrapper; on Windows/Git Bash the node child keeps the
# port. Kill only the process listening on THIS port:
netstat -ano | grep ":4317 " | grep LISTEN      # last column is the PID
taskkill //PID <that-pid> //F                   # (Linux/macOS: lsof -ti :4317 | xargs kill)
fredrin browser close --headless 2>/dev/null    # if the headless page was used
```

Never kill other `node` processes (dev servers, other tickets' servers).

## Feature map

One entry per top user-facing section of `/`. Each lives in its own file so
section tickets don't collide.

| Section | File | Anchor | What to check |
|---|---|---|---|
| Intro (hero) | `components/sections/Intro.tsx` | `#intro` | eyebrow, H1 "Full-stack engineer building with AI.", lede about ~4 years / Peru / UConn / Connecticut |
| What I do | `components/sections/WhatIDo.tsx` | `#what-i-do` | `// what i do` heading + content |
| Projects | `components/sections/Projects.tsx` | `#projects` | `// projects` heading + project cards with working links |
| Outside of work | `components/sections/OutsideOfWork.tsx` | `#outside-of-work` | `// outside of work` heading + content |
| Contact | `components/sections/Contact.tsx` | `#contact` | `// contact` heading + link chips (email / GitHub / LinkedIn) that resolve |

Shared design tokens and classes (`.eyebrow`, `.title`, `.lede`,
`.section-heading`, `.body-text`, `.tag`, `.card`, `.chip`, …) live in
`app/globals.css`; the page shell is `app/page.tsx`.
