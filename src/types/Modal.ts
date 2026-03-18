import type { ModalProps as MuiModalProps } from "@mui/material/Modal";
import type { ReactNode } from "react";

export interface ModalProps extends Omit<MuiModalProps, "children"> {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  disablePadding?: boolean;
}
