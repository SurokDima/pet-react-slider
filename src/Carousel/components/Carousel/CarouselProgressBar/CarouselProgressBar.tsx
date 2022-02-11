import { IAnimProgress } from '../../../helpers/hooks';
import ProgressBar from '../../ProgressBar/ProgressBar';
import { ProgressBarRenderProp } from '../Carousel';

export function CarouselProgressBar({
  progressBar,
  isUsedProgress,
  animProgress,
}: ICarouselProgressBarProps) {
  return progressBar ? (
    progressBar(animProgress)
  ) : isUsedProgress ? (
    <ProgressBar animProgress={animProgress} />
  ) : null;
}

interface ICarouselProgressBarProps {
  progressBar: ProgressBarRenderProp | null;
  isUsedProgress: boolean;
  animProgress: Readonly<IAnimProgress>;
}
