import type { PaletteOptions } from "@mui/material/styles";

/**
 * Palette light — valeurs hex extraites de @naxit/comete-design-tokens (light.json).
 *
 * MUI fait du color math JS (lighten, alpha, decomposeColor) sur les valeurs de
 * palette, ce qui est incompatible avec des CSS var(). On utilise donc des hex ici.
 *
 * Les CSS vars restent utilisées dans les component style overrides (button.ts, etc.)
 * car MUI les traite comme de simples strings CSS sans manipulation.
 *
 * @see https://mui.com/material-ui/customization/color
 */
const config: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#2467d1",        // comete.biscay.700
    light: "#dceefd",       // comete.biscay.100
    dark: "#224986",        // comete.biscay.900
    contrastText: "#f7f8f8", // porcelain.50
  },
  secondary: {
    main: "#eaedee",        // porcelain.100
    light: "#f7f8f8",       // porcelain.50
    dark: "#b5c1c4",        // porcelain.300
    contrastText: "#252a2c", // porcelain.950
  },
  error: {
    main: "#e12121",        // red.600
    light: "#ffe1e1",       // red.100
    dark: "#9d1717",        // red.800
    contrastText: "#f7f8f8",
  },
  warning: {
    main: "#facc15",        // supernova.400
    light: "#fef2c3",       // supernova.100
    dark: "#caa204",        // supernova.600
    contrastText: "#252a2c",
  },
  success: {
    main: "#009b60",        // salem.600
    light: "#d0fbe2",       // salem.100
    dark: "#036240",        // salem.800
    contrastText: "#f7f8f8",
  },
  info: {
    main: "#009bfe",        // green-vogue.500
    light: "#ddf1ff",       // green-vogue.100
    dark: "#0060b0",        // green-vogue.700
    contrastText: "#f7f8f8",
  },
  text: {
    primary: "#252a2c",     // porcelain.950
    secondary: "#49585b",   // porcelain.700
    disabled: "#b0b0b0",    // grey.300
  },
  background: {
    default: "#ffffff",     // white.100
    paper: "#ffffff",       // white.100
  },
  divider: "#eaedee",      // porcelain.100
  action: {
    hover: "#00000029",
    active: "#00000052",
    disabled: "#f6f6f6",    // grey.50
    disabledBackground: "#f6f6f6",
    focus: "#009bfe",       // green-vogue.500
  },
};

export default config;
