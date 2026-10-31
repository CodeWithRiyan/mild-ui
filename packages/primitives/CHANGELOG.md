# @mild-ui/primitives

## 1.2.0

## 1.1.0

### Minor Changes

- Basic input components: `Textarea`, `IconButton`, `ButtonGroup`, `CloseButton`, `InputGroup` (+ `InputLeftAddon`, `InputRightAddon`, `InputLeftElement`, `InputRightElement`), `SegmentedControl`, `Toggle` and `ToggleGroup` (+ `ToggleGroupItem`).

  - `@mild-ui/primitives/toggle-group`: new `createToggleGroup` primitive (`aria-pressed` items, one tab stop, Arrow/Home/End keys, single or multiple selection).
  - `SegmentedControl` is a radio group driven by `createRadioGroup`; `ToggleGroup` is driven by `createToggleGroup`.
  - `ButtonGroup` hands `size`, `variant` and `disabled` to the buttons inside it; `Button` and `IconButton` read them as defaults.
  - `InputGroup` shares its `size` with the `Input` inside, and can be the child of a `FormField`: `FormControl` now wires the field to the control found inside a wrapper, and `InputGroup` passes `id`/`name`/`required` through to the input.
  - `Textarea` has the same variants, sizes and states as `Input`, plus `resize` and `autoResize`.
  - Core: new `_textarea`, `_icon-button`, `_close-button`, `_button-group`, `_input-group`, `_segmented-control` and `_toggle` component stylesheets.

- Feedback, overlay and disclosure components: `Alert`, `Spinner`, `Progress`, `CircularProgress`, `Skeleton` (+ `SkeletonText`), `Toast` (`ToastProvider`, `useToast`, `ToastRegion`), `Dialog` (+ parts), `AlertDialog` (+ parts), `Tooltip`, `Tabs` (+ parts), `Accordion` (+ parts) and `Collapsible` (+ parts).

  - New primitives, each following its WAI-ARIA Authoring Practices pattern: `@mild-ui/primitives/dialog` (focus trap, Escape, return focus to the trigger, scroll lock, nested dialogs closing one at a time), `tooltip`, `tabs` (automatic / manual activation), `accordion`, and `toast` (an auto-dismiss timer that pauses while hovered or focused).
  - `Dialog` renders through a portal; `AlertDialog` is `role="alertdialog"`, ignores overlay clicks and focuses `leastDestructiveRef`.
  - Toasts stack per placement (`max`, oldest dropped), auto-dismiss with a pause on hover/focus, and carry a keyboard-reachable close button.
  - `useMachine` now returns a stable object, so composing its ref no longer recreates the primitive on every render.
  - Core: new `_progress`, `_circular-progress`, `_skeleton`, `_toast`, `_tooltip` and `_collapsible` stylesheets; `_accordion` gains the heading wrapper and hidden-panel rules, `_modal` the alert variant, `_spinner` a visually hidden label; `_link` now uses the real transition token.

## 1.0.0

## 0.6.0

### Minor Changes

- New package: framework-agnostic, accessible UI primitives.

  - `createCheckbox` (tri-state), `createRadioGroup` (roving tabindex), `createSwitch`, `createListbox` (typeahead, Home/End, Escape, `aria-activedescendant`) and `createField` (label, description and error ids, `aria-describedby`/`aria-invalid`). Each follows, and links in its doc comment, its WAI-ARIA Authoring Practices pattern.
  - No runtime dependencies and no framework. Each primitive is its own entry (`@mild-ui/primitives/checkbox`, …) and imports nothing else, which `src/isolation.test.ts` enforces by bundling each entry and checking the module graph.
  - Tests run in vitest + jsdom with per-file coverage gates of 90% lines/branches/functions/statements.
