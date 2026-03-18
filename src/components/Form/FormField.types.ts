import type { FieldValues } from "react-hook-form";
import type { FormField } from "../../types/Form";

/**
 * Props du composant FormField
 * @template T - Type des données du formulaire
 */
export type FormFieldProps<T extends FieldValues> = {
  field: FormField<T>;
};
