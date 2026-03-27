import { Icon } from "@naxit/comete-design-system";
import type { IconComponentProps } from "@naxit/comete-design-system";
import type { IconColor, IconName, IconVariant } from "@naxit/comete-icons";
import { iconRegistry } from "@naxit/comete-icons";
import type { Meta, StoryObj } from "@storybook/react-vite";

// ----------------------------------------------------------------------
// Build icon name list from the registry (always in sync with the package)

const ICON_NAMES: IconName[] = Object.keys(iconRegistry).sort() as IconName[];

// ----------------------------------------------------------------------
// Figma design URLs

const FIGMA_FILE =
  "https://www.figma.com/design/YO9cW75K8aLcM5BbojZAqB/Com%C3%A8te-Design-System";

/** Builds a Figma URL with a specific node ID for the addon-designs panel */
const figmaUrl = (nodeId: string) => `${FIGMA_FILE}?node-id=${nodeId.replace(":", "-")}`;

// ----------------------------------------------------------------------

const VARIANTS: IconVariant[] = ["outlined", "filled", "duotone"];

const COLORS: IconColor[] = [
  "default",
  "subtle",
  "subtlest",
  "disabled",
  "inverted",
  "brand",
  "selected",
  "information",
  "success",
  "warning",
  "on-warning",
  "critical",
  "accent",
  "day",
  "night",
];

// ----------------------------------------------------------------------

const meta: Meta<IconComponentProps> = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: "select",
      options: ICON_NAMES,
      description: "Name of the icon to render",
    },
    variant: {
      control: "select",
      options: VARIANTS,
    },
    color: {
      control: "select",
      options: COLORS,
    },
    size: {
      control: { type: "number", min: 12, max: 64, step: 4 },
    },
    spacing: {
      control: "select",
      options: ["default", "none"],
    },
    label: {
      control: "text",
      description: "Accessible label (makes the icon non-decorative)",
    },
  },
  args: {
    icon: "AddBox",
    variant: "outlined",
    color: "default",
    size: 24,
    spacing: "default",
  },
  parameters: {
    design: {
      type: "figma",
      url: figmaUrl("5133-3041"),
    },
  },
};

export default meta;
type Story = StoryObj<IconComponentProps>;

// ----------------------------------------------------------------------

export const Default: Story = {};

export const Filled: Story = {
  args: { icon: "AddBox", variant: "filled" },
};

export const Duotone: Story = {
  args: { icon: "AddBox", variant: "duotone" },
};

export const Size16: Story = {
  args: { icon: "AddBox", size: 16, spacing: "none" },
};

export const Size48: Story = {
  args: { icon: "AddBox", size: 48 },
};

export const WithLabel: Story = {
  args: { icon: "AddBox", label: "Erreur" },
};

// ----------------------------------------------------------------------
// Showcase : all colors for a single icon

export const AllColors: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      {COLORS.map((c) => (
        <div
          key={c}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            padding: c === "inverted" ? "8px" : undefined,
            background: c === "inverted" ? "var(--background-brand-bold-default, #22427c)" : undefined,
            borderRadius: c === "inverted" ? 8 : undefined,
          }}
        >
          <Icon {...args} color={c} icon="AddBox" />
          <span
            style={{
              fontSize: 10,
              color:  c === "inverted" ? "var(--text-inverted, #fff)" : "var(--text-secondary, #888)",
            }}
          >
            {c}
          </span>
        </div>
      ))}
    </div>
  ),
};

// Showcase : all variants for a single icon

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      {VARIANTS.map((v) => (
        <div
          key={v}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Icon {...args} variant={v} icon="AddBox" />
          <span
            style={{
              fontSize: 10,
              color: "var(--text-secondary, #888)",
            }}
          >
            {v}
          </span>
        </div>
      ))}
    </div>
  ),
};
