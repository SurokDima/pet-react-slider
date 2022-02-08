import { IAnimProgress } from '../../helpers/hooks';
import classes from '../../styles/ProgressBar.module.scss';

//TODO Progress state may be in Carousel
export default function ProgressBar({
  animProgress,
}: IProgressBarProps) {
  return (
    <div className={classes.progressBarContainer}>
      <div
        className={classes.progressBar}
        style={{ width: `${animProgress.progress * 100}%`, transition: animProgress.transition }}
      ></div>
    </div>
  );
}


interface IProgressBarProps {

  animProgress: IAnimProgress
}
