import { createContext, useContext } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import Stack from "@mui/material/Stack";
import { useForm } from "./useForm";
import { FormField } from "./FormField";
// import type { FormProps } from "@types/components/Form"; // TODO: CW-21558
import type { FormProps } from "../../types/Form";
import { FormSubmitButton } from "./FormSubmitButton";

/**
 * Composant Form générique
 * Génère un formulaire à partir d'une configuration
 * @param config - Configuration du formulaire
 * @param id - ID du formulaire
 * @param sx - Styles du formulaire
 * @returns Composant Form
 */

interface FormContextValue {
  formMethods: UseFormReturn<FieldValues>;
  getFieldProps: ReturnType<typeof useForm>["getFieldProps"];
  isSubmitting: boolean;
  config: FormProps<FieldValues>["config"];
}

const FormContext = createContext<FormContextValue | undefined>(undefined);

const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("Form components must be used within <Form>");
  }
  return context;
};

// Form Provider
const FormProvider = <T extends Record<string, unknown>>({
  config,
  onValid,
  onInvalid,
  id,
  sx,
  children,
}: FormProps<T>) => {
  const { isSubmitting, getFieldProps, handleSubmit, formMethods } = useForm({
    config,
    onValid,
    onInvalid,
  });

  // Si children est fourni, les utiliser, sinon rendre automatiquement les champs de config.fields
  const renderedFields = children ?? (
    <>
      {config.fields.map((field, index) => (
        <FormField key={(field.name as string) || index} field={field} />
      ))}
    </>
  );

  return (
    <FormContext.Provider
      value={
        {
          formMethods,
          getFieldProps,
          isSubmitting,
          config,
        } as FormContextValue
      }
    >
      <Stack component="form" spacing={2} id={id} sx={sx} onSubmit={handleSubmit}>
        {renderedFields}
        <FormSubmitButton
          component={config.buttons.submit.component}
          props={config.buttons.submit.props}
          isSubmitting={isSubmitting}
        />
      </Stack>
    </FormContext.Provider>
  );
};

// Export Form Provider
export const Form = <T extends Record<string, unknown>>(props: FormProps<T>) => {
  return <FormProvider {...props} />;
};

Form.Field = FormField;
export { useFormContext };
