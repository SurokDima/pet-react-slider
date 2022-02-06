import { HTMLAttributes } from 'react';
import { IGroup } from '../../types/types';
import Dot from './Dot/Dot';

import classes from '../../styles/DotsProvider.module.scss';

export default function DotsProvider({
  groups,
  current,
  onClickHandler,
  ...props
}: IDotsProps) {
  return (
    <div {...props} className={classes.provider}>
      {groups.map((group, index) => (
        <Dot
          className={classes.dot}
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
}
