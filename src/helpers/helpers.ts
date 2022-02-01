import { RefObject, useEffect, useRef, useState } from 'react';
import { Slide, Directions } from '../types/types';
import { Circular } from './Circular';

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
 * @param slide
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

export function useCircular(
  defaultIndex: number,
  slides: Slide[],
  slidesToShow: number,
  slidesToScroll: number
): Circular {
  const [index, setIndex] = useState<number>(defaultIndex + slidesToShow);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  return new Circular(
    slides,
    index,
    setIndex,
    slidesToShow,
    slidesToScroll,
    isStarted,
    setIsStarted
  );
}

export function useTimeLimit(time: number): [boolean, (arg: boolean) => void] {
  const [isClickable, setIsClickable] = useState<boolean>(true);
  useEffect(() => {
    if (!isClickable) {
      setTimeout(() => setIsClickable(true), time);
    }
  }, [isClickable, time]);
  return [isClickable, setIsClickable];
}
