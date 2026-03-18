import type { TypographyVariantsOptions } from "@mui/material/styles";

/**
 * Typography configuration
 * @see https://mui.com/material-ui/customization/typography
 */
const config: TypographyVariantsOptions = {
  fontFamily: `"Poppins", "Roboto", "Helvetica", "Arial", sans-serif`,

  h1: {
    fontSize: "2rem",
    fontWeight: 400,
    opacity: 0.9,
  },
  h2: {
    fontSize: "1.875rem",
    fontWeight: 400,
    opacity: 0.8,
  },
  h3: {
    fontSize: "1.75rem",
    fontWeight: 300,
    opacity: 0.8,
  },
  h4: {
    fontSize: "1.5rem",
    fontWeight: 300,
  },
  h5: {
    fontSize: "1.325rem",
    fontWeight: 300,
  },
  h6: {
    fontSize: "1.25rem",
    fontWeight: 300,
  },
  subtitle1: {
    fontSize: "1rem",
  },
  subtitle2: {
    fontSize: "0.938rem",
  },
  body1: {
    fontSize: "1rem",
  },
  body2: {
    fontSize: "0.938rem",
  },
  caption: {
    fontSize: "0.875rem",
  },
  button: {
    fontSize: "1rem",
    fontWeight: 500,
  },
};

// ----------------------------------------------------------------------

export default config;
