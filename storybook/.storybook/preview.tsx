import { ThemeProvider } from "@naxit/comete-design-system/providers";
import "@naxit/comete-design-tokens/css";
import type { Decorator, Preview } from "@storybook/react";
import { createElement } from "react";

/**
 * Decorator — wraps all stories with ThemeProvider + tokens CSS.
 */
const withThemeProvider: Decorator = (Story, context) => {
  const { theme } = context.globals as { theme: "light" | "dark" };

  return <ThemeProvider mode={theme}>{createElement(Story)}</ThemeProvider>;
};

const preview: Preview = {
  decorators: [withThemeProvider],

  globalTypes: {
    theme: {
      name: "Theme",
      description: "Theme global for components",
      defaultValue: "light",

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
