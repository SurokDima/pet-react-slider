import React, { useState } from 'react';

import SlidesProvider, {
  ISlidesProviderProps as ISlidesProps,
} from '../Slides/SlidesProvider';
import { useWidth, useAutoplay } from '../../helpers/helpers';
import { Slide, Slides } from '../../types/types';
import defaultProps from './carouselDefaultProps';

import classes from '../../styles/Carousel.module.scss';

export default function Carousel(userProps: ICarouselProps) {
  const props = { ...defaultProps, ...userProps };
  const slides = Array.isArray(props.children)
    ? props.children
    : [props.children];

  const [width, ref] = useWidth<HTMLDivElement>(0);

  const slideWidth = width / props.slidesToShow;
  const slidesLength = slides.length;

  const [currentIndex, setCurrentIndex] = useState<number>(
    props.startIndex + 1
  );
  const [isPlay, setIsPlay] = useAutoplay(
    props.autoplay,
    props.autoplaySpeed,
    currentIndex,
    setCurrentIndex
  );

  const [isAnimate, setIsAnimate] = useState<boolean>(false);
  function handleClick(i: number) {
    setIsAnimate(true);
    setCurrentIndex(currentIndex + i);
    setTimeout(() => {
      setIsAnimate(false);
      if (currentIndex === slides.length) {
        setCurrentIndex(1); //TODO fix it
      }
    }, 1000);
  }

  const slidesProps: ISlidesProps = {
    isAnimate,
    currentIndex,
    slideWidth,
    animationDuration: props.animationDuration,
  };

  return (
    <div className={classes.carousel} ref={ref}>
      <div className={classes.window}>
        <SlidesProvider {...slidesProps}>
          {setInfiniteLine(slides)}
        </SlidesProvider>
      </div>
      <button onClick={() => handleClick(-1)}>Left</button>
      <button onClick={() => handleClick(1)}>Right</button>
    </div>
  );
}

function setInfiniteLine(slides: Slide[]) {
  const length = slides.length;
  const result = [slides[length - 1], ...slides, slides[0]];
  return result;
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
