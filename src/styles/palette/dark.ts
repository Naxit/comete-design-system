import type { PaletteOptions } from "@mui/material/styles";

/**
 * Palette dark — valeurs hex extraites de @naxit/comete-design-tokens (dark.json).
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
  mode: "dark",
  primary: {
    main: "#97d2f9",        // comete.biscay.300
    light: "#1e3661",       // comete.biscay.950
    dark: "#dceefd",        // comete.biscay.100
    contrastText: "#252a2c", // porcelain.950
  },
  secondary: {
    main: "#49585b",        // porcelain.700
    light: "#49585b",       // porcelain.700
    dark: "#6f8488",        // porcelain.500
    contrastText: "#d8dedf", // porcelain.200
  },
  error: {
    main: "#fc6d6d",        // red.400
    light: "#821a1a",       // red.900
    dark: "#ffc8c8",        // red.200
    contrastText: "#252a2c",
  },
  warning: {
    main: "#eabd08",        // supernova.500
    light: "#a18207",       // supernova.700
    dark: "#fdd847",        // supernova.300
    contrastText: "#252a2c",
  },
  success: {
    main: "#0abf76",        // salem.500
    light: "#245041",       // salem.900
    dark: "#6aebae",        // salem.300
    contrastText: "#252a2c",
  },
  info: {
    main: "#009bfe",        // green-vogue.500
    light: "#034477",       // green-vogue.900
    dark: "#71cdff",        // green-vogue.300
    contrastText: "#252a2c",
  },
  text: {
    primary: "#d8dedf",     // porcelain.200
    secondary: "#b5c1c4",   // porcelain.300
    disabled: "#4f4f4f",    // grey.700
  },
  background: {
    default: "#252a2c",     // porcelain.950
    paper: "#374043",       // porcelain.900
  },
  divider: "#3f4a4d",      // porcelain.800
  action: {
    hover: "#ffffff33",
    active: "#ffffff5c",
    disabled: "#262626",    // grey.950
    disabledBackground: "#262626",
    focus: "#26b5ff",       // green-vogue.400
  },
};

export default config;
