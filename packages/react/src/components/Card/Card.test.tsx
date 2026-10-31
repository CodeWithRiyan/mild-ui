import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
} from "./Card";

describe("Card", () => {
  it("renders a default card with its parts", () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <Card ref={ref}>
        <CardMedia src="cover.png" alt="" />
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardBody>Body</CardBody>
        <CardFooter align="between">Footer</CardFooter>
      </Card>,
    );
    const card = container.firstElementChild as HTMLElement;
    expect(ref.current).toBe(card);
    expect(card).toHaveClass("mild-card", "mild-card--default");
    expect(container.querySelector(".mild-card-media")).toHaveClass(
      "mild-card-media--rounded-top",
      "mild-card-media--cover",
    );
    expect(screen.getByRole("heading", { level: 3, name: "Title" })).toHaveClass("mild-card-title");
    expect(screen.getByText("Description")).toHaveClass("mild-card-description");
    expect(screen.getByText("Body")).toHaveClass("mild-card-content");
    expect(screen.getByText("Footer")).toHaveClass("mild-card-footer", "mild-card-footer--between");
    // md padding is the stylesheet default: no modifier emitted.
    expect(container.querySelector("[class*='--padding-']")).toBeNull();
  });

  it("hands its padding to the parts, which can override it", () => {
    render(
      <Card padding="lg">
        <CardHeader>Header</CardHeader>
        <CardBody padding="none">Body</CardBody>
        <CardFooter noBorder>Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByText("Header")).toHaveClass("mild-card-header--padding-lg");
    expect(screen.getByText("Body")).toHaveClass("mild-card-content--padding-none");
    expect(screen.getByText("Footer")).toHaveClass(
      "mild-card-footer--padding-lg",
      "mild-card-footer--no-border",
    );
  });

  it("renders the element given with `as`, variants and states", () => {
    const { container } = render(
      <Card as="article" variant="elevated" interactive disabled aria-label="Post">
        <CardTitle as="h2" size="lg">
          Post
        </CardTitle>
      </Card>,
    );
    const card = screen.getByRole("article", { name: "Post" });
    expect(card).toHaveClass(
      "mild-card--elevated",
      "mild-card--interactive",
      "mild-card--disabled",
    );
    expect(card).toHaveAttribute("data-disabled");
    expect(container.querySelector("h2.mild-card-title")).toHaveClass("mild-card-title--lg");
  });
});
