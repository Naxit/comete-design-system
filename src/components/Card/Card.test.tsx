// Tests unitaires du composant Card
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  describe("rendu de base", () => {
    it("should render children", () => {
      render(<Card>Contenu</Card>);
      expect(screen.getByText("Contenu")).toBeInTheDocument();
    });

    it("should have displayName set to Card", () => {
      expect(Card.displayName).toBe("Card");
    });
  });

  describe("classes CSS par défaut", () => {
    it("should apply card and default classes when no variant given", () => {
      const { container } = render(<Card>x</Card>);
      expect(container.firstElementChild).toHaveClass("card", "default");
    });
  });

  describe("prop variant", () => {
    it.each([["default"], ["outlined"], ["elevated"], ["neutral"]] as const)(
      "should apply class %s when variant=%s",
      (variant) => {
        const { container } = render(<Card variant={variant}>x</Card>);
        expect(container.firstElementChild).toHaveClass(variant);
      }
    );
  });

  describe("prop className", () => {
    it("should append custom className", () => {
      const { container } = render(<Card className="custom">x</Card>);
      expect(container.firstElementChild).toHaveClass("custom");
    });
  });

  describe("rendu HTML", () => {
    it("should render as a div", () => {
      const { container } = render(<Card>x</Card>);
      expect(container.firstElementChild?.tagName).toBe("DIV");
    });
  });
});
