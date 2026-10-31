// packages/vue/src/custom-class-style.test.ts
//
// Styling contract: every component accepts a caller `class` and `style` (what `className` and
// `style` are in the React package) and merges them onto one documented element, next to the
// classes and styles it sets itself. Multi-part components additionally take a `ui` map of
// per-part classes; those are tested next to each component.
import { h, nextTick, type VNode } from "vue";
import { render } from "@testing-library/vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as M from "./index";

const CUSTOM = { class: "custom-class", style: { outlineColor: "rgb(1, 2, 3)" } };

interface Case {
  /** Renders the component with `CUSTOM` spread in. */
  create: () => VNode;
  /** Where `class` and `style` must land: the root, or the control for field-like components. */
  expected: string;
}

const items = [{ value: "a", label: "Alpha" }];
const inField = (part: VNode) => h(M.FormItem, { error: "Required" }, () => part);
const inDialog = (part: VNode) => h(M.Dialog, { open: true }, () => h(M.DialogContent, () => part));
const inTabs = (part: VNode) => h(M.Tabs, { defaultValue: "a" }, () => part);
const inAccordion = (part: VNode) =>
  h(M.Accordion, { defaultValue: "a" }, () => h(M.AccordionItem, { value: "a" }, () => part));
const inCollapsible = (part: VNode) => h(M.Collapsible, { defaultOpen: true }, () => part);

const cases: Record<string, Case> = {
  Button: { create: () => h(M.Button, CUSTOM, () => "Save"), expected: "button.mild-button" },
  Checkbox: { create: () => h(M.Checkbox, CUSTOM), expected: "[role=checkbox].mild-checkbox" },
  Switch: { create: () => h(M.Switch, CUSTOM), expected: "[role=switch].mild-switch" },
  Radio: { create: () => h(M.Radio, { ...CUSTOM, items }), expected: "[role=radiogroup]" },
  RadioGroup: {
    create: () => h(M.RadioGroup, CUSTOM, () => h(M.RadioGroupItem, { value: "a" })),
    expected: "[role=radiogroup]",
  },
  RadioGroupItem: {
    create: () => h(M.RadioGroupItem, { ...CUSTOM, value: "a" }),
    expected: "[role=radio].mild-radio",
  },
  Select: {
    create: () => h(M.Select, { ...CUSTOM, options: items }),
    expected: "[role=combobox].mild-select-trigger",
  },
  SelectRoot: { create: () => h(M.SelectRoot, CUSTOM), expected: "div.mild-select" },
  SelectTrigger: {
    create: () => h(M.SelectRoot, () => h(M.SelectTrigger, CUSTOM)),
    expected: "[role=combobox]",
  },
  SelectValue: {
    create: () => h(M.SelectRoot, () => h(M.SelectValue, { ...CUSTOM, placeholder: "x" })),
    expected: "span.mild-select-value",
  },
  SelectContent: {
    create: () => h(M.SelectRoot, () => h(M.SelectContent, CUSTOM)),
    expected: "div.mild-select-content",
  },
  SelectItem: {
    create: () =>
      h(M.SelectRoot, () => h(M.SelectContent, () => h(M.SelectItem, { ...CUSTOM, value: "a" }))),
    expected: "[role=option].mild-select-item",
  },
  Input: { create: () => h(M.Input, CUSTOM), expected: "input.mild-input" },
  InputPassword: {
    create: () => h(M.InputPassword, CUSTOM),
    expected: "input.mild-input-password",
  },
  Label: { create: () => h(M.Label, CUSTOM, () => "Name"), expected: "label.mild-label" },
  Text: { create: () => h(M.Text, CUSTOM, () => "t"), expected: "span.mild-text" },
  Box: { create: () => h(M.Box, CUSTOM, () => "b"), expected: "div.mild-box" },
  Form: { create: () => h(M.Form, CUSTOM), expected: "form.mild-form" },
  FormField: {
    create: () => h(M.FormField, { ...CUSTOM, label: "L" }, () => h(M.Input)),
    expected: "div.mild-form-item",
  },
  FormItem: { create: () => h(M.FormItem, CUSTOM), expected: "div.mild-form-item" },
  FormLabel: { create: () => inField(h(M.FormLabel, CUSTOM, () => "L")), expected: "label" },
  FormControl: {
    create: () => inField(h(M.FormControl, CUSTOM, () => h(M.Input))),
    expected: "input.mild-input",
  },
  FormDescription: {
    create: () => inField(h(M.FormDescription, CUSTOM, () => "d")),
    expected: "p.mild-form-description",
  },
  FormMessage: {
    create: () => inField(h(M.FormMessage, CUSTOM)),
    expected: "p.mild-form-message",
  },
  ThemeProvider: {
    // Renders no element of its own unless asked to with `as`.
    create: () => h(M.ThemeProvider, { ...CUSTOM, as: "section" }, () => h("i")),
    expected: "section.mild-theme-provider",
  },
  Stack: { create: () => h(M.Stack, CUSTOM), expected: "div.mild-stack" },
  Flex: { create: () => h(M.Flex, CUSTOM), expected: "div.mild-flex" },
  Grid: { create: () => h(M.Grid, CUSTOM), expected: "div.mild-grid" },
  GridItem: { create: () => h(M.GridItem, CUSTOM), expected: "div.mild-grid-item" },
  Container: { create: () => h(M.Container, CUSTOM), expected: "div.mild-container" },
  Divider: { create: () => h(M.Divider, CUSTOM), expected: "[role=separator].mild-divider" },
  AspectRatio: { create: () => h(M.AspectRatio, CUSTOM), expected: "div.mild-aspect-ratio" },
  ScrollArea: { create: () => h(M.ScrollArea, CUSTOM), expected: "div.mild-scroll-area" },
  Heading: { create: () => h(M.Heading, CUSTOM, () => "h"), expected: "h2.mild-heading" },
  Link: { create: () => h(M.Link, { ...CUSTOM, href: "/" }, () => "l"), expected: "a.mild-link" },
  Breadcrumb: {
    create: () => h(M.Breadcrumb, { ...CUSTOM, items: [{ label: "Home" }] }),
    expected: "nav.mild-breadcrumb",
  },
  BreadcrumbItem: {
    create: () => h("ol", [h(M.BreadcrumbItem, CUSTOM, () => "x")]),
    expected: "li.mild-breadcrumb-item",
  },
  BreadcrumbLink: {
    create: () => h(M.BreadcrumbLink, { ...CUSTOM, href: "/" }, () => "x"),
    expected: "a.mild-breadcrumb-link",
  },
  BreadcrumbSeparator: {
    create: () => h("ol", [h(M.BreadcrumbSeparator, CUSTOM)]),
    expected: "li.mild-breadcrumb-separator",
  },
  Code: { create: () => h(M.Code, CUSTOM, () => "c"), expected: "code.mild-code" },
  Kbd: { create: () => h(M.Kbd, CUSTOM, () => "k"), expected: "kbd.mild-kbd" },
  List: { create: () => h(M.List, CUSTOM), expected: "ul.mild-list" },
  ListItem: {
    create: () => h("ul", [h(M.ListItem, CUSTOM, () => "i")]),
    expected: "li.mild-list-item",
  },
  Textarea: { create: () => h(M.Textarea, CUSTOM), expected: "textarea.mild-textarea" },
  IconButton: {
    create: () => h(M.IconButton, { ...CUSTOM, label: "x" }, () => h("svg")),
    expected: "button.mild-icon-button",
  },
  ButtonGroup: { create: () => h(M.ButtonGroup, CUSTOM), expected: "div.mild-button-group" },
  CloseButton: { create: () => h(M.CloseButton, CUSTOM), expected: "button.mild-close-button" },
  InputGroup: {
    create: () => h(M.InputGroup, CUSTOM, () => h(M.Input)),
    expected: "div.mild-input-group",
  },
  InputAddon: {
    create: () => h(M.InputAddon, CUSTOM, () => "$"),
    expected: "div.mild-input-addon",
  },
  InputLeftAddon: {
    create: () => h(M.InputLeftAddon, CUSTOM, () => "$"),
    expected: "div.mild-input-addon--left",
  },
  InputRightAddon: {
    create: () => h(M.InputRightAddon, CUSTOM, () => "$"),
    expected: "div.mild-input-addon--right",
  },
  InputElement: {
    create: () => h(M.InputElement, CUSTOM, () => "@"),
    expected: "div.mild-input-element",
  },
  InputLeftElement: {
    create: () => h(M.InputLeftElement, CUSTOM, () => "@"),
    expected: "div.mild-input-element--left",
  },
  InputRightElement: {
    create: () => h(M.InputRightElement, CUSTOM, () => "@"),
    expected: "div.mild-input-element--right",
  },
  SegmentedControl: {
    create: () => h(M.SegmentedControl, { ...CUSTOM, items: [{ value: "a" }] }),
    expected: "[role=radiogroup].mild-segmented-control",
  },
  Toggle: { create: () => h(M.Toggle, CUSTOM, () => "B"), expected: "button.mild-toggle" },
  ToggleGroup: {
    create: () => h(M.ToggleGroup, CUSTOM, () => h(M.ToggleGroupItem, { value: "a" }, () => "A")),
    expected: "div.mild-toggle-group",
  },
  ToggleGroupItem: {
    create: () =>
      h(M.ToggleGroup, () => h(M.ToggleGroupItem, { ...CUSTOM, value: "a" }, () => "A")),
    expected: "button.mild-toggle-group__item",
  },
  Alert: { create: () => h(M.Alert, CUSTOM, () => "a"), expected: "[role=status].mild-alert" },
  Spinner: { create: () => h(M.Spinner, CUSTOM), expected: "[role=status].mild-spinner" },
  Progress: {
    create: () => h(M.Progress, { ...CUSTOM, value: 1 }),
    expected: "[role=progressbar].mild-progress",
  },
  CircularProgress: {
    create: () => h(M.CircularProgress, { ...CUSTOM, value: 1 }),
    expected: "[role=progressbar].mild-circular-progress",
  },
  Skeleton: { create: () => h(M.Skeleton, CUSTOM), expected: "div.mild-skeleton" },
  SkeletonText: { create: () => h(M.SkeletonText, CUSTOM), expected: "div.mild-skeleton-text" },
  Toast: {
    create: () => h(M.Toast, { ...CUSTOM, title: "t", duration: null }),
    expected: "[role=status].mild-toast",
  },
  ToastProvider: {
    // Renders no element of its own: the regions are teleported; `class`/`style` are not applicable.
    create: () => h(M.ToastProvider, {}, () => h("i", CUSTOM)),
    expected: "i",
  },
  ToastRegion: {
    create: () => h(M.ToastRegion, { ...CUSTOM, placement: "top" }),
    expected: "[role=region].mild-toast-region",
  },
  Dialog: {
    // The root is the overlay; `class`/`style` go there (the panel is DialogContent).
    create: () => h(M.Dialog, { ...CUSTOM, open: true }, () => h(M.DialogContent, () => "d")),
    expected: "div.mild-modal-overlay",
  },
  DialogContent: {
    create: () => h(M.Dialog, { open: true }, () => h(M.DialogContent, CUSTOM, () => "d")),
    expected: "[role=dialog].mild-modal-content",
  },
  DialogHeader: {
    create: () => inDialog(h(M.DialogHeader, CUSTOM, () => "h")),
    expected: "div.mild-modal-header",
  },
  DialogTitle: {
    create: () => inDialog(h(M.DialogTitle, CUSTOM, () => "t")),
    expected: "h2.mild-modal-title",
  },
  DialogDescription: {
    create: () => inDialog(h(M.DialogDescription, CUSTOM, () => "t")),
    expected: "p.mild-modal-description",
  },
  DialogBody: {
    create: () => inDialog(h(M.DialogBody, CUSTOM, () => "b")),
    expected: "div.mild-modal-body",
  },
  DialogFooter: {
    create: () => inDialog(h(M.DialogFooter, CUSTOM, () => "f")),
    expected: "div.mild-modal-footer",
  },
  DialogCloseButton: {
    create: () => inDialog(h(M.DialogCloseButton, CUSTOM)),
    expected: "button.mild-modal-close",
  },
  AlertDialog: {
    create: () =>
      h(M.AlertDialog, { ...CUSTOM, open: true }, () => h(M.AlertDialogContent, () => "d")),
    expected: "div.mild-modal-overlay",
  },
  AlertDialogContent: {
    create: () =>
      h(M.AlertDialog, { open: true }, () => h(M.AlertDialogContent, CUSTOM, () => "d")),
    expected: "[role=alertdialog].mild-modal-content",
  },
  AlertDialogHeader: {
    create: () => inDialog(h(M.AlertDialogHeader, CUSTOM, () => "h")),
    expected: "div.mild-modal-header",
  },
  AlertDialogTitle: {
    create: () => inDialog(h(M.AlertDialogTitle, CUSTOM, () => "t")),
    expected: "h2.mild-modal-title",
  },
  AlertDialogDescription: {
    create: () => inDialog(h(M.AlertDialogDescription, CUSTOM, () => "t")),
    expected: "p.mild-modal-description",
  },
  AlertDialogBody: {
    create: () => inDialog(h(M.AlertDialogBody, CUSTOM, () => "b")),
    expected: "div.mild-modal-body",
  },
  AlertDialogFooter: {
    create: () => inDialog(h(M.AlertDialogFooter, CUSTOM, () => "f")),
    expected: "div.mild-modal-footer",
  },
  Tooltip: {
    create: () =>
      h(M.Tooltip, { ...CUSTOM, label: "t" }, () => h("button", { type: "button" }, "b")),
    expected: "[role=tooltip].mild-tooltip",
  },
  Tabs: { create: () => h(M.Tabs, CUSTOM), expected: "div.mild-tabs" },
  TabsList: {
    create: () => inTabs(h(M.TabsList, CUSTOM)),
    expected: "[role=tablist].mild-tabs-list",
  },
  TabsTrigger: {
    create: () =>
      inTabs(h(M.TabsList, () => h(M.TabsTrigger, { ...CUSTOM, value: "a" }, () => "A"))),
    expected: "[role=tab].mild-tabs-trigger",
  },
  TabsContent: {
    create: () => inTabs(h(M.TabsContent, { ...CUSTOM, value: "a" }, () => "p")),
    expected: "[role=tabpanel].mild-tabs-content",
  },
  Accordion: { create: () => h(M.Accordion, CUSTOM), expected: "div.mild-accordion" },
  AccordionItem: {
    create: () => h(M.Accordion, () => h(M.AccordionItem, { ...CUSTOM, value: "a" }, () => "i")),
    expected: "div.mild-accordion-item",
  },
  AccordionTrigger: {
    create: () => inAccordion(h(M.AccordionTrigger, CUSTOM, () => "t")),
    expected: "button.mild-accordion-trigger",
  },
  AccordionContent: {
    create: () => inAccordion(h(M.AccordionContent, CUSTOM, () => "c")),
    expected: "[role=region].mild-accordion-content",
  },
  Collapsible: { create: () => h(M.Collapsible, CUSTOM), expected: "div.mild-collapsible" },
  CollapsibleTrigger: {
    create: () => inCollapsible(h(M.CollapsibleTrigger, CUSTOM, () => "t")),
    expected: "button.mild-collapsible-trigger",
  },
  CollapsibleContent: {
    create: () => inCollapsible(h(M.CollapsibleContent, CUSTOM, () => "c")),
    expected: "div.mild-collapsible-content",
  },
  Card: { create: () => h(M.Card, CUSTOM), expected: "div.mild-card" },
  CardHeader: { create: () => h(M.CardHeader, CUSTOM), expected: "div.mild-card-header" },
  CardTitle: { create: () => h(M.CardTitle, CUSTOM, () => "t"), expected: "h3.mild-card-title" },
  CardDescription: {
    create: () => h(M.CardDescription, CUSTOM, () => "d"),
    expected: "p.mild-card-description",
  },
  CardBody: { create: () => h(M.CardBody, CUSTOM), expected: "div.mild-card-content" },
  CardFooter: { create: () => h(M.CardFooter, CUSTOM), expected: "div.mild-card-footer" },
  CardMedia: {
    create: () => h(M.CardMedia, { ...CUSTOM, src: "x.png" }),
    expected: "img.mild-card-media",
  },
  Badge: { create: () => h(M.Badge, CUSTOM, () => "b"), expected: "span.mild-badge" },
  Tag: { create: () => h(M.Tag, CUSTOM, () => "t"), expected: "span.mild-tag" },
  TagCloseButton: { create: () => h(M.TagCloseButton, CUSTOM), expected: "button.mild-tag__close" },
  Avatar: {
    create: () => h(M.Avatar, { ...CUSTOM, name: "Ada" }),
    expected: "[role=img].mild-avatar",
  },
  AvatarGroup: {
    create: () => h(M.AvatarGroup, CUSTOM, () => h(M.Avatar, { name: "A" })),
    expected: "[role=group].mild-avatar-group",
  },
  Image: {
    create: () => h(M.Image, { ...CUSTOM, src: "x.png", alt: "x" }),
    expected: "img.mild-image",
  },
  Stat: { create: () => h(M.Stat, { ...CUSTOM, label: "l", value: 1 }), expected: "div.mild-stat" },
  Map: {
    create: () => h(M.Map, { ...CUSTOM, latitude: 48.8, longitude: 2.3, title: "Office" }),
    expected: "figure.mild-map",
  },
  StatGroup: { create: () => h(M.StatGroup, CUSTOM), expected: "div.mild-stat-group" },
  Table: { create: () => h(M.Table, CUSTOM, () => h(M.TableBody)), expected: "table.mild-table" },
  TableCaption: {
    create: () => h(M.Table, () => h(M.TableCaption, CUSTOM, () => "c")),
    expected: "caption.mild-table__caption",
  },
  TableHeader: {
    create: () => h(M.Table, () => h(M.TableHeader, CUSTOM)),
    expected: "thead.mild-table__header",
  },
  TableBody: {
    create: () => h(M.Table, () => h(M.TableBody, CUSTOM)),
    expected: "tbody.mild-table__body",
  },
  TableFooter: {
    create: () => h(M.Table, () => h(M.TableFooter, CUSTOM)),
    expected: "tfoot.mild-table__footer",
  },
  TableRow: {
    create: () => h(M.Table, () => h(M.TableBody, () => h(M.TableRow, CUSTOM))),
    expected: "tr.mild-table__row",
  },
  TableHead: {
    create: () =>
      h(M.Table, () => h(M.TableHeader, () => h(M.TableRow, () => h(M.TableHead, CUSTOM)))),
    expected: "th.mild-table__head",
  },
  TableCell: {
    create: () =>
      h(M.Table, () => h(M.TableBody, () => h(M.TableRow, () => h(M.TableCell, CUSTOM)))),
    expected: "td.mild-table__cell",
  },
  DataTable: {
    create: () => h(M.DataTable, { ...CUSTOM, columns: [{ key: "a", header: "A" }], rows: [] }),
    expected: "table.mild-table",
  },
};

let warn: ReturnType<typeof vi.fn<(...args: unknown[]) => void>>;
beforeEach(() => {
  warn = vi.fn();
  vi.spyOn(console, "warn").mockImplementation(warn);
});
afterEach(() => vi.restoreAllMocks());

describe("custom class and style", () => {
  it("covers every exported component", () => {
    const exported = Object.keys(M).filter(
      (name) => /^[A-Z]/.test(name) && typeof M[name as keyof typeof M] === "object",
    );
    // `Field` is the deprecated alias of FormField.
    expect(exported.filter((name) => name !== "Field").sort()).toEqual(Object.keys(cases).sort());
  });

  it.each(Object.entries(cases))(
    "%s merges class and style onto its documented element",
    async (_name, { create, expected }) => {
      const { container } = render({ setup: () => create });
      await nextTick();

      // Dialogs and toasts teleport to the body.
      const element =
        container.querySelector<HTMLElement>(expected) ??
        document.body.querySelector<HTMLElement>(expected);
      expect(element).not.toBeNull();
      expect(element).toHaveClass("custom-class");
      // Merged, not replaced: the component's own classes stay (ToastProvider has no element).
      if (expected !== "i") expect(element!.classList.length).toBeGreaterThan(1);
      expect(element!.style.outlineColor).toBe("rgb(1, 2, 3)");
      expect(document.body.querySelectorAll(".custom-class")).toHaveLength(1);
      expect(warn).not.toHaveBeenCalled();
    },
  );

  it("accepts class in array/object form and style as a string", () => {
    const { container } = render({
      setup: () => () =>
        h(M.Button, { class: ["a", { b: true, c: false }], style: "color: red" }, () => "x"),
    });
    const button = container.querySelector("button")!;
    expect(button).toHaveClass("mild-button", "a", "b");
    expect(button).not.toHaveClass("c");
    expect(button.style.color).toBe("red");
  });

  it("warns when ThemeProvider gets class or style without an `as` element to put them on", () => {
    render({ setup: () => () => h(M.ThemeProvider, CUSTOM, () => h("i")) });
    const messages = warn.mock.calls.map((call) => String(call[0]));
    expect(messages.some((m) => m.includes("Extraneous non-props attributes (class, style)"))).toBe(
      true,
    );
  });
});
