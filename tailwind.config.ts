import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import {
  MANTINE_COLOR_NAMES,
  TAILWIND_COLOR_SHADES,
  composeColorPrimitiveVariableName,
} from "./src/lib/theme-helpers";

const composeSingleTailwindRgbColor = (colorName: string, shade?: number) =>
  `rgb(var(${composeColorPrimitiveVariableName(
    colorName,
    shade,
  )}) / <alpha-value>)`;

const generateTailwindColorSetForMantineColor = (colorName: string) => {
  const colorSet: Record<string, string> = {};

  TAILWIND_COLOR_SHADES.forEach((shade) => {
    colorSet[shade] = composeSingleTailwindRgbColor(colorName, shade);
  });

  return colorSet;
};

const mantineColorTwEntries: Record<string, string | Record<string, string>> =
  {};

MANTINE_COLOR_NAMES.forEach((color) => {
  mantineColorTwEntries[color] = generateTailwindColorSetForMantineColor(color);
});

const MANTINE_SIZES = ["xs", "sm", "md", "lg", "xl"];

type ComposeMantineSizeTwEntriesInput = {
  propertyName: string;
  extraSizes?: string[];
  twKeyPrefix?: string;
};
const composeMantineSizeTwEntries = ({
  propertyName,
  extraSizes = [],
  twKeyPrefix = "",
}: ComposeMantineSizeTwEntriesInput) => {
  const result: Record<string, string> = {};

  [...MANTINE_SIZES, ...extraSizes].forEach((size) => {
    result[`${twKeyPrefix}${size}`] = `var(--mantine-${propertyName}-${size})`;
  });

  return result;
};

const mantineSpacingEntries = composeMantineSizeTwEntries({
  propertyName: "spacing",
  twKeyPrefix: "man_",
});

export default {
  content: ["./src/**/*.tsx"],
  darkMode: ["class", '[data-mantine-color-scheme="dark"]'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    boxShadow: composeMantineSizeTwEntries({ propertyName: "shadow" }),
    borderRadius: composeMantineSizeTwEntries({
      propertyName: "radius",
      extraSizes: ["default"],
    }),
    colors: {
      ...mantineColorTwEntries,
      error: composeSingleTailwindRgbColor("error"),
      white: composeSingleTailwindRgbColor("white"),
      black: composeSingleTailwindRgbColor("black"),
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      spacing: mantineSpacingEntries,
      maxWidth: mantineSpacingEntries,
    },
  },
  plugins: [],
} satisfies Config;

/**
 * NOTE: We apply a prefix to the mantine spacing keys because mantine's
 * spacing values are only designed for small-scale work within components,
 * whereas tailwind's spacing is designed for both small smale work and large
 * scale page layouts. To keep both sets of values available, we prefix the
 * mantine spacing values with `man_` so that they don't conflict with the
 * tailwind values.
 */
