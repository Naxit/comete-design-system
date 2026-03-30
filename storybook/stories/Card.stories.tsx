// Card — stories Storybook
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CardVariant } from "@naxit/comete-design-system/components";
import { Card } from "@naxit/comete-design-system/components";

const FIGMA_FILE = "https://www.figma.com/design/YO9cW75K8aLcM5BbojZAqB/Com%C3%A8te-Design-System";
const figmaUrl = (nodeId: string) => `${FIGMA_FILE}?node-id=${nodeId.replace(":", "-")}`;

// -----------------------------------------------------------------------
// Meta

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
    design: { type: "figma", url: figmaUrl("278:1379") },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outlined", "elevated"] satisfies CardVariant[],
    },
    className: { control: "text" },
  },
  args: {
    variant: "default",
    children: (
      <div style={{ padding: 24 }}>
        <p style={{ margin: 0, color: "var(--text-primary)", fontSize: 14 }}>Contenu de la carte</p>
      </div>
    ),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

// -----------------------------------------------------------------------
// Stories

export const Default: Story = {
  parameters: { design: { type: "figma", url: figmaUrl("278:1379") } },
};

export const Outlined: Story = {
  parameters: { design: { type: "figma", url: figmaUrl("278:1379") } },
  args: { variant: "outlined" },
};

export const Elevated: Story = {
  parameters: { design: { type: "figma", url: figmaUrl("278:1379") } },
  args: { variant: "elevated" },
};

export const AllVariants: Story = {
  name: "All variants",
  parameters: { design: { type: "figma", url: figmaUrl("278:1379") } },
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
      {(["default", "outlined", "elevated"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <Card variant={variant}>
            <div style={{ padding: 24, width: 200 }}>
              <p style={{ margin: 0, color: "var(--text-primary)", fontSize: 14 }}>Contenu</p>
              <p style={{ margin: "4px 0 0", color: "var(--text-subtle)", fontSize: 12 }}>Description</p>
            </div>
          </Card>
          <span style={{ fontSize: 12, color: "var(--text-subtle)", fontFamily: "monospace" }}>{variant}</span>
        </div>
      ))}
    </div>
  ),
};
