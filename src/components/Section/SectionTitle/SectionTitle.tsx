import { useContext } from 'react';
import SectionsScrolling from '../../../contexts/SectionsScrollingContext';
import classes from './SectionTitle.module.scss';

export default function SectionTitle({ children, className }: ISectionTitleProps) {
  const {titlesClassName} = useContext(SectionsScrolling);

  const cls =[classes.title, titlesClassName];
  if(className) cls.push(className);

  return <h2 className={cls.join(' ')}>{children}</h2>;
}

interface ISectionTitleProps {
  children: string;
  className?: string;
}
