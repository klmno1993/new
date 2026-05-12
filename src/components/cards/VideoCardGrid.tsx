import { cn } from '../../lib/cn';
import { Thumbnail, QuickAction } from './Thumbnail';

export type VideoCardStatus = 'parsing' | 'failed' | 'unavailable';
export type VideoCardDensity = 'dense';

export interface VideoCardGridProps {
  title: string;
  creator?: string;
  meta?: string;
  duration?: string;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  placeholderGradient?: string;
  platform?: React.ReactNode;
  liked?: boolean;
  selectable?: boolean;
  selected?: boolean;
  status?: VideoCardStatus;
  density?: VideoCardDensity;
  portrait?: boolean;
  onPlay?: () => void;
  onLike?: () => void;
  onAddToCollection?: () => void;
  onMore?: () => void;
  onSelect?: () => void;
  className?: string;
}

export function VideoCardGrid({
  title,
  creator,
  meta,
  duration,
  thumbnailSrc,
  thumbnailAlt,
  placeholderGradient,
  platform,
  liked,
  selectable,
  selected,
  status,
  density,
  portrait,
  onPlay,
  onLike,
  onAddToCollection,
  onMore,
  onSelect,
  className,
}: VideoCardGridProps) {
  const statusState = status
    ? {
        label: status === 'parsing' ? '解析中' : status === 'failed' ? '失败' : '不可用',
        tone: status === 'failed' ? ('danger' as const) : ('warn' as const),
        pulsing: status === 'parsing',
      }
    : undefined;

  return (
    <div
      className={cn('vcard', className)}
      data-liked={liked ? 'true' : undefined}
      data-selectable={selectable ? 'true' : undefined}
      data-selected={selected ? 'true' : undefined}
      data-density={density}
      data-aspect={portrait ? 'portrait' : undefined}
    >
      {selectable && (
        <button
          className="vcard-select"
          aria-label={selected ? 'Deselect' : 'Select'}
          onClick={(e) => { e.stopPropagation(); onSelect?.(); }}
        >
          {selected && (
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      )}
      <Thumbnail
        src={thumbnailSrc}
        alt={thumbnailAlt}
        placeholderGradient={placeholderGradient}
        aspect={portrait ? '9:16' : undefined}
        duration={!status ? duration : undefined}
        platform={platform}
        state={statusState}
        showPlay
        onClick={onPlay}
        actions={
          <>
            <QuickAction
              className="qa-like"
              active={liked}
              tone={liked ? 'liked' : undefined}
              label={liked ? 'Unlike' : 'Like'}
              onClick={(e) => { e.stopPropagation(); onLike?.(); }}
            >
              <svg viewBox="0 0 16 16" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                <path d="M8 13.5S2 9.5 2 5.5a3 3 0 016 0 3 3 0 016 0c0 4-6 8-6 8z" />
              </svg>
            </QuickAction>
            <QuickAction label="Add to collection" onClick={(e) => { e.stopPropagation(); onAddToCollection?.(); }}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="10" height="10" rx="1.5" />
                <path d="M8 6v4M6 8h4" strokeLinecap="round" />
              </svg>
            </QuickAction>
            <QuickAction label="More" onClick={(e) => { e.stopPropagation(); onMore?.(); }}>
              <svg viewBox="0 0 16 16" fill="currentColor">
                <circle cx="4" cy="8" r="1.2" />
                <circle cx="8" cy="8" r="1.2" />
                <circle cx="12" cy="8" r="1.2" />
              </svg>
            </QuickAction>
          </>
        }
      />
      <h3 className="vcard-title">{title}</h3>
      <p className="vcard-meta">
        {creator && <span className="creator">{creator}</span>}
        {creator && meta && <span className="sep" aria-hidden />}
        {meta && <span>{meta}</span>}
      </p>
    </div>
  );
}
