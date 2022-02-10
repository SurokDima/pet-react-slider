import { ReactNode } from 'react';
import Sidebar, {ISidebarItem} from '../../components/Sidebar/Sidebar';

import classes from './Layout.module.scss';

export default function Layout({ children }: ILayoutProps) {
  const sidebarItems: ISidebarItem[] = [
    {text: 'item 1', isActive: true},
    {text: 'item 2'},
    {text: 'item 3'},
  ];

  return (
    <>
      <Sidebar items={sidebarItems} />
      <div className={classes.content}>
        <div className={classes.container}>{children}</div>
      </div>
    </>
  );
}

interface ILayoutProps {
  children: ReactNode;
}
