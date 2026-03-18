import { useCallback, useMemo, useState, type BaseSyntheticEvent } from "react";
import type { DefaultValues, Resolver } from "react-hook-form";
import {
  useForm as useFormHook,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { ObjectSchema } from "yup";
import { useSnackbar } from "../../providers";
import type { UseFormProps, UseFormReturnType } from "./useForm.types";

/**
 * Hook personnalisé pour gérer un formulaire avec react-hook-form et yup
 * @param props - Props du hook
 * @returns Méthodes et état du formulaire
 */
export const useForm = <T extends FieldValues>(props: UseFormProps<T>): UseFormReturnType<T> => {
  const { config, onValid, onInvalid } = props;
  const { defaultValues, yupRules } = config;
  const { showError } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Création du schéma yup à partir des règles
   */
  const validationSchema: ObjectSchema<T> = useMemo(() => {
    return yupRules(yup);
  }, [yupRules]);

  /**
   * Initialisation de react-hook-form avec yup
   */
  const formMethods: UseFormReturn<T> = useFormHook<T>({
    resolver: yupResolver(validationSchema) as unknown as Resolver<T, unknown, T>,
    defaultValues: defaultValues as DefaultValues<T>,
    mode: "onChange",
  });

  const { register, formState } = formMethods;
  const { errors } = formState;

  /**
   * Fonction pour obtenir les props d'un champ avec gestion des erreurs
   * Utilise register() directement pour tous les champs, avec getValues() pour obtenir la valeur
   */
  const getFieldProps = useCallback(
    <K extends Path<T>>(name: K) => {
      const fieldError = errors[name];
      const registeredProps = register(name);

      // Pour tous les champs, on utilise register()
      return {
        ...registeredProps,
        error: !!fieldError,
        helperText: fieldError?.message as string | undefined,
      };
    },
    [register, errors]
  );

  /**
   * Fonction pour gérer la soumission du formulaire
   * @param ev - Événement de soumission du formulaire
   */
  const handleSubmit = (ev: BaseSyntheticEvent) => {
    ev.preventDefault();
    setIsSubmitting(true);

    void formMethods
      .handleSubmit(
        onValid,
        onInvalid
      )(ev)
      .catch((err: unknown) => {
        showError("Une erreur est survenue", err as Error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // ----------------------------------------------------------------------

  return {
    isSubmitting,
    formMethods,
    getFieldProps,
    handleSubmit,
  };
};
