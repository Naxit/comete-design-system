// WeekGrid — Comète Design System (interne)
// Grille de sélection de semaine : interaction hover/focus/sélection au niveau de la ligne.
import { useState, type ReactElement } from "react";
import { Button as AriaButton } from "react-aria-components";
import type { RangeValue, DateValue } from "react-aria-components";
import {
  type CalendarDate,
  startOfMonth,
  startOfWeek,
  endOfWeek,
  getWeeksInMonth,
  today,
  getLocalTimeZone,
} from "@internationalized/date";
import { ChevronLeft, ChevronRight } from "@naxit/comete-icons";
import { FocusRing } from "../FocusRing/index.js";
import styles from "./WeekGrid.module.css";
import calStyles from "./Calendar.module.css";

// -----------------------------------------------------------------------
// Utilitaires internes

/**
 * Calcule le numéro de semaine ISO 8601.
 * Basé sur le jeudi (index 3) de la semaine pour rester dans l'année ISO.
 */
function getISOWeekNumber(date: CalendarDate): number {
  const d = new Date(Date.UTC(date.year, date.month - 1, date.day));
  const dayNum = d.getUTCDay() || 7; // 1=Lun … 7=Dim
  d.setUTCDate(d.getUTCDate() + 4 - dayNum); // avancer au jeudi
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

interface WeekData {
  weekNumber: number;
  /** 7 jours de la semaine (lun → dim). */
  days: CalendarDate[];
  weekStart: CalendarDate;
  weekEnd: CalendarDate;
  /** Vrai pour les jours hors du mois affiché. */
  isOutsideMonth: boolean[];
}

/** Génère les semaines du mois affiché (6 lignes maximum). */
function getWeeksForMonth(month: CalendarDate, locale: string): WeekData[] {
  const numWeeks = getWeeksInMonth(month, locale);
  const monthStart = startOfMonth(month);
  const firstWeekStart = startOfWeek(monthStart, locale);

  return Array.from({ length: numWeeks }, (_, i) => {
    const weekStart = firstWeekStart.add({ weeks: i });
    const weekEnd = endOfWeek(weekStart, locale);
    const days = Array.from(
      { length: 7 },
      (_, d) => weekStart.add({ days: d })
    );
    const isOutsideMonth = days.map(
      (d) => d.month !== month.month || d.year !== month.year
    );
    // NOTE: On utilise le jeudi (index 3) pour déterminer le numéro ISO correct.
    const weekNumber = getISOWeekNumber(days[3] ?? weekStart);
    return { weekNumber, days, weekStart, weekEnd, isOutsideMonth };
  });
}

/** Retourne les labels courts des jours (ex : "LUN", "MAR"…) pour la locale donnée. */
function getDayLabels(locale: string): string[] {
  // NOTE: On utilise le lundi 5 jan 2026 comme point de départ — semaine ISO complète.
  const monday = new Date(2026, 0, 5);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return new Intl.DateTimeFormat(locale, { weekday: "short" })
      .format(d)
      .slice(0, 3)
      .toUpperCase();
  });
}

/** Formate le mois et l'année pour l'en-tête de navigation. */
function formatMonthYear(month: CalendarDate, locale: string): string {
  const d = new Date(month.year, month.month - 1, 1);
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(d);
}

type WeekRowState =
  | "selected"
  | "range-start"
  | "range-part"
  | "range-end";

function getRowState(
  weekStart: CalendarDate,
  weekEnd: CalendarDate,
  value?: RangeValue<CalendarDate>
): WeekRowState | undefined {
  if (!value) return undefined;
  const { start, end } = value;

  const matchesStart =
    weekStart.year === start.year &&
    weekStart.month === start.month &&
    weekStart.day === start.day;
  const matchesEnd =
    weekEnd.year === end.year &&
    weekEnd.month === end.month &&
    weekEnd.day === end.day;

  if (matchesStart && matchesEnd) return "selected";
  if (matchesStart) return "range-start";
  if (matchesEnd) return "range-end";
  if (weekStart.compare(start) > 0 && weekEnd.compare(end) < 0) return "range-part";
  return undefined;
}

// -----------------------------------------------------------------------
// Types publics (utilisés par le composant Calendar unifié)

export interface WeekGridProps {
  /** Plage sélectionnée (mode contrôlé). */
  value?: RangeValue<CalendarDate>;
  /** Valeur initiale (mode non contrôlé). */
  defaultValue?: RangeValue<CalendarDate>;
  /** Callback à chaque sélection — la plage est toujours une semaine ISO complète. */
  onChange?: (range: RangeValue<CalendarDate>) => void;
  /** Locale BCP 47 pour le premier jour de semaine et les noms de jours. @default "fr-FR" */
  locale?: string;
  /** Désactive le composant. */
  isDisabled?: boolean;
  /** Valeur minimale (non utilisée pour la sélection de ligne, réservée à l'affichage futur). */
  minValue?: DateValue;
  /** Valeur maximale. */
  maxValue?: DateValue;
  /** Classe CSS additionnelle. */
  className?: string;
  /** Label accessible. */
  "aria-label"?: string;
}

// -----------------------------------------------------------------------
// Composant

/**
 * WeekGrid — sélecteur de semaine (interne).
 *
 * Affiche une grille par mois avec numéro de semaine et interaction
 * hover/focus/sélection au niveau de la ligne entière.
 */
export function WeekGrid({
  value,
  defaultValue,
  onChange,
  locale = "fr-FR",
  isDisabled = false,
  className,
  "aria-label": ariaLabel,
}: WeekGridProps): ReactElement {
  const todayDate = today(getLocalTimeZone()) as unknown as CalendarDate;
  const initialMonth = value?.start ?? defaultValue?.start ?? todayDate;

  const [displayedMonth, setDisplayedMonth] = useState<CalendarDate>(
    startOfMonth(initialMonth) as unknown as CalendarDate
  );

  // État interne pour le mode non contrôlé
  const [internalValue, setInternalValue] = useState<
    RangeValue<CalendarDate> | undefined
  >(defaultValue);

  const controlled = value !== undefined;
  const resolvedValue = controlled ? value : internalValue;

  const handleSelect = (weekStart: CalendarDate, weekEnd: CalendarDate) => {
    if (isDisabled) return;
    const range: RangeValue<CalendarDate> = { start: weekStart, end: weekEnd };
    if (!controlled) setInternalValue(range);
    onChange?.(range);
  };

  const handlePrev = () =>
    setDisplayedMonth((m) => m.subtract({ months: 1 }));
  const handleNext = () =>
    setDisplayedMonth((m) => m.add({ months: 1 }));

  const weeks = getWeeksForMonth(displayedMonth, locale);
  const dayLabels = getDayLabels(locale);
  const heading = formatMonthYear(displayedMonth, locale);

  return (
    <div
      role="group"
      aria-label={ariaLabel ?? "Choisir une semaine"}
      className={[calStyles.calendar, styles.weekCalendar, className]
        .filter(Boolean)
        .join(" ")}
      data-disabled={isDisabled || undefined}
    >
      {/* Navigation mois */}
      <header className={calStyles.header}>
        <AriaButton
          className={calStyles.navButton}
          onPress={handlePrev}
          isDisabled={isDisabled}
          aria-label="Mois précédent"
        >
          <ChevronLeft size={20} spacing="none" variant="filled" />
        </AriaButton>
        <span className={calStyles.heading}>{heading}</span>
        <AriaButton
          className={calStyles.navButton}
          onPress={handleNext}
          isDisabled={isDisabled}
          aria-label="Mois suivant"
        >
          <ChevronRight size={20} spacing="none" variant="filled" />
        </AriaButton>
      </header>

      {/* En-têtes des colonnes */}
      <div className={styles.weekHeaderRow} aria-hidden="true">
        <span className={styles.weekHeaderNum}>S</span>
        {/* NOTE: spacer pour aligner avec la colonne divider des lignes de données */}
        <span aria-hidden="true" />
        {dayLabels.map((label) => (
          <span key={label} className={[calStyles.headerCell, styles.weekHeaderDay].join(" ")}>
            {label}
          </span>
        ))}
      </div>

      {/* Grille des semaines */}
      <div role="grid" className={styles.weekGrid}>
        {weeks.map((week) => (
          <WeekRow
            key={`${week.weekNumber}-${week.weekStart.toString()}`}
            week={week}
            value={resolvedValue}
            isDisabled={isDisabled}
            onSelect={handleSelect}
            todayDate={todayDate}
          />
        ))}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------
// Ligne de semaine (interne)

function WeekRow({
  week,
  value,
  isDisabled,
  onSelect,
  todayDate,
}: {
  week: WeekData;
  value?: RangeValue<CalendarDate>;
  isDisabled: boolean;
  onSelect: (start: CalendarDate, end: CalendarDate) => void;
  todayDate: CalendarDate;
}) {
  const [isFocusVisible, setIsFocusVisible] = useState(false);

  const rowState = getRowState(week.weekStart, week.weekEnd, value);
  // NOTE: Une ligne dont tous les jours sont hors du mois visible est désactivée
  // pour éviter une sélection de semaine entièrement dans un autre mois.
  const allOutside = week.isOutsideMonth.every(Boolean);
  const rowDisabled = isDisabled || allOutside;

  const handleClick = () => {
    if (rowDisabled) return;
    onSelect(week.weekStart, week.weekEnd);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    setIsFocusVisible(e.currentTarget.matches(":focus-visible"));
  };

  return (
    <div
      role="row"
      className={styles.weekRow}
      data-state={rowState}
      data-disabled={rowDisabled || undefined}
      tabIndex={rowDisabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={() => setIsFocusVisible(false)}
    >
      {/* Numéro de semaine */}
      <span
        role="rowheader"
        className={styles.weekNumberCell}
        aria-label={`Semaine ${week.weekNumber}`}
      >
        {week.weekNumber}
      </span>

      {/* Séparateur visuel semaine / jours */}
      <span className={styles.weekDivider} aria-hidden="true" />

      {/* Jours */}
      {week.days.map((day, i) => {
        const isOutside = week.isOutsideMonth[i] ?? false;
        const isToday =
          day.year === todayDate.year &&
          day.month === todayDate.month &&
          day.day === todayDate.day;
        return (
          <span
            key={i}
            role="gridcell"
            className={styles.weekDayCell}
            data-outside-month={isOutside || undefined}
            data-today={isToday || undefined}
            aria-label={`${day.day} ${day.month} ${day.year}`}
          >
            <span className={styles.weekDayText}>{day.day}</span>
            {isToday && (
              <span className={styles.todayDot} aria-hidden="true" />
            )}
          </span>
        );
      })}

      {/* FocusRing sur la ligne entière */}
      {isFocusVisible && <FocusRing borderRadius={6} position="inside" />}
    </div>
  );
}
