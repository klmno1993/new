import { cn } from '../../lib/cn';

export interface TopBarNavItem {
  id: string;
  label: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export interface TopBarProps {
  logo?: React.ReactNode;
  brandName?: string;
  brandHref?: string;
  navItems?: TopBarNavItem[];
  searchTrigger?: React.ReactNode;
  actions?: React.ReactNode;
  hasUnread?: boolean;
  className?: string;
}

export function TopBar({
  logo,
  brandName = 'VEW',
  brandHref = '/',
  navItems,
  searchTrigger,
  actions,
  className,
}: TopBarProps) {
  return (
    <header className={cn('vew-topbar', className)}>
      <a className="vew-topbar-brand" href={brandHref}>
        {logo && <span className="vew-topbar-mark" aria-hidden>{logo}</span>}
        <span className="vew-topbar-name">{brandName}</span>
      </a>

      {navItems && navItems.length > 0 && (
        <nav className="vew-topbar-nav" aria-label="Main">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href ?? '#'}
              aria-current={item.active ? 'page' : undefined}
              onClick={item.onClick}
            >
              {item.icon && <span aria-hidden>{item.icon}</span>}
              {item.label}
            </a>
          ))}
        </nav>
      )}

      <div className="vew-topbar-actions">
        {searchTrigger}
        {actions}
      </div>
    </header>
  );
}

export interface SearchTriggerProps {
  placeholder?: string;
  shortcut?: string;
  onClick?: () => void;
  className?: string;
}

export function SearchTrigger({ placeholder = '搜索…', shortcut = '⌘K', onClick, className }: SearchTriggerProps) {
  return (
    <button className={cn('vew-search-trigger', className)} onClick={onClick}>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="7" cy="7" r="4.5" />
        <path d="M10.5 10.5l3 3" strokeLinecap="round" />
      </svg>
      <span className="placeholder">{placeholder}</span>
      <span className="hint">
        <span className="kbd-mini">{shortcut}</span>
      </span>
    </button>
  );
}
