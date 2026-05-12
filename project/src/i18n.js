/* VEW · i18n
   Two languages, JSON dictionaries, dot.notation keys, optional {var} interpolation.
   Persists language in localStorage as 'vew-lang'. Defaults to <html lang> or 'zh'.

   Usage in markup:
     <h1 data-i18n="tokens.title"></h1>
     <p data-i18n="downloads.count" data-i18n-vars='{"n":12}'></p>

   Usage in JS:
     t('tokens.title')
     t('downloads.count', { n: 12 })
*/

(function () {
  const KEY = 'vew-lang';
  const SUPPORTED = ['zh', 'en'];
  const FALLBACK  = 'en';

  const dicts = {};
  let current = null;

  function readInitial() {
    const stored = localStorage.getItem(KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
    const htmlLang = (document.documentElement.lang || '').slice(0, 2);
    if (SUPPORTED.includes(htmlLang)) return htmlLang;
    return 'zh';
  }

  async function load(lang) {
    if (dicts[lang]) return dicts[lang];
    try {
      const res = await fetch(`i18n/${lang}.json`, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`Failed to fetch i18n/${lang}.json`);
      dicts[lang] = await res.json();
      return dicts[lang];
    } catch (e) {
      console.warn('[i18n] load failed', lang, e);
      dicts[lang] = {};
      return dicts[lang];
    }
  }

  function lookup(key, lang) {
    const dict = dicts[lang] || {};
    if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    // Walk dotted path as fallback if dict is nested
    const parts = key.split('.');
    let cur = dict;
    for (const p of parts) {
      if (cur && typeof cur === 'object' && p in cur) cur = cur[p];
      else return null;
    }
    return typeof cur === 'string' ? cur : null;
  }

  function interpolate(str, vars) {
    if (!vars) return str;
    return str.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
  }

  function t(key, vars) {
    if (!current) return key;
    let val = lookup(key, current);
    if (val == null) val = lookup(key, FALLBACK);
    if (val == null) val = key;
    return interpolate(val, vars);
  }

  function applyDom(root) {
    (root || document).querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      let vars;
      if (el.dataset.i18nVars) {
        try { vars = JSON.parse(el.dataset.i18nVars); } catch (_) {}
      }
      el.textContent = t(key, vars);
    });
    (root || document).querySelectorAll('[data-i18n-attr]').forEach((el) => {
      // syntax: data-i18n-attr="placeholder:auth.email,title:tooltips.help"
      el.dataset.i18nAttr.split(',').forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s.trim());
        if (attr && key) el.setAttribute(attr, t(key));
      });
    });
  }

  async function setLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = 'zh';
    current = lang;
    localStorage.setItem(KEY, lang);
    document.documentElement.lang = lang;
    await load(lang);
    if (lang !== FALLBACK) await load(FALLBACK); // background fallback
    applyDom();
    window.dispatchEvent(new CustomEvent('vew:langchange', { detail: { lang } }));
  }

  function getLang() { return current; }
  function supported() { return SUPPORTED.slice(); }

  // Boot
  window.VEWi18n = { t, setLang, getLang, supported, applyDom };
  document.addEventListener('DOMContentLoaded', () => setLang(readInitial()));
})();
