import { cn } from '../../lib/cn';

export interface CollectionCardProps {
  title: string;
  count: number;
  thumbnailGradient?: string;
  thumbnailGradientMid?: string;
  thumbnailGradientBack?: string;
  onClick?: () => void;
  className?: string;
}

export function CollectionCard({
  title,
  count,
  thumbnailGradient,
  thumbnailGradientMid,
  thumbnailGradientBack,
  onClick,
  className,
}: CollectionCardProps) {
  const bgVars = {
    '--placeholder-bg': thumbnailGradient ?? 'var(--media-placeholder)',
    '--placeholder-bg-mid': thumbnailGradientMid ?? 'var(--media-placeholder)',
    '--placeholder-bg-back': thumbnailGradientBack ?? 'var(--media-placeholder)',
  } as React.CSSProperties;

  return (
    <div className={cn('ccard', className)} onClick={onClick} style={bgVars}>
      <div className="ccard-stack">
        <div className="layer layer-back" />
        <div className="layer layer-mid" />
        <div className="layer layer-bg" />
        <span className="count">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="5" width="10" height="8" rx="1" />
            <path d="M5 5V4a3 3 0 016 0v1" />
          </svg>
          {count}
        </span>
      </div>
      <div className="ccard-body">
        <h3 className="ccard-title">{title}</h3>
        <div className="ccard-sub">{count} 个视频</div>
      </div>
    </div>
  );
}
