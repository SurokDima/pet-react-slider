import { CSSProperties, ReactElement, ReactNode } from 'react';

export type Slide = ReactElement;
export interface SlideObj {
  id: string;
  slide: Slide;
}

export type Infinite = 'infinite' | 'loop' | 'none';
export type Throttle = Directions | false;
export type ArrowType = 'up' | 'down' | 'right' | 'left';
export interface IControlButton {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export enum Directions {
  Left,
  Right,
}
