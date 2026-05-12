import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'accent'
  | 'danger'
  | 'danger-solid';

export type ButtonSize = 'sm' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, loading, disabled, leftIcon, rightIcon, children, className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn('btn', className)}
      data-variant={variant}
      data-size={size}
      data-loading={loading ? 'true' : undefined}
      disabled={disabled || loading}
      {...props}
    >
      {leftIcon && <span className="btn-icon">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="btn-icon">{rightIcon}</span>}
    </button>
  )
);
Button.displayName = 'Button';
