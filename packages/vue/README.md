# @mild-ui/vue

Vue 3 components for the mild-ui design system, styled by [`@mild-ui/core`](../core) and driven by [`@mild-ui/primitives`](../primitives).

- The only runtime dependency is `@mild-ui/primitives`: every interactive behaviour (roles, `aria-*`, keyboard handling) comes from the same framework-agnostic primitives the React package uses, so both packages render the same DOM for the same props.
- Every component ships with a test file (coverage is enforced at 90% per file for lines, branches, functions and statements), the shared [`@mild-ui/test-cases`](../test-cases) contract, WAI-ARIA keyboard tests for the interactive ones, and an axe-core check in the light and the dark theme.
- Tested on the committed Vue version and on `vue@latest` (`pnpm test:vue:matrix`); supports Vue 3.3 and newer.

## Installation

```bash
npm install @mild-ui/vue @mild-ui/core
```

`vue` (3.3 or newer) is a peer dependency.

## Quick Start

```vue
<script setup lang="ts">
import { ref } from "vue";
import "@mild-ui/core/mild-ui.css";
import { ThemeProvider, Button, Input } from "@mild-ui/vue";

const name = ref("");
</script>

<template>
  <ThemeProvider>
    <Input v-model="name" placeholder="Enter your name" />
    <Button variant="primary" size="lg">Get Started</Button>
  </ThemeProvider>
</template>
```

## Components

| Component        | Exports                                                                                                                                        | Behaviour from                     |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Button           | `Button`                                                                                                                                       |                                    |
| Checkbox         | `Checkbox`                                                                                                                                     | `@mild-ui/primitives/checkbox`     |
| Radio            | `Radio`, `RadioGroup`, `RadioGroupItem`, `useRadioGroup`                                                                                       | `@mild-ui/primitives/radio-group`  |
| Select           | `Select`, `SelectRoot`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `useSelectContext`                                      | `@mild-ui/primitives/listbox`      |
| Input            | `Input`                                                                                                                                        |                                    |
| InputPassword    | `InputPassword`                                                                                                                                |                                    |
| Switch           | `Switch`                                                                                                                                       | `@mild-ui/primitives/switch`       |
| Label            | `Label`                                                                                                                                        |                                    |
| Text             | `Text`                                                                                                                                         |                                    |
| Box              | `Box`                                                                                                                                          |                                    |
| Form             | `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `useFormField`                                  | `@mild-ui/primitives/field`        |
| Theme            | `ThemeProvider`, `useTheme`, `useColorMode`, `ColorModeScript`, `getColorModeScript`                                                           |                                    |
| Stack            | `Stack`                                                                                                                                        |                                    |
| Flex             | `Flex`                                                                                                                                         |                                    |
| Grid             | `Grid`, `GridItem`                                                                                                                             |                                    |
| Container        | `Container`                                                                                                                                    |                                    |
| Divider          | `Divider`                                                                                                                                      |                                    |
| AspectRatio      | `AspectRatio`, `toCssAspectRatio`                                                                                                              |                                    |
| ScrollArea       | `ScrollArea`                                                                                                                                   |                                    |
| Heading          | `Heading`                                                                                                                                      |                                    |
| Link             | `Link`                                                                                                                                         |                                    |
| Breadcrumb       | `Breadcrumb`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbSeparator`                                                                        |                                    |
| Code             | `Code`                                                                                                                                         |                                    |
| Kbd              | `Kbd`                                                                                                                                          |                                    |
| List             | `List`, `ListItem`                                                                                                                             |                                    |
| Textarea         | `Textarea`                                                                                                                                     |                                    |
| IconButton       | `IconButton`                                                                                                                                   |                                    |
| ButtonGroup      | `ButtonGroup`, `useButtonGroup`                                                                                                                |                                    |
| CloseButton      | `CloseButton`                                                                                                                                  |                                    |
| InputGroup       | `InputGroup`, `InputAddon`, `InputLeftAddon`, `InputRightAddon`, `InputElement`, `InputLeftElement`, `InputRightElement`, `useInputGroup`      |                                    |
| SegmentedControl | `SegmentedControl`                                                                                                                             | `@mild-ui/primitives/radio-group`  |
| Toggle           | `Toggle`                                                                                                                                       |                                    |
| ToggleGroup      | `ToggleGroup`, `ToggleGroupItem`, `useToggleGroup`                                                                                             | `@mild-ui/primitives/toggle-group` |
| Alert            | `Alert`                                                                                                                                        |                                    |
| Spinner          | `Spinner`                                                                                                                                      |                                    |
| Progress         | `Progress`, `CircularProgress`                                                                                                                 |                                    |
| Skeleton         | `Skeleton`, `SkeletonText`                                                                                                                     |                                    |
| Toast            | `ToastProvider`, `useToast`, `Toast`, `ToastRegion`                                                                                            | `@mild-ui/primitives/toast`        |
| Dialog           | `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogBody`, `DialogFooter`, `DialogCloseButton`               | `@mild-ui/primitives/dialog`       |
| AlertDialog      | `AlertDialog`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogBody`, `AlertDialogFooter` | `@mild-ui/primitives/dialog`       |
| Tooltip          | `Tooltip`                                                                                                                                      | `@mild-ui/primitives/tooltip`      |
| Tabs             | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`                                                                                               | `@mild-ui/primitives/tabs`         |
| Accordion        | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`                                                                           | `@mild-ui/primitives/accordion`    |
| Collapsible      | `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`                                                                                      |                                    |
| Card             | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardBody`, `CardFooter`, `CardMedia`                                                    |                                    |
| Badge            | `Badge`                                                                                                                                        |                                    |
| Tag              | `Tag`, `TagCloseButton`                                                                                                                        |                                    |
| Avatar           | `Avatar`, `AvatarGroup`                                                                                                                        |                                    |
| Image            | `Image`                                                                                                                                        |                                    |
| Stat             | `Stat`, `StatGroup`                                                                                                                            |                                    |
| Map              | `Map`                                                                                                                                          |                                    |
| Table            | `Table`, `TableCaption`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`                                       |                                    |
| DataTable        | `DataTable`                                                                                                                                    | `Checkbox` (selection)             |

Form controls support `v-model` (`modelValue` / `update:modelValue`) and an uncontrolled `default*` prop; every user change is also emitted as `change`. Live examples are in the [Vue Storybook](https://codewithriyan.github.io/mild-ui/vue/).

### Custom class and style

Every component takes a caller `class` and `style` (Vue's spelling of React's `className` and `style`) and merges them with its own, on one documented element. `class` accepts strings, arrays and object maps; `style` accepts strings and objects. `src/custom-class-style.test.ts` enforces this for every export.

| Component                                                                                         | `class` / `style` land on                                                               |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Button, Input, Label, Text, Box, Form, FormItem, FormDescription, FormMessage, and the layout set | the root element                                                                        |
| Checkbox, Switch, RadioGroupItem                                                                  | the control (`[role=checkbox]`, `[role=switch]`, `[role=radio]`), not the field wrapper |
| Radio, RadioGroup                                                                                 | the `[role=radiogroup]` element                                                         |
| Select                                                                                            | the trigger button (`[role=combobox]`)                                                  |
| InputPassword                                                                                     | the `<input>`                                                                           |
| Table, DataTable                                                                                  | the `<table>`, not the scroll container (`ui.container`)                                |
| FormField                                                                                         | the field wrapper (`.mild-form-item`)                                                   |
| FormLabel, FormControl                                                                            | the label element / the control                                                         |
| ThemeProvider                                                                                     | renders no element by default; `as="div"` adds a root that takes them                   |

Multi-part components also take a `ui` map of extra classes per part:

| Component          | `ui` parts                                               |
| ------------------ | -------------------------------------------------------- |
| Checkbox           | `container`, `checkbox`, `indicator`, `label`            |
| Switch             | `container`, `switch`, `thumb`, `label`                  |
| Radio / RadioGroup | `container`, `items` (every radio rendered from `items`) |
| RadioGroupItem     | `container`, `radio`, `indicator`, `label`               |
| Select             | `root`, `trigger`, `value`, `icon`, `content`, `item`    |
| SelectTrigger      | `icon`                                                   |
| InputPassword      | `container`, `input`, `buttonIcon`                       |
| Label              | `asterisk`                                               |
| FormField          | `label`, `control`, `description`, `message`             |
| Table              | `container`                                              |
| DataTable          | `container`, `row`, `head`, `cell`                       |

```vue
<template>
  <Checkbox class="my-checkbox" :style="{ '--mild-color-accent': 'rebeccapurple' }" label="Terms" />
  <Select :options="options" :ui="{ trigger: 'w-full', item: 'font-medium' }" />
  <FormField label="Email" :ui="{ label: 'sr-only' }"><Input /></FormField>
</template>
```

### Layout

The layout components are polymorphic (`as`) and take design tokens only for spacing and sizes, like `Box`: `gap="4"`, `padding="6"`, `max-height="96"`, `width="1/2"`. `Grid` columns and `GridItem` spans can be set per breakpoint (`:columns="{ base: 1, md: 2, lg: 3 }"`). `Divider` renders `role="separator"` with `aria-orientation`, takes a `label` (prop or slot) on the line, and `decorative` hides it from assistive technology (use it inside lists). `ScrollArea` is keyboard-focusable and ships themed, slim scrollbars (`auto` / `always` / `hover` / `hidden`).

```vue
<script setup lang="ts">
import {
  AspectRatio,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  ScrollArea,
  Stack,
} from "@mild-ui/vue";
</script>

<template>
  <Container as="main" size="md">
    <Stack gap="6">
      <Grid :columns="{ base: 1, md: 3 }" gap="4">
        <GridItem :col-span="{ base: 1, md: 2 }">
          <AspectRatio ratio="16/9"><img src="/cover.jpg" alt="Cover" /></AspectRatio>
        </GridItem>
        <ScrollArea max-height="64" role="region" aria-label="Notes">...</ScrollArea>
      </Grid>
      <Divider label="OR" />
      <Flex justify="flex-end" gap="2"><Button>Save</Button></Flex>
    </Stack>
  </Container>
</template>
```

### Forms without a form library

`FormField` wires a control to its label, description and error message on the DOM (`for` / `aria-labelledby`, `aria-describedby`, `aria-invalid`). Validation state comes in through props, so any form library - or none - can drive it:

```vue
<script setup lang="ts">
import { computed, ref } from "vue";
import { Form, FormField, Input, Checkbox, Select, Button } from "@mild-ui/vue";

const email = ref("");
const submitted = ref(false);
const emailError = computed(() =>
  submitted.value && !email.value.includes("@") ? "Enter a valid email" : undefined,
);
</script>

<template>
  <Form novalidate @submit.prevent="submitted = true">
    <FormField name="email" label="Email" description="Work address" :error="emailError">
      <Input v-model="email" type="email" />
    </FormField>
    <FormField name="country" label="Country">
      <Select :options="[{ value: 'mx', label: 'Mexico' }]" placeholder="Pick one" />
    </FormField>
    <FormField name="terms" label="I accept the terms" required>
      <Checkbox />
    </FormField>
    <Button type="submit">Sign up</Button>
  </Form>
</template>
```

`FormItem`, `FormLabel`, `FormControl`, `FormDescription` and `FormMessage` are the same field composed by hand; `useFormField()` exposes the generated ids for custom parts.

### Keyboard support

The interactive components follow the WAI-ARIA Authoring Practices patterns of their primitives: Checkbox (Space, tri-state), Radio group and SegmentedControl (roving tabindex, Arrow keys, Space), Switch (Space and Enter), Select (a select-only combobox: Arrow/Enter/Space open it, then Arrow/Home/End, typeahead, Enter/Space select, Escape and Tab close) and ToggleGroup (`aria-pressed` items, one tab stop, Arrow/Home/End move without pressing).

### Feedback, overlay, disclosure and data display

- `Alert` (`role="alert"` for errors/warnings, `status` otherwise; `dismissible` emits `dismiss`), `Spinner` (visually hidden `label`), `Progress` / `CircularProgress` (`role="progressbar"`; indeterminate without a `value`), `Skeleton` / `SkeletonText` (render their slot once `loaded`).
- `ToastProvider` + `useToast()`: `toast({ title, description, status, duration, action, icon, placement })` returns an id; `update`, `dismiss`, `dismissAll`. Regions teleport to `<body>`; the auto-dismiss pauses while hovered or focused.
- `Dialog` (`v-model:open`): teleported overlay + panel, focus trap, scroll lock, Escape, return focus; `initialFocus` / `finalFocus` take an element or a getter (`:initial-focus="() => input"`), so template refs resolve when the dialog opens. `AlertDialog` is `role="alertdialog"` with `leastDestructive`.
- `Tooltip` wraps exactly one child (element or component) and describes it through `aria-describedby`; `Tabs` (`v-model`, `activation`), `Accordion` (`type`, `v-model`, `headingLevel`), `Collapsible` (`v-model:open`).
- `Card` parts share the card's `padding`; `Tag`'s close button is named "Remove <label>"; `Avatar` falls back to initials, `AvatarGroup` shows "+N" beyond `max`; `Image` loads lazily and falls back to `fallbackSrc`, then the `fallback` slot; `Stat` announces its trend in words.
- `Map` embeds OpenStreetMap (no key, no script) in a fixed-ratio `figure` named by `title` (required), with a link to the full map; `src` embeds another provider, `fallback` (prop or slot) renders something else without loading the embed, `caption` (prop or slot) sits next to the link. `boundingBox`, `openStreetMapEmbedUrl` and `openStreetMapUrl` are exported.
- `Table` (`variant`, `size`, `hoverable`, `stickyHeader`) scrolls horizontally inside `.mild-table-container`; compose `TableCaption`, `TableHeader`/`TableBody`/`TableFooter`, `TableRow` (`selected` -> `aria-selected`), `TableHead` (`align`, `numeric`, `sort` -> `aria-sort`, `scope`) and `TableCell`.
- `DataTable` renders `columns` + `rows` and follows the APG sortable table: each sortable header is a `<button>` in a `<th aria-sort>` (ascending first, then descending; `v-model:sort`, `defaultSort`), rows sort client-side with `sortRows` (numbers numerically, strings naturally, nullish last, stable). `selectable` adds a `Checkbox` per row and a tri-state select-all header (`v-model:selectedKeys`, `defaultSelectedKeys`, `rowKey`, `selectionLabel`, `selectAllLabel`). `emptyMessage` spans every column when `rows` is empty; `loading` marks it `aria-busy` with a `Spinner` labelled `loadingMessage`. Customise cells with the `cell` slot (`{ row, column, index, value }`) or `renderCell`.

```vue
<DataTable
  caption="Invoices"
  :columns="[
    { key: 'customer', header: 'Customer', sortable: true },
    { key: 'amount', header: 'Amount', numeric: true, sortable: true },
  ]"
  :rows="invoices"
  :default-sort="{ key: 'amount', direction: 'descending' }"
  selectable
  v-model:selected-keys="selected"
>
  <template #cell="{ column, value }">
    <Badge v-if="column.key === 'status'">{{ value }}</Badge>
    <template v-else>{{ value }}</template>
  </template>
</DataTable>
```

### Typography, navigation and inputs

- `Heading`: `level` picks the element (`h1`..`h6`) and the default size; `size` restyles it independently, `as="div"` drops it from the outline.
- `Link`: `underline` (`none`/`hover`/`always`), `external` (adds `target="_blank"` + `rel="noopener noreferrer"`), `plain`, `disabled` (inert, still a link). Pass a router component with `as` (`<Link :as="RouterLink" to="/docs">`).
- `Breadcrumb`: `nav[aria-label] > ol` with `aria-hidden` separators inserted automatically and `aria-current="page"` on the last step; use `items` or compose `BreadcrumbItem`/`BreadcrumbLink`. The `separator` slot takes rich content.
- `Code` (inline or `block`), `Kbd`, `List`/`ListItem` (`ordered`, `marker`, `unstyled`, token `spacing`, per-item `icon` slot).
- `Textarea`: the `Input` variants, sizes and states, plus `resize` and `autoResize`; `v-model`.
- `ButtonGroup` hands `size`, `variant` and `disabled` to the `Button`s and `IconButton`s inside it (their own props win); `attached` joins them into one bar. `IconButton` needs a `label` (its accessible name) and shows the default slot as an `aria-hidden` glyph; `CloseButton` is a ghost IconButton with an X.
- `InputGroup` shares its `size` with the `Input` inside, detects `InputLeftAddon`/`InputRightAddon`/`InputLeftElement`/`InputRightElement` children, and can be the child of a `FormField` (the field wiring passes through to the input).
- `SegmentedControl` is a radio group drawn as one bar (`items`, `v-model`, `name` for form submission); `Toggle` is an `aria-pressed` button (`v-model:pressed`); `ToggleGroup` presses one (`type="single"`, `v-model` is `string | null`) or many (`type="multiple"`, `string[]`) `ToggleGroupItem`s.

## Theming

```vue
<script setup lang="ts">
import { ThemeProvider, useColorMode } from "@mild-ui/vue";
</script>
```

`ThemeProvider` props:

| Prop               | Type                            | Description                                                                                                  |
| ------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `defaultColorMode` | `"light" \| "dark" \| "system"` | Initial mode when nothing is stored (default `"system"`)                                                     |
| `colorMode`        | `"light" \| "dark" \| "system"` | Controlled mode; pair with `v-model:colorMode`                                                               |
| `theme`            | `Partial<ThemeConfig>`          | Overrides merged into the default theme and applied as `--mild-*` custom properties                          |
| `storageKey`       | `string \| null`                | `localStorage` key the mode is persisted under (default `"mild-ui-color-mode"`); `null` disables persistence |
| `cssVarPrefix`     | `string`                        | Prefix of the generated custom properties (default `"mild"`)                                                 |

The resolved mode is written to `<html data-theme="light|dark">`, which the core stylesheet keys on. `useTheme()` returns the merged theme plus the color-mode API; `useColorMode()` returns just the latter (`colorMode`, `resolvedColorMode`, `systemColorMode`, `setColorMode`, `toggleColorMode`, `isDark`, `isLight`, `isSystem`, all reactive). The default slot receives the same object. Put `<script>` with `getColorModeScript()` in your document's `<head>` to apply the stored mode before the first paint.

## Testing against Vue versions

```bash
pnpm test:vue:matrix            # committed version, then vue@latest
node scripts/test-vue-matrix.mjs 3.3   # any other version or range
```

## License

[MIT](./LICENSE)
