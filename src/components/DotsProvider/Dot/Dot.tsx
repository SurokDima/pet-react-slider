import { HTMLAttributes } from 'react';

import classes from '../../../styles/Dot.module.scss';

export default function Dot({
  isCurrent,
  classNameDot,
  classNameActive,
  targetOffset,
  onClickHandler,
  ...props
}: IDotProps) {
  const cls = [classNameDot ?? classes.dot];

  if (isCurrent)
    cls.push(classNameActive ?? classes.active);

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
  classNameActive?: string | null;
  classNameDot?: string | null;
}
