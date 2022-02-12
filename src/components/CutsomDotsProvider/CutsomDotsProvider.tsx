import { IDot } from '../../Carousel/components/Carousel/CarouselDotsProvider/CarouselDotsProvider';
import { IAnimProgress } from '../../Carousel/helpers/hooks';
import CurstomDot from './CustomDot/CustomDot';
import classes from './CustomDotsProvider.module.scss';

export default function CustomDotsProvider({
  animProgress,
  dots,
}: ICustomDotsProvider) {
  return (
    <div className={classes.dotsProvider}>
      {dots.map((dot, index) => (
        <CurstomDot
          key={dot.id}
          isCurrent={dot.isCurrent}
          animProgress={animProgress}
          title={`Title ${index + 1}`}
        />
      ))}
    </div>
  );
}

interface ICustomDotsProvider {
  animProgress: Readonly<IAnimProgress>;
  dots: readonly IDot[];
}
