import { cn } from '../../lib/cn';

export interface TaskPillProps {
  progress: number;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  className?: string;
}

const RADIUS = 12;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function TaskPill({ progress, title, subtitle, onClick, className }: TaskPillProps) {
  const offset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  return (
    <button
      className={cn('task-pill', className)}
      onClick={onClick}
      aria-label={`${title} — ${progress}%`}
    >
      <span className="task-pill-progress" aria-hidden>
        <svg viewBox="0 0 28 28">
          <circle className="bg" cx="14" cy="14" r={RADIUS} />
          <circle
            className="fg"
            cx="14"
            cy="14"
            r={RADIUS}
            style={{ strokeDashoffset: offset }}
          />
        </svg>
        <span className="val">{progress}%</span>
      </span>
      <div className="task-pill-body">
        {title}
        {subtitle && <div className="sub">{subtitle}</div>}
      </div>
    </button>
  );
}
