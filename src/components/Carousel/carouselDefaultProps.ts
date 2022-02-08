import { ICarouselProps } from './Carousel';

const carouselDefaultProps: Required<ICarouselProps> = {
  children: [],
  slidesToShow: 2,
  slidesToScroll: 1, 
  autoplay: true,
  autoplaySpeed: 3,
  startOffset: 0,
  animationDuration: 0.5,
  infinite: 'none',

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
