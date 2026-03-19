# @naxit/comete-design-system

Design system Comète — composants React accessibles, thémables et 100% pilotés par des design tokens.

## Installation

```bash
pnpm add @naxit/comete-design-system @naxit/comete-design-tokens
```

## Utilisation

```tsx
import { Button, ThemeProvider } from "@naxit/comete-design-system";
import { Lock } from "@naxit/comete-icons";
import "@naxit/comete-design-tokens/css";

function App() {
  return (
    <ThemeProvider mode="light">
      <Button variant="contained" color="brand" iconBefore={<Lock />}>
        Connexion
      </Button>
    </ThemeProvider>
  );
}
```

## Composants

### Button

```tsx
<Button variant="contained" color="brand">Valider</Button>
<Button variant="outlined" color="critical" size="small">Supprimer</Button>
<Button variant="link" color="information" iconAfter={<ChevronRight />}>Voir plus</Button>
```

- **Variants** : `contained`, `outlined`, `subtle`, `link`, `link-subtle`
- **Couleurs** : `default`, `brand`, `success`, `critical`, `warning`, `information`
- **Tailles** : `small`, `medium`, `large`
- **Icônes** : `iconBefore` / `iconAfter` — couleur automatiquement résolue selon variant + color
- **Accessibilité** : React Aria (ARIA, clavier, focus management)

### ThemeProvider & useTheme

```tsx
import { ThemeProvider, useTheme } from "@naxit/comete-design-system";

// Provider
<ThemeProvider mode="light">
  <App />
</ThemeProvider>

// Hook
const { mode, toggleTheme, setMode } = useTheme();
```

Gère le light/dark mode via l'attribut `data-theme` sur `<html>`, synchronisé avec les CSS custom properties de `@naxit/comete-design-tokens`.

## Points d'entrée

| Import | Contenu |
|---|---|
| `@naxit/comete-design-system` | Tout (composants + providers + hooks) |
| `@naxit/comete-design-system/components` | Composants uniquement |
| `@naxit/comete-design-system/providers` | ThemeProvider |
| `@naxit/comete-design-system/hooks` | useTheme |

## Développement

```bash
pnpm install
pnpm build              # Build ESM dans dist/
pnpm test               # Tests unitaires (Vitest)
pnpm lint               # Lint strict (zéro warning)
```

### Storybook

```bash
cd storybook && pnpm install && pnpm start   # → http://localhost:6006
```

20 stories pour le Button avec tests d'interaction intégrés. Lien Figma via `@storybook/addon-designs`.

## Architecture

- **React Aria Components** — Accessibilité native headless
- **CSS Modules** — Styles scopés, zéro valeur hardcodée
- **100% token-driven** — Toutes les valeurs visuelles proviennent de `@naxit/comete-design-tokens`
- **tsup** — Bundle ESM, code splitting, tree-shaking

## Stack

- React 18/19, TypeScript strict, ESM uniquement
- React Aria Components ^1.16.0
- CSS Modules + typed-css-modules
- tsup, Vitest, Storybook 10

## Écosystème

Ce package consomme `@naxit/comete-design-tokens` (theming + styles) et `@naxit/comete-icons` (icônes dans les composants). Les trois packages forment la base de l'écosystème Comète.

## Licence

MIT
