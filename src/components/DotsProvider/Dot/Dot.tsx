import { HTMLAttributes } from 'react';

import classes from '../../../styles/Dot.module.scss';

export default function Dot({
  isCurrent,
  className,
  classNameActive,
  targetOffset,
  onClickHandler,
  ...props
}: IDotProps) {
  const cls = [className.length === 0 ? classes.dot : className];

  if (isCurrent)
    cls.push(classNameActive.length === 0 ? classes.active : classNameActive);

  return (
    <div
      {...props}
      onClick={() => onClickHandler(targetOffset)}
      className={cls.join(' ')}
    />
  );
}

interface IDotProps extends HTMLAttributes<HTMLDivElement> {
  isCurrent: boolean;
  targetOffset: number;
  onClickHandler: (offset: number) => void;
  classNameActive: string;
  className: string;
}
