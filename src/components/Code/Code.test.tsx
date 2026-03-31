// Tests unitaires du composant Code
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Code } from "./Code";

describe("Code", () => {
  describe("rendu de base", () => {
    it("should render children", () => {
      render(<Code>font-size</Code>);
      expect(screen.getByText("font-size")).toBeInTheDocument();
    });

    it("should have displayName set to Code", () => {
      expect(Code.displayName).toBe("Code");
    });

    it("should render as a code element", () => {
      const { container } = render(<Code>x</Code>);
      expect(container.firstElementChild?.tagName).toBe("CODE");
    });

    it("should apply code class", () => {
      const { container } = render(<Code>x</Code>);
      expect(container.firstElementChild).toHaveClass("code");
    });
  });

  describe("prop className", () => {
    it("should append custom className", () => {
      const { container } = render(<Code className="custom">x</Code>);
      expect(container.firstElementChild).toHaveClass("code", "custom");
    });
  });
});
