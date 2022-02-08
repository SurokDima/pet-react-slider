import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import SlidesProvider, {
  ISlidesProviderProps as ISlidesProps,
} from '../Slides/SlidesProvider';
import { initSlideObjects, inverseDirection } from '../../helpers/helpers';
import {
  IControlButton,
  Directions,
  Infinite,
  Slide,
  Throttle,
} from '../../types/types';
import defaultProps from './carouselDefaultProps';
import useProgress, {
  IAnimProgress,
  useAnimation,
  useAnimProgress,
  useAutoplay,
  useCircularOffset,
  useDynamicChildren,
  useGroups,
  useWidth,
} from '../../helpers/hooks';
import ControlButton from '../ControlButton/ControlButton';
import DotsProvider from '../DotsProvider/DotsProvider';

import classes from '../../styles/Carousel.module.scss';
import ProgressBar from '../ProgressBar/ProgressBar';
import { CircularOffset } from '../../helpers/CircularOffset';

export default function Carousel(userProps: ICarouselProps) {
  // Merge props
  const props: Required<ICarouselProps> = useMemo(
    () => ({ ...defaultProps, ...userProps }),
    [userProps]
  );

  // Use width of root element
  const [width, ref] = useWidth<HTMLDivElement>(0);

  // Use slides and calc their length and count
  const [slides, setSlides] = useState(
    initSlideObjects(props.children, props.slidesToShow, props.infinite)
  );
  const slideWidth = width / props.slidesToShow;
  const trackLength = slides.length;

  // Use groups
  const [groups, setGroups] = useGroups(
    props.children.length,
    props.startOffset,
    props.slidesToScroll,
    props.slidesToShow,
    props.infinite
  );

  // Use offest controlled by CircularOffset class
  const [circularOffset, setOffset] = useCircularOffset(
    props.startOffset,
    props.slidesToShow,
    props.slidesToScroll,
    trackLength,
    props.infinite
  );

  /**
   * Returns current index of current group
   *
   * @returns id of current group
   */
  const getCurrentGroup = (): string => {
    for (let i = 0; i < groups.length - 1; i++) {
      if (
        circularOffset.offset >= groups[i].offset &&
        circularOffset.offset < groups[i + 1].offset
      )
        return groups[i].id;
    }

    return groups[groups.length - 1].id;
  };

  // Get current Group
  const currentGroup = getCurrentGroup();

  // Use animation
  const [animation, setAnimation] = useAnimation({
    transition: 0,
    isSliding: false,
  });

  // Use throttle for "fix" infinity mode
  const [throttle, setThrottle] = useState<Throttle>(false);

  // Use infinity mode
  useInfinityMode(
    animation.isSliding,
    props.infinite,
    throttle,
    circularOffset,
    setOffset,
    setThrottle
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
    [animation.isSliding, props.animationDuration, setAnimation, setOffset]
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

  // Use autoplay function
  const [isPlay] = useAutoplay(
    props.autoplay,
    props.autoplaySpeed,
    circularOffset.offset,
    animation.isSliding,
    slideRightCallback
  );

  // Watch for children chagnes
  useDynamicChildren(
    props.children,
    props.startOffset,
    props.slidesToShow,
    props.slidesToScroll,
    props.infinite,
    setSlides,
    setGroups
  );

  const animProgress = useAnimProgress(
    props.autoplaySpeed * 1000,
    props.useProgress,
    circularOffset.offset,
    animation.isSliding
  );

  const slidesProps: ISlidesProps = {
    slideWidth,
    transition: animation.transition,
    transform: circularOffset.offset * slideWidth,
  };

  const dots = groups.map<IDot>(el => {
    return {
      id: el.id,
      isCurrent: currentGroup === el.id,
      onClickHandler: () => slideTo(el.offset),
    };
  });

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
        <ControlButton
          type={Directions.Left}
          onClick={slideLeftCallback}
          className={props.prevButton.className}
          style={props.prevButton.style}
        >
          {props.prevButton.children}
        </ControlButton>
      )}
      {props.controllButtonRight ? (
        props.controllButtonRight(slideRightCallback)
      ) : (
        <ControlButton
          type={Directions.Right}
          onClick={slideRightCallback}
          className={props.nextButton.className}
          style={props.nextButton.style}
        >
          {props.nextButton.children}
        </ControlButton>
      )}
    </div>
  );
}

function useInfinityMode(
  isSliding: boolean,
  infinite: Infinite,
  throttle: Throttle,
  circularOffset: CircularOffset,
  setOffset: (offset: number) => void,
  setThrottle: (throttle: Throttle) => void
) {
  useEffect(() => {
    if (!isSliding && infinite === 'infinite') {
      const isShouldReset = circularOffset.isShouldReset();
      if (isShouldReset !== false && isShouldReset !== throttle) {
        setOffset(circularOffset.toNextLoopCycle(isShouldReset));
        setThrottle(inverseDirection(isShouldReset));
      }
    }
  }, [
    circularOffset,
    circularOffset.offset,
    infinite,
    isSliding,
    setOffset,
    setThrottle,
    throttle,
  ]);
}

export interface ICarouselProps {
  children: Slide[];

  prevButton?: IControlButton;
  nextButton?: IControlButton;

  infinite?: Infinite;
  slidesToShow?: number;
  slidesToScroll?: number;

  animationDuration?: number;

  autoplay?: boolean;
  autoplaySpeed?: number;

  startOffset?: number;

  useProgress?: boolean;
  useDotsProvider?: boolean;

  dotsProvider?: ((dots: IDot[], animProgress?: IAnimProgress) => ReactNode) | null;
  progressBar?: ((animProgress: IAnimProgress) => ReactNode) | null;

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
