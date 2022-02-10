import { ICarouselProps } from './Carousel';

const carouselDefaultProps: Required<ICarouselProps> = {
  children: [],
  slidesToShow: 3,
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
  controllButtonLeft: null,
  controllButtonRight: null,
};

export default carouselDefaultProps;
