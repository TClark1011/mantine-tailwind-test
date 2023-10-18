import { useRef } from "react";

export const useConstant = <T>(val: T): T => useRef<T>(val).current;
