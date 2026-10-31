# @mild-ui/primitives

Accessible UI primitives for [mild-ui](https://github.com/CodeWithRiyan/mild-ui), as plain DOM behaviour. No framework, no runtime dependencies: each primitive takes elements you already rendered, wires up the ARIA attributes and keyboard handling, and hands back a small imperative API.

```bash
npm install @mild-ui/primitives
```

## Primitives

| Import                             | Factory             | WAI-ARIA Authoring Practices pattern                                                                                                                |
| ---------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@mild-ui/primitives/checkbox`     | `createCheckbox`    | [Checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/) (incl. mixed state)                                                                  |
| `@mild-ui/primitives/radio-group`  | `createRadioGroup`  | [Radio group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) (roving tabindex)                                                                    |
| `@mild-ui/primitives/switch`       | `createSwitch`      | [Switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)                                                                                          |
| `@mild-ui/primitives/listbox`      | `createListbox`     | [Listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) (typeahead)                                                                            |
| `@mild-ui/primitives/toggle-group` | `createToggleGroup` | [Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/) (`aria-pressed`) + [Toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) keyboard |
| `@mild-ui/primitives/tabs`         | `createTabs`        | [Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) (automatic / manual activation)                                                              |
| `@mild-ui/primitives/accordion`    | `createAccordion`   | [Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)                                                                                    |
| `@mild-ui/primitives/dialog`       | `createDialog`      | [Dialog (modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/): focus trap, Escape, return focus, scroll lock, nesting                    |
| `@mild-ui/primitives/tooltip`      | `createTooltip`     | [Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)                                                                                        |
| `@mild-ui/primitives/toast`        | `createToastTimer`  | [Alert](https://www.w3.org/WAI/ARIA/apg/patterns/alert/): auto-dismiss that pauses on hover and focus                                               |
| `@mild-ui/primitives/field`        | `createField`       | [Names and descriptions](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/)                                                         |

Every primitive links its pattern in a doc comment at the top of its source file.

## One import pulls in one primitive

There is no barrel entry and the primitives never import each other or a shared helper, so importing one costs you exactly one module:

```js
import { createCheckbox } from "@mild-ui/primitives/checkbox";
```

`src/isolation.test.ts` enforces this: it bundles each entry with esbuild and asserts the reported module graph (`metafile.inputs`) is exactly that one file, and that the emitted code contains no `import` or `require`. The build is `tsc` with no bundling, so `dist/` keeps the same one-file-per-primitive shape.

## Usage

Each factory takes the element(s) to drive and returns a controller. Nothing renders DOM for you.

```js
import { createCheckbox } from "@mild-ui/primitives/checkbox";

const checkbox = createCheckbox({
  element: document.querySelector("#terms"),
  checked: "mixed", // true | false | "mixed"
  onChange: (checked) => console.log(checked),
});

checkbox.getChecked(); // "mixed"
checkbox.toggle(); // mixed -> true, per the APG tri-state example
checkbox.setChecked(false); // updates the DOM, does not call onChange
checkbox.destroy(); // removes listeners
```

Callbacks fire for user interaction only. The `set*` methods are for syncing state you own, so they never call back into you.

Radios and options are found in the DOM by role (`[role="radio"]`, `[role="option"]`), and their value comes from `data-value`, falling back to text content:

```js
import { createListbox } from "@mild-ui/primitives/listbox";

const listbox = createListbox({
  element: document.querySelector("#fruit"),
  onChange: (value) => console.log(value),
  onEscape: () => close(),
});
```

`createField` wires a control to its label, description and error message, and keeps the error out of `aria-describedby` until the field is actually invalid:

```js
import { createField } from "@mild-ui/primitives/field";

const field = createField({ control, label, description, error, id: "email" });
field.ids; // { control: "email", label: "email-label", ... }
field.setInvalid(true); // aria-invalid="true", error id appended to aria-describedby
```

## Tests

```bash
pnpm --filter @mild-ui/primitives test            # vitest + jsdom
pnpm --filter @mild-ui/primitives test:coverage   # same, with the coverage gate
```

Tests run in vitest against jsdom and never import a framework or a testing library; they build DOM with `document.createElement` and drive it with real `KeyboardEvent`/`MouseEvent` dispatches. Coverage is enforced **per file** (`thresholds.perFile`) at 90% lines, branches, functions and statements, so a thoroughly tested primitive cannot cover for a thin one.

## License

MIT
