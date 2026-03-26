import type { ReactElement } from "react";
import type { IconColor, IconName, IconProps, IconSpacing, IconVariant } from "@naxit/comete-icons";
import { iconRegistry } from "@naxit/comete-icons";
import styles from "./Icon.module.css";

// ----------------------------------------------------------------------

export type { IconName };

export interface IconComponentProps {
  /** Name of the icon to render. Must match an export from @naxit/comete-icons. */
  icon: IconName;
  /** Icon style variant. @default "outlined" */
  variant?: IconVariant;
  /** Semantic color mapped to design tokens. @default "default" */
  color?: IconColor;
  /** Rendered size in pixels. @default 24 */
  size?: number;
  /**
   * Internal spacing of the SVG (viewBox).
   * - "default" — icon with padding (viewBox 0 0 24 24)
   * - "none" — icon without padding (viewBox 0 0 16 16)
   * @default "default"
   */
  spacing?: IconSpacing;
  /**
   * Accessible label. When provided the icon is exposed to assistive
   * technologies via `aria-label`; otherwise it is treated as decorative
   * (`aria-hidden="true"`).
   */
  label?: string;
  /** Additional CSS class applied to the wrapper `<span>`. */
  className?: string;
}

// ----------------------------------------------------------------------

/**
 * Icon — Comète Design System
 *
 * Renders an icon from `@naxit/comete-icons` by name.
 * Wraps the SVG in a `<span>` for easy CSS positioning.
 *
 * ```tsx
 * import { Icon } from "@naxit/comete-design-system";
 *
 * <Icon icon="Check" color="success" />
 * <Icon icon="Warning" variant="filled" size={16} label="Attention" />
 * ```
 */
export function Icon({
  icon,
  variant = "outlined",
  color = "default",
  size = 24,
  spacing = "default",
  label,
  className,
}: IconComponentProps): ReactElement | null {
  const IconComponent = iconRegistry[icon];

  const iconProps: IconProps = { variant, color, size, spacing };

  const classNames = [styles.icon, className].filter(Boolean).join(" ");

  const ariaProps: Record<string, string | boolean> = label
    ? { "aria-label": label, role: "img" }
    : { "aria-hidden": true };

  return (
    <span className={classNames} {...ariaProps}>
      <IconComponent {...iconProps} />
    </span>
  );
}

Icon.displayName = "Icon";
