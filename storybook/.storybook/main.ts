import type { StorybookConfig } from "@storybook/react-vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

// ----------------------------------------------------------------------

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
      // Configurer le dossier public pour servir les fichiers statiques
      publicDir: resolve(__dirname, "../../public"),
      resolve: {
        alias: {
          "@": resolve(__dirname, "../../src"),
          "@aexae/design-system": resolve(__dirname, "../../src"),
        },
        // Évite les doublons de React entre Storybook et les composants
        dedupe: [
          "@emotion/react",
          "@emotion/styled",
          "@mui/icons-material",
          "@mui/material",
          "@mui/utils",
          "@mui/x-date-pickers",
          "react",
          "react-dom",
        ],
      },
      // Optimize MDX processing
      // optimizeDeps: {
      //   exclude: ["@storybook/blocks"],
      // },
    });
  },
};

// ----------------------------------------------------------------------

export default config;
