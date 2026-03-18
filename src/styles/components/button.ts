import type { Components, Theme } from "@mui/material/styles";

/**
 * Semantic token helpers — référence directe aux CSS custom properties
 * générées par @naxit/comete-design-tokens (architecture 2 niveaux).
 *
 * Usage: importer `@naxit/comete-design-tokens/css` dans le point d'entrée de l'app
 * pour que ces variables soient disponibles.
 */
const bg = {
  neutral: {
    subtler: {
      default: "var(--background-neutral-subtler-default)",
      hovered: "var(--background-neutral-subtler-hovered)",
      pressed: "var(--background-neutral-subtler-pressed)",
    },
    subtlest: {
      hovered: "var(--background-neutral-subtlest-hovered)",
      pressed: "var(--background-neutral-subtlest-pressed)",
    },
  },
  disabled: "var(--background-disabled-default)",
  brand: {
    bold: {
      default: "var(--background-brand-bold-default)",
      hovered: "var(--background-brand-bold-hovered)",
      pressed: "var(--background-brand-bold-pressed)",
    },
  },
  success: {
    bold: {
      default: "var(--background-success-bold-default)",
      hovered: "var(--background-success-bold-hovered)",
      pressed: "var(--background-success-bold-pressed)",
    },
  },
  critical: {
    bold: {
      default: "var(--background-critical-bold-default)",
      hovered: "var(--background-critical-bold-hovered)",
      pressed: "var(--background-critical-bold-pressed)",
    },
  },
  warning: {
    bold: {
      default: "var(--background-warning-bold-default)",
      hovered: "var(--background-warning-bold-hovered)",
      pressed: "var(--background-warning-bold-pressed)",
    },
  },
  information: {
    bold: {
      default: "var(--background-information-bold-default)",
      hovered: "var(--background-information-bold-hovered)",
      pressed: "var(--background-information-bold-pressed)",
    },
  },
} as const;

const text = {
  primary: "var(--text-primary)",
  inverted: "var(--text-inverted)",
  disabled: "var(--text-disabled)",
  link: {
    default: "var(--text-link-default)",
    hovered: "var(--text-link-hovered)",
    pressed: "var(--text-link-pressed)",
  },
} as const;

const icon = {
  default: "var(--icon-default)",
  inverted: "var(--icon-inverted)",
  disabled: "var(--icon-disabled)",
} as const;

const border = {
  focus: "var(--border-focus)",
  bold: "var(--border-bold)",
  default: "var(--border-default)",
  success: "var(--border-success)",
  critical: "var(--border-critical)",
  warning: "var(--border-warning)",
  information: "var(--border-information)",
} as const;

// Primitives (non thémés)
const radius = "var(--radius-0375)"; // Radius0375 = 3px
const gap = "var(--space-050)"; // Space050 = 4px
const spacing = {
  small: "var(--space-050)",   // 4px
  medium: "var(--space-100)",  // 8px
  large: "var(--space-150)",   // 12px
} as const;
const height = {
  small: "var(--size-300)",  // 24px
  medium: "var(--size-400)", // 32px
} as const;

/**
 * MuiButton component overrides using semantic design tokens (CSS custom properties)
 */
export const MuiButton: Components<Theme>["MuiButton"] = {
  defaultProps: {
    disableElevation: true,
  },
  styleOverrides: {
    root: {
      borderRadius: radius,
      gap: gap,
      textTransform: "none",
      fontWeight: 600,
      "&:focus-visible": {
        outline: `2px solid ${border.focus}`,
        outlineOffset: 2,
      },
    },

    // Size variants
    sizeSmall: {
      height: height.small,
      padding: `${spacing.small} ${spacing.medium}`,
    },
    sizeMedium: {
      height: height.medium,
      padding: `${spacing.medium} ${spacing.large}`,
    },
    sizeLarge: {
      padding: `${spacing.large} ${spacing.large}`,
    },

    // Contained variants
    contained: {
      backgroundColor: bg.neutral.subtler.default,
      color: text.primary,
      "&:hover": {
        backgroundColor: bg.neutral.subtler.hovered,
      },
      "&:active": {
        backgroundColor: bg.neutral.subtler.pressed,
      },
      "&.Mui-disabled": {
        backgroundColor: bg.disabled,
        color: text.disabled,
      },
      "& .MuiButton-startIcon, & .MuiButton-endIcon": {
        color: icon.default,
      },
      "&.Mui-disabled .MuiButton-startIcon, &.Mui-disabled .MuiButton-endIcon": {
        color: icon.disabled,
      },
    },
    containedPrimary: {
      backgroundColor: bg.brand.bold.default,
      color: text.inverted,
      "&:hover": {
        backgroundColor: bg.brand.bold.hovered,
      },
      "&:active": {
        backgroundColor: bg.brand.bold.pressed,
      },
      "&.Mui-disabled": {
        backgroundColor: bg.disabled,
        color: text.disabled,
      },
      "& .MuiButton-startIcon, & .MuiButton-endIcon": {
        color: icon.inverted,
      },
    },
    containedSecondary: {
      backgroundColor: bg.neutral.subtler.default,
      color: text.primary,
      "&:hover": {
        backgroundColor: bg.neutral.subtler.hovered,
      },
      "&:active": {
        backgroundColor: bg.neutral.subtler.pressed,
      },
    },
    containedSuccess: {
      backgroundColor: bg.success.bold.default,
      color: text.inverted,
      "&:hover": {
        backgroundColor: bg.success.bold.hovered,
      },
      "&:active": {
        backgroundColor: bg.success.bold.pressed,
      },
      "&.Mui-disabled": {
        backgroundColor: bg.disabled,
        color: text.disabled,
      },
    },
    containedError: {
      backgroundColor: bg.critical.bold.default,
      color: text.inverted,
      "&:hover": {
        backgroundColor: bg.critical.bold.hovered,
      },
      "&:active": {
        backgroundColor: bg.critical.bold.pressed,
      },
      "&.Mui-disabled": {
        backgroundColor: bg.disabled,
        color: text.disabled,
      },
    },
    containedWarning: {
      backgroundColor: bg.warning.bold.default,
      color: text.inverted,
      "&:hover": {
        backgroundColor: bg.warning.bold.hovered,
      },
      "&:active": {
        backgroundColor: bg.warning.bold.pressed,
      },
      "&.Mui-disabled": {
        backgroundColor: bg.disabled,
        color: text.disabled,
      },
    },
    containedInfo: {
      backgroundColor: bg.information.bold.default,
      color: text.inverted,
      "&:hover": {
        backgroundColor: bg.information.bold.hovered,
      },
      "&:active": {
        backgroundColor: bg.information.bold.pressed,
      },
      "&.Mui-disabled": {
        backgroundColor: bg.disabled,
        color: text.disabled,
      },
    },

    // Outlined variants
    outlined: {
      borderColor: border.bold,
      color: text.primary,
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: bg.neutral.subtler.default,
        borderColor: border.bold,
      },
      "&:active": {
        backgroundColor: bg.neutral.subtler.hovered,
      },
      "&.Mui-disabled": {
        backgroundColor: bg.disabled,
        color: text.disabled,
      },
      "& .MuiButton-startIcon, & .MuiButton-endIcon": {
        color: icon.default,
      },
    },
    outlinedPrimary: {
      borderColor: border.information,
      color: text.link.default,
      "&:hover": {
        backgroundColor: bg.neutral.subtler.default,
        borderColor: border.information,
      },
      "&:active": {
        backgroundColor: bg.neutral.subtler.hovered,
      },
    },
    outlinedSuccess: {
      borderColor: border.success,
      color: text.primary,
      "&:hover": {
        backgroundColor: bg.neutral.subtler.default,
        borderColor: border.success,
      },
      "&:active": {
        backgroundColor: bg.neutral.subtler.hovered,
      },
    },
    outlinedError: {
      borderColor: border.critical,
      color: text.primary,
      "&:hover": {
        backgroundColor: bg.neutral.subtler.default,
        borderColor: border.critical,
      },
      "&:active": {
        backgroundColor: bg.neutral.subtler.hovered,
      },
    },
    outlinedWarning: {
      borderColor: border.warning,
      color: text.primary,
      "&:hover": {
        backgroundColor: bg.neutral.subtler.default,
        borderColor: border.warning,
      },
      "&:active": {
        backgroundColor: bg.neutral.subtler.hovered,
      },
    },
    outlinedInfo: {
      borderColor: border.information,
      color: text.link.default,
      "&:hover": {
        backgroundColor: bg.neutral.subtler.default,
        borderColor: border.information,
      },
      "&:active": {
        backgroundColor: bg.neutral.subtler.hovered,
      },
    },

    // Text (subtle) variants
    text: {
      color: text.primary,
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: bg.neutral.subtler.hovered,
      },
      "&:active": {
        backgroundColor: bg.neutral.subtler.pressed,
      },
      "&.Mui-disabled": {
        color: text.disabled,
      },
      "& .MuiButton-startIcon, & .MuiButton-endIcon": {
        color: icon.default,
      },
    },
    textPrimary: {
      color: text.link.default,
      "&:hover": {
        color: text.link.hovered,
        backgroundColor: bg.neutral.subtler.hovered,
      },
      "&:active": {
        color: text.link.pressed,
        backgroundColor: bg.neutral.subtler.pressed,
      },
    },
  },
};
