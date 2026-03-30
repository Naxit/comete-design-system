// Card — Comète Design System
// Conteneur de surface pour grouper du contenu connexe.
import type { ReactElement, ReactNode } from "react";
import styles from "./Card.module.css";

// -----------------------------------------------------------------------
// Types publics

export type CardVariant = "default" | "outlined" | "elevated" | "neutral";

export interface CardProps {
  /**
   * Apparence de la carte.
   * - "default"  — bordure standard (--border-disabled)
   * - "outlined" — bordure subtile (--border-subtle)
   * - "elevated" — bordure subtile + ombre portée (--shadow-sm)
   * - "neutral"  — fond grisé (--background-neutral-subtlest-default), sans bordure
   * @default "default"
   */
  variant?: CardVariant;
  /** Contenu affiché à l'intérieur de la carte. */
  children: ReactNode;
  /** Classe CSS additionnelle. */
  className?: string;
}

// -----------------------------------------------------------------------
// Composant

/**
 * Card — Comète Design System
 *
 * Conteneur de surface pour regrouper du contenu connexe.
 * Trois apparences disponibles : default, outlined, elevated.
 *
 * ```tsx
 * import { Card } from "@naxit/comete-design-system";
 *
 * <Card variant="elevated">
 *   <p>Contenu de la carte</p>
 * </Card>
 * ```
 *
 * @param variant   - Apparence visuelle de la carte
 * @param children  - Contenu affiché dans la carte
 * @param className - Classe CSS additionnelle
 */
export function Card({
  variant = "default",
  children,
  className,
}: CardProps): ReactElement {
  const variantClassMap: Record<CardVariant, string> = {
    default: styles.default,
    outlined: styles.outlined,
    elevated: styles.elevated,
    neutral: styles.neutral,
  };

  const classNames = [styles.card, variantClassMap[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames}>
      {children}
    </div>
  );
}

Card.displayName = "Card";
