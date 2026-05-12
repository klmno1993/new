import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

export type TagTone = 'accent' | 'success' | 'warning' | 'danger';
export type TagSize = 'sm' | 'lg';

export interface TagProps {
  tone?: TagTone;
  size?: TagSize;
  pill?: boolean;
  selectable?: boolean;
  selected?: boolean;
  closable?: boolean;
  onClose?: () => void;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ tone, size, pill, selectable, selected, closable, onClose, dot, children, className, onClick }, ref) => (
    <span
      ref={ref}
      className={cn('tag', className)}
      data-tone={tone}
      data-size={size}
      data-shape={pill ? 'pill' : undefined}
      data-selectable={selectable ? 'true' : undefined}
      data-selected={selected ? 'true' : undefined}
      onClick={onClick}
      role={selectable ? 'button' : undefined}
      tabIndex={selectable ? 0 : undefined}
    >
      {dot && <span className="tag-dot" aria-hidden />}
      {children}
      {closable && (
        <span
          className="tag-close"
          role="button"
          aria-label="Remove"
          onClick={(e) => { e.stopPropagation(); onClose?.(); }}
        >
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 2l8 8M10 2l-8 8" />
          </svg>
        </span>
      )}
    </span>
  )
);
Tag.displayName = 'Tag';
