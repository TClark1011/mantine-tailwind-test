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

const generateMantineColorShades = (colorName: string) => {
  const shades = TAILWIND_COLOR_SHADES.reduce(
    (result, shade) => ({
      ...result,
      [shade]: `rgb(var(${composeColorPrimitiveVariableName(
        colorName,
        shade,
      )}) / <alpha-value>)`,
    }),
    {},
  );

  return shades;
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
  ALL_MANTINE_PALETTE_COLORS.reduce(
    (result, color) => ({
      ...result,
      [color]: generateMantineColorShades(color),
    }),
    {},
  );

const MANTINE_SIZES = ["xs", "sm", "md", "lg", "xl"];

const composeMantineSizeTwEntries = (
  propertyName: string,
  extraSizes: string[] = [],
) =>
  [...MANTINE_SIZES, ...extraSizes].reduce(
    (result, size) => ({
      ...result,
      [size]: `var(--mantine-${propertyName}-${size})`,
    }),
    {},
  );

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
      error: `rgb(var(${composeColorPrimitiveVariableName(
        "error",
      )}) / <alpha-value>)`,
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
