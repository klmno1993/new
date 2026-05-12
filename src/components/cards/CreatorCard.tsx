import { cn } from '../../lib/cn';
import { Avatar } from '../primitives/Avatar';

export interface CreatorCardProps {
  name: string;
  platform?: string;
  videoCount?: number;
  avatarSrc?: string;
  avatarInitials?: string;
  platformIcon?: React.ReactNode;
  action?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function CreatorCard({
  name,
  platform,
  videoCount,
  avatarSrc,
  avatarInitials,
  platformIcon,
  action,
  onClick,
  className,
}: CreatorCardProps) {
  return (
    <div
      className={cn('kcard', className)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <Avatar
        src={avatarSrc}
        initials={avatarInitials ?? (name ? name.slice(0, 2).toUpperCase() : '?')}
        size="lg"
        alt={name}
      />
      <div className="kcard-body">
        <h3 className="kcard-name">{name}</h3>
        <div className="kcard-meta">
          {platformIcon && <span aria-hidden>{platformIcon}</span>}
          {platform && <span>{platform}</span>}
          {(platform || platformIcon) && videoCount != null && <span className="sep" aria-hidden />}
          {videoCount != null && <span>{videoCount} 个视频</span>}
        </div>
      </div>
      {action && <div className="kcard-action">{action}</div>}
    </div>
  );
}
