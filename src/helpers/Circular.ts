import { Slide, Directions } from '../types/types';

export class Circular {
  private readonly _slides: Slide[];
  private readonly _offset: number;
  private readonly _setOffset: (index: number) => void;

  private readonly _slidesToShow: number;
  private readonly _slidesToScroll: number;
  private readonly _trackLength: number;

  constructor(
    slides: Slide[],
    offset: number,
    setOffset: (index: number) => void,
    slidesToShow: number,
    slidesToScroll: number,
    isStarted: boolean,
    setIsStarted: (arg: boolean) => void
  ) {
    this._slidesToShow = slidesToShow;
    this._slidesToScroll = slidesToScroll;

    this._slides = this._initSlides(slides);
    this._trackLength = this._slides.length;

    this._setOffset = setOffset;
    this._offset = offset;

    if (!isStarted) {
      this._toStart();
      setIsStarted(true);
    }
  }

  public get offset(): number {
    return this._offset;
  }

  public get slides(): Slide[] {
    return this._slides;
  }

  public rotate = (direction: Directions): void => {
    if (direction === Directions.Left) {
      this._setOffset(this._offset - this._slidesToScroll);
    } else if (direction === Directions.Right) {
      this._setOffset(this._offset + this._slidesToScroll);
    }
  };

  public reset = (): void => {
    console.log(
      this._offset,
      this._slidesToScroll,
      this._trackLength -
        this._slidesToShow -
        (this._offset + this._slidesToScroll) <=
        this._slidesToScroll
    );

    if (
      this._trackLength -
        this._slidesToShow -
        this._offset -
        this._slidesToScroll <=
      this._slidesToScroll
    ) {
      this._toNextLoopCycle();
    }
  };

  public getSlides = (): Slide[] => {
    return this.slides;
  };

  public getOffset = (): number => {
    return this.offset;
  };

  public setOffset = (index: number): void => {
    this._setOffset(index);
  };

  private _toNextLoopCycle = (): void => {
    const offset =
      this._trackLength -
      this._slidesToShow -
      this._offset -
      this._slidesToScroll;

    this._setOffset(
      2 * this._roundedSlidesToShow - offset - this._slidesToShow
    );
  };

  private _toStart = (): void => {
    if (this._offset !== this._roundedSlidesToShow) {
      this._setOffset(this._roundedSlidesToShow);
    }
  };

  private _initSlides = (slides: Slide[]): Slide[] => {
    const length = this._roundedSlidesToShow;

    const firstElems = slides.slice(0, length);
    const lastElems = slides.slice(-length);

    return [...lastElems, ...slides, ...firstElems];
  };

  private get _roundedSlidesToShow(): number {
    return Math.ceil(this._slidesToShow);
  }
}
