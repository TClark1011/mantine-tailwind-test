export const composeColorPrimitiveVariableName = (
  colorName: string,
  shade?: number,
) => `--tw-color-${colorName}` + (shade ? `-${shade}` : "");

export const TAILWIND_COLOR_SHADES = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
];
