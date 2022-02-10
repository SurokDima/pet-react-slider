import classes from './Sidebar.module.scss';

export default function Sidebar({ items }: ISidebarProps) {
  return (
    <div className={classes.sidebar}>
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
}

export interface ISidebarItem {
  text: string;
  isActive?: boolean;
}
