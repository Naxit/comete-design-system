// Badge — indicateur visuel compact (statut, compteur, étiquette)
import type { ReactElement } from "react";
import styles from "./Badge.module.css";

// -----------------------------------------------------------------------
// Types publics

/** Apparence colorée du badge. */
export type BadgeAppearance =
  | "neutral"
  | "primary"
  | "primary-inverted"
  | "critical"
  | "success"
  | "warning"
  | "accent";

/**
 * Niveau d'importance du badge.
 * - `high`   : fond saturé, texte inversé (blanc)
 * - `medium` : fond subtil, texte coloré sémantique
 * - `low`    : point coloré sans texte
 */
export type BadgeImportance = "high" | "medium" | "low";

export interface BadgeProps {
  /** Schéma coloré. @default "neutral" */
  appearance?: BadgeAppearance;
  /** Niveau de contraste et forme. @default "high" */
  importance?: BadgeImportance;
  /** Texte affiché. Ignoré pour `importance="low"`. */
  label?: string;
  /**
   * Ajoute un anneau blanc autour du badge.
   * Utile quand le badge est superposé à un avatar ou un fond coloré.
   * @default false
   */
  cutoutBorder?: boolean;
  /** @default false */
  isDisabled?: boolean;
}

// -----------------------------------------------------------------------
// Composant

/**
 * Badge compact affichant un statut, une étiquette ou un point indicateur.
 *
 * @param appearance  - Schéma coloré
 * @param importance  - Niveau de contraste (high / medium / low)
 * @param label       - Texte affiché (ignoré pour importance="low")
 * @param cutoutBorder - Anneau blanc pour séparation visuelle sur fond coloré
 * @param isDisabled  - État désactivé
 */
export function Badge({
  appearance = "neutral",
  importance = "high",
  label,
  cutoutBorder = false,
  isDisabled = false,
}: BadgeProps): ReactElement {
  return (
    <span
      className={[
        styles.badge,
        styles[importance],
        styles[appearance],
        cutoutBorder ? styles.cutoutBorder : "",
        isDisabled ? styles.disabled : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {importance !== "low" && label}
    </span>
  );
}
