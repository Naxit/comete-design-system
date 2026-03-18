import type { BaseSyntheticEvent, ComponentType, ComponentProps, ReactNode } from "react";
import type * as Yup from "yup";
import type { ObjectSchema } from "yup";
import type Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import type { SxProps, Theme } from "@mui/material/styles";
import type { DefaultValues, FieldErrors, FieldValues, Path } from "react-hook-form";

/**
 * Props à omettre automatiquement pour tous les champs de formulaire
 * Ces props sont gérées par react-hook-form et le composant Form
 */
export type OmittedFormProps = "onChange" | "error" | "helperText" | "value";

/**
 * Champ de formulaire générique
 * Le type des props est automatiquement inféré à partir du composant
 * @template T - Type des données du formulaire
 * @template TComponent - Type du composant React
 */
export type FormField<
  T extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TComponent extends ComponentType<any> = ComponentType<any>, // TODO: Définir la liste des composants à passer au composant Form
> = {
  /**
   * Nom du champ dans le formulaire
   */
  name: Path<T>;
  /**
   * Composant React à utiliser pour ce champ
   * Peut être n'importe quel composant (MUI, ou autre)
   */
  component: TComponent;
  /**
   * Props du composant, automatiquement typées selon le composant
   * Les props "onChange", "error", "helperText" et "value" sont automatiquement omises
   * car elles sont gérées par react-hook-form et le composant Form
   */
  props: Omit<ComponentProps<TComponent>, OmittedFormProps>;
};

/**
 * Configuration des boutons du formulaire
 */
export type FormButtons = {
  submit: {
    component: typeof Button;
    props: Omit<ButtonProps, "type"> & { label: string };
  };
};

/**
 * Configuration complète du formulaire
 * @template T - Type des données du formulaire
 * @template TFields - Types des champs (inférés automatiquement)
 */
export type FormConfig<
  T extends Record<string, unknown>,
  TFields extends FormField<T>[] = FormField<T>[],
> = {
  /**
   * Champs du formulaire
   * Utilisez la fonction createFormField() pour chaque champ afin d'obtenir
   * l'inférence de type automatique et la validation des props
   */
  fields: TFields;
  /**
   * Règles de validation Yup
   * Fonction qui reçoit yup et retourne un schéma de validation
   */
  yupRules: (yup: typeof Yup) => ObjectSchema<T>;
  /**
   * Configuration des boutons
   * TODO: Ne pas passer en paramètre le composant Button mais créer et utiliser le composant Button du DS
   */
  buttons: FormButtons;
  /**
   * Valeurs par défaut du formulaire
   */
  defaultValues?: DefaultValues<T>;
};

/**
 * Props du composant Form
 */
export type FormProps<T extends FieldValues> = {
  /**
   * ID du formulaire
   */
  id?: string;
  /**
   * Configuration du formulaire
   */
  config: FormConfig<T>;
  /**
   * Styles du formulaire
   */
  sx?: SxProps<Theme>;

  /**
   * composant enfant de Form (optionnel, si non fourni, les champs de config.fields sont rendus automatiquement)
   */
  children?: ReactNode;
  /**
   * Fonction appelée lorsque le formulaire est soumis et valide
   */
  onValid: (data: T, ev?: BaseSyntheticEvent) => void | Promise<unknown>;
  /**
   * Fonction appelée lorsque le formulaire est soumis et invalide
   */
  onInvalid?: (errors: FieldErrors<T>, ev?: BaseSyntheticEvent) => void | Promise<unknown>;
};
