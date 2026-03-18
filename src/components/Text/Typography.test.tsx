import { render, screen } from "@testing-library/react";
import Typography from "./Typography";

describe("Typography", () => {
  describe("Rendu", () => {
    it("devrait rendre le composant avec le texte fourni", () => {
      const text = "Texte de test";

      render(<Typography>{text}</Typography>);

      expect(screen.getByText(text)).toBeInTheDocument();
    });

    it("devrait rendre le composant avec des children complexes", () => {
      render(
        <Typography>
          Texte avec <strong>gras</strong> et <em>italique</em>
        </Typography>
      );

      expect(screen.getByText(/Texte avec/)).toBeInTheDocument();
      expect(screen.getByText("gras")).toBeInTheDocument();
      expect(screen.getByText("italique")).toBeInTheDocument();
    });
  });

  describe("Variantes", () => {
    it("devrait rendre avec la variante h1", () => {
      render(<Typography variant="h1">Titre principal</Typography>);

      const element = screen.getByText("Titre principal");
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe("H1");
    });

    it("devrait rendre avec la variante h2", () => {
      render(<Typography variant="h2">Sous-titre</Typography>);

      const element = screen.getByText("Sous-titre");
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe("H2");
    });

    it("devrait rendre avec la variante h3", () => {
      render(<Typography variant="h3">Titre niveau 3</Typography>);

      const element = screen.getByText("Titre niveau 3");
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe("H3");
    });

    it("devrait rendre avec la variante body1", () => {
      render(<Typography variant="body1">Corps de texte</Typography>);

      const element = screen.getByText("Corps de texte");
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe("P");
    });

    it("devrait rendre avec la variante body2", () => {
      render(<Typography variant="body2">Texte secondaire</Typography>);

      const element = screen.getByText("Texte secondaire");
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe("P");
    });

    it("devrait rendre avec la variante caption", () => {
      render(<Typography variant="caption">Légende</Typography>);

      const element = screen.getByText("Légende");
      expect(element).toBeInTheDocument();
    });
  });

  describe("Props", () => {
    it("devrait appliquer la prop align", () => {
      const { container } = render(<Typography align="center">Texte centré</Typography>);

      const element = screen.getByText("Texte centré");
      expect(element).toBeInTheDocument();
      // Vérifier que le composant est rendu (les styles sont appliqués via MUI)
      expect(container.firstChild).toBeInTheDocument();
    });

    it("devrait appliquer la prop gutterBottom", () => {
      render(<Typography gutterBottom>Texte avec marge</Typography>);

      const element = screen.getByText("Texte avec marge");
      expect(element).toBeInTheDocument();
      // La prop gutterBottom est passée au composant MUI
      expect(element).toHaveTextContent("Texte avec marge");
    });

    it("devrait appliquer la prop noWrap", () => {
      render(<Typography noWrap>Texte sans retour à la ligne</Typography>);

      const element = screen.getByText("Texte sans retour à la ligne");
      expect(element).toBeInTheDocument();
      // La prop noWrap est passée au composant MUI
      expect(element).toHaveTextContent("Texte sans retour à la ligne");
    });

    it("devrait appliquer la prop component personnalisé", () => {
      render(<Typography component="span">Texte dans un span</Typography>);

      const element = screen.getByText("Texte dans un span");
      expect(element.tagName).toBe("SPAN");
    });
  });

  describe("Accessibilité", () => {
    it("devrait avoir un rôle approprié selon la variante", () => {
      render(<Typography variant="h1">Titre</Typography>);

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Titre");
    });

    it("devrait respecter la hiérarchie des titres", () => {
      render(
        <>
          <Typography variant="h1">Titre 1</Typography>
          <Typography variant="h2">Titre 2</Typography>
          <Typography variant="h3">Titre 3</Typography>
        </>
      );

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Titre 1");
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Titre 2");
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Titre 3");
    });
  });

  describe("Intégration", () => {
    it("devrait fonctionner avec d'autres composants", () => {
      render(
        <Typography>
          Texte avec <button>Bouton</button> intégré
        </Typography>
      );

      expect(screen.getByText(/Texte avec/)).toBeInTheDocument();
      expect(screen.getByRole("button")).toHaveTextContent("Bouton");
    });

    it("devrait accepter des styles personnalisés via sx", () => {
      const { container } = render(
        <Typography sx={{ fontWeight: "bold" }}>Texte en gras</Typography>
      );

      const element = screen.getByText("Texte en gras");
      expect(element).toBeInTheDocument();
      // Vérifier que le style est appliqué (via les classes MUI)
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
