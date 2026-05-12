import { cn } from '../../lib/cn';
import { Thumbnail } from './Thumbnail';
import { Tag } from '../primitives/Tag';

export interface VideoCardListProps {
  title: string;
  creator?: string;
  meta?: string;
  duration?: string;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  placeholderGradient?: string;
  tags?: string[];
  selectable?: boolean;
  selected?: boolean;
  squareThumb?: boolean;
  actions?: React.ReactNode;
  onClick?: () => void;
  onSelect?: (selected: boolean) => void;
  className?: string;
}

export function VideoCardList({
  title,
  creator,
  meta,
  duration,
  thumbnailSrc,
  thumbnailAlt,
  placeholderGradient,
  tags,
  selectable,
  selected,
  squareThumb,
  actions,
  onClick,
  onSelect,
  className,
}: VideoCardListProps) {
  return (
    <div
      className={cn('vlist', className)}
      data-selectable={selectable ? 'true' : undefined}
      data-selected={selected ? 'true' : undefined}
      data-aspect={squareThumb ? 'square' : undefined}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {selectable && (
        <div className="vlist-select">
          <input
            type="checkbox"
            className="check-input"
            checked={selected}
            onChange={(e) => { e.stopPropagation(); onSelect?.(e.target.checked); }}
            aria-label="Select video"
          />
        </div>
      )}
      <Thumbnail
        src={thumbnailSrc}
        alt={thumbnailAlt}
        placeholderGradient={placeholderGradient}
        aspect={squareThumb ? '1:1' : undefined}
        duration={duration}
        showPlay
      />
      <div className="vlist-body">
        <h3 className="vlist-title">{title}</h3>
        <div className="vlist-meta">
          {creator && <span className="creator">{creator}</span>}
          {creator && meta && <span className="sep" aria-hidden />}
          {meta && <span>{meta}</span>}
        </div>
        {tags && tags.length > 0 && (
          <div className="vlist-tags">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      </div>
      {actions && <div className="vlist-actions">{actions}</div>}
    </div>
  );
}
