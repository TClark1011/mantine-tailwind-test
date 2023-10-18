"use client";

import {
  Button,
  type MantineColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { type FC } from "react";
import { type StrictExclude } from "$utility-types";
import cx from "classnames";
import { useHydratedValue, useIsHydrated } from "$hooks/use-hydrated-value";

type AppliedMantineColorScheme = StrictExclude<MantineColorScheme, "auto">;

const getUserSystemColorScheme = (): AppliedMantineColorScheme => {
  try {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    return isDark ? "dark" : "light";
  } catch {
    return "light";
  }
};

const colorSchemeLabels: Record<AppliedMantineColorScheme, string> = {
  light: "Light",
  dark: "Dark",
};

const userSystemColorScheme = getUserSystemColorScheme();

const useAppliedColorScheme = (): AppliedMantineColorScheme => {
  const colorSchemeController = useMantineColorScheme();

  return useHydratedValue(
    () =>
      colorSchemeController.colorScheme === "auto"
        ? userSystemColorScheme
        : colorSchemeController.colorScheme,
    "light",
  );
};

export const ColorSchemeToggle: FC<{ className?: string }> = ({
  className,
}) => {
  const isHydrated = useIsHydrated();
  const colorSchemeController = useMantineColorScheme();
  const appliedColorScheme = useAppliedColorScheme();

  if (!isHydrated) return null;

  return (
    <Button
      className={cx(className)}
      onClick={colorSchemeController.toggleColorScheme}
    >
      {colorSchemeLabels[appliedColorScheme]}
    </Button>
  );
};
