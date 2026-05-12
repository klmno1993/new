export type Language = 'zh' | 'en';

const KEY = 'vew-lang';
const SUPPORTED: Language[] = ['zh', 'en'];
const FALLBACK: Language = 'en';

const dicts: Partial<Record<Language, Record<string, string>>> = {};
let current: Language | null = null;

function readInitial(): Language {
  const stored = localStorage.getItem(KEY) as Language | null;
  if (stored && SUPPORTED.includes(stored)) return stored;
  const htmlLang = (document.documentElement.lang || '').slice(0, 2) as Language;
  if (SUPPORTED.includes(htmlLang)) return htmlLang;
  return 'zh';
}

async function load(lang: Language): Promise<Record<string, string>> {
  if (dicts[lang]) return dicts[lang]!;
  try {
    const res = await fetch(`/src/i18n/${lang}.json`, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`Failed to fetch i18n/${lang}.json`);
    const data = (await res.json()) as Record<string, string>;
    dicts[lang] = data;
    return data;
  } catch (e) {
    console.warn('[i18n] load failed', lang, e);
    dicts[lang] = {};
    return {};
  }
}

function lookup(key: string, lang: Language): string | null {
  const dict = dicts[lang] ?? {};
  if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key] ?? null;
  const parts = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cur: any = dict;
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in cur) cur = cur[p];
    else return null;
  }
  return typeof cur === 'string' ? cur : null;
}

function interpolate(str: string, vars?: Record<string, string | number>): string {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
}

export function t(key: string, vars?: Record<string, string | number>): string {
  if (!current) return key;
  let val = lookup(key, current);
  if (val == null) val = lookup(key, FALLBACK);
  if (val == null) val = key;
  return interpolate(val, vars);
}

function applyDom(root?: Element | Document): void {
  (root ?? document).querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n!;
    let vars: Record<string, string | number> | undefined;
    if (el.dataset.i18nVars) {
      try { vars = JSON.parse(el.dataset.i18nVars); } catch (_) {}
    }
    el.textContent = t(key, vars);
  });
  (root ?? document).querySelectorAll<HTMLElement>('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr!.split(',').forEach((pair) => {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      if (attr && key) el.setAttribute(attr, t(key));
    });
  });
}

export async function setLang(lang: Language): Promise<void> {
  const normalized: Language = SUPPORTED.includes(lang) ? lang : 'zh';
  current = normalized;
  localStorage.setItem(KEY, normalized);
  document.documentElement.lang = normalized;
  await load(normalized);
  if (normalized !== FALLBACK) await load(FALLBACK);
  applyDom();
  window.dispatchEvent(new CustomEvent('vew:langchange', { detail: { lang: normalized } }));
}

export function getLang(): Language | null { return current; }
export function getSupportedLangs(): Language[] { return SUPPORTED.slice(); }

export async function initI18n(): Promise<void> {
  await setLang(readInitial());
}

declare global {
  interface Window {
    VEWi18n: {
      t: typeof t;
      setLang: typeof setLang;
      getLang: typeof getLang;
      supported: typeof getSupportedLangs;
      applyDom: typeof applyDom;
    };
  }
}

if (typeof window !== 'undefined') {
  window.VEWi18n = { t, setLang, getLang, supported: getSupportedLangs, applyDom };
}
