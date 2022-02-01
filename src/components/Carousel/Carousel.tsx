import React, { useState } from 'react';

import SlidesProvider, {
  ISlidesProviderProps as ISlidesProps,
} from '../Slides/SlidesProvider';
import { useCircular, useTimeLimit, useWidth } from '../../helpers/helpers';
import { Slides, Directions } from '../../types/types';
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

  // const [isPlay, setIsPlay] = useAutoplay(
  //   props.autoplay,
  //   props.autoplaySpeed,
  //   circular.offset,
  //   circular.setOffset
  // );

  const [isAnimate, setIsAnimate] = useState<boolean>(false);
  const [isClickable, setIsClickable] = useTimeLimit(
    props.animationDuration * 1000
  );

  function handleClick(direction: Directions) {
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
      <button onClick={() => handleClick(Directions.Left)}>Left</button>
      <button onClick={() => handleClick(Directions.Right)}>Right</button>
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
