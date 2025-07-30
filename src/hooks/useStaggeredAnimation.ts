import { useState, useEffect } from 'react';

interface UseStaggeredAnimationProps {
  delay: number;
  staggerDelay: number;
  totalItems: number;
}

export const useStaggeredAnimation = ({ delay, staggerDelay, totalItems }: UseStaggeredAnimationProps) => {
  const [animatedItems, setAnimatedItems] = useState<boolean[]>(new Array(totalItems).fill(false));

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    animatedItems.forEach((_, index) => {
      const timer = setTimeout(() => {
        setAnimatedItems(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, delay + (index * staggerDelay));

      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [delay, staggerDelay, totalItems]);

  return animatedItems;
}; 