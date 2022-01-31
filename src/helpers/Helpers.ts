import React, {
  Component,
  FunctionComponent,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

/**
 * Filters children by component
 *
 * @param children  Elements to filter
 * @param component "Valid" component
 */
export function filterChildren<P>(
  children: ReactNode,
  component: FunctionComponent<P> | Component<P>
) {
  return (
    React.Children.map<ReactElement<P> | null, ReactNode>(children, child => {
      if (React.isValidElement<P>(child) && child.type === component) {
        return child;
      }
      return null;
    }) ?? []
  );
}

/**
 * Hook to keep track of the width of element
 * Return state width and ref
 *
 * @param defaultWidth Default width
 */
export function useWidth<T extends HTMLElement>(
  defaultWidth: number
): [number, RefObject<T>] {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState<number>(defaultWidth);

  useEffect(() => {
    const listener = () => ref.current && setWidth(ref.current.clientWidth);
    listener();

    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [ref]);

  return [width, ref];
}

/**
 * Adds props to child elements
 *
 * @param children Elements to add properties to
 * @param props Properties
 */
export function addPropsToChildren<T>(
  children: ReactElement<T> | ReactElement<T>[],
  props: object
) {
  return React.Children.map<ReactElement<T>, ReactElement<T>>(
    children,
    child => {
      return React.cloneElement(child, props);
    }
  );
}
