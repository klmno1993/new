import { useEffect, useRef } from 'react';
import { cn } from '../../lib/cn';

export type DrawerSide = 'left' | 'bottom';
export type DrawerSize = 'sm' | 'lg';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  size?: DrawerSize;
  title?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function Drawer({ open, onClose, side, size, title, body, footer, children, className }: DrawerProps) {
  const scrimRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        ref={scrimRef}
        className="drawer-scrim"
        onClick={onClose}
        aria-hidden
      />
      <div
        className={cn('drawer', className)}
        data-side={side}
        data-size={size}
        role="dialog"
        aria-modal
      >
        {title && (
          <div className="drawer-header">
            <h2 className="drawer-title">{title}</h2>
            <button
              className="icon-btn"
              data-size="sm"
              aria-label="Close"
              onClick={onClose}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>
          </div>
        )}
        <div className="drawer-body">{body ?? children}</div>
        {footer && <div className="drawer-footer">{footer}</div>}
      </div>
    </>
  );
}
