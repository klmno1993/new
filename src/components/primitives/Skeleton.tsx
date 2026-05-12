import { cn } from '../../lib/cn';

export type SkeletonShape = 'circle' | 'media';

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  shape?: SkeletonShape;
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ width, height, shape, className, style }: SkeletonProps) {
  return (
    <div
      className={cn('skel', className)}
      data-shape={shape}
      style={{ width, height, ...style }}
      aria-hidden
    />
  );
}
