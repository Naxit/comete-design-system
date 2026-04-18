import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from "./Drawer";
import { DrawerProvider } from "./DrawerContext";

function renderDrawer(props: Partial<React.ComponentProps<typeof Drawer>> = {}) {
  const defaultProps = {
    isOpen: true,
    onOpenChange: vi.fn(),
    "aria-label": "Test drawer",
    ...props,
  };
  return render(
    <DrawerProvider>
      <Drawer {...defaultProps}>
        <p>Drawer content</p>
      </Drawer>
    </DrawerProvider>,
  );
}

describe("Drawer", () => {
  it("should render when isOpen is true", () => {
    renderDrawer();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Drawer content")).toBeInTheDocument();
  });

  it("should not render when isOpen is false", () => {
    renderDrawer({ isOpen: false });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should apply placement class", () => {
    renderDrawer({ placement: "right" });
    const dialog = screen.getByRole("dialog");
    expect(dialog.className).toContain("right");
  });

  it("should apply size preset class", () => {
    renderDrawer({ size: "wide" });
    const dialog = screen.getByRole("dialog");
    expect(dialog.className).toContain("wide");
  });

  it("should apply custom size as inline style", () => {
    renderDrawer({ placement: "right", size: "400px" });
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveStyle({ width: "400px" });
  });

  it("should apply custom size as height for top/bottom placement", () => {
    renderDrawer({ placement: "bottom", size: "60vh" });
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveStyle({ height: "60vh" });
  });

  it("should default to left placement", () => {
    renderDrawer();
    const dialog = screen.getByRole("dialog");
    expect(dialog.className).toContain("left");
  });

  it("should apply custom className", () => {
    renderDrawer({ className: "my-drawer" });
    const dialog = screen.getByRole("dialog");
    expect(dialog.className).toContain("my-drawer");
  });

  it("should call onOpenChange when Escape is pressed", async () => {
    const onOpenChange = vi.fn();
    renderDrawer({ onOpenChange });
    await userEvent.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("should set aria-label on the dialog", () => {
    renderDrawer({ "aria-label": "Navigation drawer" });
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-label", "Navigation drawer");
  });

  it("should render swipe handle when swipeable", () => {
    renderDrawer({ swipeable: true });
    const dialog = screen.getByRole("dialog");
    // The swipe handle is the first child of the dialog
    expect(dialog.firstElementChild?.className).toContain("swipeHandle");
  });

  it("should not render swipe handle when not swipeable", () => {
    renderDrawer({ swipeable: false });
    const dialog = screen.getByRole("dialog");
    expect(dialog.firstElementChild?.className).not.toContain("swipeHandle");
  });
});

describe("DrawerHeader", () => {
  it("should render title as heading", () => {
    render(
      <DrawerProvider>
        <Drawer isOpen onOpenChange={vi.fn()} aria-label="Test">
          <DrawerHeader>Mon titre</DrawerHeader>
        </Drawer>
      </DrawerProvider>,
    );
    expect(screen.getByText("Mon titre")).toBeInTheDocument();
  });

  it("should render close button when onClose is provided", () => {
    const onClose = vi.fn();
    render(
      <DrawerProvider>
        <Drawer isOpen onOpenChange={vi.fn()} aria-label="Test">
          <DrawerHeader onClose={onClose}>Titre</DrawerHeader>
        </Drawer>
      </DrawerProvider>,
    );
    const closeBtn = screen.getByLabelText("Fermer");
    expect(closeBtn).toBeInTheDocument();
  });
});

describe("DrawerBody", () => {
  it("should render children", () => {
    render(
      <DrawerProvider>
        <Drawer isOpen onOpenChange={vi.fn()} aria-label="Test">
          <DrawerBody>Body content</DrawerBody>
        </Drawer>
      </DrawerProvider>,
    );
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });
});

describe("DrawerFooter", () => {
  it("should render children", () => {
    render(
      <DrawerProvider>
        <Drawer isOpen onOpenChange={vi.fn()} aria-label="Test">
          <DrawerFooter>Footer content</DrawerFooter>
        </Drawer>
      </DrawerProvider>,
    );
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });
});
