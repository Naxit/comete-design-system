# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commandes essentielles

```bash
# Dépendances
pnpm install

# Build (génère dist/ + .tgz)
pnpm build

# Tests
pnpm test                # Lance une fois
pnpm test:watch          # Mode watch
pnpm test:coverage       # Coverage + rapport HTML

# Lint & format
pnpm lint                # Vérification (zéro warning toléré)
pnpm lint:fix            # Auto-correction sur src/

# Storybook (catalogue de composants)
pnpm docker              # Via Docker → http://localhost:6060
# ou sans Docker :
cd storybook && pnpm install && pnpm start  # → http://localhost:6006

# Nettoyage
pnpm clean
```

## Architecture

**Comète Design System** est une librairie React publiée sur GitHub Packages (`@naxit/comete-design-system`). Elle wrape Material-UI (MUI 6/7) et expose des composants type-safe, un système de thème, et des providers.

### Stack

- **React 18/19** + **TypeScript strict** (`strict: true`, `noUncheckedIndexedAccess`, `noUnusedLocals/Parameters`)
- **MUI** (peer dep) — les composants MUI sont customisés via theme overrides dans `src/styles/`
- **react-hook-form** + **yup** — uniquement pour le composant Form
- **tsup** — bundler ESM uniquement, `splitting: false`. MUI, Emotion, React, lodash sont externalisés (pas bundlés)
- **Jest** + `ts-jest` + jsdom pour les tests
- **Storybook** dans `storybook/` (workspace pnpm séparé)

### Structure des sources (`src/`)

```
src/
├── components/    # Composants React (Button, Form, Table, Modal, etc.)
├── styles/        # Thème MUI : palette light/dark, typographie, overrides
│   ├── palette/
│   ├── typography/
│   ├── components/  # MUI component overrides (button.ts, textField.ts…)
│   ├── theme/       # createTheme MUI
│   └── ThemeProvider/ + useTheme/
├── providers/     # SnackbarProvider + useSnackbar
├── hooks/         # useBreakpoints
├── types/         # Types partagés (Form, Table, Button, etc.) via alias @types/*
├── utils/         # particleVowels.ts, getComparator.ts (chacun avec son .test.ts)
└── index.ts       # Entry point principal
```

### Points d'export (package.json `exports`)

- `.` → `src/index.ts` — export principal
- `./components` → composants uniquement
- `./styles` → `ThemeProvider`, `useTheme`, `dark`, `light`

### Composant Form

Pièce centrale du design system. API entièrement déclarative + type-safe :

```typescript
// Créer un champ typé
const myField = createFormField<DataType, typeof TextField>({
  name: "fieldName",
  component: TextField,
  props: { label: "..." }
})

// Configurer le formulaire
const config: FormConfig<DataType> = {
  defaultValues: { ... },
  fields: [myField],
  yupRules: (yup) => yup.object().shape({ ... }),
  buttons: { submit: { component: Button, props: { ... } } },
  onValid: async (data) => { ... }
}

<Form config={config} />
```

Détails complets dans `src/components/Form/README.md`.

### Thème

Le thème MUI se construit dans `src/styles/theme/index.ts` en combinant :
- `src/styles/palette/light.ts` ou `dark.ts`
- `src/styles/typography/`
- `src/styles/components/` (overrides MUI par composant)

`ThemeProvider` expose un contexte permettant de switcher light/dark. `useTheme` retourne le mode actif.

### Conventions composants

Chaque composant suit la structure :
```
ComponentName/
├── ComponentName.tsx
├── ComponentName.types.ts   # si types complexes
├── index.ts                 # export public
```

Les stories Storybook correspondantes sont dans `storybook/stories/`.

### Tests

Tests unitaires avec Jest + jsdom. Fichiers `.test.ts` au même niveau que le fichier testé. Pour tester un fichier spécifique :

```bash
pnpm test -- --testPathPattern="getComparator"
```

### Distribution

Le build produit un `.tgz` installable localement. La publication se fait sur GitHub Packages (registry configuré dans `.npmrc`). Les apps consommatrices installent via `pnpm add @naxit/comete-design-system`.
