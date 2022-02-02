import { ICarouselProps } from './Carousel';
import { Arrow } from '../Arrow/Arrow';

const carouselDefaultProps: Required<ICarouselProps> = {
  children: [],
  nextButton: { children: null },
  prevButton: { children: null },
  slidesToShow: 1.5,
  slidesToScroll: 1.4,
  autoplay: false,
  autoplaySpeed: 1,
  startIndex: 0,
  animationDuration: 0.5,
  infinite: 'loop',
};

export default carouselDefaultProps;
