import { ICarouselProps } from './Carousel';

const carouselDefaultProps: Required<ICarouselProps> = {
  children: [],
  nextButton: { children: null },
  prevButton: { children: null },
  slidesToShow: 1,
  slidesToScroll: 1, //TODO Limit this numbers
  autoplay: true,
  autoplaySpeed: 3,
  startOffset: 0,
  animationDuration: 0.5,
  infinite: 'infinite',

  useProgress: false,
  useDotsProvider: false,
  usePauseButton: true,

  dotsProvider: null,
  progressBar: null,
  pauseButton: null,
  controllButtonLeft: null,
  controllButtonRight: null,
};

export default carouselDefaultProps;
