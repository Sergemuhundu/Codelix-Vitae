import { useState, useCallback, useEffect } from 'react';

export function useDebouncedInput<T>(
  initialValue: T,
  delay: number = 300,
  onChange?: (value: T) => void
) {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      if (onChange) {
        onChange(value);
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, onChange]);

  const handleChange = useCallback((newValue: T) => {
    setValue(newValue);
  }, []);

  return {
    value,
    debouncedValue,
    handleChange,
  };
} 