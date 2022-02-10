import { ReactNode } from 'react';

import { IAnimProgress } from '../../../helpers/hooks';
import ProgressBar from '../../ProgressBar/ProgressBar';

export function CarouselProgressBar({
  progressBar,
  isUsedProgress,
  animProgress,
}: ICarouselProgressBar) {
  return (
    <>
      {progressBar
        ? progressBar(animProgress)
        : isUsedProgress && <ProgressBar animProgress={animProgress} />}
    </>
  );
}

interface ICarouselProgressBar {
  progressBar: ((animProgress: Readonly<IAnimProgress>) => ReactNode) | null;
  isUsedProgress: boolean;
  animProgress: Readonly<IAnimProgress>;
}
