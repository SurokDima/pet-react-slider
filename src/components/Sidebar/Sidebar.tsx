import { RefObject, useContext, useEffect, useState } from 'react';
import SectionsScrolling from '../../contexts/SectionsScrollingContext';
import classes from './Sidebar.module.scss';

export default function Sidebar({
  className,
  isOpen,
  contentRef,
}: ISidebarProps) {
  const { sectionsClassName, titlesClassName } = useContext(SectionsScrolling);
  const [items, setItems] = useState<ISidebarItem[]>([]);

  const cls = [classes.sidebar];
  if (className) cls.push(className);
  if (isOpen) cls.push(classes.open);

  useEffect(() => {
    if (contentRef.current) {
      const sections = contentRef.current.querySelectorAll(
        '.' + sectionsClassName
      );

      const items = Array.from(sections).map<ISidebarItem>(el => {
        const title = el.querySelector('.' + titlesClassName)?.textContent ?? '';
        const scroll = el.getBoundingClientRect().top + document.body.scrollTop;
        return { title, scroll };
      });

      setItems(items);
    }
  }, [contentRef, sectionsClassName, titlesClassName]);
  console.log(items)
  return (
    <div className={cls.join(' ')}>
      {items.map((item, index) => {
        const cls = [classes.item];
        /* if (item.isActive) cls.push(classes.active); */

        return (
          <div
            key={index}
            className={cls.join(' ')}
            onClick={() =>
              document.body.scrollTo({
                top: item.scroll,
              })
            }
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
}

interface ISidebarProps {
  isOpen: boolean;
  contentRef: RefObject<HTMLDivElement>;

  className?: string;
}

export interface ISidebarItem {
  title: string;
  scroll: number;
}
