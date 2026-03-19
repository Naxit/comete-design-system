import React from "react";
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";
import { forwardRef } from "react";
import type { IconColor } from "@naxit/comete-icons";
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
  /** Icon displayed before the label. Color is automatically resolved from variant + color. */
  iconBefore?: React.ReactNode;
  /** Icon displayed after the label. Color is automatically resolved from variant + color. */
  iconAfter?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
  children: React.ReactNode;
}

// ----------------------------------------------------------------------

/**
 * Resolves the icon color token appropriate for a given button variant + color.
 * Mirrors the Button CSS: bold backgrounds (contained.brand, .success, .critical,
 * .information) use inverted text; all other combinations use semantic colors.
 *
 * @param variant - Button visual variant
 * @param color   - Button color scheme
 * @returns The matching IconColor token
 */
function resolveIconColor(variant: ButtonVariant, color: ButtonColor): IconColor {
  if (variant === "link-subtle") return "subtle";

  if (variant === "contained") {
    // NOTE: warning bold background is light/yellow — needs dark icons, not white
    if (color === "warning") return "on-warning";
    // brand, success, critical, information render bold backgrounds with inverted (white) text
    const invertedColors: readonly ButtonColor[] = ["brand", "success", "critical", "information"];
    return invertedColors.includes(color) ? "inverted" : "default";
  }

  // outlined, subtle, link: icon follows the semantic color of the button text
  const semanticColorMap: Record<ButtonColor, IconColor> = {
    default: "default",
    brand: "brand",
    success: "success",
    critical: "critical",
    warning: "warning",
    information: "information",
  };
  return semanticColorMap[color];
}

/**
 * Clones the icon element and injects the resolved color prop if not already
 * explicitly set by the consumer.
 *
 * @param icon  - The icon React node
 * @param color - The resolved icon color to inject
 * @returns The icon node with the color prop injected
 */
function injectIconColor(icon: React.ReactNode, color: IconColor): React.ReactNode {
  if (!React.isValidElement(icon)) return icon;
  const existingColor = (icon.props as Record<string, unknown>)["color"];
  // Respect explicit color overrides
  if (existingColor !== undefined) return icon;
  return React.cloneElement(icon as React.ReactElement<{ color: IconColor }>, { color });
}

// ----------------------------------------------------------------------

/**
 * Button — Comète Design System
 *
 * Built on React Aria for accessibility (keyboard, focus, ARIA).
 * Styled with CSS Modules consuming @naxit/comete-design-tokens.
 * Icon color is automatically resolved from the button variant + color.
 *
 * ```tsx
 * import { Button } from "@naxit/comete-design-system";
 * import { Check } from "@naxit/comete-icons";
 *
 * <Button color="brand">Enregistrer</Button>
 * <Button variant="outlined" color="critical" iconBefore={<TrashIcon spacing="default" variant="filled" />}>
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

    const iconColor = resolveIconColor(variant, color);

    return (
      <AriaButton ref={ref} className={classNames} {...ariaProps}>
        {iconBefore && (
          <span className={styles.icon}>{injectIconColor(iconBefore, iconColor)}</span>
        )}
        {children}
        {iconAfter && (
          <span className={styles.icon}>{injectIconColor(iconAfter, iconColor)}</span>
        )}
      </AriaButton>
    );
  }
);

Button.displayName = "Button";
