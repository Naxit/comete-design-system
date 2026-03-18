import { Button } from "@aexae/design-system";
import type { ButtonProps } from "@aexae/design-system";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import type { Meta, StoryObj } from "@storybook/react-vite";

// ----------------------------------------------------------------------

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["contained", "outlined", "text"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "info", "warning"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
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

type Story = StoryObj<ButtonProps>;

// ----------------------------------------------------------------------

export const Default: Story = {
  args: {
    children: "Button",
    variant: "contained",
  },
};

// ----------------------------------------------------------------------

export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </Stack>
  ),
};

// ----------------------------------------------------------------------

export const Colors: Story = {
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
      <Button variant="contained" color="success">
        Success
      </Button>
      <Button variant="contained" color="error">
        Error
      </Button>
      <Button variant="contained" color="info">
        Info
      </Button>
      <Button variant="contained" color="warning">
        Warning
      </Button>
    </Stack>
  ),
};

// ----------------------------------------------------------------------

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Button variant="contained" size="small">
        Small
      </Button>
      <Button variant="contained" size="medium">
        Medium
      </Button>
      <Button variant="contained" size="large">
        Large
      </Button>
    </Stack>
  ),
};

// ----------------------------------------------------------------------

export const WithIcons: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
    </Stack>
  ),
};

// ----------------------------------------------------------------------

export const Loading: Story = {
  args: {
    children: "Loading",
    variant: "contained",
    loading: true,
  },
};

// ----------------------------------------------------------------------

export const Disabled: Story = {
  args: {
    children: "Disabled",
    variant: "contained",
    disabled: true,
  },
};
