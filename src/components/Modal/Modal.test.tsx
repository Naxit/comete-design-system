import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";

describe("Modal", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it("renders when open is true", () => {
    render(
      <Modal open={true} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    render(
      <Modal open={false} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
  });

  it("calls onClose when clicking backdrop", async () => {
    const user = userEvent.setup();
    render(
      <Modal open={true} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    );

    const backdrop = document.querySelector(".MuiBackdrop-root");
    if (backdrop) {
      await user.click(backdrop);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });

  it("renders children correctly", () => {
    render(
      <Modal open={true} onClose={mockOnClose}>
        <div data-testid="custom-content">
          <h1>Title</h1>
          <p>Description</p>
        </div>
      </Modal>
    );

    const content = screen.getByTestId("custom-content");
    expect(content).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("applies maxWidth prop correctly", () => {
    const { container } = render(
      <Modal open={true} onClose={mockOnClose} maxWidth="lg">
        <div>Content</div>
      </Modal>
    );

    const modalBox = container.querySelector('[role="presentation"] > div');
    expect(modalBox).toHaveStyle({ maxWidth: "1200px" });
  });
});
