import Carousel from './components/Carousel/Carousel';

import Slide from './components/Carousel/Slides/Slide/Slide';

import classes from './App.module.scss';

function App() {
  return (
    <div className={classes.app}>
      <Carousel>
        <Slide className={classes.slide}>
          <h2 className={classes.slideContent}>1</h2>
        </Slide>
        <Slide className={classes.slide}>
          <h2 className={classes.slideContent}>2</h2>
        </Slide>
        <Slide className={classes.slide}>
          <h2 className={classes.slideContent}>3</h2>
        </Slide>
        <Slide className={classes.slide}>
          <h2 className={classes.slideContent}>4</h2>
        </Slide>
        <Slide className={classes.slide}>
          <h2 className={classes.slideContent}>5</h2>
        </Slide>
        <Slide className={classes.slide}>
          <h2 className={classes.slideContent}>6</h2>
        </Slide>
      </Carousel>
    </div>
  );
}

export default App;
