import { useEffect, useRef } from 'react';
import { cn } from '../../lib/cn';

export type MenuItemTone = 'danger';

export interface MenuItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  hint?: React.ReactNode;
  tone?: MenuItemTone;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
}

export interface MenuGroup {
  label?: string;
  items: MenuItem[];
}

export interface MenuProps {
  open: boolean;
  onClose: () => void;
  groups?: MenuGroup[];
  items?: MenuItem[];
  style?: React.CSSProperties;
  className?: string;
}

export function Menu({ open, onClose, groups, items, style, className }: MenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const keyHandler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', keyHandler);
    };
  }, [open, onClose]);

  if (!open) return null;

  const renderItem = (item: MenuItem) => (
    <button
      key={item.id}
      className="menu-item"
      data-tone={item.tone}
      data-active={item.active ? 'true' : undefined}
      disabled={item.disabled}
      aria-disabled={item.disabled}
      onClick={() => { item.onClick?.(); onClose(); }}
    >
      <span className="mi-icon" aria-hidden>{item.icon}</span>
      <span>{item.label}</span>
      {item.hint && <span className="mi-hint">{item.hint}</span>}
    </button>
  );

  const allGroups = groups ?? (items ? [{ items }] : []);

  return (
    <div ref={ref} className={cn('menu', className)} style={style} role="menu">
      {allGroups.map((group, gi) => (
        <div key={gi}>
          {gi > 0 && <div className="menu-sep" role="separator" />}
          {group.label && <div className="menu-label">{group.label}</div>}
          {group.items.map(renderItem)}
        </div>
      ))}
    </div>
  );
}
