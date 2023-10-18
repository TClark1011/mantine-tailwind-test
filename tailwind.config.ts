import {
  type CustomMantineColor,
  type DefaultMantineColor,
  DEFAULT_THEME as DEFAULT_MANTINE_THEME,
} from "@mantine/core";
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import type { ExtractLiterals } from "./src/lib/utility-types";
import {
  TAILWIND_COLOR_SHADES,
  composeColorPrimitiveVariableName,
} from "./src/lib/theme-helpers";

const composeTailwindRgbColor = (colorName: string, shade?: number) =>
  `rgb(var(${composeColorPrimitiveVariableName(
    colorName,
    shade,
  )}) / <alpha-value>)`;

const generateTailwindColorSetForMantineColor = (colorName: string) => {
  const colorSet: Record<string, string> = {};

  TAILWIND_COLOR_SHADES.forEach((shade) => {
    colorSet[shade] = composeTailwindRgbColor(colorName, shade);
  });

  return colorSet;
};

type StrictDefaultMantineColor = ExtractLiterals<DefaultMantineColor>;

// We construct a record so that we can guarantee that we
// have all the keys, then we just convert it to an array
// with `Object.keys`
const mantineColorsRecord: Record<
  StrictDefaultMantineColor | CustomMantineColor,
  any
> = {
  ...(DEFAULT_MANTINE_THEME.colors as Record<StrictDefaultMantineColor, any>),
  primary: null,
  secondary: null,
};

const ALL_MANTINE_PALETTE_COLORS = Object.keys(mantineColorsRecord);

const mantineColorTwEntries: Record<string, string | Record<string, string>> =
  {};

ALL_MANTINE_PALETTE_COLORS.forEach((color) => {
  mantineColorTwEntries[color] = generateTailwindColorSetForMantineColor(color);
});
// ALL_MANTINE_PALETTE_COLORS.reduce(
//   (result, color) => ({
//     ...result,
//     [color]: generateTailwindColorSetForMantineColor(color),
//   }),
//   {},
// );

const MANTINE_SIZES = ["xs", "sm", "md", "lg", "xl"];

// const composeMantineSizeTwEntries = (
//   propertyName: string,
//   extraSizes: string[] = [],
// ) =>
//   [...MANTINE_SIZES, ...extraSizes].reduce(
//     (result, size) => ({
//       ...result,
//       [size]: `var(--mantine-${propertyName}-${size})`,
//     }),
//     {},
//   );
const composeMantineSizeTwEntries = (
  propertyName: string,
  extraSizes: string[] = [],
) => {
  const result: Record<string, string> = {};

  [...MANTINE_SIZES, ...extraSizes].forEach((size) => {
    result[size] = `var(--mantine-${propertyName}-${size})`;
  });

  return result;
};

export default {
  content: ["./src/**/*.tsx"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    boxShadow: composeMantineSizeTwEntries("shadow"),
    borderRadius: composeMantineSizeTwEntries("radius", ["default"]),
    colors: {
      ...mantineColorTwEntries,
      error: composeTailwindRgbColor("error"),
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      spacing: composeMantineSizeTwEntries("spacing"),
    },
  },
  plugins: [],
} satisfies Config;
