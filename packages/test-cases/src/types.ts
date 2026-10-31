// packages/test-cases/src/types.ts
// Framework-agnostic description of a rendered-component expectation.
// The framework packages (react today, vue later) provide a tiny runner that
// renders the component with `props` and asserts `expected` against the DOM.

/** How the runner locates a DOM element. */
export interface CaseQuery {
  /** ARIA role, e.g. "button", "switch", "radiogroup". */
  role?: string;
  /** Accessible name used together with `role`. */
  name?: string;
  /** CSS selector fallback for elements without a useful role. */
  selector?: string;
}

/** Assertions against a single located element. */
export interface CaseExpectation {
  /** Class names that must be present. */
  classes?: string[];
  /** Class names that must NOT be present. */
  absentClasses?: string[];
  /** Attributes with their exact expected values. */
  attributes?: Record<string, string>;
  /** Attributes that must NOT be present. */
  absentAttributes?: string[];
  /** Exact text content (`textContent`-based, testing-library semantics). */
  text?: string;
}

/** Extra element to check inside the same render (e.g. a radio item, a toggle button). */
export interface CasePart extends CaseExpectation {
  query: CaseQuery;
}

/** One prop combination for one component. */
export interface RenderCase {
  /** Unique, human-readable case id; used as the test name. */
  name: string;
  /** Props passed straight to the component. */
  props: Record<string, unknown>;
  /** Child text, for components that render children. */
  children?: string;
  /** How to find the main element (defaults to the container's first element). */
  query?: CaseQuery;
  /** Assertions on the main element. */
  expected?: CaseExpectation;
  /** Additional elements to assert within the same render. */
  parts?: CasePart[];
}

/** All shared cases for one component. */
export interface ComponentCases {
  /** Component export name, e.g. "Button". */
  component: string;
  cases: RenderCase[];
}
