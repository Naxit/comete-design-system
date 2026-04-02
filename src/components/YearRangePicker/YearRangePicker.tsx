// YearRangePicker — Comète Design System
// Sélecteur de plage d'années : champ avec deux boutons année + popover grille.
import { useRef, useState, type ReactElement } from "react";
import {
  CalendarDate,
  today,
  getLocalTimeZone,
} from "@internationalized/date";
import { Dialog as AriaDialog, DialogTrigger } from "react-aria-components";
import type { RangeValue } from "react-aria-components";
import { Button } from "../Button/Button.js";
import { Calendar } from "../Calendar/Calendar.js";
import { InputContainer } from "../InputContainer/InputContainer.js";
import { Popover } from "../Popover/Popover.js";
import styles from "./YearRangePicker.module.css";

// -----------------------------------------------------------------------
// Types publics

export interface YearRangePickerProps {
  /** Année de début sélectionnée. */
  startYear?: number;
  /** Année de fin sélectionnée. */
  endYear?: number;
  /**
   * Nombre de calendriers affichés dans les popovers.
   * - `1` : un seul panneau (sélection d'une année unique par bouton)
   * - `2` : deux panneaux côte à côte (sélection de période)
   * @default 2
   */
  calendars?: 1 | 2;
  /** Callback appelé à chaque changement de plage. */
  onChange?: (startYear: number, endYear: number) => void;
  /** Marque le champ comme invalide. */
  isInvalid?: boolean;
  /** Désactive le composant. */
  isDisabled?: boolean;
  /** Classe CSS additionnelle. */
  className?: string;
  /** Label accessible. */
  "aria-label"?: string;
}

// -----------------------------------------------------------------------
// Composant

/**
 * YearRangePicker — Comète Design System
 *
 * Champ de sélection de plage d'années.
 *
 * Avec `calendars={2}` (défaut) :
 * - Tous les boutons ouvrent un double calendrier (sélection de période).
 *
 * Avec `calendars={1}` :
 * - Clic sur l'année de début → Calendar year simple (modifie le start)
 * - Clic sur l'année de fin   → Calendar year simple (modifie le end)
 * - Clic sur l'icône calendrier → Calendar year simple (modifie le start)
 *
 * ```tsx
 * import { YearRangePicker } from "@naxit/comete-design-system";
 *
 * <YearRangePicker
 *   startYear={2023}
 *   endYear={2025}
 *   onChange={(start, end) => console.log(start, end)}
 * />
 * ```
 */
export function YearRangePicker({
  startYear,
  endYear,
  calendars = 2,
  onChange,
  isInvalid = false,
  isDisabled = false,
  className,
  "aria-label": ariaLabel,
}: YearRangePickerProps): ReactElement {
  const currentYear = today(getLocalTimeZone()).year;

  const resolvedStart = startYear ?? currentYear;
  const resolvedEnd = endYear ?? currentYear;

  // Ref du conteneur pour positionner tous les popovers sous le champ entier
  const containerRef = useRef<HTMLDivElement>(null);

  // Popover open state — un seul popover ouvert à la fois
  const [openPopover, setOpenPopover] = useState<
    "start" | "end" | "range" | null
  >(null);

  // -- Helper : commit new range (auto-swap if start > end) --

  const commitRange = (newStart: number, newEnd: number) => {
    const [s, e] =
      newStart > newEnd ? [newEnd, newStart] : [newStart, newEnd];
    onChange?.(s, e);
  };

  // -- Handlers for single-year selection (calendars=1) --

  const handleStartYearSelect = (date: CalendarDate) => {
    commitRange(date.year, resolvedEnd);
    setOpenPopover(null);
  };

  const handleEndYearSelect = (date: CalendarDate) => {
    commitRange(resolvedStart, date.year);
    setOpenPopover(null);
  };

  // -- Handler for range selection (calendars=2) --

  const handleRangeSelect = (range: RangeValue<CalendarDate>) => {
    commitRange(range.start.year, range.end.year);
    setOpenPopover(null);
  };

  // -- Calendar values --

  const startValue = new CalendarDate(resolvedStart, 1, 1);
  const endValue = new CalendarDate(resolvedEnd, 1, 1);
  const rangeValue: RangeValue<CalendarDate> = {
    start: new CalendarDate(resolvedStart, 1, 1),
    end: new CalendarDate(resolvedEnd, 1, 1),
  };

  const rootClassNames = [styles.root, className].filter(Boolean).join(" ");

  // -- Popover content helper --

  const renderDualCalendar = () => (
    <Calendar
      appearance="year"
      calendars={2}
      value={rangeValue}
      onChange={handleRangeSelect}
      isDisabled={isDisabled}
    />
  );

  return (
    <div
      className={rootClassNames}
      ref={containerRef}
      aria-label={
        ariaLabel ?? `Plage d'années : ${resolvedStart} à ${resolvedEnd}`
      }
      data-invalid={isInvalid || undefined}
    >
      <InputContainer isDisabled={isDisabled} isInvalid={isInvalid}>
        <div className={styles.yearValue}>
          {/* Bouton année de début */}
          <DialogTrigger
            isOpen={openPopover === "start"}
            onOpenChange={(open) => setOpenPopover(open ? "start" : null)}
          >
            <Button
              variant="subtle"
              size="small"
              className={styles.yearButton}
              isDisabled={isDisabled}
              aria-label={`Année de début : ${resolvedStart}`}
            >
              {resolvedStart}
            </Button>
            <Popover
              triggerRef={containerRef}
              placement="bottom start"
              className={styles.popover}
            >
              <AriaDialog className={styles.dialog}>
                {calendars === 2 ? (
                  renderDualCalendar()
                ) : (
                  <Calendar
                    appearance="year"
                    value={startValue}
                    onChange={handleStartYearSelect}
                    isDisabled={isDisabled}
                  />
                )}
              </AriaDialog>
            </Popover>
          </DialogTrigger>

          <span className={styles.separator} aria-hidden="true">
            →
          </span>

          {/* Bouton année de fin */}
          <DialogTrigger
            isOpen={openPopover === "end"}
            onOpenChange={(open) => setOpenPopover(open ? "end" : null)}
          >
            <Button
              variant="subtle"
              size="small"
              className={styles.yearButton}
              isDisabled={isDisabled}
              aria-label={`Année de fin : ${resolvedEnd}`}
            >
              {resolvedEnd}
            </Button>
            <Popover
              triggerRef={containerRef}
              placement="bottom start"
              className={styles.popover}
            >
              <AriaDialog className={styles.dialog}>
                {calendars === 2 ? (
                  renderDualCalendar()
                ) : (
                  <Calendar
                    appearance="year"
                    value={endValue}
                    onChange={handleEndYearSelect}
                    isDisabled={isDisabled}
                  />
                )}
              </AriaDialog>
            </Popover>
          </DialogTrigger>
        </div>

        {/* Bouton calendrier */}
        <DialogTrigger
          isOpen={openPopover === "range"}
          onOpenChange={(open) => setOpenPopover(open ? "range" : null)}
        >
          <Button
            variant="subtle"
            size="small"
            iconBefore="CalendarMonth"
            className={styles.calendarButton}
            isDisabled={isDisabled}
            aria-label="Ouvrir le sélecteur d'années"
          />
          <Popover
            triggerRef={containerRef}
            placement="bottom start"
            className={styles.popover}
          >
            <AriaDialog className={styles.dialog}>
              {calendars === 2 ? (
                renderDualCalendar()
              ) : (
                <Calendar
                  appearance="year"
                  value={startValue}
                  onChange={handleStartYearSelect}
                  isDisabled={isDisabled}
                />
              )}
            </AriaDialog>
          </Popover>
        </DialogTrigger>
      </InputContainer>
    </div>
  );
}

YearRangePicker.displayName = "YearRangePicker";
