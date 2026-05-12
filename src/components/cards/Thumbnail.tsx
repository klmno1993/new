import { cn } from '../../lib/cn';

export type ThumbAspect = '9:16' | '1:1' | '21:9';
export type ThumbStateTone = 'warn' | 'danger';

export interface ThumbState {
  label: string;
  tone?: ThumbStateTone;
  pulsing?: boolean;
}

export interface ThumbnailProps {
  src?: string;
  alt?: string;
  placeholderGradient?: string;
  aspect?: ThumbAspect;
  duration?: string;
  platform?: React.ReactNode;
  state?: ThumbState;
  loading?: boolean;
  actions?: React.ReactNode;
  showPlay?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function Thumbnail({
  src,
  alt,
  placeholderGradient,
  aspect,
  duration,
  platform,
  state,
  loading,
  actions,
  showPlay,
  onClick,
  className,
  style,
}: ThumbnailProps) {
  const cssVars = placeholderGradient
    ? ({ '--placeholder-bg': placeholderGradient } as React.CSSProperties)
    : undefined;

  return (
    <div
      className={cn('thumb', className)}
      data-aspect={aspect}
      data-placeholder={placeholderGradient ? '' : undefined}
      data-loading={loading ? 'true' : undefined}
      style={{ ...cssVars, ...style }}
      onClick={onClick}
    >
      {src && <img className="thumb-img" src={src} alt={alt ?? ''} />}
      {duration && <span className="thumb-duration">{duration}</span>}
      {platform && <span className="thumb-platform" aria-hidden>{platform}</span>}
      {state && (
        <span className="thumb-state" data-tone={state.tone}>
          {state.pulsing && <span className="thumb-state-dot" aria-hidden />}
          {state.label}
        </span>
      )}
      {actions && <div className="thumb-actions">{actions}</div>}
      {showPlay && (
        <div className="thumb-play" aria-hidden>
          <div className="thumb-play-disc">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export interface QuickActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  tone?: 'liked';
  label: string;
  children: React.ReactNode;
}

export function QuickAction({ active, tone, label, children, className, ...props }: QuickActionProps) {
  return (
    <button
      className={cn('qa', className)}
      data-active={active ? 'true' : undefined}
      data-tone={tone}
      aria-label={label}
      {...props}
    >
      {children}
    </button>
  );
}
