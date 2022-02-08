import React, { CSSProperties } from 'react';

import classes from '../../styles/Slides.module.scss';
import { ISlideObj } from '../../types/types';

export default function SlidesProvider({
  transform,
  transition,
  slideWidth,
  children = [],
}: ISlidesProviderProps) {
  const styles: CSSProperties = {
    transform: `translateX(${-transform}px)`,
    transition: `transform ${transition}s`,
  };

  return (
    <div className={classes.slides} style={styles}>
      {children.map(slideObj => (
        <div style={{ minWidth: slideWidth }} key={slideObj.id}>
          {slideObj.slide}
        </div>
      ))}
    </div>
  );
}

export interface ISlidesProviderProps {
  transform: number;
  transition: number;
  slideWidth: number;

  children?: readonly ISlideObj[];
}
