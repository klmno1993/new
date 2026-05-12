import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

export type AvatarSize = 'sm' | 'lg' | 'xl';
export type AvatarShape = 'square';

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  className?: string;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, alt, initials, size, shape, className }, ref) => (
    <span
      ref={ref}
      className={cn('avatar', className)}
      data-size={size}
      data-shape={shape}
    >
      {src
        ? <img src={src} alt={alt ?? ''} />
        : (initials ?? (alt ? alt.slice(0, 2).toUpperCase() : '?'))
      }
    </span>
  )
);
Avatar.displayName = 'Avatar';

export interface AvatarStackProps {
  children: React.ReactNode;
  className?: string;
}

export function AvatarStack({ children, className }: AvatarStackProps) {
  return <div className={cn('avatar-stack', className)}>{children}</div>;
}
