import { animate } from './animate';

const pow = Math.pow;

function easeOutQuart(x: number) {
  return 1 - pow(1 - x, 4);
}

interface IAnimateScrollArguments {
  targetPosition: number;
  duration: number;
}

export function animateScroll({
  targetPosition,
  duration,
}: IAnimateScrollArguments) {
  const initialPosition = document.documentElement.scrollTop ;
  const amountPixelsToScroll =  targetPosition - initialPosition;
  
  const draw = (progress: number) => {
    document.documentElement.scrollTo({ top: initialPosition + amountPixelsToScroll * Math.min(progress, 1) });
  };

  animate({ duration, timing: easeOutQuart, draw });
}
