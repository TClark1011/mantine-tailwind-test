import { useEffect, useState } from "react";

/**
 * Helps manage values that can change between the server and client,
 * eg; `localStorage`.
 *
 * @param getActualValue A function that returns the value you need
 * @param stableFallback A fallback value that will be used until
 * hydration is complete. MUST BE CONSISTENT BETWEEN SERVER AND CLIENT.
 */
export const useHydratedValue = <T>(
  getActualValue: () => T,
  stableFallback: T,
): T => {
  const [value, setValue] = useState<T>(stableFallback);

  /**
   * `useEffect` only runs after hydration is completed
   */
  useEffect(() => {
    setValue(getActualValue());
  }, [getActualValue]);

  return value;
};

export const useIsHydrated = (): boolean => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
};
