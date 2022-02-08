import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { CircularOffset } from './CircularOffset';
import { IGroup, Infinite, Slide, ISlideObj } from '../types/types';
import { childrenIsChanged, initGroups, initSlideObjects } from './helpers';
import { IAnimationState } from '../components/Carousel/Carousel';

/**
 * Hook to keep track of the width of element
 * Return state width and ref
 *
 * @param defaultWidth Default width
 * @return width sate and react ref
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
 * Crates new state to autoplay offset
 * 
 * @param autoplay default value for `isPlay` state
 * @param autoplaySpeed time for one slide(group of slides) in seconds
 * @param currentOffset current offset
 * @param slide right move function
 * @returns isPlay sate and function to change this state
 */
export function useAutoplay(
  autoplay: boolean,
  autoplaySpeed: number,
  currentOffset: number,
  slide: () => void
): [boolean, (isPlay: boolean) => void] {
  const [isPlay, setIsPlay] = useState<boolean>(autoplay);

  useEffect(() => {
    if (isPlay) {
      const timer = setTimeout(() => slide(), autoplaySpeed * 1000);
      return () => clearTimeout(timer);
    }
  }, [isPlay, slide, currentOffset, autoplaySpeed]);

  return [isPlay, setIsPlay];
}

/**
 * Creates new offset state and returns it.
 * 
 * @param startOffset default offset
 * @param slidesToShow number of slides to show at the same time
 * @param infinite scrolling mode 
 * @returns offset state
 */
export function useOffset(
  startOffset: number,
  slidesToShow: number,
  infinite: Infinite
): [number, (arg: number) => void] {
  return useState<number>(
    startOffset + (infinite === 'infinite' ? Math.ceil(slidesToShow) : 0)
  );
}

/**
 * Creates offset state hook and returns new CircularOffset object
 *
 * @param startOffset default offset 
 * @param slidesToShow number of slides to show at the same time
 * @param slidesToScroll length of scroll
 * @param trackLength number of slides
 * @param infinite scrolling mode 
 */
export function useCircularOffset(
  startOffset: number,
  slidesToShow: number,
  slidesToScroll: number,
  trackLength: number,
  infinite: Infinite
): [CircularOffset, (offset: number) => void] {
  const [offset, setOffset] = useOffset(startOffset, slidesToShow, infinite);
  const [circular] = useState<CircularOffset>(
    new CircularOffset(
      offset,
      trackLength,
      slidesToShow,
      slidesToScroll,
      infinite
    )
  );
  circular.setOffset(offset);

  return [circular, setOffset];
}

/**
 * Creates animation state and returns it
 * 
 * @param startState default state
 * @returns animation state and function to set animation state
 */
export function useAnimation(
  startState: IAnimationState
): [IAnimationState, (animState: IAnimationState) => void] {
  const [animation, setAnimation] = useState<IAnimationState>(startState);

  useEffect(() => {
    if (animation.isSliding) {
      setTimeout(
        () =>
          setAnimation({
            transition: 0,
            isSliding: false,
          }),
        animation.transition * 1000
      );
    }
  }, [animation.isSliding, animation.transition]);

  return [animation, setAnimation];
}

/**
 * Executes callback if `isChanged` function returns true
 * 
 * @param prevValue previous value
 * @param newValue new value
 * @param isChanged callback that accepts previous and new value and returns true if the values are not equal
 * @param callback callback to execute
 */
export function useCustomValueChangeLogic<T>(
  prevValue: T,
  newValue: T,
  isChanged: (prevChildren: T, newChildren: T) => boolean,
  callback: () => void
): void {
  useEffect(() => {
    if (isChanged(newValue, prevValue)) {
      callback();
    }
  }, [callback, isChanged, newValue, prevValue]);
}

/**
 * Monitors children changes and recreates slides and groups if children have changed.
 * 
 * @param children carousel `children`
 * @param startOffset number of slides to show at the same time
 * @param slidesToShow number of slides to show at the same time
 * @param slidesToScroll length of scroll
 * @param infinite scrolling mode 
 * @param setSlides function to set slides
 * @param setGroups function to set groups
 */
export function useDynamicChildren(
  children: Slide[],
  startOffset: number,
  slidesToShow: number,
  slidesToScroll: number,
  infinite: Infinite,
  setSlides: (slides: ISlideObj[]) => void,
  setGroups: (groups: IGroup[]) => void
) {
  const [prevChildren] = useState<Slide[]>(children);

  const setSlidesAndGroupsCallback = useCallback<() => void>(() => {
    setSlides(initSlideObjects(children, slidesToShow, infinite));
    setGroups(
      initGroups(
        children.length,
        startOffset,
        slidesToShow,
        slidesToScroll,
        infinite
      )
    );
  }, [
    setSlides,
    children,
    slidesToShow,
    infinite,
    setGroups,
    startOffset,
    slidesToScroll,
  ]);

  useCustomValueChangeLogic(
    prevChildren,
    children,
    childrenIsChanged,
    setSlidesAndGroupsCallback
  );
}

/**
 * Creates state with groups and returns this state and function to get current group id
 *
 * @param length children length
 * @param startOffset number of slides to show at the same time
 * @param slidesToScroll length of scroll
 * @param slidesToShow number of slides to show at the same time
 * @param infinite scrolling mode 
 * @returns array of groups, function to set new current group index and function to get current group id
 */
export function useGroups(
  length: number,
  startOffset: number,
  slidesToScroll: number,
  slidesToShow: number,
  infinite: Infinite
): [IGroup[], (groups: IGroup[]) => void, (offset: number) => string] {
  const groups = initGroups(
    length,
    startOffset,
    slidesToShow,
    slidesToScroll,
    infinite
  );

  /**
   * Returns id of current group
   *
   * @param offset current offset
   * @returns id of current group
   */
  const getCurrentGroup = (offset: number): string => {
    for (let i = 0; i < groups.length - 1; i++) {
      if (offset >= groups[i].offset && offset < groups[i + 1].offset)
        return groups[i].id;
    }

    return groups[groups.length - 1].id;
  };

  const [groupsState, setGroups] = useState<IGroup[]>(groups);
  return [groupsState, setGroups, getCurrentGroup];
}

export interface IAnimProgress {
  transition: number;
  state: 'increasing' | 'decreasing';
  progress: number;
}

/**
 * Returns current progress and animation duration(in ms) to animate progress bar
 *
 * @param time time for one slide(group of slides) prop of carousel in ms
 * @param anim specifies whether to animate to
 * @param currentOffset current offset
 * @param isSliding indicates whether the carousel is currently moving
 * @param animationDuration scroll animation duration in ms
 * @returns objects with current progress and animation duration(in ms)
 */
export function useAnimProgress(
  time: number,
  anim: boolean,
  currentOffset: number,
  isSliding: boolean,
  animationDuration: number
) {
  const [animProgress, setAnimProgress] = useState<IAnimProgress>({
    transition: 0,
    state: 'decreasing',
    progress: 0,
  });

  useEffect(() => {
    setAnimProgress({
      transition: animationDuration,
      state: 'decreasing',
      progress: 0,
    });

    if (anim && !isSliding) {
      setAnimProgress({
        transition: time,
        state: 'increasing',
        progress: 1,
      });
      const timer = setTimeout(
        () =>
          setAnimProgress({
            transition: animationDuration,
            state: 'decreasing',
            progress: 0,
          }),
        time
      );
      return () => clearTimeout(timer);
    }
  }, [time, anim, currentOffset, isSliding, animationDuration]);

  return animProgress;
}
