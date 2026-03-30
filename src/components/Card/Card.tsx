// Card — Comète Design System
// Conteneur de surface interactif pour grouper du contenu connexe.
import type {
  DragEvent,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
} from "react";
import { useEffect, useRef, useState } from "react";
import { DragIndicator } from "@naxit/comete-icons";
import { FocusRing } from "../FocusRing/FocusRing.js";
import styles from "./Card.module.css";

// -----------------------------------------------------------------------
// Types publics

export type CardVariant = "default" | "drag-top" | "drag-left" | "actionable";

export type CardAppearance = "outlined" | "neutral";

export interface CardProps {
  /**
   * Comportement de la carte.
   * - "default"    — carte statique, aucune interaction
   * - "drag-top"   — poignée de drag horizontale en haut
   * - "drag-left"  — poignée de drag verticale à gauche
   * - "actionable" — carte cliquable (hover, press, focus ring)
   * @default "default"
   */
  variant?: CardVariant;
  /**
   * Apparence visuelle de la carte.
   * - "outlined" — fond blanc, bordure standard
   * - "neutral"  — fond grisé, sans bordure
   * @default "outlined"
   */
  appearance?: CardAppearance;
  /** Contenu affiché à l'intérieur de la carte. */
  children: ReactNode;
  /** Classe CSS additionnelle. */
  className?: string;
  /** Callback déclenché au clic ou à la pression clavier (Enter/Space). Requiert variant "actionable". */
  onPress?: () => void;
  /** Callback déclenché au début du drag. Requiert variant "drag-top" ou "drag-left". */
  onDrag?: () => void;
  /** Callback déclenché à la fin du drag. Requiert variant "drag-top" ou "drag-left". */
  onDragEnd?: () => void;
}

// -----------------------------------------------------------------------
// Composant

/**
 * Card — Comète Design System
 *
 * Conteneur de surface pour regrouper du contenu connexe.
 * Supporte l'interaction (onPress) et le drag-and-drop (onDrag/onDragEnd).
 *
 * ```tsx
 * import { Card } from "@naxit/comete-design-system";
 *
 * <Card variant="actionable" appearance="neutral" onPress={() => {}}>
 *   <p>Contenu de la carte</p>
 * </Card>
 * ```
 */
export function Card({
  variant = "default",
  appearance = "outlined",
  children,
  className,
  onPress,
  onDrag,
  onDragEnd: onDragEndProp,
}: CardProps): ReactElement {
  const [isDragging, setIsDragging] = useState(false);
  const [isFocusVisible, setIsFocusVisible] = useState(false);
  const dragAreaRef = useRef<HTMLDivElement>(null);
  const dragPreviewRef = useRef<HTMLDivElement | null>(null);
  const hadKeyboardEvent = useRef(false);

  const isActionable = variant === "actionable";
  const isDraggable = variant === "drag-top" || variant === "drag-left";

  // NOTE: Track keyboard vs pointer to determine focus-visible reliably
  // on div[tabIndex], where matches(":focus-visible") can be unreliable.
  useEffect(() => {
    if (!isActionable) return;
    function onKey() {
      hadKeyboardEvent.current = true;
    }
    function onPointer() {
      hadKeyboardEvent.current = false;
    }
    document.addEventListener("keydown", onKey, true);
    document.addEventListener("pointerdown", onPointer, true);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      document.removeEventListener("pointerdown", onPointer, true);
    };
  }, [isActionable]);

  function handleFocus() {
    setIsFocusVisible(hadKeyboardEvent.current);
  }

  function handleBlur() {
    setIsFocusVisible(false);
  }

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    // NOTE: Ignore clicks originating from the drag area
    if (dragAreaRef.current?.contains(e.target as Node)) return;
    onPress?.();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPress?.();
    }
  }

  function handleDragStart(e: DragEvent<HTMLDivElement>) {
    // NOTE: Create a temporary mini-card as drag preview (ghost image)
    const preview = document.createElement("div");
    preview.className = `${styles.dragPreview} ${styles[appearance]}`;
    document.body.appendChild(preview);
    e.dataTransfer?.setDragImage(preview, 80, 35);
    dragPreviewRef.current = preview;

    setIsDragging(true);
    onDrag?.();
  }

  function handleDragEnd() {
    // NOTE: Clean up the temporary drag preview element
    if (dragPreviewRef.current) {
      document.body.removeChild(dragPreviewRef.current);
      dragPreviewRef.current = null;
    }

    setIsDragging(false);
    onDragEndProp?.();
  }

  const classNames = [
    styles.card,
    styles[appearance],
    isDraggable
      ? variant === "drag-top"
        ? styles.dragTop
        : styles.dragLeft
      : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classNames}
      role={isActionable ? "button" : undefined}
      tabIndex={isActionable ? 0 : undefined}
      onClick={isActionable ? handleClick : undefined}
      onKeyDown={isActionable ? handleKeyDown : undefined}
      onFocus={isActionable ? handleFocus : undefined}
      onBlur={isActionable ? handleBlur : undefined}
      data-interactive={isActionable || undefined}
      data-dragging={isDragging || undefined}
    >
      {isActionable && isFocusVisible && (
        <FocusRing borderRadius={4} position="inside" />
      )}
      {isDraggable && (
        <div
          ref={dragAreaRef}
          className={styles.dragArea}
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <DragIndicator
            size={16}
            color="subtlest"
            className={
              variant === "drag-top" ? styles.dragIconRotated : undefined
            }
          />
        </div>
      )}
      {isDraggable ? (
        <div className={styles.content}>{children}</div>
      ) : (
        children
      )}
    </div>
  );
}

Card.displayName = "Card";
