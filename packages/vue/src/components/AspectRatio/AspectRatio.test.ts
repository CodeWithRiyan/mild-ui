import { h } from "vue";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { aspectRatioCases } from "@mild-ui/test-cases/aspect-ratio";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { AspectRatio, toCssAspectRatio } from "./index";

runComponentCases(aspectRatioCases, (c) => h(AspectRatio, caseProps(c), () => c.children));

describe("AspectRatio", () => {
  it("renders a square div by default", () => {
    const { container } = render(
      h(AspectRatio, () => h("img", { alt: "Cover", src: "cover.png" })),
    );
    const box = container.firstElementChild as HTMLElement;
    expect(box.tagName).toBe("DIV");
    expect(box).toHaveClass("mild-aspect-ratio");
    expect(box.style.getPropertyValue("--mild-aspect-ratio")).toBe("1");
    expect(screen.getByRole("img", { name: "Cover" }).parentElement).toBe(box);
  });

  it("renders the element given with `as` and forwards its attributes", () => {
    render(h(AspectRatio, { as: "figure", ratio: 16 / 9, "aria-label": "Video" }));
    const figure = screen.getByRole("figure", { name: "Video" });
    expect(figure.tagName).toBe("FIGURE");
  });

  it("accepts a numeric or a string ratio", async () => {
    const { container, rerender } = render(h(AspectRatio, { ratio: 16 / 9 }));
    const box = container.firstElementChild as HTMLElement;
    expect(box.style.getPropertyValue("--mild-aspect-ratio")).toBe(String(16 / 9));

    await rerender({ ratio: "4/3" });
    expect(box.style.getPropertyValue("--mild-aspect-ratio")).toBe("4 / 3");
  });

  it("merges a caller-provided style and class", () => {
    const { container } = render(
      h(AspectRatio, { ratio: 2, style: { maxWidth: "20rem" }, class: "thumb" }),
    );
    const box = container.firstElementChild as HTMLElement;
    expect(box.style.getPropertyValue("--mild-aspect-ratio")).toBe("2");
    expect(box.style.maxWidth).toBe("20rem");
    expect(box).toHaveClass("mild-aspect-ratio", "thumb");
  });

  it("toCssAspectRatio formats both input forms", () => {
    expect(toCssAspectRatio(1.5)).toBe("1.5");
    expect(toCssAspectRatio("21/9")).toBe("21 / 9");
    expect(toCssAspectRatio(" 16 /9 " as "16/9")).toBe("16 / 9");
  });
});

itHasNoSeriousAxeViolations("AspectRatio", () =>
  h("div", [
    h(AspectRatio, { ratio: 16 / 9 }, () => h("img", { alt: "Cover", src: "cover.png" })),
    h(AspectRatio, { as: "figure", ratio: "4/3", "aria-label": "Frame" }, () => h("div", "box")),
  ]),
);
