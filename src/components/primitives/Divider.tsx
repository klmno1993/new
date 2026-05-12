import { cn } from '../../lib/cn';

export type DividerTone = 'soft' | 'strong';

export interface DividerProps {
  tone?: DividerTone;
  vertical?: boolean;
  className?: string;
}

export function Divider({ tone, vertical, className }: DividerProps) {
  if (vertical) {
    return <span className={cn('divider-v', className)} aria-hidden />;
  }
  return <hr className={cn('divider', className)} data-tone={tone} />;
}
