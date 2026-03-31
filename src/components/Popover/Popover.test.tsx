// Tests unitaires du composant Popover
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button, DialogTrigger, Dialog } from "react-aria-components";
import { Popover } from "./Popover";

function renderPopover() {
  return render(
    <DialogTrigger>
      <Button>Open</Button>
      <Popover>
        <Dialog aria-label="Test popover">
          <p>Content</p>
        </Dialog>
      </Popover>
    </DialogTrigger>,
  );
}

describe("Popover", () => {
  describe("rendu de base", () => {
    it("should have displayName set to Popover", () => {
      expect(Popover.displayName).toBe("Popover");
    });

    it("should not be visible by default", () => {
      renderPopover();
      expect(screen.queryByText("Content")).not.toBeInTheDocument();
    });
  });

  describe("interaction", () => {
    it("should open on trigger click", async () => {
      renderPopover();
      await userEvent.click(screen.getByRole("button", { name: "Open" }));
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("should close on Escape", async () => {
      renderPopover();
      await userEvent.click(screen.getByRole("button", { name: "Open" }));
      expect(screen.getByText("Content")).toBeInTheDocument();
      await userEvent.keyboard("{Escape}");
      expect(screen.queryByText("Content")).not.toBeInTheDocument();
    });
  });

  describe("prop className", () => {
    it("should append custom className", async () => {
      render(
        <DialogTrigger>
          <Button>Open</Button>
          <Popover className="custom">
            <Dialog aria-label="Test">
              <p>Content</p>
            </Dialog>
          </Popover>
        </DialogTrigger>,
      );
      await userEvent.click(screen.getByRole("button", { name: "Open" }));
      const dialog = screen.getByRole("dialog");
      expect(dialog.closest("[class*='popover']")).toHaveClass("custom");
    });
  });
});
