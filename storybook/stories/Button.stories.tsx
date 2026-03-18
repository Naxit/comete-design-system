import { Button } from "@naxit/comete-design-system";
import type { ButtonProps } from "@naxit/comete-design-system";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["contained", "outlined", "subtle", "link", "link-subtle"],
    },
    color: {
      control: "select",
      options: ["default", "brand", "success", "critical", "warning", "information"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    isDisabled: {
      control: "boolean",
    },
  },
  args: {
    children: "Button",
    variant: "contained",
    color: "default",
    size: "medium",
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

// ----------------------------------------------------------------------

export const Default: Story = {};

export const Brand: Story = {
  args: { color: "brand", children: "Enregistrer" },
};

export const Success: Story = {
  args: { color: "success", children: "Valider" },
};

export const Critical: Story = {
  args: { color: "critical", children: "Supprimer" },
};

export const Warning: Story = {
  args: { color: "warning", children: "Attention" },
};

export const Information: Story = {
  args: { color: "information", children: "En savoir plus" },
};

// ----------------------------------------------------------------------

export const Outlined: Story = {
  args: { variant: "outlined", color: "brand", children: "Annuler" },
};

export const Subtle: Story = {
  args: { variant: "subtle", color: "brand", children: "Voir plus" },
};

export const Link: Story = {
  args: { variant: "link", color: "brand", children: "En savoir plus" },
};

export const LinkSubtle: Story = {
  args: { variant: "link-subtle", color: "default", children: "Voir les détails" },
};

// ----------------------------------------------------------------------

export const Small: Story = {
  args: { size: "small", color: "brand", children: "Petit" },
};

export const Large: Story = {
  args: { size: "large", color: "brand", children: "Grand" },
};

// ----------------------------------------------------------------------

export const Disabled: Story = {
  args: { isDisabled: true, color: "brand", children: "Désactivé" },
};

// ----------------------------------------------------------------------

/** All contained color variants side by side */
export const AllColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Button color="default">Default</Button>
      <Button color="brand">Brand</Button>
      <Button color="success">Success</Button>
      <Button color="critical">Critical</Button>
      <Button color="warning">Warning</Button>
      <Button color="information">Information</Button>
    </div>
  ),
};

/** All variants for the brand color */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Button variant="contained" color="brand">Contained</Button>
      <Button variant="outlined" color="brand">Outlined</Button>
      <Button variant="subtle" color="brand">Subtle</Button>
      <Button variant="link" color="brand">Link</Button>
      <Button variant="link-subtle" color="default">Link Subtle</Button>
    </div>
  ),
};

/** All sizes */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Button size="small" color="brand">Small</Button>
      <Button size="medium" color="brand">Medium</Button>
      <Button size="large" color="brand">Large</Button>
    </div>
  ),
};
