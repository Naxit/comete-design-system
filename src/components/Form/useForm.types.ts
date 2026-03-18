import type { BaseSyntheticEvent } from "react";
import type { UseFormReturn, FieldValues, Path } from "react-hook-form";
import type { FormConfig, FormProps } from "../../types/Form";

/**
 * Props du hook useForm personnalisé
 * @template T - Type des données du formulaire
 */
export type UseFormProps<T extends FieldValues> = {
  /**
   * Configuration du formulaire
   */
  config: FormConfig<T>;
  /**
   * Fonction appelée lorsque le formulaire est soumis et valide
   */
  onValid: FormProps<T>["onValid"];
  /**
   * Fonction appelée lorsque le formulaire est soumis et invalide
   */
  onInvalid?: FormProps<T>["onInvalid"];
};

/**
 * Valeur de retour du hook useForm personnalisé
 */
export type UseFormReturnType<T extends FieldValues> = {
  /**
   * Indique si le formulaire est en cours de soumission
   */
  isSubmitting: boolean;
  /**
   * Méthodes et état de react-hook-form
   */
  formMethods: UseFormReturn<T>;
  /**
   * Fonction pour obtenir les props d'un champ avec gestion des erreurs
   */
  getFieldProps: <K extends Path<T>>(
    name: K
  ) => {
    error?: boolean;
    helperText?: string;
  } & ReturnType<UseFormReturn<T>["register"]>;
  /**
   * Fonction pour gérer la soumission du formulaire
   */
  handleSubmit: (ev: BaseSyntheticEvent) => void;
};
