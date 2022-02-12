import { useState, useEffect } from 'react';
import { debounce } from '../helpers/helpers';

export interface IScroll {
  top: number;
  left: number;
}

/**
 * Create new scroll state
 * 
 * @returns current scroll
 */
export function useScroll(): IScroll {
  const [scroll, setScroll] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    const updatePosition = debounce(() => {
      setScroll({
        top: window.scrollY,
        left: window.scrollX,
      });
    });
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scroll;
}

/**
 * Executes callback when on resize (uses debounce)
 * 
 * @param callback callback to execute
 */
export function useResize(callback: () => void) {
  useEffect(() => {
    const listener = debounce(callback);
    listener();

    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [callback]);
}