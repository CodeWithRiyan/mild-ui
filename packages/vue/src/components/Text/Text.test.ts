import { h } from "vue";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { textCases } from "@mild-ui/test-cases/text";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Text } from "./index";

runComponentCases(textCases, (c) => h(Text, caseProps(c), () => c.children));

describe("Text", () => {
  it("renders a span with the default typography classes and no inline style", () => {
    const { container } = render(h(Text, () => "Hello"));
    const text = container.firstElementChild as HTMLElement;
    expect(text.tagName).toBe("SPAN");
    expect(text).toHaveClass("mild-text", "mild-text--md", "mild-text--normal", "mild-text--left");
    expect(text).not.toHaveClass("mild-text--none");
    expect(text).not.toHaveAttribute("style");
  });

  it("renders the element given with `as` and forwards attributes", () => {
    render(h(Text, { as: "p", id: "intro", class: "extra" }, () => "Intro"));
    const paragraph = screen.getByText("Intro");
    expect(paragraph.tagName).toBe("P");
    expect(paragraph).toHaveAttribute("id", "intro");
    expect(paragraph).toHaveClass("mild-text", "extra");
  });

  it("maps every typography prop onto a modifier class", () => {
    const { container } = render(
      h(
        Text,
        {
          fontSize: "2xl",
          fontWeight: "bold",
          textAlign: "center",
          textTransform: "uppercase",
          textDecoration: "underline",
          color: "danger",
          truncate: true,
          noOfLines: 3,
        },
        () => "Styled",
      ),
    );
    expect(container.firstElementChild).toHaveClass(
      "mild-text--2xl",
      "mild-text--bold",
      "mild-text--center",
      "mild-text--uppercase",
      "mild-text--underline",
      "mild-text--danger",
      "mild-text--truncate",
      "mild-text--clamp-3",
    );
  });

  it("writes line height and letter spacing inline, numbers in em", () => {
    const { container } = render(h(Text, { lineHeight: 1.2, letterSpacing: 0.05 }, () => "Spaced"));
    const text = container.firstElementChild as HTMLElement;
    expect(text.style.lineHeight).toBe("1.2");
    expect(text.style.letterSpacing).toBe("0.05em");

    const { container: strings } = render(
      h(Text, { lineHeight: "2rem", letterSpacing: "1px" }, () => "Spaced"),
    );
    expect((strings.firstElementChild as HTMLElement).style.lineHeight).toBe("2rem");
    expect((strings.firstElementChild as HTMLElement).style.letterSpacing).toBe("1px");
  });
});

itHasNoSeriousAxeViolations("Text", () =>
  h("div", [
    h(Text, () => "Body"),
    h(Text, { as: "h2", fontSize: "3xl", fontWeight: "semibold" }, () => "Heading"),
    h(Text, { as: "p", color: "muted", truncate: true }, () => "Muted paragraph"),
  ]),
);
