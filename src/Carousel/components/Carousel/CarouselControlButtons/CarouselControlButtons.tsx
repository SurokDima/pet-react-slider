import { Directions } from '../../../types/types';
import { ControlButtonsRenderProp } from '../Carousel';

import classes from '../../../styles/CarouselControlButtons.module.scss';
import ControlButton from '../../ControlButton/ControlButton';

export default function CarouselControlButtons({
  controlButtons,
  onClickLeft,
  onClickRight,
}: ICarouselControlButtons) {
  return controlButtons ? (
    controlButtons(onClickLeft, onClickRight)
  ) : (
    <div className={classes.controlButtonsContainer}>
      <ControlButton
        type={Directions.Left}
        onClick={onClickLeft}
        className={`${classes.controlButton} ${classes.prev}`}
      />
      <ControlButton
        type={Directions.Right}
        onClick={onClickRight}
        className={`${classes.controlButton} ${classes.next}`}
      />
    </div>
  );
}

interface ICarouselControlButtons {
  controlButtons: ControlButtonsRenderProp | null;
  onClickRight: () => void;
  onClickLeft: () => void;
}
