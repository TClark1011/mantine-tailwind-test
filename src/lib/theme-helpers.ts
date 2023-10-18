import { type MantineColor } from "@mantine/core";
import { keys } from "./utils"; // Must be relative to be imported by tailwind config

export const composeColorPrimitiveVariableName = (
  colorName: string,
  shade?: number,
) => `--tw-color-${colorName}` + (shade ? `-${shade}` : "");

export const TAILWIND_COLOR_SHADES = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
];

/**
 * We create it as a record so we can have typescript
 * warn us if we accidentally leave out a color.
 */
const colorObj: Record<MantineColor, string> = {
  blue: "",
  cyan: "",
  gray: "",
  green: "",
  indigo: "",
  orange: "",
  pink: "",
  dark: "",
  red: "",
  teal: "",
  yellow: "",
  grape: "",
  lime: "",
  primary: "",
  secondary: "",
  violet: "",
};

export const MANTINE_COLOR_NAMES = keys(colorObj);
