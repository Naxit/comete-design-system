import type { StorybookConfig } from "@storybook/react-vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-designs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    { name: "@chromatic-com/storybook", options: { projectId: "693ad068fa0b790fc9c6441c" } },
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    return mergeConfig(config, {
      resolve: {
        alias: {
          "@": resolve(__dirname, "../../src"),
          "@naxit/comete-design-system": resolve(__dirname, "../../src"),
        },
        dedupe: ["react", "react-dom"],
      },
    });
  },
};

export default config;
