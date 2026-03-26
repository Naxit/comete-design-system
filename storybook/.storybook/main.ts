// This file has been automatically migrated to valid ESM format by Storybook.
import type { StorybookConfig } from "@storybook/react-vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-designs",
    "@storybook/addon-vitest",
    { name: "@chromatic-com/storybook", options: { projectId: "chpt_799181528a65f9d" } },
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
