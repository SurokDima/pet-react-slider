import { nanoid } from 'nanoid';
import { RefObject, useContext, useEffect, useState } from 'react';
import SectionsScrolling from '../../contexts/SectionsScrollingContext';
import classes from './Sidebar.module.scss';

export default function Sidebar({
  className,
  isOpen,
  contentRef,
}: ISidebarProps) {
  const { sectionsClassName, titlesClassName } = useContext(SectionsScrolling);
  const [items, setItems] = useState<readonly ISidebarItem[]>([]);
  const scroll = useScroll();
  
  const cls = [classes.sidebar];
  if (className) cls.push(className);
  if (isOpen) cls.push(classes.open);

  useEffect(() => {
    if (contentRef.current) {
      const sections = contentRef.current.querySelectorAll(
        '.' + sectionsClassName
      );

        console.log(contentRef.current.hidden);
        

      const items = Array.from(sections).map<ISidebarItem>(el => {
        const title =
          el.querySelector('.' + titlesClassName)?.textContent ?? '';

        const { top, bottom } = getElementPos(el);
        

        return { title, top, bottom, id: nanoid() };
      });

      setItems(items);
    }
  }, [contentRef, sectionsClassName, titlesClassName]);
  
  const currentItem = getCurrentItem(items, scroll);

  return (
    <div className={cls.join(' ')}>
      {items.map((item, index) => {
        const cls = [classes.item];
        if (item.id === currentItem) cls.push(classes.active);

        return (
          <div
            key={index}
            className={cls.join(' ')}
            onClick={() =>
              window.scrollTo({
                top: item.top,
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
    
  if (filteredItems.length === 0) return null;
  if(scroll.top >= getDocumentFullHeight() - document.documentElement.clientHeight) {
    const maxItem = items.reduce(
      (max, curr) => (curr.bottom < max.bottom ? curr : max),
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

function debounce<T extends (...args: any[]) => void>(
  this: any,
  func: T,
  timeout = 300
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout;

  const result = (...args: Parameters<T>): void => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), timeout);
  };
  return result;
}

interface Coords {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

function getElementPos(el: Element): Coords {
  const rect = el.getBoundingClientRect();

  return {
    top: rect.top + document.body.scrollTop,
    bottom: rect.bottom + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft,
    right: rect.right + document.body.scrollLeft,
  };
}

function getDocumentFullHeight(): number {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
}

interface IScroll {
  top: number;
  left: number;
}

function useScroll(): IScroll {
  const [scroll, setScroll] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    const updatePosition = debounce(() => {
      setScroll({
        top: window.scrollY,
        left: window.scrollX,
      });
    });
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scroll;
}

interface ISidebarProps {
  isOpen: boolean;
  contentRef: RefObject<HTMLDivElement>;

  className?: string;
}

export interface ISidebarItem {
  id: string;
  title: string;
  top: number;
  bottom: number;
}
