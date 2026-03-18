import type { StorybookConfig } from "@storybook/react-vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    return mergeConfig(config, {
      publicDir: resolve(__dirname, "../../public"),
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
