import React, {ReactElement, ReactNode} from "react";

import Slides from "./Slides/Slides";
import Slide, {IProps as ISlideProps} from "./Slides/Slide/Slide";

import classes from "./Carousel.module.scss";

interface IProps {
  children: ReactNode,
}

export default function Carousel ({children}: IProps) {
  const slides = filterChildren(children);

  return (
    <div className={classes.carousel}>
      <Slides>
        {slides}
      </Slides>
    </div>
  );
}

function filterChildren(children: ReactNode) {
  return React.Children.map<ReactElement<ISlideProps> | null, ReactNode>(children, (child) => {
    if (React.isValidElement<ISlideProps>(child) && child.type === Slide) {
      return child;
    }
    return null;
  }) ?? [];
}