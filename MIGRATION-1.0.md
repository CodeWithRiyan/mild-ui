# Migrating to mild-ui 1.0

> **1.1.0** and **1.2.0** are additive: no breaking changes on top of 1.0. 1.1 adds 44 components
> (layout, typography and navigation, basic input, feedback, overlay and disclosure, data
> display), six primitives, server-rendering + hydration and size-budget contracts, and a Next.js
> App Router template. 1.2 adds `Table` and `DataTable`, brings `@mild-ui/vue` to parity with
> every React component, and adds a Nuxt template. See each package's `CHANGELOG.md` for the
> list; the notes below describe the 0.x → 1.0 changes.
>
> **Upgrading from npm:** 1.0 and 1.1 were never published; the latest 0.x on npm is 0.5.1, so
> the first release you can install is 1.2.0. The notes below apply to that upgrade. Vue users
> also need the [Vue section](#vue-mild-uivue).

1.0 stabilizes the React components: every component is driven by `@mild-ui/primitives`, the
stylesheet matches the DOM the components render, style props are design tokens only, and the
package has no form-library or headless-UI dependency. This document lists every change from
0.6 and what to do about it. Items marked **Breaking** need action; the rest are fixes you get
for free.

Packages: `@mild-ui/react`, `@mild-ui/core`, `@mild-ui/primitives` (unchanged API), new private
`@mild-ui/test-cases`.

---

## Dependencies

- **Breaking:** `@mild-ui/react` no longer depends on `react-hook-form` or
  `@radix-ui/react-slot`. Its only runtime dependencies are `@mild-ui/primitives` and `clsx`.
  If you used react-hook-form through `Form`/`Field`, see [Form](#form) below and the adapter in
  `storybook/react/src/examples/react-hook-form.tsx`.
- `@mild-ui/react` supports **React 18 and React 19** (peer `^18.0.0 || ^19.0.0`); both are
  tested in CI (`pnpm test:react:matrix`). Internals no longer use the global `JSX` namespace,
  `MutableRefObject` casts or untyped `ReactElement` props, which broke under `@types/react` 19.

## Theming (`ThemeProvider`, `useTheme`, `useColorMode`)

One context, one API.

- **Breaking:** `ThemeProvider`'s `colorMode` prop is now the **controlled** mode (pair it with
  `onColorModeChange`). The initial/uncontrolled mode is `defaultColorMode`.
  ```diff
  - <ThemeProvider colorMode="light">
  + <ThemeProvider defaultColorMode="light">
  ```
- **Breaking:** the default mode is `"system"` (was `"light"`). System mode follows the OS live
  (`prefers-color-scheme` change events).
- **Breaking:** `ThemeProvider` no longer renders a wrapper `<div class="mild-react-root">`; it
  renders its children only. The resolved mode goes to `<html data-theme="light|dark">`,
  `<html data-color-mode="...">` and `<html style="color-scheme: ...">`.
- **Breaking:** theme overrides are written with the **core variable names**
  (`--mild-color-primary-500`, `--mild-space-4`, `--mild-radius-lg`, `--mild-font-size-base`,
  ...). 0.6 wrote `--mild-colors-*`, which the stylesheet never read, so `theme` overrides had no
  visual effect. Only the overrides you pass are written (the defaults come from the
  stylesheet), and they are removed again when the provider unmounts or the prop changes.
- **Breaking:** `defaultTheme` now mirrors the core tokens (primary is the core blue `#0ea5e9`,
  font sizes use `base` instead of `md`, spacing has the full scale including `px`/`0-5`/...).
  `generateCSSProperties(theme, prefix)` accepts a partial theme; `applyCSSProperties()` returns
  a cleanup function.
- `storageKey` accepts `null` to disable persistence. Invalid stored values are ignored.
- `useColorMode()` is the color-mode slice of `useTheme()`; both expose `colorMode`,
  `resolvedColorMode`, new `systemColorMode`, `setColorMode`, `toggleColorMode`, `isDark`,
  `isLight`, `isSystem`. `useTheme()` adds `theme`. Both throw a clear error outside the provider.
- New: `ColorModeScript` / `getColorModeScript({ storageKey, defaultColorMode })` — inline
  anti-flicker script applying the stored mode before first paint. Put it in `<head>` before the
  stylesheet.
- New types: `ResolvedColorMode`, `ColorModeContextValue`, `ColorModeScriptProps`.
- Internal file `hooks/userColorMode.ts` renamed to `hooks/useColorMode.ts` (no import change:
  import from `@mild-ui/react`).

## Form

Rewritten without react-hook-form; linking is automatic through `@mild-ui/primitives/field`.

- **Breaking:** `Form` is now a plain `<form>` (forwards all form attributes, `mild-form`
  class). It is no longer react-hook-form's `FormProvider`, so `<Form {...useForm()}>` no longer
  works.
- **Breaking:** `FormField` is now the all-in-one field:
  ```tsx
  <FormField name="email" label="Email" description="Work address" required error={errors.email}>
    <Input />
  </FormField>
  ```
  It renders `FormItem` + `FormLabel` + `FormControl` + `FormDescription` + `FormMessage`, and
  links them automatically: `for`/`aria-labelledby`, `aria-describedby` (description first,
  error last, error only while invalid), `aria-invalid`, and injects `name`/`required` into the
  control. The 0.6 `FormField` (a react-hook-form `Controller` with `render`) is gone.
- **Breaking:** `Field` is a deprecated alias of `FormField`. Its react-hook-form props
  `control`, `isBoolean`, `isRadio` are gone; the control's value/onChange are yours to wire.
- **Breaking:** validation state is a prop: `error` (message) or `invalid` on `FormItem` /
  `FormField`. `FormMessage` renders that error (or its children) with `role="alert"`;
  `hideError` keeps the control invalid without rendering the message.
- **Breaking:** `useFormField()` no longer returns react-hook-form field state; it returns
  `{ id, name, error, invalid, required, formItemId, formDescriptionId, formMessageId }`.
- **Breaking:** `FormControl` takes a single child element (which must forward its ref to the
  focusable element) instead of a Radix `Slot`. Consumer refs on the child are preserved.
- **Breaking:** class names: `FormItem` → `mild-form-item` (+ `data-invalid`, `data-required`),
  `FormDescription` → `mild-form-description`, `FormMessage` → `mild-form-message` (were Tailwind
  utilities). New core partial `components/_form.scss` styles them.
- New exported types: `FormProps`, `FormItemProps`, `FormControlProps`, `FormFieldProps`,
  `FieldChildProps`.
- react-hook-form integration is a Storybook example:
  `storybook/react/src/examples/react-hook-form.tsx` exposes the 0.6-style `Form`, `Field`,
  `FormField` and `FormItem` on top of the 1.0 API.

## Button

- **Fixed:** the primary (and secondary/destructive) variant rendered transparent. The
  stylesheet paints buttons per _style × color_ (`.mild-button--solid.mild-button--primary`) and
  the component never emitted the style class. `variant` now maps to that pair:
  `primary`/`secondary`/`destructive` → `solid` + `primary`/`secondary`/`danger`;
  `outline`/`ghost`/`link` → that style + `colorScheme` (default `primary`).
- **Breaking (class names):** buttons now carry `mild-button--solid` (etc.) in addition to
  `mild-button--<variant>`; `colorScheme` has no default, so a secondary button no longer also
  carries `mild-button--primary`.
- **Breaking:** `loading` no longer sets the `disabled` attribute. The button stays focusable,
  gets `aria-busy="true"` + `aria-disabled="true"`, ignores clicks, and `data-loading` is set
  (the stylesheet keyed on `[data-loading="true"]`, fixed to `[data-loading]`).
- `aria-busy` / `aria-disabled` are only emitted when true.
- Outline/ghost hover and active backgrounds are one shade stronger (were nearly invisible).

## Input / InputPassword

- **Fixed:** `isInvalid`, `colorScheme`, `errorBorderColor`, `focusBorderColor` leaked to the
  DOM as unknown attributes; `isInvalid` now sets `aria-invalid="true"` (alias of `error`).
- **Fixed:** `isReadOnly` sets the `readonly` attribute (was class-only).
- `InputPassword`: the visibility toggle no longer steals focus from the input — it prevents
  focus on mousedown and restores focus + caret selection after the `type` switch. Its label
  switches between "Show password" / "Hide password" with `aria-pressed`. Keyboard activation
  leaves focus on the toggle.
- **Breaking (markup):** `InputPassword` wraps the input in `.mild-input-password-field`
  (`--full-width` modifier) instead of an inline-styled `div`; the toggle is styled by
  `.mild-input-password-toggle` (core rules moved from `components/index.scss`, which used a
  `__toggle` class the component never emitted).

## Label

- Clicking a label focuses its control, including custom controls (`span[role="checkbox"]`,
  `radio`, `switch`) which a native `<label for>` cannot name or activate; checkbox-like roles
  are activated as well. A handler that already did this (the field primitive inside
  `FormField`) wins, so a control is never toggled twice.
- **Fixed:** the required marker was announced twice (and rendered twice: once by the
  component, once by a generic `--required::after` rule). It is now a single
  `<span class="mild-label__marker" aria-hidden="true">*</span>`; "required" is announced from
  the control's own `required`/`aria-required`.

## Text

- **Breaking:** `Text` is polymorphic. `TextProps<T>` = typography props + the props of the
  element given with `as` (any intrinsic element or component), and `ref` is typed after that
  element. The old fixed `as` union and `HTMLTextComponent` ref are gone.
- **Breaking:** `color` is the semantic `TextColor` union the stylesheet paints
  (`primary | secondary | success | warning | danger | muted`), no longer an arbitrary string.
- `textDecoration="overline"` now has a rule.

## Box

- **Fixed:** the `as` prop was ignored (always rendered a `div`). `Box` is polymorphic like
  `Text`, with props and ref typed after `as`.
- **Breaking:** style props accept **design-token keys only**, never raw CSS values or numbers:
  - spacing props (`padding*`, `margin*`, `gap`, `gridGap`, `top/right/bottom/left`,
    `borderWidth`): `SpaceToken` (`"0" | "px" | "0-5" | "1" | ... | "96"`)
  - `width/height/min*/max*`: `DimensionToken` = `SpaceToken | "full" | "1/2" | "1/3" | ...`
  - `borderRadius`: `RadiusToken` (`none | sm | base | md | lg | xl | 2xl | 3xl | full`)
  - `backgroundColor/color/borderColor`: `ColorToken` (`"primary-500"`, `"gray-100"`,
    `"white"`, `"black-alpha-20"`, ...)
  - `zIndex`: `ZIndexToken` (`1..5`, `10..100`)
  ```diff
  - <Box padding="16px" width="50%" backgroundColor="#fff" gap="sm" />
  + <Box padding="4" width="1/2" backgroundColor="white" gap="2" />
  ```
- Values resolve to the core custom properties with fallbacks (`var(--mild-space-4, 1rem)`,
  `var(--mild-color-primary-500)`, `var(--mild-radius-lg, 0.5rem)`,
  `var(--mild-dimension-1-2, 50%)`), so they follow the theme.
- **Fixed:** `alignItems="flex-start"` / `justifyContent="space-between"` emitted classes the
  stylesheet did not have (`--items-flex-start`); they map to `--items-start` / `--justify-between`.
  `display="contents"` and `overflowX`/`overflowY` now have rules.
- `SpacingValue` / `ColorValue` types are deprecated aliases of `SpaceToken` / `ColorToken`.

## Checkbox, Radio, Switch, Select (stylesheet)

The components were already driven by `@mild-ui/primitives` (no Radix), but the stylesheet still
targeted the old native markup (`.mild-checkbox input[type="checkbox"]`), so the box, circle and
track never painted.

- **Fixed:** `_checkbox.scss`, `_radio.scss`, `_switch.scss` are rewritten against the real DOM:
  `[data-state="checked|unchecked|indeterminate"]`, `[data-disabled]`, `[aria-invalid="true"]`,
  hover and `focus-visible`, sizes `--sm/--md/--lg`.
- **Breaking (markup):** wrapper and part classes replace the dead utility classes:
  `.mild-checkbox-field` / `.mild-checkbox__indicator`, `.mild-radio-group` /
  `.mild-radio-field` / `.mild-radio__indicator`, `.mild-switch-field` (thumb stays
  `.mild-switch-thumb`), `.mild-select-value` (+ `.mild-select-placeholder`),
  `.mild-select-icon` (+ `--open`), `.mild-select-viewport`, `.mild-select-item__indicator`.
  Labels get `--disabled` modifiers.
- **Fixed:** the Select popup is at least as wide as its trigger; the selected item's check mark
  is the component's icon (the duplicate `::after "✓"` is removed); disabled options are dimmed.
- Select keyboard contract verified: typeahead, Home/End, Escape closes and restores focus to
  the trigger, Enter/Space select, the value submits inside a `<form>` under `name`.
- Checkbox: `aria-checked="mixed"` for indeterminate, Space toggles (Enter does not). Radio:
  arrows move focus and selection with wrap, exactly one radio in the tab order. Switch: Space and
  Enter toggle, `aria-checked` from the first render. All three submit inside a `<form>`.

## Core stylesheet (`@mild-ui/core`)

- **Breaking:** `components/index.scss` only `@use`s the component partials; the older duplicate
  copies of the label/checkbox/radio/select/switch rules it contained are removed.
- `_box.scss`, `_text.scss`, `_spinner.scss`, `_alert.scss` and the new `_form.scss` are now
  included in the components entry (Box and Text were previously unstyled).
- **Breaking:** the generic `.mild-<component>--required::after { content: "*" }` rule is
  removed from the variants mixin.
- **Breaking (tokens):** dimension fractions moved from `--mild-space-<n>` to
  `--mild-dimension-<n>` (`--mild-dimension-1-2: 50%`, `--mild-dimension-full`). They collided
  with the spacing scale: `--mild-space-1-5`, `-2-5`, `-3-5` were overwritten with 20%/40%/60%.
- `.mild-input--outline` is no longer an empty rule; `.mild-select` (root) is positioned.

## Testing and tooling

- `packages/react/src/export.test.ts` guards the public export list (52 components,
  `ThemeProvider`, `ColorModeScript`, hooks, compound parts).
- New private workspace package `@mild-ui/test-cases`: framework-agnostic per-component cases
  (`@mild-ui/test-cases/button`, ...) consumed by the react tests through
  `src/test-utils/run-cases.tsx`; editing one case file re-runs only the tests using it.
- `styles.contract.test.ts` and `utils/button.css.test.ts` compile the core SCSS and verify every
  class/state the components emit has a rule.
- Type-level tests (`*.test-d.tsx`, `expectTypeOf`) run through vitest typecheck mode as part
  of `pnpm test`.
- Per-package coverage (`pnpm test:coverage`), React 18/19 matrix
  (`pnpm test:react:matrix`, `scripts/test-react-matrix.mjs`, CI job `react-matrix`).
- New `apps/playground-react`: a Vite app rendering every component on one form page, with a
  smoke test; inline anti-flicker script in its `index.html`.
- `@testing-library/react` 16 (supports React 18 and 19). `no-explicit-any` is an error for all
  of `packages/react/src` and `packages/primitives/src`.
- Root scripts `test` / `typecheck` include `./apps/*`.

---

## Vue (`@mild-ui/vue`)

The components above are the React ones. `@mild-ui/vue` moves from 0.5.1 to 1.2.0 in one step:
every component is rebuilt on `@mild-ui/primitives` and the core stylesheet.

- **Breaking:** the runtime dependencies `@vueuse/core`, `lucide-vue-next`, `clsx` and
  `tailwind-merge` are gone, as are the Tailwind class builders (`checkboxStyles`, `inputStyles`,
  `selectTriggerStyles`, ...). `cn` stays.
- **Breaking:** `Select` takes `modelValue` (`v-model`) instead of `value`.
- **Breaking:** `Radio` is a group (`items` or `RadioGroupItem` children) instead of a single
  native radio.
- **Breaking:** `ThemeProvider` takes `defaultColorMode` / `colorMode` (`v-model:colorMode`) /
  `theme` / `storageKey` and writes `data-theme` on `<html>`. The old `config` / `setConfig` slot
  API is replaced by `theme` and `useTheme()`; `defaultTheme` still works as an alias of
  `defaultColorMode`.
- `Button`'s `leading-icon` / `trailing-icon` slots are now `leftIcon` / `rightIcon`; the old
  names still work.

## Checklist

1. Replace `<ThemeProvider colorMode="...">` with `defaultColorMode` (or add `onColorModeChange`
   for controlled use); add `ColorModeScript` to `<head>`.
2. Remove react-hook-form wiring from `Form`/`Field`; pass `error` to `FormField` (or copy the
   Storybook adapter).
3. Replace raw CSS values on `Box` with tokens; check `Text color` values.
4. Update any custom CSS keyed on the old button/checkbox/radio/switch/select class names or on
   `--mild-space-<fraction>` variables.
5. If you relied on `loading` buttons being `disabled`, check `aria-disabled`/`aria-busy` instead.
