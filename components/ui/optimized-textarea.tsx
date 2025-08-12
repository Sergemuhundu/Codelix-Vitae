import React, { forwardRef, memo } from 'react';
import { cn } from '@/lib/utils';

export interface OptimizedTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onValueChange?: (value: string) => void;
}

const OptimizedTextarea = forwardRef<HTMLTextAreaElement, OptimizedTextareaProps>(
  ({ className, onValueChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      // Call the original onChange if provided
      if (onChange) {
        onChange(e);
      }
      
      // Call the optimized onValueChange
      if (onValueChange) {
        onValueChange(e.target.value);
      }
    };

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

OptimizedTextarea.displayName = "OptimizedTextarea";

export default memo(OptimizedTextarea); 