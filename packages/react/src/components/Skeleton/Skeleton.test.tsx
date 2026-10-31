import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton, SkeletonText } from "./Skeleton";

describe("Skeleton", () => {
  it("renders a hidden placeholder with variant and animation classes", () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(<Skeleton ref={ref} />);
    const skeleton = container.firstElementChild as HTMLElement;
    expect(ref.current).toBe(skeleton);
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
    expect(skeleton).toHaveClass("mild-skeleton", "mild-skeleton--rect", "mild-skeleton--pulse");
    expect(skeleton.getAttribute("style")).toBeNull();
  });

  it("maps dimension tokens and other variants", () => {
    const { container } = render(
      <Skeleton variant="circle" animation="wave" width="12" height="12" />,
    );
    const skeleton = container.firstElementChild as HTMLElement;
    expect(skeleton).toHaveClass("mild-skeleton--circle", "mild-skeleton--wave");
    expect(skeleton.style.width).toBe("var(--mild-space-12, 3rem)");
    expect(skeleton.style.height).toBe("var(--mild-space-12, 3rem)");
  });

  it("renders the children instead once loaded", () => {
    const { container, rerender } = render(
      <Skeleton>
        <p>Real content</p>
      </Skeleton>,
    );
    expect(container.querySelector(".mild-skeleton")).toBeInTheDocument();
    rerender(
      <Skeleton loaded>
        <p>Real content</p>
      </Skeleton>,
    );
    expect(container.querySelector(".mild-skeleton")).toBeNull();
    expect(screen.getByText("Real content")).toBeInTheDocument();
  });

  it("SkeletonText renders a stack of text lines", () => {
    const { container, rerender } = render(<SkeletonText lines={4} animation="none" />);
    const stack = container.firstElementChild as HTMLElement;
    expect(stack).toHaveClass("mild-skeleton-text");
    expect(stack).toHaveAttribute("aria-hidden", "true");
    expect(stack.querySelectorAll(".mild-skeleton--text.mild-skeleton--none")).toHaveLength(4);
    rerender(<SkeletonText loaded>done</SkeletonText>);
    expect(container.querySelector(".mild-skeleton-text")).toBeNull();
    expect(screen.getByText("done")).toBeInTheDocument();
  });
});
