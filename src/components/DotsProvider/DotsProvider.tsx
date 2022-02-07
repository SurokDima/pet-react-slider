import { HTMLAttributes } from 'react';
import { IGroup } from '../../types/types';
import Dot from './Dot/Dot';

import classes from '../../styles/DotsProvider.module.scss';

export default function DotsProvider({
  groups,
  current,
  onClickHandler,
  classNameProvider,
  dotsClassName,
  dotsActiveClassName,
  ...props
}: IDotsProps) {
  return (
    <div
      {...props}
      className={classNameProvider ?? classes.provider}
    >
      {groups.map((group, index) => (
        <Dot
          classNameDot={dotsClassName}
          classNameActive={dotsActiveClassName}
          targetOffset={group.offset}
          isCurrent={current === index}
          onClickHandler={onClickHandler}
          key={group.id}
        />
      ))}
    </div>
  );
}

interface IDotsProps extends HTMLAttributes<HTMLDivElement> {
  groups: IGroup[];
  current: number;
  onClickHandler: (offset: number) => void;
  dotsClassName?: string | null;
  dotsActiveClassName?: string | null;
  classNameProvider?: string | null;
}
