import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

export type InputSize = 'sm' | 'lg';
export type InputState = 'error';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  inputSize?: InputSize;
  state?: InputState;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  wrapClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ inputSize, state, prefix, suffix, wrapClassName, className, ...props }, ref) => (
    <div
      className={cn('input-wrap', wrapClassName)}
      data-size={inputSize}
      data-state={state}
    >
      {prefix && <span className="input-prefix">{prefix}</span>}
      <input ref={ref} className={cn('input', className)} {...props} />
      {suffix && <span className="input-suffix">{suffix}</span>}
    </div>
  )
);
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn('textarea', className)} {...props} />
  )
);
Textarea.displayName = 'Textarea';

export interface FieldProps {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  hintTone?: 'error';
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Field({ label, hint, hintTone, required, children, className }: FieldProps) {
  return (
    <div className={cn('field', className)}>
      {label && (
        <label className="field-label">
          {label}
          {required && <span className="req" aria-hidden>*</span>}
        </label>
      )}
      {children}
      {hint && (
        <span className="field-hint" data-tone={hintTone}>
          {hint}
        </span>
      )}
    </div>
  );
}
