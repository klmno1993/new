import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

export interface RadioProps {
  checked?: boolean;
  defaultChecked?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  id?: string;
  name?: string;
  label?: React.ReactNode;
  className?: string;
}

export const Radio = forwardRef<HTMLLabelElement, RadioProps>(
  ({ checked, defaultChecked, value, onChange, disabled, id, name, label, className }, ref) => (
    <label ref={ref} className={cn('radio', className)}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {label}
    </label>
  )
);
Radio.displayName = 'Radio';
