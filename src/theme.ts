"use client";

import {
  createTheme,
  type CSSVariablesResolver,
  DEFAULT_THEME,
  type MantineTheme,
} from "@mantine/core";
import { keys } from "$utils";
import {
  TAILWIND_COLOR_SHADES,
  composeColorPrimitiveVariableName,
} from "$theme-helpers";

const parseHexColorRGBValues = (hexColor: string) => {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
};

export const themeOverride = createTheme({
  colors: {
    primary: DEFAULT_THEME.colors.blue,
    secondary: DEFAULT_THEME.colors.yellow,
  },
  primaryColor: "primary",
});

/**
 * We need to setup a custom css variables resolver so we can export
 * extra CSS variables that contain the underlying RGB numeric values
 * for each color. This is required for tailwind to be able to use its
 * color transparency feature.
 */

const COLOR_NAMES = [
  ...new Set([
    ...keys(DEFAULT_THEME.colors),
    ...keys(themeOverride.colors),
  ]).values(),
];

type MantineColorName = (typeof COLOR_NAMES)[number];

const printHexColorRGBValues = (hexColor: string) => {
  const { r, g, b } = parseHexColorRGBValues(hexColor);

  return `${r} ${g} ${b}`;
};

const composeColorPrimitiveVariablesForColorName = (
  colorName: MantineColorName,
  theme: MantineTheme,
) =>
  TAILWIND_COLOR_SHADES.reduce((result, shade, index) => {
    const color = theme.colors[colorName][index];

    if (!color)
      throw new Error(
        `Color ${colorName} does not have shade ${shade} (index: ${index})`,
      );

    return {
      ...result,
      [composeColorPrimitiveVariableName(colorName, shade)]:
        printHexColorRGBValues(color),
    };
  }, {});

const createColorPrimitiveVariables = (theme: MantineTheme) =>
  COLOR_NAMES.reduce(
    (result, colorName) => ({
      ...result,
      ...composeColorPrimitiveVariablesForColorName(colorName, theme),
    }),
    {},
  );

export const cssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: createColorPrimitiveVariables(theme),
  dark: {
    [composeColorPrimitiveVariableName("error")]: printHexColorRGBValues(
      theme.colors.red[9],
    ),
  },
  light: {
    [composeColorPrimitiveVariableName("error")]: printHexColorRGBValues(
      theme.colors.red[6],
    ),
  },
});
