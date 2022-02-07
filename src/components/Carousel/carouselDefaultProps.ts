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

  dotsActiveClassName: null,
  dotsClassName: null,
  dotsProviderClassName: null,
  dotsCustom: false,

  progressBarClassName: null,
  progressBarContainerClassName: null,
  progressBarCustom: false,

  groupsState: {
    setCurrentGroup: () => {},
    setGroupsLength: () => {},
  },
  progressState: {
    progress: 0,
    setProgress: () => {},
  },
  offsetState: {
    offset: 0,
    setOffset: () => {},
  }
};

export default carouselDefaultProps;
