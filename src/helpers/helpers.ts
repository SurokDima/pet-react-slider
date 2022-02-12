export function debounce<T extends (...args: any[]) => void>(
  this: any,
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

export function getElementPos(el: Element): Coords {
  const rect = el.getBoundingClientRect();

  return {
    top: rect.top + window.scrollY,
    bottom: rect.bottom + window.scrollY,
    left: rect.left + window.scrollX,
    right: rect.right + window.scrollX,
  };
}
