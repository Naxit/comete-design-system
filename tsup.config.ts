// import svgr from "esbuild-plugin-svgr";
import { defineConfig } from "tsup";

/**
 * Configuration for tsup
 * @see https://tsup.egoist.dev/
 */
export default defineConfig({
  // Fichiers d'entrée
  entry: ["src/**/index.ts"],
  // Dossier de sortie
  outDir: "dist",
  // Format des fichiers de sortie
  format: ["esm"],
  // Plugins à utiliser pour la compilation
  // esbuildPlugins: [svgr()],
  // Générer un fichier de déclaration de type
  dts: true,
  // splitting: false pour que chaque entry point soit un fichier indépendant
  // Cela permet aux bundlers des apps de faire du tree-shaking optimal
  splitting: false,
  // Générer un sourcemap pour faciliter le debugging
  sourcemap: true,
  // Supprime le dossier dist avant de construire
  clean: true,
  // treeshake: true pour éliminer le code mort au build
  treeshake: true,
  // minify: false pour laisser les apps consommatrices minifier
  // Cela permet un meilleur tree-shaking dans les apps
  minify: false,
  // keepNames: true pour préserver les noms de fonctions/classes
  // Important pour le debugging et certains outils
  keepNames: true,
  // Exclure les modules externes
  external: [
    /^@mui\/.*/,
    /^@emotion\/.*/,
    /^@hookform\/.*/,
    "lodash",
    "react",
    "react-dom",
    "react-router-dom",
    "react-hook-form",
    "yup",
  ],
});
