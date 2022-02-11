import classes from './Sidebar.module.scss';

export default function Sidebar({ items, className, isOpen }: ISidebarProps) {
  const cls = [classes.sidebar];
  if(className) cls.push(className)
  if(isOpen) cls.push(classes.open);

  return (
    <div className={cls.join(' ')}>
      {items.map((item, index) => {
        const cls = [classes.item];
        if(item.isActive) cls.push(classes.active);

        return (
          <div key={index} className={cls.join(' ')}>
            {item.text}
          </div>
        );
      })}
    </div>
  );
}

interface ISidebarProps {
  items: readonly ISidebarItem[];
  isOpen: boolean;
  className?: string;
}

export interface ISidebarItem {
  text: string;
  isActive?: boolean;
}
