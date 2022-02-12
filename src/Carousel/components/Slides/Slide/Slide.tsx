import { CSSProperties } from 'react';
import { Slide as SlideType } from '../../../types/types';

export default function Slide({ children, width }: ISlideProps) {
  const styles: CSSProperties =
    width === 0
      ? { opacity: 0, transition: 'opacity .5s' }
      : { minWidth: width };

  return <div style={styles}>{children}</div>;
}

interface ISlideProps {
  children: SlideType;
  width: number;
}
