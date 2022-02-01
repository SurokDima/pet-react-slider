import React, { CSSProperties, ReactElement } from 'react';

import classes from '../../styles/Slides.module.scss';
import { nanoid } from 'nanoid';

export default function SlidesProvider({
  slideWidth,
  currentIndex,
  animationDuration,
  isAnimate,
  children = [],
}: ISlidesProviderProps) {
  const styles: CSSProperties = {
    transform: `translateX(${-currentIndex * slideWidth}px)`,
    transition: isAnimate ? `transform ${animationDuration}s` : '',
  };

  return (
    <div className={classes.slides} style={styles}>
      {children.map(slide => (
        //TODO Fix it
        <div style={{ minWidth: slideWidth }} key={nanoid()}>
          {slide}
        </div>
      ))}
    </div>
  );
}

export interface ISlidesProviderProps {
  slideWidth: number;
  currentIndex: number;
  animationDuration: number;
  isAnimate: boolean;

  children?: ReactElement[];
}
