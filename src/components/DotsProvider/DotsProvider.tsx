import Dot from './Dot/Dot';

import classes from '../../styles/DotsProvider.module.scss';
import { IDot } from '../Carousel/CarouselDotsProvider/CarouselDotsProvider';

export default function DotsProvider({
  dots
}: IDotsProps) {
  return (
    <div
      className={classes.provider}
    >
      {dots.map(dot => (
        <Dot
          isCurrent={dot.isCurrent}
          onClickHandler={dot.onClickHandler}
          key={dot.id}
        />
      ))}
    </div>
  );
}

interface IDotsProps {
  dots: readonly IDot[]
}
