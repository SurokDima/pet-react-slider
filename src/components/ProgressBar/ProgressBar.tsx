import classes from '../../styles/ProgressBar.module.scss';

//TODO Progress state may be in Carousel
export default function ProgressBar({
  progress,
  classNameContainer,
  className,
}: IProgressBarProps) {
  return (
    <div className={classNameContainer ?? classes.progressBarContainer}>
      <div
        className={className ?? classes.progressBar}
        style={{ width: `${progress * 100}%` }}
      ></div>
    </div>
  );
}


interface IProgressBarProps {
  progress: number;
  classNameContainer?: string | null;
  className?: string | null;
}
