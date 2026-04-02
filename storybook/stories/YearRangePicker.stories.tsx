// YearRangePicker — stories Storybook
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { YearRangePicker } from "@naxit/comete-design-system/components";
import type { YearRangePickerProps } from "@naxit/comete-design-system/components";

// -----------------------------------------------------------------------
// Figma

const FIGMA_FILE =
  "https://www.figma.com/design/YO9cW75K8aLcM5BbojZAqB/Com%C3%A8te-Design-System";
const figmaUrl = (nodeId: string) =>
  `${FIGMA_FILE}?node-id=${nodeId.replace(":", "-")}`;

// -----------------------------------------------------------------------
// Meta

const meta = {
  title: "Components/YearRangePicker",
  component: YearRangePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: figmaUrl("4253:12831"),
    },
  },
  argTypes: {
    startYear: {
      control: { type: "number" },
      description: "Année de début",
    },
    endYear: {
      control: { type: "number" },
      description: "Année de fin",
    },
    calendars: {
      control: { type: "inline-radio" },
      options: [1, 2],
      description: "Nombre de calendriers dans le popover du bouton calendrier",
    },
    isInvalid: {
      control: "boolean",
      description: "Marque le champ comme invalide",
    },
    isDisabled: {
      control: "boolean",
      description: "Désactive le composant",
    },
  },
} satisfies Meta<typeof YearRangePicker>;

export default meta;
type Story = StoryObj<typeof YearRangePicker>;

// -----------------------------------------------------------------------
// Render helper — tous les exemples sont contrôlés via useState

function ControlledRender(args: YearRangePickerProps) {
  const currentYear = new Date().getFullYear();
  const [start, setStart] = useState(args.startYear ?? currentYear);
  const [end, setEnd] = useState(args.endYear ?? currentYear);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "center",
      }}
    >
      <YearRangePicker
        {...args}
        startYear={start}
        endYear={end}
        onChange={(s, e) => {
          setStart(s);
          setEnd(e);
        }}
      />
      <p
        style={{
          fontFamily: "var(--font-family-primary)",
          fontSize: "var(--font-size-ui-xs)",
          color: "var(--text-subtlest)",
        }}
      >
        Sélection : {start} → {end}
      </p>
    </div>
  );
}

// -----------------------------------------------------------------------
// Stories

/** État par défaut (année courante). */
export const Default: Story = {
  render: ControlledRender,
  parameters: {
    design: { type: "figma", url: figmaUrl("4254:23633") },
  },
};

/** État invalide. */
export const Invalid: Story = {
  render: ControlledRender,
  args: {
    startYear: 2025,
    endYear: 2026,
    isInvalid: true,
  },
  parameters: {
    design: { type: "figma", url: figmaUrl("4254:23633") },
  },
};

/** État désactivé. */
export const Disabled: Story = {
  render: ControlledRender,
  args: {
    startYear: 2025,
    endYear: 2026,
    isDisabled: true,
  },
  parameters: {
    design: { type: "figma", url: figmaUrl("4254:24045") },
  },
};

