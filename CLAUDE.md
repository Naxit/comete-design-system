# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commandes essentielles

```bash
# Dépendances
pnpm install

# Build (génère dist/)
pnpm build

# Tests
pnpm test                # Lance une fois (vitest run)
pnpm test:watch          # Mode watch

# Lint & format
pnpm lint                # Vérification (zéro warning toléré)
pnpm lint:fix            # Auto-correction sur src/

# Storybook (catalogue de composants)
cd storybook && pnpm install && pnpm start  # → http://localhost:6006
# ou via Docker :
docker compose -f compose.dev.yml up        # → http://localhost:6060

# Nettoyage
pnpm clean
```

## Architecture

**Comète Design System** est une librairie React publiée sur GitHub Packages (`@naxit/comete-design-system`). Elle utilise React Aria (headless accessible) + CSS Modules + design tokens.

### Stack

- **React 18/19** + **TypeScript strict** (`strict: true`, `noUncheckedIndexedAccess`, `noUnusedLocals/Parameters`)
- **React Aria** (`react-aria-components`) — primitives accessibles headless
- **CSS Modules** — styling scopé, 100% design tokens, zéro valeur hardcodée
- **@naxit/comete-design-tokens** (peer dep) — CSS custom properties (primitives + semantic light/dark)
- **tsup** — bundler ESM uniquement, `splitting: false`. React, react-dom, react-aria-components sont externalisés
- **Vitest** + jsdom + @testing-library/react pour les tests
- **Storybook 10** dans `storybook/` (workspace pnpm séparé)

### Structure des sources (`src/`)

```
src/
├── components/          # Composants React
│   └── Button/          # Premier composant (React Aria + CSS Modules)
│       ├── Button.tsx
│       ├── Button.module.css
│       ├── Button.test.tsx
│       └── index.ts
├── providers/           # ThemeProvider (data-theme light/dark)
│   └── ThemeProvider/
├── hooks/               # useTheme
├── css-modules.d.ts     # Déclaration TS pour les imports .module.css
└── index.ts             # Entry point principal
```

### Points d'export (package.json `exports`)

- `.` → `src/index.ts` — export principal (composants + providers + hooks)
- `./components` → composants uniquement
- `./providers` → ThemeProvider
- `./hooks` → useTheme

### Thème

Le thème fonctionne via l'attribut `data-theme` sur `<html>` :
- `ThemeProvider` expose un contexte pour switcher light/dark
- `useTheme` retourne le mode actif et les fonctions de bascule
- Les CSS custom properties de `@naxit/comete-design-tokens` gèrent les couleurs via `:root` (light) et `[data-theme="dark"]`

### Conventions composants

Chaque composant suit la structure :
```
ComponentName/
├── ComponentName.tsx          # Composant (React Aria)
├── ComponentName.module.css   # Styles (100% tokens)
├── ComponentName.test.tsx     # Tests unitaires
└── index.ts                   # Export public
```

### Styling

- **Aucune valeur hardcodée** — tout passe par les CSS custom properties de `@naxit/comete-design-tokens`
- Les CSS Modules utilisent les data-attributes React Aria : `[data-hovered]`, `[data-pressed]`, `[data-focus-visible]`, `[data-disabled]`
- Build : `typed-css-modules` génère les `.d.ts` pour les imports CSS Modules avant tsup

### Tests

Tests unitaires avec Vitest + jsdom + @testing-library/react. Fichiers `.test.tsx` au même niveau que le fichier testé :

```bash
pnpm test                           # Tous les tests
pnpm test -- --reporter=verbose     # Mode verbose
```

### Distribution

Publication sur GitHub Packages (registry configuré dans `.npmrc`). Les apps consommatrices installent via `pnpm add @naxit/comete-design-system`.
