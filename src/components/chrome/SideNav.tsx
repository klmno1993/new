import { cn } from '../../lib/cn';

export interface SideNavItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  count?: number | string;
  href?: string;
  active?: boolean;
  swatch?: string;
  onClick?: () => void;
}

export interface SideNavGroup {
  id: string;
  label?: string;
  onAdd?: () => void;
  items: SideNavItem[];
}

export interface SideNavFooter {
  usedLabel?: string;
  usedValue?: string;
  fill?: number;
}

export interface SideNavProps {
  groups: SideNavGroup[];
  collapsed?: boolean;
  footer?: SideNavFooter;
  className?: string;
}

export function SideNav({ groups, collapsed, footer, className }: SideNavProps) {
  return (
    <nav
      className={cn('vew-sidenav', className)}
      data-collapsed={collapsed ? 'true' : undefined}
      aria-label="Site navigation"
    >
      {groups.map((group) => (
        <div key={group.id} className="vew-sidenav-group">
          {group.label && (
            <div className="vew-sidenav-label">
              {group.label}
              {group.onAdd && (
                <button
                  className="add"
                  aria-label={`Add to ${group.label}`}
                  onClick={group.onAdd}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 2v8M2 6h8" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>
          )}
          {group.items.map((item) => (
            <a
              key={item.id}
              className="vew-sidenav-item"
              href={item.href ?? '#'}
              aria-current={item.active ? 'page' : undefined}
              onClick={item.onClick}
            >
              <span className="si-icon" aria-hidden>
                {item.swatch && (
                  <span className="si-swatch" style={{ color: item.swatch }} />
                )}
                {item.icon}
              </span>
              <span>{item.label}</span>
              {item.count != null && (
                <span className="si-count">{item.count}</span>
              )}
            </a>
          ))}
        </div>
      ))}

      {footer && (
        <div className="vew-sidenav-footer">
          <div className="label">
            <span>{footer.usedLabel ?? '存储'}</span>
            <span className="val">{footer.usedValue}</span>
          </div>
          <div className="bar" style={{ '--fill': `${footer.fill ?? 0}%` } as React.CSSProperties} />
        </div>
      )}
    </nav>
  );
}
