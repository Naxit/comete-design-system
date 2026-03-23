// Banner — barre de notification pleine largeur (warning, critical, announcement)
import type { ReactElement, ReactNode } from "react";
import { Warning } from "@naxit/comete-icons";
import styles from "./Banner.module.css";

// -----------------------------------------------------------------------
// Types publics

/** Sévérité / nature du banner. */
export type BannerAppearance = "warning" | "critical" | "announcement";

export interface BannerProps {
  /** Sévérité du message — détermine le fond coloré et la couleur de l'icône. */
  appearance: BannerAppearance;
  /** Contenu affiché dans la zone message (texte, liens, boutons…). */
  children: ReactNode;
}

// -----------------------------------------------------------------------
// Composant

/**
 * Barre de notification pleine largeur affichant un message d'avertissement
 * ou critique avec une icône contextuelle.
 *
 * @param appearance - Nature : "warning" (jaune), "critical" (rouge), "announcement" (neutre sombre)
 * @param children   - Contenu du message
 */
export function Banner({ appearance, children }: BannerProps): ReactElement {
  return (
    <div
      className={`${styles.banner} ${styles[appearance]}`}
      role="alert"
    >
      <Warning
        size={24}
        spacing="none"
        variant="filled"
        color={appearance === "warning" ? "on-warning" : "inverted"}
      />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
