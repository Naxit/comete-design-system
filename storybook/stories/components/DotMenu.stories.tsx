import { DotMenu } from "@/components/DotMenu/DotMenu";
import Box from "@mui/material/Box";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { DotMenuProps } from "@/types/DotMenu";

// ----------------------------------------------------------------------

const meta: Meta<typeof DotMenu> = {
  title: "Components/DotMenu",
  component: DotMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    actions: {
      control: "object",
    },
    anchorOrigin: {
      control: "object",
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

type Story = StoryObj<DotMenuProps>;

// ----------------------------------------------------------------------

const defaultActions = [
  {
    id: "edit",
    label: "Modifier",
    onClick: () => {
      console.log("Modifier");
    },
  },
  {
    id: "duplicate",
    label: "Dupliquer",
    onClick: () => {
      console.log("Dupliquer");
    },
  },
  {
    id: "delete",
    label: "Supprimer",
    onClick: () => {
      console.log("Supprimer");
    },
  },
];

export const Default: Story = {
  args: {
    actions: defaultActions,
    anchorOrigin: { vertical: "bottom", horizontal: "right" },
    transformOrigin: { vertical: "top", horizontal: "right" },
  },
};

// ----------------------------------------------------------------------

export const WithDisabledAction: Story = {
  args: {
    actions: [
      {
        id: "edit",
        label: "Modifier",
        color: "primary",
        onClick: () => {
          console.log("Modifier");
        },
      },
      {
        id: "duplicate",
        label: "Dupliquer",
        color: "secondary",
        disabled: true,
        onClick: () => {
          console.log("Dupliquer");
        },
      },
      {
        id: "delete",
        label: "Supprimer",
        color: "error",
        onClick: () => {
          console.log("Supprimer");
        },
      },
    ],
  },
};

// ----------------------------------------------------------------------

export const WithDescriptions: Story = {
  args: {
    actions: [
      {
        id: "delete",
        label: "Supprimer",
        description: "Veuillez sélectionner un ou plusieurs formulaires.",
        color: "error",
        disabled: true,
        onClick: () => {
          console.log("Supprimer");
        },
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        transformOrigin: { vertical: "top", horizontal: "right" },
      },
      {
        id: "feedback",
        label: "Donnez votre avis",
        description: "Aidez-nous à améliorer Comète !",
        onClick: () => {
          console.log("Feedback");
        },
      },
    ],
  },
};

// ----------------------------------------------------------------------

export const Disabled: Story = {
  args: {
    actions: defaultActions,
    disabled: true,
  },
};
