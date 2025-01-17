import { useEffect, useMemo, useRef } from 'react';

function useDebouncedCallback(func, delay = 500) {
  const timeoutRef = useRef();

  const debounced = useMemo(() => {
    return (...args) => {
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }, [func, delay]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, [debounced]);

  return debounced;
}

export default useDebouncedCallback;