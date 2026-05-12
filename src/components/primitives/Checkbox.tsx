import { forwardRef, useEffect, useRef } from 'react';
import { cn } from '../../lib/cn';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  label?: React.ReactNode;
  className?: string;
}

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  ({ checked, defaultChecked, indeterminate, onChange, disabled, id, label, className }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate ?? false;
      }
    }, [indeterminate]);

    return (
      <label ref={ref} className={cn('check', className)}>
        <input
          ref={inputRef}
          type="checkbox"
          id={id}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        {label}
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';
