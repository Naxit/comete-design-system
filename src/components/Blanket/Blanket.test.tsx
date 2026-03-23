// Tests unitaires du composant Blanket
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Blanket } from "./Blanket";

describe("Blanket", () => {
  it("should render with role presentation", () => {
    render(<Blanket />);
    expect(screen.getByRole("presentation")).toBeInTheDocument();
  });

  it("should apply blanket CSS class", () => {
    render(<Blanket />);
    expect(screen.getByRole("presentation")).toHaveClass("blanket");
  });

  it("should call onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<Blanket onClick={handleClick} />);
    await userEvent.click(screen.getByRole("presentation"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should not throw when clicked without onClick handler", async () => {
    render(<Blanket />);
    await userEvent.click(screen.getByRole("presentation"));
  });
});
