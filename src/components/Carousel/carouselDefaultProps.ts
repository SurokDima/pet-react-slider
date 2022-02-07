import { ICarouselProps } from './Carousel';

const carouselDefaultProps: Required<ICarouselProps> = {
  children: [],
  nextButton: { children: null },
  prevButton: { children: null },
  slidesToShow: 1.5,
  slidesToScroll: 1.5, //TODO Limit this numbers
  autoplay: true,
  autoplaySpeed: 3,
  startOffset: 0.5,
  animationDuration: 0.5,
  infinite: 'infinite',

  dotsActiveClassName: '',
  dotsClassName: '',
  dotsProviderClassName: '',

  progressBarClassName: null,
  progressBarContainerClassName: null,
  progressBarCustom: false,

  setGroup: null,
  setGroupLength: null,

  progressState: {
    progress: 0,
    setProgress: () => {},
  },
};

export default carouselDefaultProps;
