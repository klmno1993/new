import { cn } from '../../lib/cn';

export interface AuthCardProps {
  logo?: React.ReactNode;
  title: string;
  subtitle?: string;
  form: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function AuthCard({ logo, title, subtitle, form, footer, className }: AuthCardProps) {
  return (
    <div className={cn('auth-card', className)}>
      <div className="auth-head">
        {logo && <span className="auth-mark">{logo}</span>}
        <h1 className="auth-title">{title}</h1>
        {subtitle && <p className="auth-sub">{subtitle}</p>}
      </div>
      <div className="auth-form">{form}</div>
      {footer && <div className="auth-foot">{footer}</div>}
    </div>
  );
}
