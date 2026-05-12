import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'lg';
  id?: string;
  className?: string;
}

export const Switch = forwardRef<HTMLLabelElement, SwitchProps>(
  ({ checked, defaultChecked, onChange, disabled, size, id, className }, ref) => (
    <label ref={ref} className={cn('switch', className)} data-size={size}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="switch-track" />
      <span className="switch-thumb" />
    </label>
  )
);
Switch.displayName = 'Switch';
