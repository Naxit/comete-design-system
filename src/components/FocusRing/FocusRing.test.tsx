// Tests unitaires du composant FocusRing
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FocusRing } from "./FocusRing";

describe("FocusRing", () => {
  it("should render a span with aria-hidden", () => {
    const { container } = render(<FocusRing />);
    const span = container.querySelector("span");
    expect(span).not.toBeNull();
    expect(span).toHaveAttribute("aria-hidden", "true");
  });

  it("should apply ring CSS class", () => {
    const { container } = render(<FocusRing />);
    expect(container.querySelector("span")).toHaveClass("ring");
  });

  it("should apply outside class by default", () => {
    const { container } = render(<FocusRing />);
    expect(container.querySelector("span")).toHaveClass("outside");
  });

  it("should apply inside class when position is inside", () => {
    const { container } = render(<FocusRing position="inside" />);
    expect(container.querySelector("span")).toHaveClass("inside");
  });

  it("should apply border-radius from borderRadius prop (number)", () => {
    const { container } = render(<FocusRing borderRadius={4} />);
    expect(container.querySelector("span")).toHaveStyle({ borderRadius: "4px" });
  });

  it("should apply border-radius 1024px when borderRadius is round", () => {
    const { container } = render(<FocusRing borderRadius="round" />);
    expect(container.querySelector("span")).toHaveStyle({ borderRadius: "1024px" });
  });

  it("should default to borderRadius 2px", () => {
    const { container } = render(<FocusRing />);
    expect(container.querySelector("span")).toHaveStyle({ borderRadius: "2px" });
  });
});
