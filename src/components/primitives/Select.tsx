import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  wrapClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ wrapClassName, className, children, ...props }, ref) => (
    <div className={cn('select-wrap', wrapClassName)}>
      <select ref={ref} className={cn('select', className)} {...props}>
        {children}
      </select>
    </div>
  )
);
Select.displayName = 'Select';
