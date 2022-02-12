import { IAnimProgress } from '../../../helpers/hooks';
import { IGroup } from '../../../types/types';
import DotsProvider from '../../DotsProvider/DotsProvider';
import { DotsProviderRenderProp } from '../Carousel';

export default function CarouselDotsProvider({
  groups,
  dotsProvider,
  isUsedDotsProvider,
  currentGroup,
  animProgress,
  slideTo,
}: ICarouselDotsProvider) {
  // Create dots objects from groups
  const dots = groups.map<Readonly<IDot>>(el => {
    return {
      id: el.id,
      isCurrent: currentGroup === el.id,
      onClickHandler: () => slideTo(el.offset),
    };
  });  
  
  return dotsProvider ? (
    dotsProvider(dots, animProgress)
  ) : isUsedDotsProvider ? (
    <DotsProvider dots={dots} />
  ) : null;
}

export interface ICarouselDotsProvider {
  groups: readonly IGroup[];
  isUsedDotsProvider: boolean;
  currentGroup: string;
  animProgress: Readonly<IAnimProgress>;
  slideTo: (offset: number) => void;
  dotsProvider: DotsProviderRenderProp | null;
}

export interface IDot {
  id: string;
  isCurrent: boolean;
  onClickHandler: () => void;
}
