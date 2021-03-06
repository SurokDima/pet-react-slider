import { Directions, Infinite } from '../types/types';

export class CircularOffset {
  private _offset: number;

  private readonly _slidesToShow: number;
  private readonly _slidesToScroll: number;
  private _trackLength: number;
  private readonly _infinite: Infinite;

  constructor(
    offset: number,
    trackLength: number,
    slidesToShow: number,
    slidesToScroll: number,
    infinite: Infinite
  ) {
    this._slidesToShow = slidesToShow;
    this._slidesToScroll = slidesToScroll;
    this._trackLength = trackLength;
    this._infinite = infinite;

    this._offset = offset;
  }

  /**
   * Rerturns current offset
   */
  public get offset(): number {
    return this._offset;
  }

  /**
   * Sets offset
   */
  public set offset(offset: number) {
    this._offset = offset;
  }

  /**
   * Sets trackLength
   */
  public set trackLength(trackLength: number) {
    this._trackLength = trackLength;
  }

  /**
   * Returns offset after rotation in given direction
   *
   * @param direction : direction to rotate;
   * @returns new offset
   */
  public rotate = (direction: Directions): number => {
    if (this._infinite === 'loop') {
      return this._rotateLoop(direction);
    }

    return this._attemptRotate(direction);
  };

  /**
   * Returns direction if reset is needed and false otherwise
   *
   * @returns direction to reset or false
   */
  public isShouldReset = (): Directions | false => {
    const offset = this._trackLength - this._slidesToShow - this._offset;

    if (offset < this._slidesToScroll) return Directions.Right;
    else if (this._offset < this._slidesToScroll) return Directions.Left;

    return false;
  };

  /**
   * Returns offset of new cycle
   *
   * @param direction direction to rotate;
   * @returns new offset
   */
  public toNextLoopCycle = (direction: Directions): number => {
    if (direction === Directions.Right) {
      const offset = this._trackLength - this._slidesToShow - this._offset;
      return 2 * Math.ceil(this._slidesToShow) - offset - this._slidesToShow;
    } else if (direction === Directions.Left) {
      return (
        this._trackLength - 2 * Math.ceil(this._slidesToShow) + this._offset
      );
    }

    return direction;
  };

  /**
   *
   *
   * @param direction direction to rotate;
   * @returns new offset
   */
  private _rotateLoop(direction: Directions): number {
    if (this._offset === 0 && direction === Directions.Left) {
      return this._offsetRightEdge;
    }
    if (
      this._offset === this._offsetRightEdge &&
      direction === Directions.Right
    ) {
      return 0;
    }

    return this._attemptRotate(direction);
  }

  /**
   * Default rotate mechanism
   *
   * @param direction direction to rotate;
   * @returns new offset
   */
  private _attemptRotate(direction: Directions): number {
    const sign = direction === Directions.Left ? -1 : 1;
    const newOffset = this._offset + sign * this._slidesToScroll;

    if (newOffset < 0) {
      return 0;
    }
    if (newOffset > this._offsetRightEdge) {
      return this._offsetRightEdge;
    }

    return newOffset;
  }

  private get _offsetRightEdge(): number {
    return this._trackLength - this._slidesToShow;
  }
}
