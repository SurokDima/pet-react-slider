import {ReactElement} from "react";

import classes from "./Slides.module.scss";

interface IProps {
  children: ReactElement | ReactElement[],
}

export default function Slides ({children}: IProps) {
  return (
    <div className={classes.slides}>
      {children}
    </div>
  );
}

