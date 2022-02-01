import { RefObject, useEffect, useRef, useState } from 'react';
import { CircularOffset } from './CircularOffset';
import { Directions, Infinite, Throttle } from '../types/types';

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
 * @param slide - function to move to next slide
 */
export function useAutoplay(
  autoplay: boolean,
  autoplaySpeed: number,
  currentIndex: number,
  slide: () => void
): [boolean, (isPlay: boolean) => void] {
  const [isPlay, setIsPlay] = useState<boolean>(autoplay);

  useEffect(() => {
    if (isPlay) {
      const timer = setTimeout(() => slide(), autoplaySpeed * 1000);
      return () => clearTimeout(timer);
    }
  }, [isPlay, slide, currentIndex, autoplaySpeed]);

  return [isPlay, setIsPlay];
}

export function useOffset(
  startOffset: number,
  slidesToShow: number,
  infinite: Infinite
): [number, (arg: number) => void] {
  return useState<number>(
    startOffset + infinite === 'infinite' ? Math.ceil(slidesToShow) : 0
  );
}

/**
 * Creates index state hook and return new Circular
 *
 * @param startOffset
 * @param slidesToShow
 * @param slidesToScroll
 * @param trackLength
 * @param infinite
 */
export function useCircular(
  startOffset: number,
  slidesToShow: number,
  slidesToScroll: number,
  trackLength: number,
  infinite: Infinite
): [CircularOffset, (offset: number) => void] {
  const [offset, setOffset] = useOffset(startOffset, slidesToShow, infinite);
  const circular = new CircularOffset(
    offset,
    trackLength,
    slidesToShow,
    slidesToScroll,
    infinite
  );

  return [circular, setOffset];
}

/**
 * Creates isClickable state hook
 * Serves for time limit
 *
 * @param time number of ms
 */
export function useTimeLimit(time: number): [boolean, (arg: boolean) => void] {
  const [isClickable, setIsClickable] = useState<boolean>(true);
  useEffect(() => {
    if (!isClickable) {
      setTimeout(() => setIsClickable(true), time);
    }
  }, [isClickable, time]);
  return [isClickable, setIsClickable];
}
