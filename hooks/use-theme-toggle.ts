import { useCallback } from "react";
import { useColorScheme } from "./use-color-scheme";
import { useColors } from "./use-colors";

export function useThemeToggle() {
  const colorScheme = useColorScheme();
  const colors = useColors();

  const isDark = colorScheme === "dark";
  const toggleTheme = useCallback(() => {
    // This would be implemented with your theme provider
    // For now, it's a placeholder
  }, []);

  return {
    isDark,
    colorScheme,
    colors,
    toggleTheme,
  };
}
