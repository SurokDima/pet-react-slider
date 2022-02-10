import { Directions } from '../../../types/types';
import ControlButton from '../../ControlButton/ControlButton';
import { ControlButtonRenderProp } from '../Carousel';

export default function CarouselControlButton({controllButton, callback, type}: ICarouselControlButton) {
  return (
    <>
      {controllButton ? (
        controllButton(callback)
      ) : (
        <ControlButton type={type} onClick={callback} />
      )}
    </>
  );
}

interface ICarouselControlButton {
  controllButton: ControlButtonRenderProp | null,
  callback: () => void,
  type: Directions
}
