// FocusRing — anneau de focus positionné en overlay dans un conteneur parent
import type { CSSProperties, ReactElement } from "react";
import styles from "./FocusRing.module.css";

// -----------------------------------------------------------------------
// Types publics

/** Rayon de coin disponibles, correspondant aux variantes Figma. */
export type FocusRingBorderRadius = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 12 | "round";

/** Position de l'anneau par rapport au bord du conteneur parent. */
export type FocusRingPosition = "outside" | "inside";

export interface FocusRingProps {
  /**
   * Rayon des coins en px, ou "round" pour un cercle parfait.
   * Doit correspondre au border-radius du composant ciblé.
   * Par défaut : 0 (coins droits).
   */
  borderRadius?: FocusRingBorderRadius;
  /**
   * "outside" : anneau 2px à l'extérieur du composant ciblé.
   * "inside"  : anneau 2px à l'intérieur du bord du composant ciblé.
   * Par défaut : "outside".
   */
  position?: FocusRingPosition;
}

// -----------------------------------------------------------------------
// Utilitaire

const RADIUS_MAP: Record<FocusRingBorderRadius, string> = {
  1: "1px",
  2: "2px",
  3: "3px",
  4: "4px",
  5: "5px",
  6: "6px",
  8: "8px",
  12: "12px",
  round: "1024px",
};

// -----------------------------------------------------------------------
// Composant

/**
 * Overlay visuel indiquant le focus clavier sur un élément interactif.
 * Doit être rendu à l'intérieur d'un conteneur `position: relative`.
 * Le parent est responsable de n'afficher ce composant que lors d'un focus clavier.
 *
 * @param borderRadius - Rayon des coins, à faire correspondre au composant ciblé
 * @param position     - "outside" (par défaut) ou "inside"
 */
export function FocusRing({
  borderRadius = 2,
  position = "outside",
}: FocusRingProps): ReactElement {
  const radius = RADIUS_MAP[borderRadius];

  const style: CSSProperties = {
    borderRadius: radius,
  };

  return (
    <span
      className={`${styles.ring} ${styles[position]}`}
      style={style}
      aria-hidden="true"
    />
  );
}
