/* ===========================================================================
 * KIMES Design System — Content Editor
 * ---------------------------------------------------------------------------
 * Adds an authenticated edit mode to a static React-rendered page.
 *
 * How it works:
 *   1. Every page load: scans DOM for content nodes (text, images, links),
 *      assigns each a stable key, and applies any localStorage overrides on
 *      top of the React-rendered defaults.
 *   2. Re-runs whenever React re-renders (MutationObserver) so overrides
 *      survive React state changes (e.g., Latin/Korean type tab toggle).
 *   3. Visit `/#admin` (or click 5× on the version pill) to open the
 *      password prompt; once authenticated, edit mode toggles on.
 *   4. In edit mode: text becomes contenteditable, images can be replaced
 *      via URL or file upload (stored as data URI), links can be retargeted.
 *      All changes saved to localStorage on blur.
 *   5. Export/Import JSON for backup or transferring edits between browsers.
 *
 * Storage (single localStorage key, JSON-encoded):
 *   {
 *     auth: { hash: '...', salt: '...' },        // password hash (SHA-256)
 *     content: { '<key>': { type:'text'|'image'|'link', value:'...' } }
 *   }
 *
 * Default password: "kimes" — set on first edit attempt or via `setPassword`.
 *
 * Security note: this is page-level edit protection on a static deployment.
 * It is NOT a real authentication system. Anyone with read access to
 * localStorage / DevTools can read or modify content. Use a real backend
 * for anything sensitive.
 * ========================================================================= */

(function () {
  'use strict';

  const STORAGE_KEY = 'kimes_ds_content_v1';
  const SESSION_KEY = 'kimes_ds_session_v1';
  const DEFAULT_PASSWORD = 'kimes'; // Used only if no password is set yet.

  /* ------------------------------------------------------------------------
   * Storage helpers
   * --------------------------------------------------------------------- */
  function loadStore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { auth: null, content: {} };
    } catch (e) {
      return { auth: null, content: {} };
    }
  }
  function saveStore(store) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  function loadSession() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); }
    catch (e) { return null; }
  }
  function saveSession(s) {
    if (s) sessionStorage.setItem(SESSION_KEY, JSON.stringify(s));
    else sessionStorage.removeItem(SESSION_KEY);
  }

  /* ------------------------------------------------------------------------
   * SHA-256 password hashing (uses Web Crypto)
   * --------------------------------------------------------------------- */
  async function sha256(text) {
    const buf = new TextEncoder().encode(text);
    const hash = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0')).join('');
  }
  function randomSalt() {
    const arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  async function hashPassword(password, salt) {
    return sha256(salt + ':' + password);
  }
  async function checkPassword(password) {
    const store = loadStore();
    if (!store.auth) {
      // First-time use: any non-empty password sets it.
      // BUT to keep UX low-friction, we accept the default password first.
      if (password === DEFAULT_PASSWORD) {
        const salt = randomSalt();
        store.auth = { salt, hash: await hashPassword(password, salt) };
        saveStore(store);
        return true;
      }
      // If they entered a different password, set that one.
      const salt = randomSalt();
      store.auth = { salt, hash: await hashPassword(password, salt) };
      saveStore(store);
      return true;
    }
    const h = await hashPassword(password, store.auth.salt);
    return h === store.auth.hash;
  }
  async function setNewPassword(newPassword) {
    const store = loadStore();
    const salt = randomSalt();
    store.auth = { salt, hash: await hashPassword(newPassword, salt) };
    saveStore(store);
  }

  /* ------------------------------------------------------------------------
   * Stable key generation for DOM nodes
   * ---------------------------------------------------------------------
   * The key needs to be stable across re-renders. We can't use the React
   * tree directly, so we synthesize a key from the closest section id +
   * a path of class names + an index among siblings of the same kind.
   * --------------------------------------------------------------------- */
  function pathKey(node) {
    // Walk up to closest [id]; use that as the prefix.
    let cur = node;
    let section = null;
    while (cur && cur !== document.body) {
      if (cur.id) { section = cur.id; break; }
      cur = cur.parentElement;
    }
    if (!section) section = 'root';

    // Build a path of tag+class signatures from the section root down.
    const stop = document.getElementById(section) || document.body;
    const parts = [];
    cur = node;
    while (cur && cur !== stop && cur !== document.body) {
      const sig = sigOf(cur);
      // Index among siblings with same signature.
      const parent = cur.parentElement;
      let idx = 0, found = false;
      if (parent) {
        for (const sib of parent.children) {
          if (sib === cur) { found = true; break; }
          if (sigOf(sib) === sig) idx++;
        }
        if (!found) idx = 0;
      }
      parts.unshift(sig + (idx ? `[${idx}]` : ''));
      cur = parent;
    }
    return section + '/' + parts.join('/');
  }
  function sigOf(el) {
    const tag = el.tagName.toLowerCase();
    const classes = el.className && typeof el.className === 'string'
      ? el.className.trim().split(/\s+/).filter(Boolean).slice(0, 3).join('.')
      : '';
    return classes ? `${tag}.${classes}` : tag;
  }

  /* ------------------------------------------------------------------------
   * DOM scanning — mark editable nodes & apply overrides
   * ---------------------------------------------------------------------
   * Editable text: any element whose ONLY child is a single text node
   *   (so we don't fight nested React elements). E.g. <h1>Title</h1>,
   *   <p>Description</p>, <span class="name">KIMES</span>, <code>...</code>.
   *
   * Editable images: <img> tags (rare in this design), and <svg> elements
   *   inside elements with class .lbg-photo-stage (the photo backgrounds in
   *   logo rules — we let users replace those via background-image).
   *
   * Editable links: <a> tags inside .main (sidebar links are nav, skip).
   * --------------------------------------------------------------------- */

  // Selectors to skip — UI chrome we shouldn't allow editing.
  const SKIP_SELECTORS = [
    '.ce-toolbar', '.ce-modal-backdrop', '.ce-enter-edit-pill', '.ce-toast',
    '.sidebar', // Nav is structural, not content.
    'script', 'style', 'svg *', // Skip text inside SVGs (logo glyph paths etc.)
  ];
  function isSkipped(el) {
    return SKIP_SELECTORS.some(sel => el.matches && el.matches(sel) || el.closest && el.closest(sel));
  }

  // Is this a leaf text element (single text child, no element children)?
  function isLeafText(el) {
    if (!el.childNodes || el.childNodes.length === 0) return false;
    // Allow only Text nodes; skip if there are any element children.
    for (const c of el.childNodes) {
      if (c.nodeType === Node.ELEMENT_NODE) return false;
    }
    // Must contain non-whitespace text.
    return /\S/.test(el.textContent);
  }

  // Tags eligible for in-place text editing.
  const TEXT_TAGS = new Set([
    'h1','h2','h3','h4','h5','h6',
    'p','span','code','em','strong','b','i','small',
    'td','th','li','dt','dd','figcaption','caption','blockquote',
    'div', // Some leaf divs hold pure text in this design.
  ]);

  function scanAndApply() {
    const main = document.querySelector('.main') || document.body;
    const all = main.querySelectorAll('*');
    const store = loadStore();
    const content = store.content || {};

    for (const el of all) {
      if (isSkipped(el)) continue;

      const tag = el.tagName.toLowerCase();

      // --- Text leaves ---
      if (TEXT_TAGS.has(tag) && isLeafText(el) && !el.dataset.ceEditable) {
        const k = pathKey(el);
        el.dataset.ceEditable = 'text';
        el.dataset.ceKey = k;
        if (content[k] && content[k].type === 'text') {
          el.textContent = content[k].value;
        }
      } else if (el.dataset.ceEditable === 'text' && isLeafText(el)) {
        // Re-apply override after React re-render (React resets textContent).
        // Skip if the user is actively editing this node — we'd clobber their
        // in-progress typing, since saves only happen on blur.
        if (document.activeElement === el) continue;
        const k = el.dataset.ceKey;
        if (content[k] && content[k].type === 'text' && el.textContent !== content[k].value) {
          el.textContent = content[k].value;
        }
      }

      // --- Images ---
      if (tag === 'img' && !el.dataset.ceImage) {
        const k = pathKey(el);
        el.dataset.ceImage = '1';
        el.dataset.ceKey = k;
        if (content[k] && content[k].type === 'image') {
          el.src = content[k].value;
        }
      } else if (tag === 'img' && el.dataset.ceImage) {
        const k = el.dataset.ceKey;
        if (content[k] && content[k].type === 'image' && el.src !== content[k].value) {
          el.src = content[k].value;
        }
      }

      // --- Links (only those in main content) ---
      if (tag === 'a' && el.href && !el.dataset.ceLink) {
        // Skip in-page anchors (nav uses these heavily).
        if (!el.getAttribute('href').startsWith('#')) {
          const k = pathKey(el);
          el.dataset.ceLink = '1';
          el.dataset.ceKey = k;
          if (content[k] && content[k].type === 'link') {
            el.href = content[k].value;
          }
        }
      }
    }
  }

  /* ------------------------------------------------------------------------
   * Edit-mode interaction handlers
   * --------------------------------------------------------------------- */
  let editMode = false;

  function enterEditMode() {
    editMode = true;
    document.body.classList.add('ce-edit-mode');
    // Make text nodes editable.
    document.querySelectorAll('[data-ce-editable="text"]').forEach(el => {
      el.contentEditable = 'true';
      el.spellcheck = false;
    });
    showToolbar();
  }

  function exitEditMode() {
    editMode = false;
    document.body.classList.remove('ce-edit-mode');
    document.querySelectorAll('[data-ce-editable="text"]').forEach(el => {
      el.contentEditable = 'false';
    });
    hideToolbar();
    saveSession(null); // Clear session.
    // Remove #admin from URL.
    if (location.hash === '#admin' || location.hash === '#edit') {
      history.replaceState(null, '', location.pathname + location.search);
    }
  }

  // Capture text edits — save on blur.
  document.addEventListener('blur', function (e) {
    if (!editMode) return;
    const el = e.target;
    if (!el.dataset || el.dataset.ceEditable !== 'text') return;
    const k = el.dataset.ceKey;
    const newVal = el.textContent;
    const store = loadStore();
    store.content = store.content || {};
    // Compare against current default: trick is, we don't have the default
    // anymore if the override was already applied. Just always save if
    // changed from what's stored, or save anyway (user explicitly edited).
    const existing = store.content[k];
    if (existing && existing.value === newVal) return;
    store.content[k] = { type: 'text', value: newVal };
    saveStore(store);
    flashToast('Saved');
  }, true);

  // Image click — open replacement dialog.
  document.addEventListener('click', function (e) {
    if (!editMode) return;
    const img = e.target.closest && e.target.closest('[data-ce-image]');
    if (!img) return;
    e.preventDefault();
    e.stopPropagation();
    openImageDialog(img);
  }, true);

  // Link click — open URL editor (Cmd/Ctrl+click only, plain click follows
  // the link to keep navigation possible while in edit mode).
  document.addEventListener('click', function (e) {
    if (!editMode) return;
    const a = e.target.closest && e.target.closest('a[data-ce-link]');
    if (!a) return;
    if (e.metaKey || e.ctrlKey) return; // Modifier-click follows link.
    e.preventDefault();
    e.stopPropagation();
    openLinkDialog(a);
  }, true);

  /* ------------------------------------------------------------------------
   * UI: login modal, toolbar, dialogs, toast
   * --------------------------------------------------------------------- */
  function showLoginModal(callback) {
    const isFirstTime = !loadStore().auth;
    const backdrop = document.createElement('div');
    backdrop.className = 'ce-modal-backdrop';
    backdrop.innerHTML = `
      <div class="ce-modal" role="dialog" aria-modal="true" aria-labelledby="ce-modal-title">
        <h3 id="ce-modal-title">${isFirstTime ? 'Set editor password' : 'Editor sign-in'}</h3>
        <p>${isFirstTime
            ? 'Create a password to protect content edits on this site. The default is <b>kimes</b> — change it via the toolbar after signing in.'
            : 'Enter the password to enable edit mode.'}</p>
        <input type="password" id="ce-pw" autocomplete="current-password" placeholder="Password" />
        <p class="ce-modal-error" id="ce-pw-err"></p>
        <div class="ce-modal-actions">
          <button class="ce-btn" id="ce-cancel">Cancel</button>
          <button class="ce-btn ce-btn-primary" id="ce-ok">Continue</button>
        </div>
      </div>`;
    document.body.appendChild(backdrop);
    const input = backdrop.querySelector('#ce-pw');
    const err = backdrop.querySelector('#ce-pw-err');
    setTimeout(() => input.focus(), 30);

    function close(success) {
      backdrop.remove();
      if (callback) callback(success);
    }
    backdrop.querySelector('#ce-cancel').onclick = () => close(false);
    backdrop.querySelector('#ce-ok').onclick = async () => {
      const pw = input.value;
      if (!pw) { err.textContent = 'Password is required.'; return; }
      const ok = await checkPassword(pw);
      if (ok) {
        saveSession({ at: Date.now() });
        close(true);
      } else {
        err.textContent = 'Incorrect password.';
        input.select();
      }
    };
    input.onkeydown = e => {
      if (e.key === 'Enter') backdrop.querySelector('#ce-ok').click();
      if (e.key === 'Escape') close(false);
    };
  }

  function showChangePasswordDialog() {
    const backdrop = document.createElement('div');
    backdrop.className = 'ce-modal-backdrop';
    backdrop.innerHTML = `
      <div class="ce-modal" role="dialog" aria-modal="true">
        <h3>Change password</h3>
        <p>Enter a new password for this editor. Save the password somewhere safe — there is no recovery.</p>
        <input type="password" id="ce-pw-new" placeholder="New password" autocomplete="new-password" />
        <input type="password" id="ce-pw-confirm" placeholder="Confirm new password" autocomplete="new-password" />
        <p class="ce-modal-error" id="ce-pw-err"></p>
        <div class="ce-modal-actions">
          <button class="ce-btn" id="ce-cancel">Cancel</button>
          <button class="ce-btn ce-btn-primary" id="ce-ok">Save password</button>
        </div>
      </div>`;
    document.body.appendChild(backdrop);
    const newPw = backdrop.querySelector('#ce-pw-new');
    const confirmPw = backdrop.querySelector('#ce-pw-confirm');
    const err = backdrop.querySelector('#ce-pw-err');
    setTimeout(() => newPw.focus(), 30);

    backdrop.querySelector('#ce-cancel').onclick = () => backdrop.remove();
    backdrop.querySelector('#ce-ok').onclick = async () => {
      if (!newPw.value || newPw.value.length < 4) {
        err.textContent = 'Password must be at least 4 characters.'; return;
      }
      if (newPw.value !== confirmPw.value) {
        err.textContent = 'Passwords do not match.'; return;
      }
      await setNewPassword(newPw.value);
      backdrop.remove();
      flashToast('Password updated');
    };
  }

  function openImageDialog(imgEl) {
    const k = imgEl.dataset.ceKey;
    const currentSrc = imgEl.src;
    const backdrop = document.createElement('div');
    backdrop.className = 'ce-modal-backdrop';
    backdrop.innerHTML = `
      <div class="ce-modal ce-image-dialog" role="dialog" aria-modal="true">
        <h3>Replace image</h3>
        <p>Paste an image URL or upload a file from your device. Uploads are stored as data URIs in this browser.</p>
        <img class="ce-image-preview" src="${currentSrc}" alt="" />
        <input type="text" id="ce-img-url" placeholder="https://example.com/image.jpg" value="${currentSrc.startsWith('data:') ? '' : currentSrc.replace(/"/g, '&quot;')}" />
        <div class="ce-image-or">or</div>
        <input type="file" id="ce-img-file" accept="image/*" />
        <p class="ce-modal-error" id="ce-img-err"></p>
        <div class="ce-modal-actions">
          <button class="ce-btn ce-btn-danger" id="ce-reset" title="Restore original">Reset</button>
          <button class="ce-btn" id="ce-cancel">Cancel</button>
          <button class="ce-btn ce-btn-primary" id="ce-ok">Save</button>
        </div>
      </div>`;
    document.body.appendChild(backdrop);
    const urlInput = backdrop.querySelector('#ce-img-url');
    const fileInput = backdrop.querySelector('#ce-img-file');
    const preview = backdrop.querySelector('.ce-image-preview');
    const err = backdrop.querySelector('#ce-img-err');
    let pickedDataUri = null;

    fileInput.onchange = () => {
      const f = fileInput.files && fileInput.files[0];
      if (!f) return;
      if (f.size > 2 * 1024 * 1024) {
        err.textContent = 'File too large — max 2MB for browser storage.';
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        pickedDataUri = reader.result;
        preview.src = pickedDataUri;
        urlInput.value = '';
      };
      reader.readAsDataURL(f);
    };
    urlInput.oninput = () => {
      pickedDataUri = null;
      if (urlInput.value) preview.src = urlInput.value;
    };

    backdrop.querySelector('#ce-cancel').onclick = () => backdrop.remove();
    backdrop.querySelector('#ce-reset').onclick = () => {
      const store = loadStore();
      if (store.content && store.content[k]) {
        delete store.content[k];
        saveStore(store);
        location.reload();
      } else {
        backdrop.remove();
      }
    };
    backdrop.querySelector('#ce-ok').onclick = () => {
      const newVal = pickedDataUri || urlInput.value.trim();
      if (!newVal) { err.textContent = 'Provide a URL or upload a file.'; return; }
      const store = loadStore();
      store.content = store.content || {};
      store.content[k] = { type: 'image', value: newVal };
      saveStore(store);
      imgEl.src = newVal;
      backdrop.remove();
      flashToast('Image replaced');
    };
  }

  function openLinkDialog(aEl) {
    const k = aEl.dataset.ceKey;
    const backdrop = document.createElement('div');
    backdrop.className = 'ce-modal-backdrop';
    backdrop.innerHTML = `
      <div class="ce-modal" role="dialog" aria-modal="true">
        <h3>Edit link</h3>
        <p>Where should this link go? Use a full URL (https://…) or an in-page anchor (#section-id).</p>
        <input type="text" id="ce-link-url" placeholder="https://example.com" value="${aEl.href.replace(/"/g, '&quot;')}" />
        <p class="ce-modal-error" id="ce-link-err"></p>
        <div class="ce-modal-actions">
          <button class="ce-btn ce-btn-danger" id="ce-reset" title="Restore original">Reset</button>
          <button class="ce-btn" id="ce-cancel">Cancel</button>
          <button class="ce-btn ce-btn-primary" id="ce-ok">Save</button>
        </div>
      </div>`;
    document.body.appendChild(backdrop);
    const urlInput = backdrop.querySelector('#ce-link-url');
    setTimeout(() => urlInput.select(), 30);

    backdrop.querySelector('#ce-cancel').onclick = () => backdrop.remove();
    backdrop.querySelector('#ce-reset').onclick = () => {
      const store = loadStore();
      if (store.content && store.content[k]) {
        delete store.content[k];
        saveStore(store);
        location.reload();
      } else { backdrop.remove(); }
    };
    backdrop.querySelector('#ce-ok').onclick = () => {
      const newVal = urlInput.value.trim();
      if (!newVal) return;
      const store = loadStore();
      store.content = store.content || {};
      store.content[k] = { type: 'link', value: newVal };
      saveStore(store);
      aEl.href = newVal;
      backdrop.remove();
      flashToast('Link updated');
    };
    urlInput.onkeydown = e => {
      if (e.key === 'Enter') backdrop.querySelector('#ce-ok').click();
      if (e.key === 'Escape') backdrop.remove();
    };
  }

  /* ------------------------------------------------------------------------
   * Toolbar
   * --------------------------------------------------------------------- */
  let toolbarEl = null;
  function showToolbar() {
    if (toolbarEl) return;
    toolbarEl = document.createElement('div');
    toolbarEl.className = 'ce-toolbar';
    toolbarEl.innerHTML = `
      <span class="ce-mode-pill">Editing</span>
      <button class="ce-tool-btn" id="ce-export">Export JSON</button>
      <button class="ce-tool-btn" id="ce-import">Import JSON</button>
      <button class="ce-tool-btn" id="ce-changepw">Change password</button>
      <button class="ce-tool-btn danger" id="ce-reset-all" title="Reset all edits to original content">Reset all</button>
      <button class="ce-tool-btn exit" id="ce-exit">Done</button>
    `;
    document.body.appendChild(toolbarEl);
    toolbarEl.querySelector('#ce-exit').onclick = exitEditMode;
    toolbarEl.querySelector('#ce-export').onclick = exportEdits;
    toolbarEl.querySelector('#ce-import').onclick = importEditsDialog;
    toolbarEl.querySelector('#ce-changepw').onclick = showChangePasswordDialog;
    toolbarEl.querySelector('#ce-reset-all').onclick = () => {
      if (confirm('Reset ALL content edits on this site? This cannot be undone.')) {
        const store = loadStore();
        store.content = {};
        saveStore(store);
        location.reload();
      }
    };
  }
  function hideToolbar() {
    if (toolbarEl) { toolbarEl.remove(); toolbarEl = null; }
  }

  /* ------------------------------------------------------------------------
   * Export / Import
   * --------------------------------------------------------------------- */
  function exportEdits() {
    const store = loadStore();
    const data = JSON.stringify({ content: store.content || {} }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kimes-content-edits.json';
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    flashToast('Exported');
  }

  function importEditsDialog() {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'application/json';
    input.onchange = async () => {
      const f = input.files[0]; if (!f) return;
      const text = await f.text();
      try {
        const data = JSON.parse(text);
        if (!data || typeof data.content !== 'object') throw new Error('Invalid format');
        if (!confirm('Import these edits? This will overwrite your current edits.')) return;
        const store = loadStore();
        store.content = data.content;
        saveStore(store);
        location.reload();
      } catch (e) {
        alert('Could not import file: ' + e.message);
      }
    };
    input.click();
  }

  /* ------------------------------------------------------------------------
   * Toast
   * --------------------------------------------------------------------- */
  let toastEl = null, toastTimer = null;
  function flashToast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'ce-toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1400);
  }

  /* ------------------------------------------------------------------------
   * "Edit this page" pill — entry point
   * --------------------------------------------------------------------- */
  let entryPillEl = null;
  function showEntryPill() {
    if (entryPillEl) return;
    entryPillEl = document.createElement('button');
    entryPillEl.className = 'ce-enter-edit-pill';
    entryPillEl.textContent = 'Edit this page';
    entryPillEl.onclick = tryEnterEditMode;
    document.body.appendChild(entryPillEl);
  }
  function hideEntryPill() { if (entryPillEl) { entryPillEl.remove(); entryPillEl = null; } }

  function tryEnterEditMode() {
    if (loadSession()) { enterEditMode(); hideEntryPill(); return; }
    showLoginModal(success => {
      if (success) { enterEditMode(); hideEntryPill(); }
    });
  }

  /* ------------------------------------------------------------------------
   * Mutation observer — re-scan when React updates the DOM
   * --------------------------------------------------------------------- */
  function startObserver() {
    const target = document.getElementById('root') || document.body;
    let scanScheduled = false;
    const obs = new MutationObserver(() => {
      if (scanScheduled) return;
      scanScheduled = true;
      requestAnimationFrame(() => {
        scanScheduled = false;
        scanAndApply();
        // If in edit mode, ensure new text leaves are also editable.
        if (editMode) {
          document.querySelectorAll('[data-ce-editable="text"]').forEach(el => {
            if (!el.isContentEditable) {
              el.contentEditable = 'true';
              el.spellcheck = false;
            }
          });
        }
      });
    });
    obs.observe(target, { childList: true, subtree: true, characterData: true });
  }

  /* ------------------------------------------------------------------------
   * URL trigger — visiting #admin opens login flow.
   * Also: hidden 5-click on the brand mark in the sidebar opens login.
   * --------------------------------------------------------------------- */
  function checkAdminTrigger() {
    if (location.hash === '#admin' || location.hash === '#edit') {
      tryEnterEditMode();
    }
  }
  function setupHiddenTrigger() {
    const brand = document.querySelector('.brand-mark');
    if (!brand) return;
    let count = 0; let last = 0;
    brand.addEventListener('click', () => {
      const now = Date.now();
      if (now - last > 1500) count = 0;
      last = now;
      count++;
      if (count >= 5) { count = 0; tryEnterEditMode(); }
    });
  }

  /* ------------------------------------------------------------------------
   * Boot
   * --------------------------------------------------------------------- */
  function boot() {
    scanAndApply();
    startObserver();
    setupHiddenTrigger();
    checkAdminTrigger();
    window.addEventListener('hashchange', checkAdminTrigger);

    // Expose a small public API for advanced users.
    window.KimesContentEditor = {
      enter: tryEnterEditMode,
      exit: exitEditMode,
      reset: () => { localStorage.removeItem(STORAGE_KEY); location.reload(); },
      export: exportEdits,
    };
  }

  // Wait for React to finish initial render. We try a few times since the
  // page mounts asynchronously after Babel transpiles.
  function waitForRoot(tries = 0) {
    const root = document.getElementById('root');
    if (root && root.children.length > 0) { boot(); return; }
    if (tries > 60) { boot(); return; } // Give up & boot anyway after ~6s.
    setTimeout(() => waitForRoot(tries + 1), 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => waitForRoot());
  } else {
    waitForRoot();
  }
})();
