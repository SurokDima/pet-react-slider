import classes from './Title.module.scss';

export default function Title({ children, level = 1 }: ITitleProps) {
  const TitleTag: 'h1' | 'h2' | 'h3' | 'h4' = `h${level}`;

  return <TitleTag className={classes.title} >{children}</TitleTag>;
}

interface ITitleProps {
  children: string;
  level?: 1 | 2 | 3 | 4;
}
