import { ReactElement } from 'react';

export type Slide = ReactElement;
export type Slides = Slide | Slide[];

export enum Directions {
  Left,
  Right,
}
