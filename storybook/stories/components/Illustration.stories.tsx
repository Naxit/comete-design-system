import { Illustration } from "@aexae/design-system";
import Box from "@mui/material/Box";
import type { Meta, StoryObj } from "@storybook/react-vite";

// ----------------------------------------------------------------------

const meta: Meta<typeof Illustration> = {
  title: "Components/Illustration",
  component: Illustration,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    imageUrl: {
      control: "text",
      description: "URL de l'image à afficher",
    },
    maxWidth: {
      control: "text",
      description: "Largeur maximale de l'illustration",
    },
    height: {
      control: "text",
      description: "Hauteur de l'illustration",
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Illustration>;

// ----------------------------------------------------------------------

export const Default: Story = {
  args: {
    imageUrl: "/icons/error.svg",
    maxWidth: "160px",
    height: "160px",
  },
};

// ----------------------------------------------------------------------

export const WithCustomSize: Story = {
  args: {
    imageUrl: "/icons/create_form.svg",
    maxWidth: "200px",
    height: "200px",
  },
};

// ----------------------------------------------------------------------

export const Small: Story = {
  args: {
    imageUrl: "/icons/error.svg",
    maxWidth: "100px",
    height: "100px",
  },
};

// ----------------------------------------------------------------------

export const Large: Story = {
  args: {
    imageUrl: "/icons/create_form.svg",
    maxWidth: "300px",
    height: "300px",
  },
};
