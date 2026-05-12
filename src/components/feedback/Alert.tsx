import { cn } from '../../lib/cn';

export type AlertTone = 'success' | 'warning' | 'danger' | 'info';

export interface AlertProps {
  tone?: AlertTone;
  title?: React.ReactNode;
  message?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function Alert({ tone, title, message, icon, action, className }: AlertProps) {
  return (
    <div className={cn('alert', className)} data-tone={tone} role="alert">
      {icon && (
        <span className="alert-icon" aria-hidden>
          {icon}
        </span>
      )}
      <div className="alert-body">
        {title && <div className="alert-title">{title}</div>}
        {message && <div className="alert-msg">{message}</div>}
      </div>
      {action}
    </div>
  );
}
