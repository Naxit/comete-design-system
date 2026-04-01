import { Illustration } from "@naxit/comete-design-system";
import type { IllustrationComponentProps, IllustrationSize } from "@naxit/comete-design-system";
import type { IllustrationName } from "@naxit/comete-illustrations";
import { illustrationRegistry } from "@naxit/comete-illustrations";
import type { Meta, StoryObj } from "@storybook/react-vite";

// ----------------------------------------------------------------------
// Build illustration name list from the registry (always in sync with the package)

const ILLUSTRATION_NAMES: IllustrationName[] = Object.keys(
  illustrationRegistry,
).sort() as IllustrationName[];

// ----------------------------------------------------------------------

const SIZES: IllustrationSize[] = [128, 256, 512];

// ----------------------------------------------------------------------

const meta: Meta<IllustrationComponentProps> = {
  title: "Components/Illustration",
  component: Illustration,
  tags: ["autodocs"],
  argTypes: {
    illustration: {
      control: "select",
      options: ILLUSTRATION_NAMES,
      description: "Name of the illustration to render",
    },
    size: {
      control: "select",
      options: SIZES,
    },
    label: {
      control: "text",
      description: "Accessible label (makes the illustration non-decorative)",
    },
  },
  args: {
    illustration: "Empty",
    size: 256,
  },
};

export default meta;
type Story = StoryObj<IllustrationComponentProps>;

// ----------------------------------------------------------------------

export const Default: Story = {};

export const Size128: Story = {
  args: { illustration: "Empty", size: 128 },
};

export const Size512: Story = {
  args: { illustration: "Empty", size: 512 },
};

export const WithLabel: Story = {
  args: { illustration: "ForbiddenAccess", label: "Accès refusé" },
};

// ----------------------------------------------------------------------
// Showcase : all sizes for a single illustration

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "end" }}>
      {SIZES.map((s) => (
        <div
          key={s}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Illustration {...args} size={s} illustration="Empty" />
          <span style={{ fontSize: 12, color: "var(--text-secondary, #888)" }}>
            {s}px
          </span>
        </div>
      ))}
    </div>
  ),
};

// Showcase : all illustrations at default size

export const AllIllustrations: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 24,
      }}
    >
      {ILLUSTRATION_NAMES.map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            padding: 16,
          }}
        >
          <Illustration illustration={name} size={128} />
          <span
            style={{
              fontSize: 11,
              color: "var(--text-secondary, #888)",
              textAlign: "center",
              wordBreak: "break-word",
            }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
};
