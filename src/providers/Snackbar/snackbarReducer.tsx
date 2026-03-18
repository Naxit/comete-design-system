import type { SnackbarOptions, SnackbarState } from "./snackbarInitialState";

// ----------------------------------------------------------------------

type ActionType =
  | { type: "OPEN_SNACKBAR"; payload: SnackbarOptions }
  | { type: "CLOSE_SNACKBAR"; payload: { key: string } };

// ----------------------------------------------------------------------

const reducer = (state: SnackbarState, actionRedux: ActionType) => {
  const { type } = actionRedux;

  switch (type) {
    case "OPEN_SNACKBAR": {
      const {
        message,
        vertical,
        horizontal,
        key,
        action,
        autoHideDuration,
        variant,
        snackBarElements,
      } = actionRedux.payload;

      return {
        ...state,
        messages: [
          ...state.messages,
          {
            open: true,
            message,
            vertical,
            horizontal,
            key,
            action,
            autoHideDuration,
            variant,
            snackBarElements,
          },
        ],
      };
    }

    case "CLOSE_SNACKBAR": {
      const { key } = actionRedux.payload;

      return {
        ...state,
        messages: state.messages.filter((snackbar) => snackbar.key !== key),
      };
    }

    default:
      throw new Error(`SnackbarProvider : action ${type} non reconnue`);
  }
};

// ----------------------------------------------------------------------

export default reducer;
