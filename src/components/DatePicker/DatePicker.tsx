// DatePicker — Comète Design System
// Sélecteur de date : champ segmenté + popover calendrier.
import type { ReactElement } from "react";
import {
  DatePicker as AriaDatePicker,
  DateInput as AriaDateInput,
  DateSegment as AriaDateSegment,
  Button as AriaButton,
  Dialog as AriaDialog,
  type DatePickerProps as AriaDatePickerProps,
  type DateValue,
} from "react-aria-components";
import { Calendar } from "../Calendar/Calendar.js";
import { Popover } from "../Popover/Popover.js";
import { Icon } from "../Icon/Icon.js";
import styles from "./DatePicker.module.css";

// -----------------------------------------------------------------------
// Types publics

export type DatePickerAppearance = "default" | "subtle";

export interface DatePickerProps<T extends DateValue = DateValue>
  extends Omit<AriaDatePickerProps<T>, "className" | "style" | "children"> {
  /** Apparence visuelle. @default "default" */
  appearance?: DatePickerAppearance;
  /** Classe CSS additionnelle. */
  className?: string;
}

// -----------------------------------------------------------------------
// Composant

/**
 * DatePicker — Comète Design System
 *
 * Champ de saisie de date avec segments éditables (jour/mois/année)
 * et un popover calendrier pour la sélection visuelle.
 *
 * ```tsx
 * import { Field, DatePicker } from "@naxit/comete-design-system";
 * import { today, getLocalTimeZone } from "@internationalized/date";
 *
 * <Field label="Date de début">
 *   <DatePicker defaultValue={today(getLocalTimeZone())} />
 * </Field>
 * ```
 */
export function DatePicker<T extends DateValue = DateValue>({
  appearance = "default",
  className,
  ...ariaProps
}: DatePickerProps<T>): ReactElement {
  const rootClasses = [
    styles.datePicker,
    appearance === "default" ? styles.bordered : styles.subtle,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <AriaDatePicker className={rootClasses} {...ariaProps}>
      <div className={styles.inputGroup}>
        <AriaDateInput className={styles.dateInput}>
          {(segment) => (
            <AriaDateSegment className={styles.segment} segment={segment} />
          )}
        </AriaDateInput>
        <AriaButton className={styles.calendarButton}>
          <Icon icon="CalendarMonth" size={24} />
        </AriaButton>
      </div>
      <Popover className={styles.popover}>
        <AriaDialog className={styles.dialog}>
          <Calendar appearance="date" />
        </AriaDialog>
      </Popover>
    </AriaDatePicker>
  );
}

DatePicker.displayName = "DatePicker";
