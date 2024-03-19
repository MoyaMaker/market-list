"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

export function ThemeToggle() {
  const { setTheme, theme, systemTheme } = useTheme();

  const handleTheme = () => {
    if (theme === "light" || (theme === "system" && systemTheme === "light")) {
      setTheme("dark");
    } else if (
      (theme && theme === "dark") ||
      (theme === "system" && systemTheme === "dark")
    ) {
      setTheme("light");
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleTheme}>
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
