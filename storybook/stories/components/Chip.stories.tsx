import { Chip } from "@naxit/comete-design-system";
import type { ChipProps } from "@naxit/comete-design-system";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Meta, StoryObj } from "@storybook/react-vite";

// ----------------------------------------------------------------------

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: ["default", "primary", "secondary", "error", "info", "success", "warning"],
    },
    size: {
      control: "select",
      options: ["small", "medium"],
    },
    variant: {
      control: "select",
      options: ["filled", "outlined"],
    },
    disabled: {
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

type Story = StoryObj<ChipProps>;

// ----------------------------------------------------------------------

export const Default: Story = {
  args: {
    label: "Chip",
    color: "default",
  },
};

// ----------------------------------------------------------------------

export const Colors: Story = {
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      <Chip label="Default" color="default" />
      <Chip label="Primary" color="primary" />
      <Chip label="Secondary" color="secondary" />
      <Chip label="Success" color="success" />
      <Chip label="Error" color="error" />
      <Chip label="Info" color="info" />
      <Chip label="Warning" color="warning" />
    </Stack>
  ),
};

// ----------------------------------------------------------------------

export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Chip label="Filled" variant="filled" color="primary" />
      <Chip label="Outlined" variant="outlined" color="primary" />
    </Stack>
  ),
};

// ----------------------------------------------------------------------

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Chip label="Small" size="small" color="primary" />
      <Chip label="Medium" size="medium" color="primary" />
    </Stack>
  ),
};

// ----------------------------------------------------------------------

export const Deletable: Story = {
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      <Chip label="Deletable" onDelete={() => {}} color="primary" />
      <Chip label="Deletable" onDelete={() => {}} variant="outlined" color="primary" />
      <Chip
        label="Custom delete icon"
        onDelete={() => {}}
        deleteIcon={<DeleteIcon />}
        color="secondary"
      />
    </Stack>
  ),
};

// ----------------------------------------------------------------------

export const Disabled: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Chip label="Disabled" disabled color="primary" />
      <Chip label="Disabled deletable" disabled onDelete={() => {}} color="primary" />
    </Stack>
  ),
};
