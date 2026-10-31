import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Tag, TagCloseButton } from "./Tag";

describe("Tag", () => {
  it("renders a label with an optional icon", () => {
    const ref = React.createRef<HTMLSpanElement>();
    const { container } = render(
      <Tag ref={ref} icon={<svg data-testid="glyph" />}>
        Design
      </Tag>,
    );
    const tag = container.firstElementChild as HTMLElement;
    expect(ref.current).toBe(tag);
    expect(tag).toHaveClass("mild-tag", "mild-tag--subtle", "mild-tag--gray", "mild-tag--md");
    expect(tag.querySelector(".mild-tag__label")).toHaveTextContent("Design");
    expect(screen.getByTestId("glyph").closest(".mild-tag__icon")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("renders a keyboard-reachable close button named after the tag when onClose is given", () => {
    const onClose = vi.fn();
    render(<Tag onClose={onClose}>Design</Tag>);
    const close = screen.getByRole("button", { name: "Remove Design" });
    expect(close.tagName).toBe("BUTTON");
    expect(close).toHaveClass("mild-tag__close");
    fireEvent.click(close);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("disables the close button along with the tag", () => {
    const onClose = vi.fn();
    render(
      <Tag onClose={onClose} disabled closeLabel="Delete">
        Design
      </Tag>,
    );
    const close = screen.getByRole("button", { name: "Delete Design" });
    expect(close).toBeDisabled();
    expect(close.closest(".mild-tag")).toHaveClass("mild-tag--disabled");
  });

  it("maps variant, color, size and pill; TagCloseButton composes", () => {
    const onClick = vi.fn();
    const { container } = render(
      <Tag variant="outline" colorScheme="danger" size="sm" pill>
        Urgent
        <TagCloseButton onClick={onClick} icon={<span data-testid="x" />} />
      </Tag>,
    );
    expect(container.firstElementChild).toHaveClass(
      "mild-tag--outline",
      "mild-tag--danger",
      "mild-tag--sm",
      "mild-tag--pill",
    );
    const close = screen.getByRole("button", { name: "Remove" });
    expect(screen.getByTestId("x")).toBeInTheDocument();
    fireEvent.click(close);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
