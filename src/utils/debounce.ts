/* eslint-disable @typescript-eslint/no-explicit-any */
type DebounceFunction<T extends (...args: any[]) => any> = (func: T, delay: number) => T;

export const debounce: DebounceFunction<(...args: any[]) => void> = <
  T extends (...args: any[]) => void,
>(
  func: T,
  delay: number,
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  const debouncedFunction = (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };

  return debouncedFunction as T;
};
