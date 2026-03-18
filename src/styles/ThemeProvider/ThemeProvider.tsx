import { CssBaseline } from "@mui/material";
import { ThemeProvider as ThemeMui, createTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import { useCallback, useEffect, useMemo, useReducer } from "react";
import paletteDark from "../palette/dark";
import paletteLight from "../palette/light";
import defaultConfig from "../theme";
import { ThemeContext, initialState, themeReducer } from "./ThemeContext";
import type { ThemeMode } from "./ThemeContext.types";
import type { ThemeProviderProps } from "./ThemeProvider.types";

/**
 * Theme context provider
 *
 * This component provides a theme context to its children.
 *
 * ```tsx
 * import { ThemeProvider } from "@aexae/design-system/styles";
 *
 * <ThemeProvider>
 *  <App />
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider = ({
  children,
  mode = initialState.mode,
  themeOptions = {},
  palettes = {
    dark: paletteDark,
    light: paletteLight,
  },
  enableCssBaseline = true,
}: ThemeProviderProps) => {
  const [state, dispatch] = useReducer(themeReducer, { ...initialState, mode });

  // ----------------------------------------------------------------------

  const toggleTheme = useCallback(() => {
    dispatch({
      type: "SET_MODE",
      payload: state.mode === "light" ? "dark" : "light",
    });
  }, [state.mode]);

  const setMode = useCallback((mode: ThemeMode) => {
    dispatch({ type: "SET_MODE", payload: mode });
  }, []);

  // ----------------------------------------------------------------------

  useEffect(() => {
    setMode(mode);
  }, [mode, setMode]);

  // ----------------------------------------------------------------------

  const theme = useMemo(() => {
    const themeMode = state.mode;
    const defaultPalette = themeMode === "dark" ? paletteDark : paletteLight;
    const palette = palettes[themeMode] ?? defaultPalette;

    return createTheme(
      deepmerge(defaultConfig, {
        ...themeOptions,
        palette,
      })
    );
  }, [state.mode, themeOptions, palettes]);

  const value = useMemo(
    () => ({
      mode: state.mode,
      theme,
      toggleTheme,
      setMode,
    }),
    [state.mode, theme, toggleTheme, setMode]
  );

  // ----------------------------------------------------------------------

  return (
    <ThemeContext.Provider value={value}>
      <ThemeMui theme={theme}>
        {enableCssBaseline && <CssBaseline />}
        {children}
      </ThemeMui>
    </ThemeContext.Provider>
  );
};
