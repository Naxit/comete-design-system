import { defineConfig } from "tsup";

/**
 * Comète Design System — build config
 * @see https://tsup.egoist.dev/
 */
export default defineConfig({
  entry: ["src/**/index.ts"],
  outDir: "dist",
  format: ["esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  keepNames: true,
  external: ["react", "react-dom", "react-aria-components"],
});
