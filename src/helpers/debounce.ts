type Procedure<T> = (...args: T[]) => void;

export function debounce<T>(func: Procedure<T>, delay: number): Procedure<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  const debouncedFunction = function (this: unknown, ...args: T[]) {
    const context = this;

    const doLater = function () {
      timeoutId = null;
      func.apply(context, args);
    };

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(doLater, delay);
  };

  return debouncedFunction;
}
