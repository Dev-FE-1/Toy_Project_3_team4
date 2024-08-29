import { useState, useEffect, useMemo } from 'react';

import { debounce } from 'lodash';

interface UseDebounceProps {
  initialValue?: string;
  delay?: number;
}

export const useDebounce = (props?: UseDebounceProps) => {
  const { initialValue = '', delay = 300 } = props || {};

  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(value);

  const updateDebouncedValue = useMemo(
    () =>
      debounce((newValue: string) => {
        setDebouncedValue(newValue);
      }, delay),
    [delay],
  );

  useEffect(() => {
    updateDebouncedValue(value);
    return () => {
      updateDebouncedValue.cancel();
    };
  }, [value, updateDebouncedValue]);

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  return { value, debouncedValue, onChange };
};
