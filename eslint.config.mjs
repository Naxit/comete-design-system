// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import prettierPlugin from "eslint-plugin-prettier";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ----------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// ----------------------------------------------------------------------

export default [
  {
    ignores: ["node_modules", "dist", "build", "storybook/storybook-static", "coverage"],
  },

  // Use fixupConfigRules for extended configurations
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "plugin:react-hooks/recommended",
      "prettier"
    )
  ),

  // ----------------------------------------------------------------------

  {
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      "no-undef": "error",
    },
  },

  // Main configuration for TypeScript/React files
  {
    files: [
      "**/*.{ts,tsx}",
      "!storybook/.storybook/**/*",
      "!**/*.config.{ts,js,mjs}",
      "!**/*.setup.{ts,js}",
    ],
    plugins: {
      prettier: prettierPlugin,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11yPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "no-undef": "error",
      "no-use-before-define": [
        "error",
        {
          functions: true,
          classes: true,
          variables: true,
        },
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],

      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: false,
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "error",

      // Rules to detect unresolved types
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/no-unsafe-argument": "error",

      // Rule for type imports
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: true,
        },
      ],

      // General rules
      "no-console": "warn",
      curly: ["error", "all"],
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },

  // Configuration pour les fichiers de configuration (config/setup)
  {
    files: ["**/*.config.{ts,js,mjs}", "**/*.setup.{ts,js}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: false,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "no-console": "off",
      // TODO: Régler les règles qui nécessitent des informations de type
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
    },
  },

  // Configuration pour les fichiers de configuration Storybook (.storybook)
  {
    files: ["storybook/.storybook/**/*.{ts,tsx}"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "no-undef": "error",
      "no-console": "off",
      // TODO: Régler les règles qui nécessitent des informations de type
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: false,
      },
    },
  },

  // Configuration pour les fichiers stories
  {
    files: ["**/*.stories.tsx"],
    plugins: {
      prettier: prettierPlugin,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11yPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "no-undef": "error",
      "no-console": "off",
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },

  // Specific configuration for declaration files
  {
    files: ["**/*.{types.ts,d.ts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      // Specific rules for declaration files
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/no-empty-interface": "error",

      // General rules
      "no-undef": "error",
    },
  },

  // Main configuration for JavaScript/React files
  {
    files: ["**/*.{js,jsx,mjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "react-refresh": reactRefresh,
      prettier: prettierPlugin,
    },
  },

  // Configuration for commonjs files
  {
    files: ["**/*.{js,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "react-refresh": reactRefresh,
      prettier: prettierPlugin,
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  // ----------------------------------------------------------------------

  prettierConfig,
  ...storybook.configs["flat/recommended"],
];
