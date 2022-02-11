import { ReactNode, useState } from 'react';
import Hamburger from '../../components/Hamburger/Hamburger';
import Sidebar, {ISidebarItem} from '../../components/Sidebar/Sidebar';

import classes from './Layout.module.scss';

export default function Layout({ children }: ILayoutProps) {
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);
  const toggleSidebar = () => setIsSideBarOpen(!isSidebarOpen);

  const sidebarItems: ISidebarItem[] = [
    {text: 'item 1', isActive: true},
    {text: 'item 2'},
    {text: 'item 3'},
  ];

  const hamburgerCls = [classes.hamburger];
  if(!isSidebarOpen) hamburgerCls.push(classes.close);

  return (
    <>
      <Sidebar items={sidebarItems} isOpen={isSidebarOpen}  />
      <Hamburger onClick={toggleSidebar} isSidebarOpen={isSidebarOpen} className={hamburgerCls.join(' ')} />
      <div className={classes.content}>
        <div className={classes.container}>{children}</div>
      </div>
    </>
  );
}

interface ILayoutProps {
  children: ReactNode;
}
