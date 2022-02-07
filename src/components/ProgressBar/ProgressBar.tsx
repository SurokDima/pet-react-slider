import { useEffect, useState } from 'react';
import classes from '../../styles/ProgressBar.module.scss';

//TODO Progress state may be in Carousel
export default function ProgressBar({
  anim,
  time,
  setExternalProgress,
  classNameContainer,
  className,
  isCustom,
}: IProgressBarProps) {
  const progress = useProgress(anim, time, setExternalProgress ?? undefined);

  return !isCustom ? (
    <div className={classNameContainer ?? classes.progressBarContainer}>
      <div
        className={className ?? classes.progressBar}
        style={{ width: `${progress * 100}%` }}
      ></div>
    </div>
  ) : null;
}

function useProgress(
  anim: boolean,
  time: number,
  setExternalProgress?: (progress: number) => void
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (anim) {
      let start = 0;
      let reqId = 0;

      const step = (timestamp: number) => {
        start = start === 0 ? timestamp : start;
        const progress = (timestamp - start) / time;
        setProgress(progress);
        if (setExternalProgress) setExternalProgress(progress);

        if (progress < 1) {
          reqId = requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
      return () => cancelAnimationFrame(reqId);
    }
  }, [anim, time, setExternalProgress]);

  return progress;
}

interface IProgressBarProps {
  anim: boolean;
  time: number;
  classNameContainer?: string | null;
  className?: string | null;
  isCustom: boolean;

  setExternalProgress: ((progress: number) => void) | null;
}
