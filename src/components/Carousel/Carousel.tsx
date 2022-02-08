import { ReactNode, useCallback, useMemo, useState } from 'react';

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
  useWidth,
} from '../../helpers/hooks';
import ControlButton from '../ControlButton/ControlButton';
import DotsProvider from '../DotsProvider/DotsProvider';
import ProgressBar from '../ProgressBar/ProgressBar';
import PauseButton from '../PauseButton/PauseButton';

import classes from '../../styles/Carousel.module.scss';

export default function Carousel(userProps: ICarouselProps) {
  // Merge props
  const props: Required<ICarouselProps> = useMemo(
    () => ({ ...defaultProps, ...userProps }),
    [userProps]
  );

  // Use width of root element
  const [width, ref] = useWidth<HTMLDivElement>(0);

  // Use slides and calc their length and count
  const [slides, setSlides] = useState<readonly ISlideObj[]>(
    initSlideObjects(props.children, props.slidesToShow, props.infinite)
  );
  const slideWidth = width / props.slidesToShow;
  const trackLength = slides.length;

  // Use offest controlled by CircularOffset class
  const [circularOffset, setOffset] = useCircularOffset(
    props.startOffset,
    props.slidesToShow,
    props.slidesToScroll,
    trackLength,
    props.infinite
  );
  const isRightEdge =
    props.infinite !== 'none' ||
    (props.infinite === 'none' &&
      circularOffset.offset !== trackLength - props.slidesToShow);

  // Use animation
  const [animation, setAnimation] = useAnimation({
    transition: 0,
    isSliding: false,
  });

  // Use infinity mode
  const setThrottle = useInfinityMode(
    animation.isSliding,
    props.infinite,
    circularOffset,
    setOffset
  );

  // "Memo" function to slide
  const slideTo = useCallback(
    (offset: number): void => {
      if (!animation.isSliding) {
        setThrottle(false);
        setAnimation({
          transition: props.animationDuration,
          isSliding: true,
        });
        setOffset(offset);
      }
    },
    [
      animation.isSliding,
      props.animationDuration,
      setAnimation,
      setOffset,
      setThrottle,
    ]
  );
  const slide = useCallback(
    (direction: Directions): void => {
      slideTo(circularOffset.rotate(direction));
    },
    [circularOffset, slideTo]
  );
  const slideRightCallback = useCallback(
    () => slide(Directions.Right),
    [slide]
  );
  const slideLeftCallback = useCallback(() => slide(Directions.Left), [slide]);

  // Use groups
  const [groups, setGroups, getCurrentGroup] = useGroups(
    props.children.length,
    props.startOffset,
    props.slidesToScroll,
    props.slidesToShow,
    props.infinite
  );
  // Get current Group
  const currentGroup = getCurrentGroup(circularOffset.offset);

  // Create dots objects from groups
  const dots = groups.map<Readonly<IDot>>(el => {
    return {
      id: el.id,
      isCurrent: currentGroup === el.id,
      onClickHandler: () => slideTo(el.offset),
    };
  });

  // Use autoplay function
  const [isPlay, setIsPlay] = useAutoplay(
    props.autoplay && !animation.isSliding && isRightEdge,
    props.autoplaySpeed,
    circularOffset.offset,
    slideRightCallback
  );

  // Watch for children changes
  useDynamicChildren(
    props.children,
    props.startOffset,
    props.slidesToShow,
    props.slidesToScroll,
    props.infinite,
    setSlides,
    setGroups
  );

  // Use progress with css transition animation
  const animProgress = useAnimProgress(
    props.autoplaySpeed * 1000,
    props.useProgress && isPlay && isRightEdge,
    circularOffset.offset,
    animation.isSliding,
    props.animationDuration * 1000
  );

  // Props to SlidesProvider
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
      {props.progressBar
        ? props.progressBar(animProgress)
        : props.useProgress && <ProgressBar animProgress={animProgress} />}

      {props.dotsProvider
        ? props.dotsProvider(dots, animProgress)
        : props.useDotsProvider && <DotsProvider dots={dots} />}

      {props.controllButtonLeft ? (
        props.controllButtonLeft(slideLeftCallback)
      ) : (
        <ControlButton type={Directions.Left} onClick={slideLeftCallback} />
      )}
      {props.controllButtonRight ? (
        props.controllButtonRight(slideRightCallback)
      ) : (
        <ControlButton type={Directions.Right} onClick={slideRightCallback} />
      )}
      {props.pauseButton
        ? props.pauseButton(isPlay, setIsPlay)
        : props.usePauseButton && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PauseButton isPlay={isPlay} setIsPlay={setIsPlay} />
            </div>
          )}
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

  dotsProvider?:
    | ((
        dots: readonly IDot[],
        animProgress?: Readonly<IAnimProgress>
      ) => ReactNode)
    | null;
  progressBar?: ((animProgress: Readonly<IAnimProgress>) => ReactNode) | null;
  pauseButton?:
    | ((isPlay: boolean, setIsPlay: (arg: boolean) => void) => ReactNode)
    | null;

  controllButtonLeft?: ((onClickHandler: () => void) => ReactNode) | null;
  controllButtonRight?: ((onClickHandler: () => void) => ReactNode) | null;
}

export interface IAnimationState {
  transition: number;
  isSliding: boolean;
}

export interface IDot {
  id: string;
  isCurrent: boolean;
  onClickHandler: () => void;
}
