// RangeCalendar — Comète Design System
import {
  RangeCalendar as AriaRangeCalendar,
  type RangeCalendarProps as AriaRangeCalendarProps,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  Heading,
  Button as AriaButton,
  type DateValue,
} from "react-aria-components";
import { ChevronLeft, ChevronRight } from "@naxit/comete-icons";
import { FocusRing } from "../FocusRing/index.js";
import styles from "./Calendar.module.css";

// -----------------------------------------------------------------------
// Types publics

export interface RangeCalendarProps<T extends DateValue>
  extends Omit<AriaRangeCalendarProps<T>, "className" | "style"> {
  /** Classe CSS additionnelle sur le conteneur. */
  className?: string;
}

// -----------------------------------------------------------------------
// Composant

/**
 * RangeCalendar — Comète Design System
 *
 * Sélecteur de plage de dates basé sur React Aria.
 * Affiche les états range-start, range-part et range-end.
 *
 * ```tsx
 * import { CalendarDate } from "@internationalized/date";
 *
 * <RangeCalendar
 *   defaultValue={{
 *     start: new CalendarDate(2024, 3, 10),
 *     end: new CalendarDate(2024, 3, 20),
 *   }}
 *   onChange={({ start, end }) => console.log(start, end)}
 * />
 * ```
 *
 * @param value        - Plage sélectionnée (contrôlé)
 * @param defaultValue - Plage sélectionnée par défaut
 * @param onChange     - Callback à chaque sélection
 * @param minValue     - Date minimale
 * @param maxValue     - Date maximale
 * @param isDisabled   - Désactive tout le calendrier
 */
export function RangeCalendar<T extends DateValue>({
  className,
  ...props
}: RangeCalendarProps<T>) {
  return (
    <AriaRangeCalendar
      {...props}
      className={[styles.calendar, className].filter(Boolean).join(" ")}
    >
      <RangeCalendarHeader />
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
    </AriaRangeCalendar>
  );
}

// -----------------------------------------------------------------------
// Header interne

function RangeCalendarHeader() {
  return (
    <header className={styles.header}>
      <AriaButton slot="previous" className={styles.navButton}>
        <ChevronLeft size={20} spacing="none" variant="filled" />
      </AriaButton>
      <Heading className={styles.heading} />
      <AriaButton slot="next" className={styles.navButton}>
        <ChevronRight size={20} spacing="none" variant="filled" />
      </AriaButton>
    </header>
  );
}
