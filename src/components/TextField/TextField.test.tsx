import { createRef } from "react";
import { act } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextField } from "./TextField";

describe("TextField", () => {
  describe("Rendu", () => {
    it("devrait rendre le composant avec les props de base", () => {
      render(<TextField label="Email" placeholder="Entrez votre email" />);

      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Entrez votre email")).toBeInTheDocument();
    });

    it("devrait rendre le composant avec une valeur", () => {
      render(<TextField label="Nom" value="John Doe" onChange={() => {}} />);

      expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    });

    it("devrait rendre le composant en mode erreur", () => {
      render(<TextField label="Email" error helperText="Email invalide" />);

      expect(screen.getByText("Email invalide")).toBeInTheDocument();
    });

    it("devrait rendre le composant désactivé", () => {
      render(<TextField label="Nom" disabled />);

      expect(screen.getByLabelText("Nom")).toBeDisabled();
    });
  });

  describe("Interactions", () => {
    it("devrait appeler onChange lors de la saisie", async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<TextField label="Nom" onChange={handleChange} />);

      const input = screen.getByLabelText("Nom");
      await user.type(input, "test");

      expect(handleChange).toHaveBeenCalled();
    });

    it("devrait permettre de focus le champ", async () => {
      const user = userEvent.setup();

      render(<TextField label="Nom" />);

      const input = screen.getByLabelText("Nom");
      await user.click(input);

      expect(input).toHaveFocus();
    });

    it("devrait permettre le focus programmatique via ref", () => {
      const ref = createRef<HTMLInputElement>();

      render(<TextField label="Nom" ref={ref} />);

      act(() => {
        ref.current?.focus();
      });

      expect(screen.getByLabelText("Nom")).toHaveFocus();
    });
  });

  describe("Variantes", () => {
    it("devrait rendre avec la variante outlined par défaut", () => {
      const { container } = render(<TextField label="Nom" />);

      expect(container.querySelector(".MuiOutlinedInput-root")).toBeInTheDocument();
    });

    it("devrait rendre avec la variante filled", () => {
      const { container } = render(<TextField label="Nom" variant="filled" />);

      expect(container.querySelector(".MuiFilledInput-root")).toBeInTheDocument();
    });

    it("devrait rendre avec la variante standard", () => {
      const { container } = render(<TextField label="Nom" variant="standard" />);

      expect(container.querySelector(".MuiInput-root")).toBeInTheDocument();
    });
  });

  describe("Accessibilité", () => {
    it("devrait avoir un label associé", () => {
      render(<TextField label="Email" />);

      const input = screen.getByLabelText("Email");
      expect(input).toBeInTheDocument();
    });

    it("devrait afficher le helper text pour les lecteurs d'écran", () => {
      render(<TextField label="Email" helperText="Entrez une adresse valide" />);

      expect(screen.getByText("Entrez une adresse valide")).toBeInTheDocument();
    });

    it("devrait être accessible au clavier", async () => {
      const user = userEvent.setup();

      render(
        <>
          <button>Before</button>
          <TextField label="Nom" />
          <button>After</button>
        </>
      );

      await user.tab();
      expect(screen.getByText("Before")).toHaveFocus();

      await user.tab();
      expect(screen.getByLabelText("Nom")).toHaveFocus();

      await user.tab();
      expect(screen.getByText("After")).toHaveFocus();
    });
  });
});
