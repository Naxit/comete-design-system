// TextField — Comète Design System
// Champ de saisie texte accessible via React Aria.
import type { ReactElement, ReactNode } from "react";
import {
  TextField as AriaTextField,
  Input as AriaInput,
  type TextFieldProps as AriaTextFieldProps,
} from "react-aria-components";
import styles from "./TextField.module.css";

// -----------------------------------------------------------------------
// Types publics

export type TextFieldAppearance = "default" | "subtle";

export interface TextFieldProps
  extends Omit<AriaTextFieldProps, "className" | "style" | "children"> {
  /** Apparence visuelle. @default "default" */
  appearance?: TextFieldAppearance;
  /** Taille compacte (padding réduit). @default false */
  isCompact?: boolean;
  /** Texte indicatif affiché quand le champ est vide. */
  placeholder?: string;
  /** Élément affiché avant l'input (icône, etc.). */
  elemBefore?: ReactNode;
  /** Élément affiché après l'input (icône, bouton, etc.). */
  elemAfter?: ReactNode;
  /** Classe CSS additionnelle. */
  className?: string;
}

// -----------------------------------------------------------------------
// Composant

/**
 * TextField — Comète Design System
 *
 * Champ de saisie texte. Deux apparences : default (bordure complète)
 * et subtle (bordure basse uniquement). Supporte compact, disabled, invalid.
 *
 * ```tsx
 * import { Field, TextField } from "@naxit/comete-design-system";
 *
 * <Field label="Email" isRequired>
 *   <TextField placeholder="nom@example.com" type="email" />
 * </Field>
 * ```
 */
export function TextField({
  appearance = "default",
  isCompact = false,
  placeholder,
  elemBefore,
  elemAfter,
  className,
  ...ariaProps
}: TextFieldProps): ReactElement {
  const rootClasses = [
    styles.textField,
    styles[appearance],
    isCompact ? styles.compact : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <AriaTextField className={rootClasses} {...ariaProps}>
      {elemBefore && <span className={styles.elemBefore}>{elemBefore}</span>}
      <AriaInput className={styles.input} placeholder={placeholder} />
      {elemAfter && <span className={styles.elemAfter}>{elemAfter}</span>}
    </AriaTextField>
  );
}

TextField.displayName = "TextField";
