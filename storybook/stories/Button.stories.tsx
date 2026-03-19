import { Button } from "@naxit/comete-design-system";
import type { ButtonProps } from "@naxit/comete-design-system";
import {
  ArrowDropDown,
  ChevronRight,
  Download,
  Image,
  Lock,
  type IconProps,
} from "@naxit/comete-icons";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { expect, fn, userEvent, within } from "storybook/test";

// ----------------------------------------------------------------------
// Icon registries — separate allowed sets per slot

const ICON_BEFORE_MAP: Record<string, React.ComponentType<IconProps>> = {
  Image: Image as React.ComponentType<IconProps>,
  Lock: Lock as React.ComponentType<IconProps>,
  Download: Download as React.ComponentType<IconProps>,
};

const ICON_AFTER_MAP: Record<string, React.ComponentType<IconProps>> = {
  Image: Image as React.ComponentType<IconProps>,
  ChevronRight: ChevronRight as React.ComponentType<IconProps>,
  ArrowDropDown: ArrowDropDown as React.ComponentType<IconProps>,
};

// ----------------------------------------------------------------------

type StoryArgs = ButtonProps & {
  /** Name of the icon to display before the label */
  iconBeforeName?: string;
  /** Name of the icon to display after the label */
  iconAfterName?: string;
  /** Visual variant applied to both icons */
  iconVariant?: "filled" | "outlined";
};

/** Resolves an icon component from the given map and wraps it with the correct props. */
function resolveIconByName(
  name: string | undefined,
  map: Record<string, React.ComponentType<IconProps>>,
  variant: "filled" | "outlined"
): React.ReactNode {
  if (!name || name === "none") return undefined;
  const Icon = map[name];
  if (!Icon) return undefined;
  return <Icon spacing="default" variant={variant} />;
}

// ----------------------------------------------------------------------

const meta: Meta<StoryArgs> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
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
    iconBeforeName: {
      control: "select",
      options: ["none", ...Object.keys(ICON_BEFORE_MAP)],
      name: "iconBefore",
      description: "Icon before the label — color auto-resolved from variant + color",
      table: { category: "Icons" },
    },
    iconAfterName: {
      control: "select",
      options: ["none", ...Object.keys(ICON_AFTER_MAP)],
      name: "iconAfter",
      description: "Icon after the label — color auto-resolved from variant + color",
      table: { category: "Icons" },
    },
    iconVariant: {
      control: "select",
      options: ["filled", "outlined"],
      name: "icon variant",
      description: "Visual style applied to both icons (spacing=default)",
      table: { category: "Icons" },
    },
    // Hide raw ReactNode props from controls — managed via iconBeforeName / iconAfterName
    iconBefore: { table: { disable: true } },
    iconAfter: { table: { disable: true } },
  },
  args: {
    children: "Button",
    variant: "contained",
    color: "default",
    size: "medium",
    onPress: fn(),
    iconVariant: "outlined",
  },
  render: ({ iconBeforeName, iconAfterName, iconVariant = "outlined", ...args }) => {
    const iconBefore = resolveIconByName(iconBeforeName, ICON_BEFORE_MAP, iconVariant);
    const iconAfter = resolveIconByName(iconAfterName, ICON_AFTER_MAP, iconVariant);
    return <Button {...args} iconBefore={iconBefore} iconAfter={iconAfter} />;
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

// ----------------------------------------------------------------------

export const Default: Story = {};

export const Brand: Story = {
  args: { color: "brand", children: "Enregistrer" },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    void expect(args.onPress).toHaveBeenCalledOnce();
  },
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
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    void expect(args.onPress).not.toHaveBeenCalled();
    void expect(button).toBeDisabled();
  },
};

// ----------------------------------------------------------------------

/** Vérifie la navigation clavier : Tab pour focus, Enter pour déclencher onPress */
export const KeyboardNavigation: Story = {
  args: { color: "brand", children: "Action clavier" },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.tab();
    void expect(button).toHaveFocus();
    void expect(button).toHaveAttribute("data-focus-visible");
    await userEvent.keyboard("{Enter}");
    void expect(args.onPress).toHaveBeenCalledOnce();
  },
};

// ----------------------------------------------------------------------

/** Icône outlined avant le label — couleur auto-résolue selon variant + color */
export const WithIconBefore: Story = {
  args: {
    color: "brand",
    children: "Enregistrer",
    iconBeforeName: "Lock",
    iconVariant: "outlined",
  },
};

/** Icône outlined après le label */
export const WithIconAfter: Story = {
  args: {
    color: "brand",
    children: "Continuer",
    iconAfterName: "ChevronRight",
    iconVariant: "outlined",
  },
};

/** Icône + label sur toutes les couleurs contained — vérifie l'inversion automatique */
export const IconAllColors: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {(
        [
          "default",
          "brand",
          "success",
          "critical",
          "warning",
          "information",
        ] as const
      ).map((color) => (
        <Button
          key={color}
          color={color}
          variant={args.variant}
          iconBefore={<Image spacing="default" variant="filled" />}
        >
          {color}
        </Button>
      ))}
    </div>
  ),
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
