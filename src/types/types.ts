import { ReactElement } from 'react';

export type Slide = ReactElement;
export interface SlideObj {
  id: string;
  slide: Slide;
}

export type Infinite = 'infinite' | 'loop' | 'none';
export type Throttle = Directions | false;

export enum Directions {
  Left,
  Right,
}
