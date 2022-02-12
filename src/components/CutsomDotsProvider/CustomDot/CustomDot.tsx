import { CSSProperties } from 'react';
import { IAnimProgress } from '../../../Carousel/helpers/hooks';
import classes from './CustomDot.module.scss';

export default function CurstomDot({
  isCurrent,
  animProgress,
  title,
}: ICustomDotProps) {
  const styles: CSSProperties = {
    width: `${animProgress.progress * 100}%`,
    transition: `width ${animProgress.transition}ms`,
  };

  if (animProgress.state === 'increasing') styles.transition += ' linear';

  const cls = [classes.dotContainer];
  if(isCurrent) cls.push(classes.active);

  return (
    <div className={cls.join(' ')}>
      <div
        className={classes.dotProgress}
        style={isCurrent ? styles : { width: 0 }}
      />
      <div className={classes.dotTitle}>
        {title}
      </div>
    </div>
  );
}

interface ICustomDotProps {
  isCurrent: boolean;
  animProgress: Readonly<IAnimProgress>;
  title: string;
}
