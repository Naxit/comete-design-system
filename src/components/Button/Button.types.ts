import type * as React from "react";
import type { SxProps } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import type { ButtonProps as MuiButtonProps } from "@mui/material/Button";

export type ButtonProps = MuiButtonProps;

export type ButtonGroupProps = {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};
