interface IAnimateArguments {
  duration: number;
  timing: (timeFraction: number) => number;
  draw: (progress: number) => void;
}

/**
 * Function to create custom animation
 *
 * @param duration duration of animation
 * @param timing timing function
 * @param draw function to draw result, takes progress
 */
export function animate({ duration, timing, draw }: IAnimateArguments): void {
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
