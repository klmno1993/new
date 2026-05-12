export type ThemeMode = 'dark' | 'light' | 'auto';

const KEY = 'vew-theme';

function getMql(): MediaQueryList {
  return window.matchMedia('(prefers-color-scheme: light)');
}

function resolve(mode: ThemeMode): 'dark' | 'light' {
  if (mode === 'auto') return getMql().matches ? 'light' : 'dark';
  return mode;
}

function apply(mode: ThemeMode): void {
  const resolved = resolve(mode);
  document.documentElement.dataset.theme = resolved;
  document.documentElement.dataset.themeMode = mode;
  window.dispatchEvent(
    new CustomEvent('vew:themechange', { detail: { mode, resolved } })
  );
}

export function setTheme(mode: ThemeMode): void {
  const normalized: ThemeMode = ['dark', 'light', 'auto'].includes(mode) ? mode : 'dark';
  localStorage.setItem(KEY, normalized);
  apply(normalized);
}

export function getTheme(): ThemeMode {
  return (localStorage.getItem(KEY) as ThemeMode | null) ?? 'dark';
}

export function initTheme(): void {
  getMql().addEventListener('change', () => {
    if (getTheme() === 'auto') apply('auto');
  });
  apply(getTheme());
}

declare global {
  interface Window {
    VEWTheme: {
      set: typeof setTheme;
      get: typeof getTheme;
      resolve: typeof resolve;
    };
  }
}

if (typeof window !== 'undefined') {
  window.VEWTheme = { set: setTheme, get: getTheme, resolve };
}
