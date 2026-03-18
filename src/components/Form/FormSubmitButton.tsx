import type { FormSubmitButtonProps } from "./FormSubmitButton.types";

/**
 * Composant FormSubmitButton
 * @param component - Composant du bouton
 * @param props - Props du bouton
 * @param isSubmitting - Indique si le formulaire est en cours de soumission
 * @returns Composant FormSubmitButton
 */
export const FormSubmitButton = ({ component, props, isSubmitting }: FormSubmitButtonProps) => {
  const SubmitButton = component;

  return (
    <SubmitButton
      {...props}
      type="submit"
      loading={isSubmitting}
      disabled={isSubmitting || props.disabled}
    >
      {props.label}
    </SubmitButton>
  );
};
