import { cn } from '../../lib/cn';

export type SpinnerTone = 'accent';

export interface SpinnerProps {
  size?: 'lg';
  tone?: SpinnerTone;
  className?: string;
}

export function Spinner({ size, tone, className }: SpinnerProps) {
  return (
    <span
      className={cn('spinner', className)}
      data-size={size}
      data-tone={tone}
      role="status"
      aria-label="Loading"
    />
  );
}
