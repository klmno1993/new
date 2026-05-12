import { cn } from '../../lib/cn';
import { Thumbnail } from './Thumbnail';

export interface VideoCardCoverProps {
  title: string;
  eyebrow?: string;
  creator?: string;
  meta?: string;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  placeholderGradient?: string;
  actions?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function VideoCardCover({
  title,
  eyebrow,
  creator,
  meta,
  thumbnailSrc,
  thumbnailAlt,
  placeholderGradient,
  actions,
  onClick,
  className,
}: VideoCardCoverProps) {
  return (
    <div className={cn('vcover', className)} onClick={onClick}>
      <Thumbnail
        src={thumbnailSrc}
        alt={thumbnailAlt}
        placeholderGradient={placeholderGradient}
        aspect="21:9"
        showPlay
      />
      <div className="vcover-body">
        {eyebrow && <div className="vcover-eyebrow">{eyebrow}</div>}
        <h2 className="vcover-title">{title}</h2>
        <div className="vcover-meta">
          {creator && <span>{creator}</span>}
          {meta && <span>{meta}</span>}
          {actions}
        </div>
      </div>
    </div>
  );
}
