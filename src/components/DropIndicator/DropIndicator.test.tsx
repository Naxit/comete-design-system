// Tests unitaires pour DropIndicator
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DropIndicator } from "./DropIndicator";

describe("DropIndicator", () => {
  it("should render with separator role", () => {
    const { container } = render(<DropIndicator />);
    expect(container.querySelector("[role='separator']")).toBeInTheDocument();
  });

  it("should have displayName set to DropIndicator", () => {
    expect(DropIndicator.displayName).toBe("DropIndicator");
  });

  it("should apply dropIndicator class", () => {
    const { container } = render(<DropIndicator />);
    expect(container.firstElementChild).toHaveClass("dropIndicator");
  });

  it("should render two circles and one line by default", () => {
    const { container } = render(<DropIndicator />);
    expect(container.querySelectorAll(".circle")).toHaveLength(2);
    expect(container.querySelectorAll(".line")).toHaveLength(1);
  });

  it("should default to horizontal orientation", () => {
    const { container } = render(<DropIndicator />);
    expect(container.firstElementChild).toHaveAttribute("aria-orientation", "horizontal");
    expect(container.firstElementChild).not.toHaveClass("vertical");
  });

  it("should apply vertical class when orientation is vertical", () => {
    const { container } = render(<DropIndicator orientation="vertical" />);
    expect(container.firstElementChild).toHaveClass("vertical");
    expect(container.firstElementChild).toHaveAttribute("aria-orientation", "vertical");
  });

  it("should apply custom className", () => {
    const { container } = render(<DropIndicator className="custom" />);
    expect(container.firstElementChild).toHaveClass("custom");
  });

  // appearance ---------------------------------------------------------------

  it("should render circles when appearance is round (default)", () => {
    const { container } = render(<DropIndicator />);
    expect(container.querySelectorAll(".circle")).toHaveLength(2);
    expect(container.querySelectorAll(".angle")).toHaveLength(0);
  });

  it("should render angle caps when appearance is angle", () => {
    const { container } = render(<DropIndicator appearance="angle" />);
    expect(container.querySelectorAll(".angle")).toHaveLength(2);
    expect(container.querySelectorAll(".circle")).toHaveLength(0);
  });

  // side ---------------------------------------------------------------------

  it("should render both caps by default", () => {
    const { container } = render(<DropIndicator />);
    expect(container.querySelectorAll(".circle")).toHaveLength(2);
  });

  it("should render only start cap when side is start", () => {
    const { container } = render(<DropIndicator side="start" />);
    const circles = container.querySelectorAll(".circle");
    expect(circles).toHaveLength(1);
    // circle should be before the line
    expect(circles[0]?.nextElementSibling).toHaveClass("line");
  });

  it("should render only end cap when side is end", () => {
    const { container } = render(<DropIndicator side="end" />);
    const circles = container.querySelectorAll(".circle");
    expect(circles).toHaveLength(1);
    // line should be before the circle
    expect(circles[0]?.previousElementSibling).toHaveClass("line");
  });

  it("should combine appearance angle with side start", () => {
    const { container } = render(<DropIndicator appearance="angle" side="start" />);
    expect(container.querySelectorAll(".angle")).toHaveLength(1);
    expect(container.querySelectorAll(".circle")).toHaveLength(0);
  });
});
