import { forwardRef } from "react";
import MuiTextField from "@mui/material/TextField";
import type { TextFieldProps } from "../../types/TextField";

/**
 * Composant TextField basé sur MUI TextField.
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  return <MuiTextField inputRef={ref} {...props} />;
});

TextField.displayName = "TextField";
