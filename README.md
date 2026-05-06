# KIMES Design System

A multi-brand identity documentation site for KIMES 2026 — Korea's largest medical device and hospital equipment exhibition. Covers four sub-brands (KIMES, Beauty&Derma, MedicomteK, INSPIRE Digital Health) across 17 sections of brand foundations: colors, typography, logos, spacing, gradients, iconography, motion, accessibility, social templates, and a BI audit benchmarking the system against international peers.

The site is a fully static React+Babel-standalone page. Content lives in JSON files under `content/`. A bilingual (EN / 한국어) toggle is built into the sidebar. Editorial updates go through **Sveltia CMS** at `/admin/` and commit straight to GitHub.

## Quick start (local)

```powershell
python -m http.server 8765
# then open http://localhost:8765
```

Run from the directory containing `index.html`. Any static-file server works (Python, `npx serve`, `caddy`, nginx). Opening `index.html` directly via `file://` will not work because Babel-standalone fetches the `.jsx` files over HTTP.

## Deploy

### Step 1 — Push to GitHub

This folder is already a git repo with commits. To put it on GitHub:

1. Create a new empty repo at <https://github.com/new> — public or private, no README/.gitignore (we already have them).
2. Note the URL (e.g. `https://github.com/<owner>/<repo>.git`).
3. From this folder:

```powershell
git remote add origin https://github.com/<owner>/<repo>.git
git branch -M main
git push -u origin main
```

### Step 2 — Update CMS config to point at the new repo

Edit `admin/config.yml` line that says:

```yaml
  repo: kimes/design-system   # TODO: replace with the real GitHub owner/repo before deploying
```

Replace with your real `<owner>/<repo>`. Commit and push.

### Step 3 — Deploy on Netlify

1. Sign up / log in at <https://app.netlify.com>.
2. **Add new site → Import an existing project → GitHub** → pick your repo.
3. Build settings: leave everything blank (the included `netlify.toml` already configures `publish = "."` and an empty build command).
4. **Deploy site**.

In ~30 seconds Netlify gives you a `*.netlify.app` URL. The site is live.

Custom domain: Netlify dashboard → **Domain settings** → add your domain.

> **Other hosts** — Vercel and Cloudflare Pages also work with the same repo (no build step). For Vercel, just import the repo and deploy. For Cloudflare Pages, set output directory to `.`.

### Step 4 — Sign in to the CMS

Open `<your-deployed-url>/admin/`.

Sveltia CMS shows three options:
- **Sign in with GitHub** — uses Sveltia's hosted OAuth flow. Simplest. Click, authorize KIMES editing, done.
- **Sign in Using Access Token** — for editors who can't or don't want to OAuth. Generate a [GitHub Personal Access Token](https://github.com/settings/tokens?type=beta) with **Contents: Read & Write** scope on the repo, paste it.
- **Work with Local Repository** — only used during local development.

After signing in, every save commits to `main` and Netlify auto-redeploys (~30 seconds).

### Step 5 — Inviting other editors

Just give them the repo's collaborator access on GitHub. They open `<deployed-url>/admin/`, sign in with their GitHub, and can edit. No extra accounts needed.

## Editing content

Sveltia CMS at `/admin/` is the canonical editor. Each section has two collections (one per locale):

- **Brand foundations · English** — edits `content/<id>.en.json`
- **Brand foundations · 한국어** — edits `content/<id>.ko.json`

Within each entry you can:
- Edit any text field
- Add / remove / reorder list items (brands, color rows, typography scale steps, etc.)
- Replace images via upload (stored under `assets/uploads/`)
- Save → triggers a commit to GitHub → Netlify rebuilds → live in seconds

Everything is versioned in git history, so any edit is reversible.

### Adding a new section to the CMS

The site has 17 sections in total. The first 7 (Intro, Brand family, Color tokens, Typography, Logo catalog, Spacing & grid, BI audit) are already CMS-editable. The remaining 10 still render from hardcoded JSX. To CMS-enable a section:

1. Create `content/<id>.en.json` (and `<id>.ko.json`) with the editable fields.
2. Add `<id>` to the `FILES` array in `content/_loader.js`.
3. Refactor the component in `components/<Section>.jsx` to read via `useSectionContent('<id>')`.
4. Add a corresponding entry to both `foundations_en` and `foundations_ko` collections in `admin/config.yml`.

### Language toggle

The sidebar has an **EN / 한국어** toggle. Selection is persisted in `localStorage`, and components live-swap the rendered locale. Browser language is auto-detected on first visit (anything starting with `ko` → Korean, else English).

## Files

```
kimes-design-system/
├── index.html              ← Entry point
├── docs.css                ← Base design tokens + layout
├── content-editor.css      ← (legacy) localStorage editor overlay styles
├── content-editor.js       ← (legacy) localStorage editor — being phased out
├── netlify.toml            ← Netlify deploy config
├── admin/
│   ├── index.html          ← Sveltia CMS bootstrap
│   └── config.yml          ← Collections schema, GitHub backend, i18n
├── content/
│   ├── _loader.js          ← Fetches all JSON files at boot, exposes window.CONTENT
│   ├── intro.en.json       ← Section 01 copy (English)
│   ├── intro.ko.json       ← Section 01 copy (한국어)
│   ├── family.en.json      ← Section 02 copy (English)
│   ├── family.ko.json      ← Section 02 copy (한국어)
│   ├── color.en.json       ← Section 03
│   ├── color.ko.json
│   ├── typography.en.json  ← Section 06
│   ├── typography.ko.json
│   ├── logo.en.json        ← Section 08
│   ├── logo.ko.json
│   ├── spacing.en.json     ← Section 12
│   ├── spacing.ko.json
│   ├── bi-audit.en.json    ← Section 17
│   └── bi-audit.ko.json
└── components/
    ├── DocsSections.jsx       ← Sidebar + i18n hooks + sections 01/02/03/06/08/12
    ├── ColorProportion.jsx    ← Section 04   (still hardcoded)
    ├── Gradients.jsx          ← Section 05   (still hardcoded)
    ├── TypographyInUse.jsx    ← Section 07   (still hardcoded)
    ├── LogoOnBackgrounds.jsx  ← Section 09   (still hardcoded)
    ├── LogoLockup.jsx         ← Section 10   (still hardcoded)
    ├── Iconography.jsx        ← Section 11   (still hardcoded)
    ├── AssetLibrary.jsx       ← Section 13   (still hardcoded)
    ├── Motion.jsx             ← Section 14   (still hardcoded)
    ├── Accessibility.jsx      ← Section 16   (still hardcoded)
    ├── SocialTemplates.jsx    ← Section 17 social
    ├── BIAudit.jsx            ← Section 17 BI audit (CMS-editable)
    ├── Wordmarks.jsx          ← Brand wordmark React components
    ├── LogoSvgs.js            ← All brand-logo SVGs (inline registry)
    └── *.css                  ← Per-section stylesheets
```

## Browser support

Modern Chrome, Safari, Firefox, Edge. The CMS at `/admin/` is best in Chromium browsers (uses File System Access API for the local-development backend). Production CMS use (after deployment) works in all modern browsers via GitHub OAuth.

## Legacy: localStorage editor (`#admin`)

A simpler in-place editor was built before Sveltia and still ships at `<url>/#admin`. It only edits text/image/link contents in place and stores changes in browser localStorage — no commits, no real persistence. It is being phased out as more sections become CMS-editable. Don't use it for production edits.
