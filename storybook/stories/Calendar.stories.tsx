// Calendar — stories Storybook (composant unifié)
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CalendarDate } from "@internationalized/date";
import type { DateValue } from "react-aria-components";
import type { RangeValue } from "react-aria-components";
import {
  Calendar,
  RangeCalendar,
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
  parameters: {
    layout: "padded",
    design: { type: "figma", url: figmaUrl("3223:8583") },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof Calendar>;

// -----------------------------------------------------------------------
// appearance="date" (défaut)

export const Default: Story = {
  name: "Date — défaut",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => (
    <Calendar
      aria-label="Choisir une date"
      defaultValue={new CalendarDate(2026, 3, 15)}
    />
  ),
};

export const Controlled: Story = {
  name: "Date — contrôlé",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => {
    // REASON: histoire interactive nécessite un state local
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
  },
};

export const Disabled: Story = {
  name: "Date — désactivé",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => (
    <Calendar
      aria-label="Calendrier désactivé"
      defaultValue={new CalendarDate(2026, 3, 15)}
      isDisabled
    />
  ),
};

export const WithMinMax: Story = {
  name: "Date — min/max",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => (
    <Calendar
      aria-label="Choisir une date"
      defaultValue={new CalendarDate(2026, 3, 15)}
      minValue={new CalendarDate(2026, 3, 10)}
      maxValue={new CalendarDate(2026, 3, 25)}
    />
  ),
};

export const DualDate: Story = {
  name: "Date — deux calendriers",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => (
    <Calendar
      aria-label="Choisir une date"
      calendars={2}
      defaultValue={new CalendarDate(2026, 3, 15)}
    />
  ),
};

// -----------------------------------------------------------------------
// appearance="week"

export const Week: Story = {
  name: "Semaine",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => (
    <Calendar
      appearance="week"
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
  render: () => {
    const [range, setRange] = useState<RangeValue<CalendarDate>>({
      start: new CalendarDate(2026, 3, 9),
      end: new CalendarDate(2026, 3, 15),
    });
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Calendar appearance="week" value={range} onChange={setRange} />
        <p style={{ fontFamily: "monospace", fontSize: 13 }}>
          {range.start.toString()} → {range.end.toString()}
        </p>
      </div>
    );
  },
};

export const WeekPeriod: Story = {
  name: "Semaine — période multi-semaines",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => {
    const [range, setRange] = useState<RangeValue<CalendarDate>>({
      start: new CalendarDate(2026, 3, 2),
      end: new CalendarDate(2026, 3, 22),
    });
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Calendar appearance="week" value={range} onChange={setRange} />
        <p style={{ fontFamily: "monospace", fontSize: 13 }}>
          {range.start.toString()} → {range.end.toString()}
        </p>
      </div>
    );
  },
};

export const WeekDisabled: Story = {
  name: "Semaine — désactivé",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => (
    <Calendar
      appearance="week"
      defaultValue={{
        start: new CalendarDate(2026, 3, 9),
        end: new CalendarDate(2026, 3, 15),
      }}
      isDisabled
    />
  ),
};

// -----------------------------------------------------------------------
// appearance="month"

export const Month: Story = {
  name: "Mois",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => (
    <Calendar
      appearance="month"
      defaultValue={new CalendarDate(2026, 3, 1)}
    />
  ),
};

export const MonthControlled: Story = {
  name: "Mois — contrôlé",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => {
    const [value, setValue] = useState<CalendarDate>(
      new CalendarDate(2026, 3, 1)
    );
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Calendar appearance="month" value={value} onChange={setValue} />
        <p style={{ fontFamily: "monospace", fontSize: 13 }}>
          Sélectionné : {value.year}/{String(value.month).padStart(2, "0")}
        </p>
      </div>
    );
  },
};

export const DualMonth: Story = {
  name: "Mois — deux calendriers",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => (
    <Calendar
      appearance="month"
      calendars={2}
      defaultValue={new CalendarDate(2026, 3, 1)}
    />
  ),
};

export const MonthDisabled: Story = {
  name: "Mois — désactivé",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => (
    <Calendar
      appearance="month"
      defaultValue={new CalendarDate(2026, 3, 1)}
      isDisabled
    />
  ),
};

// -----------------------------------------------------------------------
// appearance="year"

export const Year: Story = {
  name: "Année",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => (
    <Calendar appearance="year" defaultValue={new CalendarDate(2026, 1, 1)} />
  ),
};

export const YearControlled: Story = {
  name: "Année — contrôlée",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => {
    const [value, setValue] = useState<CalendarDate>(
      new CalendarDate(2026, 1, 1)
    );
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Calendar appearance="year" value={value} onChange={setValue} />
        <p style={{ fontFamily: "monospace", fontSize: 13 }}>
          Sélectionné : {value.year}
        </p>
      </div>
    );
  },
};

export const YearDisabled: Story = {
  name: "Année — désactivée",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => (
    <Calendar
      appearance="year"
      defaultValue={new CalendarDate(2026, 1, 1)}
      isDisabled
    />
  ),
};

// -----------------------------------------------------------------------
// RangeCalendar (plage de dates jour-à-jour)

export const Range: StoryObj<typeof RangeCalendar> = {
  name: "Plage de dates",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => (
    <RangeCalendar
      aria-label="Choisir une plage"
      defaultValue={{
        start: new CalendarDate(2026, 3, 10),
        end: new CalendarDate(2026, 3, 20),
      }}
    />
  ),
};

export const RangeControlled: StoryObj<typeof RangeCalendar> = {
  name: "Plage contrôlée",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => {
    const [range, setRange] = useState<RangeValue<DateValue>>({
      start: new CalendarDate(2026, 3, 10),
      end: new CalendarDate(2026, 3, 20),
    });
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <RangeCalendar
          aria-label="Choisir une plage"
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
