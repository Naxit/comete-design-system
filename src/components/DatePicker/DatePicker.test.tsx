// Tests unitaires du composant DatePicker
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  describe("rendu de base", () => {
    it("should render date segments", () => {
      const { container } = render(<DatePicker aria-label="Date" />);
      expect(container.querySelector(".dateInput")).toBeInTheDocument();
    });

    it("should have displayName set to DatePicker", () => {
      expect(DatePicker.displayName).toBe("DatePicker");
    });

    it("should apply datePicker and bordered classes by default", () => {
      const { container } = render(<DatePicker aria-label="Date" />);
      expect(container.firstElementChild).toHaveClass(
        "datePicker",
        "bordered",
      );
    });

    it("should render calendar button", () => {
      render(<DatePicker aria-label="Date" />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  describe("prop appearance", () => {
    it("should apply subtle class", () => {
      const { container } = render(
        <DatePicker aria-label="Date" appearance="subtle" />,
      );
      expect(container.firstElementChild).toHaveClass("subtle");
    });
  });

  describe("prop isDisabled", () => {
    it("should set data-disabled", () => {
      const { container } = render(
        <DatePicker aria-label="Date" isDisabled />,
      );
      expect(container.querySelector("[data-disabled]")).toBeInTheDocument();
    });
  });

  describe("prop isInvalid", () => {
    it("should set data-invalid", () => {
      const { container } = render(
        <DatePicker aria-label="Date" isInvalid />,
      );
      expect(container.querySelector("[data-invalid]")).toBeInTheDocument();
    });
  });

  describe("popover", () => {
    it("should open calendar on button click", async () => {
      render(<DatePicker aria-label="Date" />);
      await userEvent.click(screen.getByRole("button"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  describe("prop className", () => {
    it("should append custom className", () => {
      const { container } = render(
        <DatePicker aria-label="Date" className="custom" />,
      );
      expect(container.firstElementChild).toHaveClass("custom");
    });
  });
});
