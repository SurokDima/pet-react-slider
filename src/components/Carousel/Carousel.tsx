import React, { useCallback, useEffect, useState } from 'react';

import SlidesProvider, {
  ISlidesProviderProps as ISlidesProps,
} from '../Slides/SlidesProvider';
import { initSlideObjects, inverseDirection } from '../../helpers/helpers';
import {
  IControlButton,
  Directions,
  Infinite,
  Slide,
  ISlideObj,
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

export default function Carousel(userProps: ICarouselProps) {
  const props: Required<ICarouselProps> = { ...defaultProps, ...userProps };

  const [width, ref] = useWidth<HTMLDivElement>(0);

  const [slides, setSlides] = useState(
    initSlideObjects(props.children, props.slidesToShow, props.infinite)
  );
  const slideWidth = width / props.slidesToShow;
  const trackLength = slides.length;

  const [groups, setGroups] = useGroups(
    props.children.length, //TODO Optimize this
    props.startOffset,
    props.slidesToScroll,
    props.slidesToShow,
    props.infinite
  );

  const [circularOffset, setOffset] = useCircularOffset(
    props.startOffset,
    props.slidesToShow,
    props.slidesToScroll,
    trackLength,
    props.infinite
  );

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

  const currentGroup = getCurrentGroup();
  useEffect(() => {
    if (props.dotsCustom) {
      props.groupsState.setCurrentGroup(currentGroup);
      props.groupsState.setGroupsLength(groups.length);
    }
  }, [currentGroup, groups.length, props.dotsCustom, props.groupsState]); //TODO FIX groups state

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

  //TODO FIX slide and slideTO
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

  const [isPlay] = useAutoplay(
    props.autoplay,
    props.autoplaySpeed,
    circularOffset.offset,
    animation.isSliding,
    slideRightCallback
  );

  useDynamicChildren(
    props.children,
    props.startOffset,
    props.slidesToShow,
    props.slidesToScroll,
    props.infinite,
    setSlides,
    setGroups
  );

  // Deafult progress logic(used if props.progressBarCustom === false)
  const [progress, setProgress] = useState(0);

  useProgress(
    isPlay && !animation.isSliding,
    props.autoplaySpeed * 1000,
    props.progressBarCustom ? props.progressState.setProgress : setProgress
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
      {props.progressBarCustom ? null : (
        <ProgressBar
          classNameContainer={props.progressBarContainerClassName}
          className={props.progressBarClassName}
          progress={progress}
        />
      )}
      {/* TODO FIX(ADD es6 import) */}
      {props.dotsCustom ? null : (
        <DotsProvider
          groups={groups}
          current={currentGroup}
          onClickHandler={slideTo}
          classNameProvider={props.dotsProviderClassName}
          dotsClassName={props.dotsClassName}
          dotsActiveClassName={props.dotsActiveClassName}
        />
      )}
      {/* TODO FIX(ADD es6 import) */}
      <ControlButton
        type={Directions.Left}
        onClick={() => slide(Directions.Left)}
        className={props.prevButton.className}
        style={props.prevButton.style}
      >
        {props.prevButton.children}
      </ControlButton>
      <ControlButton
        type={Directions.Right}
        onClick={() => slide(Directions.Right)}
        className={props.nextButton.className}
        style={props.nextButton.style}
      >
        {props.nextButton.children}
      </ControlButton>
    </div>
  );
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
  dotsCustom?: boolean;

  progressBarContainerClassName?: string | null;
  progressBarClassName?: string | null;
  progressBarCustom?: boolean;

  progressState?: IProgressState;
  groupsState?: IGroupsState;
}

export interface IAnimationState {
  transition: number;
  isSliding: boolean;
}

export interface IProgressState {
  progress: number;
  setProgress: (progress: number) => void;
}

export interface IGroupsState {
  setCurrentGroup: (group: number) => void;
  setGroupsLength: (length: number) => void;
}
