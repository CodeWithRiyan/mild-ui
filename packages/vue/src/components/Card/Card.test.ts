import { h } from "vue";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { cardCases } from "@mild-ui/test-cases/card";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
} from "./index";

runComponentCases(cardCases, (c) =>
  h(Card, caseProps(c), () => [
    h(CardHeader, () => [
      h(CardTitle, () => "Card title"),
      h(CardDescription, () => "Card description"),
    ]),
    h(CardBody, () => "Card body"),
    h(CardFooter, () => "Card footer"),
  ]),
);

describe("Card", () => {
  it("hands its padding to the parts, which can override it", () => {
    const { container } = render(
      asComponent(() =>
        h(Card, { padding: "sm" }, () => [
          h(CardHeader, { noBorder: true }, () => "H"),
          h(CardBody, { padding: "lg" }, () => "B"),
          h(CardFooter, { padding: "none", align: "between", noBorder: true }, () => "F"),
        ]),
      ),
    );
    expect(container.querySelector(".mild-card-header")).toHaveClass(
      "mild-card-header--padding-sm",
      "mild-card-header--no-border",
    );
    expect(container.querySelector(".mild-card-content")).toHaveClass(
      "mild-card-content--padding-lg",
    );
    expect(container.querySelector(".mild-card-footer")).toHaveClass(
      "mild-card-footer--padding-none",
      "mild-card-footer--between",
      "mild-card-footer--no-border",
    );
  });

  it("adds no padding modifier for the md default, outside a card too", () => {
    const { container } = render(
      asComponent(() => [h(CardBody, () => "B"), h(Card, () => h(CardHeader, () => "H"))]),
    );
    expect(container.querySelector(".mild-card-content")!.className).toBe("mild-card-content");
    expect(container.querySelector(".mild-card-header")!.className).toBe("mild-card-header");
  });

  it("renders the title at another level and size, and a media image", () => {
    const { container } = render(
      asComponent(() =>
        h(Card, () => [
          h(CardMedia, { src: "cover.jpg", alt: "Cover", position: "bottom", fit: "contain" }),
          h(CardTitle, { as: "h2", size: "lg" }, () => "Title"),
        ]),
      ),
    );
    const title = screen.getByRole("heading", { level: 2, name: "Title" });
    expect(title).toHaveClass("mild-card-title", "mild-card-title--lg");
    const media = screen.getByRole("img", { name: "Cover" });
    expect(media).toHaveClass(
      "mild-card-media",
      "mild-card-media--rounded-bottom",
      "mild-card-media--contain",
    );
    expect(container.querySelector(".mild-card")).toHaveClass("mild-card--default");
  });
});

itHasNoSeriousAxeViolations("Card", () =>
  h("div", [
    h(Card, () => [
      h(CardMedia, { src: "cover.jpg", alt: "" }),
      h(CardHeader, () => [h(CardTitle, () => "Title"), h(CardDescription, () => "Description")]),
      h(CardBody, () => "Body"),
      h(CardFooter, { align: "end" }, () => "Footer"),
    ]),
    h(Card, { as: "article", variant: "elevated", interactive: true, "aria-label": "Post" }, () =>
      h(CardBody, () => "Body"),
    ),
  ]),
);
