// MonthCalendar — Comète Design System
import { useState } from "react";
import { Button as AriaButton } from "react-aria-components";
import { CalendarDate, today, getLocalTimeZone } from "@internationalized/date";
import { ChevronLeft, ChevronRight } from "@naxit/comete-icons";
import { FocusRing } from "../FocusRing/index.js";
import styles from "./MonthCalendar.module.css";
import calStyles from "./Calendar.module.css";

// -----------------------------------------------------------------------
// Types publics

export interface MonthCalendarProps {
  /**
   * Mois sélectionné — représenté par un CalendarDate quelconque du mois
   * (seuls year et month sont utilisés).
   */
  value?: CalendarDate;
  /** Valeur initiale non contrôlée. */
  defaultValue?: CalendarDate;
  /**
   * Appelé à chaque sélection.
   * Le CalendarDate passé a toujours day=1.
   */
  onChange?: (date: CalendarDate) => void;
  /**
   * Locale BCP 47 pour les noms de mois.
   * @default "fr-FR"
   */
  locale?: string;
  /** Désactive le calendrier. */
  isDisabled?: boolean;
  /** Classe CSS additionnelle. */
  className?: string;
}

// -----------------------------------------------------------------------
// Utilitaire — noms de mois localisés (ex : "janv.", "févr."…)

function getMonthLabels(locale: string): string[] {
  return Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { month: "short" }).format(
      new Date(2000, i, 1)
    )
  );
}

// -----------------------------------------------------------------------
// Composant

/**
 * MonthCalendar — Comète Design System
 *
 * Sélecteur de mois : grille 3 × 4 affichant les 12 mois de l'année.
 * Navigation par année (boutons précédent / suivant).
 *
 * ```tsx
 * import { CalendarDate } from "@internationalized/date";
 *
 * <MonthCalendar
 *   defaultValue={new CalendarDate(2026, 3, 1)}
 *   onChange={(date) => console.log(date.year, date.month)}
 * />
 * ```
 *
 * @param value        - Mois sélectionné (contrôlé)
 * @param defaultValue - Mois sélectionné par défaut
 * @param onChange     - Callback à chaque sélection
 * @param locale       - Locale BCP 47 pour les noms de mois
 * @param isDisabled   - Désactive le composant
 */
export function MonthCalendar({
  value,
  defaultValue,
  onChange,
  locale = "fr-FR",
  isDisabled = false,
  className,
}: MonthCalendarProps) {
  const todayDate = today(getLocalTimeZone());
  const initialYear = (value ?? defaultValue)?.year ?? todayDate.year;

  const [displayYear, setDisplayYear] = useState(initialYear);

  const controlled = value !== undefined;
  const selectedYear = controlled ? value?.year : undefined;
  const selectedMonth = controlled ? value?.month : undefined;

  // Non-controlled internal selection
  const [internalValue, setInternalValue] = useState<CalendarDate | undefined>(
    defaultValue
  );
  const resolvedYear = controlled ? value?.year : internalValue?.year;
  const resolvedMonth = controlled ? value?.month : internalValue?.month;

  const monthLabels = getMonthLabels(locale);

  const handleSelect = (month: number) => {
    if (isDisabled) return;
    const date = new CalendarDate(displayYear, month, 1);
    if (!controlled) setInternalValue(date);
    onChange?.(date);
  };

  const handlePrev = () => setDisplayYear((y) => y - 1);
  const handleNext = () => setDisplayYear((y) => y + 1);

  return (
    <div
      role="group"
      aria-label={`Choisir un mois — ${displayYear}`}
      className={[calStyles.calendar, styles.monthCalendar, className]
        .filter(Boolean)
        .join(" ")}
      data-disabled={isDisabled || undefined}
    >
      {/* Header — navigation par année */}
      <header className={calStyles.header}>
        <AriaButton
          className={calStyles.navButton}
          onPress={handlePrev}
          isDisabled={isDisabled}
          aria-label="Année précédente"
        >
          <ChevronLeft size={20} spacing="none" variant="filled" />
        </AriaButton>
        <span className={calStyles.heading}>{displayYear}</span>
        <AriaButton
          className={calStyles.navButton}
          onPress={handleNext}
          isDisabled={isDisabled}
          aria-label="Année suivante"
        >
          <ChevronRight size={20} spacing="none" variant="filled" />
        </AriaButton>
      </header>

      {/* Grille 3 × 4 */}
      <div className={styles.monthGrid} role="grid">
        {Array.from({ length: 4 }, (_, row) => (
          <div key={row} role="row" className={styles.monthRow}>
            {Array.from({ length: 3 }, (_, col) => {
              const month = row * 3 + col + 1;
              const isSelected =
                (controlled ? selectedYear : resolvedYear) === displayYear &&
                (controlled ? selectedMonth : resolvedMonth) === month;
              const isToday =
                todayDate.year === displayYear && todayDate.month === month;

              return (
                <MonthCell
                  key={month}
                  label={monthLabels[month - 1] ?? ""}
                  month={month}
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

function MonthCell({
  label,
  month,
  isSelected,
  isToday,
  isDisabled,
  onSelect,
}: {
  label: string;
  month: number;
  isSelected: boolean;
  isToday: boolean;
  isDisabled: boolean;
  onSelect: (month: number) => void;
}) {
  const [isFocusVisible, setIsFocusVisible] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    setIsFocusVisible(e.currentTarget.matches(":focus-visible"));
  };

  return (
    <button
      role="gridcell"
      className={styles.monthCell}
      aria-selected={isSelected}
      aria-label={`Mois ${month}`}
      data-selected={isSelected || undefined}
      data-today={isToday || undefined}
      data-disabled={isDisabled || undefined}
      disabled={isDisabled}
      onClick={() => onSelect(month)}
      onFocus={handleFocus}
      onBlur={() => setIsFocusVisible(false)}
    >
      <span className={styles.monthCellText}>{label}</span>
      {isFocusVisible && <FocusRing borderRadius={3} position="inside" />}
    </button>
  );
}
