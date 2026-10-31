// packages/react/src/ssr.test.tsx
//
// Server rendering + hydration contract, for every component. This is what frameworks such as
// Next.js (App Router), Remix or Astro do with the library: render the tree to HTML on the
// server, then hydrate that exact HTML in the browser. A mismatch (text, attributes, an element
// that only exists on one side) surfaces as a React warning, and hydration recovers by
// re-rendering the subtree on the client - slow, and a sign something reads browser state
// during render. This suite fails on any such warning, for each component and for the full
// catalogue rendered together.
import * as React from "react";
import { renderToString } from "react-dom/server";
import { hydrateRoot, type Root } from "react-dom/client";
import { act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as UI from "./index";

/** One representative element per public component (and its compound parts). */
const catalogue: Record<string, React.ReactElement> = {
  // Layout
  Box: <UI.Box padding="4">box</UI.Box>,
  Stack: (
    <UI.Stack gap="2">
      <span>a</span>
      <span>b</span>
    </UI.Stack>
  ),
  Flex: <UI.Flex justify="space-between">flex</UI.Flex>,
  Grid: (
    <UI.Grid columns={{ base: 1, md: 2 }} gap="2">
      <UI.GridItem colSpan={2}>cell</UI.GridItem>
    </UI.Grid>
  ),
  Container: <UI.Container size="sm">container</UI.Container>,
  Divider: <UI.Divider label="OR" />,
  AspectRatio: (
    <UI.AspectRatio ratio={16 / 9}>
      <div>ratio</div>
    </UI.AspectRatio>
  ),
  ScrollArea: <UI.ScrollArea maxHeight="32">scroll</UI.ScrollArea>,
  // Typography / navigation
  Text: <UI.Text as="p">text</UI.Text>,
  Heading: <UI.Heading level={2}>heading</UI.Heading>,
  Link: (
    <UI.Link href="https://example.com" external>
      link
    </UI.Link>
  ),
  Breadcrumb: <UI.Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Here" }]} />,
  Code: <UI.Code>code</UI.Code>,
  Kbd: <UI.Kbd>K</UI.Kbd>,
  List: (
    <UI.List ordered>
      <UI.ListItem icon={<span>*</span>}>item</UI.ListItem>
    </UI.List>
  ),
  // Forms
  Label: <UI.Label htmlFor="x">label</UI.Label>,
  Input: <UI.Input placeholder="input" />,
  InputPassword: <UI.InputPassword placeholder="password" />,
  InputGroup: (
    <UI.InputGroup>
      <UI.InputLeftAddon>https://</UI.InputLeftAddon>
      <UI.Input />
      <UI.InputRightElement>@</UI.InputRightElement>
    </UI.InputGroup>
  ),
  Textarea: <UI.Textarea autoResize placeholder="textarea" />,
  Checkbox: <UI.Checkbox label="check" defaultChecked />,
  Radio: <UI.Radio items={[{ value: "a", label: "A" }]} defaultValue="a" />,
  Switch: <UI.Switch defaultChecked aria-label="switch" />,
  Select: <UI.Select options={[{ value: "a", label: "A" }]} defaultValue="a" />,
  SegmentedControl: <UI.SegmentedControl items={[{ value: "a", label: "A" }]} defaultValue="a" />,
  Form: (
    <UI.Form>
      <UI.FormField name="email" label="Email" description="Work" error="Required" required>
        <UI.Input />
      </UI.FormField>
    </UI.Form>
  ),
  Button: <UI.Button loading>button</UI.Button>,
  IconButton: <UI.IconButton label="icon" icon={<svg />} />,
  CloseButton: <UI.CloseButton />,
  ButtonGroup: (
    <UI.ButtonGroup attached>
      <UI.Button>a</UI.Button>
      <UI.Button>b</UI.Button>
    </UI.ButtonGroup>
  ),
  Toggle: <UI.Toggle defaultPressed>toggle</UI.Toggle>,
  ToggleGroup: (
    <UI.ToggleGroup type="multiple" defaultValue={["a"]}>
      <UI.ToggleGroupItem value="a">a</UI.ToggleGroupItem>
      <UI.ToggleGroupItem value="b">b</UI.ToggleGroupItem>
    </UI.ToggleGroup>
  ),
  // Feedback
  Alert: <UI.Alert status="warning" title="alert" dismissible />,
  Spinner: <UI.Spinner />,
  Progress: <UI.Progress value={40} label="progress" showValue />,
  CircularProgress: <UI.CircularProgress value={40} label="ring" showValue />,
  Skeleton: (
    <UI.Skeleton>
      <UI.SkeletonText lines={2} />
    </UI.Skeleton>
  ),
  Toast: <UI.Toast title="toast" duration={null} />,
  ToastProvider: (
    <UI.ToastProvider>
      <span>inside</span>
    </UI.ToastProvider>
  ),
  // Overlay / disclosure: dialogs are closed on the server and open on the client, so the
  // closed shell is what gets server-rendered.
  Dialog: (
    <UI.Dialog open onOpenChange={() => {}}>
      <UI.DialogContent>
        <UI.DialogTitle>dialog</UI.DialogTitle>
      </UI.DialogContent>
    </UI.Dialog>
  ),
  AlertDialog: (
    <UI.AlertDialog open onOpenChange={() => {}}>
      <UI.AlertDialogContent>
        <UI.AlertDialogTitle>alert dialog</UI.AlertDialogTitle>
      </UI.AlertDialogContent>
    </UI.AlertDialog>
  ),
  Tooltip: (
    <UI.Tooltip label="tip">
      <button type="button">b</button>
    </UI.Tooltip>
  ),
  Tabs: (
    <UI.Tabs defaultValue="a">
      <UI.TabsList>
        <UI.TabsTrigger value="a">A</UI.TabsTrigger>
        <UI.TabsTrigger value="b">B</UI.TabsTrigger>
      </UI.TabsList>
      <UI.TabsContent value="a">panel</UI.TabsContent>
    </UI.Tabs>
  ),
  Accordion: (
    <UI.Accordion defaultValue="a">
      <UI.AccordionItem value="a">
        <UI.AccordionTrigger>A</UI.AccordionTrigger>
        <UI.AccordionContent>body</UI.AccordionContent>
      </UI.AccordionItem>
    </UI.Accordion>
  ),
  Collapsible: (
    <UI.Collapsible defaultOpen>
      <UI.CollapsibleTrigger>more</UI.CollapsibleTrigger>
      <UI.CollapsibleContent>body</UI.CollapsibleContent>
    </UI.Collapsible>
  ),
  // Data display
  Card: (
    <UI.Card>
      <UI.CardHeader>
        <UI.CardTitle>card</UI.CardTitle>
        <UI.CardDescription>desc</UI.CardDescription>
      </UI.CardHeader>
      <UI.CardBody>body</UI.CardBody>
      <UI.CardFooter>footer</UI.CardFooter>
    </UI.Card>
  ),
  Badge: <UI.Badge dot>badge</UI.Badge>,
  Tag: <UI.Tag onClose={() => {}}>tag</UI.Tag>,
  Avatar: <UI.Avatar name="Ada Lovelace" src="ada.png" status="online" />,
  AvatarGroup: (
    <UI.AvatarGroup max={1}>
      <UI.Avatar name="Ada Lovelace" />
      <UI.Avatar name="Grace Hopper" />
    </UI.AvatarGroup>
  ),
  Image: <UI.Image src="photo.jpg" alt="photo" ratio="16/9" />,
  Stat: <UI.Stat label="stat" value="1" trend="increase" trendValue="1%" />,
  Map: <UI.Map latitude={48.8566} longitude={2.3522} title="map" />,
  Table: (
    <UI.Table>
      <UI.TableCaption>caption</UI.TableCaption>
      <UI.TableHeader>
        <UI.TableRow>
          <UI.TableHead sort="ascending">head</UI.TableHead>
        </UI.TableRow>
      </UI.TableHeader>
      <UI.TableBody>
        <UI.TableRow selected>
          <UI.TableCell numeric>1</UI.TableCell>
        </UI.TableRow>
      </UI.TableBody>
      <UI.TableFooter>
        <UI.TableRow>
          <UI.TableCell>total</UI.TableCell>
        </UI.TableRow>
      </UI.TableFooter>
    </UI.Table>
  ),
  DataTable: (
    <UI.DataTable
      caption="data"
      columns={[{ key: "n", header: "N", sortable: true }]}
      rows={[{ id: "a", n: 1 }]}
      selectable
      defaultSort={{ key: "n", direction: "ascending" }}
    />
  ),
};

/** Names of every component the package exports (from the public API test's point of view). */
const componentNames = Object.keys(UI).filter(
  (name) =>
    /^[A-Z]/.test(name) &&
    !name.startsWith("Theme") &&
    !name.startsWith("ColorMode") &&
    // Compound parts are exercised through their root.
    !/^(Dialog|AlertDialog|Tabs|Accordion|Collapsible|Card|Form|Select|Radio|Input|Toggle|Breadcrumb|List|Grid|Skeleton|Stat|Tag|Toast|Avatar|Table)[A-Z]/.test(
      name,
    ) &&
    ![
      "SelectRoot",
      "Field",
      "InputAddon",
      "InputElement",
      "InputLeftAddon",
      "InputRightAddon",
      "InputLeftElement",
      "InputRightElement",
      "ToastRegion",
    ].includes(name),
);

const PORTAL_ONLY = new Set(["Dialog", "AlertDialog"]);

let container: HTMLDivElement;
let root: Root | null = null;
let errors: string[];
let warnings: string[];

beforeEach(() => {
  container = document.createElement("div");
  document.body.append(container);
  errors = [];
  warnings = [];
  vi.spyOn(console, "error").mockImplementation((...args: unknown[]) => {
    errors.push(args.map(String).join(" "));
  });
  vi.spyOn(console, "warn").mockImplementation((...args: unknown[]) => {
    warnings.push(args.map(String).join(" "));
  });
});

afterEach(() => {
  act(() => root?.unmount());
  root = null;
  container.remove();
  vi.restoreAllMocks();
  document.body.style.overflow = "";
});

/** Runs `render` the way a server would: no `window` (jsdom's stays out of sight). */
function onServer<T>(render: () => T): T {
  vi.stubGlobal("window", undefined);
  try {
    return render();
  } finally {
    vi.unstubAllGlobals();
  }
}

/** Renders on the "server", then hydrates the same HTML on the "client". */
function serverRenderAndHydrate(element: React.ReactElement): string {
  const tree = (
    <UI.ThemeProvider defaultColorMode="light" storageKey={null}>
      {element}
    </UI.ThemeProvider>
  );
  const html = onServer(() => renderToString(tree));
  container.innerHTML = html;
  act(() => {
    root = hydrateRoot(container, tree, {
      onRecoverableError: (error) => errors.push(`recoverable: ${String(error)}`),
    });
  });
  return html;
}

describe("server rendering and hydration", () => {
  it("the catalogue covers every exported component", () => {
    const missing = componentNames.filter((name) => !(name in catalogue));
    expect(missing).toEqual([]);
  });

  it.each(Object.entries(catalogue))(
    "<%s /> renders on the server and hydrates cleanly",
    (name, element) => {
      const html = serverRenderAndHydrate(element);
      // Portal-based components render nothing on the server and mount once hydrated.
      if (PORTAL_ONLY.has(name)) {
        expect(html).toBe("");
        expect(
          document.body.querySelector("[role='dialog'], [role='alertdialog']"),
        ).toBeInTheDocument();
      } else {
        expect(html.length, `${name} rendered nothing`).toBeGreaterThan(0);
      }
      expect(errors).toEqual([]);
      expect(warnings).toEqual([]);
    },
  );

  it("the whole catalogue hydrates together, and client-only parts appear after hydration", () => {
    serverRenderAndHydrate(
      <UI.ToastProvider>
        {Object.entries(catalogue)
          .filter(([name]) => name !== "ToastProvider")
          .map(([name, element]) => (
            <React.Fragment key={name}>{element}</React.Fragment>
          ))}
      </UI.ToastProvider>,
    );
    expect(errors).toEqual([]);
    expect(warnings).toEqual([]);
    // The dialog (a portal) is not in the server HTML, and mounts once hydrated.
    expect(document.body.querySelector("[role='dialog']")).toBeInTheDocument();
    expect(document.body.querySelector("[role='alertdialog']")).toBeInTheDocument();
  });

  it("portals are left out of the server HTML instead of breaking the render", () => {
    const html = onServer(() =>
      renderToString(
        <UI.ThemeProvider defaultColorMode="light" storageKey={null}>
          <UI.ToastProvider>
            <UI.Dialog open onOpenChange={() => {}}>
              <UI.DialogContent>
                <UI.DialogTitle>dialog</UI.DialogTitle>
              </UI.DialogContent>
            </UI.Dialog>
          </UI.ToastProvider>
        </UI.ThemeProvider>,
      ),
    );
    expect(html).not.toContain('role="dialog"');
    expect(errors).toEqual([]);
  });

  it("the theme provider renders the default mode on the server even when a mode is stored", () => {
    window.localStorage.setItem("mild-ui-color-mode", "dark");
    const tree = (
      <UI.ThemeProvider defaultColorMode="light">
        <Probe />
      </UI.ThemeProvider>
    );
    function Probe() {
      const { resolvedColorMode } = UI.useColorMode();
      return <span data-testid="mode">{resolvedColorMode}</span>;
    }
    const html = onServer(() => renderToString(tree));
    expect(html).toContain(">light<");
    container.innerHTML = html;
    act(() => {
      root = hydrateRoot(container, tree);
    });
    // Hydrated without a mismatch, then switched to the stored choice.
    expect(errors).toEqual([]);
    expect(container.querySelector("[data-testid='mode']")).toHaveTextContent("dark");
    window.localStorage.clear();
  });
});
