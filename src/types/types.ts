import { CSSProperties, ReactElement, ReactNode } from 'react';

export type Slide = ReactElement;
export interface ISlideObj {
  id: string;
  slide: Slide;
}

export type Infinite = 'infinite' | 'loop' | 'none';
export type Throttle = Directions | false;
export type ArrowType = 'up' | 'down' | 'right' | 'left';

export interface IGroup {
  id: string;
  offset: number;
}

export interface IControlButton {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export enum Directions {
  Left,
  Right,
}
