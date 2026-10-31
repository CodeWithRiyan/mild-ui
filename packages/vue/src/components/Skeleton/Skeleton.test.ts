import { h } from "vue";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { skeletonCases } from "@mild-ui/test-cases/skeleton";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Skeleton, SkeletonText } from "./index";

runComponentCases(skeletonCases, (c) => h(Skeleton, caseProps(c)));

describe("Skeleton", () => {
  it("renders a hidden placeholder with token dimensions", () => {
    const { container } = render(h(Skeleton, { width: "1/2", height: "8" }));
    const skeleton = container.firstElementChild as HTMLElement;
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
    expect(skeleton).toHaveAttribute("data-loading", "");
    expect(skeleton.style.width).toBe("var(--mild-dimension-1-2, 50%)");
    expect(skeleton.style.height).toBe("var(--mild-space-8, 2rem)");
  });

  it("renders the children instead once loaded", async () => {
    const { container, rerender } = render(h(Skeleton, {}, () => h("p", "Real content")));
    expect(container.querySelector(".mild-skeleton")).toBeInTheDocument();
    await rerender({ loaded: true });
    expect(container.querySelector(".mild-skeleton")).toBeNull();
    expect(screen.getByText("Real content")).toBeInTheDocument();
  });
});

describe("SkeletonText", () => {
  it("renders the number of text lines asked for", () => {
    const { container } = render(h(SkeletonText, { lines: 4, animation: "wave", width: "3/4" }));
    const lines = container.querySelectorAll(".mild-skeleton--text");
    expect(lines).toHaveLength(4);
    expect(lines[0]).toHaveClass("mild-skeleton--wave");
    expect(container.firstElementChild).toHaveClass("mild-skeleton-text");
  });

  it("renders the children once loaded", () => {
    const { container } = render(h(SkeletonText, { loaded: true }, () => h("p", "Paragraph")));
    expect(container.querySelector(".mild-skeleton-text")).toBeNull();
    expect(screen.getByText("Paragraph")).toBeInTheDocument();
  });
});

itHasNoSeriousAxeViolations("Skeleton", () =>
  h("div", { "aria-busy": "true" }, [
    h(Skeleton, { variant: "circle", width: "12", height: "12" }),
    h(SkeletonText),
    h(Skeleton, { loaded: true }, () => h("p", "Loaded")),
  ]),
);
