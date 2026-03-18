import { useContext } from "react";
import { SnackbarContext } from "./SnackbarContext";
import type { SnackbarState } from "./snackbarInitialState";

// ----------------------------------------------------------------------

export const useSnackbar = (): SnackbarState => useContext(SnackbarContext);
