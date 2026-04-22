// WeekPicker — stories Storybook
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { WeekPicker, Field } from "@naxit/comete-design-system/components";
import type {
  WeekPickerProps,
  SingleWeekPickerProps,
  RangeWeekPickerProps,
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
  title: "Components/WeekPicker",
  component: WeekPicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: figmaUrl("3563:89666"),
    },
  },
  argTypes: {
    week: {
      control: { type: "number", min: 1, max: 53 },
      description: "Numéro de semaine ISO (1-53) — mode single",
    },
    year: {
      control: { type: "number" },
      description: "Année ISO de la semaine — mode single",
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
} satisfies Meta<typeof WeekPicker>;

export default meta;
type Story = StoryObj<typeof WeekPicker>;

// -----------------------------------------------------------------------
// Render helpers

/** Render contrôlé pour le mode simple (single). */
function ControlledRender(args: WeekPickerProps) {
  const single = args as SingleWeekPickerProps;
  const [week, setWeek] = useState(single.week ?? 28);
  const [year, setYear] = useState(single.year ?? 2025);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "center",
      }}
    >
      <WeekPicker
        {...(args as Record<string, unknown>)}
        isRange={false}
        week={week}
        year={year}
        onChange={(w, y) => {
          setWeek(w);
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
        Sélection : S{week} / {year}
      </p>
    </div>
  );
}

/** Render contrôlé pour le mode plage (range). */
function ControlledRangeRender(args: WeekPickerProps) {
  const range = args as RangeWeekPickerProps;
  const [startWeek, setStartWeek] = useState(range.startWeek ?? 28);
  const [startYear, setStartYear] = useState(range.startYear ?? 2025);
  const [endWeek, setEndWeek] = useState(range.endWeek ?? 32);
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
      <WeekPicker
        {...(args as Record<string, unknown>)}
        isRange
        startWeek={startWeek}
        startYear={startYear}
        endWeek={endWeek}
        endYear={endYear}
        onChange={(sw, sy, ew, ey) => {
          setStartWeek(sw);
          setStartYear(sy);
          setEndWeek(ew);
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
        Sélection : S{startWeek}/{startYear} → S{endWeek}/{endYear}
      </p>
    </div>
  );
}

// -----------------------------------------------------------------------
// Stories

/** Mode saisie (défaut) — input semaine + icône calendrier. */
export const Default: Story = {
  render: ControlledRender,
  parameters: {
    design: { type: "figma", url: figmaUrl("3563:89666") },
  },
};

/** Mode navigation — chevrons ←/→ + bouton semaine formaté. */
export const NonEditable: Story = {
  render: ControlledRender,
  args: {
    week: 28,
    year: 2025,
    isEditable: false,
  },
  parameters: {
    design: { type: "figma", url: figmaUrl("3563:89666") },
  },
};

/** WeekPicker subtle. */
export const Subtle: Story = {
  render: ControlledRender,
  args: {
    week: 28,
    year: 2025,
    appearance: "subtle",
  },
  parameters: {
    design: { type: "figma", url: figmaUrl("3563:89666") },
  },
};

/** WeekPicker invalid. */
export const Invalid: Story = {
  render: ControlledRender,
  args: {
    week: 28,
    year: 2025,
    isInvalid: true,
  },
  parameters: {
    design: { type: "figma", url: figmaUrl("3563:89666") },
  },
};

/** État désactivé. */
export const Disabled: Story = {
  render: ControlledRender,
  args: {
    week: 28,
    year: 2025,
    isDisabled: true,
  },
  parameters: {
    design: { type: "figma", url: figmaUrl("3563:89666") },
  },
};

/** WeekPicker dans un Field avec label. */
export const WithField: Story = {
  name: "With Field wrapper",
  render: (args: WeekPickerProps) => {
    const single = args as SingleWeekPickerProps;
    const [week, setWeek] = useState(single.week ?? 28);
    const [year, setYear] = useState(single.year ?? 2025);
    return (
      <Field label="Semaine" isRequired>
        <WeekPicker
          {...(args as Record<string, unknown>)}
          isRange={false}
          week={week}
          year={year}
          onChange={(w, y) => {
            setWeek(w);
            setYear(y);
          }}
        />
      </Field>
    );
  },
};

/** WeekPicker avec message d'erreur. */
export const FieldInvalid: Story = {
  name: "Field invalid",
  args: { isInvalid: true },
  render: (args: WeekPickerProps) => {
    const single = args as SingleWeekPickerProps;
    const [week, setWeek] = useState(single.week ?? 28);
    const [year, setYear] = useState(single.year ?? 2025);
    return (
      <Field
        label="Semaine"
        message="La semaine est invalide"
        messageType="critical"
      >
        <WeekPicker
          {...(args as Record<string, unknown>)}
          isRange={false}
          week={week}
          year={year}
          onChange={(w, y) => {
            setWeek(w);
            setYear(y);
          }}
        />
      </Field>
    );
  },
};

/** Mode plage saisie — "Sem. 28 • ... → Sem. 32 • ..." + icône calendrier. */
export const Range: Story = {
  render: ControlledRangeRender,
  args: {
    isRange: true,
    startWeek: 28,
    startYear: 2025,
    endWeek: 32,
    endYear: 2025,
  } as never,
};

/** Mode plage navigation — deux boutons semaine cliquables + icône calendrier. */
export const RangeNonEditable: Story = {
  name: "Range — non editable",
  render: ControlledRangeRender,
  args: {
    isRange: true,
    isEditable: false,
    startWeek: 28,
    startYear: 2025,
    endWeek: 32,
    endYear: 2025,
  } as never,
};

/** Toutes les apparences. */
export const AllAppearances: Story = {
  name: "All appearances",
  render: (args: WeekPickerProps) => {
    const single = args as SingleWeekPickerProps;
    const [weekDef, setWeekDef] = useState(single.week ?? 28);
    const [yearDef, setYearDef] = useState(single.year ?? 2025);
    const [weekSub, setWeekSub] = useState(single.week ?? 28);
    const [yearSub, setYearSub] = useState(single.year ?? 2025);
    return (
      <div style={{ display: "flex", gap: 32 }}>
        <Field label="Default">
          <WeekPicker
            {...(args as Record<string, unknown>)}
            isRange={false}
            week={weekDef}
            year={yearDef}
            onChange={(w, y) => {
              setWeekDef(w);
              setYearDef(y);
            }}
          />
        </Field>
        <Field label="Subtle">
          <WeekPicker
            {...(args as Record<string, unknown>)}
            isRange={false}
            week={weekSub}
            year={yearSub}
            onChange={(w, y) => {
              setWeekSub(w);
              setYearSub(y);
            }}
            appearance="subtle"
          />
        </Field>
      </div>
    );
  },
};
