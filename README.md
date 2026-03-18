## @naxit/comete-design-system

**Design system Comète** pour applications React basées sur **MUI**.  
Ce package fournit :

- **components** : formulaires, providers, etc.
- **styles** : thème MUI Comète (clair/sombre), typographie, palette.
- **hooks** et **utils** : helpers autour du thème, des breakpoints, etc.

---

## Installation

### Prérequis

- **Node** `>= 20`
- Gestionnaire de packages : **pnpm** (recommandé), ou npm / yarn
- Projet React avec :
  - `react` `^18 || ^19`
  - `react-dom` `^18 || ^19`
  - `@mui/material`, `@mui/icons-material`, `@mui/utils`, `@mui/x-date-pickers`
  - `@emotion/react`, `@emotion/styled`
  - `react-router-dom` `^6 || ^7`

Ces dépendances sont déclarées en **peerDependencies** dans `@naxit/comete-design-system` et doivent être présentes dans l’application consommatrice.

### Installation dans une application

Avec **pnpm** :

```bash
pnpm add @naxit/comete-design-system
```

Avec **npm** :

```bash
npm install @naxit/comete-design-system
```

Avec **yarn** :

```bash
yarn add @naxit/comete-design-system
```

---

## Utilisation de base dans une application React

### 1. Mise en place du thème et des providers

Le thème MUI Comète est exposé via le sous‑module `styles`.  
Un setup minimal d’application peut ressembler à ceci :

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@naxit/comete-design-system/styles";
import { SnackbarProvider } from "@naxit/comete-design-system";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
```

Vous pouvez ensuite utiliser :

- `useTheme` depuis `@naxit/comete-design-system/styles` pour accéder au thème Comète.
- `useSnackbar` depuis `@naxit/comete-design-system` pour afficher des notifications.

### 2. Utiliser le composant de formulaire

Le repo contient un composant `Form` très complet (déclaratif, type‑safe, basé sur `react-hook-form` + `yup`).  
Exemple minimal (simplifié, voir `src/components/Form/README.md` pour le détail complet) :

```tsx
import { Form, createFormField, type FormConfig } from "@naxit/comete-design-system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type LoginData = {
  email: string;
  password: string;
};

const loginConfig: FormConfig<LoginData> = {
  defaultValues: {
    email: "",
    password: "",
  },
  fields: [
    createFormField<LoginData, typeof TextField>({
      name: "email",
      component: TextField,
      props: {
        label: "Email",
        type: "email",
        fullWidth: true,
      },
    }),
    createFormField<LoginData, typeof TextField>({
      name: "password",
      component: TextField,
      props: {
        label: "Mot de passe",
        type: "password",
        fullWidth: true,
      },
    }),
  ],
  yupRules: (yup) =>
    yup.object().shape({
      email: yup.string().email("Email invalide").required("L'email est requis"),
      password: yup.string().required("Le mot de passe est requis"),
    }),
  buttons: {
    submit: {
      component: Button,
      props: {
        variant: "contained",
        fullWidth: true,
        label: "Se connecter",
      },
    },
  },
  onValid: async (data) => {
    // Appel API, navigation, etc.
    console.log("Login:", data);
  },
};

export function LoginForm() {
  return <Form config={loginConfig} />;
}
```

Pour la documentation complète du composant de formulaire (API, exemples avancés, FAQ), se référer au fichier `src/components/Form/README.md`.

---

## Points d’entrée du package

Le package expose plusieurs sous‑modules via `exports` :

- **`@naxit/comete-design-system`**
  - Composants : `Form`, `useForm`, `createFormField`, etc.
  - Hooks : `useBreakpoints`, autres hooks utilitaires.
  - Providers : `SnackbarProvider`, `useSnackbar`.
  - Utils divers.
- **`@naxit/comete-design-system/components`**
  - Point d’entrée dédié pour les composants (équivalent des exports `components`).
- **`@naxit/comete-design-system/styles`**
  - `ThemeProvider`, `dark`, `light`, `useTheme`, typographie, palette, etc.

Vous pouvez soit importer depuis la racine :

```ts
import { Form, useSnackbar } from "@naxit/comete-design-system";
```

ou depuis un sous‑module dédié :

```ts
import { ThemeProvider, dark, light } from "@naxit/comete-design-system/styles";
```

---

## Développement du design system (dans ce repo)

### Installation des dépendances

Depuis le dossier `design-system` :

```bash
pnpm install
```

### Storybook (catalogue de composants)

Le Storybook est dans le dossier `storybook/` et consomme le package local `@naxit/comete-design-system`.

- **Via Docker + docker compose** (recommandé pour un setup homogène) :

```bash
pnpm docker
```

Cela lance le service `storybook` défini dans `compose.dev.yml` et expose Storybook sur `http://localhost:6060`.

- **En local (sans Docker)** :

```bash
cd storybook
pnpm install
pnpm start
```

Storybook sera disponible sur le port `6006`.

### Scripts principaux

Depuis la racine du design system :

- **`pnpm build`** : build de la librairie avec `tsup` dans `dist/` puis `pnpm pack` (génère un `.tgz` installable dans une autre app).
- **`pnpm test`** : lance la suite de tests Jest.
- **`pnpm test:watch`** : tests Jest en mode watch.
- **`pnpm test:coverage`** : coverage Jest + ouverture du rapport HTML.
- **`pnpm lint`** : analyse lint sur tout le projet (strict, `max-warnings=0`).
- **`pnpm lint:fix`** : corrige automatiquement les problèmes linters dans `src/`.
- **`pnpm clean`** : supprime `dist`, `coverage`, `storybook/storybook-static`.

---

## Structure du dossier `src`

Vue d’ensemble (simplifiée) :

- **`src/index.ts`** : point d’entrée principal du package (re‑export de `components`, `hooks`, `providers`, `styles`, `utils`).
- **`src/components`**
  - `Form/` : composant de formulaire avancé (`Form`, `useForm`, `FormField`, etc.) + docs détaillées.
  - `index.ts` : ré‑export des composants.
- **`src/styles`**
  - `palette/` : thèmes `dark` et `light`.
  - `theme/`, `typography/`, `ThemeProvider/`, `useTheme/`.
- **`src/providers`**
  - `Snackbar/` : `SnackbarProvider`, contexte, reducer, `useSnackbar`.
- **`src/hooks`**
  - `useBreakpoints.ts`, autres hooks utilitaires.
- **`src/utils`**
  - Helpers divers (ex. `particleVowels`).

---

## Utilisation dans une autre application via le tarball

Après un `pnpm build`, un package `.tgz` est généré dans le dossier courant.  
Dans une autre application, vous pouvez l’installer directement :

```bash
pnpm add file:packages/aexae-design-system-0.0.1.tgz
```

ou référencer ce tarball dans votre `package.json` :

```json
"dependencies": {
  "@naxit/comete-design-system": "file:packages/aexae-design-system-0.0.1.tgz"
}
```

---

## Contribution

- Suivre les règles ESLint/Prettier du projet (`pnpm lint`).
- Ajouter/mettre à jour les stories Storybook (`storybook/stories`) pour tout nouveau composant.
- Ajouter des tests unitaires pertinents pour les composants et utils modifiés.

---

---

## Github Page

https://aexae.github.io/design-system/

---

## Licence

Ce projet est distribué sous licence **MIT**.  
Voir le fichier `LICENSE` pour plus de détails.
