import { cn } from '../../lib/cn';

export interface MiniPlayerProps {
  title: string;
  subtitle?: string;
  thumbnailSrc?: string;
  placeholderGradient?: string;
  progress?: number;
  playing?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onClose?: () => void;
  onExpand?: () => void;
  className?: string;
}

export function MiniPlayer({
  title,
  subtitle,
  thumbnailSrc,
  placeholderGradient,
  progress = 0,
  playing,
  onPlay,
  onPause,
  onClose,
  onExpand,
  className,
}: MiniPlayerProps) {
  return (
    <div className={cn('mini-player', className)}>
      <div
        className="mini-player-media"
        style={
          thumbnailSrc
            ? { backgroundImage: `url(${thumbnailSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : placeholderGradient
              ? { background: placeholderGradient }
              : undefined
        }
        onClick={onExpand}
        role={onExpand ? 'button' : undefined}
        aria-label={onExpand ? `Expand ${title}` : undefined}
        tabIndex={onExpand ? 0 : undefined}
      >
        <div className="mini-player-progress">
          <div style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="mini-player-body">
        <div>
          <p className="mini-player-title">{title}</p>
          {subtitle && <p className="mini-player-sub">{subtitle}</p>}
        </div>
        <div className="mini-player-controls">
          <button
            className="player-btn"
            aria-label={playing ? 'Pause' : 'Play'}
            onClick={playing ? onPause : onPlay}
          >
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="3" y="2" width="4" height="12" rx="1" />
                <rect x="9" y="2" width="4" height="12" rx="1" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 2v12l10-6z" />
              </svg>
            )}
          </button>
          {onClose && (
            <button className="player-btn" aria-label="Close" onClick={onClose}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 2l10 10M12 2L2 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
