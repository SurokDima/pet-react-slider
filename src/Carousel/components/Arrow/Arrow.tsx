import { ArrowType } from '../../types/types';
import { HTMLAttributes } from 'react';

export function Arrow({ type, className, ...props }: IArrowProps) {
  const cls = ['fas', `fa-chevron-${type}`, className];

  return <i className={cls.join(' ')} {...props} />;
}

interface IArrowProps extends HTMLAttributes<HTMLElement> {
  type: ArrowType;
}
