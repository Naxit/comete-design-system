// TextField + Field — stories Storybook
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Field,
  TextField,
  type TextFieldAppearance,
} from "@naxit/comete-design-system/components";
import { fn } from "storybook/test";

const FIGMA_FILE =
  "https://www.figma.com/design/YO9cW75K8aLcM5BbojZAqB/Com%C3%A8te-Design-System";
const figmaUrl = (nodeId: string) =>
  `${FIGMA_FILE}?node-id=${nodeId.replace(":", "-")}`;

// -----------------------------------------------------------------------
// Meta

const meta = {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
    design: { type: "figma", url: figmaUrl("3232:15140") },
  },
  argTypes: {
    appearance: {
      control: "select",
      options: ["default", "subtle"] satisfies TextFieldAppearance[],
    },
    isCompact: { control: "boolean" },
    isDisabled: { control: "boolean" },
    isInvalid: { control: "boolean" },
    isRequired: { control: "boolean" },
    placeholder: { control: "text" },
    className: { control: "text" },
  },
  args: {
    "aria-label": "Champ texte",
    placeholder: "Placeholder",
    onChange: fn(),
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof TextField>;

// -----------------------------------------------------------------------
// Stories

/** TextField default. */
export const Default: Story = {
  parameters: { design: { type: "figma", url: figmaUrl("14:975") } },
};

/** TextField subtle (bordure basse uniquement). */
export const Subtle: Story = {
  parameters: { design: { type: "figma", url: figmaUrl("3499:77572") } },
  args: { appearance: "subtle" },
};

/** TextField compact. */
export const Compact: Story = {
  args: { isCompact: true },
};

/** TextField invalid. */
export const Invalid: Story = {
  parameters: { design: { type: "figma", url: figmaUrl("398:3720") } },
  args: { isInvalid: true, defaultValue: "Value" },
};

/** TextField disabled. */
export const Disabled: Story = {
  parameters: { design: { type: "figma", url: figmaUrl("2881:47347") } },
  args: { isDisabled: true, defaultValue: "Value" },
};

/** TextField dans un Field avec label et message. */
export const WithField: Story = {
  name: "With Field wrapper",
  render: () => (
    <div style={{ width: 280 }}>
      <Field label="Email" isRequired>
        <TextField placeholder="nom@example.com" type="email" />
      </Field>
    </div>
  ),
};

/** Field avec message d'erreur. */
export const FieldInvalid: Story = {
  name: "Field invalid",
  render: () => (
    <div style={{ width: 280 }}>
      <Field
        label="Email"
        isRequired
        message="Ce champ est requis"
        messageType="critical"
      >
        <TextField
          placeholder="nom@example.com"
          type="email"
          isInvalid
        />
      </Field>
    </div>
  ),
};

/** Field avec message de succès. */
export const FieldSuccess: Story = {
  name: "Field success",
  render: () => (
    <div style={{ width: 280 }}>
      <Field label="Email" message="Adresse valide" messageType="success">
        <TextField defaultValue="axel@example.com" type="email" />
      </Field>
    </div>
  ),
};

/** Toutes les apparences × états. */
export const AllStates: Story = {
  name: "All states",
  render: () => {
    const appearances: TextFieldAppearance[] = ["default", "subtle"];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {appearances.map((a) => (
          <div key={a} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                color: "var(--text-subtlest)",
              }}
            >
              appearance={a}
            </span>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <div style={{ width: 200 }}>
                <Field label="Default">
                  <TextField appearance={a} placeholder="Placeholder" />
                </Field>
              </div>
              <div style={{ width: 200 }}>
                <Field label="Filled">
                  <TextField appearance={a} defaultValue="Value" />
                </Field>
              </div>
              <div style={{ width: 200 }}>
                <Field label="Invalid" message="Error message" messageType="critical">
                  <TextField appearance={a} defaultValue="Value" isInvalid />
                </Field>
              </div>
              <div style={{ width: 200 }}>
                <Field label="Disabled">
                  <TextField appearance={a} defaultValue="Value" isDisabled />
                </Field>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  },
};
