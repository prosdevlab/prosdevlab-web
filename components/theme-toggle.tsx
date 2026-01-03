"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        const newTheme = isDark ? "light" : "dark";
        console.log("Switching theme from", resolvedTheme, "to", newTheme);
        setTheme(newTheme);
      }}
      aria-label="Toggle theme"
      className="relative"
    >
      <Sun
        className={`h-5 w-5 transition-all ${isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"}`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all ${isDark ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}
      />
    </Button>
  );
}
