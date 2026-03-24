// YearCalendar — Comète Design System
import { useState } from "react";
import { Button as AriaButton } from "react-aria-components";
import { CalendarDate, today, getLocalTimeZone } from "@internationalized/date";
import { ChevronLeft, ChevronRight } from "@naxit/comete-icons";
import { FocusRing } from "../FocusRing/index.js";
import styles from "./YearCalendar.module.css";
import calStyles from "./Calendar.module.css";

// -----------------------------------------------------------------------
// Types publics

export interface YearCalendarProps {
  /**
   * Année sélectionnée — représentée par un CalendarDate quelconque de l'année
   * (seul year est utilisé).
   */
  value?: CalendarDate;
  /** Valeur initiale non contrôlée. */
  defaultValue?: CalendarDate;
  /**
   * Appelé à chaque sélection.
   * Le CalendarDate passé a toujours month=1, day=1.
   */
  onChange?: (date: CalendarDate) => void;
  /** Désactive le calendrier. */
  isDisabled?: boolean;
  /** Classe CSS additionnelle. */
  className?: string;
}

// NOTE: La grille affiche 20 ans (4 colonnes × 5 lignes), centrée sur une
// décennie de 20 ans : 2020–2039, 2040–2059, etc.
const GRID_SIZE = 20;

function decadeStart(year: number): number {
  return Math.floor(year / GRID_SIZE) * GRID_SIZE;
}

// -----------------------------------------------------------------------
// Composant

/**
 * YearCalendar — Comète Design System
 *
 * Sélecteur d'année : grille 4 × 5 affichant 20 années consécutives.
 * Navigation par plage de 20 ans (boutons précédent / suivant).
 *
 * ```tsx
 * import { CalendarDate } from "@internationalized/date";
 *
 * <YearCalendar
 *   defaultValue={new CalendarDate(2026, 1, 1)}
 *   onChange={(date) => console.log(date.year)}
 * />
 * ```
 *
 * @param value        - Année sélectionnée (contrôlé)
 * @param defaultValue - Année sélectionnée par défaut
 * @param onChange     - Callback à chaque sélection
 * @param isDisabled   - Désactive le composant
 */
export function YearCalendar({
  value,
  defaultValue,
  onChange,
  isDisabled = false,
  className,
}: YearCalendarProps) {
  const todayDate = today(getLocalTimeZone());
  const initialYear = (value ?? defaultValue)?.year ?? todayDate.year;

  const [rangeStart, setRangeStart] = useState(() => decadeStart(initialYear));

  const controlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<CalendarDate | undefined>(
    defaultValue
  );
  const resolvedYear = controlled ? value?.year : internalValue?.year;

  const handleSelect = (year: number) => {
    if (isDisabled) return;
    const date = new CalendarDate(year, 1, 1);
    if (!controlled) setInternalValue(date);
    onChange?.(date);
  };

  const handlePrev = () => setRangeStart((s) => s - GRID_SIZE);
  const handleNext = () => setRangeStart((s) => s + GRID_SIZE);
  const rangeEnd = rangeStart + GRID_SIZE - 1;

  return (
    <div
      role="group"
      aria-label={`Choisir une année — ${rangeStart}–${rangeEnd}`}
      className={[calStyles.calendar, styles.yearCalendar, className]
        .filter(Boolean)
        .join(" ")}
      data-disabled={isDisabled || undefined}
    >
      {/* Header — navigation par plage de 20 ans */}
      <header className={calStyles.header}>
        <AriaButton
          className={calStyles.navButton}
          onPress={handlePrev}
          isDisabled={isDisabled}
          aria-label="Plage précédente"
        >
          <ChevronLeft size={20} spacing="none" variant="filled" />
        </AriaButton>
        <span className={calStyles.heading}>
          {rangeStart}–{rangeEnd}
        </span>
        <AriaButton
          className={calStyles.navButton}
          onPress={handleNext}
          isDisabled={isDisabled}
          aria-label="Plage suivante"
        >
          <ChevronRight size={20} spacing="none" variant="filled" />
        </AriaButton>
      </header>

      {/* Grille 4 × 5 */}
      <div className={styles.yearGrid} role="grid">
        {Array.from({ length: 5 }, (_, row) => (
          <div key={row} role="row" className={styles.yearRow}>
            {Array.from({ length: 4 }, (_, col) => {
              const year = rangeStart + row * 4 + col;
              const isSelected = resolvedYear === year;
              const isToday = todayDate.year === year;

              return (
                <YearCell
                  key={year}
                  year={year}
                  isSelected={isSelected}
                  isToday={isToday}
                  isDisabled={isDisabled}
                  onSelect={handleSelect}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------
// Cellule interne

function YearCell({
  year,
  isSelected,
  isToday,
  isDisabled,
  onSelect,
}: {
  year: number;
  isSelected: boolean;
  isToday: boolean;
  isDisabled: boolean;
  onSelect: (year: number) => void;
}) {
  const [isFocusVisible, setIsFocusVisible] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    setIsFocusVisible(e.currentTarget.matches(":focus-visible"));
  };

  return (
    <button
      role="gridcell"
      className={styles.yearCell}
      aria-selected={isSelected}
      aria-label={String(year)}
      data-selected={isSelected || undefined}
      data-today={isToday || undefined}
      data-disabled={isDisabled || undefined}
      disabled={isDisabled}
      onClick={() => onSelect(year)}
      onFocus={handleFocus}
      onBlur={() => setIsFocusVisible(false)}
    >
      <span className={styles.yearCellText}>{year}</span>
      {isFocusVisible && <FocusRing borderRadius={3} position="inside" />}
    </button>
  );
}
