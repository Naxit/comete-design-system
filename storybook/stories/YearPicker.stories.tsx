// YearPicker — stories Storybook
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { YearPicker, Field } from "@naxit/comete-design-system/components";
import type {
  YearPickerProps,
  SingleYearPickerProps,
  RangeYearPickerProps,
} from "@naxit/comete-design-system/components";

// -----------------------------------------------------------------------
// Figma

const FIGMA_FILE =
  "https://www.figma.com/design/YO9cW75K8aLcM5BbojZAqB/Com%C3%A8te-Design-System";
const figmaUrl = (nodeId: string) =>
  `${FIGMA_FILE}?node-id=${nodeId.replace(":", "-")}`;

// -----------------------------------------------------------------------
// Meta

const meta = {
  title: "Components/YearPicker",
  component: YearPicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: figmaUrl("3370:6833"),
    },
  },
  argTypes: {
    year: {
      control: { type: "number" },
      description: "Année sélectionnée — mode single",
    },
    isEditable: {
      control: "boolean",
      description: "Mode saisie (input + icône calendrier)",
    },
    appearance: {
      control: { type: "inline-radio" },
      options: ["default", "subtle"],
      description: "Apparence visuelle",
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
} satisfies Meta<typeof YearPicker>;

export default meta;
type Story = StoryObj<typeof YearPicker>;

// -----------------------------------------------------------------------
// Render helpers

/** Render contrôlé pour le mode simple (single). */
function ControlledRender(args: YearPickerProps) {
  const single = args as SingleYearPickerProps;
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(single.year ?? currentYear);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "center",
      }}
    >
      <YearPicker
        {...(args as Record<string, unknown>)}
        isRange={false}
        year={year}
        onChange={(y) => {
          setYear(y);
        }}
      />
      <p
        style={{
          fontFamily: "var(--font-family-primary)",
          fontSize: "var(--font-size-ui-xs)",
          color: "var(--text-subtlest)",
        }}
      >
        Sélection : {year}
      </p>
    </div>
  );
}

/** Render contrôlé pour le mode plage (range). */
function ControlledRangeRender(args: YearPickerProps) {
  const range = args as RangeYearPickerProps;
  const [startYear, setStartYear] = useState(range.startYear ?? 2023);
  const [endYear, setEndYear] = useState(range.endYear ?? 2025);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "center",
      }}
    >
      <YearPicker
        {...(args as Record<string, unknown>)}
        isRange
        startYear={startYear}
        endYear={endYear}
        onChange={(sy, ey) => {
          setStartYear(sy);
          setEndYear(ey);
        }}
      />
      <p
        style={{
          fontFamily: "var(--font-family-primary)",
          fontSize: "var(--font-size-ui-xs)",
          color: "var(--text-subtlest)",
        }}
      >
        Sélection : {startYear} → {endYear}
      </p>
    </div>
  );
}

// -----------------------------------------------------------------------
// Stories

/** Mode saisie (défaut) — input année + icône calendrier. */
export const Default: Story = {
  render: ControlledRender,
  parameters: {
    design: { type: "figma", url: figmaUrl("3370:6839") },
  },
};

/** Mode navigation — chevrons ←/→ + bouton année. */
export const NonEditable: Story = {
  render: ControlledRender,
  args: {
    year: 2025,
    isEditable: false,
  },
  parameters: {
    design: { type: "figma", url: figmaUrl("3370:6839") },
  },
};

/** YearPicker subtle. */
export const Subtle: Story = {
  render: ControlledRender,
  args: {
    year: 2025,
    appearance: "subtle",
  },
  parameters: {
    design: { type: "figma", url: figmaUrl("3370:6839") },
  },
};

/** YearPicker invalid. */
export const Invalid: Story = {
  render: ControlledRender,
  args: {
    year: 2025,
    isInvalid: true,
  },
  parameters: {
    design: { type: "figma", url: figmaUrl("3370:6839") },
  },
};

/** État désactivé. */
export const Disabled: Story = {
  render: ControlledRender,
  args: {
    year: 2025,
    isDisabled: true,
  },
  parameters: {
    design: { type: "figma", url: figmaUrl("3513:37040") },
  },
};

/** YearPicker dans un Field avec label. */
export const WithField: Story = {
  name: "With Field wrapper",
  render: (args: YearPickerProps) => {
    const single = args as SingleYearPickerProps;
    const [year, setYear] = useState(single.year ?? 2025);
    return (
      <Field label="Année" isRequired>
        <YearPicker
          {...(args as Record<string, unknown>)}
          isRange={false}
          year={year}
          onChange={setYear}
        />
      </Field>
    );
  },
};

/** YearPicker avec message d'erreur. */
export const FieldInvalid: Story = {
  name: "Field invalid",
  args: { isInvalid: true },
  render: (args: YearPickerProps) => {
    const single = args as SingleYearPickerProps;
    const [year, setYear] = useState(single.year ?? 2025);
    return (
      <Field
        label="Année"
        message="L'année est invalide"
        messageType="critical"
      >
        <YearPicker
          {...(args as Record<string, unknown>)}
          isRange={false}
          year={year}
          onChange={setYear}
        />
      </Field>
    );
  },
};

/** Mode plage saisie — "2023 → 2025" + icône calendrier. */
export const Range: Story = {
  render: ControlledRangeRender,
  args: {
    isRange: true,
    startYear: 2023,
    endYear: 2025,
  } as never,
  parameters: {
    design: { type: "figma", url: figmaUrl("4253:12831") },
  },
};

/** Mode plage navigation — deux boutons année + icône calendrier. */
export const RangeNonEditable: Story = {
  name: "Range — non editable",
  render: ControlledRangeRender,
  args: {
    isRange: true,
    isEditable: false,
    startYear: 2023,
    endYear: 2025,
  } as never,
  parameters: {
    design: { type: "figma", url: figmaUrl("4253:12831") },
  },
};

/** Toutes les apparences. */
export const AllAppearances: Story = {
  name: "All appearances",
  render: (args: YearPickerProps) => {
    const single = args as SingleYearPickerProps;
    const [yearDefault, setYearDefault] = useState(single.year ?? 2025);
    const [yearSubtle, setYearSubtle] = useState(single.year ?? 2025);
    return (
      <div style={{ display: "flex", gap: 32 }}>
        <Field label="Default">
          <YearPicker
            {...(args as Record<string, unknown>)}
            isRange={false}
            year={yearDefault}
            onChange={setYearDefault}
          />
        </Field>
        <Field label="Subtle">
          <YearPicker
            {...(args as Record<string, unknown>)}
            isRange={false}
            year={yearSubtle}
            onChange={setYearSubtle}
            appearance="subtle"
          />
        </Field>
      </div>
    );
  },
};
