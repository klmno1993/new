import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '../../lib/cn';

export type ToastTone = 'success' | 'warning' | 'danger' | 'info';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface ToastData {
  id: string;
  tone?: ToastTone;
  title: string;
  message?: string;
  icon?: React.ReactNode;
  action?: { label: string; onClick: () => void };
  duration?: number;
}

interface ToastItemProps extends ToastData {
  onDismiss: (id: string) => void;
}

function ToastItem({ id, tone, title, message, icon, action, duration = 5000, onDismiss }: ToastItemProps) {
  const [leaving, setLeaving] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const dismiss = useCallback(() => {
    setLeaving(true);
    setTimeout(() => onDismiss(id), 200);
  }, [id, onDismiss]);

  const startTimer = useCallback(() => {
    timerRef.current = setTimeout(dismiss, duration);
    if (progressRef.current) {
      progressRef.current.style.transition = `transform ${duration}ms linear`;
      progressRef.current.style.transform = 'scaleX(0)';
    }
  }, [dismiss, duration]);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) {
      const style = window.getComputedStyle(progressRef.current);
      progressRef.current.style.transition = 'none';
      progressRef.current.style.transform = style.transform;
    }
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [startTimer]);

  return (
    <div
      className="toast"
      data-tone={tone}
      data-leaving={leaving ? 'true' : undefined}
      role="alert"
      aria-live="assertive"
      onMouseEnter={pauseTimer}
      onMouseLeave={startTimer}
    >
      {icon && <span className="toast-icon" aria-hidden>{icon}</span>}
      <div className="toast-body">
        <div className="toast-title">{title}</div>
        {message && <div className="toast-msg">{message}</div>}
        {action && (
          <button className="toast-action" onClick={() => { action.onClick(); dismiss(); }}>
            {action.label}
          </button>
        )}
      </div>
      <button className="toast-close" aria-label="Dismiss" onClick={dismiss}>
        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 2l8 8M10 2l-8 8" />
        </svg>
      </button>
      <div ref={progressRef} className="toast-progress" style={{ transform: 'scaleX(1)', transformOrigin: 'left' }} />
    </div>
  );
}

export interface ToastStackProps {
  toasts: ToastData[];
  position?: ToastPosition;
  onDismiss: (id: string) => void;
  className?: string;
}

export function ToastStack({ toasts, position = 'top-right', onDismiss, className }: ToastStackProps) {
  const positionMap: Record<ToastPosition, string> = {
    'top-right': '',
    'top-left': 'top-left',
    'bottom-right': 'bottom-right',
    'bottom-left': 'bottom-left',
  };

  return (
    <div
      className={cn('toast-stack', className)}
      data-position={positionMap[position] || undefined}
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} {...t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

let toastCounter = 0;
export function createToastId(): string {
  return `toast-${++toastCounter}`;
}
