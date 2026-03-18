import type { Meta, StoryObj } from "@storybook/react-vite";

// ----------------------------------------------------------------------

const meta: Meta = {
  title: "Docs/Introduction",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  component: () => (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Comète Design System – @naxit/comete-design-system</h1>

      <p>
        Bienvenue dans le design system <strong>Comète</strong> pour les applications React !
      </p>

      <p>
        Ce package fournit un socle commun pour construire des interfaces cohérentes : formulaires
        typés, thème Material UI (modes clair/sombre), providers transverses et hooks utilitaires.
      </p>

      <h2>Utilisation</h2>

      <p>
        Les composants sont disponibles via le package <code>@naxit/comete-design-system</code>.
      </p>

      <h2>Composants disponibles</h2>

      <h3>Formulaires</h3>

      <ul>
        <li>
          <strong>Form</strong> : composant de formulaire déclaratif, type-safe et performant, basé
          sur <code>react-hook-form</code> et <code>yup</code>
        </li>
        <li>
          <strong>createFormField</strong> : helper pour déclarer les champs avec inférence de types
        </li>
        <li>
          <strong>useForm</strong> : hook pour accéder aux <code>formMethods</code> de{" "}
          <code>react-hook-form</code> et gérer les formulaires avancés
        </li>
      </ul>

      <h3>Providers</h3>

      <ul>
        <li>
          <strong>ThemeProvider</strong> : gestion du thème MUI Comète avec support des modes{" "}
          <code>light</code> et <code>dark</code>
        </li>
        <li>
          <strong>SnackbarProvider</strong> : gestion centralisée des messages d’erreur et de succès
          (utilisé notamment par le composant <code>Form</code>)
        </li>
      </ul>

      <h3>Hooks</h3>

      <ul>
        <li>
          <strong>useTheme</strong> : accès au thème Comète et au mode courant
        </li>
        <li>
          <strong>useBreakpoints</strong> : helper pour réagir aux points de rupture MUI
        </li>
        <li>
          <strong>useSnackbar</strong> : affichage de messages via le <code>SnackbarProvider</code>
        </li>
      </ul>

      <h3>Styles & thème</h3>

      <ul>
        <li>
          <strong>palette</strong> : palettes <code>light</code> et <code>dark</code> prêtes à
          l’emploi
        </li>
        <li>
          <strong>typography</strong> : styles de typographie cohérents avec l’identité Comète
        </li>
      </ul>

      <h2>Personnalisation</h2>

      <p>
        Tous les composants exposés par le design system s’appuient sur le thème Comète, construit
        au-dessus de Material UI, et supportent les modes <code>light</code> et <code>dark</code>.
      </p>

      <p>
        Pour utiliser le système de thème, enveloppez votre application avec le{" "}
        <code>ThemeProvider</code> :
      </p>

      <ol>
        <li>
          Importez le <code>ThemeProvider</code> depuis <code>@naxit/comete-design-system/styles</code>
        </li>
        <li>
          Enveloppez votre application avec le composant en lui passant un mode par défaut (
          <code>light</code> ou <code>dark</code>)
        </li>
        <li>
          Utilisez le hook <code>useTheme</code> si vous avez besoin d’accéder au thème ou de
          changer le mode dynamiquement
        </li>
      </ol>

      <h2>Documentation</h2>

      <p>Chaque composant dispose de sa propre page de documentation avec :</p>

      <ul>
        <li>Des exemples interactifs</li>
        <li>Une table des props détaillée</li>
        <li>{"Des variantes d'utilisation"}</li>
        <li>{"Des cas d'usage courants"}</li>
      </ul>

      <h2>Développement</h2>

      <p>
        Pour contribuer ou tester les composants localement, installez les dépendances avec{" "}
        <code>pnpm install</code>, puis démarrez Storybook avec <code>pnpm start</code> dans le
        dossier storybook.
      </p>

      <p>
        Pour préparer une publication du package, lancez la commande <code>pnpm build</code> à la
        racine du projet. Les fichiers seront générés dans le dossier <code>dist</code>.
      </p>

      <h2>Bonnes pratiques</h2>

      <ol>
        <li>
          Toujours utiliser les composants via le package <code>@naxit/comete-design-system</code>
        </li>
        <li>
          Utiliser le <code>ThemeProvider</code> (et idéalement le <code>SnackbarProvider</code>) au
          plus haut niveau de votre application
        </li>
        <li>
          Respecter les types TypeScript fournis (en particulier <code>FormConfig</code> et{" "}
          <code>createFormField</code>) pour garder la type-safety
        </li>
        <li>
          {
            "Consulter les stories (Form, ThemeProvider, Snackbar) pour des exemples d'utilisation concrets"
          }
        </li>
      </ol>

      <hr style={{ margin: "2rem 0" }} />

      <p>
        <strong>Astuce</strong> : Explorez les différentes stories dans Storybook pour découvrir
        toutes les possibilités de personnalisation des composants.
      </p>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story vide pour que la page apparaisse dans la navigation
export const Default: Story = {};
