import { ICarouselProps } from './Carousel';

const carouselDefaultProps: Required<ICarouselProps> = {
  children: [],
  slidesToShow: 1,
  slidesToScroll: 1, 
  autoplay: false,
  autoplaySpeed: 3,
  startOffset: 0,
  animationDuration: 0.5,
  infinite: 'infinite',

  useProgress: false,
  useDotsProvider: false,
  usePauseButton: false,

  dotsProvider: null,
  progressBar: null,
  pauseButton: null,
  controlButtons: null
};

export default carouselDefaultProps;
