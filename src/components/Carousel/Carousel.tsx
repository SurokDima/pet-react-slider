import React, { useState } from 'react';

import SlidesProvider, {
  ISlidesProviderProps as ISlidesProps,
} from '../Slides/SlidesProvider';
import {
  useAutoplay,
  useCircular,
  useTimeLimit,
  useWidth,
} from '../../helpers/helpers';
import { Directions, Slides } from '../../types/types';
import defaultProps from './carouselDefaultProps';

import classes from '../../styles/Carousel.module.scss';

export default function Carousel(userProps: ICarouselProps) {
  const props = { ...defaultProps, ...userProps };
  const slides = Array.isArray(props.children)
    ? props.children
    : [props.children];

  const [width, ref] = useWidth<HTMLDivElement>(0);
  const slideWidth = width / props.slidesToShow;

  const circular = useCircular(
    props.startIndex,
    slides,
    props.slidesToShow,
    props.slidesToScroll
  );

  const [isAnimate, setIsAnimate] = useState<boolean>(false);
  const [isClickable, setIsClickable] = useTimeLimit(
    props.animationDuration * 1000
  );

  function slide(direction: Directions): void {
    if (isClickable) {
      setIsAnimate(true);
      circular.rotate(direction);
      setTimeout(() => {
        setIsAnimate(false);
        circular.reset();
      }, props.animationDuration * 1000);
      setIsClickable(false);
    }
  }

  const [isPlay, setIsPlay] = useAutoplay(
    props.autoplay,
    props.autoplaySpeed + props.animationDuration,
    circular.offset,
    () => slide(Directions.Right)
  );

  const slidesProps: ISlidesProps = {
    isAnimate,
    currentIndex: circular.offset,
    slideWidth,
    animationDuration: props.animationDuration,
  };

  return (
    <div className={classes.carousel} ref={ref}>
      <div className={classes.window}>
        <SlidesProvider {...slidesProps}>{circular.slides}</SlidesProvider>
      </div>
      <button onClick={() => slide(Directions.Left)}>Left</button>
      <button onClick={() => slide(Directions.Right)}>Right</button>
    </div>
  );
}

export interface ICarouselProps {
  children: Slides;

  infinite?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  animationDuration?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
  startIndex?: number;
}
