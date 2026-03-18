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
  render: (args) => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Button color="default" variant={args.variant}>Default</Button>
      <Button color="brand" variant={args.variant}>Brand</Button>
      <Button color="success" variant={args.variant}>Success</Button>
      <Button color="critical" variant={args.variant}>Critical</Button>
      <Button color="warning" variant={args.variant}>Warning</Button>
      <Button color="information" variant={args.variant}>Information</Button>
    </div>
  ),
};

/** All variants for the brand color */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Button variant="contained" color="default">Contained</Button>
      <Button variant="outlined" color="default">Outlined</Button>
      <Button variant="link" color="information">Link</Button>
      <Button variant="subtle" color="default">Subtle</Button>
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
