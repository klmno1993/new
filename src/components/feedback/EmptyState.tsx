import { cn } from '../../lib/cn';

export type EmptyStateTone = 'danger' | 'warning';

export interface EmptyStateProps {
  tone?: EmptyStateTone;
  icon?: React.ReactNode;
  title: string;
  body?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function EmptyState({ tone, icon, title, body, actions, className }: EmptyStateProps) {
  return (
    <div className={cn('state', className)} data-tone={tone}>
      {icon && (
        <span className="state-art" aria-hidden>
          {icon}
        </span>
      )}
      <h3 className="state-title">{title}</h3>
      {body && <p className="state-body">{body}</p>}
      {actions && <div className="state-actions">{actions}</div>}
    </div>
  );
}
