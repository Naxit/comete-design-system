# Form Component

Un composant de formulaire **déclaratif, type-safe et performant** pour React, basé sur `react-hook-form` et `yup`.

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Installation](#installation)
- [Démarrage rapide](#démarrage-rapide)
- [Guide d'utilisation](#guide-dutilisation)
- [API Reference](#api-reference)
- [Exemples](#exemples)
- [Types](#types)
- [Bonnes pratiques](#bonnes-pratiques)
- [FAQ](#faq)
- [Troubleshooting](#troubleshooting)

---

## Vue d'ensemble

Le composant `Form` permet de créer des formulaires complexes avec une configuration simple et déclarative. Il offre :

- ✅ **Type-safety complète** : Inférence automatique des types TypeScript
- ✅ **Performance optimisée** : Re-rendus isolés par champ avec `useWatch`
- ✅ **Flexibilité maximale** : Supporte n'importe quel composant React (MUI, custom)
- ✅ **Validation robuste** : Intégration avec `yup` pour la validation
- ✅ **Gestion d'erreur** : Erreurs affichées automatiquement avec snackbar
- ✅ **API déclarative** : Configuration en un seul endroit

### Architecture

```
Form
├── useForm (hook personnalisé)
│   ├── react-hook-form (gestion d'état)
│   ├── yup (validation)
│   └── snackbar (gestion d'erreur)
├── FormField (composant par champ)
│   └── useWatch (observation isolée)
└── FormSubmitButton (bouton de soumission)
```

---

## Installation

Le composant `Form` est inclus dans le package `@aexae/design-system`. Aucune installation supplémentaire n'est nécessaire.

### Dépendances requises

- `react` >= 18.0.0
- `react-hook-form` >= 7.0.0
- `@hookform/resolvers` >= 3.0.0
- `yup` >= 1.0.0
- `@mui/material` >= 5.0.0 (pour les composants MUI)

---

## Démarrage rapide

### Exemple minimal

```typescript
import { Form, createFormField, type FormConfig } from "@aexae/design-system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// 1. Définir le type des données
type LoginData = {
  email: string;
  password: string;
};

// 2. Créer la configuration
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
    console.log("Connexion:", data);
    // Appel API, redirection, etc.
  },
};

// 3. Utiliser le composant
function LoginPage() {
  return <Form config={loginConfig} />;
}
```

---

## Guide d'utilisation

### 1. Définir le type des données

Commencez par définir le type TypeScript de vos données de formulaire :

```typescript
type UserData = {
  name: string;
  email: string;
  age: number;
  bio?: string; // Optionnel
};
```

### 2. Créer les champs avec `createFormField`

Utilisez `createFormField` pour chaque champ. Cette fonction permet à TypeScript d'inférer automatiquement les types :

```typescript
import { createFormField } from "@aexae/design-system";
import TextField from "@mui/material/TextField";

const fields = [
  createFormField<UserData, typeof TextField>({
    name: "name", // ✅ Autocomplétion et vérification
    component: TextField,
    props: {
      label: "Nom",
      type: "text",
      fullWidth: true,
      // ✅ TypeScript valide que ces props existent sur TextField
    },
  }),
];
```

**Important** : Les props `onChange`, `error`, `helperText` et `value` sont automatiquement omises car elles sont gérées par le composant Form.

### 3. Définir les règles de validation avec Yup

Utilisez une fonction qui reçoit `yup` et retourne un schéma de validation :

```typescript
yupRules: (yup) =>
  yup.object().shape({
    name: yup.string().required("Le nom est requis"),
    email: yup.string().email("Email invalide").required("L'email est requis"),
    age: yup
      .number()
      .min(18, "Vous devez avoir au moins 18 ans")
      .max(120, "Âge invalide")
      .required("L'âge est requis"),
    bio: yup.string().max(500, "La bio ne peut pas dépasser 500 caractères"),
  }),
```

### 4. Configurer les boutons

Définissez le bouton de soumission :

```typescript
buttons: {
  submit: {
    component: Button,
    props: {
      variant: "contained",
      fullWidth: true,
      label: "Soumettre",
      // ✅ Toutes les props de Button sont disponibles (sauf "type")
    },
  },
},
```

**Note** : La prop `type="submit"` est automatiquement ajoutée par le composant.

### 5. Gérer la soumission

Définissez les callbacks `onValid` et `onInvalid` :

```typescript
onValid: async (data) => {
  // data est typé comme UserData
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Erreur serveur");
  // Gestion du succès
},

onInvalid: (errors) => {
  // Gestion personnalisée des erreurs de validation
  console.log("Erreurs:", errors);
},
```

### 6. Utiliser le composant

```typescript
import { Form } from "@aexae/design-system";

function UserForm() {
  return <Form config={userConfig} id="user-form" sx={{ maxWidth: 600, mx: "auto" }} />;
}
```

---

## API Reference

### `<Form />`

Composant principal qui génère le formulaire.

#### Props

| Prop     | Type             | Requis | Description                          |
| -------- | ---------------- | ------ | ------------------------------------ |
| `config` | `FormConfig<T>`  | ✅     | Configuration complète du formulaire |
| `id`     | `string`         | ❌     | ID HTML du formulaire                |
| `sx`     | `SxProps<Theme>` | ❌     | Styles MUI du formulaire             |

#### Exemple

```typescript
<Form config={myFormConfig} id="my-form" sx={{ maxWidth: 600 }} />
```

---

### `createFormField<T, TComponent>()`

Fonction helper pour créer un champ de formulaire avec inférence de type automatique.

#### Paramètres

| Paramètre         | Type                                                 | Description                                                          |
| ----------------- | ---------------------------------------------------- | -------------------------------------------------------------------- |
| `field.name`      | `Path<T>`                                            | Nom du champ (doit correspondre à une clé de `T`)                    |
| `field.component` | `TComponent`                                         | Composant React à utiliser                                           |
| `field.props`     | `Omit<ComponentProps<TComponent>, OmittedFormProps>` | Props du composant (sans `onChange`, `error`, `helperText`, `value`) |

#### Exemple

```typescript
createFormField<UserData, typeof TextField>({
  name: "email",
  component: TextField,
  props: {
    label: "Email",
    type: "email",
    fullWidth: true,
  },
});
```

---

### `FormConfig<T>`

Type de configuration du formulaire.

```typescript
type FormConfig<T> = {
  fields: FormField<T>[];
  yupRules: (yup: typeof Yup) => ObjectSchema<T>;
  buttons: FormButtons;
  defaultValues?: DefaultValues<T>;
  onValid: (data: T, ev?: BaseSyntheticEvent) => void | Promise<void>;
  onInvalid?: (errors: FieldErrors<T>, ev?: BaseSyntheticEvent) => void | Promise<void>;
};
```

#### Propriétés

| Propriété       | Type                                                     | Requis | Description                                       |
| --------------- | -------------------------------------------------------- | ------ | ------------------------------------------------- |
| `fields`        | `FormField<T>[]`                                         | ✅     | Tableau des champs du formulaire                  |
| `yupRules`      | `(yup: typeof Yup) => ObjectSchema<T>`                   | ✅     | Fonction qui retourne le schéma de validation Yup |
| `buttons`       | `FormButtons`                                            | ✅     | Configuration des boutons                         |
| `defaultValues` | `DefaultValues<T>`                                       | ❌     | Valeurs par défaut du formulaire                  |
| `onValid`       | `(data: T, ev?) => void \| Promise<void>`                | ✅     | Callback appelé quand le formulaire est valide    |
| `onInvalid`     | `(errors: FieldErrors<T>, ev?) => void \| Promise<void>` | ❌     | Callback appelé quand le formulaire est invalide  |

---

## Exemples

### Formulaire simple (Login)

```typescript
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
        margin: "normal",
      },
    }),
    createFormField<LoginData, typeof TextField>({
      name: "password",
      component: TextField,
      props: {
        label: "Mot de passe",
        type: "password",
        fullWidth: true,
        margin: "normal",
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
    // Appel API
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erreur de connexion");
    // Redirection, etc.
  },
};
```

### Formulaire complexe avec plusieurs types de champs

```typescript
import { Select } from "@aexae/design-system";
import { AvatarInput } from "@aexae/design-system";

type UserData = {
  name: string;
  email: string;
  avatar: string;
  zoneId: string;
  description: string;
};

const userConfig: FormConfig<UserData> = {
  defaultValues: {
    name: "",
    email: "",
    avatar: undefined,
    zoneId: "",
    description: "",
  },
  fields: [
    createFormField<UserData, typeof TextField>({
      name: "name",
      component: TextField,
      props: {
        label: "Nom",
        type: "text",
        fullWidth: true,
        margin: "normal",
      },
    }),
    createFormField<UserData, typeof TextField>({
      name: "email",
      component: TextField,
      props: {
        label: "Email",
        type: "email",
        fullWidth: true,
        margin: "normal",
      },
    }),
    createFormField<UserData, typeof AvatarInput>({
      name: "avatar",
      component: AvatarInput,
      props: {
        id: "avatar-input",
        name: "avatar",
        variant: "rounded",
        size: 96,
      },
    }),
    createFormField<UserData, typeof Select>({
      name: "zoneId",
      component: Select,
      props: {
        id: "zone-select",
        label: "Zone",
        options: [
          { id: "1", value: "1", label: "Bras" },
          { id: "2", value: "2", label: "Tronc" },
          { id: "3", value: "3", label: "Jambes" },
        ],
        fullWidth: true,
      },
    }),
    createFormField<UserData, typeof TextField>({
      name: "description",
      component: TextField,
      props: {
        label: "Description",
        type: "text",
        multiline: true,
        rows: 4,
        fullWidth: true,
        margin: "normal",
      },
    }),
  ],
  yupRules: (yup) =>
    yup.object().shape({
      name: yup.string().required("Le nom est requis"),
      email: yup.string().email("Email invalide").required("L'email est requis"),
      avatar: yup.string().required("L'avatar est requis"),
      zoneId: yup.string().required("La zone est requise"),
      description: yup
        .string()
        .required("La description est requise")
        .min(10, "La description doit contenir au moins 10 caractères"),
    }),
  buttons: {
    submit: {
      component: Button,
      props: {
        variant: "contained",
        fullWidth: true,
        label: "Créer",
      },
    },
  },
  onValid: async (data) => {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erreur lors de la création");
    // Gestion du succès
  },
};
```

### Formulaire avec valeurs pré-remplies (édition)

```typescript
type EditUserData = {
  name: string;
  email: string;
  zoneId: string;
};

const editUserConfig: FormConfig<EditUserData> = {
  defaultValues: {
    name: "Jean Dupont", // Valeurs pré-remplies
    email: "jean@example.com",
    zoneId: "2",
  },
  fields: [
    // ... mêmes champs que précédemment
  ],
  yupRules: (yup) =>
    yup.object().shape({
      name: yup.string().required("Le nom est requis"),
      email: yup.string().email("Email invalide").required("L'email est requis"),
      zoneId: yup.string().required("La zone est requise"),
    }),
  buttons: {
    submit: {
      component: Button,
      props: {
        variant: "contained",
        fullWidth: true,
        label: "Modifier",
      },
    },
  },
  onValid: async (data) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erreur lors de la modification");
  },
};
```

### Validation complexe avec dépendances entre champs

```typescript
type SignupData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const signupConfig: FormConfig<SignupData> = {
  // ...
  yupRules: (yup) =>
    yup.object().shape({
      email: yup.string().email("Email invalide").required("L'email est requis"),
      password: yup
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
        .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
        .required("Le mot de passe est requis"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Les mots de passe doivent correspondre")
        .required("La confirmation est requise"),
    }),
  // ...
};
```

### Gestion d'erreur personnalisée

```typescript
const formConfig: FormConfig<UserData> = {
  // ...
  onValid: async (data) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      // Succès
    } catch (error) {
      // L'erreur sera automatiquement affichée via snackbar
      throw error;
    }
  },
  onInvalid: (errors) => {
    // Gestion personnalisée des erreurs de validation
    console.log("Erreurs de validation:", errors);
    // Vous pouvez aussi afficher un message global, etc.
  },
};
```

---

## Types

### Types principaux

#### `FormConfig<T>`

Configuration complète du formulaire.

```typescript
type FormConfig<T extends Record<string, unknown>> = {
  fields: FormField<T>[];
  yupRules: (yup: typeof Yup) => ObjectSchema<T>;
  buttons: FormButtons;
  defaultValues?: DefaultValues<T>;
  onValid: (data: T, ev?: BaseSyntheticEvent) => void | Promise<void>;
  onInvalid?: (errors: FieldErrors<T>, ev?: BaseSyntheticEvent) => void | Promise<void>;
};
```

#### `FormField<T, TComponent>`

Configuration d'un champ de formulaire.

```typescript
type FormField<T, TComponent> = {
  name: Path<T>;
  component: TComponent;
  props: Omit<ComponentProps<TComponent>, OmittedFormProps>;
};
```

#### `FormButtons`

Configuration des boutons du formulaire.

```typescript
type FormButtons = {
  submit: {
    component: typeof Button;
    props: Omit<ButtonProps, "type"> & { label: string };
  };
};
```

#### `FormProps<T>`

Props du composant `Form`.

```typescript
type FormProps<T extends Record<string, unknown>> = {
  config: FormConfig<T>;
  id?: string;
  sx?: SxProps<Theme>;
};
```

---

## Bonnes pratiques

### 1. Utiliser `createFormField` pour l'inférence de type

✅ **Bon** :

```typescript
createFormField<UserData, typeof TextField>({
  name: "email",
  component: TextField,
  props: { label: "Email" },
});
```

❌ **Mauvais** :

```typescript
{
  name: "email",
  component: TextField,
  props: { label: "Email" },
} // Pas d'inférence de type
```

### 2. Définir les types des données explicitement

✅ **Bon** :

```typescript
type UserData = {
  name: string;
  email: string;
};

const config: FormConfig<UserData> = {
  /* ... */
};
```

❌ **Mauvais** :

```typescript
const config: FormConfig<any> = {
  /* ... */
}; // Perd la type-safety
```

### 3. Utiliser des valeurs par défaut cohérentes

✅ **Bon** :

```typescript
defaultValues: {
  name: "",
  email: "",
  age: 0,
  bio: undefined, // Pour les champs optionnels
}
```

### 4. Grouper les configurations par fonctionnalité

✅ **Bon** :

```typescript
// forms/userForm.ts
export const userFormConfig: FormConfig<UserData> = {
  /* ... */
};

// forms/loginForm.ts
export const loginFormConfig: FormConfig<LoginData> = {
  /* ... */
};
```

### 5. Réutiliser les configurations

✅ **Bon** :

```typescript
// Configuration de base
const baseUserConfig: Partial<FormConfig<UserData>> = {
  fields: [
    /* champs communs */
  ],
  yupRules: (yup) =>
    yup.object().shape({
      /* règles communes */
    }),
};

// Configuration spécifique
const createUserConfig: FormConfig<UserData> = {
  ...baseUserConfig,
  buttons: {
    submit: {
      /* ... */
    },
  },
  onValid: async (data) => {
    /* création */
  },
};
```

### 6. Gérer les erreurs de manière cohérente

✅ **Bon** :

```typescript
onValid: async (data) => {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    // Succès
  } catch (error) {
    // L'erreur sera automatiquement affichée via snackbar
    throw error;
  }
},
```

---

## FAQ

### Q: Puis-je utiliser mes propres composants React ?

**R:** Oui ! Le composant Form supporte n'importe quel composant React. Il suffit de passer votre composant à `component` :

```typescript
createFormField({
  name: "customField",
  component: MyCustomInput,
  props: {
    // Props spécifiques à votre composant
    customProp: "value",
  },
});
```

### Q: Comment gérer les formulaires multi-étapes ?

**R:** Vous pouvez créer plusieurs configurations de formulaire et les afficher conditionnellement :

```typescript
const [step, setStep] = useState(1);

const step1Config: FormConfig<Step1Data> = {
  /* ... */
};
const step2Config: FormConfig<Step2Data> = {
  /* ... */
};

return (
  <>
    {step === 1 && <Form config={step1Config} />}
    {step === 2 && <Form config={step2Config} />}
  </>
);
```

### Q: Comment accéder aux méthodes de react-hook-form ?

**R:** Le hook `useForm` retourne `formMethods` qui contient toutes les méthodes de react-hook-form :

```typescript
const { formMethods } = useForm(config);

// Utiliser les méthodes
formMethods.reset();
formMethods.setValue("name", "Nouveau nom");
formMethods.watch("email");
```

### Q: Puis-je changer le mode de validation ?

**R:** Actuellement, le mode est fixé à `"onChange"`. Pour changer cela, vous devriez modifier le hook `useForm` ou créer votre propre hook personnalisé.

### Q: Comment ajouter plusieurs boutons (reset, cancel) ?

**R:** Actuellement, seul le bouton submit est supporté. Pour ajouter d'autres boutons, vous pouvez les ajouter manuellement dans votre composant :

```typescript
<Form config={config} />
<Button onClick={handleReset}>Réinitialiser</Button>
<Button onClick={handleCancel}>Annuler</Button>
```

### Q: Les erreurs sont-elles traduites ?

**R:** Les erreurs de validation Yup utilisent les messages que vous définissez. Les erreurs de soumission sont affichées via snackbar avec le système de traduction de votre application.

---

## Troubleshooting

### Problème : TypeScript ne trouve pas les props du composant

**Solution** : Assurez-vous d'utiliser `createFormField` avec les bons types :

```typescript
createFormField<UserData, typeof TextField>({
  // ...
});
```

### Problème : Les champs ne se mettent pas à jour

**Solution** : Vérifiez que vous utilisez `createFormField` et que le `name` correspond bien à une clé de votre type de données.

### Problème : Les erreurs ne s'affichent pas

**Solution** : Vérifiez que :

1. Le schéma Yup est correctement configuré
2. Les messages d'erreur sont définis dans `yupRules`
3. Le composant est dans un `SnackbarProvider` (pour les erreurs de soumission)

### Problème : Le formulaire se soumet même avec des erreurs

**Solution** : Vérifiez que votre schéma Yup est correct et que tous les champs requis sont validés.

### Problème : Performance avec beaucoup de champs

**Solution** : Le composant est déjà optimisé avec `useWatch` par champ. Si vous avez des problèmes de performance, vérifiez que vous n'avez pas de re-rendus inutiles dans vos composants personnalisés.

---

## Support

Pour toute question ou problème, veuillez ouvrir une issue sur le repository GitHub.

---

## Licence

Ce composant fait partie du package `@aexae/design-system` et suit la même licence.
