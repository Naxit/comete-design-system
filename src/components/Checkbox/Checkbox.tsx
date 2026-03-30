// Checkbox — Comète Design System
// Case à cocher accessible avec label et description optionnels.
import type { ReactElement } from "react";
import {
  Checkbox as AriaCheckbox,
  type CheckboxProps as AriaCheckboxProps,
} from "react-aria-components";
import { CheckBox, CheckBoxMix, CheckBoxOutlineBlank } from "@naxit/comete-icons";
import { FocusRing } from "../FocusRing/FocusRing.js";
import styles from "./Checkbox.module.css";

// -----------------------------------------------------------------------
// Types publics

export interface CheckboxProps
  extends Omit<AriaCheckboxProps, "className" | "style" | "children"> {
  /** Texte du label. */
  label?: string;
  /** Texte d'aide affiché sous le label. */
  description?: string;
  /** Classe CSS additionnelle. */
  className?: string;
}

// -----------------------------------------------------------------------
// Composant

/**
 * Checkbox — Comète Design System
 *
 * Case à cocher accessible avec trois états visuels :
 * unchecked, checked et indeterminate.
 * Supporte la validation (isInvalid), le required et le disabled.
 *
 * ```tsx
 * import { Checkbox } from "@naxit/comete-design-system";
 *
 * <Checkbox label="Accepter les conditions" isRequired />
 * ```
 */
export function Checkbox({
  label,
  description,
  isRequired,
  className,
  ...ariaProps
}: CheckboxProps): ReactElement {
  return (
    <AriaCheckbox
      className={[styles.checkbox, className].filter(Boolean).join(" ")}
      isRequired={isRequired}
      {...ariaProps}
    >
      {({ isSelected, isIndeterminate, isFocusVisible }) => (
        <>
          <span className={styles.indicator}>
            {isFocusVisible && <FocusRing borderRadius={1} position="inside" />}
            {isIndeterminate ? (
              <CheckBoxMix spacing="none" />
            ) : isSelected ? (
              <CheckBox spacing="none" />
            ) : (
              <CheckBoxOutlineBlank spacing="none" />
            )}
          </span>
          {(label !== undefined || description !== undefined) && (
            <span className={styles.labelGroup}>
              {label !== undefined && (
                <span className={styles.labelRow}>
                  <span className={styles.label}>{label}</span>
                  {isRequired && (
                    <span className={styles.required}>*</span>
                  )}
                </span>
              )}
              {description !== undefined && (
                <span className={styles.description}>{description}</span>
              )}
            </span>
          )}
        </>
      )}
    </AriaCheckbox>
  );
}

Checkbox.displayName = "Checkbox";
