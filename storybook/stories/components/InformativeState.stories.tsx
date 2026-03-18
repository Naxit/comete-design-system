import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Button, ButtonGroup, InformativeState } from "@naxit/comete-design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";

// ----------------------------------------------------------------------

const meta: Meta<typeof InformativeState> = {
  title: "Components/InformativeState",
  component: InformativeState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    imageUrl: {
      control: "text",
      description: "URL de l'image à afficher",
    },
    title: {
      control: "text",
      description: "Titre de l'illustration",
    },
    subtitle: {
      control: "text",
      description: "Sous-titre de l'illustration (optionnel)",
    },
    children: {
      control: false,
      description: "Contenu enfant à afficher sous l'illustration",
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 2, width: "100%" }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof InformativeState>;

// ----------------------------------------------------------------------

export const Default: Story = {
  args: {
    imageUrl: "/icons/error.svg",
    title: "Erreur",
    subtitle: "Une erreur s'est produite",
    maxWidth: "160px",
    height: "160px",
  },
};

// ----------------------------------------------------------------------

export const TitleOnly: Story = {
  args: {
    imageUrl: "/icons/create_form.svg",
    title: "Créer un formulaire",
    maxWidth: "160px",
    height: "160px",
  },
};

// ----------------------------------------------------------------------

export const WithChildren: Story = {
  args: {
    imageUrl: "/icons/error.svg",
    title: "Erreur",
    subtitle: "Une erreur s'est produite lors du chargement, veuillez réessayer plus tard.",
    maxWidth: "160px",
    height: "160px",
    children: (
      <Button variant="contained" color="primary">
        Réessayer
      </Button>
    ),
  },
};

// ----------------------------------------------------------------------

export const MultipleActions: Story = {
  args: {
    imageUrl: "/icons/create_form.svg",
    title: "Aucun formulaire",
    subtitle: "Vous n'avez pas encore créé de formulaire",
    maxWidth: "160px",
    height: "160px",
    children: (
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="primary">
          Créer un formulaire
        </Button>
        <Button variant="outlined" color="primary">
          Importer
        </Button>
      </Stack>
    ),
  },
};

// ----------------------------------------------------------------------

export const ErrorState: Story = {
  args: {
    imageUrl: "/icons/error.svg",
    title: "Oups !",
    subtitle: "Nous n'avons pas pu charger cette page. Veuillez réessayer plus tard.",
    maxWidth: "160px",
    height: "160px",
    children: (
      <ButtonGroup sx={{ gap: 1 }}>
        <Button variant="contained" color="primary">
          Actualiser
        </Button>
        <Button variant="outlined" color="primary">
          Retour
        </Button>
      </ButtonGroup>
    ),
  },
};

// ----------------------------------------------------------------------

export const EmptyState: Story = {
  args: {
    imageUrl: "/icons/create_form.svg",
    title: "Aucun résultat",
    subtitle: "Il n'y a aucun élément à afficher pour le moment",
    maxWidth: "160px",
    height: "160px",
  },
};
