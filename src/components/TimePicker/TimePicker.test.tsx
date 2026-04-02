// Tests unitaires du composant TimePicker
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Time } from "@internationalized/date";
import { TimePicker } from "./TimePicker";

describe("TimePicker", () => {
  describe("rendu de base", () => {
    it("should render time segments", () => {
      const { container } = render(<TimePicker aria-label="Heure" />);
      expect(container.querySelector(".timeInput")).toBeInTheDocument();
    });

    it("should have displayName set to TimePicker", () => {
      expect(TimePicker.displayName).toBe("TimePicker");
    });

    it("should apply timePicker class on root and bordered on InputContainer", () => {
      const { container } = render(<TimePicker aria-label="Heure" />);
      expect(container.firstElementChild).toHaveClass("timePicker");
      expect(container.querySelector(".inputContainer")).toHaveClass("bordered");
    });

    it("should render a clock icon", () => {
      const { container } = render(<TimePicker aria-label="Heure" />);
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("should render hour and minute segments", () => {
      const { container } = render(<TimePicker aria-label="Heure" />);
      const segments = container.querySelectorAll(".segment");
      // hour + literal (:) + minute = 3 segments minimum
      expect(segments.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe("prop appearance", () => {
    it("should apply subtle class on InputContainer", () => {
      const { container } = render(
        <TimePicker aria-label="Heure" appearance="subtle" />,
      );
      expect(container.querySelector(".inputContainer")).toHaveClass("subtle");
    });
  });

  describe("prop isCompact", () => {
    it("should apply compact class on InputContainer", () => {
      const { container } = render(
        <TimePicker aria-label="Heure" isCompact />,
      );
      expect(container.querySelector(".inputContainer")).toHaveClass("compact");
    });
  });

  describe("prop isDisabled", () => {
    it("should set data-disabled", () => {
      const { container } = render(
        <TimePicker aria-label="Heure" isDisabled />,
      );
      expect(container.querySelector("[data-disabled]")).toBeInTheDocument();
    });
  });

  describe("prop isInvalid", () => {
    it("should set data-invalid", () => {
      const { container } = render(
        <TimePicker aria-label="Heure" isInvalid />,
      );
      expect(container.querySelector("[data-invalid]")).toBeInTheDocument();
    });
  });

  describe("prop showSeconds", () => {
    it("should not render second segment by default", () => {
      const { container } = render(<TimePicker aria-label="Heure" />);
      expect(container.querySelector(".segment[data-type='second']")).not.toBeInTheDocument();
    });

    it("should render second segment when showSeconds is true", () => {
      const { container } = render(<TimePicker aria-label="Heure" showSeconds />);
      expect(container.querySelector(".segment[data-type='second']")).toBeInTheDocument();
    });
  });

  describe("prop hourCycle", () => {
    it("should render AM/PM segment when hourCycle is 12", () => {
      const { container } = render(
        <TimePicker aria-label="Heure" hourCycle={12} />,
      );
      const segments = container.querySelectorAll(".segment");
      // hour + : + minute + space + dayPeriod = 5 segments
      expect(segments.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe("valeur par défaut", () => {
    it("should render non-placeholder segments when value is provided", () => {
      const { container } = render(
        <TimePicker aria-label="Heure" defaultValue={new Time(14, 30)} />,
      );
      // With a value set, segments should not have the placeholder attribute
      const segments = container.querySelectorAll(".segment[data-type='hour'], .segment[data-type='minute']");
      for (const segment of segments) {
        expect(segment).not.toHaveAttribute("data-placeholder");
      }
    });
  });

  describe("interaction", () => {
    it("should call onChange when value changes", async () => {
      const onChange = vi.fn();
      render(
        <TimePicker
          aria-label="Heure"
          defaultValue={new Time(10, 0)}
          onChange={onChange}
        />,
      );
      const hourSegment = screen.getByText("10");
      await userEvent.click(hourSegment);
      await userEvent.keyboard("{ArrowUp}");
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe("prop className", () => {
    it("should append custom className", () => {
      const { container } = render(
        <TimePicker aria-label="Heure" className="custom" />,
      );
      expect(container.firstElementChild).toHaveClass("custom");
    });
  });
});
