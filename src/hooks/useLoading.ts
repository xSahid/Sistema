import { useState, useEffect } from 'react';

interface UseLoadingOptions {
  delay?: number;
  minDuration?: number;
}

export const useLoading = (options: UseLoadingOptions = {}) => {
  const { delay = 0, minDuration = 1000 } = options;
  const [isLoading, setIsLoading] = useState(true);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const timer = setTimeout(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDuration - elapsed);
      
      setTimeout(() => {
        setIsLoading(false);
      }, remaining);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, minDuration, startTime]);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return {
    isLoading,
    startLoading,
    stopLoading
  };
}; 