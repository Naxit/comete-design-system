// DatePicker — Comète Design System
// Sélecteur de date : champ segmenté + popover calendrier.
import type { ReactElement } from "react";
import {
  DatePicker as AriaDatePicker,
  DateInput as AriaDateInput,
  DateSegment as AriaDateSegment,
  Group as AriaGroup,
  Dialog as AriaDialog,
  type DatePickerProps as AriaDatePickerProps,
  type DateValue,
} from "react-aria-components";
import { Button } from "../Button/Button.js";
import { Calendar } from "../Calendar/Calendar.js";
import { InputContainer } from "../InputContainer/InputContainer.js";
import type { InputContainerAppearance } from "../InputContainer/InputContainer.js";
import { Popover } from "../Popover/Popover.js";
import styles from "./DatePicker.module.css";

// -----------------------------------------------------------------------
// Types publics

export type DatePickerAppearance = InputContainerAppearance;

export interface DatePickerProps<T extends DateValue = DateValue>
  extends Omit<AriaDatePickerProps<T>, "className" | "style" | "children"> {
  /** Apparence visuelle. @default "default" */
  appearance?: DatePickerAppearance;
  /** Taille compacte (padding réduit). @default false */
  isCompact?: boolean;
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
  isCompact = false,
  className,
  ...ariaProps
}: DatePickerProps<T>): ReactElement {
  return (
    <AriaDatePicker
      className={[styles.datePicker, className].filter(Boolean).join(" ")}
      {...ariaProps}
    >
      {({ isDisabled, isInvalid }) => (
        <>
          <AriaGroup>
            <InputContainer
              appearance={appearance}
              isCompact={isCompact}
              isDisabled={isDisabled}
              isInvalid={isInvalid}
            >
              <AriaDateInput className={styles.dateInput}>
                {(segment) => (
                  <AriaDateSegment className={styles.segment} segment={segment} />
                )}
              </AriaDateInput>
              <Button
                variant="subtle"
                size="small"
                iconBefore="CalendarMonth"
                className={styles.calendarButton}
                isDisabled={isDisabled}
              />
            </InputContainer>
          </AriaGroup>
          <Popover placement="bottom start" className={styles.popover}>
            <AriaDialog className={styles.dialog}>
              <Calendar appearance="date" />
            </AriaDialog>
          </Popover>
        </>
      )}
    </AriaDatePicker>
  );
}

DatePicker.displayName = "DatePicker";
