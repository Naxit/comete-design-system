import { createTheme } from "@mui/material/styles";
import { createContext } from "react";
import type { ThemeContextType, ThemeMode } from "./ThemeContext.types";

/**
 * Theme context
 */
export const initialState: ThemeContextType = {
  mode: localStorage.getItem("theme") || "dark",
  theme: createTheme(),
  toggleTheme: () => {},
  setMode: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(initialState);

/**
 * Theme reducer
 * @param state - Theme context
 * @param action - Theme action
 * @returns Theme context
 */
type ActionType = { type: "SET_MODE"; payload: ThemeMode };

export const themeReducer = (state: ThemeContextType, action: ActionType) => {
  switch (action.type) {
    case "SET_MODE":
      localStorage.setItem("theme", action.payload);

      return { ...state, mode: action.payload };

    default:
      throw new Error(`themeReducer : action ${action.type} non reconnue`);
  }
};
