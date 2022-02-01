import React, { useEffect, useState } from 'react';

import SlidesProvider, {
  ISlidesProviderProps as ISlidesProps,
} from '../Slides/SlidesProvider';
import { initSlides, inverseDirection } from '../../helpers/helpers';
import { Directions, Infinite, Slides, Throttle } from '../../types/types';
import defaultProps from './carouselDefaultProps';
import {
  useAutoplay,
  useCircular,
  useTimeLimit,
  useWidth,
} from '../../helpers/hooks';

import classes from '../../styles/Carousel.module.scss';

export default function Carousel(userProps: ICarouselProps) {
  const props = { ...defaultProps, ...userProps };

  const [width, ref] = useWidth<HTMLDivElement>(0);

  const slides = initSlides(props.children, props.slidesToShow, props.infinite); //TODO maybe it must be in state
  const slideWidth = width / props.slidesToShow;
  const trackLength = slides.length;

  const [circularOffset, setOffset] = useCircular(
    props.startIndex,
    props.slidesToShow,
    props.slidesToScroll,
    trackLength,
    props.infinite
  );

  const [isAnimate, setIsAnimate] = useState<boolean>(false);
  const [isClickable, setIsClickable] = useTimeLimit(
    props.animationDuration * 1000
  );
  const [throttle, setThrottle] = useState<Throttle>(false);

  useEffect(() => {
    if (!isAnimate && props.infinite === 'infinite') {
      const isShouldReset = circularOffset.isShouldReset();
      if (isShouldReset !== false && isShouldReset !== throttle) {
        setOffset(circularOffset.toNextLoopCycle(isShouldReset));
        setThrottle(inverseDirection(isShouldReset));
      }
    }
  }, [
    circularOffset,
    circularOffset.offset,
    isAnimate,
    props.infinite,
    setOffset,
    throttle,
  ]);

  function slide(direction: Directions): void {
    if (isClickable) {
      setIsAnimate(true);
      setThrottle(false);
      setOffset(circularOffset.rotate(direction));

      setTimeout(() => {
        setIsAnimate(false);
      }, props.animationDuration * 1000);

      setIsClickable(false);
    }
  }

  const [isPlay, setIsPlay] = useAutoplay(
    props.autoplay,
    props.autoplaySpeed + props.animationDuration,
    circularOffset.offset,
    () => slide(Directions.Right)
  );

  const slidesProps: ISlidesProps = {
    isAnimate,
    currentIndex: circularOffset.offset,
    slideWidth,
    animationDuration: props.animationDuration,
  };

  return (
    <div className={classes.carousel} ref={ref}>
      <div className={classes.window}>
        <SlidesProvider {...slidesProps}>{slides}</SlidesProvider>
      </div>
      <button onClick={() => slide(Directions.Left)}>Left</button>
      <button onClick={() => slide(Directions.Right)}>Right</button>
    </div>
  );
}

export interface ICarouselProps {
  children: Slides;

  infinite?: Infinite;
  slidesToShow?: number;
  slidesToScroll?: number;
  animationDuration?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
  startIndex?: number;
}
