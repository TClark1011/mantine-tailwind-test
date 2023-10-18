const safeWindow = (() => {
  try {
    return typeof window === "undefined" ? undefined : window;
  } catch (e) {
    return undefined;
  }
})();

export const isBrowser = !!safeWindow;
