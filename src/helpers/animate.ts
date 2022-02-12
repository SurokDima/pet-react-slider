interface IAnimateArguments {
  duration: number;
  timing: (timeFraction: number) => number;
  draw: (progress: number) => void;
}

export function animate({ duration, timing, draw }: IAnimateArguments) {
  const start = performance.now();

  requestAnimationFrame(function step(timestamp: number) {
    const timeFraction = Math.min((timestamp - start) / duration, 1);
    const progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(step);
    }
  });
}
