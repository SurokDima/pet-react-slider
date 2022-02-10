import Carousel from './Carousel/components/Carousel/Carousel';
import Code from './components/Code/Code';
import Header from './components/Header/Header';
import Section from './components/Section/Section';
import Title from './components/Title/Title';
import Layout from './containers/Layout/Layout';
import classes from './App.module.scss';

function App() {
  return (
    <>
      <Layout>
        <Header
          title={'My Carousel pet project'}
          stack={['HTML', 'JS', 'CSS']}
          description={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          }
        />

        <Section title={'My title'}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius
            massa sit amet scelerisque dignissim. Vivamus fermentum tellus vitae
            sapien imperdiet, scelerisque tempus est ullamcorper. Quisque turpis
            turpis, pellentesque sit amet libero sed, accumsan varius ipsum.
            Nunc dictum turpis eu sapien auctor lobortis. In vehicula diam sit
            amet ipsum molestie condimentum. Cras consectetur turpis vel luctus
            hendrerit. Vivamus lacinia lacinia pharetra. Sed porta turpis non ex
            semper, ut rhoncus lectus efficitur. Vivamus dictum fermentum ante,
            non volutpat nisl laoreet eu. Quisque ac vehicula erat. Quisque
            elementum, mauris vitae ornare cursus, ipsum lorem aliquet lorem, id
            dignissim sapien nisi at tortor.
          </p>
          <Code>
            {`
<Carousel>
  //...
  <div className={classes.carouselItem}>
    <div className={classes.carouselItemInner}>4</div>
  </div>
  //...
</Carousel>`}
          </Code>
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
      </Layout>
    </>
  );
}

export default App;
