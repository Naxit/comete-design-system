import type { Theme } from "@mui/material/styles";

/**
 * Mode du thème
 */
export type ThemeMode = "light" | "dark" | string;

/**
 * Type du contexte de thème
 */
export interface ThemeContextType {
  /**
   * Mode du thème en cours
   */
  mode: ThemeMode;
  /**
   * Thème en cours
   */
  theme: Theme;
  /**
   * Basculer le mode du thème
   */
  toggleTheme: () => void;
  /**
   * Définir le mode du thème
   */
  setMode: (mode: ThemeMode) => void;
}
