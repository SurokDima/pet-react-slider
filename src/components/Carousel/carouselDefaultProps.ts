import { ICarouselProps } from './Carousel';

const carouselDefaultProps: Required<ICarouselProps> = {
  children: [],
  slidesToShow: 1.5,
  slidesToScroll: 1.4,
  autoplay: false,
  autoplaySpeed: 1,
  startIndex: 0,
  animationDuration: 0.5,
  infinite: 'loop',
};

export default carouselDefaultProps;
