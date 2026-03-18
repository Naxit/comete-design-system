import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import type { ThemeContextType } from "../providers/ThemeProvider";

/**
 * Hook to access the current theme mode and toggle/set functions.
 *
 * Must be used within a `<ThemeProvider>`.
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return context;
};
