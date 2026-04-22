// MonthPicker — stories Storybook
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MonthPicker, Field } from "@naxit/comete-design-system/components";
import type {
  MonthPickerProps,
  SingleMonthPickerProps,
  RangeMonthPickerProps,
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
  title: "Components/MonthPicker",
  component: MonthPicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: figmaUrl("3363:12640"),
    },
  },
  argTypes: {
    month: {
      control: { type: "number", min: 1, max: 12 },
      description: "Mois sélectionné (1-12) — mode single",
    },
    year: {
      control: { type: "number" },
      description: "Année sélectionnée — mode single",
    },
    isEditable: {
      control: "boolean",
      description: "Mode saisie (inputs + icône calendrier)",
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
} satisfies Meta<typeof MonthPicker>;

export default meta;
type Story = StoryObj<typeof MonthPicker>;

// -----------------------------------------------------------------------
// Render helpers

/** Render contrôlé pour le mode simple (single). */
function ControlledRender(args: MonthPickerProps) {
  const single = args as SingleMonthPickerProps;
  const now = new Date();
  const [month, setMonth] = useState(single.month ?? now.getMonth() + 1);
  const [year, setYear] = useState(single.year ?? now.getFullYear());
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "center",
      }}
    >
      <MonthPicker
        {...(args as Record<string, unknown>)}
        isRange={false}
        month={month}
        year={year}
        onChange={(m, y) => {
          setMonth(m);
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
        Sélection : {String(month).padStart(2, "0")}/{year}
      </p>
    </div>
  );
}

/** Render contrôlé pour le mode plage (range). */
function ControlledRangeRender(args: MonthPickerProps) {
  const range = args as RangeMonthPickerProps;
  const [startMonth, setStartMonth] = useState(range.startMonth ?? 8);
  const [startYear, setStartYear] = useState(range.startYear ?? 2025);
  const [endMonth, setEndMonth] = useState(range.endMonth ?? 11);
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
      <MonthPicker
        {...(args as Record<string, unknown>)}
        isRange
        startMonth={startMonth}
        startYear={startYear}
        endMonth={endMonth}
        endYear={endYear}
        onChange={(sm, sy, em, ey) => {
          setStartMonth(sm);
          setStartYear(sy);
          setEndMonth(em);
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
        Sélection : {String(startMonth).padStart(2, "0")}/{startYear} → {String(endMonth).padStart(2, "0")}/{endYear}
      </p>
    </div>
  );
}

// -----------------------------------------------------------------------
// Stories

/** Mode saisie (défaut) — inputs mois/année + icône calendrier. */
export const Default: Story = {
  render: ControlledRender,
  parameters: {
    design: { type: "figma", url: figmaUrl("3363:12640") },
  },
};

/** Mode navigation — chevrons ←/→ + bouton mois/année. */
export const NonEditable: Story = {
  render: ControlledRender,
  args: {
    month: 6,
    year: 2025,
    isEditable: false,
  },
  parameters: {
    design: { type: "figma", url: figmaUrl("3363:12640") },
  },
};

/** MonthPicker subtle. */
export const Subtle: Story = {
  render: ControlledRender,
  args: {
    month: 6,
    year: 2025,
    appearance: "subtle",
  },
  parameters: {
    design: { type: "figma", url: figmaUrl("3363:12640") },
  },
};

/** MonthPicker invalid. */
export const Invalid: Story = {
  render: ControlledRender,
  args: {
    month: 6,
    year: 2025,
    isInvalid: true,
  },
  parameters: {
    design: { type: "figma", url: figmaUrl("3363:12640") },
  },
};

/** État désactivé. */
export const Disabled: Story = {
  render: ControlledRender,
  args: {
    month: 6,
    year: 2025,
    isDisabled: true,
  },
  parameters: {
    design: { type: "figma", url: figmaUrl("3363:12640") },
  },
};

/** MonthPicker dans un Field avec label. */
export const WithField: Story = {
  name: "With Field wrapper",
  render: (args: MonthPickerProps) => {
    const single = args as SingleMonthPickerProps;
    const [month, setMonth] = useState(single.month ?? 6);
    const [year, setYear] = useState(single.year ?? 2025);
    return (
      <Field label="Mois" isRequired>
        <MonthPicker
          {...(args as Record<string, unknown>)}
          isRange={false}
          month={month}
          year={year}
          onChange={(m, y) => {
            setMonth(m);
            setYear(y);
          }}
        />
      </Field>
    );
  },
};

/** MonthPicker avec message d'erreur. */
export const FieldInvalid: Story = {
  name: "Field invalid",
  render: (args: MonthPickerProps) => {
    const single = args as SingleMonthPickerProps;
    const [month, setMonth] = useState(single.month ?? 6);
    const [year, setYear] = useState(single.year ?? 2025);
    return (
      <Field
        label="Mois"
        message="Le mois est invalide"
        messageType="critical"
      >
        <MonthPicker
          {...(args as Record<string, unknown>)}
          isRange={false}
          month={month}
          year={year}
          onChange={(m, y) => {
            setMonth(m);
            setYear(y);
          }}
          isInvalid
        />
      </Field>
    );
  },
};

/** Mode plage saisie — "Août 2025 → Novembre 2025" + icône calendrier. */
export const Range: Story = {
  render: ControlledRangeRender,
  args: {
    isRange: true,
    startMonth: 8,
    startYear: 2025,
    endMonth: 11,
    endYear: 2025,
  } as never,
  parameters: {
    design: { type: "figma", url: figmaUrl("4189:17716") },
  },
};

/** Mode plage navigation — deux boutons mois cliquables + icône calendrier. */
export const RangeNonEditable: Story = {
  name: "Range — non editable",
  render: ControlledRangeRender,
  args: {
    isRange: true,
    isEditable: false,
    startMonth: 8,
    startYear: 2025,
    endMonth: 11,
    endYear: 2025,
  } as never,
  parameters: {
    design: { type: "figma", url: figmaUrl("4189:17716") },
  },
};

/** Toutes les apparences. */
export const AllAppearances: Story = {
  name: "All appearances",
  render: (args: MonthPickerProps) => {
    const single = args as SingleMonthPickerProps;
    const [monthDef, setMonthDef] = useState(single.month ?? 6);
    const [yearDef, setYearDef] = useState(single.year ?? 2025);
    const [monthSub, setMonthSub] = useState(single.month ?? 6);
    const [yearSub, setYearSub] = useState(single.year ?? 2025);
    return (
      <div style={{ display: "flex", gap: 32 }}>
        <Field label="Default">
          <MonthPicker
            {...(args as Record<string, unknown>)}
            isRange={false}
            month={monthDef}
            year={yearDef}
            onChange={(m, y) => {
              setMonthDef(m);
              setYearDef(y);
            }}
          />
        </Field>
        <Field label="Subtle">
          <MonthPicker
            {...(args as Record<string, unknown>)}
            isRange={false}
            month={monthSub}
            year={yearSub}
            onChange={(m, y) => {
              setMonthSub(m);
              setYearSub(y);
            }}
            appearance="subtle"
          />
        </Field>
      </div>
    );
  },
};
