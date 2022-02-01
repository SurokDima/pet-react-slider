import { ICarouselProps } from './Carousel';

const carouselDefaultProps: Required<ICarouselProps> = {
  children: [],
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4,
  startIndex: 0,
  animationDuration: 0.5,
  infinite: true,
};

export default carouselDefaultProps;
