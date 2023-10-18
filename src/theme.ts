"use client";

import {
  createTheme,
  type CSSVariablesResolver,
  DEFAULT_THEME,
  type MantineTheme,
} from "@mantine/core";
import {
  MANTINE_COLOR_NAMES,
  TAILWIND_COLOR_SHADES,
  composeColorPrimitiveVariableName,
} from "$theme-helpers";

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

const parseHexColorRGBValues = (hexColor: string) => {
  const fullLengthHexColor = expandPotentiallyShortHexColor(hexColor);
  const hex = fullLengthHexColor.replace("#", "");
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

type MantineColorName = (typeof MANTINE_COLOR_NAMES)[number];

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
  MANTINE_COLOR_NAMES.reduce(
    (result, colorName) => ({
      ...result,
      ...composeColorPrimitiveVariablesForColorName(colorName, theme),
    }),
    {},
  );

export const cssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {
    ...createColorPrimitiveVariables(theme),
    [composeColorPrimitiveVariableName("white")]: printHexColorRGBValues(
      theme.white,
    ),
    [composeColorPrimitiveVariableName("black")]: printHexColorRGBValues(
      theme.black,
    ),
  },
  dark: {
    [composeColorPrimitiveVariableName("error")]: printHexColorRGBValues(
      theme.colors.red[9],
    ),
    [composeColorPrimitiveVariableName("body")]: printHexColorRGBValues(
      theme.colors.dark[7],
    ),
  },
  light: {
    [composeColorPrimitiveVariableName("error")]: printHexColorRGBValues(
      theme.colors.red[6],
    ),
    [composeColorPrimitiveVariableName("body")]: printHexColorRGBValues(
      theme.white,
    ),
  },
});
