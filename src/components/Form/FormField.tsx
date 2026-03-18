import { useWatch } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import type { FormFieldProps } from "./FormField.types";
import { useFormContext } from "./Form";

/**
 * Composant pour un champ individuel du formulaire
 * Utilise useWatch pour observer uniquement ce champ et se re-rendre uniquement quand il change
 */
export const FormField = <T extends FieldValues>({ field }: FormFieldProps<T>) => {
  const { formMethods, getFieldProps } = useFormContext();
  const Component = field.component;
  const fieldName = field.name;

  // Utilisation de useWatch pour observer uniquement ce champ
  // Cela déclenche un re-rendu uniquement quand ce champ change
  // useWatch est préférable à formMethods.watch() car :
  // - Il déclenche un re-rendu uniquement de ce composant (pas du parent)
  // - Il est optimisé pour observer un champ spécifique dans un composant isolé
  // - Il est compatible avec React Compiler
  const fieldValue = useWatch({
    control: formMethods.control,
    name: fieldName,
  });

  // Récupération des props avec gestion des erreurs et valeur
  const fieldProps = getFieldProps(fieldName);

  // Merge des props du champ avec les props génériques
  const mergedProps = {
    ...field.props,
    ...fieldProps,
    value: fieldValue,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Component {...(mergedProps as any)} />;
};
