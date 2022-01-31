import React, {ReactElement} from "react";

import {IProps as ISlideProps} from "./Slide/Slide";
import {addPropsToChildren} from "../../../helpers/Helpers";

import classes from "./Slides.module.scss";

type ChildrenElement = ReactElement<ISlideProps>
type ChildrenElements = ChildrenElement | ChildrenElement[];

interface IProps {
  children: ChildrenElements,
  slideWidth: number
}

export default function Slides ({children, slideWidth}: IProps) {
  const slides = addPropsToChildren<ISlideProps>(children, {width: slideWidth});

  return (
    <div className={classes.slides}>
      {slides}
    </div>
  );
}




