import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { YearRangePicker } from "./YearRangePicker.js";

describe("YearRangePicker", () => {
  it("should render with current year when no props provided", () => {
    render(<YearRangePicker />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByLabelText(`Année de début : ${currentYear}`)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(`Année de fin : ${currentYear}`)
    ).toBeInTheDocument();
  });

  it("should render with specified start and end years", () => {
    render(<YearRangePicker startYear={2023} endYear={2025} />);
    expect(screen.getByLabelText("Année de début : 2023")).toBeInTheDocument();
    expect(screen.getByLabelText("Année de fin : 2025")).toBeInTheDocument();
  });

  it("should render the separator", () => {
    render(<YearRangePicker />);
    expect(screen.getByText("→")).toBeInTheDocument();
  });

  it("should render the calendar button", () => {
    render(<YearRangePicker />);
    expect(
      screen.getByLabelText("Ouvrir le sélecteur d'années")
    ).toBeInTheDocument();
  });

  it("should apply a custom className", () => {
    const { container } = render(<YearRangePicker className="custom" />);
    expect(container.firstChild).toHaveClass("root", "custom");
  });

  it("should use a custom aria-label", () => {
    const { container } = render(
      <YearRangePicker aria-label="Période comptable" />
    );
    expect(container.firstChild).toHaveAttribute(
      "aria-label",
      "Période comptable"
    );
  });

  it("should set data-invalid when isInvalid", () => {
    const { container } = render(<YearRangePicker isInvalid />);
    expect(container.firstChild).toHaveAttribute("data-invalid", "true");
  });

  it("should disable all buttons when isDisabled", () => {
    render(
      <YearRangePicker startYear={2023} endYear={2025} isDisabled />
    );
    const startBtn = screen.getByLabelText("Année de début : 2023");
    const endBtn = screen.getByLabelText("Année de fin : 2025");
    const calBtn = screen.getByLabelText("Ouvrir le sélecteur d'années");
    expect(startBtn).toBeDisabled();
    expect(endBtn).toBeDisabled();
    expect(calBtn).toBeDisabled();
  });

  // -- calendars=2 (default) — dual calendar everywhere --

  it("should open dual calendar when start year button is clicked (calendars=2)", async () => {
    const user = userEvent.setup();
    render(<YearRangePicker startYear={2023} endYear={2025} />);
    await user.click(screen.getByLabelText("Année de début : 2023"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    const grids = screen.getAllByRole("grid");
    expect(grids.length).toBeGreaterThanOrEqual(2);
  });

  it("should open dual calendar when end year button is clicked (calendars=2)", async () => {
    const user = userEvent.setup();
    render(<YearRangePicker startYear={2023} endYear={2025} />);
    await user.click(screen.getByLabelText("Année de fin : 2025"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    const grids = screen.getAllByRole("grid");
    expect(grids.length).toBeGreaterThanOrEqual(2);
  });

  it("should open dual calendar when calendar button is clicked (calendars=2)", async () => {
    const user = userEvent.setup();
    render(<YearRangePicker startYear={2023} endYear={2025} />);
    await user.click(screen.getByLabelText("Ouvrir le sélecteur d'années"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    const grids = screen.getAllByRole("grid");
    expect(grids.length).toBeGreaterThanOrEqual(2);
  });

  // -- calendars=1 — single calendar everywhere --

  it("should open single calendar when start year button is clicked (calendars=1)", async () => {
    const user = userEvent.setup();
    render(
      <YearRangePicker startYear={2023} endYear={2025} calendars={1} />
    );
    await user.click(screen.getByLabelText("Année de début : 2023"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    const grids = screen.getAllByRole("grid");
    expect(grids).toHaveLength(1);
  });

  it("should open single calendar when calendar button is clicked (calendars=1)", async () => {
    const user = userEvent.setup();
    render(
      <YearRangePicker startYear={2023} endYear={2025} calendars={1} />
    );
    await user.click(screen.getByLabelText("Ouvrir le sélecteur d'années"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    const grids = screen.getAllByRole("grid");
    expect(grids).toHaveLength(1);
  });

  // -- onChange --

  it("should call onChange with start changed (calendars=1, start button)", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <YearRangePicker
        startYear={2025}
        endYear={2025}
        calendars={1}
        onChange={onChange}
      />
    );
    await user.click(screen.getByLabelText("Année de début : 2025"));
    const cell2023 = screen.getByRole("gridcell", { name: "2023" });
    await user.click(cell2023);
    expect(onChange).toHaveBeenCalledWith(2023, 2025);
  });

  it("should call onChange with end changed (calendars=1, end button)", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <YearRangePicker
        startYear={2023}
        endYear={2025}
        calendars={1}
        onChange={onChange}
      />
    );
    await user.click(screen.getByLabelText("Année de fin : 2025"));
    const cell2027 = screen.getByRole("gridcell", { name: "2027" });
    await user.click(cell2027);
    expect(onChange).toHaveBeenCalledWith(2023, 2027);
  });

  it("should auto-swap when start > end (calendars=1)", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <YearRangePicker
        startYear={2020}
        endYear={2022}
        calendars={1}
        onChange={onChange}
      />
    );
    await user.click(screen.getByLabelText("Année de début : 2020"));
    const cell2030 = screen.getByRole("gridcell", { name: "2030" });
    await user.click(cell2030);
    expect(onChange).toHaveBeenCalledWith(2022, 2030);
  });
});
