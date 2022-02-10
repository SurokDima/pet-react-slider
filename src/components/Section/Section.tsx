import { ReactNode } from 'react';
import classes from './Section.module.scss';
import SectionTitle from './SectionTitle/SectionTitle';

export default function Section({ children, title }: ISectionProps) {
  return (
    <div className={classes.section}>
      {title && <SectionTitle>{title}</SectionTitle>}
      <div className={classes.sectionBody}>{children}</div>
    </div>
  );
}

interface ISectionProps {
  children: ReactNode;
  title?: string;
}
