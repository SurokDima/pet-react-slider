import PauseButton from '../../PauseButton/PauseButton';
import { PauseButtonRenderProp } from '../Carousel';

export function CarouselPauseButton({
  pauseButton,
  isPlay,
  isUsedPauseButton,
  setIsPlay,
}: ICarousePauseButtonProps) {
  return pauseButton ? (
    pauseButton(isPlay, setIsPlay)
  ) : isUsedPauseButton ? (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <PauseButton isPlay={isPlay} setIsPlay={setIsPlay} />
    </div>
  ) : null;
}

interface ICarousePauseButtonProps {
  pauseButton: PauseButtonRenderProp | null;
  isUsedPauseButton: boolean;
  isPlay: boolean;
  setIsPlay: (isPlay: boolean) => void;
}
