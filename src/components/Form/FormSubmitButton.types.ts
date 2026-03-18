import type { FormButtons } from "../../types/Form";

/**
 * Props du composant FormSubmitButton
 */
export type FormSubmitButtonProps = {
  component: FormButtons["submit"]["component"];
  props: FormButtons["submit"]["props"];
  isSubmitting: boolean;
};
