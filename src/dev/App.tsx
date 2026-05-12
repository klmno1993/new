import { useState, useEffect } from 'react';
import { initTheme, setTheme, getTheme } from '../lib/theme';
import type { ThemeMode } from '../lib/theme';
import { PrimitivesSection } from './sections/PrimitivesSection';
import { FeedbackSection } from './sections/FeedbackSection';
import { CardsSection } from './sections/CardsSection';
import { ChromeSection } from './sections/ChromeSection';
import { PlayerSection } from './sections/PlayerSection';

const sections = [
  { id: 'primitives', label: '基础组件' },
  { id: 'feedback',   label: '反馈与容器' },
  { id: 'cards',      label: '卡片家族' },
  { id: 'chrome',     label: '应用骨架' },
  { id: 'player',     label: '播放器' },
];

export function App() {
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [active, setActive] = useState('primitives');

  useEffect(() => {
    initTheme();
    setThemeState(getTheme());
  }, []);

  const handleTheme = (mode: ThemeMode) => {
    setTheme(mode);
    setThemeState(mode);
  };

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        backdropFilter: 'blur(12px) saturate(140%)',
        WebkitBackdropFilter: 'blur(12px) saturate(140%)',
        background: 'color-mix(in oklch, var(--bg-canvas) 78%, transparent)',
        borderBottom: '1px solid var(--line-hairline)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0 }}>
              <path d="M4 6l7 10L18 6" stroke="var(--text-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11 16l5-10" stroke="var(--text-primary)" strokeWidth="2.2" strokeOpacity="0.35" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 17, fontWeight: 500, letterSpacing: '-0.02em' }}>VEW</span>
            <span style={{ width: 1, height: 16, background: 'var(--line-soft)', margin: '0 12px' }} />
            <span style={{ fontSize: 'var(--text-small)', color: 'var(--text-secondary)', letterSpacing: 'var(--tracking-wide)' }}>
              Component Library
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'var(--bg-surface)', border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-full)', padding: 3 }}>
              {sections.map((s) => (
                <button
                  key={s.id}
                  style={{
                    appearance: 'none', border: 0, cursor: 'pointer', padding: '4px 12px',
                    fontSize: 'var(--text-small)', borderRadius: 'var(--radius-full)',
                    background: active === s.id ? 'var(--bg-raised)' : 'transparent',
                    color: active === s.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontFamily: 'inherit',
                    boxShadow: active === s.id ? '0 0 0 1px var(--line-soft) inset' : 'none',
                    transition: 'all 120ms var(--ease-swift)',
                  }}
                  onClick={() => setActive(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </nav>

            <div style={{ display: 'inline-flex', alignItems: 'center', padding: 2, background: 'var(--bg-surface)', border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-full)', gap: 2 }}>
              {(['dark', 'light', 'auto'] as ThemeMode[]).map((m) => (
                <button
                  key={m}
                  aria-pressed={theme === m}
                  style={{
                    appearance: 'none', border: 0, cursor: 'pointer', padding: '4px 10px',
                    fontFamily: 'inherit', fontSize: 'var(--text-caption)', lineHeight: 1,
                    color: theme === m ? 'var(--text-primary)' : 'var(--text-secondary)',
                    background: theme === m ? 'var(--bg-raised)' : 'transparent',
                    borderRadius: 'var(--radius-full)',
                    boxShadow: theme === m ? '0 0 0 1px var(--line-soft) inset' : 'none',
                    transition: 'all 120ms var(--ease-swift)',
                  }}
                  onClick={() => handleTheme(m)}
                >
                  {{ dark: '暗', light: '亮', auto: '跟随' }[m]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px 96px' }}>
        {active === 'primitives' && <PrimitivesSection />}
        {active === 'feedback'   && <FeedbackSection />}
        {active === 'cards'      && <CardsSection />}
        {active === 'chrome'     && <ChromeSection />}
        {active === 'player'     && <PlayerSection />}
      </main>
    </>
  );
}
