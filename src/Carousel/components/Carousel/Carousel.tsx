import { ReactNode, useMemo, useState } from 'react';

import SlidesProvider, {
  ISlidesProviderProps as ISlidesProps,
} from '../Slides/SlidesProvider';
import { initSlideObjects } from '../../helpers/helpers';
import { Directions, Infinite, ISlideObj, Slide } from '../../types/types';
import defaultProps from './carouselDefaultProps';
import {
  IAnimProgress,
  useAnimation,
  useAnimProgress,
  useAutoplay,
  useCircularOffset,
  useDynamicChildren,
  useGroups,
  useInfinityMode,
  useSlideFunctions,
  useWidth,
} from '../../helpers/hooks';

import classes from '../../styles/Carousel.module.scss';
import { CarouselProgressBar } from './CarouselProgressBar/CarouselProgressBar';
import CarouselDotsProvider, {
  IDot,
} from './CarouselDotsProvider/CarouselDotsProvider';
import CarouselControlButton from './CarouselControlButton/CarouselControlButton';
import { CarouselPauseButton } from './CarouselPauseButton/CarouselPauseButton';

export default function Carousel(userProps: ICarouselProps) {
  // Merge props
  const props: Required<ICarouselProps> = useMemo(
    () => ({ ...defaultProps, ...userProps }),
    [userProps]
  );

  const {
    children,
    startOffset,
    slidesToShow,
    slidesToScroll,
    infinite,
    animationDuration,
    autoplaySpeed,
    autoplay,
  } = props;

  const carouselProps = {
    startOffset,
    slidesToScroll,
    slidesToShow,
    infinite,
  };

  // Use width of root element
  const [width, ref] = useWidth<HTMLDivElement>(0);

  // Use slides and calc their length and count
  const [slides, setSlides] = useState<readonly ISlideObj[]>(
    initSlideObjects(children, slidesToShow, infinite)
  );
  const slideWidth = width / slidesToShow;
  const trackLength = slides.length;

  // Use offest controlled by CircularOffset class
  const [circularOffset, setOffset] = useCircularOffset({
    trackLength,
    ...carouselProps
  });
  const isRightEdge =
    infinite !== 'none' ||
    (infinite === 'none' &&
      circularOffset.offset !== trackLength - slidesToShow);

  // Use animation
  const [{ isSliding, transition }, setAnimation] = useAnimation({
    transition: 0,
    isSliding: false,
  });

  // Use infinity mode
  const setThrottle = useInfinityMode({
    isSliding,
    infinite,
    circularOffset,
    setOffset,
  });

  // "Memo" functions to slide
  const { slideTo, slideRightCallback, slideLeftCallback } = useSlideFunctions({
    isSliding,
    animationDuration,
    setThrottle,
    setAnimation,
    setOffset,
    rotate: circularOffset.rotate,
  });

  // Use groups
  const [groups, setGroups, getCurrentGroup] = useGroups({
    length: children.length,
    ...carouselProps
  });
  // Get current Group
  const currentGroup = getCurrentGroup(circularOffset.offset);

  // Use autoplay function
  const [isPlay, setIsPlay] = useAutoplay({
    autoplay: autoplay && !isSliding && isRightEdge,
    autoplaySpeed,
    currentOffset: circularOffset.offset,
    slide: slideRightCallback
  });

  // Watch for children changes
  useDynamicChildren({
    children,
    setSlides,
    setGroups,
    ...carouselProps
  });

  // Use progress with css transition animation
  const animProgress = useAnimProgress({
    time: autoplaySpeed * 1000,
    anim: props.useProgress && isPlay && isRightEdge,
    currentOffset: circularOffset.offset,
    isSliding,
    animationDuration: animationDuration * 1000
  });

  // Props to SlidesProvider
  const slidesProps: ISlidesProps = {
    slideWidth,
    transition: transition,
    transform: circularOffset.offset * slideWidth,
  };

  return (
    <div className={classes.carousel} ref={ref}>
      <div className={classes.window}>
        <SlidesProvider {...slidesProps}>{slides}</SlidesProvider>
      </div>

      <CarouselProgressBar
        animProgress={animProgress}
        isUsedProgress={props.useProgress}
        progressBar={props.progressBar}
      />

      <CarouselDotsProvider
        animProgress={animProgress}
        currentGroup={currentGroup}
        dotsProvider={props.dotsProvider}
        groups={groups}
        isUsedDotsProvider={props.useDotsProvider}
        slideTo={slideTo}
      />

      <CarouselControlButton
        type={Directions.Left}
        callback={slideLeftCallback}
        controllButton={props.controllButtonLeft}
      />
      <CarouselControlButton
        type={Directions.Right}
        callback={slideRightCallback}
        controllButton={props.controllButtonRight}
      />

      <CarouselPauseButton
        isPlay={isPlay}
        setIsPlay={setIsPlay}
        isUsedPauseButton={props.usePauseButton}
        pauseButton={props.pauseButton}
      />
    </div>
  );
}

export interface ICarouselProps {
  children: readonly Slide[];

  infinite?: Infinite;
  slidesToShow?: number;
  slidesToScroll?: number;

  animationDuration?: number;

  autoplay?: boolean;
  autoplaySpeed?: number;

  startOffset?: number;

  useProgress?: boolean;
  useDotsProvider?: boolean;
  usePauseButton?: boolean;

  dotsProvider?: DotsProviderRenderProp | null;
  progressBar?: ProgressBarRenderProp | null;
  pauseButton?: PauseButtonRenderProp | null;

  controllButtonLeft?: ControlButtonRenderProp | null;
  controllButtonRight?: ControlButtonRenderProp | null;
}

export type DotsProviderRenderProp = (
  dots: readonly IDot[],
  animProgress?: Readonly<IAnimProgress>
) => ReactNode;
export type ProgressBarRenderProp = (
  animProgress: Readonly<IAnimProgress>
) => ReactNode;
export type PauseButtonRenderProp = (
  isPlay: boolean,
  setIsPlay: (arg: boolean) => void
) => ReactNode;
export type ControlButtonRenderProp = (onClickHandler: () => void) => ReactNode;

export interface IAnimationState {
  transition: number;
  isSliding: boolean;
}