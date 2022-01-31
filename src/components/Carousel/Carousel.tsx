import React, {ReactNode, RefObject, useEffect, useRef, useState} from "react";

import Slides from "./Slides/Slides";
import Slide, {IProps as ISlideProps} from "./Slides/Slide/Slide";
import {filterChildren, useWidth} from "../../helpers/Helpers";

import classes from "./Carousel.module.scss";

interface IProps {
  children: ReactNode,
  elemsPerSlide: number,
}

export default function Carousel ({children, elemsPerSlide}: IProps) {
  const [width, ref] = useWidth<HTMLDivElement>(0);

  const slides = filterChildren<ISlideProps>(children, Slide);
  const slideWidth = width / elemsPerSlide;

  return (
    <div className={classes.carousel} ref={ref}>
      <div className={classes.window}>
        <Slides slideWidth={slideWidth}>
          {slides}
        </Slides>
      </div>
    </div>
  );
}

