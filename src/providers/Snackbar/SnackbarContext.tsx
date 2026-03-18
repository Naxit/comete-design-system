import { createContext } from "react";
import snackbarInitialState from "./snackbarInitialState";

// ----------------------------------------------------------------------

export const SnackbarContext = createContext(snackbarInitialState);
