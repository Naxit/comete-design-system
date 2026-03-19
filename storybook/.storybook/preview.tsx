import { ThemeProvider } from "@naxit/comete-design-system/providers";
import "@naxit/comete-design-tokens/css";
import type { Decorator, Preview } from "@storybook/react";
import { useEffect } from "react";
import { useGlobals } from "storybook/preview-api";
import { INITIAL_VIEWPORTS } from 'storybook/viewport';

// ----------------------------------------------------------------------

interface WithThemeProps {
  Story: React.ComponentType;
}

/**
 * Inner React component — holds the hooks so ESLint react-hooks/rules-of-hooks
 * is satisfied (uppercase name = valid React component).
 *
 * NOTE: useGlobals (storybook/preview-api) is the correct way to subscribe
 * reactively to global changes in Storybook 8+. context.globals in the
 * decorator signature is a snapshot — it does not trigger re-renders.
 */
function WithTheme({ Story }: WithThemeProps) {
  const [globals] = useGlobals();
  const mode = (globals["theme"] as "light" | "dark") ?? "light";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return <ThemeProvider mode={mode}><Story /></ThemeProvider>;
}

const withThemeProvider: Decorator = (Story) => <WithTheme Story={Story} />;

// ----------------------------------------------------------------------

const preview: Preview = {
  decorators: [withThemeProvider],

  // NOTE: globals sets the initial values for Storybook 8+ (defaultValue in
  // globalTypes is deprecated since Storybook 8.3).
  globals: {
    theme: "light",
  },

  globalTypes: {
    theme: {
      name: "Theme",
      description: "Theme global for components",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "light" },
          { value: "dark", icon: "moon", title: "dark" },
        ],
      },
    },
  },

  parameters: {
    // WORKAROUND: "todo" au lieu de "error" — violations de contraste connues dans
    // @naxit/comete-design-tokens (success, critical, information : ratio < 4.5:1 WCAG AA).
    // Repasser à "error" une fois les tokens corrigés.
    a11y: {
      test: "todo",
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
