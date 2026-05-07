// useHoverIntent — Comète Design System (interne)
// Hover « avec intention » : un délai sépare l'entrée de la souris du
// déclenchement de l'état hover, pour distinguer un vrai survol d'un simple
// passage. La sortie est immédiate.
//
// Cas d'usage interne : déclencher le swap calendrier↔clear sur les pickers
// au hover sans risquer un clear accidentel quand la souris ne fait que
// traverser le champ pour atteindre le bouton calendrier.
import { useCallback, useEffect, useRef, useState } from "react";

export interface UseHoverIntentResult {
  /** Vrai après que la souris soit restée sur la cible pendant `delayMs`. */
  isHovered: boolean;
  /**
   * Vrai après un appel à `suppress()`, jusqu'à ce que la souris quitte la cible.
   * Permet de neutraliser visuellement le hover d'un enfant qui apparaît sous
   * un curseur stationnaire (ex : bouton calendrier qui remplace un bouton clear
   * — le navigateur fire `pointerover` sur le nouvel élément, ce qui est
   * conceptuellement attendu mais visuellement surprenant).
   */
  isHoverSuppressed: boolean;
  /** À brancher sur `onMouseEnter` de l'élément cible. */
  onMouseEnter: () => void;
  /** À brancher sur `onMouseLeave` de l'élément cible. */
  onMouseLeave: () => void;
  /**
   * Force `isHovered=false` et active `isHoverSuppressed` jusqu'à la prochaine
   * sortie de souris. À appeler après une interaction qui change la cible
   * visible (ex : clear) pour éviter un effet de hover « hérité ».
   */
  suppress: () => void;
}

/**
 * Hover avec délai d'intention.
 *
 * @param delayMs Délai (ms) avant de passer à `isHovered=true`. Défaut 50 ms —
 *   imperceptible pour l'utilisateur (sous le seuil de perception ~100 ms) et
 *   au-dessus du timing des `user.click()` synthétiques (~10–30 ms), ce qui
 *   évite que le swap calendrier↔clear arrive en plein clic en test.
 */
export function useHoverIntent(delayMs = 50): UseHoverIntentResult {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoverSuppressed, setIsHoverSuppressed] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  // Cleanup à l'unmount pour éviter un setState après démontage.
  useEffect(() => {
    return () => {
      if (timerRef.current !== undefined) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  // NOTE design : `isHoverSuppressed` n'est PAS reset par `onMouseLeave`.
  // Raison : React peut déclencher des `mouseLeave` parasites quand un enfant
  // sous le curseur est démonté (ex : le bouton X disparaît au clear → React
  // recalcule la cible synthétique → mouseLeave parasite sur le wrapper). Ces
  // événements resetteraient prématurément la suppression et réintroduiraient
  // le bug de hover résiduel sur le bouton calendrier qui apparaît dessous.
  // À la place, la suppression est levée uniquement par un vrai réengagement
  // utilisateur (hover stable de `delayMs` après une (ré-)entrée).
  const onMouseEnter = useCallback(() => {
    if (timerRef.current !== undefined) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setIsHovered(true);
      setIsHoverSuppressed(false);
    }, delayMs);
  }, [delayMs]);

  const onMouseLeave = useCallback(() => {
    if (timerRef.current !== undefined) {
      window.clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
    setIsHovered(false);
    // Volontairement, isHoverSuppressed n'est PAS reset ici (cf. note ci-dessus).
  }, []);

  const suppress = useCallback(() => {
    if (timerRef.current !== undefined) {
      window.clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
    setIsHovered(false);
    setIsHoverSuppressed(true);
  }, []);

  return { isHovered, isHoverSuppressed, onMouseEnter, onMouseLeave, suppress };
}
