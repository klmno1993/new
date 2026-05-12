/* VEW · theme switcher
   Modes: 'dark' | 'light' | 'auto'
   Persisted in localStorage as 'vew-theme'. Auto follows OS preference. */

(function () {
  const KEY = 'vew-theme';
  const root = document.documentElement;
  const mql = window.matchMedia('(prefers-color-scheme: light)');

  function resolve(mode) {
    if (mode === 'auto') return mql.matches ? 'light' : 'dark';
    return mode;
  }

  function apply(mode) {
    const resolved = resolve(mode);
    root.dataset.theme = resolved;
    root.dataset.themeMode = mode; // for UI to know if user picked auto
    window.dispatchEvent(new CustomEvent('vew:themechange', { detail: { mode, resolved } }));
  }

  function set(mode) {
    if (!['dark', 'light', 'auto'].includes(mode)) mode = 'dark';
    localStorage.setItem(KEY, mode);
    apply(mode);
  }

  function get() {
    return localStorage.getItem(KEY) || 'dark';
  }

  // OS change only matters when in 'auto'
  mql.addEventListener('change', () => {
    if (get() === 'auto') apply('auto');
  });

  // Apply at boot
  apply(get());

  window.VEWTheme = { set, get, resolve };
})();
