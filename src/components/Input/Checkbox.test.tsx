import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./index";

describe("Checkbox", () => {
  describe("Rendu", () => {
    it("devrait rendre le composant avec les props de base", () => {
      render(
        <Checkbox
          checked={false}
          onChange={jest.fn()}
          inputProps={{ "aria-label": "Case à cocher" }}
        />
      );

      const checkbox = screen.getByRole("checkbox", { name: /case à cocher/i });

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
    });

    it("devrait rendre le composant comme coché quand checked est à true", () => {
      render(
        <Checkbox
          checked
          onChange={jest.fn()}
          inputProps={{ "aria-label": "Case à cocher cochée" }}
        />
      );

      const checkbox = screen.getByRole("checkbox", { name: /case à cocher cochée/i });

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeChecked();
    });
  });

  describe("Interactions", () => {
    it("devrait appeler onChange lorsque l'utilisateur clique sur la case", async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(
        <Checkbox
          checked={false}
          onChange={handleChange}
          inputProps={{ "aria-label": "Case interactive" }}
        />
      );

      const checkbox = screen.getByRole("checkbox", { name: /case interactive/i });

      await user.click(checkbox);

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("devrait rendre la case comme désactivée", () => {
      render(
        <Checkbox
          checked={false}
          disabled
          onChange={jest.fn()}
          inputProps={{ "aria-label": "Case désactivée" }}
        />
      );

      const checkbox = screen.getByRole("checkbox", { name: /case désactivée/i });

      expect(checkbox).toBeDisabled();
      expect(checkbox).not.toBeChecked();
    });
  });
});
