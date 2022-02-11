import { ReactNode } from 'react';
import classes from './Section.module.scss';
import SectionTitle from './SectionTitle/SectionTitle';

export default function Section({ children, title, className }: ISectionProps) {
  const cls = [classes.section];
  if(className) cls.push(className);

  return (
    <div className={cls.join(' ')}>
      {title && <SectionTitle>{title}</SectionTitle>}
      <div className={classes.sectionBody}>{children}</div>
    </div>
  );
}

interface ISectionProps {
  children: ReactNode;

  className?: string;
  title?: string;
}
