import { useState, useEffect, useRef } from 'react';

interface UseAnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  startAnimation?: boolean;
}

export const useAnimatedCounter = ({ 
  target, 
  duration = 2000, 
  suffix = '', 
  startAnimation = false 
}: UseAnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    if (!startAnimation) {
      setCount(0);
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * target);
      
      countRef.current = currentCount;
      setCount(currentCount);

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [target, duration, startAnimation]);

  return `${count}${suffix}`;
};