import classes from './Tech.module.scss';

export default function Tech({ children }: ITechProps) {
  return <div className={classes.tech}>{children}</div>;
}

interface ITechProps {
  children: string;
}
