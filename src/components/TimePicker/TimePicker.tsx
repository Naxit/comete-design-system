// TimePicker — Comète Design System
// Sélecteur d'heure : champ segmenté (heures/minutes).
import type { ReactElement } from "react";
import {
  TimeField as AriaTimeField,
  DateInput as AriaDateInput,
  DateSegment as AriaDateSegment,
  type TimeFieldProps as AriaTimeFieldProps,
  type TimeValue,
} from "react-aria-components";
import { Icon } from "../Icon/Icon.js";
import { InputContainer } from "../InputContainer/InputContainer.js";
import type { InputContainerAppearance } from "../InputContainer/InputContainer.js";
import styles from "./TimePicker.module.css";

// -----------------------------------------------------------------------
// Types publics

export type TimePickerAppearance = InputContainerAppearance;

export interface TimePickerProps<T extends TimeValue = TimeValue>
  extends Omit<AriaTimeFieldProps<T>, "className" | "style" | "children" | "granularity"> {
  /** Apparence visuelle. @default "default" */
  appearance?: TimePickerAppearance;
  /** Taille compacte (padding réduit). @default false */
  isCompact?: boolean;
  /** Affiche le segment des secondes. @default false */
  showSeconds?: boolean;
  /** Classe CSS additionnelle. */
  className?: string;
}

// -----------------------------------------------------------------------
// Composant

/**
 * TimePicker — Comète Design System
 *
 * Champ de saisie d'heure avec segments éditables (heures/minutes).
 * Supporte les formats 12h (AM/PM) et 24h via la prop `hourCycle`.
 *
 * ```tsx
 * import { Field, TimePicker } from "@naxit/comete-design-system";
 * import { Time } from "@internationalized/date";
 *
 * <Field label="Heure de début">
 *   <TimePicker defaultValue={new Time(9, 30)} />
 * </Field>
 *
 * <Field label="Heure (12h)">
 *   <TimePicker hourCycle={12} />
 * </Field>
 * ```
 */
export function TimePicker<T extends TimeValue = TimeValue>({
  appearance = "default",
  isCompact = false,
  showSeconds = false,
  className,
  ...ariaProps
}: TimePickerProps<T>): ReactElement {
  return (
    <AriaTimeField
      className={[styles.timePicker, className].filter(Boolean).join(" ")}
      granularity={showSeconds ? "second" : "minute"}
      {...ariaProps}
    >
      {({ isDisabled, isInvalid }) => (
        <InputContainer
          appearance={appearance}
          isCompact={isCompact}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
        >
          <AriaDateInput className={styles.timeInput}>
            {(segment) => (
              <AriaDateSegment className={styles.segment} segment={segment} />
            )}
          </AriaDateInput>
          <Icon
            icon="Schedule"
            size={24}
            color={isDisabled ? "disabled" : "default"}
            className={styles.clockIcon}
          />
        </InputContainer>
      )}
    </AriaTimeField>
  );
}

TimePicker.displayName = "TimePicker";
