import { useEffect, useRef } from 'react';
import { cn } from '../../lib/cn';

export type DialogSize = 'sm' | 'lg' | 'xl';
export type DialogTone = 'danger' | 'warning' | 'success';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  eyebrow?: React.ReactNode;
  size?: DialogSize;
  variant?: 'confirm';
  tone?: DialogTone;
  confirmIcon?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function Dialog({
  open,
  onClose,
  title,
  eyebrow,
  size,
  variant,
  tone,
  confirmIcon,
  body,
  footer,
  children,
  className,
}: DialogProps) {
  const scrimRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={scrimRef}
      className="scrim"
      role="dialog"
      aria-modal
      onClick={(e) => { if (e.target === scrimRef.current) onClose(); }}
    >
      <div
        className={cn('dialog', className)}
        data-size={size}
        data-variant={variant}
        data-tone={tone}
      >
        <div className="dialog-header">
          {variant === 'confirm' && confirmIcon && (
            <span className="confirm-icon" aria-hidden>{confirmIcon}</span>
          )}
          <div>
            {eyebrow && <div className="dialog-eyebrow">{eyebrow}</div>}
            {title && <h2 className="dialog-title">{title}</h2>}
          </div>
          <button className="dialog-close" aria-label="Close dialog" onClick={onClose}>
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 2l10 10M12 2L2 12" />
            </svg>
          </button>
        </div>
        {(body || children) && (
          <div className="dialog-body">{body ?? children}</div>
        )}
        {footer && <div className="dialog-footer">{footer}</div>}
      </div>
    </div>
  );
}
