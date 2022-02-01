import React, { RefObject, useEffect, useRef, useState } from 'react';

/**
 * Hook to keep track of the width of element
 * Return state width and ref
 *
 * @param defaultWidth Default width
 */
export function useWidth<T extends HTMLElement>(
  defaultWidth: number
): [number, RefObject<T>] {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState<number>(defaultWidth);

  useEffect(() => {
    const listener = () => ref.current && setWidth(ref.current.clientWidth);
    listener();

    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [ref]);

  return [width, ref];
}

/**
 * Sets autoplay index
 *
 * @param autoplay - default value
 * @param autoplaySpeed - time between slides (in sec)
 * @param currentIndex - current index
 * @param setCurrentIndex - function to set current index
 */
export function useAutoplay(
  autoplay: boolean,
  autoplaySpeed: number,
  currentIndex: number,
  setCurrentIndex: (index: number) => void
): [boolean, (isPlay: boolean) => void] {
  const [isPlay, setIsPlay] = useState<boolean>(autoplay);

  useEffect(() => {
    if (isPlay) {
      const timer = setTimeout(
        () => setCurrentIndex(currentIndex + 1),
        autoplaySpeed * 1000
      );
      return () => clearTimeout(timer);
    }
  }, [isPlay, currentIndex, setCurrentIndex, autoplaySpeed]);

  return [isPlay, setIsPlay];
}
