// Calendar — stories Storybook (composant unifié)
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarDate } from "@internationalized/date";
import type { DateValue } from "react-aria-components";
import type { RangeValue } from "react-aria-components";
import {
  Calendar,
  RangeCalendar,
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
    layout: "padded",
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
    isDisabled: {
      control: "boolean",
      description: "Désactive le composant.",
      table: { defaultValue: { summary: "false" } },
    },
  },
  args: {
    appearance: "date",
    calendars: 1,
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
  render: ({ appearance, calendars, isDisabled }) => (
    <Calendar
      appearance={appearance}
      calendars={calendars}
      isDisabled={isDisabled}
      aria-label="Calendrier"
    />
  ),
};

// -----------------------------------------------------------------------
// appearance="date" (défaut)

export const Default: Story = {
  name: "Date",
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

// -----------------------------------------------------------------------
// RangeCalendar (plage de dates jour-à-jour)

export const Range: StoryObj<typeof RangeCalendar> = {
  name: "Date — période",
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
  name: "Date — période contrôlée",
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

export const DualDate: Story = {
  name: "Date — deux calendriers (plage)",
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
      aria-label="Choisir une semaine"
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
        <Calendar aria-label="Choisir une semaine" appearance="week" value={range} onChange={setRange} />
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
      aria-label="Calendrier semaine désactivé"
      appearance="week"
      defaultValue={{
        start: new CalendarDate(2026, 3, 9),
        end: new CalendarDate(2026, 3, 15),
      }}
      isDisabled
    />
  ),
};

export const WeekPeriod: Story = {
  name: "Semaine — période simple",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => {
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
  },
};

// -----------------------------------------------------------------------
// appearance="week", calendars=2

export const WeekPeriodDual: Story = {
  name: "Semaine — deux calendriers (plage)",
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

export const Month: Story = {
  name: "Mois",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => (
    <Calendar
      aria-label="Choisir un mois"
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
        <Calendar aria-label="Choisir un mois" appearance="month" value={value} onChange={setValue} />
        <p style={{ fontFamily: "monospace", fontSize: 13 }}>
          Sélectionné : {value.year}/{String(value.month).padStart(2, "0")}
        </p>
      </div>
    );
  },
};

export const MonthDisabled: Story = {
  name: "Mois — désactivé",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => (
    <Calendar
      aria-label="Calendrier mois désactivé"
      appearance="month"
      defaultValue={new CalendarDate(2026, 3, 1)}
      isDisabled
    />
  ),
};

export const DualMonth: Story = {
  name: "Mois — deux calendriers (plage)",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => {
    const [range, setRange] = useState<RangeValue<CalendarDate> | undefined>({
      start: new CalendarDate(2026, 3, 1),
      end: new CalendarDate(2026, 8, 1),
    });
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Calendar
          aria-label="Choisir une période"
          appearance="month"
          calendars={2}
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
  },
};

// -----------------------------------------------------------------------
// appearance="year"

export const Year: Story = {
  name: "Année",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => (
    <Calendar aria-label="Choisir une année" appearance="year" defaultValue={new CalendarDate(2026, 1, 1)} />
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
        <Calendar aria-label="Choisir une année" appearance="year" value={value} onChange={setValue} />
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
      aria-label="Calendrier année désactivé"
      appearance="year"
      defaultValue={new CalendarDate(2026, 1, 1)}
      isDisabled
    />
  ),
};

// -----------------------------------------------------------------------
// appearance="year", calendars=2

export const DualYear: Story = {
  name: "Année — deux calendriers (plage)",
  parameters: { design: { type: "figma", url: figmaUrl("3223:8583") } },
  render: () => {
    const [range, setRange] = useState<RangeValue<CalendarDate> | undefined>({
      start: new CalendarDate(2024, 1, 1),
      end: new CalendarDate(2031, 1, 1),
    });
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Calendar
          aria-label="Choisir une période"
          appearance="year"
          calendars={2}
          value={range}
          onChange={setRange}
        />
        <p style={{ fontFamily: "monospace", fontSize: 13 }}>
          {range ? `${range.start.year} → ${range.end.year}` : "–"}
        </p>
      </div>
    );
  },
};