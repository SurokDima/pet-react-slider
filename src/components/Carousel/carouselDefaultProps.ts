import { ICarouselProps } from './Carousel';

const carouselDefaultProps: Required<ICarouselProps> = {
  children: [],
  slidesToShow: 1.5,
  slidesToScroll: 1.4,
  autoplay: true,
  autoplaySpeed: 1,
  startIndex: 0,
  animationDuration: 0.5,
  infinite: 'none',
};

export default carouselDefaultProps;
