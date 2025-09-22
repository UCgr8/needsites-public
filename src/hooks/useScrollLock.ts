import { useEffect } from 'react';

export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    const body = document.body;
    const originalOverflow = body.style.overflow;

    if (isLocked) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = originalOverflow;
    }

    return () => {
      body.style.overflow = originalOverflow;
    };
  }, [isLocked]);
}