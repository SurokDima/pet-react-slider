import { ReactNode, useRef, useState } from 'react';
import Hamburger from '../../components/Hamburger/Hamburger';
import Sidebar from '../../components/Sidebar/Sidebar';

import classes from './Layout.module.scss';

export default function Layout({ children }: ILayoutProps) {
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);
  const toggleSidebar = () => setIsSideBarOpen(!isSidebarOpen);

  const contentRef = useRef<HTMLDivElement>(null);

  const hamburgerCls = [classes.hamburger];
  if (!isSidebarOpen) hamburgerCls.push(classes.close);

  return (
    <>
      <Sidebar
        isOpen={isSidebarOpen}
        contentRef={contentRef}
        toggleSidebar={toggleSidebar}
      />
      <Hamburger
        onClick={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        className={hamburgerCls.join(' ')}
      />
      <div className={classes.content} ref={contentRef}>
        <div className={classes.container}>{children}</div>
      </div>
    </>
  );
}

interface ILayoutProps {
  children: ReactNode;
}
