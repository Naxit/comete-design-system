import { type ReactNode } from "react";

// ----------------------------------------------------------------------

interface SnackbarOptions {
  open: boolean;
  message: string;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  key: string;
  action?: ReactNode;
  autoHideDuration?: number | null;
  variant: "success" | "error" | "info" | "warning";
  snackBarElements?: ReactNode | null;
}

interface SnackbarState {
  messages: SnackbarOptions[];
  closeSnackbar: (key: string) => void;
  showError: (message: string, err?: Error) => string;
  showInfo: (message: string, options?: object) => string;
  showWarning: (message: string, options?: object) => string;
  showSuccess: (message: string, options?: object) => string;
}

// ----------------------------------------------------------------------

const defaultOptions: SnackbarOptions = {
  open: true,
  message: "",
  vertical: "top",
  horizontal: "right",
  key: "",
  action: null,
  autoHideDuration: 5000,
  variant: "info",
  snackBarElements: null,
};

const initialState: SnackbarState = {
  messages: [],
  closeSnackbar: () => {},
  showError: () => "",
  showInfo: () => "",
  showWarning: () => "",
  showSuccess: () => "",
};

// ----------------------------------------------------------------------

export { defaultOptions };
export type { SnackbarOptions, SnackbarState };
export default initialState;
