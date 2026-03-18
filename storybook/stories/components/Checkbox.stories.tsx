import { Checkbox } from "@naxit/comete-design-system";
import type { CheckboxProps } from "@naxit/comete-design-system";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import type { Meta, StoryObj } from "@storybook/react-vite";

// ----------------------------------------------------------------------

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "info", "warning"],
    },
    size: {
      control: "select",
      options: ["small", "medium"],
    },
    disabled: {
      control: "boolean",
    },
    checked: {
      control: "boolean",
    },
    indeterminate: {
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

type Story = StoryObj<CheckboxProps>;

// ----------------------------------------------------------------------

export const Default: Story = {
  args: {
    color: "primary",
    checked: false,
    onChange: () => {
      console.log("onChange: faire quelque chose");
    },
  },
};

// ----------------------------------------------------------------------

export const Colors: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Checkbox color="primary" />
      <Checkbox color="secondary" />
      <Checkbox color="success" />
      <Checkbox color="error" />
      <Checkbox color="info" />
      <Checkbox color="warning" />
    </Stack>
  ),
};

// ----------------------------------------------------------------------

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Checkbox size="small" color="primary" />
      <Checkbox size="medium" color="primary" />
    </Stack>
  ),
};

// ----------------------------------------------------------------------

export const States: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Checkbox color="primary" />
      <Checkbox color="primary" disabled />
      <Checkbox color="primary" indeterminate />
      <Checkbox color="primary" indeterminate disabled />
    </Stack>
  ),
};
