"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className="size-12 cursor-pointer rounded-full px-2"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      data-cursor-stick
    >
      <SunIcon className="text-neutral-800 dark:hidden dark:text-neutral-200" />
      <MoonIcon className="hidden text-neutral-800 dark:block dark:text-neutral-200" />
    </Button>
  );
}
