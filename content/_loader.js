/* ===========================================================================
 * Content loader
 * ---------------------------------------------------------------------------
 * Fetches every JSON file under content/ in parallel and exposes the merged
 * result on window.CONTENT before React mounts.
 *
 * Each section's component reads from window.CONTENT[<section-id>] at render
 * time. Sections that have not yet been extracted still live entirely in JSX
 * — the loader simply has no entry for them, and the component continues to
 * render its hardcoded data.
 *
 * Adding a new section:
 *   1. Create content/<section-id>.json with the editable fields.
 *   2. Add <section-id> to FILES below.
 *   3. Refactor the component to read from window.CONTENT['<section-id>'].
 *   4. Add a matching collection entry in admin/config.yml so the CMS can
 *      edit it.
 * ========================================================================= */

(function () {
  // Manifest of section IDs that have a JSON file. Keep this in sync with
  // the files in content/ — anything not listed here will not be loaded.
  const FILES = [
    'intro',
    'family',
    'color',
  ];

  window.CONTENT = {};
  window.CONTENT_READY = Promise.all(
    FILES.map(name =>
      fetch(`content/${name}.json`, { cache: 'no-store' })
        .then(r => {
          if (!r.ok) throw new Error(`content/${name}.json: HTTP ${r.status}`);
          return r.json();
        })
        .then(json => { window.CONTENT[name] = json; })
        .catch(err => {
          // Don't break the whole site if one file fails — just log and let
          // the component render its fallback (hardcoded) data.
          console.warn('[content-loader]', err.message || err);
        })
    )
  ).then(() => window.CONTENT);
})();
