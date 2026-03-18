import type { Components, Theme } from "@mui/material/styles";

/**
 * Surcharges du composant MuiTextField basées sur les design tokens
 */
export const MuiTextField: Components<Theme>["MuiTextField"] = {
  defaultProps: {
    variant: "outlined",
    size: "medium",
  },
};
