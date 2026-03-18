import uniqueId from "lodash/uniqueId";
import { useCallback, useMemo, useReducer, type ReactNode } from "react";

import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Slide, { type SlideProps } from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";

import { SnackbarContext } from "./SnackbarContext";
import snackbarInitialState, { defaultOptions, type SnackbarOptions } from "./snackbarInitialState";
import snackbarReducer from "./snackbarReducer";

// ----------------------------------------------------------------------

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction="down" />;
};

// ----------------------------------------------------------------------

interface SnackbarProviderProps {
  children: ReactNode;
  preventDuplicate?: boolean;
}

/**
 * @see https://mui.com/material-ui/react-snackbar
 */
export const SnackbarProvider = ({ children, preventDuplicate = false }: SnackbarProviderProps) => {
  const [state, dispatch] = useReducer(snackbarReducer, snackbarInitialState);

  // ----------------------------------------------------------------------

  const closeSnackbar = useCallback(
    (key: string) => {
      dispatch({ type: "CLOSE_SNACKBAR", payload: { key } });
    },
    [dispatch]
  );

  const showSnackbar = useCallback(
    (message: string, options: Partial<SnackbarOptions> = defaultOptions) => {
      const key = options.key ?? uniqueId();
      const isExist = state.messages.find((item) => item.message === message);

      if (preventDuplicate && isExist) {
        return key;
      }

      const payload = {
        ...defaultOptions,
        message,
        key,
        ...options,
      };

      dispatch({ type: "OPEN_SNACKBAR", payload });

      return key;
    },
    [preventDuplicate, state.messages]
  );

  const showError = useCallback(
    (message: string, err?: Error): string => {
      // TODO: Déduire le type de l'erreur et afficher le message
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err); // TODO: Faire appel à Sentry ?
      }

      return showSnackbar(message, { variant: "error" });
    },
    [showSnackbar]
  );

  const showInfo = useCallback(
    (message: string, options: object = {}): string => {
      return showSnackbar(message, { variant: "info", ...options });
    },
    [showSnackbar]
  );

  const showWarning = useCallback(
    (message: string, options: object = {}): string => {
      return showSnackbar(message, { variant: "warning", ...options });
    },
    [showSnackbar]
  );

  const showSuccess = useCallback(
    (message: string, options: object = {}): string => {
      return showSnackbar(message, { variant: "success", ...options });
    },
    [showSnackbar]
  );

  // ----------------------------------------------------------------------

  const contextValue = useMemo(
    () => ({
      ...state,
      showSnackbar,
      closeSnackbar,
      showError,
      showInfo,
      showWarning,
      showSuccess,
    }),
    [state, closeSnackbar, showError, showInfo, showSnackbar, showSuccess, showWarning]
  );

  // ----------------------------------------------------------------------

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}

      {state.messages.map((item) => {
        const alertAction = (
          <>
            {item.action}

            <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => closeSnackbar(item.key)}>
              <CloseIcon />
            </IconButton>
          </>
        );

        let alertContent = null;

        if (item.snackBarElements) {
          alertContent = item.snackBarElements;
        } else {
          alertContent = <Typography variant="body1">{item.message}</Typography>;
        }

        return (
          <Snackbar
            open={item.open}
            key={item.key}
            autoHideDuration={item.autoHideDuration}
            onClose={() => closeSnackbar(item.key)}
            slots={{ transition: SlideTransition }}
            anchorOrigin={{
              vertical: item.vertical,
              horizontal: item.horizontal,
            }}
            sx={{
              position: "absolute",
              top: "55px",
              width: { xs: "100%", sm: "80%", md: "50%" },
            }}
          >
            <Alert
              onClose={() => closeSnackbar(item.key)}
              action={alertAction}
              severity={item.variant}
              variant="filled"
              sx={{
                width: "100%",
                ".MuiAlert-icon": { alignItems: "center" },
                ".MuiAlert-action": {
                  alignItems: "center",
                  marginRight: "0.85rem",
                },
              }}
            >
              {alertContent}
            </Alert>
          </Snackbar>
        );
      })}
    </SnackbarContext.Provider>
  );
};
