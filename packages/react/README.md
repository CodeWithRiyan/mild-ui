# @mild-ui/react

React 18/19 components for the mild-ui design system, styled by [`@mild-ui/core`](../core).

## Installation

```bash
npm install @mild-ui/react
```

`react` and `react-dom` (18 or 19) are peer dependencies.

## Quick Start

```tsx
import "@mild-ui/react/styles.css";
import { ThemeProvider, Button, Input } from "@mild-ui/react";

export default function App() {
  return (
    <ThemeProvider>
      <Input placeholder="Enter your name" />
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </ThemeProvider>
  );
}
```

`@mild-ui/react/styles.css` is the compiled stylesheet; import it once at the root of your app.

## Components

| Component        | Exports                                                                                                                                        |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Button           | `Button`                                                                                                                                       |
| ButtonGroup      | `ButtonGroup`, `useButtonGroup`                                                                                                                |
| IconButton       | `IconButton`                                                                                                                                   |
| CloseButton      | `CloseButton`                                                                                                                                  |
| Checkbox         | `Checkbox`                                                                                                                                     |
| Input            | `Input`                                                                                                                                        |
| InputGroup       | `InputGroup`, `InputLeftAddon`, `InputRightAddon`, `InputLeftElement`, `InputRightElement`, `InputAddon`, `InputElement`, `useInputGroup`      |
| Textarea         | `Textarea`                                                                                                                                     |
| InputPassword    | `InputPassword`                                                                                                                                |
| Label            | `Label`                                                                                                                                        |
| Radio            | `Radio`, `RadioGroup`, `RadioGroupItem`                                                                                                        |
| Select           | `Select`, `SelectRoot`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`                                                          |
| SegmentedControl | `SegmentedControl`                                                                                                                             |
| Switch           | `Switch`                                                                                                                                       |
| Toggle           | `Toggle`                                                                                                                                       |
| ToggleGroup      | `ToggleGroup`, `ToggleGroupItem`                                                                                                               |
| Alert            | `Alert`                                                                                                                                        |
| Spinner          | `Spinner`                                                                                                                                      |
| Progress         | `Progress`, `CircularProgress`                                                                                                                 |
| Skeleton         | `Skeleton`, `SkeletonText`                                                                                                                     |
| Toast            | `ToastProvider`, `useToast`, `Toast`, `ToastRegion`                                                                                            |
| Dialog           | `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogBody`, `DialogFooter`, `DialogCloseButton`               |
| AlertDialog      | `AlertDialog`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogBody`, `AlertDialogFooter` |
| Tooltip          | `Tooltip`                                                                                                                                      |
| Tabs             | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`                                                                                               |
| Accordion        | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`                                                                           |
| Collapsible      | `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`                                                                                      |
| Card             | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardBody`, `CardFooter`, `CardMedia`                                                    |
| Badge            | `Badge`                                                                                                                                        |
| Tag              | `Tag`, `TagCloseButton`                                                                                                                        |
| Avatar           | `Avatar`, `AvatarGroup`                                                                                                                        |
| Image            | `Image`                                                                                                                                        |
| Stat             | `Stat`, `StatGroup`                                                                                                                            |
| Table            | `Table`, `TableCaption`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`                                       |
| DataTable        | `DataTable`                                                                                                                                    |
| Map              | `Map`                                                                                                                                          |
| Text             | `Text`                                                                                                                                         |
| Box              | `Box`                                                                                                                                          |
| Form             | `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `useFormField`                                  |
| Stack            | `Stack`                                                                                                                                        |
| Flex             | `Flex`                                                                                                                                         |
| Grid             | `Grid`, `GridItem`                                                                                                                             |
| Container        | `Container`                                                                                                                                    |
| Divider          | `Divider`                                                                                                                                      |
| AspectRatio      | `AspectRatio`                                                                                                                                  |
| ScrollArea       | `ScrollArea`                                                                                                                                   |
| Heading          | `Heading`                                                                                                                                      |
| Link             | `Link`                                                                                                                                         |
| Breadcrumb       | `Breadcrumb`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbSeparator`                                                                        |
| Code             | `Code`                                                                                                                                         |
| Kbd              | `Kbd`                                                                                                                                          |
| List             | `List`, `ListItem`                                                                                                                             |

`Form` has no form-library dependency. `FormField` links the label, description and error message to
the control automatically (`for`/`aria-labelledby`, `aria-describedby`, `aria-invalid`) through
`@mild-ui/primitives/field`; validation state comes in through the `error` prop, from any source:

```tsx
import { Form, FormField, Input } from "@mild-ui/react";

<Form onSubmit={handleSubmit} noValidate>
  <FormField name="email" label="Email" description="Work address" required error={errors.email}>
    <Input type="email" />
  </FormField>
</Form>;
```

Using [react-hook-form](https://react-hook-form.com/)? See the adapter in
`storybook/react/src/examples/react-hook-form.tsx`, which the Storybook form stories use.

`Box` and `Text` are polymorphic (`as`): `<Box as="section">`, `<Text as="h1">` keep that element's
props and ref types. `Box` style props take design-token keys only (`padding="4"`,
`backgroundColor="primary-500"`, `borderRadius="lg"`), resolved to the `--mild-*` custom properties.

### Layout

The layout components follow the same rules: all are polymorphic (`as`), and every size or
spacing prop is a design token (`gap="4"`, `maxHeight="96"`), never a raw CSS value.

```tsx
import {
  AspectRatio,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  ScrollArea,
  Stack,
} from "@mild-ui/react";

<Container as="main" size="lg">
  <Stack gap="6">
    <Flex align="center" justify="space-between" wrap gap="2">
      <h1>Title</h1>
      <Flex gap="2" align="center">
        <span>React</span>
        <Divider orientation="vertical" />
        <span>Vue</span>
      </Flex>
    </Flex>
    <Divider label="Gallery" />
    <Grid columns={{ base: 1, md: 2, lg: 3 }} gap="4">
      <GridItem colSpan={{ base: 1, lg: 3 }}>Full row on large screens</GridItem>
      <AspectRatio ratio={16 / 9}>
        <img src="cover.jpg" alt="" />
      </AspectRatio>
    </Grid>
    <ScrollArea maxHeight="64" role="region" aria-label="Log">
      ...
    </ScrollArea>
  </Stack>
</Container>;
```

| Component     | Props                                                                                                                                                                               |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Stack`       | `direction` (default `column`), `gap` (default `"4"`), `align`, `justify`, `wrap`, `inline`                                                                                         |
| `Flex`        | `direction` (default `row`), `wrap`, `align`, `justify`, `gap`, `inline`                                                                                                            |
| `Grid`        | `columns` (1-12, or per breakpoint `{ base, sm, md, lg, xl, "2xl" }`), `rows`, `templateColumns`/`templateRows`, `gap`, `columnGap`, `rowGap`, `flow`, `align`, `justify`, `inline` |
| `GridItem`    | `colSpan` (1-12 or `"full"`, per breakpoint too), `rowSpan`                                                                                                                         |
| `Container`   | `size` (`sm`..`2xl` from the breakpoint scale, or `full`; default `lg`), `padding`, `centerContent`                                                                                 |
| `Divider`     | `orientation`, `variant` (`solid`/`dashed`/`dotted`), `size`, `color`, `label`, `labelPosition`, `decorative`                                                                       |
| `AspectRatio` | `ratio` (`16 / 9` or `"16/9"`, default `1`); the single child fills the box                                                                                                         |
| `ScrollArea`  | `orientation` (`vertical`/`horizontal`/`both`), `scrollbars` (`auto`/`always`/`hover`/`hidden`), `height`, `maxHeight`, `maxWidth`                                                  |

`Divider` renders `role="separator"` with `aria-orientation` (or `role="none"` when
`decorative`). `ScrollArea` is keyboard-focusable (`tabIndex={0}`) so the region can be scrolled
without a pointer; give it a `role="region"` and an `aria-label` when it holds meaningful content.

### Typography and navigation

```tsx
import { Breadcrumb, Code, Heading, Kbd, Link, List, ListItem } from "@mild-ui/react";

<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Docs", href: "/docs" }, { label: "Link" }]} />
<Heading level={1}>Link</Heading>
<Heading level={2} size="md">Smaller, still an h2</Heading>

<p>
  Install <Code>@mild-ui/react</Code>, then read the <Link href="/docs">docs</Link> or press{" "}
  <Kbd>⌘</Kbd> + <Kbd>K</Kbd>.
</p>

<List spacing="2">
  <ListItem>Bulleted by default</ListItem>
</List>;
```

| Component    | Props                                                                                                                  |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `Heading`    | `level` (1-6, picks the element **and** the default size; default `2`), `size`, `weight`, `align`, `color`, `truncate` |
| `Link`       | `href`, `underline` (`none`/`hover`/`always`, default `hover`), `external`, `plain`, `disabled`                        |
| `Breadcrumb` | `items` (`{ label, href?, current? }[]`) or composed children, `separator`, `ui`                                       |
| `Code`       | `variant` (`subtle`/`solid`/`outline`), `size`, `block`                                                                |
| `Kbd`        | `size`                                                                                                                 |
| `List`       | `ordered`, `marker`, `unstyled`, `spacing`; `ListItem` takes an `icon`                                                 |

`Heading` separates the document outline from the visual size: `level` sets the element, `size`
only the looks. `Link` is polymorphic, so a router link drops straight in
(`<Link as={RouterLink} to="/docs">`); `external` adds `target="_blank"` with
`rel="noopener noreferrer"`, and `disabled` keeps the link role while removing the `href`, taking
it out of the tab order and swallowing clicks.

`Breadcrumb` renders `nav[aria-label="Breadcrumb"] > ol`, inserts the separators itself (as
`aria-hidden` list items, so the trail is not read out between every step) and renders the last
step as `aria-current="page"` text instead of a link when it has no `href`.

### Basic input

```tsx
import {
  ButtonGroup,
  Button,
  CloseButton,
  FormField,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  SegmentedControl,
  Textarea,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
} from "@mild-ui/react";

<FormField name="website" label="Website">
  <InputGroup>
    <InputLeftAddon>https://</InputLeftAddon>
    <Input />
    <InputRightElement interactive>
      <CloseButton size="xs" label="Clear" />
    </InputRightElement>
  </InputGroup>
</FormField>
<Textarea autoResize placeholder="Your message" />

<SegmentedControl items={[{ value: "day", label: "Day" }, { value: "week", label: "Week" }]} defaultValue="day" />

<ButtonGroup attached size="sm">
  <IconButton label="Previous" icon={<ChevronLeft />} />
  <Button>1</Button>
  <IconButton label="Next" icon={<ChevronRight />} />
</ButtonGroup>

<Toggle aria-label="Mute">Mute</Toggle>
<ToggleGroup type="multiple" defaultValue={["bold"]}>
  <ToggleGroupItem value="bold" aria-label="Bold">B</ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Italic">I</ToggleGroupItem>
</ToggleGroup>;
```

| Component          | Props                                                                                                                                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Textarea`         | Same `variant`/`size`/`isDisabled`/`isReadOnly`/`isRequired`/`isInvalid` as `Input`, plus `resize` and `autoResize`                                                                                      |
| `InputGroup`       | `size` (shared with the input), `inline`; parts: `InputLeftAddon`/`InputRightAddon` (outside, flush), `InputLeftElement`/`InputRightElement` (inside; `interactive` for buttons)                         |
| `IconButton`       | `label` (required; becomes `aria-label`), `icon`, `variant`, `size`, `round`, `disabled`, `loading`                                                                                                      |
| `CloseButton`      | An `IconButton` with an X: `label` (default `"Close"`), `icon`, `size`, `variant` (default `ghost`)                                                                                                      |
| `ButtonGroup`      | `attached`, `orientation`, `fullWidth`, and `size`/`variant`/`disabled` defaults for the buttons inside                                                                                                  |
| `SegmentedControl` | `items` (`{ value, label?, disabled? }`), `value`/`defaultValue`/`onValueChange`, `name`, `size`, `orientation`, `fullWidth`, `disabled`                                                                 |
| `Toggle`           | `pressed`/`defaultPressed`/`onPressedChange`, `variant` (`ghost`/`outline`), `size`, `disabled`                                                                                                          |
| `ToggleGroup`      | `type` (`single`: `string \| null`, `multiple`: `string[]`), `value`/`defaultValue`/`onValueChange`, `attached`, `orientation`, `loop`, `variant`, `size`, `disabled`; `ToggleGroupItem` takes a `value` |

`InputGroup` can be the child of a `FormField`: the field wiring (`id`, `name`, `required`, the
label and descriptions) reaches the `Input` inside it, not the wrapper. `SegmentedControl` is a
radio group (`role="radiogroup"`, Arrow keys move and select) and `ToggleGroup` is a group of
`aria-pressed` buttons (one tab stop, Arrow/Home/End keys move focus, Space/Enter press), both
driven by `@mild-ui/primitives`.

### Feedback

```tsx
import { Alert, CircularProgress, Progress, Skeleton, Spinner, ToastProvider, useToast } from "@mild-ui/react";

<Alert status="warning" title="Unsaved changes" dismissible onDismiss={discard}>
  Your draft is kept locally.
</Alert>
<Spinner label="Loading profile" />
<Progress value={40} label="Upload" showValue />
<CircularProgress value={40} label="Storage" showValue />
<Skeleton loaded={ready}><Avatar /></Skeleton>;

function SaveButton() {
  const { toast } = useToast();
  return <Button onClick={() => toast({ title: "Saved", status: "success" })}>Save</Button>;
}
// <ToastProvider placement="bottom-right" duration={5000} max={5}> wraps the app.
```

`Alert` and `Toast` use `role="alert"` for errors and warnings and `role="status"` otherwise.
`Progress` / `CircularProgress` are `role="progressbar"` with `aria-valuenow/min/max` (omitted,
with `aria-busy`, while indeterminate). `Skeleton` is `aria-hidden`. Toasts stack per placement
(oldest dropped beyond `max`), auto-dismiss after `duration` **but pause while hovered or while
anything inside has focus**, and have a real close button in the tab order.

### Overlay

```tsx
import { Dialog, DialogBody, DialogCloseButton, DialogContent, DialogFooter, DialogHeader, DialogTitle, Tooltip } from "@mild-ui/react";

<Tooltip label="Opens the editor">
  <Button onClick={() => setOpen(true)}>Edit</Button>
</Tooltip>
<Dialog open={open} onOpenChange={setOpen} size="md">
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogCloseButton />
    </DialogHeader>
    <DialogBody>...</DialogBody>
    <DialogFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

`Dialog` follows the WAI-ARIA modal dialog pattern: focus moves into the dialog (`initialFocusRef`,
else the first tabbable element) and is trapped, Escape closes it, the page scroll is locked, and
focus returns to the trigger (`finalFocusRef` to override) when it closes. Dialogs nest: Escape
closes the topmost one only. `AlertDialog` is `role="alertdialog"`, ignores overlay clicks and
focuses `leastDestructiveRef` first. `Tooltip` links its child through `aria-describedby`, shows
on hover (after `openDelay`) and on focus, and hides on Escape.

### Disclosure

```tsx
<Tabs defaultValue="overview" activation="automatic">
  <TabsList aria-label="Account">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="billing">Billing</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
  <TabsContent value="billing">...</TabsContent>
</Tabs>

<Accordion type="single" collapsible defaultValue="shipping">
  <AccordionItem value="shipping">
    <AccordionTrigger>Shipping</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
</Accordion>

<Collapsible>
  <CollapsibleTrigger>Advanced</CollapsibleTrigger>
  <CollapsibleContent>...</CollapsibleContent>
</Collapsible>
```

`Tabs` is one tab stop (Arrow keys move, Home/End jump; `activation="manual"` selects with
Enter/Space). `Accordion` renders `h3 > button[aria-expanded]` headers (`headingLevel` to change)
and `role="region"` panels; Arrow Up/Down move between headers. `Collapsible` is a single
disclosure button with `aria-expanded` / `aria-controls`.

### Data display

```tsx
import { Avatar, AvatarGroup, Badge, Card, CardBody, CardFooter, CardHeader, CardTitle, Image, Map, Stat, Tag } from "@mild-ui/react";

<Card as="article" variant="outlined">
  <Image src="/cover.jpg" alt="Cover" ratio="16/9" fallbackSrc="/placeholder.jpg" />
  <CardHeader>
    <CardTitle>mild-ui</CardTitle>
    <Badge colorScheme="success" dot>Active</Badge>
  </CardHeader>
  <CardBody>
    <Tag onClose={() => remove("design")}>Design</Tag>
    <Stat label="Stars" value="1,204" trend="increase" trendValue="12%" />
  </CardBody>
  <CardFooter>
    <AvatarGroup max={3} size="sm">
      <Avatar name="Ada Lovelace" src="/ada.jpg" />
      <Avatar name="Grace Hopper" />
    </AvatarGroup>
  </CardFooter>
</Card>
<Map latitude={48.8566} longitude={2.3522} zoom={13} title="Office in Paris" />;
```

| Component     | Props                                                                                                                            |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `Card`        | `variant` (`default`/`outlined`/`elevated`/`filled`), `padding` (shared with the parts), `interactive`, `disabled`, `as`         |
| `Badge`       | `variant` (`subtle`/`solid`/`outline`), `colorScheme`, `size`, `pill`, `dot`, `as`                                               |
| `Tag`         | Same looks as `Badge`, plus `icon`, `disabled` and `onClose` (renders a keyboard-reachable remove button named "Remove <label>") |
| `Avatar`      | `src`, `name` (alt text + initials), `size` (`xs`..`2xl`), `shape`, `status`, `bordered`, `fallback`                             |
| `AvatarGroup` | `max` (the rest become "+N"), `size`, `overlap` (spacing token)                                                                  |
| `Image`       | `alt` (required), `lazy` (default `true`: `loading="lazy"`), `fallbackSrc` then `fallback` on error, `ratio`, `fit`, `radius`    |
| `Stat`        | `label`, `value`, `helpText`, `trend` (`increase`/`decrease`, announced in words), `trendValue`, `size`; `StatGroup`             |
| `Map`         | `latitude`, `longitude`, `zoom`, `title` (required, names the iframe), `marker`, `ratio`, `lazy`, `showLink`, `src`, `fallback`  |

`Avatar` falls back to the initials (or a person icon) while the picture loads and when it fails;
without a picture it is `role="img"` named by `name`. `Image` tries `fallbackSrc` first and then
renders `fallback` (a placeholder glyph by default); with `ratio` it fills a fixed-ratio frame.
`Map` embeds OpenStreetMap (no key, no script) with a link to the full map; pass `src` for another
provider or `fallback` to render something else without loading the embed.

### Table and DataTable

```tsx
import { DataTable, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@mild-ui/react";

<Table variant="striped" size="sm" hoverable stickyHeader>
  <TableHeader>
    <TableRow>
      <TableHead>Customer</TableHead>
      <TableHead numeric sort="ascending">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow selected>
      <TableCell>Ada Lovelace</TableCell>
      <TableCell numeric>$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>

<DataTable
  caption="Invoices"
  columns={[
    { key: "customer", header: "Customer", sortable: true },
    { key: "amount", header: "Amount", numeric: true, sortable: true },
  ]}
  rows={invoices}
  defaultSort={{ key: "amount", direction: "descending" }}
  selectable
  onSelectionChange={setSelected}
/>;
```

| Component   | Props                                                                                                                                                                                                                                                                                                                                                                |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Table`     | `variant` (`simple`/`striped`/`outline`), `size`, `hoverable`, `stickyHeader`, `ui.container`; parts: `TableCaption` (`placement`), `TableHeader`/`TableBody`/`TableFooter`, `TableRow` (`selected` -> `aria-selected`), `TableHead` (`align`, `numeric`, `sort` -> `aria-sort`, `scope`), `TableCell` (`align`, `numeric`)                                          |
| `DataTable` | `columns` (`key`, `header`, `sortable`, `sortValue`, `numeric`, `align`, `width`), `rows`, `rowKey`, `caption`, `sort`/`defaultSort`/`onSortChange`, `selectable`, `selectedKeys`/`defaultSelectedKeys`/`onSelectionChange`, `selectionLabel`, `selectAllLabel`, `emptyMessage`, `loading`/`loadingMessage`, `renderCell`, `ui` (`container`, `row`, `head`, `cell`) |

`Table` scrolls horizontally inside `.mild-table-container` and keeps the header visible with
`stickyHeader`. `DataTable` follows the APG sortable table: each sortable header is a real
`<button>` inside a `<th aria-sort>` (ascending first, then descending), rows sort client-side with
`sortRows` (numbers numerically, strings naturally, nullish last, stable), and `selectable` adds a
`Checkbox` per row plus a tri-state select-all header; selected rows get `aria-selected`. An empty
`rows` array shows `emptyMessage` across every column, `loading` marks the table `aria-busy` and
shows a `Spinner` labelled `loadingMessage`.

### Behaviour comes from `@mild-ui/primitives`

`Checkbox`, `Switch`, `Radio`/`RadioGroup`, `SegmentedControl`, `Select`, `ToggleGroup`, `Tabs`, `Accordion`, `Dialog`, `Tooltip`, `Toast` and the `Form` field wiring do not implement their own roles, `aria-*` attributes or keyboard handling. They bind the framework-agnostic factories in [`@mild-ui/primitives`](../primitives) (`createCheckbox`, `createSwitch`, `createRadioGroup`, `createListbox`, `createToggleGroup`, `createTabs`, `createAccordion`, `createDialog`, `createTooltip`, `createToastTimer`, `createField`) to their DOM through the `useMachine` hook, so the behaviour has a single source of truth and the React layer only renders and maps props.

```tsx
import { useMachine } from "@mild-ui/react";
import { createSwitch } from "@mild-ui/primitives/switch";

function MySwitch({ checked, onChange }: { checked: boolean; onChange: (next: boolean) => void }) {
  const { ref } = useMachine(
    (element: HTMLSpanElement, options) => createSwitch({ element, ...options }),
    { checked, onChange },
    (instance, options) => instance.setChecked(options.checked),
  );
  return <span ref={ref} role="switch" aria-checked={checked} />;
}
```

`useMachine(create, options, sync?, deps?)` creates the primitive when the element mounts, destroys it on unmount, forwards callbacks to the latest render, and runs `sync` after every render (and after any callback) so the primitive follows your props.

### Icons come through props

The package ships no icon library. Each component that shows a glyph has a small inline SVG default and a prop to replace it:

| Component                                | Props                       |
| ---------------------------------------- | --------------------------- |
| `Checkbox`                               | `icon`, `indeterminateIcon` |
| `RadioGroupItem`                         | `indicator`                 |
| `Switch`                                 | `thumbIcon`                 |
| `Select`                                 | `icon`, `itemIndicator`     |
| `SelectItem`                             | `indicator`                 |
| `InputPassword`                          | `visibleIcon`, `hiddenIcon` |
| `IconButton`                             | `icon` (required)           |
| `CloseButton`                            | `icon`                      |
| `Alert`, `Toast`                         | `icon` (`null` for none)    |
| `AccordionTrigger`, `CollapsibleTrigger` | `icon`                      |
| `Tag`, `TagCloseButton`                  | `icon`                      |
| `Avatar`, `Image`, `Map`                 | `fallback`                  |

```tsx
<Checkbox label="Done" icon={<MyCheck />} />
<Select options={options} icon={<MyChevron />} itemIndicator={<MyCheck />} />
```

`Checkbox`, `Switch` and `RadioGroupItem` render a `<span>` with the appropriate role rather than a `<button>`, so a forwarded `ref` is an `HTMLSpanElement`. Give them a `name` and they submit through a hidden input like a native control.

Live examples for every component are in the [React Storybook](https://codewithriyan.github.io/mild-ui/react/).

## Server rendering, Next.js and the App Router

Every component renders with `react-dom/server` and hydrates without a warning; the package's
own test suite proves it for each component and for a whole page (`src/ssr.test.tsx`). The
rules that make this true, should you build on top of the components:

- Browser state (storage, `matchMedia`, the DOM) is read in effects, never during render.
- Browser-only UI (portals: `Dialog`, `AlertDialog`, the toast regions) mounts after hydration
  through the exported `useHydrated()` hook, so the server HTML and the first client render agree.
- `ThemeProvider` renders `defaultColorMode` on the server and applies the stored choice after
  mount; `ColorModeScript` paints it before hydration so nothing flashes.

With the **Next.js App Router**, `@mild-ui/react` is a Client Component boundary: every module
starts with `"use client"`, so Server Components can render any component (serializable props
only) and the result is server-rendered and hydrated. Handlers and hooks (`useToast`,
`useColorMode`) belong in your own Client Components. Put `suppressHydrationWarning` on `<html>`
when you use `ColorModeScript` (it changes `data-theme` before React hydrates). A complete app
lives in [`templates/next-app-router`](../../templates/next-app-router).

## Bundle size

The package ships one file per module (`dist/components/Button/Button.mjs`, ...) and declares
its JavaScript side-effect free, so a bundler keeps only the components you import:
`Button` costs about 1.2 KB gzipped, the whole library about 30 KB, the compiled CSS about
29 KB. Every export has a gzip budget in [`size-budget.json`](../../size-budget.json), checked in
CI with `pnpm size`.

## Theming

Theme and color mode are one API: `ThemeProvider` owns them, `useTheme()` returns everything and
`useColorMode()` returns the color-mode part of the same context.

```tsx
import { ColorModeScript, ThemeProvider, useColorMode, Button } from "@mild-ui/react";

function ColorModeToggle() {
  const { resolvedColorMode, toggleColorMode, setColorMode, isSystem } = useColorMode();
  return (
    <>
      <Button onClick={toggleColorMode}>{resolvedColorMode === "light" ? "Dark" : "Light"}</Button>
      <Button variant="ghost" onClick={() => setColorMode("system")} disabled={isSystem}>
        Follow the OS
      </Button>
    </>
  );
}

export function App() {
  return (
    <ThemeProvider defaultColorMode="system">
      <ColorModeToggle />
    </ThemeProvider>
  );
}
```

`ThemeProvider` props:

| Prop                | Type                            | Description                                                                 |
| ------------------- | ------------------------------- | --------------------------------------------------------------------------- |
| `theme`             | `Partial<ThemeConfig>`          | Overrides merged into the default theme and written as `--mild-*` variables |
| `defaultColorMode`  | `"light" \| "dark" \| "system"` | Initial mode when nothing is stored (uncontrolled). Default `"system"`      |
| `colorMode`         | `"light" \| "dark" \| "system"` | Controlled mode; pair with `onColorModeChange`                              |
| `onColorModeChange` | `(mode) => void`                | Called whenever the user changes the mode                                   |
| `storageKey`        | `string \| null`                | `localStorage` key the mode is persisted under; `null` disables persistence |
| `cssVarPrefix`      | `string`                        | Prefix of the generated custom properties                                   |

`useTheme()` / `useColorMode()` return `colorMode` (chosen), `resolvedColorMode` (`"system"`
resolved against the OS), `systemColorMode` (the OS preference, followed live), `setColorMode`,
`toggleColorMode` and the `isDark` / `isLight` / `isSystem` flags; `useTheme()` adds `theme`.

The resolved mode is written to `<html data-theme="light|dark">` (which the core stylesheet keys
on) and to the `color-scheme` style, so native controls follow too.

### No flash of the wrong mode

Render `ColorModeScript` in `<head>` (before your stylesheet) so the stored mode is applied
before the first paint:

```tsx
// Next.js app/layout.tsx, Remix root, ...
<head>
  <ColorModeScript />
</head>
```

For a plain `index.html` (Vite, Astro, ...) inline `getColorModeScript()`:

```html
<script>
  (function () {
    try {
      var k = "mild-ui-color-mode",
        d = "system"; /* ... output of getColorModeScript() ... */
    } catch (e) {}
  })();
</script>
```

Both take `storageKey` / `defaultColorMode` and must match the provider's.

Every theme value is also a CSS custom property (for example `--mild-color-primary-500`), so it
can be overridden from plain CSS.

## License

[MIT](./LICENSE)
