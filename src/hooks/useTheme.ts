import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider/ThemeContext";
import type { ThemeContextType } from "../providers/ThemeProvider/ThemeContext.types";

/**
 * Use theme context
 * @returns Theme context
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
