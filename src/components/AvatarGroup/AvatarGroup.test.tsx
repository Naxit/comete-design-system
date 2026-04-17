// Tests unitaires du composant AvatarGroup
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AvatarGroup } from "./AvatarGroup";

const ITEMS = [
  { key: "a", initials: "AB" },
  { key: "b", initials: "CD" },
  { key: "c", initials: "EF" },
];

describe("AvatarGroup", () => {
  describe("rendu de base", () => {
    it("should render all items", () => {
      const { container } = render(<AvatarGroup items={ITEMS} />);
      expect(container.querySelectorAll(".item")).toHaveLength(3);
    });

    it("should have displayName set to AvatarGroup", () => {
      expect(AvatarGroup.displayName).toBe("AvatarGroup");
    });

    it("should render with role group", () => {
      render(<AvatarGroup items={ITEMS} />);
      expect(screen.getByRole("group")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(<AvatarGroup items={ITEMS} className="custom" />);
      expect(container.firstElementChild).toHaveClass("group", "custom");
    });
  });

  describe("overflow", () => {
    it("should render overflow indicator when overflow > 0", () => {
      const { container } = render(<AvatarGroup items={ITEMS} overflow={5} />);
      expect(container.querySelector(".overflow")).toBeInTheDocument();
    });

    it("should not render overflow indicator when overflow is 0", () => {
      const { container } = render(<AvatarGroup items={ITEMS} overflow={0} />);
      expect(container.querySelector(".overflow")).not.toBeInTheDocument();
    });

    it("should not render overflow indicator when overflow is omitted", () => {
      const { container } = render(<AvatarGroup items={ITEMS} />);
      expect(container.querySelector(".overflow")).not.toBeInTheDocument();
    });
  });

  describe("interactivité", () => {
    it("should call onItemPress with item and index when an avatar is clicked", async () => {
      const handlePress = vi.fn();
      render(<AvatarGroup items={ITEMS} onItemPress={handlePress} />);
      const buttons = screen.getAllByRole("button");
      await userEvent.click(buttons[1]!);
      expect(handlePress).toHaveBeenCalledWith(ITEMS[1], 1);
    });

    it("should call onOverflowPress when overflow avatar is clicked", async () => {
      const handleOverflow = vi.fn();
      render(<AvatarGroup items={ITEMS} overflow={2} onOverflowPress={handleOverflow} />);
      const buttons = screen.getAllByRole("button");
      // Overflow is the last button
      await userEvent.click(buttons[buttons.length - 1]!);
      expect(handleOverflow).toHaveBeenCalledOnce();
    });

    it("should render avatars as display-only when no onItemPress", () => {
      render(<AvatarGroup items={ITEMS} />);
      expect(screen.queryAllByRole("button")).toHaveLength(0);
    });
  });

  describe("stacking", () => {
    it("should apply negative margin to non-first items", () => {
      const { container } = render(<AvatarGroup items={ITEMS} size="medium" />);
      const items = container.querySelectorAll(".item");
      expect(items[0]).toHaveStyle({ marginLeft: "0" });
      expect(items[1]).toHaveStyle({ marginLeft: "-8px" });
    });

    it("should apply descending z-index to items", () => {
      const { container } = render(<AvatarGroup items={ITEMS} />);
      const items = container.querySelectorAll<HTMLElement>(".item");
      const z0 = Number(items[0]?.style.zIndex);
      const z1 = Number(items[1]?.style.zIndex);
      const z2 = Number(items[2]?.style.zIndex);
      expect(z0).toBeGreaterThan(z1);
      expect(z1).toBeGreaterThan(z2);
    });
  });
});
