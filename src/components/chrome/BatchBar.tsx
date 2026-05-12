import { cn } from '../../lib/cn';

export interface BatchBarProps {
  count: number;
  actions?: React.ReactNode;
  onClear?: () => void;
  className?: string;
}

export function BatchBar({ count, actions, onClear, className }: BatchBarProps) {
  return (
    <div className={cn('batch-bar', className)} role="toolbar" aria-label="Batch actions">
      <span className="count">
        已选择 <strong>{count}</strong> 项
      </span>
      {onClear && (
        <button
          className="icon-btn"
          data-size="sm"
          aria-label="Clear selection"
          onClick={onClear}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 2l10 10M12 2L2 12" />
          </svg>
        </button>
      )}
      {actions && (
        <>
          <span className="sep" aria-hidden />
          <div className="batch-bar-actions">{actions}</div>
        </>
      )}
    </div>
  );
}
