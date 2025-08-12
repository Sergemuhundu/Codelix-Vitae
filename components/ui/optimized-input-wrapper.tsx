import React, { memo } from 'react';
import { Input } from './input';
import { Textarea } from './textarea';

interface OptimizedInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
}

const OptimizedInput = memo<OptimizedInputProps>(({ 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  className,
  disabled 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Input
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
    />
  );
});

OptimizedInput.displayName = 'OptimizedInput';

interface OptimizedTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  rows?: number;
}

const OptimizedTextarea = memo<OptimizedTextareaProps>(({ 
  value, 
  onChange, 
  placeholder, 
  className,
  disabled,
  rows 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <Textarea
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
      rows={rows}
    />
  );
});

OptimizedTextarea.displayName = 'OptimizedTextarea';

export { OptimizedInput, OptimizedTextarea }; 