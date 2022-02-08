import { CSSProperties } from 'react';
import { IAnimProgress } from '../../helpers/hooks';
import classes from '../../styles/ProgressBar.module.scss';


export default function ProgressBar({
  animProgress,
}: IProgressBarProps) {
  const styles: CSSProperties = {
    width: `${animProgress.progress * 100}%`,
    transition: `width ${animProgress.transition}ms` 
  }

  if(animProgress.state === 'increasing') styles.transition += ' linear';

  return (
    <div className={classes.progressBarContainer}>
      <div
        className={classes.progressBar}
        style={styles}
      ></div>
    </div>
  );
}


interface IProgressBarProps {
  animProgress: IAnimProgress
}
