import { useEffect, useRef } from 'react';
import { cn } from '../../lib/cn';

export interface PopoverProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export function Popover({ open, onClose, title, body, footer, children, style, className }: PopoverProps) {
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

  return (
    <div ref={ref} className={cn('popover', className)} style={style} role="dialog">
      {title && (
        <div className="popover-header">
          <span className="popover-title">{title}</span>
        </div>
      )}
      {(body || children) && <div className="popover-body">{body ?? children}</div>}
      {footer && <div className="popover-footer">{footer}</div>}
    </div>
  );
}
