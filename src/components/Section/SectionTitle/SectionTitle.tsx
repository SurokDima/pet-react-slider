import classes from './SectionTitle.module.scss';

export default function SectionTitle({ children }: ISectionTitleProps) {
  return <h2 className={classes.title}>{children}</h2>;
}

interface ISectionTitleProps {
  children: string;
}
