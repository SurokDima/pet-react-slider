import Carousel from './components/Carousel/Carousel';

import classes from './styles/App.module.scss';

function App() {
  return (
    <div className={classes.app}>
      <Carousel>
        <div className={classes.slide}>
          <h2 className={classes.slideContent}>1</h2>
        </div>
        <div className={classes.slide}>
          <h2 className={classes.slideContent}>2</h2>
        </div>
        <div className={classes.slide}>
          <h2 className={classes.slideContent}>3</h2>
        </div>
        <div className={classes.slide}>
          <h2 className={classes.slideContent}>4</h2>
        </div>
        <div className={classes.slide}>
          <h2 className={classes.slideContent}>5</h2>
        </div>
        <div className={classes.slide}>
          <h2 className={classes.slideContent}>6</h2>
        </div>
      </Carousel>
    </div>
  );
}

export default App;
