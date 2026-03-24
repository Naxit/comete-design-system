// Calendar — Comète Design System
import {
  Calendar as AriaCalendar,
  type CalendarProps as AriaCalendarProps,
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

export interface CalendarProps<T extends DateValue>
  extends Omit<AriaCalendarProps<T>, "className" | "style"> {
  /** Classe CSS additionnelle sur le conteneur. */
  className?: string;
}

// -----------------------------------------------------------------------
// Composant

/**
 * Calendar — Comète Design System
 *
 * Sélecteur de date unique basé sur React Aria.
 * Supporte la navigation clavier complète et les attributs ARIA.
 *
 * ```tsx
 * import { CalendarDate } from "@internationalized/date";
 *
 * <Calendar
 *   defaultValue={new CalendarDate(2024, 3, 15)}
 *   onChange={(date) => console.log(date.toString())}
 * />
 * ```
 *
 * @param value        - Date sélectionnée (contrôlé)
 * @param defaultValue - Date sélectionnée par défaut
 * @param onChange     - Callback à chaque sélection
 * @param minValue     - Date minimale sélectionnable
 * @param maxValue     - Date maximale sélectionnable
 * @param isDisabled   - Désactive tout le calendrier
 * @param isReadOnly   - Lecture seule
 */
export function Calendar<T extends DateValue>({
  className,
  ...props
}: CalendarProps<T>) {
  return (
    <AriaCalendar
      {...props}
      className={[styles.calendar, className].filter(Boolean).join(" ")}
    >
      <CalendarHeader />
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
// Header interne — navigation mois précédent / suivant

function CalendarHeader() {
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
