import { CSSProperties } from 'react';

import classes from '../../styles/Slides.module.scss';
import { ISlideObj } from '../../types/types';
import Slide from './Slide/Slide';

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
        <Slide key={slideObj.id} width={slideWidth}>
          {slideObj.slide}
        </Slide>
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
