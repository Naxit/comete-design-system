import type { ThemeOptions } from "@mui/material/styles";
import components from "../components";
import palette from "../palette/dark";
import typography from "../typography";

/**
 * Configuration du thème
 * @see https://mui.com/material-ui/customization/theming
 */
const config: ThemeOptions = {
  /**
   * Composants du thème
   * @see https://mui.com/material-ui/customization/theme-components/#theme-style-overrides
   */
  components,

  /**
   * Palette du thème
   * @see https://mui.com/material-ui/customization/color
   */
  palette,

  /**
   * Typographie du thème
   * @see https://mui.com/material-ui/customization/typography
   */
  typography,
};

// ----------------------------------------------------------------------

export default config;
