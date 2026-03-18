import type { Components, Theme } from "@mui/material/styles";
import { MuiButton } from "./button";
import { MuiTextField } from "./textField";

/**
 * Components configuration
 * @see https://mui.com/material-ui/customization/theme-components/#theme-style-overrides
 */
const config: Components<Theme> = {
  MuiUseMediaQuery: {
    defaultProps: {
      noSsr: true,
    },
  },

  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
      },
    },
  },

  MuiAlert: {
    styleOverrides: {
      action: {
        marginRight: "0 !important",
      },
      message: {
        alignItems: "center",
        alignContent: "center",
      },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        boxShadow: "1px 1px 3px -1px rgba(0, 0, 0, 0.2), 1px 1px 3px 1px rgba(0, 0, 0, 0.12)",
        borderRadius: "8px",
      },
    },
  },

  MuiChip: {
    styleOverrides: {
      root: {
        width: "fit-content",
      },
      label: {
        fontWeight: 600,
      },
    },
  },

  MuiCardHeader: {
    styleOverrides: {
      root: {
        padding: "16px 16px 8px 16px",
      },
    },
  },

  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: "8px 16px 16px 16px",
        "&:last-child": {
          paddingBottom: 16,
        },
      },
    },
  },

  MuiAvatar: {
    styleOverrides: {
      colorDefault: {
        backgroundColor: "#5965b0",
      },
      rounded: {
        borderRadius: "8px",
      },
    },
  },

  MuiStack: {
    styleOverrides: {
      root: {
        width: "100%",
        backgroundColor: "transparent !important",
      },
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: {
        width: "100%",
      },
    },
  },

  // Button with design tokens
  MuiButton,

  // TextField with design tokens
  MuiTextField,

  MuiTypography: {
    styleOverrides: {
      root: {
        overflowWrap: "anywhere",
        whiteSpace: "break-spaces",
      },
    },
  },
};

// ----------------------------------------------------------------------

export default config;
