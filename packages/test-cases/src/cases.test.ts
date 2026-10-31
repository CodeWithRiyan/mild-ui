// packages/test-cases/src/cases.test.ts
// Sanity checks on the shared case catalogue itself: every component ships
// cases, case names are unique, and every case can actually be asserted.
import { describe, expect, it } from "vitest";
import type { ComponentCases, RenderCase } from "./types";
import * as catalogue from "./index";

const ALL_CASES = Object.entries(catalogue).filter(
  (entry): entry is [string, ComponentCases] =>
    typeof entry[1] === "object" && entry[1] !== null && "cases" in entry[1],
);

const EXPECTED_COMPONENTS = [
  "Accordion",
  "Alert",
  "AlertDialog",
  "AspectRatio",
  "Avatar",
  "AvatarGroup",
  "Badge",
  "Box",
  "Breadcrumb",
  "Button",
  "ButtonGroup",
  "Card",
  "Checkbox",
  "CircularProgress",
  "CloseButton",
  "Code",
  "Collapsible",
  "Container",
  "DataTable",
  "Dialog",
  "Divider",
  "Flex",
  "Form",
  "Grid",
  "Heading",
  "IconButton",
  "Image",
  "Input",
  "InputGroup",
  "InputPassword",
  "Kbd",
  "Label",
  "Link",
  "List",
  "Map",
  "Progress",
  "Radio",
  "ScrollArea",
  "SegmentedControl",
  "Select",
  "Skeleton",
  "Spinner",
  "Stack",
  "Stat",
  "Switch",
  "Table",
  "Tabs",
  "Tag",
  "Text",
  "Textarea",
  "Toast",
  "Toggle",
  "ToggleGroup",
  "Tooltip",
];

function hasAnyAssertion(c: RenderCase): boolean {
  const e = c.expected;
  const mainHasAssertion =
    !!e &&
    Boolean(
      e.classes?.length ||
      e.absentClasses?.length ||
      e.attributes ||
      e.absentAttributes?.length ||
      e.text !== undefined,
    );
  return mainHasAssertion || Boolean(c.parts?.length) || Boolean(c.query);
}

describe("shared case catalogue", () => {
  it(`covers all ${EXPECTED_COMPONENTS.length} components`, () => {
    const components = ALL_CASES.map(([, c]) => c.component).sort();
    expect(components).toEqual(EXPECTED_COMPONENTS);
  });

  describe.each(ALL_CASES)("%s", (_exportName, componentCases) => {
    it("has at least one case", () => {
      expect(componentCases.cases.length).toBeGreaterThan(0);
    });

    it("has unique case names", () => {
      const names = componentCases.cases.map((c) => c.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it("every case asserts something", () => {
      for (const c of componentCases.cases) {
        expect(hasAnyAssertion(c), `case "${c.name}" asserts nothing`).toBe(true);
      }
    });
  });
});
