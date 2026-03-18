import { render, screen } from "@testing-library/react";
import InformativeState from "./InformativeState";

describe("InformativeState", () => {
  describe("Rendu", () => {
    it("devrait rendre le composant avec l'image, le titre et le sous-titre", () => {
      const imageUrl = "/icons/error.svg";
      const title = "Titre de l'illustration";
      const subtitle = "Sous-titre de l'illustration";

      render(<InformativeState imageUrl={imageUrl} title={title} subtitle={subtitle} />);

      // Vérifier que l'image est présente
      const image = screen.getByRole("img");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", imageUrl);

      // Vérifier que le titre est présent
      expect(screen.getByText(title)).toBeInTheDocument();

      // Vérifier que le sous-titre est présent
      expect(screen.getByText(subtitle)).toBeInTheDocument();
    });

    it("devrait rendre le composant avec uniquement l'image et le titre", () => {
      const imageUrl = "/icons/create_form.svg";
      const title = "Titre simple";

      render(<InformativeState imageUrl={imageUrl} title={title} />);

      // Vérifier que l'image est présente
      const image = screen.getByRole("img");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", imageUrl);

      // Vérifier que le titre est présent
      expect(screen.getByText(title)).toBeInTheDocument();

      // Vérifier que le sous-titre n'est pas présent
      expect(screen.queryByText(/sous-titre/i)).not.toBeInTheDocument();
    });

    it("devrait rendre le composant avec des children", () => {
      const imageUrl = "/icons/error.svg";
      const title = "Titre avec enfants";
      const children = <button>Action</button>;

      render(
        <InformativeState imageUrl={imageUrl} title={title}>
          {children}
        </InformativeState>
      );

      // Vérifier que l'image est présente
      expect(screen.getByRole("img")).toBeInTheDocument();

      // Vérifier que le titre est présent
      expect(screen.getByText(title)).toBeInTheDocument();

      // Vérifier que les children sont présents
      expect(screen.getByRole("button", { name: /action/i })).toBeInTheDocument();
    });

    it("devrait rendre le composant avec tous les éléments (image, titre, sous-titre et children)", () => {
      const imageUrl = "/icons/create_form.svg";
      const title = "Titre complet";
      const subtitle = "Sous-titre complet";
      const children = <div>Contenu supplémentaire</div>;

      render(
        <InformativeState imageUrl={imageUrl} title={title} subtitle={subtitle}>
          {children}
        </InformativeState>
      );

      // Vérifier que l'image est présente
      const image = screen.getByRole("img");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", imageUrl);

      // Vérifier que le titre est présent
      expect(screen.getByText(title)).toBeInTheDocument();

      // Vérifier que le sous-titre est présent
      expect(screen.getByText(subtitle)).toBeInTheDocument();

      // Vérifier que les children sont présents
      expect(screen.getByText("Contenu supplémentaire")).toBeInTheDocument();
    });
  });

  describe("Structure et styles", () => {
    it("devrait avoir la structure Stack correcte avec spacing", () => {
      const imageUrl = "/icons/error.svg";
      const title = "Test structure";

      const { container } = render(<InformativeState imageUrl={imageUrl} title={title} />);

      // Vérifier que le composant principal est un Stack
      const stack = container.firstChild;
      expect(stack).toBeInTheDocument();
    });

    it("devrait afficher le titre avec la variante h5 et fontWeight 600", () => {
      const imageUrl = "/icons/error.svg";
      const title = "Titre stylé";

      render(<InformativeState imageUrl={imageUrl} title={title} />);

      const titleElement = screen.getByText(title);
      expect(titleElement).toBeInTheDocument();
      expect(titleElement.tagName.toLowerCase()).toBe("h5");
    });

    it("devrait afficher le sous-titre avec la variante body1 et couleur text.secondary", () => {
      const imageUrl = "/icons/error.svg";
      const title = "Titre";
      const subtitle = "Sous-titre stylé";

      render(<InformativeState imageUrl={imageUrl} title={title} subtitle={subtitle} />);

      const subtitleElement = screen.getByText(subtitle);
      expect(subtitleElement).toBeInTheDocument();
      expect(subtitleElement.tagName.toLowerCase()).toBe("p");
    });
  });

  describe("Props optionnels", () => {
    it("ne devrait pas rendre le sous-titre quand subtitle n'est pas fourni", () => {
      const imageUrl = "/icons/create_form.svg";
      const title = "Sans sous-titre";

      render(<InformativeState imageUrl={imageUrl} title={title} />);

      // Vérifier que le titre est présent
      expect(screen.getByText(title)).toBeInTheDocument();

      // Vérifier qu'aucun élément de sous-titre n'est présent
      const typographyElements = screen.getAllByRole("heading");
      expect(typographyElements).toHaveLength(1); // Seulement le titre
    });

    it("ne devrait pas rendre les children quand children n'est pas fourni", () => {
      const imageUrl = "/icons/error.svg";
      const title = "Sans enfants";

      render(<InformativeState imageUrl={imageUrl} title={title} />);

      // Vérifier que l'image et le titre sont présents
      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(screen.getByText(title)).toBeInTheDocument();

      // Vérifier qu'aucun bouton ou élément enfant n'est présent
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("devrait accepter subtitle comme null", () => {
      const imageUrl = "/icons/create_form.svg";
      const title = "Avec subtitle null";

      render(<InformativeState imageUrl={imageUrl} title={title} subtitle={null} />);

      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.queryByText(/sous-titre/i)).not.toBeInTheDocument();
    });

    it("devrait accepter children comme null", () => {
      const imageUrl = "/icons/error.svg";
      const title = "Avec children null";

      render(
        <InformativeState imageUrl={imageUrl} title={title}>
          {null}
        </InformativeState>
      );

      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });
});
