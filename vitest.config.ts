// Configuration Vitest pour les tests unitaires du design system
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test.setup.ts"],
    globals: true,
    css: {
      modules: {
        // Désactive le hash des classes CSS Modules en test pour des assertions prévisibles
        classNameStrategy: "non-scoped",
      },
    },
  },
});
