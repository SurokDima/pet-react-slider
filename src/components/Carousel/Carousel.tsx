import React, { ReactNode, useEffect, useState } from 'react';

import Slides, { IProps as ISlidesProps } from './Slides/Slides';
import Slide, { IProps as ISlideProps } from './Slides/Slide/Slide';
import { filterChildren, useWidth } from '../../helpers/Helpers';

import classes from './Carousel.module.scss';

interface IProps {
  children: ReactNode;

  slidesToShow?: number;
  slidesToScroll?: number;
  animationDuration?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
  startIndex?: number;
}

export default function Carousel({
  children,
  slidesToShow = 1,
  slidesToScroll = 1,
  autoplay = true,
  autoplaySpeed = 4,
  startIndex = 0,
  animationDuration = 0.5,
}: IProps) {
  const [width, ref] = useWidth<HTMLDivElement>(0);

  const slides = filterChildren<ISlideProps>(children, Slide);
  const slideWidth = width / slidesToShow;
  const slidesLength = slides.length;

  const [currentIndex, setCurrentIndex] = useState<number>(startIndex);
  const [isPlay, setIsPlay] = useAutoplay(
    autoplay,
    autoplaySpeed,
    currentIndex,
    setCurrentIndex
  );

  const slidesProps: ISlidesProps = {
    currentIndex,
    slideWidth,
    animationDuration,
  };

  return (
    <div className={classes.carousel} ref={ref}>
      <div className={classes.window}>
        <Slides {...slidesProps}>{slides}</Slides>
      </div>
      <button onClick={() => setCurrentIndex(currentIndex - 1)}>Left</button>
      <button onClick={() => setCurrentIndex(currentIndex + 1)}>Right</button>
    </div>
  );
}

/**
 * Sets autoplay index
 *
 * @param autoplay - default value
 * @param autoplaySpeed - time between slides (in sec)
 * @param currentIndex - current index
 * @param setCurrentIndex - function to set current index
 */
function useAutoplay(
  autoplay: boolean,
  autoplaySpeed: number,
  currentIndex: number,
  setCurrentIndex: (index: number) => void
) {
  const [isPlay, setIsPlay] = useState<boolean>(autoplay);

  useEffect(() => {
    if (isPlay) {
      const timer = setTimeout(
        () => setCurrentIndex(currentIndex + 1),
        autoplaySpeed * 1000
      );
      return () => clearTimeout(timer);
    }
  }, [isPlay, currentIndex, setCurrentIndex, autoplaySpeed]);

  return [isPlay, setIsPlay];
}
