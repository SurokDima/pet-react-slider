import { Directions, Infinite, Slide, ISlideObj, IGroup } from '../types/types';
import { nanoid } from 'nanoid';

/**
 * Returns new Slide[] with cloned edge elements
 *
 * @param children - input array
 * @param slidesToShow- number of slides to show
 * @param infinite - is carouse infinite
 */
export function initSlides(
  children: Slide[],
  slidesToShow: number,
  infinite: Infinite
): Slide[] {
  if (infinite === 'infinite') {
    const length = Math.ceil(slidesToShow);

    const firstElems = children.slice(0, length);
    const lastElems = children.slice(-length);

    return [...lastElems, ...children, ...firstElems];
  }

  return children;
}

/**
 * Sets unique id to each slide
 *
 * @param slides
 */
export function attachIdToSlides(slides: Slide[]): ISlideObj[] {
  return slides.map(slide => ({
    id: nanoid(),
    slide,
  }));
}

export function initSlideObjects(
  children: Slide[],
  slidesToShow: number,
  infinite: Infinite
) {
  return attachIdToSlides(initSlides(children, slidesToShow, infinite));
}

/**
 * Inverse direction
 *
 * @param direction - input direction
 */
export function inverseDirection(direction: Directions): Directions {
  return direction === Directions.Right ? Directions.Left : Directions.Right;
}

/**
 * Extract slides from slides objects
 *
 * @param slidesObjs
 */
export function extractSlides(slidesObjs: ISlideObj[]): Slide[] {
  return slidesObjs.map(slideObj => slideObj.slide);
}

export function areItemsNotMatched<T>(items: (T | undefined)[]): boolean {
  return items.some(item => item === undefined);
}

export function updateSlides(
  currentSlidesObjs: ISlideObj[],
  newChildren: Slide[],
  prevChildren: Slide[],
  slidesToShow: number,
  infinite: Infinite
): ISlideObj[] | false {
  if (prevChildren.length !== newChildren.length) {
    console.log(prevChildren, newChildren);
    return initSlideObjects(newChildren, slidesToShow, infinite);
  }

  const matchedSlides = prevChildren.map(prevChild => {
    return newChildren.find(newChild => newChild.key === prevChild.key);
  });

  if (areItemsNotMatched(matchedSlides)) {
    return initSlideObjects(newChildren, slidesToShow, infinite);
  }

  return currentSlidesObjs;
}

export function childrenIsChanged(
  newChildren: Slide[],
  prevChildren: Slide[],
): boolean {
  if (prevChildren.length !== newChildren.length) return true;

  const matchedSlides = prevChildren.map(prevChild => {
    return newChildren.find(newChild => newChild.key === prevChild.key);
  });

  return areItemsNotMatched<Slide>(matchedSlides);
}

export function extractOriginalSlides(
  slides: ISlideObj[],
  slidesToShow: number,
  infinite: Infinite
): ISlideObj[] {
  if (infinite !== 'infinite') {
    return slides;
  }

  const roundedSlidesToShow = Math.ceil(slidesToShow);
  return slides.slice(roundedSlidesToShow, -slidesToShow);
}

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

export function initGroups(
  length: number,
  startOffset: number,
  slidesToShow: number,
  slidesToScroll: number,
  infinite: Infinite
): IGroup[] {
  const numberOfGroups = Math.floor(length / slidesToScroll);

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
