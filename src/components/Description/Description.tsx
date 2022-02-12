import classes from './Description.module.scss';

export default function Description({ children }: IDescriptionProps) {
  return <div className={classes.description}>{children}</div>;
}

interface IDescriptionProps {
  children: string;
}