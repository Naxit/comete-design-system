import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Form } from "./Form";
import type { FormConfig } from "../../types/Form";
import { createFormField } from "./helpers";

// Mock du provider Snackbar
jest.mock("../../providers", () => ({
  useSnackbar: () => ({
    showError: jest.fn(),
    showSuccess: jest.fn(),
    showInfo: jest.fn(),
    showWarning: jest.fn(),
  }),
}));

// Type pour un formulaire de test simple
type TestFormData = {
  name: string;
  email: string;
};

// Configuration de formulaire simple pour les tests
const createTestFormConfig = (
  overrides?: Partial<FormConfig<TestFormData>>
): FormConfig<TestFormData> => ({
  defaultValues: {
    name: "",
    email: "",
  },
  fields: [
    createFormField<TestFormData, typeof TextField>({
      name: "name",
      component: TextField,
      props: {
        label: "Nom",
        type: "text",
        fullWidth: true,
      },
    }),
    createFormField<TestFormData, typeof TextField>({
      name: "email",
      component: TextField,
      props: {
        label: "Email",
        type: "email",
        fullWidth: true,
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
        label: "Soumettre",
      },
    },
  },
  ...overrides,
});

describe("Form", () => {
  describe("Rendu", () => {
    it("devrait rendre le formulaire avec tous les champs", () => {
      const config = createTestFormConfig();
      const onValid = jest.fn();

      render(<Form config={config} onValid={onValid} />);

      // Vérifier que les champs sont présents
      expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

      // Vérifier que le bouton de soumission est présent
      expect(screen.getByRole("button", { name: /soumettre/i })).toBeInTheDocument();
    });

    it("devrait rendre le formulaire avec un ID personnalisé", () => {
      const config = createTestFormConfig();
      const onValid = jest.fn();

      const { container } = render(<Form config={config} onValid={onValid} id="test-form" />);

      const form = container.querySelector("#test-form");
      expect(form).toBeInTheDocument();
    });

    it("devrait rendre le formulaire avec les valeurs par défaut", () => {
      const config = createTestFormConfig({
        defaultValues: {
          name: "John Doe",
          email: "john@example.com",
        },
      });
      const onValid = jest.fn();

      render(<Form config={config} onValid={onValid} />);

      const nameInput = screen.getByLabelText(/nom/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;

      expect(nameInput.value).toBe("John Doe");
      expect(emailInput.value).toBe("john@example.com");
    });
  });

  describe("Validation", () => {
    it("devrait afficher les erreurs de validation pour les champs requis vides", async () => {
      const config = createTestFormConfig();
      const onValid = jest.fn();

      render(<Form config={config} onValid={onValid} />);

      const submitButton = screen.getByRole("button", { name: /soumettre/i });
      await userEvent.click(submitButton);

      // Attendre que les erreurs de validation apparaissent
      await waitFor(() => {
        expect(screen.getByText(/le nom est requis/i)).toBeInTheDocument();
        expect(screen.getByText(/l'email est requis/i)).toBeInTheDocument();
      });

      // onValid ne devrait pas être appelé
      expect(onValid).not.toHaveBeenCalled();
    });

    it("devrait valider le format de l'email", async () => {
      const config = createTestFormConfig();
      const onValid = jest.fn();

      render(<Form config={config} onValid={onValid} />);

      const nameInput = screen.getByLabelText(/nom/i);
      const emailInput = screen.getByLabelText(/email/i);
      const submitButton = screen.getByRole("button", { name: /soumettre/i });

      // Remplir avec un nom valide mais un email invalide
      await userEvent.type(nameInput, "John Doe");
      await userEvent.type(emailInput, "invalid-email");
      await userEvent.click(submitButton);

      // Attendre que l'erreur de validation apparaisse
      await waitFor(() => {
        expect(screen.getByText(/email invalide/i)).toBeInTheDocument();
      });

      expect(onValid).not.toHaveBeenCalled();
    });

    it("devrait valider les champs en temps réel", async () => {
      const config = createTestFormConfig();
      const onValid = jest.fn();

      render(<Form config={config} onValid={onValid} />);

      const emailInput = screen.getByLabelText(/email/i);

      // Taper un email invalide
      await userEvent.type(emailInput, "invalid");

      // Attendre que l'erreur apparaisse (validation en temps réel)
      await waitFor(() => {
        expect(screen.getByText(/email invalide/i)).toBeInTheDocument();
      });
    });

    it("devrait effacer les erreurs lorsque les champs deviennent valides", async () => {
      const config = createTestFormConfig();
      const onValid = jest.fn();

      render(<Form config={config} onValid={onValid} />);

      const emailInput = screen.getByLabelText(/email/i);

      // Taper un email invalide
      await userEvent.type(emailInput, "invalid");

      // Attendre que l'erreur apparaisse
      await waitFor(() => {
        expect(screen.getByText(/email invalide/i)).toBeInTheDocument();
      });

      // Corriger l'email
      await userEvent.clear(emailInput);
      await userEvent.type(emailInput, "valid@example.com");

      // L'erreur devrait disparaître
      await waitFor(() => {
        expect(screen.queryByText(/email invalide/i)).not.toBeInTheDocument();
      });
    });
  });

  describe("Soumission", () => {
    it("devrait appeler onValid avec les données correctes lors d'une soumission valide", async () => {
      const config = createTestFormConfig();
      const onValid = jest.fn();

      render(<Form config={config} onValid={onValid} />);

      const nameInput = screen.getByLabelText(/nom/i);
      const emailInput = screen.getByLabelText(/email/i);
      const submitButton = screen.getByRole("button", { name: /soumettre/i });

      // Remplir le formulaire avec des données valides
      await userEvent.type(nameInput, "John Doe");
      await userEvent.type(emailInput, "john@example.com");
      await userEvent.click(submitButton);

      // Attendre que onValid soit appelé
      await waitFor(() => {
        expect(onValid).toHaveBeenCalledWith(
          {
            name: "John Doe",
            email: "john@example.com",
          },
          expect.anything()
        );
      });
    });

    it("devrait appeler onInvalid avec les erreurs lors d'une soumission invalide", async () => {
      const config = createTestFormConfig();
      const onValid = jest.fn();
      const onInvalid = jest.fn();

      render(<Form config={config} onValid={onValid} onInvalid={onInvalid} />);

      const submitButton = screen.getByRole("button", { name: /soumettre/i });
      await userEvent.click(submitButton);

      // Attendre que onInvalid soit appelé
      await waitFor(() => {
        expect(onInvalid).toHaveBeenCalled();
      });

      // Vérifier que les erreurs sont passées
      expect(onInvalid).toHaveBeenCalledWith(
        expect.objectContaining({
          name: expect.anything(),
          email: expect.anything(),
        }),
        expect.anything()
      );

      expect(onValid).not.toHaveBeenCalled();
    });

    it("devrait désactiver le bouton pendant la soumission", async () => {
      const config = createTestFormConfig();
      const onValid = jest.fn().mockImplementation(() => {
        return new Promise((resolve) => setTimeout(resolve, 100));
      });

      render(<Form config={config} onValid={onValid} />);

      const nameInput = screen.getByLabelText(/nom/i);
      const emailInput = screen.getByLabelText(/email/i);
      const submitButton = screen.getByRole("button", { name: /soumettre/i });

      // Remplir le formulaire
      await userEvent.type(nameInput, "John Doe");
      await userEvent.type(emailInput, "john@example.com");

      // Le bouton ne devrait pas être désactivé avant la soumission
      expect(submitButton).not.toBeDisabled();

      // Soumettre le formulaire
      await userEvent.click(submitButton);

      // Le bouton devrait être désactivé pendant la soumission
      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });

      // Attendre que la soumission soit terminée
      await waitFor(
        () => {
          expect(submitButton).not.toBeDisabled();
        },
        { timeout: 200 }
      );
    });

    it("devrait gérer les erreurs asynchrones dans onValid", async () => {
      const config = createTestFormConfig();
      const onValid = jest.fn().mockRejectedValue(new Error("Erreur de soumission"));

      render(<Form config={config} onValid={onValid} />);

      const nameInput = screen.getByLabelText(/nom/i);
      const emailInput = screen.getByLabelText(/email/i);
      const submitButton = screen.getByRole("button", { name: /soumettre/i });

      // Remplir le formulaire
      await userEvent.type(nameInput, "John Doe");
      await userEvent.type(emailInput, "john@example.com");
      await userEvent.click(submitButton);

      // Attendre que onValid soit appelé
      await waitFor(() => {
        expect(onValid).toHaveBeenCalled();
      });

      // Le bouton devrait être réactivé après l'erreur
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
    });

    it("devrait soumettre le formulaire avec la touche Entrée", async () => {
      const config = createTestFormConfig();
      const onValid = jest.fn();

      render(<Form config={config} onValid={onValid} />);

      const nameInput = screen.getByLabelText(/nom/i);
      const emailInput = screen.getByLabelText(/email/i);

      // Remplir le formulaire
      await userEvent.type(nameInput, "John Doe");
      await userEvent.type(emailInput, "john@example.com");

      // Soumettre avec Entrée
      await userEvent.keyboard("{Enter}");

      // Attendre que onValid soit appelé
      await waitFor(() => {
        expect(onValid).toHaveBeenCalledWith(
          {
            name: "John Doe",
            email: "john@example.com",
          },
          expect.anything()
        );
      });
    });
  });

  describe("Intégration", () => {
    it("devrait fonctionner avec plusieurs soumissions consécutives", async () => {
      const config = createTestFormConfig();
      const onValid = jest.fn();

      render(<Form config={config} onValid={onValid} />);

      const nameInput = screen.getByLabelText(/nom/i);
      const emailInput = screen.getByLabelText(/email/i);
      const submitButton = screen.getByRole("button", { name: /soumettre/i });

      // Première soumission
      await userEvent.type(nameInput, "John Doe");
      await userEvent.type(emailInput, "john@example.com");
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(onValid).toHaveBeenCalledTimes(1);
      });

      // Modifier les données
      await userEvent.clear(nameInput);
      await userEvent.clear(emailInput);
      await userEvent.type(nameInput, "Jane Smith");
      await userEvent.type(emailInput, "jane@example.com");

      // Deuxième soumission
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(onValid).toHaveBeenCalledTimes(2);
        expect(onValid).toHaveBeenLastCalledWith(
          {
            name: "Jane Smith",
            email: "jane@example.com",
          },
          expect.anything()
        );
      });
    });

    it("devrait gérer correctement les valeurs modifiées après une erreur de validation", async () => {
      const config = createTestFormConfig();
      const onValid = jest.fn();

      render(<Form config={config} onValid={onValid} />);

      const nameInput = screen.getByLabelText(/nom/i);
      const emailInput = screen.getByLabelText(/email/i);
      const submitButton = screen.getByRole("button", { name: /soumettre/i });

      // Soumettre avec des données invalides
      await userEvent.click(submitButton);

      // Attendre les erreurs
      await waitFor(() => {
        expect(screen.getByText(/le nom est requis/i)).toBeInTheDocument();
      });

      // Corriger les erreurs
      await userEvent.type(nameInput, "John Doe");
      await userEvent.type(emailInput, "john@example.com");

      // Soumettre à nouveau
      await userEvent.click(submitButton);

      // Vérifier que la soumission est réussie
      await waitFor(() => {
        expect(onValid).toHaveBeenCalledWith(
          {
            name: "John Doe",
            email: "john@example.com",
          },
          expect.anything()
        );
      });
    });
  });

  describe("Props du bouton", () => {
    it("devrait respecter les props personnalisées du bouton", () => {
      const config = createTestFormConfig({
        buttons: {
          submit: {
            component: Button,
            props: {
              variant: "outlined",
              color: "secondary",
              label: "Envoyer",
            },
          },
        },
      });
      const onValid = jest.fn();

      render(<Form config={config} onValid={onValid} />);

      const submitButton = screen.getByRole("button", { name: /envoyer/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveClass("MuiButton-outlined");
    });

    it("devrait respecter la prop disabled du bouton", () => {
      const config = createTestFormConfig({
        buttons: {
          submit: {
            component: Button,
            props: {
              variant: "contained",
              label: "Soumettre",
              disabled: true,
            },
          },
        },
      });
      const onValid = jest.fn();

      render(<Form config={config} onValid={onValid} />);

      const submitButton = screen.getByRole("button", { name: /soumettre/i });
      expect(submitButton).toBeDisabled();
    });
  });
});
