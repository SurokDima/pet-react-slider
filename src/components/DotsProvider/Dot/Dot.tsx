import classes from '../../../styles/Dot.module.scss';

export default function Dot({
  isCurrent,
  onClickHandler
}: IDotProps) {
  const cls = [classes.dot];

  if (isCurrent)
    cls.push(classes.active);

  return (
    <div
      onClick={onClickHandler}
      className={cls.join(' ')}
    />
  );
}

interface IDotProps {
  isCurrent: boolean;
  onClickHandler: () => void;
}
