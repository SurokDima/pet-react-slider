import React, { useEffect, useState } from 'react';

import SlidesProvider, {
  ISlidesProviderProps as ISlidesProps,
} from '../Slides/SlidesProvider';
import { inverseDirection, initSlideObjects } from '../../helpers/helpers';
import {
  Directions,
  Infinite,
  Slide,
  SlideObj,
  Throttle,
} from '../../types/types';
import defaultProps from './carouselDefaultProps';
import {
  useAnimation,
  useAutoplay,
  useCircularOffset,
  useDynamicChildren,
  useWidth,
} from '../../helpers/hooks';

import classes from '../../styles/Carousel.module.scss';

export default function Carousel(userProps: ICarouselProps) {
  const props: Required<ICarouselProps> = { ...defaultProps, ...userProps };

  const [width, ref] = useWidth<HTMLDivElement>(0);

  const [slides, setSlides] = useState<SlideObj[]>(
    initSlideObjects(props.children, props.slidesToShow, props.infinite)
  );
  const slideWidth = width / props.slidesToShow;
  const trackLength = slides.length;

  const [circularOffset, setOffset] = useCircularOffset(
    props.startIndex,
    props.slidesToShow,
    props.slidesToScroll,
    trackLength,
    props.infinite
  );

  const [animation, setAnimation] = useAnimation({
    transition: 0,
    isSliding: false,
  });
  const [throttle, setThrottle] = useState<Throttle>(false);

  useEffect(() => {
    if (!animation.isSliding && props.infinite === 'infinite') {
      const isShouldReset = circularOffset.isShouldReset();
      if (isShouldReset !== false && isShouldReset !== throttle) {
        setOffset(circularOffset.toNextLoopCycle(isShouldReset));
        setThrottle(inverseDirection(isShouldReset));
      }
    }
  }, [
    animation.isSliding,
    circularOffset,
    circularOffset.offset,
    props.infinite,
    setOffset,
    throttle,
  ]);

  const slide = (direction: Directions): void => {
    if (!animation.isSliding) {
      setThrottle(false);
      setAnimation({
        ...animation,
        transition: props.animationDuration,
        isSliding: true,
      });
      setOffset(circularOffset.rotate(direction));
    }
  };

  useAutoplay(
    props.autoplay,
    props.autoplaySpeed + props.animationDuration,
    circularOffset.offset,
    () => slide(Directions.Right)
  );

  useDynamicChildren(
    props.children,
    props.slidesToShow,
    props.infinite,
    setSlides
  );

  const slidesProps: ISlidesProps = {
    slideWidth,
    transition: animation.transition,
    transform: circularOffset.offset * slideWidth,
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
  children: Slide[];

  infinite?: Infinite;
  slidesToShow?: number;
  slidesToScroll?: number;
  animationDuration?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
  startIndex?: number;
}

export interface IAnimationState {
  transition: number;
  isSliding: boolean;
}
