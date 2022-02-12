import { Directions, Infinite, Slide, ISlideObj, IGroup } from '../types/types';
import { nanoid } from 'nanoid';

/**
 * Returns new array of sldies with cloned edge elements
 *
 * @param children input array
 * @param slidesToShow number of slides to show
 * @param infinite scrolling mode
 * @returns new array of slides
 */
export function initSlides(
  children: readonly Slide[],
  slidesToShow: number,
  infinite: Infinite
): Slide[] {
  if (infinite === 'infinite') {
    const length = Math.ceil(slidesToShow);

    const firstElems = children.slice(0, length);
    const lastElems = children.slice(-length);

    return [...lastElems, ...children, ...firstElems];
  }

  return [...children];
}

/**
 * Rerturns new function that executes `func` no more than once per `timeout` milliseconds
 *
 * @param func func to wrap
 * @param timeout timeout between function invocations
 * @returns wrapper function
 */
export function debounce<T extends (...args: any[]) => void>(
  this: any,
  func: T,
  timeout = 300
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout;

  const result = function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): void {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), timeout);
  };
  return result;
}

/**
 * Sets unique id to each slide
 *
 * @param slides array of slides
 * @returns array of slides objects
 */
export function attachIdToSlides(slides: readonly Slide[]): ISlideObj[] {
  return slides.map(slide => ({
    id: nanoid(),
    slide,
  }));
}

/**
 * Returns new array of slide objects
 *
 * @param children input array
 * @param slidesToShow number of slides to show at the same time
 * @param infinite scrolling mode
 * @returns new arrat of slide objects
 */
export function initSlideObjects(
  children: readonly Slide[],
  slidesToShow: number,
  infinite: Infinite
) {
  return attachIdToSlides(initSlides(children, slidesToShow, infinite));
}

/**
 * Inverse direction
 *
 * @param direction input direction
 * @returns opposite direction
 */
export function inverseDirection(direction: Directions): Directions {
  return direction === Directions.Right ? Directions.Left : Directions.Right;
}

/**
 * Returns true if array contains undefined and false otherwise
 *
 * @param items input array of items that may contain undefined
 * @returns true if array contains undefined and false otherwise
 */
export function isContainsUndefined<T>(items: readonly T[]): boolean {
  return items.some(item => item === undefined);
}

/**
 * Returns true if children have changed and false otherwise
 *
 * @param newChildren new children
 * @param prevChildren previous children
 * @returns true if children have changed and false otherwise
 */
export function childrenIsChanged(
  newChildren: readonly Slide[],
  prevChildren: readonly Slide[]
): boolean {
  if (prevChildren.length !== newChildren.length) return true;

  const matchedSlides = prevChildren.map(prevChild => {
    return newChildren.find(newChild => newChild.key === prevChild.key);
  });

  return isContainsUndefined<Slide | undefined>(matchedSlides);
}

/**
 * Returns offset limited by left and right edges
 *
 * @param offset offset to limit
 * @param trackLength length of track
 * @param slidesToShow number of slides to show at the same time
 * @param infinites scrolling mode
 * @returns limimted offset
 */
export function limitOffset(
  offset: number,
  trackLength: number,
  slidesToShow: number,
  infinite: Infinite
): number {
  const rightEdge = trackLength - slidesToShow;

  if (infinite === 'infinite') return offset;

  if (offset > rightEdge) return rightEdge;
  if (offset < 0) return 0;

  return offset;
}

/**
 * Returns new array of groups
 *
 * @param length children length
 * @param startOffset default offset
 * @param slidesToShow number of slides to show at the same time
 * @param slidesToScroll scroll length
 * @param infinite scrolling mode
 * @returns new array of groups
 */
export function initGroups(
  length: number,
  startOffset: number,
  slidesToShow: number,
  slidesToScroll: number,
  infinite: Infinite
): IGroup[] {
  const numberOfGroups = Math.floor(
    (length - (slidesToShow - slidesToScroll)) / slidesToScroll
  );

  const groups = [];

  const offset =
    infinite === 'infinite'
      ? Math.ceil(slidesToShow) + startOffset
      : startOffset;
  for (let i = 0; i < numberOfGroups; i++) {
    groups.push({
      id: nanoid(),
      offset: limitOffset(
        offset + slidesToScroll * i,
        length,
        slidesToShow,
        infinite
      ),
    });
  }

  return groups;
}
