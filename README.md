# KIMES Design System

A multi-brand identity documentation site for KIMES 2026 — Korea's largest medical device and hospital equipment exhibition. Covers four sub-brands (KIMES, Beauty&Derma, MedicomteK, INSPIRE Digital Health) across 17 sections of brand foundations: colors, typography, logos, spacing, gradients, iconography, motion, accessibility, social templates, and a BI audit benchmarking the system against international peers.

## Quick start

This is a fully static site — no build step, no server-side code.

**Local preview**

```bash
python3 -m http.server 8765
# then open http://localhost:8765
```

Run from this directory (the one containing `index.html`). Any static-file server works (Python, `npx serve`, `caddy`, nginx). Opening `index.html` directly via `file://` will not work because Babel-standalone fetches the `.jsx` files over HTTP.

**Deploy**

Drop this entire folder onto any static host:

| Host           | How |
|----------------|-----|
| Netlify        | Drag the folder to the Netlify dashboard, or `netlify deploy --prod --dir .` |
| Vercel         | `vercel deploy` |
| GitHub Pages   | Commit to a repo, enable Pages on that folder |
| Cloudflare Pages | Connect repo, build command empty, output dir `.` |
| S3 / any CDN   | `aws s3 sync . s3://your-bucket/ --delete` |

No environment variables, no secrets, no build pipeline.

## Editing content

The site supports **password-protected in-place editing**. All edits are stored in the visitor's browser (`localStorage`); they are local to that browser and don't sync between devices.

### Enter edit mode

Open the site and add `#admin` to the URL (e.g. `https://yoursite.com/#admin`). A password prompt appears.

- **First time**: any password you enter becomes the password. The default suggestion is `kimes` — change it immediately via the toolbar.
- **Subsequent visits**: enter the password you set.

(Alternative entry: tap the KIMES wordmark in the top-left sidebar 5 times in quick succession.)

### What's editable

- **Text** — every heading, paragraph, table cell, label, caption. Click to place the cursor; type to edit; click outside to save.
- **Images** — `<img>` tags can be replaced with a URL or a file upload (stored as base64 in browser, max 2MB).
- **Links** — `<a>` tags with external URLs can be retargeted. Cmd/Ctrl-click follows the link normally; plain click in edit mode opens the URL editor.

Anchor links in the sidebar nav and the SVG logo glyphs are not editable (they're structural).

### Toolbar actions

While in edit mode, a toolbar appears in the top-right:

- **Export JSON** — download all your edits as a `.json` file. Use this to back up content, or to transfer edits between browsers/devices.
- **Import JSON** — load a previously exported `.json` file. This overwrites current edits.
- **Change password** — set a new password. The current session stays signed in.
- **Reset all** — wipe every edit and revert to the original design content.
- **Done** — exit edit mode (also clears the URL `#admin` fragment).

### Sharing edits across devices

Because edits live in `localStorage`, they don't automatically sync. To move edits between machines:

1. On the source machine, open edit mode → **Export JSON**.
2. On the target machine, open edit mode → **Import JSON** → select the file.

For a real multi-user CMS, this static system isn't the right tool — integrate a backend (Supabase, Firebase, Sanity, etc.) by replacing the storage adapter at the top of `content-editor.js`.

### Reset individual fields

Right-click on an editable image or link to access the **Reset** option in its dialog. For text, manually retype the original or use **Reset all** in the toolbar.

## Security notes

The password protection is **client-side only** — it gates the editing UI but does not protect the underlying data. Anyone with browser DevTools access can read or modify `localStorage`. This is page-level convenience protection, not real authentication.

If you need real auth (e.g. published edits visible to the public, but only authorized users can edit), pair this with a backend service. The `content-editor.js` storage layer (`loadStore`/`saveStore`) is isolated for easy replacement.

## Files

```
kimes-design-system/
├── index.html              ← Entry point
├── docs.css                ← Base design tokens + layout
├── content-editor.css      ← Editor overlay styles
├── content-editor.js       ← Auth + edit mode + persistence
└── components/
    ├── DocsSections.jsx    ← Sidebar + Hero + Brand Family + Color Tokens + Typography + Logo Catalog + Spacing&Grid
    ├── ColorProportion.jsx ← Section 04
    ├── Gradients.jsx       ← Section 05
    ├── TypographyInUse.jsx ← Section 07
    ├── LogoOnBackgrounds.jsx ← Section 09 (Logo rules)
    ├── LogoLockup.jsx      ← Section 10
    ├── Iconography.jsx     ← Section 11
    ├── AssetLibrary.jsx    ← Section 13
    ├── Motion.jsx          ← Section 14
    ├── Accessibility.jsx   ← Section 15
    ├── SocialTemplates.jsx ← Section 16
    ├── BIAudit.jsx         ← Section 17
    ├── Wordmarks.jsx       ← Brand wordmark React components
    ├── LogoSvgs.js         ← All brand-logo SVGs (inline registry)
    └── *.css               ← Per-section stylesheets
```

## Browser support

Modern Chrome, Safari, Firefox, Edge. Uses `IntersectionObserver`, `MutationObserver`, `crypto.subtle` (for password hashing), `localStorage`, and `<script type="text/babel">` (Babel-standalone) — all widely supported.
