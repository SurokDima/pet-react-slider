/**
 * Rerturns new function that executes `func` no more than once per `timeout` milliseconds
 *
 * @param func func to wrap
 * @param timeout timeout between function invocations
 * @returns wrapper function
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  timeout = 300
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout;

  const result = function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): void {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), timeout);
  };
  return result;
}

/**
 * Returns full height of the document
 * 
 * @returns full height of document
 */
export function getDocumentFullHeight(): number {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
}

interface Coords {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

/**
 * Returns coordinates of element relative to document
 * 
 * @param el html element
 * @returns coordinates of element relative to document
 */
export function getElementPos(el: Element): Coords {
  const rect = el.getBoundingClientRect();

  return {
    top: rect.top + window.scrollY,
    bottom: rect.bottom + window.scrollY,
    left: rect.left + window.scrollX,
    right: rect.right + window.scrollX,
  };
}
