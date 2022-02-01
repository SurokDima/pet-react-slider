import { Directions, Infinite, Slide, Slides } from '../types/types';

/**
 * Returns new Slide[] with cloned edge elements
 *
 * @param children - input array
 * @param slidesToShow- number of slides to show
 * @param infinite - is carouse infinite
 */
export function initSlides(
  children: Slides,
  slidesToShow: number,
  infinite: Infinite
): Slide[] {
  const slides = Array.isArray(children) ? children : [children];

  if (infinite === 'infinite') {
    const length = Math.ceil(slidesToShow);

    const firstElems = slides.slice(0, length);
    const lastElems = slides.slice(-length);

    return [...lastElems, ...slides, ...firstElems];
  }

  return slides;
}

/**
 * Inverse direction
 *
 * @param direction - input direction
 */
export function inverseDirection(direction: Directions): Directions {
  return direction === Directions.Right ? Directions.Left : Directions.Right;
}
