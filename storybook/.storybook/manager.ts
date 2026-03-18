import { addons } from "storybook/manager-api";
import { customTheme } from "./customTheme";

/**
 * Storybook manager configuration
 */
addons.setConfig({
  theme: customTheme,
});
