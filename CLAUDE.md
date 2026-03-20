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

---

## Processus de création d'un composant

### 1. Extraction Figma

Récupérer les données du nœud via l'API Figma (fichier `YO9cW75K8aLcM5BbojZAqB`) :

```bash
curl -s -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/YO9cW75K8aLcM5BbojZAqB/nodes?ids=NODE_ID" \
  | python3 -m json.tool > node.json
```

Extraire :
- **Props/variantes** : noms des propriétés et valeurs possibles
- **Tailles** : dimensions (`absoluteBoundingBox`) et `cornerRadius` par variante
- **Couleurs** : `fills[].color` (RGB) → matcher dans `comete-tokens.css` pour trouver le bon token
- **Node IDs** des variantes représentatives (pour les stories Storybook)

Matcher les couleurs RGB aux tokens :
```bash
grep "#hexvalue" node_modules/.pnpm/@naxit+comete-design-tokens@*/node_modules/@naxit/comete-design-tokens/build/css/comete-tokens.css
```

### 2. Fichiers à créer

**`src/components/ComponentName/ComponentName.tsx`**
- `export function ComponentName(props): React.ReactElement` (forwardRef uniquement si ref nécessaire)
- Utiliser React Aria si le composant est interactif (`Button`, `ToggleButton`, etc.)
- Types exportés : `ComponentNameAppearance`, `ComponentNameSize`, `ComponentNameProps`
- JSDoc sur la fonction et les props non évidentes

**`src/components/ComponentName/ComponentName.module.css`**
- En-tête avec le nom du composant
- Zéro valeur hardcodée — uniquement `var(--token)`
- Structure : base → états (`[data-hovered]`, `[data-pressed]`, `[data-focus-visible]`, `[data-disabled]`, `[data-selected]`) → tailles → variantes d'apparence
- Overrides d'apparence sur taille : sélecteurs composés (`.rounded.medium`) plutôt que `!important`

**`src/components/ComponentName/ComponentName.test.tsx`**
- Couvrir : rendu de base, classes CSS par défaut, chaque prop, états, interactions, accessibilité
- Nommage : `"should [comportement] when [condition]"`
- CSS Modules en test = proxy identité → asserter sur le nom de classe brut (ex: `"medium"` pas `"ComponentName_medium__xxx"`)

**`src/components/ComponentName/index.ts`**
```ts
export { ComponentName } from "./ComponentName";
export type { ComponentNameProps, ComponentNameAppearance, ComponentNameSize } from "./ComponentName";
```

### 3. Brancher les exports

```ts
// src/components/index.ts
export * from "./ComponentName";
```

### 4. Validation

```bash
pnpm build    # TypeScript strict + génère dist/
pnpm test     # Tests unitaires
pnpm lint     # Zéro warning (root)
cd storybook && pnpm lint   # Zéro warning (storybook)
```

### 5. Story Storybook

Créer `storybook/stories/ComponentName.stories.tsx` :
- `meta` avec `argTypes` pour chaque prop contrôlable et `parameters.design` avec le node Figma du composant
- Chaque story lie son propre node Figma via `parameters.design`
- Stories couvrant : types de contenu, apparences, tailles, états (selected, disabled), interactif avec `play`
- Handler interactifs avec `fn()`, assertions avec `expect` dans les blocs `play`

```ts
// Pattern URL Figma réutilisable dans chaque fichier story
const FIGMA_FILE = "https://www.figma.com/design/YO9cW75K8aLcM5BbojZAqB/Com%C3%A8te-Design-System";
const figmaUrl = (nodeId: string) => `${FIGMA_FILE}?node-id=${nodeId.replace(":", "-")}`;
```

### 6. Commit et push

```bash
git add src/components/ComponentName/ src/components/index.ts storybook/stories/ComponentName.stories.tsx
git commit -m "feat(component-name): add ComponentName component"
git push origin main
```

---

### Distribution

Publication sur GitHub Packages (registry configuré dans `.npmrc`). Les apps consommatrices installent via `pnpm add @naxit/comete-design-system`.
