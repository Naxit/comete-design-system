import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { YearPicker } from "./YearPicker.js";

describe("YearPicker", () => {
  it("should render with current year when no props provided", () => {
    render(<YearPicker />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByLabelText(`Année : ${currentYear}`)
    ).toBeInTheDocument();
  });

  it("should render with specified year", () => {
    render(<YearPicker year={2023} />);
    expect(screen.getByLabelText("Année : 2023")).toBeInTheDocument();
  });

  it("should render chevron buttons", () => {
    render(<YearPicker />);
    expect(screen.getByLabelText("Année précédente")).toBeInTheDocument();
    expect(screen.getByLabelText("Année suivante")).toBeInTheDocument();
  });

  it("should apply a custom className", () => {
    const { container } = render(<YearPicker className="custom" />);
    expect(container.firstChild).toHaveClass("root", "custom");
  });

  it("should use a custom aria-label on the root", () => {
    const { container } = render(
      <YearPicker aria-label="Exercice comptable" />
    );
    expect(container.firstChild).toHaveAttribute(
      "aria-label",
      "Exercice comptable"
    );
  });

  it("should set data-invalid when isInvalid", () => {
    const { container } = render(<YearPicker isInvalid />);
    expect(container.firstChild).toHaveAttribute("data-invalid", "true");
  });

  it("should disable all buttons when isDisabled", () => {
    render(<YearPicker year={2025} isDisabled />);
    expect(screen.getByLabelText("Année précédente")).toBeDisabled();
    expect(screen.getByLabelText("Année : 2025")).toBeDisabled();
    expect(screen.getByLabelText("Année suivante")).toBeDisabled();
  });

  it("should call onChange with year - 1 when chevron left is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<YearPicker year={2025} onChange={onChange} />);
    await user.click(screen.getByLabelText("Année précédente"));
    expect(onChange).toHaveBeenCalledWith(2024);
  });

  it("should call onChange with year + 1 when chevron right is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<YearPicker year={2025} onChange={onChange} />);
    await user.click(screen.getByLabelText("Année suivante"));
    expect(onChange).toHaveBeenCalledWith(2026);
  });

  it("should open calendar popover when year button is clicked", async () => {
    const user = userEvent.setup();
    render(<YearPicker year={2025} />);
    await user.click(screen.getByLabelText("Année : 2025"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should call onChange when a year is selected in the calendar", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<YearPicker year={2025} onChange={onChange} />);
    await user.click(screen.getByLabelText("Année : 2025"));
    const cell2023 = screen.getByRole("gridcell", { name: "2023" });
    await user.click(cell2023);
    expect(onChange).toHaveBeenCalledWith(2023);
  });
});
