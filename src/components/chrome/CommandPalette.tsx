import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '../../lib/cn';

export interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  leading?: React.ReactNode;
  leadingType?: 'thumb';
  trail?: React.ReactNode;
  placeholderGradient?: string;
  onClick?: () => void;
}

export interface CommandGroup {
  id: string;
  label: string;
  items: CommandItem[];
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  groups?: CommandGroup[];
  items?: CommandItem[];
  placeholder?: string;
  onSearch?: (query: string) => void;
  emptyTitle?: string;
  emptyBody?: string;
  className?: string;
}

export function CommandPalette({
  open,
  onClose,
  groups,
  items,
  placeholder = '搜索或跳转…',
  onSearch,
  emptyTitle = '没有找到',
  emptyBody,
  className,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const allItems = groups
    ? groups.flatMap((g) => g.items)
    : (items ?? []);
  const hasResults = allItems.length > 0;

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (!open) return;
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, allItems.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
    if (e.key === 'Enter') {
      const item = allItems[activeIndex];
      if (item) { item.onClick?.(); onClose(); }
    }
  }, [open, onClose, allItems, activeIndex]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  if (!open) return null;

  const allGroups = groups ?? (items ? [{ id: '_', label: '', items }] : []);
  let globalIndex = 0;

  return (
    <div className="cmd-scrim" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={cn('cmd-palette', className)} role="dialog" aria-modal>
        <div className="cmd-input-wrap">
          <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="8" cy="8" r="5" />
            <path d="M12 12l4 4" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            className="cmd-input"
            placeholder={placeholder}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); onSearch?.(e.target.value); }}
          />
          <div className="cmd-hint">
            <span className="kbd-mini">esc</span>
          </div>
        </div>

        <div className="cmd-results" role="listbox">
          {hasResults
            ? allGroups.map((group) => (
                <div key={group.id}>
                  {group.label && <div className="cmd-group-label">{group.label}</div>}
                  {group.items.map((item) => {
                    const idx = globalIndex++;
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={item.id}
                        className="cmd-item"
                        data-active={isActive ? 'true' : undefined}
                        role="option"
                        aria-selected={isActive}
                        onClick={() => { item.onClick?.(); onClose(); }}
                        onMouseEnter={() => setActiveIndex(idx)}
                      >
                        <span
                          className={cn(
                            'cmd-item-leading',
                            item.leadingType === 'thumb' ? 'thumb-mini' : undefined
                          )}
                          style={
                            item.leadingType === 'thumb' && item.placeholderGradient
                              ? { background: item.placeholderGradient }
                              : undefined
                          }
                          aria-hidden
                        >
                          {item.leading}
                        </span>
                        <div className="cmd-item-body">
                          <span className="cmd-item-title">{item.title}</span>
                          {item.subtitle && <span className="cmd-item-sub">{item.subtitle}</span>}
                        </div>
                        {item.trail && <span className="cmd-item-trail">{item.trail}</span>}
                      </button>
                    );
                  })}
                </div>
              ))
            : (
              <div className="cmd-empty">
                <p className="em-title">{emptyTitle}</p>
                {emptyBody && <p className="em-body">{emptyBody}</p>}
              </div>
            )
          }
        </div>

        <div className="cmd-foot">
          <div className="cmd-foot-keys">
            <span><span className="kbd-mini">↑↓</span> 导航</span>
            <span><span className="kbd-mini">↵</span> 确认</span>
            <span><span className="kbd-mini">esc</span> 关闭</span>
          </div>
        </div>
      </div>
    </div>
  );
}
