import { nanoid } from 'nanoid';
import { RefObject, useCallback, useContext, useEffect, useState } from 'react';
import SectionsScrolling from '../../contexts/SectionsScrollingContext';
import { animateScroll } from '../../helpers/animateScroll';
import { getDocumentFullHeight, getElementPos } from '../../helpers/helpers';
import { useScroll, useResize, IScroll } from '../../hooks/hooks';
import classes from './Sidebar.module.scss';

export default function Sidebar({
  className,
  isOpen,
  contentRef,
  toggleSidebar
}: ISidebarProps) {
  const items = useSections(contentRef);
  const scroll = useScroll();

  const cls = [classes.sidebar];
  if (className) cls.push(className);
  if (isOpen) cls.push(classes.open);

  const currentItem = getCurrentItem(items, scroll);

  const itemClickHandler = (scroll: number): void => {
    toggleSidebar();
    animateScroll({targetPosition: scroll, duration: 500})
  }

  console.log(items);
  

  return (
    <div className={cls.join(' ')}>
      {items.map((item, index) => {
        const cls = [classes.item];
        if (item.id === currentItem) cls.push(classes.active);

        return (
          <div
            key={index}
            className={cls.join(' ')}
            onClick={() => itemClickHandler(item.top)}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
}

function getCurrentItem(
  items: readonly ISidebarItem[],
  scroll: IScroll
): ISidebarItem['id'] | null {
  if (items.length === 0) return null;

  const filteredItems = items
    .map(el => ({
      id: el.id,
      bottom: el.bottom - scroll.top,
    }))
    .filter(el => el.bottom >= 0);
  if (filteredItems.length === 0) return null;

  if (
    scroll.top >=
    getDocumentFullHeight() - document.documentElement.clientHeight
  ) {
    const maxItem = items.reduce(
      (max, curr) => (curr.bottom > max.bottom ? curr : max),
      filteredItems[0]
    );

    return maxItem.id;
  }

  const minItem = items.reduce(
    (min, curr) => (curr.bottom < min.bottom ? curr : min),
    filteredItems[0]
  );

  return minItem.id;
}

function useSections(containerRef: RefObject<HTMLDivElement>) {
  const { sectionsClassName, titlesClassName } = useContext(SectionsScrolling);
  const [items, setItems] = useState<readonly ISidebarItem[]>([]);

  const updateSections = useCallback(() => {
    if (containerRef.current) {
      const sections = containerRef.current.querySelectorAll(
        '.' + sectionsClassName
      );

      const items = Array.from(sections).map<ISidebarItem>(el => {
        const title =
          el.querySelector('.' + titlesClassName)?.textContent ?? '';

        const { top, bottom } = getElementPos(el);

        return { title, top, bottom, id: nanoid() };
      });

      setItems(items);
    }
  }, [containerRef, sectionsClassName, titlesClassName]);

  useEffect(() => {
    updateSections();
  }, [containerRef, sectionsClassName, titlesClassName, updateSections]);

  useResize(updateSections);

  return items;
}

interface ISidebarProps {
  isOpen: boolean;
  contentRef: RefObject<HTMLDivElement>;
  toggleSidebar: () => void;

  className?: string;
}

export interface ISidebarItem {
  id: string;
  title: string;
  top: number;
  bottom: number;
}
