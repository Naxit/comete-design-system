// Logo — stories Storybook
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Logo,
  type LogoAppearance,
  type LogoType,
} from "@naxit/comete-design-system/components";

const FIGMA_FILE =
  "https://www.figma.com/design/YO9cW75K8aLcM5BbojZAqB/Com%C3%A8te-Design-System";
const figmaUrl = (nodeId: string) =>
  `${FIGMA_FILE}?node-id=${nodeId.replace(":", "-")}`;

// -----------------------------------------------------------------------
// Meta

const meta = {
  title: "Components/Logo",
  component: Logo,
  tags: ["autodocs"],
  argTypes: {
    appearance: {
      control: "select",
      options: ["brand", "neutral", "inverse"] satisfies LogoAppearance[],
    },
    type: {
      control: "select",
      options: ["icon", "logo"] satisfies LogoType[],
    },
    size: {
      control: { type: "number", min: 16, max: 96, step: 4 },
    },
  },
  args: {
    product: "comete",
    appearance: "brand",
    type: "logo",
    size: 32,
  },
  parameters: {
    layout: "centered",
    design: { type: "figma", url: figmaUrl("1981:32146") },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof Logo>;

// -----------------------------------------------------------------------
// Stories

/** Logo Comète par défaut (brand, logo, 32px). */
export const Default: Story = {};

/** Icône seule. */
export const IconOnly: Story = {
  name: "Icon only",
  args: { type: "icon" },
};

/** Apparence neutral (monochrome sombre). */
export const Neutral: Story = {
  args: { appearance: "neutral" },
};

/** Apparence inverse (pour fond sombre). */
export const Inverse: Story = {
  args: { appearance: "inverse" },
  decorators: [
    (Story) => (
      <div
        style={{
          background: "var(--background-default-inverted)",
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--border-default)",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/** Taille large. */
export const Large: Story = {
  args: { size: 48 },
};

/** Toutes les apparences × types. */
export const AllVariants: Story = {
  name: "All variants",
  render: () => {
    const appearances: LogoAppearance[] = ["brand", "neutral", "inverse"];
    const types: LogoType[] = ["logo", "icon"];
    const sizes = [16, 24, 32, 48];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {appearances.map((a) => (
          <div
            key={a}
            style={{
              background: a === "inverse" ? "var(--background-default-inverted)" : undefined,
              padding: 24,
              borderRadius: 8,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: a === "inverse" ? "var(--text-inverted)" : "var(--text-subtlest)",
              }}
            >
              appearance={a}
            </span>
            {types.map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center",gap: 16 }}>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 11,
                    width: 60,
                    color: a === "inverse" ? "var(--text-inverted)" : "var(--text-subtlest)",
                  }}
                >
                  {t}
                </span>
                {sizes.map((s) => (
                  <Logo key={s} product="comete" appearance={a} type={t} size={s} />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};
