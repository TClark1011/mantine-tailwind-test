import { type MantineColor } from "@mantine/core";
import { keys } from "./utils"; // Must be relative to be imported by tailwind config
import type { StrictExclude, StrictExtract } from "$utility-types";

const expandPotentiallyShortHexColor = (hexColor: string) => {
  const hexWithoutHash = hexColor.replace("#", "");

  const hexR = hexWithoutHash[0];
  const hexG = hexWithoutHash[1];
  const hexB = hexWithoutHash[2];
  if (hexWithoutHash.length === 3) {
    return `#${hexR}${hexR}${hexG}${hexG}${hexB}${hexB}`;
  }

  return hexColor;
};

const parseHexColorToRGBValues = (hexColor: string) => {
  const fullLengthHexColor = expandPotentiallyShortHexColor(hexColor);
  const hex = fullLengthHexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
};

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

export const composeSingleTailwindRgbColor = (
  colorName: string,
  shade?: number,
) =>
  `rgb(var(${composeColorPrimitiveVariableName(
    colorName,
    shade,
  )}) / <alpha-value>)`;

export const MANTINE_SPECIAL_COLORS = [
  "error",
  "white",
  "black",
  "textColor",
  "body",
] as const;

type SpecialMantineColor = (typeof MANTINE_SPECIAL_COLORS)[number];

type ColorSchemeDependentSpecialMantineColor = StrictExtract<
  SpecialMantineColor,
  "error" | "body" | "textColor"
>;

type ConsistentSpecialMantineColor = StrictExclude<
  SpecialMantineColor,
  ColorSchemeDependentSpecialMantineColor
>;

const generateColorVariableCompositionHelper =
  <Color extends SpecialMantineColor>() =>
  (colors: Record<Color, string>) => {
    const result: Record<string, string> = {};

    keys(colors).forEach((colorName) => {
      const cssVarName = composeColorPrimitiveVariableName(colorName);
      const hexColor = colors[colorName];
      const { r, g, b } = parseHexColorToRGBValues(hexColor);
      const rgbColor = `${r} ${g} ${b}`;
      result[cssVarName] = rgbColor;
    });

    return result;
  };

export const composeSchemeDependentColorVariableResolutions =
  generateColorVariableCompositionHelper<ColorSchemeDependentSpecialMantineColor>();

export const composeConsistentColorVariableResolutions =
  generateColorVariableCompositionHelper<ConsistentSpecialMantineColor>();
