import type { PaletteOptions } from "@mui/material/styles";

/**
 * Palette light — basée sur les CSS custom properties de @naxit/comete-design-tokens.
 *
 * Les valeurs var(--xxx) sont passées telles quelles au CSS.
 * Note : les opérations JS sur les couleurs (alpha, lighten) ne fonctionnent pas
 * avec des CSS vars. Utiliser les tokens sémantiques directement dans les overrides.
 *
 * @see https://mui.com/material-ui/customization/color
 */
const config: PaletteOptions = {
  mode: "light",
  primary: {
    main: "var(--background-brand-bold-default)",
    light: "var(--background-brand-subtlest-default)",
    dark: "var(--background-brand-bold-pressed)",
    contrastText: "var(--text-inverted)",
  },
  secondary: {
    main: "var(--background-neutral-subtler-default)",
    light: "var(--background-neutral-subtlest-default)",
    dark: "var(--background-neutral-subtler-pressed)",
    contrastText: "var(--text-primary)",
  },
  error: {
    main: "var(--background-critical-bold-default)",
    light: "var(--background-critical-subtlest-default)",
    dark: "var(--background-critical-bold-pressed)",
    contrastText: "var(--text-inverted)",
  },
  warning: {
    main: "var(--background-warning-bold-default)",
    light: "var(--background-warning-subtlest-default)",
    dark: "var(--background-warning-bold-pressed)",
    contrastText: "var(--text-primary)",
  },
  success: {
    main: "var(--background-success-bold-default)",
    light: "var(--background-success-subtlest-default)",
    dark: "var(--background-success-bold-pressed)",
    contrastText: "var(--text-inverted)",
  },
  info: {
    main: "var(--background-information-bold-default)",
    light: "var(--background-information-subtlest-default)",
    dark: "var(--background-information-bold-pressed)",
    contrastText: "var(--text-inverted)",
  },
  text: {
    primary: "var(--text-primary)",
    secondary: "var(--text-subtle)",
    disabled: "var(--text-disabled)",
  },
  background: {
    default: "var(--background-default-default)",
    paper: "var(--background-surface-default)",
  },
  divider: "var(--border-subtle)",
  action: {
    hover: "var(--interaction-hovered)",
    active: "var(--interaction-pressed)",
    disabled: "var(--background-disabled-default)",
    disabledBackground: "var(--background-disabled-default)",
    focus: "var(--border-focus)",
  },
};

export default config;
