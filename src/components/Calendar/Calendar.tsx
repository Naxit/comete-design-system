// Calendar — Comète Design System
// Composant unifié : appearance=date|week|month|year, calendars=1|2, isOpen.
import { type ReactElement } from "react";
import {
  Calendar as AriaCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  Heading,
  Button as AriaButton,
  type DateValue,
} from "react-aria-components";
import type { RangeValue } from "react-aria-components";
import { type CalendarDate } from "@internationalized/date";
import { ChevronLeft, ChevronRight } from "@naxit/comete-icons";
import { FocusRing } from "../FocusRing/index.js";
import { WeekGrid } from "./WeekGrid.js";
import { MonthCalendar } from "./MonthCalendar.js";
import { YearCalendar } from "./YearCalendar.js";
import styles from "./Calendar.module.css";

// -----------------------------------------------------------------------
// Types publics

export type CalendarAppearance = "date" | "week" | "month" | "year";

/** Props communes à toutes les apparences. */
interface CalendarBaseProps {
  /**
   * Contrôlé par un DatePicker parent pour indiquer l'état ouvert/fermé.
   * Sans effet de rendu propre au calendrier — réservé au composant parent.
   */
  isOpen?: boolean;
  /**
   * Nombre de calendriers affichés côte à côte.
   * Disponible pour appearance=date et appearance=month.
   * @default 1
   */
  calendars?: 1 | 2;
  /** Classe CSS additionnelle. */
  className?: string;
}

/** Props pour appearance="date" (sélection d'une date unique). */
export interface DateCalendarProps extends CalendarBaseProps {
  appearance?: "date";
  value?: DateValue;
  defaultValue?: DateValue;
  onChange?: (value: DateValue) => void;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  minValue?: DateValue;
  maxValue?: DateValue;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  autoFocus?: boolean;
}

/** Props pour appearance="week" (sélection d'une semaine ISO). */
export interface WeekCalendarProps extends CalendarBaseProps {
  appearance: "week";
  value?: RangeValue<CalendarDate>;
  defaultValue?: RangeValue<CalendarDate>;
  onChange?: (range: RangeValue<CalendarDate>) => void;
  isDisabled?: boolean;
  minValue?: DateValue;
  maxValue?: DateValue;
  locale?: string;
  "aria-label"?: string;
}

/** Props pour appearance="month" (sélection d'un mois). */
export interface MonthCalendarProps extends CalendarBaseProps {
  appearance: "month";
  value?: CalendarDate;
  defaultValue?: CalendarDate;
  onChange?: (date: CalendarDate) => void;
  isDisabled?: boolean;
  locale?: string;
}

/** Props pour appearance="year" (sélection d'une année). */
export interface YearCalendarProps extends CalendarBaseProps {
  appearance: "year";
  value?: CalendarDate;
  defaultValue?: CalendarDate;
  onChange?: (date: CalendarDate) => void;
  isDisabled?: boolean;
}

export type CalendarProps =
  | DateCalendarProps
  | WeekCalendarProps
  | MonthCalendarProps
  | YearCalendarProps;

// -----------------------------------------------------------------------
// Composant unifié

/**
 * Calendar — Comète Design System
 *
 * Sélecteur de date/semaine/mois/année selon l'appearance.
 * Supporte 1 ou 2 calendriers côte à côte (appearance=date|month).
 *
 * ```tsx
 * // Date unique
 * <Calendar defaultValue={new CalendarDate(2026, 3, 15)} />
 *
 * // Semaine
 * <Calendar appearance="week" onChange={(range) => console.log(range)} />
 *
 * // Mois — double calendrier
 * <Calendar appearance="month" calendars={2} />
 * ```
 *
 * @param appearance - Mode de sélection (date | week | month | year)
 * @param calendars  - Nombre de calendriers côte à côte (1 | 2)
 * @param isOpen     - État ouvert/fermé contrôlé par un DatePicker parent
 */
export function Calendar(props: CalendarProps): ReactElement {
  // NOTE: isOpen est accepté sans être utilisé ici — le rendu est délégué
  // au composant DatePicker qui wrappera Calendar dans un popover.

  if (props.appearance === "week") {
    const {
      appearance: _a,
      calendars: _c,
      isOpen: _o,
      ...weekProps
    } = props;
    return <WeekGrid {...weekProps} />;
  }

  if (props.appearance === "month") {
    const {
      appearance: _a,
      isOpen: _o,
      calendars = 1,
      ...monthProps
    } = props;
    if (calendars === 2) {
      return <DualMonthCalendar {...monthProps} />;
    }
    return <MonthCalendar {...monthProps} />;
  }

  if (props.appearance === "year") {
    const {
      appearance: _a,
      calendars: _c,
      isOpen: _o,
      ...yearProps
    } = props;
    return <YearCalendar {...yearProps} />;
  }

  // appearance="date" (défaut) — TypeScript a déjà réduit à DateCalendarProps ici
  const {
    appearance: _a,
    isOpen: _o,
    calendars = 1,
    ...dateProps
  } = props;
  if (calendars === 2) {
    return <DualDateCalendar {...dateProps} />;
  }
  return <DateGrid {...dateProps} />;
}

// -----------------------------------------------------------------------
// Grille date simple (interne)

function DateGrid({
  className,
  ...props
}: Omit<DateCalendarProps, "appearance" | "calendars" | "isOpen">) {
  return (
    <AriaCalendar
      {...props}
      className={[styles.calendar, className].filter(Boolean).join(" ")}
    >
      <header className={styles.header}>
        <AriaButton slot="previous" className={styles.navButton}>
          <ChevronLeft size={20} spacing="none" variant="filled" />
        </AriaButton>
        <Heading className={styles.heading} />
        <AriaButton slot="next" className={styles.navButton}>
          <ChevronRight size={20} spacing="none" variant="filled" />
        </AriaButton>
      </header>
      <CalendarGrid className={styles.grid}>
        <CalendarGridHeader>
          {(day) => (
            <CalendarHeaderCell className={styles.headerCell}>
              {day}
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>
        <CalendarGridBody>
          {(date) => (
            <CalendarCell date={date} className={styles.cell}>
              {({ formattedDate, isFocusVisible }) => (
                <>
                  <span className={styles.cellText}>{formattedDate}</span>
                  {isFocusVisible && (
                    <FocusRing borderRadius={3} position="inside" />
                  )}
                </>
              )}
            </CalendarCell>
          )}
        </CalendarGridBody>
      </CalendarGrid>
    </AriaCalendar>
  );
}

// -----------------------------------------------------------------------
// Double grille date (calendars=2)

/**
 * Affiche deux DateGrid côte à côte, naviguant indépendamment.
 * La valeur sélectionnée est partagée entre les deux calendriers.
 */
function DualDateCalendar({
  className,
  ...props
}: Omit<DateCalendarProps, "appearance" | "calendars" | "isOpen">) {
  return (
    <div className={[styles.dualCalendar, className].filter(Boolean).join(" ")}>
      <DateGrid {...props} />
      <DateGrid {...props} />
    </div>
  );
}

// -----------------------------------------------------------------------
// Double grille mois (calendars=2)

function DualMonthCalendar({
  className,
  ...props
}: Omit<MonthCalendarProps, "appearance" | "calendars" | "isOpen">) {
  return (
    <div className={[styles.dualCalendar, className].filter(Boolean).join(" ")}>
      <MonthCalendar {...props} />
      <MonthCalendar {...props} />
    </div>
  );
}
