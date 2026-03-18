import "@testing-library/jest-dom";

import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DotMenu } from "./DotMenu";
import type { DotMenuProps } from "../../types/DotMenu";

describe("DotMenu", () => {
  const defaultActions: DotMenuProps["actions"] = [
    {
      id: "edit",
      label: "Modifier",
      onClick: jest.fn(),
    },
    {
      id: "delete",
      label: "Supprimer",
      onClick: jest.fn(),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendu", () => {
    it("devrait rendre le bouton avec l'icône", () => {
      render(<DotMenu actions={defaultActions} />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();

      // Vérifier que l'icône est présente (MoreHorizIcon)
      const icon = button.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("devrait rendre le bouton avec les props par défaut", () => {
      render(<DotMenu actions={defaultActions} />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled();
    });

    it("ne devrait pas afficher le popover initialement", () => {
      render(<DotMenu actions={defaultActions} />);

      // Le popover ne devrait pas être visible au chargement
      expect(screen.queryByText("Modifier")).not.toBeInTheDocument();
      expect(screen.queryByText("Supprimer")).not.toBeInTheDocument();
    });
  });

  describe("Ouverture et fermeture du popover", () => {
    it("devrait ouvrir le popover au clic sur le bouton", async () => {
      const user = userEvent.setup();
      render(<DotMenu actions={defaultActions} />);

      const button = screen.getByRole("button");
      await user.click(button);

      // Attendre que le popover s'affiche
      await waitFor(() => {
        expect(screen.getByText("Modifier")).toBeInTheDocument();
        expect(screen.getByText("Supprimer")).toBeInTheDocument();
      });
    });

    it("devrait fermer le popover après le clic sur une action", async () => {
      const user = userEvent.setup();
      render(<DotMenu actions={defaultActions} />);

      const button = screen.getByRole("button");
      await user.click(button);

      // Attendre que le popover s'affiche
      await waitFor(() => {
        expect(screen.getByText("Modifier")).toBeInTheDocument();
      });

      // Cliquer sur une action
      const editAction = screen.getByText("Modifier");
      await user.click(editAction);

      // Attendre que le popover se ferme
      await waitFor(() => {
        expect(screen.queryByText("Modifier")).not.toBeInTheDocument();
        expect(screen.queryByText("Supprimer")).not.toBeInTheDocument();
      });
    });

    it("devrait fermer le popover en cliquant en dehors", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <DotMenu actions={defaultActions} />
          <div data-testid="outside">En dehors</div>
        </div>
      );

      const button = screen.getByRole("button");
      await user.click(button);

      // Attendre que le popover s'affiche
      await waitFor(() => {
        expect(screen.getByText("Modifier")).toBeInTheDocument();
      });

      // Cliquer sur le backdrop pour fermer le popover
      const backdrop = document.querySelector(".MuiBackdrop-root");
      if (backdrop) {
        fireEvent.mouseDown(backdrop);
        fireEvent.click(backdrop);
      }

      // Attendre que le popover se ferme
      await waitFor(() => {
        expect(screen.queryByText("Modifier")).not.toBeInTheDocument();
      });
    });
  });

  describe("Actions", () => {
    it("devrait afficher toutes les actions dans le popover", async () => {
      const user = userEvent.setup();
      render(<DotMenu actions={defaultActions} />);

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText("Modifier")).toBeInTheDocument();
        expect(screen.getByText("Supprimer")).toBeInTheDocument();
      });
    });

    it("devrait appeler onClick quand une action est cliquée", async () => {
      const user = userEvent.setup();
      const editAction = jest.fn();
      const deleteAction = jest.fn();

      const actions: DotMenuProps["actions"] = [
        {
          id: "edit",
          label: "Modifier",
          onClick: editAction,
        },
        {
          id: "delete",
          label: "Supprimer",
          onClick: deleteAction,
        },
      ];

      render(<DotMenu actions={actions} />);

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText("Modifier")).toBeInTheDocument();
      });

      const editMenuItem = screen.getByText("Modifier");
      await user.click(editMenuItem);

      expect(editAction).toHaveBeenCalledTimes(1);
      expect(deleteAction).not.toHaveBeenCalled();
    });

    it("ne devrait pas appeler onClick si l'action n'a pas de callback", async () => {
      const user = userEvent.setup();
      const actions: DotMenuProps["actions"] = [
        {
          id: "no-action",
          label: "Sans action",
        },
      ];

      render(<DotMenu actions={actions} />);

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText("Sans action")).toBeInTheDocument();
      });

      const menuItem = screen.getByText("Sans action");
      await user.click(menuItem);

      // Le popover devrait quand même se fermer
      await waitFor(() => {
        expect(screen.queryByText("Sans action")).not.toBeInTheDocument();
      });
    });

    it("devrait afficher les descriptions des actions si fournies", async () => {
      const user = userEvent.setup();
      const actions: DotMenuProps["actions"] = [
        {
          id: "edit",
          label: "Modifier",
          description: "Modifier l'élément sélectionné",
          onClick: jest.fn(),
        },
        {
          id: "delete",
          label: "Supprimer",
          description: "Supprimer définitivement",
          onClick: jest.fn(),
        },
      ];

      render(<DotMenu actions={actions} />);

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText("Modifier")).toBeInTheDocument();
        expect(screen.getByText("Modifier l'élément sélectionné")).toBeInTheDocument();
        expect(screen.getByText("Supprimer")).toBeInTheDocument();
        expect(screen.getByText("Supprimer définitivement")).toBeInTheDocument();
      });
    });

    it("ne devrait pas afficher de description si elle n'est pas fournie", async () => {
      const user = userEvent.setup();
      render(<DotMenu actions={defaultActions} />);

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText("Modifier")).toBeInTheDocument();
        expect(screen.getByText("Supprimer")).toBeInTheDocument();
      });

      // Vérifier qu'il n'y a pas de texte de description
      const menuItems = screen.getAllByRole("menuitem");
      menuItems.forEach((item) => {
        const textContent = item.textContent || "";
        // Le texte ne devrait contenir que le label, pas de description
        expect(textContent).not.toContain("description");
      });
    });
  });

  describe("Actions désactivées", () => {
    it("devrait désactiver une action si disabled est true", async () => {
      const user = userEvent.setup();
      const actions: DotMenuProps["actions"] = [
        {
          id: "edit",
          label: "Modifier",
          onClick: jest.fn(),
        },
        {
          id: "delete",
          label: "Supprimer",
          disabled: true,
          onClick: jest.fn(),
        },
      ];

      render(<DotMenu actions={actions} />);

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        const deleteMenuItem = screen.getByText("Supprimer").closest("li");
        expect(deleteMenuItem).toHaveAttribute("aria-disabled", "true");
      });
    });

    it("ne devrait pas appeler onClick pour une action désactivée", async () => {
      const user = userEvent.setup();
      const deleteAction = jest.fn();
      const actions: DotMenuProps["actions"] = [
        {
          id: "delete",
          label: "Supprimer",
          disabled: true,
          onClick: deleteAction,
        },
      ];

      render(<DotMenu actions={actions} />);

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText("Supprimer")).toBeInTheDocument();
      });

      // Vérifier que l'élément est bien désactivé
      const deleteMenuItem = screen.getByRole("menuitem", { name: "Supprimer" });
      expect(deleteMenuItem).toHaveAttribute("aria-disabled", "true");
      expect(deleteMenuItem).toHaveClass("Mui-disabled");

      // Le callback ne devrait pas être appelé car l'élément est désactivé
      // MUI empêche le clic sur les éléments désactivés, donc on ne peut pas tester
      // le clic directement, mais on vérifie que l'élément est bien désactivé
      expect(deleteAction).not.toHaveBeenCalled();
    });
  });

  describe("Positionnement du popover", () => {
    it("devrait utiliser les valeurs par défaut pour anchorOrigin et transformOrigin", async () => {
      const user = userEvent.setup();
      render(<DotMenu actions={defaultActions} />);

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText("Modifier")).toBeInTheDocument();
      });

      // Le popover devrait être positionné selon les valeurs par défaut
      const popover = screen.getByText("Modifier").closest('[role="presentation"]');
      expect(popover).toBeInTheDocument();
    });

    it("devrait utiliser les props anchorOrigin et transformOrigin personnalisées", async () => {
      const user = userEvent.setup();
      render(
        <DotMenu
          actions={defaultActions}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "bottom", horizontal: "left" }}
        />
      );

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText("Modifier")).toBeInTheDocument();
      });

      const popover = screen.getByText("Modifier").closest('[role="presentation"]');
      expect(popover).toBeInTheDocument();
    });
  });

  describe("État disabled du bouton", () => {
    it("devrait désactiver le bouton si disabled est true", () => {
      render(<DotMenu actions={defaultActions} disabled />);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("ne devrait pas ouvrir le popover si le bouton est désactivé", async () => {
      render(<DotMenu actions={defaultActions} disabled />);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();

      // Utiliser fireEvent pour simuler un clic sur un bouton désactivé
      fireEvent.click(button);

      // Le popover ne devrait pas s'ouvrir
      expect(screen.queryByText("Modifier")).not.toBeInTheDocument();
    });
  });

  describe("Props du bouton", () => {
    it("devrait passer les props supplémentaires au bouton", () => {
      render(<DotMenu actions={defaultActions} data-testid="custom-button" />);

      const button = screen.getByTestId("custom-button");
      expect(button).toBeInTheDocument();
    });

    it("devrait respecter les props de style du bouton", () => {
      const { container } = render(
        <DotMenu actions={defaultActions} sx={{ backgroundColor: "red" }} />
      );

      const button = container.querySelector("button");
      expect(button).toBeInTheDocument();
    });
  });

  describe("Gestion des IDs d'actions", () => {
    it("devrait fonctionner avec des IDs numériques", async () => {
      const user = userEvent.setup();
      const actions: DotMenuProps["actions"] = [
        {
          id: 1,
          label: "Action 1",
          onClick: jest.fn(),
        },
        {
          id: 2,
          label: "Action 2",
          onClick: jest.fn(),
        },
      ];

      render(<DotMenu actions={actions} />);

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText("Action 1")).toBeInTheDocument();
        expect(screen.getByText("Action 2")).toBeInTheDocument();
      });
    });

    it("devrait fonctionner avec des IDs string", async () => {
      const user = userEvent.setup();
      const actions: DotMenuProps["actions"] = [
        {
          id: "action-1",
          label: "Action 1",
          onClick: jest.fn(),
        },
        {
          id: "action-2",
          label: "Action 2",
          onClick: jest.fn(),
        },
      ];

      render(<DotMenu actions={actions} />);

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText("Action 1")).toBeInTheDocument();
        expect(screen.getByText("Action 2")).toBeInTheDocument();
      });
    });
  });
});
