// @vitest-environment node
//
// packages/vue/src/ssr.test.ts
// Server-rendering contract: every component renders with `vue/server-renderer` in a Node
// environment (no `window`, no `document`) and emits honest markup before any primitive runs.
// The primitives attach on mount only, so they must not be needed for the first paint.
import { createSSRApp, h, type Component } from "vue";
import { renderToString } from "vue/server-renderer";
import { describe, expect, it } from "vitest";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDialog,
  AspectRatio,
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Breadcrumb,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DialogBody,
  DialogFooter,
  DialogHeader,
  CircularProgress,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Dialog,
  DialogContent,
  Image,
  Progress,
  Skeleton,
  SkeletonText,
  Spinner,
  Stat,
  StatGroup,
  Map,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  DataTable,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
  Toast,
  ToastProvider,
  Tooltip,
  Button,
  ButtonGroup,
  CloseButton,
  Code,
  Heading,
  IconButton,
  InputGroup,
  InputLeftAddon,
  Kbd,
  Link,
  List,
  ListItem,
  SegmentedControl,
  Textarea,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  ScrollArea,
  Stack,
  Checkbox,
  ColorModeScript,
  Form,
  FormField,
  Input,
  InputPassword,
  Label,
  Radio,
  Select,
  Switch,
  Text,
  ThemeProvider,
} from "./index";

async function render(
  component: Component,
  props: Record<string, unknown> = {},
  children?: (() => unknown) | Record<string, () => unknown>,
) {
  return renderToString(createSSRApp({ render: () => h(component, props, children) }));
}

const items = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Bravo" },
];

describe("server rendering", () => {
  it("has no window or document", () => {
    expect(typeof window).toBe("undefined");
    expect(typeof document).toBe("undefined");
  });

  it.each([
    ["Button", () => render(Button, { loading: true }, () => "Save"), ['aria-busy="true"', "Save"]],
    [
      "Button with icons",
      () =>
        render(
          Button,
          { variant: "outline", disabled: true },
          { default: () => "Next", leftIcon: () => h("i", "L"), rightIcon: () => h("i", "R") },
        ),
      ["mild-button__left-icon", "mild-button__right-icon", 'aria-disabled="true"', "disabled"],
    ],
    [
      "Checkbox",
      () => render(Checkbox, { id: "c", label: "Terms", defaultChecked: "indeterminate" }),
      ['role="checkbox"', 'aria-checked="mixed"', 'for="c"'],
    ],
    [
      "Radio",
      () => render(Radio, { items, defaultValue: "b", name: "letter" }),
      ['role="radiogroup"', 'aria-checked="true"', 'data-value="b"', 'name="letter"'],
    ],
    [
      "Select",
      () => render(Select, { options: items, defaultValue: "a", placeholder: "Pick" }),
      ['role="combobox"', 'aria-expanded="false"', 'role="listbox"', 'aria-selected="true"'],
    ],
    [
      "Input",
      () => render(Input, { error: true, modelValue: "x" }),
      ['aria-invalid="true"', 'value="x"'],
    ],
    [
      "InputPassword",
      () => render(InputPassword, { "aria-label": "Password" }),
      ['type="password"', 'aria-label="Show password"'],
    ],
    [
      "Switch",
      () => render(Switch, { id: "s", label: "Wi-Fi", defaultChecked: true }),
      ['role="switch"', 'aria-checked="true"'],
    ],
    [
      "Label",
      () => render(Label, { for: "x", required: true }, () => "Name"),
      ['for="x"', "data-required-marker"],
    ],
    [
      "Text",
      () => render(Text, { as: "p", fontSize: "lg" }, () => "Hello"),
      ["<p", "mild-text--lg"],
    ],
    [
      "Box",
      () => render(Box, { padding: "4" }, () => "Box"),
      ["mild-box", "padding:var(--mild-space-4, 1rem)"],
    ],
    [
      "Form",
      () =>
        render(Form, {}, () =>
          h(FormField, { name: "email", label: "Email", error: "Required" }, () => h(Input)),
        ),
      ["mild-form", 'role="alert"', "Required", 'name="email"'],
    ],
    [
      "ThemeProvider",
      () => render(ThemeProvider, { defaultColorMode: "dark" }, () => h(Button, () => "Themed")),
      ["mild-button"],
    ],
    ["ColorModeScript", () => render(ColorModeScript, { nonce: "n" }), ["<script", 'nonce="n"']],
    [
      "Stack",
      () => render(Stack, { gap: "2", wrap: true }, () => "s"),
      ["mild-stack--wrap", "gap:"],
    ],
    [
      "Flex",
      () => render(Flex, { as: "nav", inline: true }, () => "f"),
      ["<nav", "mild-flex--inline"],
    ],
    [
      "Grid",
      () =>
        render(Grid, { columns: { base: 1, md: 2 }, gap: "4" }, () =>
          h(GridItem, { colSpan: "full" }, () => "g"),
        ),
      ["mild-grid--md-cols-2", "mild-grid-item--col-span-full"],
    ],
    [
      "Container",
      () => render(Container, { as: "main", padding: "6" }, () => "c"),
      ["<main", "padding-left:"],
    ],
    [
      "Divider",
      () => render(Divider, { as: "hr", orientation: "vertical" }),
      ["<hr ", 'role="separator"', 'aria-orientation="vertical"'],
    ],
    [
      "Divider with label",
      () => render(Divider, { label: "OR", labelPosition: "start" }),
      ["mild-divider--label-start", "mild-divider__label", "OR"],
    ],
    [
      "AspectRatio",
      () => render(AspectRatio, { ratio: "16/9" }, () => "a"),
      ["--mild-aspect-ratio:16 / 9"],
    ],
    [
      "ScrollArea",
      () => render(ScrollArea, { maxHeight: "64" }, () => "x"),
      ['tabindex="0"', "max-height:"],
    ],
    ["Heading", () => render(Heading, { level: 1 }, () => "H"), ["<h1", "mild-heading--level-1"]],
    [
      "Link",
      () => render(Link, { href: "/", external: true }, () => "L"),
      ['href="/"', 'rel="noopener noreferrer"'],
    ],
    [
      "Breadcrumb",
      () => render(Breadcrumb, { items: [{ label: "Home", href: "/" }, { label: "Here" }] }),
      ['aria-label="Breadcrumb"', "mild-breadcrumb-separator", 'aria-current="page"'],
    ],
    [
      "Code",
      () => render(Code, { as: "pre", block: true }, () => "c"),
      ["<pre", "mild-code--block"],
    ],
    ["Kbd", () => render(Kbd, {}, () => "K"), ["<kbd"]],
    [
      "List",
      () =>
        render(List, { ordered: true, spacing: "2" }, () =>
          h(ListItem, null, { default: () => "i", icon: () => h("i") }),
        ),
      ["<ol", "mild-list-item__icon"],
    ],
    [
      "Textarea",
      () => render(Textarea, { modelValue: "hi", autoResize: true }),
      ["<textarea", "mild-textarea--auto-resize", "hi"],
    ],
    [
      "IconButton",
      () => render(IconButton, { label: "Go" }, () => h("svg")),
      ['aria-label="Go"', "mild-icon-button__icon"],
    ],
    [
      "ButtonGroup",
      () => render(ButtonGroup, { size: "sm" }, () => h(Button, () => "b")),
      ['role="group"', "mild-button--sm"],
    ],
    ["CloseButton", () => render(CloseButton), ['aria-label="Close"', "<svg"]],
    [
      "InputGroup",
      () => render(InputGroup, { size: "lg" }, () => [h(InputLeftAddon, () => "$"), h(Input)]),
      ["mild-input-group--has-left-addon", "mild-input--lg"],
    ],
    [
      "SegmentedControl",
      () =>
        render(SegmentedControl, {
          items: [{ value: "a" }, { value: "b", label: "B", disabled: true }],
          defaultValue: "a",
          name: "s",
        }),
      ['role="radiogroup"', 'aria-checked="true"', 'aria-checked="false"', 'name="s"'],
    ],
    [
      "SegmentedControl without a value",
      () => render(SegmentedControl, { items: [{ value: "a" }], name: "s" }),
      ['value=""'],
    ],
    ["Toggle", () => render(Toggle, { defaultPressed: true }, () => "B"), ['aria-pressed="true"']],
    [
      "ToggleGroup",
      () =>
        render(ToggleGroup, { defaultValue: "b" }, () =>
          h(ToggleGroupItem, { value: "b" }, () => "B"),
        ),
      ['role="group"', 'aria-pressed="true"', 'data-value="b"'],
    ],
    [
      "Alert",
      () => render(Alert, { title: "Heads up", status: "error", dismissible: true }, () => "Body"),
      ['role="alert"', "mild-alert__title", "mild-alert__dismiss"],
    ],
    ["Spinner", () => render(Spinner), ['role="status"', "Loading..."]],
    [
      "Progress",
      () => render(Progress, { value: 40, showValue: true }),
      ['aria-valuenow="40"', "--mild-progress-value:40%", "mild-progress__label"],
    ],
    ["Progress indeterminate", () => render(Progress), ['aria-busy="true"']],
    [
      "CircularProgress",
      () => render(CircularProgress, { value: 25, showValue: true }),
      ["<svg", "stroke-dasharray", "25%"],
    ],
    [
      "CircularProgress indeterminate",
      () => render(CircularProgress, { indeterminate: true }),
      ["mild-circular-progress--indeterminate"],
    ],
    ["Skeleton", () => render(Skeleton, { width: "1/2" }), ['aria-hidden="true"', "width:"]],
    ["Skeleton loaded", () => render(Skeleton, { loaded: true }, () => "Real"), ["Real"]],
    ["SkeletonText", () => render(SkeletonText, { lines: 2 }), ["mild-skeleton-text"]],
    ["SkeletonText loaded", () => render(SkeletonText, { loaded: true }, () => "Real"), ["Real"]],
    [
      "Toast",
      () =>
        render(
          Toast,
          { title: "Saved", duration: null },
          { action: () => h("a", { href: "#" }, "Undo") },
        ),
      ['role="status"', "mild-toast__action"],
    ],
    ["ToastProvider", () => render(ToastProvider, {}, () => h("i", "app")), ["<i>app</i>"]],
    [
      "Dialog (closed on the server)",
      () => render(Dialog, { open: true }, () => h(DialogContent, () => "d")),
      ["<!--"],
    ],
    [
      "AlertDialog (closed on the server)",
      () => render(AlertDialog, { open: true }, () => "d"),
      ["<!--"],
    ],
    [
      "Tooltip",
      () => render(Tooltip, { label: "Tip" }, () => h("button", { type: "button" }, "b")),
      ['role="tooltip"', "hidden"],
    ],
    [
      "Tooltip disabled",
      () =>
        render(Tooltip, { label: "Tip", disabled: true }, () =>
          h("button", { type: "button" }, "b"),
        ),
      ["<button"],
    ],
    [
      "Tabs",
      () =>
        render(Tabs, { defaultValue: "a", size: "sm" }, () => [
          h(TabsList, () => [
            h(TabsTrigger, { value: "a" }, () => "A"),
            h(TabsTrigger, { value: "b", disabled: true }, () => "B"),
          ]),
          h(TabsContent, { value: "a" }, () => "Panel"),
          h(TabsContent, { value: "b", forceMount: true }, () => "Hidden"),
        ]),
      ['role="tablist"', 'aria-selected="true"', 'role="tabpanel"', "hidden"],
    ],
    [
      "Accordion",
      () =>
        render(Accordion, { defaultValue: "a", headingLevel: 2, size: "lg" }, () => [
          h(AccordionItem, { value: "a" }, () => [
            h(AccordionTrigger, () => "A"),
            h(AccordionContent, () => "Body"),
          ]),
          h(AccordionItem, { value: "b", disabled: true }, () => [
            h(AccordionTrigger, { noIcon: true }, () => "B"),
            h(AccordionContent, { forceMount: false }, () => "Body"),
          ]),
        ]),
      ["<h2", 'aria-expanded="true"', 'role="region"', "disabled"],
    ],
    [
      "Collapsible",
      () =>
        render(Collapsible, { defaultOpen: true }, () => [
          h(CollapsibleTrigger, { noIcon: true }, () => "T"),
          h(CollapsibleContent, () => "C"),
        ]),
      ['aria-expanded="true"', "mild-collapsible-content"],
    ],
    [
      "Collapsible closed",
      () =>
        render(Collapsible, {}, () => [
          h(CollapsibleTrigger, () => "T"),
          h(CollapsibleContent, { forceMount: false }, () => "C"),
        ]),
      ['aria-expanded="false"'],
    ],
    [
      "Card",
      () =>
        render(Card, { padding: "lg" }, () => [
          h(CardHeader, () => h(CardTitle, () => "T")),
          h(CardBody, () => "B"),
        ]),
      ["mild-card-header--padding-lg", "<h3"],
    ],
    ["Badge", () => render(Badge, { dot: true }, () => "New"), ["mild-badge__dot"]],
    [
      "Card parts",
      () =>
        render(Card, {}, () => [
          h(CardDescription, () => "D"),
          h(CardFooter, { align: "between", noBorder: true, padding: "sm" }, () => "F"),
        ]),
      ["mild-card-description", "mild-card-footer--between", "mild-card-footer--padding-sm"],
    ],
    [
      "Dialog parts (rendered outside a dialog on the server)",
      () =>
        render(Box, {}, () => [
          h(DialogHeader, { noBorder: true }, () => "H"),
          h(DialogBody, { noPadding: true }, () => "B"),
          h(DialogFooter, { align: "start" }, () => "F"),
        ]),
      ["mild-modal-header--no-border", "mild-modal-body--no-padding", "mild-modal-footer--start"],
    ],
    [
      "Tag",
      () => render(Tag, { closable: true }, () => "Design"),
      ["mild-tag__close", 'aria-label="Remove"'],
    ],
    ["Avatar", () => render(Avatar, { src: "a.png", name: "Ada" }), ["<img", 'alt="Ada"']],
    [
      "Avatar fallback",
      () => render(Avatar, { name: "Ada Lovelace", status: "online" }),
      ['role="img"', "AL", "mild-avatar__badge--online"],
    ],
    [
      "AvatarGroup",
      () =>
        render(AvatarGroup, { max: 1 }, () => [h(Avatar, { name: "A" }), h(Avatar, { name: "B" })]),
      ["+1", "1 more"],
    ],
    [
      "Image",
      () => render(Image, { src: "p.jpg", alt: "P", ratio: "16/9" }),
      ["mild-image-frame--ratio", 'loading="lazy"'],
    ],
    ["Image placeholder", () => render(Image, { alt: "Missing" }), ["mild-image__fallback"]],
    [
      "Image loading placeholder",
      () => render(Image, { src: "p.jpg", alt: "P", showFallbackWhileLoading: true }),
      ["display:none", "mild-image__fallback"],
    ],
    [
      "Stat",
      () =>
        render(StatGroup, {}, () =>
          h(Stat, { label: "L", value: 1, trend: "decrease", trendValue: "3%" }),
        ),
      ["decreased by", "mild-stat__trend--decrease"],
    ],
    [
      "Map",
      () =>
        render(Map, {
          latitude: 48.8566,
          longitude: 2.3522,
          title: "Our office",
          caption: "Paris",
        }),
      [
        'class="mild-map"',
        'data-provider="openstreetmap"',
        "--mild-map-ratio:16 / 9",
        'title="Our office"',
        'loading="lazy"',
        "openstreetmap.org/export/embed.html",
        "View larger map",
        "Paris",
      ],
    ],
    [
      "Map fallback",
      () =>
        render(Map, { latitude: 0, longitude: 0, title: "Map", showLink: false, fallback: "Off" }),
      ["mild-map__fallback", 'role="img"', 'aria-label="Map"', "Off"],
    ],
    [
      "Table",
      () =>
        render(Table, { variant: "striped", stickyHeader: true }, () => [
          h(TableCaption, { placement: "bottom" }, () => "Caption"),
          h(TableHeader, () =>
            h(TableRow, () => h(TableHead, { numeric: true, sort: "ascending" }, () => "A")),
          ),
          h(TableBody, () =>
            h(TableRow, { selected: true }, () => h(TableCell, { align: "center" }, () => "a")),
          ),
          h(TableFooter, () => h(TableRow, () => h(TableCell, () => "t"))),
        ]),
      [
        "mild-table-container",
        "data-sticky-header",
        "mild-table--striped",
        "mild-table__caption--bottom",
        "mild-table__header",
        'aria-sort="ascending"',
        "mild-table__head--numeric",
        "mild-table__body",
        'aria-selected="true"',
        "mild-table__cell--center",
        "mild-table__footer",
      ],
    ],
    [
      "DataTable",
      () =>
        render(DataTable, {
          caption: "Invoices",
          columns: [
            { key: "n", header: "Name", sortable: true },
            { key: "a", header: "Amount", numeric: true },
          ],
          rows: [
            { id: "1", n: "Ada", a: 1 },
            { id: "2", n: "Bob", a: 2 },
          ],
          selectable: true,
          defaultSelectedKeys: ["2"],
          defaultSort: { key: "n", direction: "descending" },
        }),
      [
        "mild-data-table",
        "Invoices",
        'aria-sort="descending"',
        "mild-table__sort",
        'aria-checked="mixed"',
        'aria-selected="true"',
        "Bob",
      ],
    ],
    [
      "DataTable empty and loading",
      () =>
        renderToString(
          createSSRApp({
            render: () => [
              h(DataTable, { columns: [{ key: "n", header: "N" }], rows: [] }),
              h(DataTable, { columns: [{ key: "n", header: "N" }], rows: [], loading: true }),
            ],
          }),
        ),
      ["mild-data-table__empty", "No data", 'aria-busy="true"', "Loading..."],
    ],
  ] as const)("renders %s on the server", async (_name, renderComponent, expected) => {
    const html = await renderComponent();
    for (const fragment of expected) expect(html).toContain(fragment);
  });
});
