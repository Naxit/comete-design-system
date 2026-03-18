import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components";
import { forwardRef } from "react";
import styles from "./Button.module.css";

// ----------------------------------------------------------------------

export type ButtonVariant = "contained" | "outlined" | "text";
export type ButtonColor =
  | "default"
  | "brand"
  | "success"
  | "critical"
  | "warning"
  | "information";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends Omit<AriaButtonProps, "className" | "style"> {
  /** Visual variant. @default "contained" */
  variant?: ButtonVariant;
  /** Color scheme. @default "default" */
  color?: ButtonColor;
  /** Size. @default "medium" */
  size?: ButtonSize;
  /** Icon displayed before the label. */
  iconBefore?: React.ReactNode;
  /** Icon displayed after the label. */
  iconAfter?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
  children: React.ReactNode;
}

// ----------------------------------------------------------------------

/**
 * Button — Comète Design System
 *
 * Built on React Aria for accessibility (keyboard, focus, ARIA).
 * Styled with CSS Modules consuming @naxit/comete-design-tokens.
 *
 * ```tsx
 * import { Button } from "@naxit/comete-design-system";
 *
 * <Button color="brand">Enregistrer</Button>
 * <Button variant="outlined" color="critical" iconBefore={<TrashIcon />}>
 *   Supprimer
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "contained",
      color = "default",
      size = "medium",
      iconBefore,
      iconAfter,
      className,
      children,
      ...ariaProps
    },
    ref,
  ) => {
    const classNames = [
      styles.button,
      styles[variant],
      styles[color],
      styles[size],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <AriaButton ref={ref} className={classNames} {...ariaProps}>
        {iconBefore && <span className={styles.icon}>{iconBefore}</span>}
        {children}
        {iconAfter && <span className={styles.icon}>{iconAfter}</span>}
      </AriaButton>
    );
  },
);

Button.displayName = "Button";
