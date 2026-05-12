import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

export type IconButtonSize = 'sm' | 'lg';
export type IconButtonShape = 'round';
export type IconButtonTone = 'accent' | 'danger';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: IconButtonSize;
  shape?: IconButtonShape;
  tone?: IconButtonTone;
  active?: boolean;
  label: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size, shape, tone, active, disabled, label, children, className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn('icon-btn', className)}
      data-size={size}
      data-shape={shape}
      data-tone={tone}
      data-active={active ? 'true' : undefined}
      disabled={disabled}
      aria-label={label}
      {...props}
    >
      {children}
    </button>
  )
);
IconButton.displayName = 'IconButton';
