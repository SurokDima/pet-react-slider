import { HTMLAttributes, ReactNode } from 'react';
import { ArrowType, Directions } from '../../types/types';
import { Arrow } from '../Arrow/Arrow';

import classes from '../../styles/ControlButton.module.scss';

export default function ControlButton({
  children,
  type,
  className,
  ...props
}: IControlButtonsProps) {  
  const cls = [classes.controlButton];
  if(className) cls.push(className);

  const arrowType: ArrowType = type === Directions.Right ? 'right' : 'left';

  return (
    <div className={cls.join(' ')} {...props}>
      {children ?? <Arrow type={arrowType} className={classes.arrow} />}
    </div>
  );
}

interface IControlButtonsProps extends HTMLAttributes<HTMLDivElement> {
  type: Directions;
  onClick: () => void;

  children?: Readonly<ReactNode>;
}
