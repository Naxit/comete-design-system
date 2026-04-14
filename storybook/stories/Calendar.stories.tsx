// Calendar — stories Storybook (composant unifié)
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarDate } from "@internationalized/date";
import type { DateValue } from "react-aria-components";
import type { RangeValue } from "react-aria-components";
import {
  Calendar,
  type CalendarAppearance,
} from "@naxit/comete-design-system/components";

const FIGMA_FILE =
  "https://www.figma.com/design/YO9cW75K8aLcM5BbojZAqB/Com%C3%A8te-Design-System";
const figmaUrl = (nodeId: string) =>
  `${FIGMA_FILE}?node-id=${nodeId.replace(":", "-")}`;

// -----------------------------------------------------------------------
// Meta

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: figmaUrl("3223:8583") },
  },
  argTypes: {
    appearance: {
      control: "select",
      options: ["date", "week", "month", "year"] satisfies CalendarAppearance[],
      description: "Mode de sélection du calendrier.",
      table: { defaultValue: { summary: "date" } },
    },
    calendars: {
      control: "select",
      options: [1, 2],
      description: "Nombre de calendriers affichés côte à côte.",
      table: { defaultValue: { summary: "1" } },
    },
    isRange: {
      control: "boolean",
      description:
        "Active la sélection de plage (range) au lieu d'une date unique. Disponible pour appearance=date.",
      table: { defaultValue: { summary: "false" } },
    },
    isDisabled: {
      control: "boolean",
      description: "Désactive le composant.",
      table: { defaultValue: { summary: "false" } },
    },
  },
  args: {
    appearance: "date",
    calendars: 1,
    isRange: false,
    isDisabled: false,
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof Calendar>;

// -----------------------------------------------------------------------
// Playground — expose appearance + calendars comme contrôles

export const Playground: Story = {
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  // REASON: CalendarProps est une union discriminée — le render function
  // délègue à Calendar sans props value/onChange pour rester agnostique.
  // REASON: CalendarProps est une union discriminée — Storybook élargit les types des args.
  // Le cast est nécessaire car TypeScript ne peut pas réduire l'union depuis des args dynamiques.
  render: ({ appearance, calendars, isRange, isDisabled }) => {
    const props = {
      appearance,
      calendars,
      isDisabled,
      "aria-label": "Calendrier",
      ...(isRange ? { isRange: true as const } : {}),
    };
    return <Calendar {...(props as Parameters<typeof Calendar>[0])} />;
  },
};

// -----------------------------------------------------------------------
// appearance="date" (défaut)

export const Default: Story = {
  name: "Date",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: ({ isRange }) => {
    const props = {
      "aria-label": "Choisir une date",
      ...(isRange
        ? {
            isRange: true as const,
            defaultValue: {
              start: new CalendarDate(2026, 3, 10),
              end: new CalendarDate(2026, 3, 20),
            },
          }
        : { defaultValue: new CalendarDate(2026, 3, 15) }),
    };
    return <Calendar {...(props as Parameters<typeof Calendar>[0])} />;
  },
};

export const Controlled: Story = {
  name: "Date — contrôlé",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: ({ isRange }) => {
    if (isRange) return <RangeControlledCalendar />;
    return <SingleControlledCalendar />;
  },
};

/** Date unique contrôlée (interne). */
function SingleControlledCalendar() {
  const [value, setValue] = useState<DateValue>(
    new CalendarDate(2026, 3, 15)
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Calendar
        aria-label="Choisir une date"
        value={value}
        onChange={setValue}
      />
      <p style={{ fontFamily: "monospace", fontSize: 13 }}>
        Sélectionné : {value.toString()}
      </p>
    </div>
  );
}

/** Plage contrôlée (interne). */
function RangeControlledCalendar() {
  const [range, setRange] = useState<RangeValue<DateValue>>({
    start: new CalendarDate(2026, 3, 10),
    end: new CalendarDate(2026, 3, 20),
  });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Calendar
        aria-label="Choisir une plage"
        isRange
        value={range}
        onChange={setRange}
      />
      <p style={{ fontFamily: "monospace", fontSize: 13 }}>
        {range.start.toString()} → {range.end.toString()}
      </p>
    </div>
  );
}

export const WithMinMax: Story = {
  name: "Date — min/max",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: ({ isRange }) => {
    const props = {
      "aria-label": "Choisir une date",
      minValue: new CalendarDate(2026, 3, 10),
      maxValue: new CalendarDate(2026, 3, 25),
      ...(isRange
        ? {
            isRange: true as const,
            defaultValue: {
              start: new CalendarDate(2026, 3, 12),
              end: new CalendarDate(2026, 3, 18),
            },
          }
        : { defaultValue: new CalendarDate(2026, 3, 15) }),
    };
    return <Calendar {...(props as Parameters<typeof Calendar>[0])} />;
  },
};

export const Disabled: Story = {
  name: "Date — désactivé",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: ({ isRange }) => {
    const props = {
      "aria-label": "Calendrier désactivé",
      isDisabled: true,
      ...(isRange
        ? {
            isRange: true as const,
            defaultValue: {
              start: new CalendarDate(2026, 3, 10),
              end: new CalendarDate(2026, 3, 20),
            },
          }
        : { defaultValue: new CalendarDate(2026, 3, 15) }),
    };
    return <Calendar {...(props as Parameters<typeof Calendar>[0])} />;
  },
};

// -----------------------------------------------------------------------
// appearance="date", calendars=2

export const DualDate: Story = {
  name: "Date — deux calendriers",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: ({ isRange }) => {
    const props = {
      "aria-label": "Choisir une date",
      calendars: 2 as const,
      ...(isRange
        ? {
            isRange: true as const,
            defaultValue: {
              start: new CalendarDate(2026, 3, 10),
              end: new CalendarDate(2026, 3, 20),
            },
          }
        : { defaultValue: new CalendarDate(2026, 3, 15) }),
    };
    return <Calendar {...(props as Parameters<typeof Calendar>[0])} />;
  },
};

// -----------------------------------------------------------------------
// appearance="week"
// isRange=false → mode="week" (une semaine), isRange=true → mode="period" (plage de semaines)

export const Week: Story = {
  name: "Semaine",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: ({ isRange }) => (
    <Calendar
      aria-label="Choisir une semaine"
      appearance="week"
      mode={isRange ? "period" : "week"}
      defaultValue={{
        start: new CalendarDate(2026, 3, 9),
        end: new CalendarDate(2026, 3, 15),
      }}
    />
  ),
};

export const WeekControlled: Story = {
  name: "Semaine — contrôlée",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: ({ isRange }) => {
    if (isRange) return <WeekPeriodControlledCalendar />;
    return <WeekSingleControlledCalendar />;
  },
};

function WeekSingleControlledCalendar() {
  const [range, setRange] = useState<RangeValue<CalendarDate>>({
    start: new CalendarDate(2026, 3, 9),
    end: new CalendarDate(2026, 3, 15),
  });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Calendar aria-label="Choisir une semaine" appearance="week" value={range} onChange={setRange} />
      <p style={{ fontFamily: "monospace", fontSize: 13 }}>
        {range.start.toString()} → {range.end.toString()}
      </p>
    </div>
  );
}

function WeekPeriodControlledCalendar() {
  const [range, setRange] = useState<RangeValue<CalendarDate>>({
    start: new CalendarDate(2026, 3, 2),
    end: new CalendarDate(2026, 3, 22),
  });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Calendar aria-label="Choisir une période" appearance="week" mode="period" value={range} onChange={setRange} />
      <p style={{ fontFamily: "monospace", fontSize: 13 }}>
        {range.start.toString()} → {range.end.toString()}
      </p>
    </div>
  );
}

export const WeekDisabled: Story = {
  name: "Semaine — désactivé",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: ({ isRange }) => (
    <Calendar
      aria-label="Calendrier semaine désactivé"
      appearance="week"
      mode={isRange ? "period" : "week"}
      defaultValue={{
        start: new CalendarDate(2026, 3, 9),
        end: new CalendarDate(2026, 3, 15),
      }}
      isDisabled
    />
  ),
};

// -----------------------------------------------------------------------
// appearance="week", calendars=2

export const WeekDual: Story = {
  name: "Semaine — deux calendriers",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => {
    const [range, setRange] = useState<RangeValue<CalendarDate>>({
      start: new CalendarDate(2026, 3, 2),
      end: new CalendarDate(2026, 4, 19),
    });
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Calendar
          aria-label="Choisir une période"
          appearance="week"
          calendars={2}
          value={range}
          onChange={setRange}
        />
        <p style={{ fontFamily: "monospace", fontSize: 13 }}>
          {range.start.toString()} → {range.end.toString()}
        </p>
      </div>
    );
  },
};

// -----------------------------------------------------------------------
// appearance="month"
// isRange=false → mois unique, isRange=true → plage de mois (indépendant de calendars)

export const Month: Story = {
  name: "Mois",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: ({ isRange }) => {
    const props = {
      "aria-label": "Choisir un mois",
      appearance: "month" as const,
      ...(isRange
        ? {
            isRange: true as const,
            defaultValue: {
              start: new CalendarDate(2026, 3, 1),
              end: new CalendarDate(2026, 8, 1),
            },
          }
        : { defaultValue: new CalendarDate(2026, 3, 1) }),
    };
    return <Calendar {...(props as Parameters<typeof Calendar>[0])} />;
  },
};

export const MonthControlled: Story = {
  name: "Mois — contrôlé",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: ({ isRange }) => {
    if (isRange) return <MonthRangeControlledCalendar />;
    return <MonthSingleControlledCalendar />;
  },
};

function MonthSingleControlledCalendar() {
  const [value, setValue] = useState<CalendarDate>(
    new CalendarDate(2026, 3, 1)
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Calendar aria-label="Choisir un mois" appearance="month" value={value} onChange={setValue} />
      <p style={{ fontFamily: "monospace", fontSize: 13 }}>
        Sélectionné : {value.year}/{String(value.month).padStart(2, "0")}
      </p>
    </div>
  );
}

function MonthRangeControlledCalendar() {
  const [range, setRange] = useState<RangeValue<CalendarDate> | undefined>({
    start: new CalendarDate(2026, 3, 1),
    end: new CalendarDate(2026, 8, 1),
  });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Calendar
        aria-label="Choisir une période"
        appearance="month"
        isRange
        value={range}
        onChange={setRange}
      />
      <p style={{ fontFamily: "monospace", fontSize: 13 }}>
        {range
          ? `${range.start.year}/${String(range.start.month).padStart(2, "0")} → ${range.end.year}/${String(range.end.month).padStart(2, "0")}`
          : "–"}
      </p>
    </div>
  );
}

export const MonthDisabled: Story = {
  name: "Mois — désactivé",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: ({ isRange }) => {
    const props = {
      "aria-label": "Calendrier mois désactivé",
      appearance: "month" as const,
      isDisabled: true,
      ...(isRange
        ? {
            isRange: true as const,
            defaultValue: {
              start: new CalendarDate(2026, 3, 1),
              end: new CalendarDate(2026, 8, 1),
            },
          }
        : { defaultValue: new CalendarDate(2026, 3, 1) }),
    };
    return <Calendar {...(props as Parameters<typeof Calendar>[0])} />;
  },
};

// -----------------------------------------------------------------------
// appearance="year"
// isRange=false → année unique, isRange=true → plage d'années (indépendant de calendars)

export const Year: Story = {
  name: "Année",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: ({ isRange }) => {
    const props = {
      "aria-label": "Choisir une année",
      appearance: "year" as const,
      ...(isRange
        ? {
            isRange: true as const,
            defaultValue: {
              start: new CalendarDate(2024, 1, 1),
              end: new CalendarDate(2031, 1, 1),
            },
          }
        : { defaultValue: new CalendarDate(2026, 1, 1) }),
    };
    return <Calendar {...(props as Parameters<typeof Calendar>[0])} />;
  },
};

export const YearControlled: Story = {
  name: "Année — contrôlée",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: ({ isRange }) => {
    if (isRange) return <YearRangeControlledCalendar />;
    return <YearSingleControlledCalendar />;
  },
};

function YearSingleControlledCalendar() {
  const [value, setValue] = useState<CalendarDate>(
    new CalendarDate(2026, 1, 1)
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Calendar aria-label="Choisir une année" appearance="year" value={value} onChange={setValue} />
      <p style={{ fontFamily: "monospace", fontSize: 13 }}>
        Sélectionné : {value.year}
      </p>
    </div>
  );
}

function YearRangeControlledCalendar() {
  const [range, setRange] = useState<RangeValue<CalendarDate> | undefined>({
    start: new CalendarDate(2024, 1, 1),
    end: new CalendarDate(2031, 1, 1),
  });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Calendar
        aria-label="Choisir une période"
        appearance="year"
        isRange
        value={range}
        onChange={setRange}
      />
      <p style={{ fontFamily: "monospace", fontSize: 13 }}>
        {range ? `${range.start.year} → ${range.end.year}` : "–"}
      </p>
    </div>
  );
}

export const YearDisabled: Story = {
  name: "Année — désactivée",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: ({ isRange }) => {
    const props = {
      "aria-label": "Calendrier année désactivé",
      appearance: "year" as const,
      isDisabled: true,
      ...(isRange
        ? {
            isRange: true as const,
            defaultValue: {
              start: new CalendarDate(2024, 1, 1),
              end: new CalendarDate(2031, 1, 1),
            },
          }
        : { defaultValue: new CalendarDate(2026, 1, 1) }),
    };
    return <Calendar {...(props as Parameters<typeof Calendar>[0])} />;
  },
};