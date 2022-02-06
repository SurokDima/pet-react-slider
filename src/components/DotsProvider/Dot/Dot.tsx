import { HTMLAttributes } from 'react';

import classes from '../../../styles/Dot.module.scss';
//TODO FIX ALL merged classNames and styles
export default function Dot({
  isCurrent,
  className,
  targetOffset,
  onClickHandler,
  ...props
}: IDotProps) {
  const cls = [classes.dot, className];

  if (isCurrent) cls.push(classes.active);

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
}
