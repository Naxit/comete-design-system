import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";
import { forwardRef } from "react";
import styles from "./Button.module.css";

// ----------------------------------------------------------------------

export type ButtonVariant = "contained" | "outlined" | "subtle" | "link" | "link-subtle";
export type ButtonColor = "default" | "brand" | "success" | "critical" | "warning" | "information";
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
    ref
  ) => {
    // Map variant to CSS class (handles kebab-case "link-subtle")
    const variantClassMap: Record<ButtonVariant, string> = {
      contained: styles.contained,
      outlined: styles.outlined,
      subtle: styles.subtle,
      link: styles.link,
      "link-subtle": styles["link-subtle"],
    };
    const variantClass = variantClassMap[variant];

    // Map color to CSS class
    const colorClassMap: Record<ButtonColor, string> = {
      default: styles.default,
      brand: styles.brand,
      success: styles.success,
      critical: styles.critical,
      warning: styles.warning,
      information: styles.information,
    };
    const colorClass = colorClassMap[color];

    // Map size to CSS class
    const sizeClassMap: Record<ButtonSize, string> = {
      small: styles.small,
      medium: styles.medium,
      large: styles.large,
    };
    const sizeClass = sizeClassMap[size];

    const classNames = [styles.button, variantClass, colorClass, sizeClass, className]
      .filter(Boolean)
      .join(" ");

    return (
      <AriaButton ref={ref} className={classNames} {...ariaProps}>
        {iconBefore && <span className={styles.icon}>{iconBefore}</span>}
        {children}
        {iconAfter && <span className={styles.icon}>{iconAfter}</span>}
      </AriaButton>
    );
  }
);

Button.displayName = "Button";
