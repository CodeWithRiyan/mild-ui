# @mild-ui/vue

## 1.2.0

### Minor Changes

- `Table` and `DataTable` for React and Vue.

  - `Table` (`variant` `simple`/`striped`/`outline`, `size`, `hoverable`, `stickyHeader`, `ui.container`) renders a `<table>` inside a horizontally scrolling `.mild-table-container`, with `TableCaption`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow` (`selected` -> `aria-selected`), `TableHead` (`align`, `numeric`, `sort` -> `aria-sort`, `scope`) and `TableCell` parts.
  - `DataTable` renders `columns` + `rows` and follows the WAI-ARIA APG sortable table: a real `<button>` inside each sortable `<th aria-sort>`, ascending first then descending, controlled (`sort`/`onSortChange`, `v-model:sort`) or uncontrolled (`defaultSort`). `selectable` adds a primitives-driven `Checkbox` per row and a tri-state select-all header (`selectedKeys`/`onSelectionChange`, `v-model:selectedKeys`, `defaultSelectedKeys`, `rowKey`, `selectionLabel`, `selectAllLabel`). `emptyMessage` spans every column when there are no rows; `loading` marks the table `aria-busy` and shows a `Spinner` labelled `loadingMessage`. Cells can be customised with `renderCell` (React and Vue) or the `cell` slot (Vue).
  - Sorting helpers `sortValueOf`, `compareSortValues`, `sortRows` (numbers numerically, strings naturally, nullish last, stable) and `nextSort` are exported from both packages.
  - Core ships the `mild-table` / `mild-data-table` styles; `@mild-ui/test-cases` gains `table` and `data-table` cases shared by both frameworks.

- Custom class and style on every Vue component.

  - Every component merges a caller `class` and `style` (the React `className`/`style`) onto one documented element: the root, or the control for Checkbox, Switch, RadioGroupItem and Select. A contract test covers every export.
  - New per-part `ui` class maps, matching the existing Switch/InputPassword/Label ones: `Checkbox` (`container`, `checkbox`, `indicator`, `label`), `Radio`/`RadioGroup` (`container`, `items`), `RadioGroupItem` (`container`, `radio`, `indicator`, `label`), `Select` (`root`, `trigger`, `value`, `icon`, `content`, `item`), `SelectTrigger` (`icon`) and `FormField` (`label`, `control`, `description`, `message`).
  - `ThemeProvider` takes an optional `as` element (`as="div"`), which renders a `.mild-theme-provider` root that accepts `class` and `style`; without it the provider still renders no element, like the React one.

- Feedback, overlay, disclosure and data display components for Vue, matching the React ones: `Alert`, `Spinner`, `Progress`, `CircularProgress`, `Skeleton` (+ `SkeletonText`), `Toast` (`ToastProvider`, `useToast`, `ToastRegion`), `Dialog` (+ parts), `AlertDialog` (+ parts), `Tooltip`, `Tabs` (+ parts), `Accordion` (+ parts), `Collapsible` (+ parts), `Card` (+ parts), `Badge`, `Tag` (+ `TagCloseButton`), `Avatar`, `AvatarGroup`, `Image` and `Stat` (+ `StatGroup`).

  - Behaviour comes from the primitives: `@mild-ui/primitives/dialog` (focus trap, Escape, return focus, scroll lock, nesting), `tooltip`, `tabs`, `accordion` and `toast` (auto-dismiss that pauses on hover/focus).
  - Dialogs and toast regions render through `<Teleport to="body">` after mount, so server rendering emits nothing for them and hydration stays clean. `initialFocus` / `finalFocus` / `leastDestructive` take an element or a getter, so template refs can be read when the dialog opens.
  - `Image` loads lazily by default and degrades gracefully: `fallbackSrc` first, then a `fallback` slot. `Avatar` falls back to the initials (or a person icon); `AvatarGroup` hands down its size and shows a "+N" overflow beyond `max`.
  - Every component ships with its test file (shared `@mild-ui/test-cases`, keyboard tests for Dialog, Tabs, Accordion and Tooltip, axe-core in both themes, server rendering), the class/style contract, and a Storybook story.

- Layout components for Vue: `Stack`, `Flex`, `Grid` (+ `GridItem`), `Container`, `Divider`, `AspectRatio` and `ScrollArea`, matching the React ones.

  - All are polymorphic (`as`) and take design tokens only for spacing and sizes, like `Box`; caller `class` and `style` merge with the component's own.
  - `Grid` columns and `GridItem` spans can be set per breakpoint (`{ base: 1, md: 2, lg: 3 }`).
  - `Divider` renders `role="separator"` with `aria-orientation`, supports a `label` (prop or slot) on the line, and `decorative` hides it from assistive technology; a void `as="hr"` gets no children.
  - `ScrollArea` is keyboard-focusable (`tabindex="0"`, overridable) and ships themed, slim scrollbars (`auto` / `always` / `hover` / `hidden`).
  - Shared helpers `flexModifierClasses`, `responsiveClasses`, `shortAlignment` and `toCssAspectRatio` are exported.
  - Each component has its test file (shared `@mild-ui/test-cases`, axe-core in both themes, server rendering) under the 90% per-file coverage gate, and a Storybook story.

- `Map` for Vue, matching the React one: an OpenStreetMap embed (no API key, no script) in a fixed-ratio `figure` named by `title`, with a link to the full map. `src` embeds another provider; `fallback` and `caption` are available as props or slots. The `boundingBox`, `openStreetMapEmbedUrl` and `openStreetMapUrl` helpers are exported. Every React component now has its Vue counterpart.
- Stabilize the first twelve Vue components on `@mild-ui/primitives` and the core stylesheet.

  - New: `Switch`, `InputPassword`, `Label`, `Text`, `Box`, `Form` (+ `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `useFormField`), `RadioGroupItem`, the Select parts (`SelectRoot`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`), `useTheme`, `useColorMode`, `ColorModeScript` / `getColorModeScript`, and the `useMachine` composable that binds a primitive to a template ref.
  - Rebuilt: `Button`, `Checkbox`, `Radio` / `RadioGroup`, `Select`, `Input` and `ThemeProvider` now emit the `mild-*` classes `@mild-ui/core` styles (the previous Tailwind class names were never painted by the core stylesheet) and take their behaviour from `@mild-ui/primitives`: tri-state checkbox, roving-tabindex radio group, select-only combobox with a listbox popup (Arrow/Home/End, typeahead, Escape), all per the WAI-ARIA Authoring Practices. A loading `Button` keeps its label as its accessible name.
  - Breaking: the runtime dependencies `@vueuse/core`, `lucide-vue-next`, `clsx` and `tailwind-merge` are gone, as are the Tailwind class builders (`checkboxStyles`, `inputStyles`, `selectTriggerStyles`, ...); `cn` stays. `Select` takes `modelValue` (v-model) instead of `value`; `Radio` is a group (`items` or `RadioGroupItem` children) instead of a single native radio; `ThemeProvider` takes `defaultColorMode` / `colorMode` (`v-model:colorMode`) / `theme` / `storageKey` and writes `data-theme` on `<html>` (the old `config` / `setConfig` slot API is replaced by `theme` and `useTheme()`; `defaultTheme` still works as an alias of `defaultColorMode`). `Button`'s `leading-icon` / `trailing-icon` slots are now `leftIcon` / `rightIcon` (the old names still work).
  - Tests: every component has a test file running the shared `@mild-ui/test-cases`, keyboard tests for Checkbox, Radio, Switch and Select, and an axe-core check in the light and dark theme; coverage is gated per file at 90%. `pnpm test:vue:matrix` runs the suite on the committed Vue version and on `vue@latest` (also verified on 3.3 and 3.4); CI runs the matrix.

- Typography, navigation and basic input components for Vue, matching the React ones: `Heading`, `Link`, `Breadcrumb` (+ `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbSeparator`), `Code`, `Kbd`, `List` (+ `ListItem`), `Textarea`, `IconButton`, `ButtonGroup` (+ `useButtonGroup`), `CloseButton`, `InputGroup` (+ `InputAddon`, `InputLeftAddon`, `InputRightAddon`, `InputElement`, `InputLeftElement`, `InputRightElement`, `useInputGroup`), `SegmentedControl`, `Toggle` and `ToggleGroup` (+ `ToggleGroupItem`, `useToggleGroup`).

  - `SegmentedControl` is a radio group driven by `@mild-ui/primitives/radio-group`; `ToggleGroup` is driven by `@mild-ui/primitives/toggle-group` (`aria-pressed` items, one tab stop, Arrow/Home/End keys, single or multiple selection, `v-model`).
  - `ButtonGroup` hands `size`, `variant` and `disabled` to the `Button`s and `IconButton`s inside it; their own props still win. `Button`'s `variant`, `size` and `disabled` props therefore no longer default at the prop level (the rendered defaults are unchanged: primary, md, enabled).
  - `InputGroup` shares its `size` with the `Input` inside, detects its addon/element children, and can be the child of a `FormField`: the field wiring (`id`, `name`, `required`) passes through to the input.
  - `Link` takes a router component through `as` and only sets `href` when given one; `Breadcrumb` takes a `separator` prop or slot; `Textarea` supports `autoResize`; `Toggle` is controlled with `v-model:pressed`.
  - Every component ships with its test file (shared `@mild-ui/test-cases`, WAI-ARIA keyboard tests for SegmentedControl and ToggleGroup, axe-core in both themes, server rendering), the class/style contract, and a Storybook story.

### Patch Changes

- @mild-ui/primitives@1.2.0

## 1.1.0

## 1.0.0

## 0.6.0

## 0.5.1

### Patch Changes

- 4cf76b4: Supported Node.js versions are now 20, 22, and 24 (`engines.node`: `^20.0.0 || ^22.0.0 || >=24.0.0`). Node 18 reached end-of-life in April 2025 and is no longer tested. The published code and runtime dependencies are unchanged.

## 0.5.0

### Minor Changes

- 85402d2: R1A foundation release.

  - `@mild-ui/vue` now exports `Checkbox`, `Input`, `Radio`, `RadioGroup`, `Select`, and `ThemeProvider` by name.
  - `@mild-ui/react` ships `dist/index.mjs` and `dist/index.cjs` with matching type declarations, includes its compiled CSS (`@mild-ui/react/styles`) again, no longer bundles its dependencies, and supports React 19 as a peer.
  - `@mild-ui/vue` adds an `exports` map and no longer bundles its dependencies.
  - `@mild-ui/core` no longer ships the unfinished Flutter and React Native outputs (`./flutter*`, `./react-native*` exports removed).
  - All packages declare `engines.node >= 18` and complete repository metadata.
