# Mantine Tailwind Test

This repository contains a tiny test project for prototyping the combination of [TailwindCSS](https://tailwindcss.com/) and [Mantine](https://mantine.dev/). These two libraries are technically _compatible_ without the need for any extra configuration, however without some extra work to integrate the 2 they sort of tred on each other's toes a bit.

All of the code for the integration can found in `tailwind.config.ts`, `src/lib/theme-helpers.ts` and `src/`src/lib/theme.ts`.

The main integration that is required for the best experience is configuring tailwind's theme so it references mantine's theme, which luckily is not too difficult since all of mantine's theme values are exported as CSS variables. However, simply using these mantine theme CSS varaibles is not the perfect solution as it means you cannot use tailwind's color opacity functionality.

## Tailwind Color Opacity

Tailwind has a feature where when referencing colors from it's theme, you can set the opacity of the color using a `/`, for instance: `bg-blue-500/50` will set the background to be the 500 shade of blue, with 50% opacity. However, if `blue-500` is simply referencing the corresponding mantine theme (eg; `var(--mantine-colors-blue-5)`), then this will not work properly.

Ultimately this is a minor issue that we could just avoid, however it is a bit of a pain point, especially since there is no way we can disable the color opacity functionality in tailwind, and when using the tailwind IDE plugin, the color opacity functionality is always suggested.

The Tailwind docs does have a section on [using CSS variables for color values](https://tailwindcss.com/docs/customizing-colors#using-css-variables). In order for it to work, the CSS variables need to contain the underlying `rgb` values for the color, and then tailwind can then plug those into the css `rgba` function, and then pass the opacity value as the fourth parameter. Unfortunately, this is not how mantine color values are stored, but there is a way we can create our own CSS variables that do.

Mantine allows to create a `cssVariablesResolver`. A `cssVariablesResolver` allows us to create our own extra CSS variables at runtime that are based on the current theme. We can use this to create our own CSS variables that contain the `rgb` values for each color, and then we can use these CSS variables in our tailwind config.

## Incompatibilities

The only thing I couldn't get working to integrate Mantine and Tailwind is Mantine's [variant specific colors](https://mantine.dev/styles/css-variables/#variant-specific-colors). Thankfully this isn't a huge deal. However, it is definitely possible to get these working, it's just not as smooth as I would like. In order to do it, you would need to work exactly which colors from the mantine theme are used for each variant, and then manually re-export those.

For instance, you can manually check the output CSS and see that the `--mantine-color-blue-light-filled` is simply shade 400 (at least when in might mode), and then use the css variables resolver to export a variable for each color that references shade 400 under the name "light-filled", however I haven't done that hear as frankly its just tedious and I don't think its worth it.

## Recreation Steps

1. Use `create-t3-app` and include tailwind and typescript
2. install `@mantine/core`, `@mantine/theme` and `type-fest` in the new project
3. Setup the same tsconfig paths as this project
4. Copy over the following files from this project:
   - `tailwind.config.ts`
   - `theme.ts`
   - `theme-helpers.ts`
   - `utils.ts`
   - `utility-types.ts`
   - `mantine-theme.d.ts`
5. Import `@mantine/core/styles.css` into `app/layout.tsx`
6. Setup `MantineProvider` and `ColorSchemeScript` in `app/layout.tsx` the same way as in this project
