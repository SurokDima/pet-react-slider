import { nanoid } from 'nanoid';
import { ReactElement, useState } from 'react';

import Header from './components/Header/Header';
import Section from './components/Section/Section';
import Layout from './containers/Layout/Layout';
import Carousel from './Carousel/components/Carousel/Carousel';
import { IAnimProgress } from './Carousel/helpers/hooks';
import { IDot } from './Carousel/components/Carousel/CarouselDotsProvider/CarouselDotsProvider';
import CustomDotsProvider from './components/CutsomDotsProvider/CutsomDotsProvider';
import Button from './components/Button/Button';

import SectionsScrolling from './contexts/SectionsScrollingContext';

import classes from './App.module.scss';
import Code from './components/Code/Code';

/**
 * Creates and returns array of elements
 *
 * @param count number of slides to generate
 * @returns returns array of elements
 */
function generateSlides(count: number): ReactElement[] {
  const slides = Array(count).fill(null);
  return slides.map((el, index) => (
    <div className={classes.carouselItem} key={index}>
      <div className={classes.carouselItemInner}>{index + 1}</div>
    </div>
  ));
}

function App() {
  const customDotsProvider = (
    dots: readonly IDot[],
    animProgress: Readonly<IAnimProgress>
  ) => <CustomDotsProvider animProgress={animProgress} dots={dots} />;

  const [slides, setSlides] = useState([
    { title: 1, id: nanoid() },
    { title: 2, id: nanoid() },
    { title: 3, id: nanoid() },
    { title: 4, id: nanoid() },
    { title: 5, id: nanoid() },
    { title: 6, id: nanoid() },
  ]);

  const unshiftSlide = () => {
    setSlides([
      {
        id: nanoid(),
        title: slides[0].title - 1,
      },
      ...slides,
    ]);
  };

  const pushSlide = () => {
    setSlides([
      ...slides,
      {
        id: nanoid(),
        title: slides[slides.length - 1].title + 1,
      },
    ]);
  };

  return (
    <>
      <SectionsScrolling.Provider
        value={{
          sectionsClassName: 'js-section',
          titlesClassName: 'js-section-title',
        }}
      >
        <Layout>
          <Header
            title={'My educational project Carousel'}
            stack={['HTML', 'SCSS', 'TypeScript', 'React.js']}
            description={
              'The goal of the project was to master the basic skills of working with React.js + TypeScript, as well as understand how sliders work and learn how to create a slider on React.js. As a result, I made a simple slider in the form of a <Carousel> component and below are the possible settings for this component'
            }
          />

          <Section title={'Default config'} className={classes.section}>
            <p>The initial state of the slider looks like this</p>
            <Code />

            <div className={classes.carouselContainer}>
              <Carousel>{generateSlides(7)}</Carousel>
            </div>
          </Section>
          <Section title={'autoplay'} className={classes.section}>
            <p>
              autoplay specifies whether to automatically play the slides
              autoplaySpeed ​​specifies the time between slides (in seconds)
            </p>
            <Code>{[{ name: 'autoplay', value: 'true' }]}</Code>
            <div className={classes.carouselContainer}>
              <Carousel autoplay={true}>{generateSlides(7)}</Carousel>
            </div>
          </Section>
          <Section title={'useProgress'} className={classes.section}>
            <p>useProgress specifies whehter to display progress bar</p>
            <Code>
              {[
                { name: 'autoplay', value: 'true' },
                { name: 'useProgress', value: 'true' },
              ]}
            </Code>
            <div className={classes.carouselContainer}>
              <Carousel useProgress={true} autoplay={true}>
                {generateSlides(7)}
              </Carousel>
            </div>
          </Section>
          <Section title={'useDotsProvider'} className={classes.section}>
            <p>useProgress specifies whehter to display progress bar</p>
            <Code>
              {[
                { name: 'useDotsProvider', value: 'true' },
              ]}
            </Code>
            <div className={classes.carouselContainer}>
              <Carousel useDotsProvider={true}>{generateSlides(7)}</Carousel>
            </div>
          </Section>
          <Section title={'usePauseButton'} className={classes.section}>
            <p>useProgress specifies whehter to display pause button</p>
            <Code>
              {[
                { name: 'usePauseButton', value: 'true' },
              ]}
            </Code>
            <div className={classes.carouselContainer}>
              <Carousel
                useProgress={true}
                usePauseButton={true}
                autoplay={true}
              >
                {generateSlides(7)}
              </Carousel>
            </div>
          </Section>
          <Section title={'startOffset'} className={classes.section}>
            <p>useProgress specifies default offset from left</p>
            <Code>
              {[
                { name: 'useDotsProvider', value: 'true' },
                { name: 'startOffset', value: '0.75' },
              ]}
            </Code>
            <div className={classes.carouselContainer}>
              <Carousel useDotsProvider={true} startOffset={0.75}>
                {generateSlides(7)}
              </Carousel>
            </div>
          </Section>
          <Section title={'slidesToShow'} className={classes.section}>
            <p>
              slidesToShow shows how many slides to display at the same time
            </p>
            <Code>
              {[
                { name: 'useDotsProvider', value: 'true' },
                { name: 'slidesToShow', value: '2' },
              ]}
            </Code>
            <div className={classes.carouselContainer}>
              <Carousel useDotsProvider={true} slidesToShow={2}>
                {generateSlides(7)}
              </Carousel>
            </div>
            <p>slidesToShow can even be a fractional number</p>
            <Code>
              {[
                { name: 'useDotsProvider', value: 'true' },
                { name: 'slidesToShow', value: '2.5' },
              ]}
            </Code>
            <div className={classes.carouselContainer}>
              <Carousel useDotsProvider={true} slidesToShow={2.5}>
                {generateSlides(7)}
              </Carousel>
            </div>
          </Section>
          <Section title={'slidesToScroll'} className={classes.section}>
            <p>slidesToScroll shows how many slides to scroll</p>
            <Code>
              {[
                { name: 'useDotsProvider', value: 'true' },
                { name: 'slidesToShow', value: '3' },
                { name: 'slidesToScroll', value: '2' },
              ]}
            </Code>
            <div className={classes.carouselContainer}>
              <Carousel
                useDotsProvider={true}
                slidesToShow={3}
                slidesToScroll={2}
              >
                {generateSlides(7)}
              </Carousel>
            </div>
            <p>slidesToScroll can even be a fractional number</p>
            <Code>
              {[
                { name: 'useDotsProvider', value: 'true' },
                { name: 'slidesToScroll', value: '0.5' },
              ]}
            </Code>
            <div className={classes.carouselContainer}>
              <Carousel useDotsProvider={true} slidesToScroll={0.5}>
                {generateSlides(7)}
              </Carousel>
            </div>
          </Section>
          <Section title={'infinite'} className={classes.section}>
            <p>infinite specifies scrolling mode</p>
            <Code>
              {[
                { name: 'useDotsProvider', value: 'true' },
                { name: 'infinite', value: "'infinite'" },
              ]}
            </Code>
            <div className={classes.carouselContainer}>
              <Carousel useDotsProvider={true} infinite={'infinite'}>
                {generateSlides(3)}
              </Carousel>
            </div>
            <Code>
              {[
                { name: 'useDotsProvider', value: 'true' },
                { name: 'infinite', value: "'loop'" },
              ]}
            </Code>
            <div className={classes.carouselContainer}>
              <Carousel useDotsProvider={true} infinite={'loop'}>
                {generateSlides(3)}
              </Carousel>
            </div>
            <Code>
              {[
                { name: 'useDotsProvider', value: 'true' },
                { name: 'infinite', value: "'none'" },
              ]}
            </Code>
            <div className={classes.carouselContainer}>
              <Carousel
                useDotsProvider={true}
                infinite={'none'}
                startOffset={0.5}
              >
                {generateSlides(3)}
              </Carousel>
            </div>
          </Section>
          <Section title={'render props'} className={classes.section}>
            <p>
              Also for all controls there are corresponding render props. So you
              can do something like this
            </p>
            <Code>
              {[
                { name: 'useDotsProvider', value: 'true' },
                { name: 'infinite', value: "'infinite'" },
                { name: 'dotsProvider', value: 'customDotsProvider' },
                { name: 'autplay', value: 'true' },
              ]}
            </Code>
            <div className={classes.carouselContainer}>
              <Carousel
                useDotsProvider={true}
                infinite={'infinite'}
                dotsProvider={customDotsProvider}
                autoplay={true}
              >
                {generateSlides(3)}
              </Carousel>
            </div>
          </Section>
          <Section title={'dynamic children'} className={classes.section}>
            <p>You can add and remove elements while the slider is running</p>
            <div className={classes.carouselContainer}>
              <Carousel useDotsProvider={true} infinite={'infinite'}>
                {slides.map(slide => (
                  <div className={classes.carouselItem} key={slide.id}>
                    <div className={classes.carouselItemInner}>
                      {slide.title}
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
            <div className={classes.buttonsContainer}>
              <Button onClick={unshiftSlide} className={classes.leftButton}>
                Add Slide at start
              </Button>
              <Button onClick={pushSlide}>Add Slide at end</Button>
            </div>
          </Section>
        </Layout>
      </SectionsScrolling.Provider>
    </>
  );
}

export default App;
