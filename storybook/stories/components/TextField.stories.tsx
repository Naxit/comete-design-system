import { TextField } from "@naxit/comete-design-system";
import type { TextFieldProps } from "@naxit/comete-design-system";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import type { Meta, StoryObj } from "@storybook/react-vite";

// ----------------------------------------------------------------------

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label du champ",
    },
    placeholder: {
      control: "text",
      description: "Placeholder du champ",
    },
    helperText: {
      control: "text",
      description: "Texte d'aide sous le champ",
    },
    variant: {
      control: "select",
      options: ["outlined", "filled", "standard"],
      description: "Variante visuelle du champ",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "search", "number"],
      description: "Type d'input HTML",
    },
    disabled: {
      control: "boolean",
      description: "Désactive le champ",
    },
    error: {
      control: "boolean",
      description: "Affiche l'état d'erreur",
    },
    required: {
      control: "boolean",
      description: "Marque le champ comme requis",
    },
    fullWidth: {
      control: "boolean",
      description: "Prend toute la largeur disponible",
    },
    size: {
      control: "select",
      options: ["small", "medium"],
      description: "Taille du champ",
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 2, width: 300 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<TextFieldProps>;

// ----------------------------------------------------------------------

export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
  },
};

// ----------------------------------------------------------------------

export const Variants: Story = {
  render: () => (
    <Stack spacing={2}>
      <TextField label="Outlined" variant="outlined" />
      <TextField label="Filled" variant="filled" />
      <TextField label="Standard" variant="standard" />
    </Stack>
  ),
};

// ----------------------------------------------------------------------

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <TextField label="Small" size="small" />
      <TextField label="Medium" size="medium" />
    </Stack>
  ),
};

// ----------------------------------------------------------------------

export const States: Story = {
  render: ({ variant }) => (
    <Stack spacing={2}>
      <TextField variant={variant} label="Normal" />
      <TextField variant={variant} label="Avec valeur" value="Texte saisi" onChange={() => {}} />
      <TextField variant={variant} label="Erreur" error helperText="Ce champ est invalide" />
      <TextField variant={variant} label="Désactivé" disabled value="Non modifiable" />
      <TextField variant={variant} label="Requis" required />
    </Stack>
  ),
};

// ----------------------------------------------------------------------

export const HelperText: Story = {
  args: {
    label: "Email",
    helperText: "Texte d'aide modifiable",
  },
};

// ----------------------------------------------------------------------

export const Types: Story = {
  render: ({ variant }) => (
    <Stack spacing={2}>
      <TextField variant={variant} placeholder="Text (défaut)" type="text" />
      <TextField variant={variant} placeholder="Email" type="email" />
      <TextField variant={variant} placeholder="Mot de passe" type="password" />
      <TextField variant={variant} placeholder="Rechercher..." type="search" />
      <TextField variant={variant} placeholder="Nombre" type="number" />
    </Stack>
  ),
};

// ----------------------------------------------------------------------

export const Layout: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ p: 2, width: 500 }}>
        <Story />
      </Box>
    ),
  ],
  render: ({ variant }) => (
    <Stack spacing={2}>
      <TextField variant={variant} label="Pleine largeur" placeholder="fullWidth: true" fullWidth />
      <TextField
        variant={variant}
        label="Multiligne"
        placeholder="multiline: true, rows: 4"
        fullWidth
        multiline
        rows={4}
      />
    </Stack>
  ),
};

// ----------------------------------------------------------------------

export const Disabled: Story = {
  args: {
    label: "Champ désactivé",
    value: "Valeur non modifiable",
    disabled: true,
  },
};

// ----------------------------------------------------------------------

export const WithIcons: Story = {
  render: () => (
    <Stack spacing={2}>
      <TextField
        label="Recherche"
        type="search"
        placeholder="Rechercher..."
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        label="Email"
        placeholder="exemple@email.com"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <EmailIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        label="Mot de passe"
        type="password"
        placeholder="••••••••"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <VisibilityIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </Stack>
  ),
};
