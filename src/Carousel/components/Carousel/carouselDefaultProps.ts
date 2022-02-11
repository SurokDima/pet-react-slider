import { ICarouselProps } from './Carousel';

const carouselDefaultProps: Required<ICarouselProps> = {
  children: [],
  slidesToShow: 1,
  slidesToScroll: 1, 
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
  controlButtons: null
};

export default carouselDefaultProps;
