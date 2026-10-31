// packages/vue/src/test-utils/run-cases.ts
// Runs the shared, framework-agnostic cases from @mild-ui/test-cases against a Vue render. Each
// component test provides a factory that turns a case into a vnode; everything else (queries +
// assertions) is generic, and mirrors packages/react/src/test-utils/run-cases.tsx.
import { nextTick, type VNode } from "vue";
import { render, within } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import type { CaseExpectation, CaseQuery, ComponentCases, RenderCase } from "@mild-ui/test-cases";
import { asComponent } from "./render";

type ElementFactory = (testCase: RenderCase) => VNode;

function locate(container: HTMLElement, query: CaseQuery | undefined): HTMLElement {
  if (query?.role) {
    const options = query.name ? { name: query.name } : undefined;
    return (
      within(container).queryByRole(query.role, options) ??
      within(document.body).getByRole(query.role, options)
    );
  }
  if (query?.selector) {
    const found =
      container.querySelector<HTMLElement>(query.selector) ??
      document.body.querySelector<HTMLElement>(query.selector);
    if (!found) throw new Error(`No element matches selector "${query.selector}"`);
    return found;
  }
  const first = container.firstElementChild;
  if (!(first instanceof HTMLElement)) throw new Error("Nothing was rendered");
  return first;
}

function assertExpectation(element: HTMLElement, expected: CaseExpectation): void {
  for (const cls of expected.classes ?? []) {
    expect(element).toHaveClass(cls);
  }
  for (const cls of expected.absentClasses ?? []) {
    expect(element).not.toHaveClass(cls);
  }
  for (const [attribute, value] of Object.entries(expected.attributes ?? {})) {
    expect(element).toHaveAttribute(attribute, value);
  }
  for (const attribute of expected.absentAttributes ?? []) {
    expect(element).not.toHaveAttribute(attribute);
  }
  if (expected.text !== undefined) {
    expect(element).toHaveTextContent(expected.text);
  }
}

/** The shared cases use React prop names; these are the Vue spellings. */
const PROP_ALIASES: Record<string, string> = {
  className: "class",
  htmlFor: "for",
  tabIndex: "tabindex",
};

/** Case props with the React-only names translated (`className` -> `class`, ...). */
export function caseProps<Props extends object = Record<string, unknown>>(
  testCase: RenderCase,
): Props {
  const props: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(testCase.props)) {
    props[PROP_ALIASES[key] ?? key] = value;
  }
  return props as Props;
}

/**
 * Registers one `it` per shared case.
 *
 * ```ts
 * runComponentCases(buttonCases, (c) => h(Button, caseProps(c), () => c.children));
 * ```
 */
export function runComponentCases(
  componentCases: ComponentCases,
  createElement: ElementFactory,
): void {
  describe(`${componentCases.component} (shared cases from @mild-ui/test-cases)`, () => {
    it.each(componentCases.cases)("$name", async (testCase) => {
      const { container: mounted } = render(asComponent(() => createElement(testCase)));
      const container = mounted as HTMLElement;
      // Primitives attach in the post-flush queue; let them settle before asserting.
      await nextTick();

      const element = locate(container, testCase.query);
      if (testCase.expected) assertExpectation(element, testCase.expected);

      for (const part of testCase.parts ?? []) {
        const { query, ...expectation } = part;
        assertExpectation(locate(container, query), expectation);
      }
    });
  });
}
