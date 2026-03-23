// BreadcrumbItem — élément individuel du fil d'Ariane
import type { ReactElement, ReactNode } from "react";
import styles from "./BreadcrumbItem.module.css";

// -----------------------------------------------------------------------
// Types publics

export interface BreadcrumbItemProps {
  /** Texte affiché dans l'item. */
  label: string;
  /** URL de navigation. Si absent, l'item est rendu comme texte (page courante). */
  href?: string;
  /** Handler de clic (alternatif à href pour la navigation programmatique). */
  onClick?: () => void;
  /** Icône affichée avant le libellé. */
  iconBefore?: ReactNode;
  /**
   * Icône affichée après le libellé.
   * Utilisée typiquement pour un séparateur visuel (ex : ChevronRight)
   * dans la variante "Breadcrumbs + Icon".
   */
  iconAfter?: ReactNode;
  /** Marque cet item comme la page courante (aria-current="page", non cliquable). */
  isCurrent?: boolean;
}

// -----------------------------------------------------------------------
// Composant

/**
 * Élément individuel du fil d'Ariane.
 * Le séparateur "/" est masqué sur le premier item via CSS (`:first-child`).
 *
 * @param label      - Libellé de l'item
 * @param href       - URL de destination (rend un lien)
 * @param onClick    - Handler de navigation programmatique
 * @param iconBefore - Icône optionnelle avant le libellé (ex : Home)
 * @param iconAfter  - Icône optionnelle après le libellé (ex : ChevronRight séparateur)
 * @param isCurrent  - Indique la page courante
 */
export function BreadcrumbItem({
  label,
  href,
  onClick,
  iconBefore,
  iconAfter,
  isCurrent = false,
}: BreadcrumbItemProps): ReactElement {
  const isInteractive = (href !== undefined || onClick !== undefined) && !isCurrent;

  const content = (
    <>
      {iconBefore && <span className={styles.iconBefore}>{iconBefore}</span>}
      <span>{label}</span>
      {iconAfter && <span className={styles.iconAfter}>{iconAfter}</span>}
    </>
  );

  return (
    <li className={styles.item}>
      <span className={styles.separator} aria-hidden="true">/</span>
      {isInteractive && href !== undefined ? (
        <a className={styles.link} href={href} onClick={onClick}>
          {content}
        </a>
      ) : isInteractive ? (
        <button type="button" className={styles.link} onClick={onClick}>
          {content}
        </button>
      ) : (
        <span
          className={`${styles.link} ${isCurrent ? styles.current : ""}`}
          aria-current={isCurrent ? "page" : undefined}
        >
          {content}
        </span>
      )}
    </li>
  );
}
