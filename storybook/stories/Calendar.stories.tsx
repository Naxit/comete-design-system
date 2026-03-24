// Calendar / RangeCalendar — stories Storybook
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CalendarDate } from "@internationalized/date";
import type { DateValue } from "react-aria-components";
import { Calendar, RangeCalendar } from "@naxit/comete-design-system/components";
import type { RangeValue } from "react-aria-components";

const FIGMA_FILE =
  "https://www.figma.com/design/YO9cW75K8aLcM5BbojZAqB/Com%C3%A8te-Design-System";
const figmaUrl = (nodeId: string) =>
  `${FIGMA_FILE}?node-id=${nodeId.replace(":", "-")}`;

// -----------------------------------------------------------------------
// Meta (basé sur Calendar pour les argTypes)

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
// Stories — Calendar (date unique)

export const Default: Story = {
  name: "Défaut",
  parameters: { design: { type: "figma", url: figmaUrl("3209:32376") } },
  render: () => (
    <Calendar
      aria-label="Choisir une date"
      defaultValue={new CalendarDate(2026, 3, 15)}
    />
  ),
};

export const Controlled: Story = {
  name: "Contrôlé",
  parameters: { design: { type: "figma", url: figmaUrl("3209:32376") } },
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
  name: "Désactivé",
  parameters: { design: { type: "figma", url: figmaUrl("3209:32376") } },
  render: () => (
    <Calendar
      aria-label="Calendrier désactivé"
      defaultValue={new CalendarDate(2026, 3, 15)}
      isDisabled
    />
  ),
};

export const WithMinMax: Story = {
  name: "Avec min/max",
  parameters: { design: { type: "figma", url: figmaUrl("3209:32376") } },
  render: () => (
    <Calendar
      aria-label="Choisir une date"
      defaultValue={new CalendarDate(2026, 3, 15)}
      minValue={new CalendarDate(2026, 3, 10)}
      maxValue={new CalendarDate(2026, 3, 25)}
    />
  ),
};

// -----------------------------------------------------------------------
// Stories — RangeCalendar

export const Range: StoryObj<typeof RangeCalendar> = {
  name: "Plage de dates",
  parameters: { design: { type: "figma", url: figmaUrl("3209:32376") } },
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
  parameters: { design: { type: "figma", url: figmaUrl("3209:32376") } },
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
