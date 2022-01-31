import React, { CSSProperties, ReactElement } from 'react';

import { IProps as ISlideProps } from './Slide/Slide';
import { addPropsToChildren } from '../../../helpers/Helpers';

import classes from './Slides.module.scss';

type ChildrenElement = ReactElement<ISlideProps>;
type ChildrenElements = ChildrenElement | ChildrenElement[];

export interface IProps {
  slideWidth: number;
  currentIndex: number;
  animationDuration: number;

  children?: ChildrenElements;
}

export default function Slides({
  slideWidth,
  currentIndex,
  animationDuration,
  children = [],
}: IProps) {
  const slides = addPropsToChildren<ISlideProps>(children, {
    width: slideWidth,
  });

  const styles: CSSProperties = {
    transform: `translateX(${-currentIndex * slideWidth}px)`,
    transition: `transform ${animationDuration}s`,
  };

  return (
    <div className={classes.slides} style={styles}>
      {slides}
    </div>
  );
}
