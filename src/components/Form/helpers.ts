import type { FieldValues, Path } from "react-hook-form";
import type { ComponentType, ComponentProps } from "react";
import type { FormField, OmittedFormProps } from "../../types/Form";

/**
 * Fonction helper pour créer un champ de formulaire avec inférence de type automatique
 * Cette fonction permet à TypeScript d'inférer correctement le type du composant
 * et de valider les props en fonction du composant choisi
 * @template T - Type des données du formulaire
 * @template TComponent - Type du composant React (inféré automatiquement)
 * @param field - Configuration du champ
 * @returns Le champ de formulaire typé
 */
export const createFormField = <
  T extends FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TComponent extends ComponentType<any>, // TODO: Définir la liste des composants à passer au composant Form
>(field: {
  name: Path<T>;
  component: TComponent;
  props: Omit<ComponentProps<TComponent>, OmittedFormProps>;
}): FormField<T, TComponent> => {
  return field;
};
