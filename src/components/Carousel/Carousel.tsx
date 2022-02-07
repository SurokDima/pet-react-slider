import React, { useCallback, useEffect, useMemo, useState } from 'react';

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
  useAnimation,
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
  const [circularOffset, setLocalOffset] = useCircularOffset(
    props.startOffset,
    props.slidesToShow,
    props.slidesToScroll,
    trackLength,
    props.infinite
  );

  // Get general function for set offset
  const setExternalOffset = props.setOffset;
  const setOffset = useCallback(
    (offset: number): void => {
      setLocalOffset(offset);
      if (setExternalOffset) setExternalOffset(offset);
    },
    [setExternalOffset, setLocalOffset]
  );

  /**
   * Returns current index of current group
   *
   * @returns index of current group
   */
  const getCurrentGroup = (): number => {
    for (let i = 0; i < groups.length - 1; i++) {
      if (
        circularOffset.offset >= groups[i].offset &&
        circularOffset.offset < groups[i + 1].offset
      )
        return i;
    }

    return groups.length - 1;
  };

  // Reset current group index and groups length for external source
  const currentGroup = getCurrentGroup();
  useEffect(() => {
    props.setCurrentGroup(currentGroup);
    props.setGroupsLength(groups.length);
  }, [currentGroup, groups.length, props]); //TODO FIX groups state

  // Use animation
  const [animation, setAnimation] = useAnimation({
    transition: 0,
    isSliding: false,
  });

  // Use throttle for "fix" infinity mode
  const [throttle, setThrottle] = useState<Throttle>(false);

  // Use infinity mode
  useInfinityMode(animation.isSliding, props.infinite, throttle, circularOffset, setOffset, setThrottle);

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

  // Create progress state and create new "Memo" function for setting progress
  const [progress, setLocalProgress] = useState(0);
  const setExternalProgress = props.setProgress;
  const setProgress = useCallback(
    (progress: number): void => {
      setLocalProgress(progress);
      if (setExternalProgress) setExternalProgress(progress);
    },
    [setLocalProgress, setExternalProgress]
  );
/*   useProgress(
    isPlay && !animation.isSliding,
    props.autoplaySpeed * 1000,
    setExternalOffset !== null || !props.hideDefaultProgress,
    setProgress
  ); */

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
      {props.hideDefaultProgress ? null : (
        <ProgressBar
          classNameContainer={props.progressBarContainerClassName}
          className={props.progressBarClassName}
          progress={progress}
        />
      )}
      {props.hideDefaultDots ? null : (
        <DotsProvider
          groups={groups}
          current={currentGroup}
          onClickHandler={slideTo}
          classNameProvider={props.dotsProviderClassName}
          dotsClassName={props.dotsClassName}
          dotsActiveClassName={props.dotsActiveClassName}
        />
      )}

      <ControlButton
        type={Directions.Left}
        onClick={slideLeftCallback}
        className={props.prevButton.className}
        style={props.prevButton.style}
      >
        {props.prevButton.children}
      </ControlButton>
      <ControlButton
        type={Directions.Right}
        onClick={slideRightCallback}
        className={props.nextButton.className}
        style={props.nextButton.style}
      >
        {props.nextButton.children}
      </ControlButton>
    </div>
  );
}

function useInfinityMode(
  isSliding: boolean,
  infinite: Infinite,
  throttle: Throttle,
  circularOffset: CircularOffset,
  setOffset: (offset: number) => void,
  setThrottle: (throttle: Throttle) => void,
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

  dotsClassName?: string | null;
  dotsActiveClassName?: string | null;
  dotsProviderClassName?: string | null;
  hideDefaultDots?: boolean;

  progressBarContainerClassName?: string | null;
  progressBarClassName?: string | null;
  hideDefaultProgress?: boolean;

  offsetCustom?: boolean;

  setProgress?: (progress: number) => void;
  setCurrentGroup?: (group: number) => void;
  setGroupsLength?: (length: number) => void;
  setOffset?: (offset: number) => void;
}

export interface IAnimationState {
  transition: number;
  isSliding: boolean;
}
