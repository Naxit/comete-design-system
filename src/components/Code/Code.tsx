// Code — Comète Design System
// Met en évidence des fragments de code inline dans le texte.
import type { ReactElement, ReactNode } from "react";
import styles from "./Code.module.css";

// -----------------------------------------------------------------------
// Types publics

export interface CodeProps {
  /** Contenu du fragment de code. */
  children: ReactNode;
  /** Classe CSS additionnelle. */
  className?: string;
}

// -----------------------------------------------------------------------
// Composant

/**
 * Code — Comète Design System
 *
 * Met en évidence des fragments de code inline dans le texte courant.
 *
 * ```tsx
 * import { Code } from "@naxit/comete-design-system";
 *
 * <p>La propriété <Code>font-size</Code> accepte des valeurs en rem.</p>
 * ```
 */
export function Code({ children, className }: CodeProps): ReactElement {
  return (
    <code className={[styles.code, className].filter(Boolean).join(" ")}>
      {children}
    </code>
  );
}

Code.displayName = "Code";
