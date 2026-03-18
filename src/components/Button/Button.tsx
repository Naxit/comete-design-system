import MuiButton from "@mui/material/Button";
import { forwardRef } from "react";
import type { ButtonProps } from "./Button.types";

/**
 * Button component based on MUI Button.
 * Styles are applied via the theme overrides in src/styles/components/button.ts
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, disabled, children, ...props }, ref) => {
    return (
      <MuiButton
        ref={ref}
        disableElevation
        disabled={disabled ?? loading ?? false}
        loading={loading ?? false}
        {...props}
      >
        {children}
      </MuiButton>
    );
  }
);

Button.displayName = "Button";
