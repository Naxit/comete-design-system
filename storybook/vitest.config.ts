// Vitest config pour les tests de stories — distinct du vitest.config.ts racine (tests unitaires).
// storybookTest() charge la config Vite de .storybook/main.ts, incluant les alias et plugins React.
// Browser Mode requis par @storybook/addon-vitest 10.3+ (pas de support jsdom).
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    storybookTest({
      configDir: join(__dirname, ".storybook"),
    }),
  ],
  test: {
    name: "storybook",
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
    },
    setupFiles: ["./.storybook/vitest.setup.ts"],
    // La coverage n'est pas applicable aux story tests (browser mode) — désactivée explicitement
    // pour éviter que l'addon-vitest ne tente de charger @vitest/coverage-v8.
    coverage: {
      enabled: false,
    },
  },
});
