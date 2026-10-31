// packages/vue/src/index.test.ts
// Public API stability test: the package entry point (src/index.ts) must keep exporting every
// name listed below. Removing (or renaming) any export makes this suite fail, so accidental
// breaking changes are caught before release.
import { describe, expect, it } from "vitest";
import * as MildVue from "./index";

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

// Composables
const COMPOSABLE_EXPORTS = ["useTheme", "useColorMode", "useMachine", "useId"] as const;

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
  // Grid
  "GridItem",
  // Breadcrumb
  "BreadcrumbItem",
  "BreadcrumbLink",
  "BreadcrumbSeparator",
  // List
  "ListItem",
  // ButtonGroup / InputGroup
  "useButtonGroup",
  "InputAddon",
  "InputLeftAddon",
  "InputRightAddon",
  "InputElement",
  "InputLeftElement",
  "InputRightElement",
  "useInputGroup",
  // ToggleGroup
  "ToggleGroupItem",
  "useToggleGroup",
  // Feedback
  "SkeletonText",
  "ToastProvider",
  "ToastRegion",
  "useToast",
  // Overlay / disclosure
  "DialogContent",
  "DialogHeader",
  "DialogTitle",
  "DialogDescription",
  "DialogBody",
  "DialogFooter",
  "DialogCloseButton",
  "useDialogContext",
  "AlertDialogContent",
  "AlertDialogHeader",
  "AlertDialogTitle",
  "AlertDialogDescription",
  "AlertDialogBody",
  "AlertDialogFooter",
  "TabsList",
  "TabsTrigger",
  "TabsContent",
  "useTabsContext",
  "AccordionItem",
  "AccordionTrigger",
  "AccordionContent",
  "useAccordionContext",
  "useAccordionItemContext",
  "CollapsibleTrigger",
  "CollapsibleContent",
  "useCollapsibleContext",
  // Data display
  "CardHeader",
  "CardTitle",
  "CardDescription",
  "CardBody",
  "CardFooter",
  "CardMedia",
  "TagCloseButton",
  "useAvatarGroup",
  "StatGroup",
  // Radio
  "RadioGroup",
  "RadioGroupItem",
  "useRadioGroup",
  // Table
  "TableCaption",
  "TableHeader",
  "TableBody",
  "TableFooter",
  "TableRow",
  "TableHead",
  "TableCell",
  // Select
  "SelectRoot",
  "SelectTrigger",
  "SelectValue",
  "SelectContent",
  "SelectItem",
  "useSelectContext",
] as const;

const UTILITY_EXPORTS = [
  "cn",
  "getButtonProps",
  "getButtonState",
  "getButtonA11yProps",
  "checkboxVariants",
  "checkboxLabelVariants",
  "radioVariants",
  "radioLabelVariants",
  "switchVariants",
  "switchThumbVariants",
  "switchLabelVariants",
  "selectTriggerVariants",
  "selectContentVariants",
  "selectItemVariants",
  "inputVariants",
  "textareaVariants",
  "progressFraction",
  "progressPercent",
  "getProgressA11yProps",
  "getInitials",
  "inputPasswordVariants",
  "inputPasswordToggleVariants",
  "labelVariants",
  "getSpacingValue",
  "getDimensionValue",
  "getRadiusValue",
  "getColorValue",
  "flexModifierClasses",
  "responsiveClasses",
  "shortAlignment",
  "toCssAspectRatio",
  "defaultTheme",
  "mergeThemes",
  "generateCSSProperties",
  "applyCSSProperties",
  "sortValueOf",
  "compareSortValues",
  "sortRows",
  "nextSort",
  "boundingBox",
  "openStreetMapEmbedUrl",
  "openStreetMapUrl",
  "tabId",
  "tabPanelId",
  "isSpaceToken",
  "isFractionToken",
  "isRadiusToken",
  "cssVar",
  "dataAttr",
  "ariaAttr",
  "cva",
  "getThemeColor",
] as const;

describe("@mild-ui/vue exports", () => {
  it.each(COMPONENT_EXPORTS)("exports the %s component", (name) => {
    expect(MildVue[name]).toBeDefined();
    expect(typeof MildVue[name]).toBe("object");
  });

  it.each(PROVIDER_EXPORTS)("exports %s from the theme system", (name) => {
    expect(MildVue[name]).toBeDefined();
  });

  it.each(COMPOSABLE_EXPORTS)("exports the %s composable", (name) => {
    expect(typeof MildVue[name]).toBe("function");
  });

  it.each(COMPOUND_EXPORTS)("exports the %s part", (name) => {
    expect(MildVue[name]).toBeDefined();
  });

  it.each(UTILITY_EXPORTS)("exports the %s utility", (name) => {
    expect(MildVue[name]).toBeDefined();
  });

  it("lists every runtime export above (add new components to this test)", () => {
    const listed = new Set<string>([
      ...COMPONENT_EXPORTS,
      ...PROVIDER_EXPORTS,
      ...COMPOSABLE_EXPORTS,
      ...COMPOUND_EXPORTS,
      ...UTILITY_EXPORTS,
    ]);
    const unlisted = Object.keys(MildVue).filter((name) => !listed.has(name));
    expect(unlisted).toEqual([]);
  });
});
