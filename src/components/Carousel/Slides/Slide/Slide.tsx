import {CSSProperties, ReactNode} from "react";

import classes from "./Slide.module.scss";

export interface IProps {
  children: ReactNode,
  className?: string,
  width?: number,
}

export default function Slide({children, width = 0, className = ''}: IProps)  {
  const styles: CSSProperties = {
    minWidth: width,
  }

  const cls: string[] = [className];

  return (
    <div style={styles} className={cls.join(' ')} >{children}</div>
  );
}