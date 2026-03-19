# @naxit/comete-design-system v1.0.0-alpha.1 — Première release

La première brique du design system Comète : une bibliothèque de composants React accessibles, thémables et entièrement pilotés par des design tokens.

> ⚠️ **Alpha** — L'API des composants peut encore évoluer. Le catalogue va s'enrichir progressivement.

## Ce que contient cette release

### Composants

**Button** — Composant principal avec une couverture complète des cas d'usage :

```tsx
import { Button } from "@naxit/comete-design-system";

<Button variant="contained" color="brand">Valider</Button>
<Button variant="outlined" color="critical" size="small">Supprimer</Button>
<Button variant="link" iconStart={<ChevronRight />}>Voir plus</Button>
```

- 5 variants : `contained`, `outlined`, `subtle`, `link`, `link-subtle`
- 6 couleurs sémantiques : `default`, `brand`, `success`, `critical`, `warning`, `information`
- 3 tailles : `small`, `medium`, `large`
- Support des icônes (start/end) via `@naxit/comete-icons`
- États : hover, pressed, focus-visible, disabled

### Providers & Hooks

- **ThemeProvider** — Gestion du light/dark mode via `data-theme` sur le DOM
- **useTheme** — Hook pour accéder au thème courant et le basculer

```tsx
import { ThemeProvider } from "@naxit/comete-design-system";

<ThemeProvider defaultTheme="light">
  <App />
</ThemeProvider>
```

## Architecture

- **React Aria** — Chaque composant repose sur les primitives headless de React Aria pour une accessibilité native (ARIA, clavier, focus management)
- **CSS Modules** — Styles scopés, zéro valeur hardcodée, tout passe par les tokens
- **100% token-driven** — Les couleurs, espacements et typographies proviennent exclusivement de `@naxit/comete-design-tokens`
- **Styling par data-attributes** — `data-hovered`, `data-pressed`, `data-focus-visible`, `data-disabled`

## Stack technique

- React 18/19, TypeScript strict, ESM uniquement
- React Aria Components pour l'accessibilité
- CSS Modules pour le styling
- tsup pour le build
- Vitest + Testing Library pour les tests
- Storybook 10 pour le catalogue de composants

## Utilisation

```bash
pnpm add @naxit/comete-design-system @naxit/comete-design-tokens
```

```tsx
import { Button, ThemeProvider } from "@naxit/comete-design-system";
import "@naxit/comete-design-tokens/build/css/comete-tokens.css";

function App() {
  return (
    <ThemeProvider>
      <Button variant="contained" color="brand">
        Commencer
      </Button>
    </ThemeProvider>
  );
}
```

## Écosystème

Ce package est le consommateur principal de `@naxit/comete-design-tokens` (theming + styles) et `@naxit/comete-icons` (icônes dans les composants). Les trois packages forment ensemble la base de l'écosystème Comète.
