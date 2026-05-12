import { cn } from '../../lib/cn';

export interface NotificationItemData {
  id: string;
  unread?: boolean;
  title: string;
  message?: string;
  time?: string;
  action?: React.ReactNode;
  onClick?: () => void;
}

export interface NotificationItemProps extends NotificationItemData {
  className?: string;
}

export function NotificationItem({ unread, title, message, time, action, onClick, className }: NotificationItemProps) {
  return (
    <div
      className={cn('noti-item', className)}
      data-unread={unread ? 'true' : undefined}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      <span className="noti-dot" aria-hidden />
      <div className="noti-body">
        <div className="noti-title">{title}</div>
        {message && <div className="noti-msg">{message}</div>}
        {action}
      </div>
      {time && <span className="noti-time">{time}</span>}
    </div>
  );
}

export interface NotificationListProps {
  items: NotificationItemData[];
  className?: string;
}

export function NotificationList({ items, className }: NotificationListProps) {
  return (
    <div className={cn('noti-list', className)} role="list">
      {items.map((item) => (
        <NotificationItem key={item.id} {...item} />
      ))}
    </div>
  );
}
