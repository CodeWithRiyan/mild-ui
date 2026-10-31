// packages/react/src/test-utils/run-cases.tsx
// Runs the shared, framework-agnostic cases from @mild-ui/test-cases against a
// react render. Each component test provides a factory that turns a case into
// an element; everything else (queries + assertions) is generic.
import * as React from "react";
import { render, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { CaseExpectation, CaseQuery, ComponentCases, RenderCase } from "@mild-ui/test-cases";

type ElementFactory = (testCase: RenderCase) => React.ReactElement;

function locate(container: HTMLElement, query: CaseQuery | undefined): HTMLElement {
  if (query?.role) {
    const options = query.name ? { name: query.name } : undefined;
    // Components rendered through a portal (dialogs, toasts) live outside the container.
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

/**
 * Registers one `it` per shared case.
 *
 * ```tsx
 * runComponentCases(buttonCases, (c) => <Button {...c.props}>{c.children}</Button>);
 * ```
 */
export function runComponentCases(
  componentCases: ComponentCases,
  createElement: ElementFactory,
): void {
  describe(`${componentCases.component} (shared cases from @mild-ui/test-cases)`, () => {
    it.each(componentCases.cases)("$name", (testCase) => {
      const { container } = render(createElement(testCase));

      const element = locate(container, testCase.query);
      if (testCase.expected) assertExpectation(element, testCase.expected);

      for (const part of testCase.parts ?? []) {
        const { query, ...expectation } = part;
        assertExpectation(locate(container, query), expectation);
      }
    });
  });
}
