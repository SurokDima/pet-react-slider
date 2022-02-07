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

  dotsActiveClassName: null,
  dotsClassName: null,
  dotsProviderClassName: null,

  progressBarClassName: null,
  progressBarContainerClassName: null,

  hideDefaultProgress: true,
  hideDefaultDots: true,

  offsetCustom: false,

  setCurrentGroup: null,
  setGroupsLength: null,
  setProgress: null,
  setOffset: null,
  setMaxOffset: null,
};

export default carouselDefaultProps;
