import classes from './Button.module.scss';

export default function Button({ children, onClick, className }: IButtonProps) {
  const cls = [classes.button];
  if(className) cls.push(className)

  return <div className={cls.join(' ')} onClick={onClick}>{children}</div>;
}

interface IButtonProps {
  children: string;
  onClick?: () => void;
  className?: string;
}
