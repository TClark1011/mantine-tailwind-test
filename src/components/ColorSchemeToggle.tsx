"use client";

import {
  Button,
  type MantineColorScheme,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { type FC } from "react";
import { type StrictExclude } from "$utility-types";
import cx from "classnames";
import { useHydratedValue, useIsHydrated } from "$hooks/use-hydrated-value";

type AppliedMantineColorScheme = StrictExclude<MantineColorScheme, "auto">;

const colorSchemeLabels: Record<AppliedMantineColorScheme, string> = {
  light: "Light",
  dark: "Dark",
};

const useAppliedColorScheme = (): AppliedMantineColorScheme => {
  const appliedColorScheme = useComputedColorScheme("light");

  return useHydratedValue(() => appliedColorScheme, "light");
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
