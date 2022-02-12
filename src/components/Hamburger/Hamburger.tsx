import classes from './Hamburger.module.scss';

export default function Hamburger({
  isSidebarOpen,
  onClick,
  className,
}: IHamburgerProps) {
  const xmarkCls = ['fa-solid fa-xmark'];
  const barsCls = ['fa-solid fa-bars'];
  if (isSidebarOpen) xmarkCls.push(classes.active);
  else barsCls.push(classes.active);

  return (
    <div className={className} onClick={onClick}>
      <div className={classes.hamburger}>
        <i className={xmarkCls.join(' ')} />
        <i className={barsCls.join(' ')} />
        <i className={'fa-solid fa-bars ' + classes.stub} /> {/* Stub */}
      </div>
    </div>
  );
}

interface IHamburgerProps {
  isSidebarOpen: boolean;
  onClick: () => void;
  className?: string;
}
