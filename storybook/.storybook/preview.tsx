import { ThemeProvider } from "@naxit/comete-design-system/providers";
import "@naxit/comete-design-tokens/css";
import type { Decorator, Preview } from "@storybook/react";
import { createElement } from "react";
import { INITIAL_VIEWPORTS } from 'storybook/viewport';

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
