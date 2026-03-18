import type { PaletteOptions, ThemeOptions } from "@mui/material/styles";
import type { ReactNode } from "react";
import type { ThemeMode } from "./ThemeContext.types";

/**
 * Props pour le composant ThemeProvider
 */
export type ThemeProviderProps = {
  /**
   * Contenu à wrapper avec le thème
   */
  children: ReactNode;
  /**
   * Mode de thème initial
   * @default "dark"
   */
  mode?: ThemeMode;
  /**
   * Options de thème supplémentaires pour étendre ou remplacer la configuration par défaut
   */
  themeOptions?: ThemeOptions;
  /**
   * Palettes à utiliser pour le thème
   * @default { dark: paletteDark, light: paletteLight }
   */
  palettes?: {
    dark: PaletteOptions;
    light: PaletteOptions;
    [key: string]: PaletteOptions;
  };
  /**
   * Activer ou désactiver CssBaseline (reset CSS de MUI)
   * @default true
   */
  enableCssBaseline?: boolean;
};
