import { Button } from "@aexae/design-system";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {
  Form,
  type FormConfig,
  type FormProps,
  createFormField,
  SnackbarProvider,
} from "@aexae/design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";

// ----------------------------------------------------------------------

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <SnackbarProvider>
        <Box sx={{ width: 400, p: 2 }}>
          <Story />
        </Box>
      </SnackbarProvider>
    ),
  ],
};

export default meta;

// ----------------------------------------------------------------------

// Type pour les données du formulaire simple
type SimpleFormData = {
  name: string;
  email: string;
};

// Configuration du formulaire simple
const simpleFormConfig: FormConfig<SimpleFormData> = {
  defaultValues: {
    name: "",
    email: "",
  },
  fields: [
    createFormField<SimpleFormData, typeof TextField>({
      name: "name",
      component: TextField,
      props: {
        label: "Nom",
        type: "text",
        fullWidth: true,
        margin: "normal",
      },
    }),
    createFormField<SimpleFormData, typeof TextField>({
      name: "email",
      component: TextField,
      props: {
        label: "Email",
        type: "email",
        fullWidth: true,
        margin: "normal",
      },
    }),
  ],
  yupRules: (yup) =>
    yup.object().shape({
      name: yup.string().required("Le nom est requis"),
      email: yup.string().email("Email invalide").required("L'email est requis"),
    }),
  buttons: {
    submit: {
      component: Button,
      props: {
        variant: "contained",
        fullWidth: true,
        label: "Soumettre",
      },
    },
  },
};

// ----------------------------------------------------------------------

// Type pour les données du formulaire complet
type CompleteFormData = {
  name: string;
  description: string;
};

// Configuration du formulaire complet
const completeFormConfig: FormConfig<CompleteFormData> = {
  defaultValues: {
    name: "",
    description: "",
  },
  fields: [
    createFormField<CompleteFormData, typeof TextField>({
      name: "name",
      component: TextField,
      props: {
        label: "Nom",
        type: "text",
        fullWidth: true,
        margin: "normal",
      },
    }),
    createFormField<CompleteFormData, typeof TextField>({
      name: "description",
      component: TextField,
      props: {
        id: "description-textfield",
        label: "Description",
        name: "description",
        type: "text",
        multiline: true,
        rows: 4,
        fullWidth: true,
        margin: "normal",
      },
    }),
  ],
  yupRules: (yup) =>
    yup.object().shape({
      name: yup.string().required("Le nom est requis"),
      description: yup
        .string()
        .required("La description est requise")
        .min(10, "La description doit contenir au moins 10 caractères"),
    }),
  buttons: {
    submit: {
      component: Button,
      props: {
        variant: "contained",
        fullWidth: true,
        label: "Créer",
      },
    },
  },
};

// ----------------------------------------------------------------------

// Type pour les données du formulaire avec valeurs pré-remplies
type PrefilledFormData = {
  name: string;
  email: string;
};

// Configuration du formulaire avec valeurs pré-remplies
const prefilledFormConfig: FormConfig<PrefilledFormData> = {
  defaultValues: {
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
  },
  fields: [
    createFormField<PrefilledFormData, typeof TextField>({
      name: "name",
      component: TextField,
      props: {
        label: "Nom",
        type: "text",
        fullWidth: true,
        margin: "normal",
      },
    }),
    createFormField<PrefilledFormData, typeof TextField>({
      name: "email",
      component: TextField,
      props: {
        label: "Email",
        type: "email",
        fullWidth: true,
        margin: "normal",
      },
    }),
  ],
  yupRules: (yup) =>
    yup.object().shape({
      name: yup.string().required("Le nom est requis"),
      email: yup.string().email("Email invalide").required("L'email est requis"),
    }),
  buttons: {
    submit: {
      component: Button,
      props: {
        variant: "contained",
        fullWidth: true,
        label: "Modifier",
      },
    },
  },
};

// ----------------------------------------------------------------------

export const Simple: StoryObj<FormProps<SimpleFormData>> = {
  args: {
    config: simpleFormConfig,
    onValid: async (data: SimpleFormData) => {
      console.log("Formulaire simple soumis:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
  },
  render: (args) => <Form id="simple-form" {...args} />,
};

// ----------------------------------------------------------------------

export const Complete: StoryObj<FormProps<CompleteFormData>> = {
  args: {
    config: completeFormConfig,
    onValid: async (data: CompleteFormData) => {
      console.log("Formulaire complet soumis:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    },
  },
  render: (args) => <Form id="complete-form" {...args} />,
};

// ----------------------------------------------------------------------

export const Prefilled: StoryObj<FormProps<PrefilledFormData>> = {
  args: {
    config: prefilledFormConfig,
    onValid: async (data: PrefilledFormData) => {
      console.log("Formulaire avec valeurs pré-remplies soumis:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
  },
  render: (args) => {
    return (
      <>
        {/* <Select options={zones} value="2" onChange={(ev, option) => console.log(option?.value)} /> */}
        <Form id="prefilled-form" {...args} />
      </>
    );
  },
};

// ----------------------------------------------------------------------

export const WithError: StoryObj<FormProps<SimpleFormData>> = {
  args: {
    config: simpleFormConfig,
    onValid: (data: SimpleFormData) => {
      console.log("Formulaire avec erreur soumis:", data);
      throw new Error("Test error");
    },
    onInvalid: (errors) => {
      console.log("Erreurs de validation:", errors);
    },
  },
  render: (args) => <Form id="simple-form-with-error" {...args} />,
};
