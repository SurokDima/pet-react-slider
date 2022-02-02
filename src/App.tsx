import React, { ReactElement, ReactNode, useState } from 'react';

import Carousel from './components/Carousel/Carousel';

import classes from './styles/App.module.scss';
import { Slide } from './types/types';
import { nanoid } from 'nanoid';

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

  return (
    <div className={classes.app}>
      <Carousel>
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
    </div>
  );
}

export default App;
