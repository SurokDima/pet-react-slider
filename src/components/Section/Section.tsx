import { ReactNode, useContext } from 'react';
import SectionsScrolling from '../../contexts/SectionsScrollingContext';
import classes from './Section.module.scss';
import SectionTitle from './SectionTitle/SectionTitle';

export default function Section({ children, title, className }: ISectionProps) {
  const {sectionsClassName} = useContext(SectionsScrolling);

  const cls = [classes.section, sectionsClassName];
  if(className) cls.push(className);

  return (
    <section className={cls.join(' ')}>
      {title && <SectionTitle>{title}</SectionTitle>}
      <div className={classes.sectionBody}>{children}</div>
    </section>
  );
}

interface ISectionProps {
  children: ReactNode;

  className?: string;
  title?: string;
}
