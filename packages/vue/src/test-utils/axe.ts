// packages/vue/src/test-utils/axe.ts
// Accessibility gate shared by every component test: the rendered markup must have no serious
// or critical axe-core violation, under both the light and the dark theme.
//
// jsdom has no layout engine, so rules that need computed geometry or colours (color-contrast)
// report "incomplete" rather than a violation here; structural rules (roles, names, ARIA
// attribute validity, required children, labels) are what this checks. The Storybook a11y
// addon covers the visual rules in a real browser.
import axe, { type Result } from "axe-core";
import { nextTick, type VNode } from "vue";
import { render } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { RESOLVED_ATTRIBUTE } from "../providers/color-mode";
import { asComponent } from "./render";

const THEMES = ["light", "dark"] as const;
const FAILING_IMPACTS = new Set(["serious", "critical"]);

function describeViolation(violation: Result): string {
  const targets = violation.nodes.map((node) => node.target.join(" ")).join(", ");
  return `[${violation.impact}] ${violation.id}: ${violation.help} (${targets})`;
}

/** Runs axe on `element` and returns the serious/critical violations, formatted. */
export async function seriousAxeViolations(element: Element): Promise<string[]> {
  const results = await axe.run(element, {
    // jsdom cannot message into frames; an embedded map's iframe is checked as an element
    // (title, role) but not descended into.
    iframes: false,
    // These are page-level rules; a component renders a fragment of a page.
    rules: {
      region: { enabled: false },
      "page-has-heading-one": { enabled: false },
      // Needs real computed colours and pseudo-elements; jsdom has neither (it logs "Not
      // implemented: getComputedStyle(elt, pseudoElt)"). Storybook's a11y addon runs it.
      "color-contrast": { enabled: false },
    },
  });
  return results.violations
    .filter((violation) => FAILING_IMPACTS.has(violation.impact ?? ""))
    .map(describeViolation);
}

/**
 * Registers one `it` per theme asserting the rendered markup is free of serious and critical
 * axe violations. `create` returns what to render; it is mounted
 * inside `<html data-theme="light|dark">`, as <ThemeProvider> would set it.
 */
export function itHasNoSeriousAxeViolations(name: string, create: () => VNode): void {
  describe(`${name} accessibility (axe-core)`, () => {
    it.each(THEMES)("has no serious or critical violation in the %s theme", async (theme) => {
      const root = document.documentElement;
      root.setAttribute(RESOLVED_ATTRIBUTE, theme);
      root.style.colorScheme = theme;
      try {
        const { container } = render(asComponent(create));
        await nextTick();
        expect(await seriousAxeViolations(container)).toEqual([]);
      } finally {
        root.removeAttribute(RESOLVED_ATTRIBUTE);
        root.style.colorScheme = "";
      }
    });
  });
}
