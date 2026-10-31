import { h } from "vue";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { statCases } from "@mild-ui/test-cases/stat";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Stat, StatGroup } from "./index";

runComponentCases(statCases, (c) => h(Stat, caseProps(c)));

describe("Stat", () => {
  it("renders the label and value without a help line", () => {
    const { container } = render(h(Stat, { label: "Revenue", value: 12400 }));
    expect(container.querySelector(".mild-stat__label")).toHaveTextContent("Revenue");
    expect(container.querySelector(".mild-stat__value")).toHaveTextContent("12400");
    expect(container.querySelector(".mild-stat__help")).toBeNull();
  });

  it("announces the trend in words with a decorative arrow", () => {
    const { container } = render(
      h(Stat, {
        label: "Users",
        value: "1,204",
        trend: "decrease",
        trendValue: "3%",
        helpText: "vs last week",
      }),
    );
    const trend = container.querySelector(".mild-stat__trend")!;
    expect(trend).toHaveClass("mild-stat__trend--decrease");
    expect(trend.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(trend).toHaveTextContent("decreased by 3%");
    expect(container.querySelector(".mild-stat__help")).toHaveTextContent("vs last week");
  });

  it("takes rich slots and extra content", () => {
    const { container } = render(
      h(
        Stat,
        { trend: "increase" },
        {
          label: () => h("em", "Label"),
          value: () => h("strong", "42"),
          trendValue: () => h("b", "5%"),
          helpText: () => h("i", "help"),
          default: () => h("p", { "data-testid": "extra" }, "extra"),
        },
      ),
    );
    expect(container.querySelector(".mild-stat__label em")).toHaveTextContent("Label");
    expect(container.querySelector(".mild-stat__value strong")).toHaveTextContent("42");
    expect(container.querySelector(".mild-stat__trend")).toHaveTextContent("increased by 5%");
    expect(container.querySelector(".mild-stat__help i")).toHaveTextContent("help");
    expect(screen.getByTestId("extra")).toBeInTheDocument();
  });
});

describe("StatGroup", () => {
  it("lays stats out in a row", () => {
    const { container } = render(
      asComponent(() =>
        h(StatGroup, () => [h(Stat, { label: "A", value: 1 }), h(Stat, { label: "B", value: 2 })]),
      ),
    );
    expect(container.firstElementChild).toHaveClass("mild-stat-group");
    expect(container.querySelectorAll(".mild-stat")).toHaveLength(2);
  });
});

itHasNoSeriousAxeViolations("Stat", () =>
  h(StatGroup, () => [
    h(Stat, { label: "Revenue", value: "$12,400", helpText: "Last 30 days" }),
    h(Stat, { label: "Users", value: "1,204", trend: "increase", trendValue: "12%", size: "lg" }),
  ]),
);
