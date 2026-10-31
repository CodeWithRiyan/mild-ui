# @mild-ui/test-cases

Private, shared, framework-agnostic test cases for the mild-ui components.

Each component has one case module under `src/cases/<component>.cases.ts`
describing prop combinations and the DOM output they must produce
(classes, attributes, text, ARIA roles). Framework packages render the
component with `case.props` and assert `case.expected` / `case.parts`.

## Consuming (react example)

```ts
import { buttonCases } from "@mild-ui/test-cases/button";
```

Import the per-component subpath (not the index) in component tests:
vitest then tracks the dependency per file, so editing `button.cases.ts`
in watch mode re-runs only the tests that use the Button cases.

## Why

Keeping the expectations in one place lets the react and vue packages prove
they render identical DOM for the same props while the components are being
stabilized.
