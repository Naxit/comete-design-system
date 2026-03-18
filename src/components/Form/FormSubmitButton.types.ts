import type { FormButtons } from "./Form.types";

/**
 * Props du composant FormSubmitButton
 */
export type FormSubmitButtonProps = {
  component: FormButtons["submit"]["component"];
  props: FormButtons["submit"]["props"];
  isSubmitting: boolean;
};
