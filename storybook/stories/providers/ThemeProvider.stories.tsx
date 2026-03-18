import {
  ThemeProvider,
  type ThemeProviderProps,
  dark as defaultDarkPalette,
  light as defaultLightPalette,
  useTheme,
} from "@aexae/design-system/styles";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";

// ----------------------------------------------------------------------

const ThemePlayground = () => {
  const { mode, theme, toggleTheme } = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: "100vh",
        width: "100%",
        py: 6,
        px: 4,
      }}
    >
      <Stack spacing={3} maxWidth={720}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h4" component="h2">
            Mode actuel : {mode}
          </Typography>
          <Chip label={`Primaire : ${theme.palette.primary.main}`} color="primary" />
        </Stack>

        <Typography variant="body1">
          Utilisez le bouton ci-dessous pour basculer dynamiquement entre les thèmes clair et sombre
          et observer comment la palette influe sur les composants MUI.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          flexWrap="wrap"
          useFlexGap
          alignItems="flex-start"
        >
          <Button variant="contained">Bouton contenu</Button>
          <Button variant="outlined">Bouton contour</Button>
          <Button variant="text">Bouton texte</Button>
        </Stack>

        <Divider />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="flex-start">
          <Typography variant="body2">
            Palette d&apos;arrière-plan : {theme.palette.background.default}
          </Typography>
          <Typography variant="body2">Typographie : {theme.typography.fontFamily}</Typography>
        </Stack>

        <Button variant="contained" color="secondary" onClick={toggleTheme}>
          Basculer le mode
        </Button>
      </Stack>
    </Box>
  );
};

// ----------------------------------------------------------------------

const meta: Meta<typeof ThemeProvider> = {
  title: "Providers/ThemeProvider",
  component: ThemeProvider,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Le `ThemeProvider` applique le thème MUI étendu de la librairie et expose un contexte permettant de basculer entre les modes clair et sombre.",
      },
    },
  },
  argTypes: {
    mode: {
      control: { type: "inline-radio" },
      options: ["light", "dark"],
      description: "Mode de thème initial appliqué au montage.",
    },
    enableCssBaseline: {
      control: "boolean",
      description: "Active le reset CSS global de MUI (`CssBaseline`).",
    },
    themeOptions: {
      control: false,
      description: "Options supplémentaires passées à `createTheme`.",
    },
    palettes: {
      control: false,
      description:
        "Palettes personnalisées par mode. Doit inclure au minimum les clés `light` et `dark`.",
    },
    children: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

// ----------------------------------------------------------------------

export const Playground: Story = {
  name: "Thème par défaut",
  args: {
    mode: "dark",
    enableCssBaseline: true,
  },
  render: (args) => (
    <ThemeProvider {...args}>
      <ThemePlayground />
    </ThemeProvider>
  ),
};

// ----------------------------------------------------------------------

const oceanPalettes: ThemeProviderProps["palettes"] = {
  light: {
    ...defaultLightPalette,
    mode: "light",
    primary: {
      light: "#6FC2FF",
      main: "#0582CA",
      dark: "#045A8D",
      contrastText: "#fff",
    },
    secondary: {
      light: "#98F5E9",
      main: "#2AB7CA",
      dark: "#1C7F8C",
      contrastText: "#003049",
    },
    background: {
      default: "#F1FBFF",
      paper: "#E5F7FF",
    },
  },
  dark: {
    ...defaultDarkPalette,
    mode: "dark",
    primary: {
      light: "#5ED7FF",
      main: "#40BCD8",
      dark: "#2A7F94",
      contrastText: "#001219",
    },
    secondary: {
      light: "#FFD6A5",
      main: "#FF924C",
      dark: "#C66B28",
      contrastText: "#001219",
    },
    background: {
      default: "#001F2E",
      paper: "#002B3F",
    },
  },
};

export const PalettesPersonalized: Story = {
  name: "Palettes personnalisées",
  args: {
    mode: "dark",
    enableCssBaseline: true,
    palettes: oceanPalettes,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple de surcharge des palettes clair et sombre avec des couleurs personnalisées. Idéal pour mettre la charte graphique d’un produit en avant.",
      },
    },
  },
  render: (args) => (
    <ThemeProvider {...args}>
      <ThemePlayground />
    </ThemeProvider>
  ),
};
