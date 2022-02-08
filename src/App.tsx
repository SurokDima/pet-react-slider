import { useState, Suspense, lazy } from 'react';
import { nanoid } from 'nanoid';

import { IDot } from './components/Carousel/Carousel';
import DotsProvider from './components/DotsProvider/DotsProvider';

import classes from './styles/App.module.scss';
import { IAnimProgress } from './helpers/hooks';
import ProgressBar from './components/ProgressBar/ProgressBar';

const Carousel = lazy(() => import('./components/Carousel/Carousel'));

interface ISlide {
  id: string;
  content: number;
}

function App() {
  const [slides, setSlides] = useState<ISlide[]>([
    { id: nanoid(), content: 1 },
    { id: nanoid(), content: 2 },
    { id: nanoid(), content: 3 },
    { id: nanoid(), content: 4 },
    { id: nanoid(), content: 5 },
    { id: nanoid(), content: 6 },
  ]);

  const loading = <h1>Loading</h1>;

  return (
    <div className={classes.app}>
      <Suspense fallback={loading}>
        <Carousel
          dotsProvider={(dots: IDot[]) => <DotsProvider dots={dots} />}
          progressBar={(animProgress: IAnimProgress) => (
            <ProgressBar animProgress={animProgress} />
          )}
          useProgress={true}
        >
          {slides.map(slide => (
            <div className={classes.slide} key={slide.id}>
              <h2 className={classes.slideContent}>{slide.content}</h2>
            </div>
          ))}
        </Carousel>

        <button
          onClick={() => {
            setSlides([
              {
                id: nanoid(),
                content: slides[0].content - 1,
              },
              ...slides,
            ]);
          }}
        >
          New Slide At Start
        </button>
        <button
          onClick={() => {
            setSlides([
              ...slides,
              {
                id: nanoid(),
                content: slides[slides.length - 1].content + 1,
              },
            ]);
          }}
        >
          New Slide At End
        </button>
      </Suspense>
    </div>
  );
}

export default App;
