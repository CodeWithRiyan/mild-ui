import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders a polite status by default with a status icon, title and description", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Alert ref={ref} title="Heads up" description="Something happened." />);
    const alert = screen.getByRole("status");
    expect(ref.current).toBe(alert);
    expect(alert).toHaveClass("mild-alert", "mild-alert--subtle", "mild-alert--info");
    expect(alert.querySelector(".mild-alert__icon svg")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("Heads up")).toHaveClass("mild-alert__title");
    expect(screen.getByText("Something happened.")).toHaveClass("mild-alert__description");
  });

  it("errors and warnings are assertive alerts; role can be overridden", () => {
    const { rerender } = render(<Alert status="error">Failed</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("mild-alert--error");
    rerender(<Alert status="warning">Careful</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("mild-alert--warning");
    rerender(
      <Alert status="error" role="status">
        Quiet failure
      </Alert>,
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders a keyboard-reachable dismiss button when dismissible", () => {
    const onDismiss = vi.fn();
    render(
      <Alert dismissible onDismiss={onDismiss} dismissLabel="Hide">
        Bye
      </Alert>,
    );
    const button = screen.getByRole("button", { name: "Hide" });
    expect(button).toHaveClass("mild-alert__dismiss");
    expect(screen.getByRole("status")).toHaveClass("mild-alert--dismissible");
    fireEvent.click(button);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("accepts a custom icon or none, and maps variant and size", () => {
    const { rerender } = render(
      <Alert variant="solid" size="sm" status="success" icon={<svg data-testid="custom" />}>
        Done
      </Alert>,
    );
    expect(screen.getByRole("status")).toHaveClass("mild-alert--solid", "mild-alert--sm");
    expect(screen.getByTestId("custom")).toBeInTheDocument();
    rerender(<Alert icon={null}>Plain</Alert>);
    expect(document.querySelector(".mild-alert__icon")).toBeNull();
  });
});
