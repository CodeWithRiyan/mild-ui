// packages/react/src/export.test.ts
// Public API stability test: the package entry point (src/index.ts) must keep
// exporting every name listed below. Removing (or renaming) any export makes
// this suite fail, so accidental breaking changes are caught before release.
import { describe, expect, it } from "vitest";
import * as MildUI from "./index";

// 54 components
const COMPONENT_EXPORTS = [
  "Accordion",
  "Alert",
  "AlertDialog",
  "AspectRatio",
  "Avatar",
  "AvatarGroup",
  "Badge",
  "Box",
  "Breadcrumb",
  "Button",
  "ButtonGroup",
  "Card",
  "Checkbox",
  "CircularProgress",
  "CloseButton",
  "Code",
  "Collapsible",
  "Container",
  "Dialog",
  "Divider",
  "Flex",
  "Form",
  "Grid",
  "Heading",
  "IconButton",
  "Image",
  "Input",
  "InputGroup",
  "InputPassword",
  "Kbd",
  "Label",
  "Link",
  "List",
  "Map",
  "Progress",
  "Radio",
  "ScrollArea",
  "SegmentedControl",
  "Select",
  "Skeleton",
  "Spinner",
  "Stack",
  "Stat",
  "Switch",
  "Table",
  "DataTable",
  "Tabs",
  "Tag",
  "Text",
  "Textarea",
  "Toast",
  "Toggle",
  "ToggleGroup",
  "Tooltip",
] as const;

// Theme system
const PROVIDER_EXPORTS = ["ThemeProvider", "ColorModeScript", "getColorModeScript"] as const;

// Hooks
const HOOK_EXPORTS = ["useTheme", "useColorMode", "useMachine", "useHydrated"] as const;

// Compound / supporting component parts that are part of the public API too.
const COMPOUND_EXPORTS = [
  // Form
  "FormItem",
  "FormLabel",
  "FormControl",
  "FormDescription",
  "FormMessage",
  "FormField",
  "Field",
  "useFormField",
  // Radio
  "RadioGroup",
  "RadioGroupItem",
  // Select
  "SelectRoot",
  "SelectTrigger",
  "SelectValue",
  "SelectContent",
  "SelectItem",
  // Grid
  "GridItem",
  // Breadcrumb
  "BreadcrumbItem",
  "BreadcrumbLink",
  "BreadcrumbSeparator",
  // List
  "ListItem",
  // ButtonGroup
  "useButtonGroup",
  // InputGroup
  "InputAddon",
  "InputLeftAddon",
  "InputRightAddon",
  "InputElement",
  "InputLeftElement",
  "InputRightElement",
  "useInputGroup",
  // ToggleGroup
  "ToggleGroupItem",
  // Skeleton
  "SkeletonText",
  // Toast
  "ToastProvider",
  "ToastRegion",
  "useToast",
  // Dialog
  "DialogContent",
  "DialogHeader",
  "DialogTitle",
  "DialogDescription",
  "DialogBody",
  "DialogFooter",
  "DialogCloseButton",
  // AlertDialog
  "AlertDialogContent",
  "AlertDialogHeader",
  "AlertDialogTitle",
  "AlertDialogDescription",
  "AlertDialogBody",
  "AlertDialogFooter",
  // Tabs
  "TabsList",
  "TabsTrigger",
  "TabsContent",
  // Accordion
  "AccordionItem",
  "AccordionTrigger",
  "AccordionContent",
  // Table
  "TableCaption",
  "TableHeader",
  "TableBody",
  "TableFooter",
  "TableRow",
  "TableHead",
  "TableCell",
  // Collapsible
  "CollapsibleTrigger",
  "CollapsibleContent",
  // Card
  "CardHeader",
  "CardTitle",
  "CardDescription",
  "CardBody",
  "CardFooter",
  "CardMedia",
  // Tag
  "TagCloseButton",
  // Stat
  "StatGroup",
] as const;

// Utilities (class-name helpers, variant maps, theme helpers) that are public too.
const UTILITY_EXPORTS = [
  "cn",
  "cva",
  "cssVar",
  "dataAttr",
  "ariaAttr",
  "isSpaceToken",
  "isFractionToken",
  "isRadiusToken",
  "getSpacingValue",
  "getDimensionValue",
  "getRadiusValue",
  "getColorValue",
  "getButtonProps",
  "getButtonState",
  "getButtonA11yProps",
  "checkboxVariants",
  "checkboxLabelVariants",
  "inputVariants",
  "inputPasswordVariants",
  "inputPasswordToggleVariants",
  "labelVariants",
  "shortAlignment",
  "flexModifierClasses",
  "responsiveClasses",
  "toCssAspectRatio",
  "boundingBox",
  "openStreetMapEmbedUrl",
  "openStreetMapUrl",
  "progressFraction",
  "progressPercent",
  "getProgressA11yProps",
  "getInitials",
  "radioVariants",
  "radioLabelVariants",
  "selectTriggerVariants",
  "selectContentVariants",
  "selectItemVariants",
  "switchVariants",
  "switchThumbVariants",
  "switchLabelVariants",
  "textareaVariants",
  "tabId",
  "tabPanelId",
  "sortValueOf",
  "compareSortValues",
  "sortRows",
  "nextSort",
  "defaultTheme",
  "mergeThemes",
  "generateCSSProperties",
  "applyCSSProperties",
  "getThemeColor",
] as const;

const REQUIRED_EXPORTS = [...COMPONENT_EXPORTS, ...PROVIDER_EXPORTS, ...HOOK_EXPORTS] as const;

const exportsRecord = MildUI as Record<string, unknown>;

describe("@mild-ui/react public exports", () => {
  it(`exposes the full required list (${COMPONENT_EXPORTS.length} components + ThemeProvider + hooks)`, () => {
    const missing = REQUIRED_EXPORTS.filter((name) => exportsRecord[name] === undefined);
    // Listing the missing names gives an actionable failure message.
    expect(missing).toEqual([]);
  });

  describe("components", () => {
    it.each(COMPONENT_EXPORTS)("exports component <%s />", (name) => {
      const value = exportsRecord[name];
      expect(value).toBeDefined();
      // Plain FCs are functions; forwardRef/memo components are exotic objects.
      expect(["function", "object"]).toContain(typeof value);
    });
  });

  describe("theme provider", () => {
    it.each(PROVIDER_EXPORTS)("exports %s", (name) => {
      const value = exportsRecord[name];
      expect(value).toBeDefined();
      expect(["function", "object"]).toContain(typeof value);
    });
  });

  describe("hooks", () => {
    it.each(HOOK_EXPORTS)("exports %s as a function", (name) => {
      expect(typeof exportsRecord[name]).toBe("function");
    });
  });

  describe("compound component parts", () => {
    it.each(COMPOUND_EXPORTS)("exports %s", (name) => {
      const value = exportsRecord[name];
      expect(value).toBeDefined();
      expect(["function", "object"]).toContain(typeof value);
    });
  });

  describe("utilities", () => {
    it.each(UTILITY_EXPORTS)("exports %s", (name) => {
      expect(exportsRecord[name]).toBeDefined();
    });
  });

  it("lists every runtime export above (add new components to this test)", () => {
    const listed = new Set<string>([...REQUIRED_EXPORTS, ...COMPOUND_EXPORTS, ...UTILITY_EXPORTS]);
    const unlisted = Object.keys(exportsRecord).filter((name) => !listed.has(name));
    expect(unlisted).toEqual([]);
  });
});
