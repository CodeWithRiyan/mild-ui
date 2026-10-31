# @mild-ui/core

## 1.2.0

### Minor Changes

- `Table` and `DataTable` for React and Vue.

  - `Table` (`variant` `simple`/`striped`/`outline`, `size`, `hoverable`, `stickyHeader`, `ui.container`) renders a `<table>` inside a horizontally scrolling `.mild-table-container`, with `TableCaption`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow` (`selected` -> `aria-selected`), `TableHead` (`align`, `numeric`, `sort` -> `aria-sort`, `scope`) and `TableCell` parts.
  - `DataTable` renders `columns` + `rows` and follows the WAI-ARIA APG sortable table: a real `<button>` inside each sortable `<th aria-sort>`, ascending first then descending, controlled (`sort`/`onSortChange`, `v-model:sort`) or uncontrolled (`defaultSort`). `selectable` adds a primitives-driven `Checkbox` per row and a tri-state select-all header (`selectedKeys`/`onSelectionChange`, `v-model:selectedKeys`, `defaultSelectedKeys`, `rowKey`, `selectionLabel`, `selectAllLabel`). `emptyMessage` spans every column when there are no rows; `loading` marks the table `aria-busy` and shows a `Spinner` labelled `loadingMessage`. Cells can be customised with `renderCell` (React and Vue) or the `cell` slot (Vue).
  - Sorting helpers `sortValueOf`, `compareSortValues`, `sortRows` (numbers numerically, strings naturally, nullish last, stable) and `nextSort` are exported from both packages.
  - Core ships the `mild-table` / `mild-data-table` styles; `@mild-ui/test-cases` gains `table` and `data-table` cases shared by both frameworks.

## 1.1.0

### Minor Changes

- Basic input components: `Textarea`, `IconButton`, `ButtonGroup`, `CloseButton`, `InputGroup` (+ `InputLeftAddon`, `InputRightAddon`, `InputLeftElement`, `InputRightElement`), `SegmentedControl`, `Toggle` and `ToggleGroup` (+ `ToggleGroupItem`).

  - `@mild-ui/primitives/toggle-group`: new `createToggleGroup` primitive (`aria-pressed` items, one tab stop, Arrow/Home/End keys, single or multiple selection).
  - `SegmentedControl` is a radio group driven by `createRadioGroup`; `ToggleGroup` is driven by `createToggleGroup`.
  - `ButtonGroup` hands `size`, `variant` and `disabled` to the buttons inside it; `Button` and `IconButton` read them as defaults.
  - `InputGroup` shares its `size` with the `Input` inside, and can be the child of a `FormField`: `FormControl` now wires the field to the control found inside a wrapper, and `InputGroup` passes `id`/`name`/`required` through to the input.
  - `Textarea` has the same variants, sizes and states as `Input`, plus `resize` and `autoResize`.
  - Core: new `_textarea`, `_icon-button`, `_close-button`, `_button-group`, `_input-group`, `_segmented-control` and `_toggle` component stylesheets.

- Data display components: `Card` (+ `CardHeader`, `CardTitle`, `CardDescription`, `CardBody`, `CardFooter`, `CardMedia`), `Badge`, `Tag` (+ `TagCloseButton`), `Avatar`, `AvatarGroup`, `Image`, `Stat` (+ `StatGroup`) and `Map`.

  - `Image` loads lazily by default and degrades gracefully: `fallbackSrc` first, then a `fallback` placeholder; `ratio` fills a fixed-ratio frame without remounting the picture.
  - `Avatar` falls back to the initials (or a person icon) while loading and on error; `AvatarGroup` hands down its size and shows a "+N" overflow beyond `max`.
  - `Tag` renders a keyboard-reachable remove button named after the label; `Stat` announces its trend in words.
  - `Map` embeds OpenStreetMap (no key, no script) in a titled, lazy iframe with a link to the full map; `src` for other providers, `fallback` to skip the embed.
  - Core: new `_badge`, `_tag`, `_avatar`, `_image`, `_stat` and `_map` stylesheets; `Card` maps onto the existing `_card` contract.

- Feedback, overlay and disclosure components: `Alert`, `Spinner`, `Progress`, `CircularProgress`, `Skeleton` (+ `SkeletonText`), `Toast` (`ToastProvider`, `useToast`, `ToastRegion`), `Dialog` (+ parts), `AlertDialog` (+ parts), `Tooltip`, `Tabs` (+ parts), `Accordion` (+ parts) and `Collapsible` (+ parts).

  - New primitives, each following its WAI-ARIA Authoring Practices pattern: `@mild-ui/primitives/dialog` (focus trap, Escape, return focus to the trigger, scroll lock, nested dialogs closing one at a time), `tooltip`, `tabs` (automatic / manual activation), `accordion`, and `toast` (an auto-dismiss timer that pauses while hovered or focused).
  - `Dialog` renders through a portal; `AlertDialog` is `role="alertdialog"`, ignores overlay clicks and focuses `leastDestructiveRef`.
  - Toasts stack per placement (`max`, oldest dropped), auto-dismiss with a pause on hover/focus, and carry a keyboard-reachable close button.
  - `useMachine` now returns a stable object, so composing its ref no longer recreates the primitive on every render.
  - Core: new `_progress`, `_circular-progress`, `_skeleton`, `_toast`, `_tooltip` and `_collapsible` stylesheets; `_accordion` gains the heading wrapper and hidden-panel rules, `_modal` the alert variant, `_spinner` a visually hidden label; `_link` now uses the real transition token.

- Layout components: `Stack`, `Flex`, `Grid` (+ `GridItem`), `Container`, `Divider`, `AspectRatio` and `ScrollArea`.

  - All are polymorphic (`as`) and take design tokens only for spacing and sizes, like `Box`.
  - `Grid` columns and `GridItem` spans can be set per breakpoint (`{ base: 1, md: 2, lg: 3 }`).
  - `Divider` renders `role="separator"` with `aria-orientation`, supports a `label` on the line, and `decorative` hides it from assistive technology.
  - `ScrollArea` is keyboard-focusable and ships themed, slim scrollbars (`auto` / `always` / `hover` / `hidden`).
  - Core: new `_stack`, `_flex`, `_grid`, `_container`, `_divider`, `_aspect-ratio` and `_scroll-area` component stylesheets, a shared `flex-modifiers` mixin, and `--mild-breakpoint-*` custom properties generated from the breakpoint tokens.

- Typography and navigation components: `Heading`, `Link`, `Breadcrumb` (+ `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbSeparator`), `Code`, `Kbd` and `List` (+ `ListItem`).

  - All are polymorphic (`as`) and keep the token-only style-prop rule.
  - `Heading`: `level` picks both the element (`h1`..`h6`) and the default size, so the document outline and the visual size stay independent (`<Heading level={1} size="lg">`).
  - `Link`: `underline` (`none`/`hover`/`always`), `external` (adds `target="_blank"` + `rel="noopener noreferrer"`), `plain`, and `disabled` (inert but still a link). Works with router links through `as`.
  - `Breadcrumb`: `nav[aria-label] > ol` with `aria-hidden` separators inserted automatically and `aria-current="page"` on the last step; use `items` or compose the parts.
  - `Code` (inline or `block`), `Kbd`, and `List`/`ListItem` (`ordered`, `marker`, `unstyled`, token `spacing`, per-item `icon`).
  - Core: new `_heading`, `_link`, `_breadcrumb`, `_code`, `_kbd` and `_list` component stylesheets.

## 1.0.0

### Major Changes

- 1.0 stabilization. See MIGRATION-1.0.md for the full list; highlights:

  - Theme: one API (`ThemeProvider` + `useTheme` + `useColorMode`), `defaultColorMode`/controlled `colorMode`, system mode follows the OS live, `ColorModeScript` anti-flicker script, theme overrides written with the core variable names.
  - Form: no react-hook-form / Radix Slot dependency; `FormField` links label, description and error automatically through `@mild-ui/primitives/field`.
  - Button: primary variant no longer renders transparent; `loading` sets `aria-busy` and blocks clicks without `disabled`.
  - Box / Text: polymorphic `as`; Box style props accept design tokens only.
  - Label: clicking focuses/activates custom controls; required marker announced once.
  - InputPassword: toggle keeps focus on the input. Input: `isInvalid`/`isReadOnly` mapped to the DOM.
  - Core: checkbox/radio/switch/select/form stylesheets rewritten for the primitive-driven markup; dimension tokens moved to `--mild-dimension-*`.

## 0.6.0

### Minor Changes

- Component styles are written entirely in tokens, and the interactive color is one token.

  - New `--mild-color-accent` (with `-hover`, `-active`, `-foreground`, `-soft`, `-subtle`, `-muted`), defaulting to the primary palette. Primary buttons, checked checkboxes/radios/switches, focus rings (`--mild-ring`) and active tabs all read it, so the brand color can be changed in one place at build time or at runtime. It is distinct from the existing `--mild-accent` surface tint.
  - New `--mild-color-white`, `--mild-color-black` and `--mild-color-{black,white}-alpha-{0..90}` tokens for overlays, scrims and gradients.
  - Every hex, `rgba()`, named-color and `px` literal in `src/sass/components/**` was replaced with a token (`--mild-space-*`, `--mild-border-width` multiples, `--mild-radius-*`, alpha tokens, `breakpoints.mild-breakpoint()`); the compiled CSS resolves to the same values as before. Stylelint (`stylelint.config.mjs`, part of `pnpm lint`) now forbids such literals in that directory, with two documented exceptions.
  - New export `@mild-ui/core/scss/tokens/*` exposes the individual Sass token modules and their functions (e.g. `colors.mild-color("yellow", 600)`).
  - Three runnable examples in `examples/` show CSS, SCSS and runtime theming; the runtime one includes a Playwright snapshot check of the `?accent=` override.

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
