// YearPicker — Comète Design System
// Sélecteur d'année : champ avec chevrons ←/→ + bouton année + popover grille.
import { useRef, type ReactElement } from "react";
import {
  CalendarDate,
  today,
  getLocalTimeZone,
} from "@internationalized/date";
import { Dialog as AriaDialog, DialogTrigger } from "react-aria-components";
import { Button } from "../Button/Button.js";
import { Calendar } from "../Calendar/Calendar.js";
import { InputContainer } from "../InputContainer/InputContainer.js";
import { Popover } from "../Popover/Popover.js";
import styles from "./YearPicker.module.css";

// -----------------------------------------------------------------------
// Types publics

export interface YearPickerProps {
  /** Année sélectionnée. */
  year?: number;
  /** Callback appelé à chaque changement d'année. */
  onChange?: (year: number) => void;
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
 * YearPicker — Comète Design System
 *
 * Champ de sélection d'année unique.
 * - Clic sur le chevron gauche → année −1
 * - Clic sur le chevron droit → année +1
 * - Clic sur le bouton année → popover Calendar year (grille 4×5)
 *
 * Le bouton année est wrappé dans un `DialogTrigger` pour une gestion
 * correcte du focus et de l'état pressed. Le popover est positionné
 * relativement au champ entier via `triggerRef`.
 *
 * ```tsx
 * import { YearPicker } from "@naxit/comete-design-system";
 *
 * <YearPicker
 *   year={2025}
 *   onChange={(y) => console.log(y)}
 * />
 * ```
 */
export function YearPicker({
  year,
  onChange,
  isInvalid = false,
  isDisabled = false,
  className,
  "aria-label": ariaLabel,
}: YearPickerProps): ReactElement {
  const currentYear = today(getLocalTimeZone()).year;
  const resolvedYear = year ?? currentYear;

  // Ref du conteneur pour positionner le popover sous le champ entier
  const containerRef = useRef<HTMLDivElement>(null);

  // -- Handlers --

  const handlePrev = () => {
    if (isDisabled) return;
    onChange?.(resolvedYear - 1);
  };

  const handleNext = () => {
    if (isDisabled) return;
    onChange?.(resolvedYear + 1);
  };

  const handleYearSelect = (date: CalendarDate) => {
    onChange?.(date.year);
  };

  // -- Calendar value --

  const calendarValue = new CalendarDate(resolvedYear, 1, 1);

  const rootClassNames = [styles.root, className].filter(Boolean).join(" ");

  return (
    <div
      className={rootClassNames}
      ref={containerRef}
      aria-label={ariaLabel ?? `Sélecteur d'année : ${resolvedYear}`}
      data-invalid={isInvalid || undefined}
    >
      <InputContainer isDisabled={isDisabled} isInvalid={isInvalid}>
        <div className={styles.content}>
          {/* Bouton chevron gauche — année −1 */}
          <Button
            variant="subtle"
            size="small"
            iconBefore="ChevronLeft"
            className={styles.chevronButton}
            isDisabled={isDisabled}
            onPress={handlePrev}
            aria-label="Année précédente"
          />

          {/* Bouton année central — ouvre le popover Calendar year */}
          <DialogTrigger>
            <Button
              variant="subtle"
              size="small"
              iconAfter="ArrowDropDown"
              className={styles.yearButton}
              isDisabled={isDisabled}
              aria-label={`Année : ${resolvedYear}`}
            >
              {resolvedYear}
            </Button>
            <Popover
              triggerRef={containerRef}
              placement="bottom start"
              className={styles.popover}
            >
              <AriaDialog className={styles.dialog}>
                <Calendar
                  appearance="year"
                  value={calendarValue}
                  onChange={handleYearSelect}
                  isDisabled={isDisabled}
                />
              </AriaDialog>
            </Popover>
          </DialogTrigger>

          {/* Bouton chevron droit — année +1 */}
          <Button
            variant="subtle"
            size="small"
            iconBefore="ChevronRight"
            className={styles.chevronButton}
            isDisabled={isDisabled}
            onPress={handleNext}
            aria-label="Année suivante"
          />
        </div>
      </InputContainer>
    </div>
  );
}

YearPicker.displayName = "YearPicker";
