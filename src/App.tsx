import Header from './components/Header/Header';
import Section from './components/Section/Section';
import Layout from './containers/Layout/Layout';
import classes from './App.module.scss';
import SectionsScrolling from './contexts/SectionsScrollingContext';

import Carousel from './Carousel/components/Carousel/Carousel';
import { IAnimProgress } from './Carousel/helpers/hooks';
import { IDot } from './Carousel/components/Carousel/CarouselDotsProvider/CarouselDotsProvider';
import CustomDotsProvider from './components/CutsomDotsProvider/CutsomDotsProvider';
import Button from './components/Button/Button';
import { nanoid } from 'nanoid';
import { useState } from 'react';

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
            <pre
              className="hljs"
              style={{
                display: 'block',
                overflowX: 'auto',
                padding: '0.5em',
                color: 'rgb(221, 221, 221)',
              }}
            >
              <span className="xml">
                <span className="hljs-tag">
                  &lt;
                  <span
                    className="hljs-name"
                    style={{ color: 'rgb(221, 136, 136)', fontWeight: 700 }}
                  >
                    Carousel
                  </span>{' '}
                  <span className="hljs-attr">useProgress</span>=
                  <span
                    className="hljs-string"
                    style={{ color: 'rgb(221, 136, 136)' }}
                  >
                    {'{'}true{'}'}
                  </span>{' '}
                  <span className="hljs-attr">useDotsProvider</span>=
                  <span
                    className="hljs-string"
                    style={{ color: 'rgb(221, 136, 136)' }}
                  >
                    {'{'}true{'}'}
                  </span>
                  &gt;
                </span>
                {'\n'}
                {'  '}//...{'\n'}
                {'  '}
                <span className="hljs-tag">
                  &lt;
                  <span
                    className="hljs-name"
                    style={{ color: 'rgb(221, 136, 136)', fontWeight: 700 }}
                  >
                    div
                  </span>{' '}
                  <span className="hljs-attr">className</span>=
                  <span
                    className="hljs-string"
                    style={{ color: 'rgb(221, 136, 136)' }}
                  >
                    {'{'}classes.carouselItem{'}'}
                  </span>
                  &gt;
                </span>
                {'\n'}
                {'    '}
                <span className="hljs-tag">
                  &lt;
                  <span
                    className="hljs-name"
                    style={{ color: 'rgb(221, 136, 136)', fontWeight: 700 }}
                  >
                    div
                  </span>{' '}
                  <span className="hljs-attr">className</span>=
                  <span
                    className="hljs-string"
                    style={{ color: 'rgb(221, 136, 136)' }}
                  >
                    {'{'}classes.carouselItemInner{'}'}
                  </span>
                  &gt;
                </span>
                1
                <span className="hljs-tag">
                  &lt;/
                  <span
                    className="hljs-name"
                    style={{ color: 'rgb(221, 136, 136)', fontWeight: 700 }}
                  >
                    div
                  </span>
                  &gt;
                </span>
                {'\n'}
                {'  '}
                <span className="hljs-tag">
                  &lt;/
                  <span
                    className="hljs-name"
                    style={{ color: 'rgb(221, 136, 136)', fontWeight: 700 }}
                  >
                    div
                  </span>
                  &gt;
                </span>
                {'\n'}
                {'  '}// ...{'\n'}
                <span className="hljs-tag">
                  &lt;/
                  <span
                    className="hljs-name"
                    style={{ color: 'rgb(221, 136, 136)', fontWeight: 700 }}
                  >
                    Carousel
                  </span>
                  &gt;
                </span>
              </span>
            </pre>

            <div className={classes.carouselContainer}>
              <Carousel>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>1</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>2</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>3</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>4</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>5</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>6</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>7</div>
                </div>
              </Carousel>
            </div>
          </Section>
          <Section title={'autoplay'} className={classes.section}>
            <p>
              autoplay specifies whether to automatically play the slides
              autoplaySpeed ​​specifies the time between slides (in seconds)
            </p>

            <div className={classes.carouselContainer}>
              <Carousel autoplay={true}>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>1</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>2</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>3</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>4</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>5</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>6</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>7</div>
                </div>
              </Carousel>
            </div>
          </Section>
          <Section title={'useProgress'} className={classes.section}>
            <p>useProgress specifies whehter to display progress bar</p>

            <div className={classes.carouselContainer}>
              <Carousel useProgress={true} autoplay={true}>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>1</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>2</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>3</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>4</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>5</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>6</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>7</div>
                </div>
              </Carousel>
            </div>
          </Section>
          <Section title={'useDotsProvider'} className={classes.section}>
            <p>useProgress specifies whehter to display progress bar</p>
            <div className={classes.carouselContainer}>
              <Carousel useDotsProvider={true}>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>1</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>2</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>3</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>4</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>5</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>6</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>7</div>
                </div>
              </Carousel>
            </div>
          </Section>
          <Section title={'usePauseButton'} className={classes.section}>
            <p>useProgress specifies whehter to display pause button</p>

            <div className={classes.carouselContainer}>
              <Carousel
                useProgress={true}
                usePauseButton={true}
                autoplay={true}
              >
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>1</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>2</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>3</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>4</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>5</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>6</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>7</div>
                </div>
              </Carousel>
            </div>
          </Section>
          <Section title={'startOffset'} className={classes.section}>
            <p>useProgress specifies default offset from left</p>

            <div className={classes.carouselContainer}>
              <Carousel useDotsProvider={true} startOffset={0.75}>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>1</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>2</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>3</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>4</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>5</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>6</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>7</div>
                </div>
              </Carousel>
            </div>
          </Section>
          <Section title={'slidesToShow'} className={classes.section}>
            <p>
              slidesToShow shows how many slides to display at the same time
            </p>
            <div className={classes.carouselContainer}>
              <Carousel useDotsProvider={true} slidesToShow={2}>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>1</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>2</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>3</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>4</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>5</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>6</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>7</div>
                </div>
              </Carousel>
            </div>
            <p>slidesToShow can even be a fractional number</p>
            <div className={classes.carouselContainer}>
              <Carousel
                useDotsProvider={true}
                slidesToShow={2.5}
                startOffset={-0.5}
              >
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>1</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>2</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>3</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>4</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>5</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>6</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>7</div>
                </div>
              </Carousel>
            </div>
          </Section>
          <Section title={'slidesToScroll'} className={classes.section}>
            <p>slidesToScroll shows how many slides to scroll</p>
            <div className={classes.carouselContainer}>
              <Carousel
                useDotsProvider={true}
                slidesToShow={3}
                slidesToScroll={2}
              >
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>1</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>2</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>3</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>4</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>5</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>6</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>7</div>
                </div>
              </Carousel>
            </div>
            <p>slidesToScroll can even be a fractional number</p>
            <div className={classes.carouselContainer}>
              <Carousel useDotsProvider={true} slidesToScroll={0.5}>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>1</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>2</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>3</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>4</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>5</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>6</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>7</div>
                </div>
              </Carousel>
            </div>
          </Section>
          <Section title={'infinite'} className={classes.section}>
            <p>infinite specifies scrolling mode</p>
            <div className={classes.carouselContainer}>
              <Carousel useDotsProvider={true} infinite={'infinite'}>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>1</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>2</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>3</div>
                </div>
              </Carousel>
            </div>
            <div className={classes.carouselContainer}>
              <Carousel useDotsProvider={true} infinite={'loop'}>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>1</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>2</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>3</div>
                </div>
              </Carousel>
            </div>
            <div className={classes.carouselContainer}>
              <Carousel
                useDotsProvider={true}
                infinite={'none'}
                startOffset={0.5}
              >
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>1</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>2</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>3</div>
                </div>
              </Carousel>
            </div>
          </Section>
          <Section title={'render props'} className={classes.section}>
            <p>Also for all controls there are corresponding render props. So you can do something like this</p>
            <div className={classes.carouselContainer}>
              <Carousel
                useDotsProvider={true}
                infinite={'infinite'}
                dotsProvider={customDotsProvider}
                autoplay={true}
              >
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>1</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>2</div>
                </div>
                <div className={classes.carouselItem}>
                  <div className={classes.carouselItemInner}>3</div>
                </div>
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
