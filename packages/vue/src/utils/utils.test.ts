import { describe, expect, it, vi } from "vitest";
import type { ThemeConfig } from "../types";
import {
  cn,
  getButtonProps,
  getButtonState,
  getButtonA11yProps,
  inputVariants,
  labelVariants,
  selectTriggerVariants,
  selectContentVariants,
  selectItemVariants,
  getSpacingValue,
  getDimensionValue,
  getRadiusValue,
  getColorValue,
  isSpaceToken,
  isFractionToken,
  isRadiusToken,
  cssVar,
  dataAttr,
  ariaAttr,
  cva,
  defaultTheme,
  mergeThemes,
  generateCSSProperties,
  applyCSSProperties,
  getThemeColor,
  shortAlignment,
  flexModifierClasses,
  responsiveClasses,
} from "./index";

describe("cn", () => {
  it("joins strings, numbers, arrays and object maps, dropping falsy values", () => {
    expect(
      cn("a", "", null, undefined, false, true, 0, 1, ["b", ["c"]], { d: true, e: false }),
    ).toBe("a 1 b c d");
    expect(cn()).toBe("");
  });
});

describe("button utils", () => {
  it("maps variants onto style + color pairs", () => {
    expect(getButtonProps({})).toEqual({
      className: "mild-button mild-button--primary mild-button--solid mild-button--md",
      disabled: false,
      "data-loading": undefined,
      "data-disabled": undefined,
    });
    expect(
      getButtonProps({ variant: "destructive", loading: true, disabled: true }).className,
    ).toBe(
      "mild-button mild-button--destructive mild-button--solid mild-button--danger mild-button--md mild-button--loading mild-button--disabled",
    );
    expect(
      getButtonProps({ variant: "ghost", colorScheme: "success", fullWidth: true, className: "x" })
        .className,
    ).toBe(
      "mild-button mild-button--ghost mild-button--success mild-button--md mild-button--full-width x",
    );
  });

  it("derives state and a11y props", () => {
    expect(getButtonState({})).toEqual({ canClick: true, isLoading: false, isDisabled: false });
    expect(getButtonState({ loading: true })).toMatchObject({ canClick: false, isLoading: true });
    expect(getButtonA11yProps({})).toEqual({
      type: "button",
      "aria-disabled": undefined,
      "aria-busy": undefined,
      tabindex: undefined,
    });
    expect(getButtonA11yProps({ loading: true, disabled: true, type: "submit" })).toEqual({
      type: "submit",
      "aria-disabled": true,
      "aria-busy": true,
      tabindex: -1,
    });
  });
});

describe("variant builders", () => {
  it("build input, label and select classes", () => {
    expect(inputVariants({})).toBe(
      "mild-input mild-input--outline mild-input--md mild-input--full-width",
    );
    expect(
      inputVariants({
        variant: "flushed",
        size: "xs",
        fullWidth: false,
        error: true,
        className: "c",
      }),
    ).toBe("mild-input mild-input--flushed mild-input--xs mild-input--error c");
    expect(labelVariants({})).toBe("mild-label");
    expect(labelVariants({ required: true, error: true, className: "l" })).toBe(
      "mild-label mild-label--required mild-label--error l",
    );
    expect(selectTriggerVariants({})).toBe("mild-select-trigger mild-select-trigger--md");
    expect(selectContentVariants({})).toBe("mild-select-content mild-select-content--popper");
    expect(selectItemVariants({ size: "sm" })).toBe("mild-select-item mild-select-item--sm");
  });
});

describe("styling tokens", () => {
  it("resolves tokens to themed custom properties with fallbacks", () => {
    expect(getSpacingValue("4")).toBe("var(--mild-space-4, 1rem)");
    expect(getDimensionValue("1/3")).toBe("var(--mild-dimension-1-3, 33.333333%)");
    expect(getDimensionValue("8")).toBe("var(--mild-space-8, 2rem)");
    expect(getRadiusValue("full")).toBe("var(--mild-radius-full, 9999px)");
    expect(getColorValue("black-alpha-50")).toBe("var(--mild-color-black-alpha-50)");
    expect(isSpaceToken("4")).toBe(true);
    expect(isSpaceToken("4px")).toBe(false);
    expect(isFractionToken("1/2")).toBe(true);
    expect(isRadiusToken("lg")).toBe(true);
    expect(isRadiusToken("4")).toBe(false);
  });

  it("offers small helpers", () => {
    expect(cssVar("space-4")).toBe("var(--mild-space-4)");
    expect(cssVar("space-4", "1rem")).toBe("var(--mild-space-4, 1rem)");
    expect(dataAttr(true)).toBe("");
    expect(dataAttr(false)).toBeUndefined();
    expect(ariaAttr(true)).toBe(true);
    expect(ariaAttr(undefined)).toBeUndefined();
    const variants = cva("base", {
      variants: { size: { sm: "base--sm", md: "base--md" }, active: { true: "base--active" } },
      defaultVariants: { size: "md" },
    });
    expect(variants()).toBe("base");
    expect(variants({})).toBe("base base--md");
    expect(variants({ size: "sm", active: true })).toBe("base base--sm base--active");
    expect(variants({ size: "xl", active: false })).toBe("base");
  });
});

describe("theme utils", () => {
  it("merges themes one level deep", () => {
    const merged = mergeThemes({ colors: { primary: { 500: "#f00" } } }, { radii: { lg: "1rem" } });
    expect((merged.colors?.primary as Record<string, string>)[500]).toBe("#f00");
    expect(merged.colors?.gray).toEqual(defaultTheme.colors?.gray);
    expect(merged.radii?.lg).toBe("1rem");
    expect(merged.radii?.sm).toBe(defaultTheme.radii?.sm);
    expect(mergeThemes({ colorMode: "dark" }, { colorMode: undefined }).colorMode).toBe("dark");
    expect(mergeThemes(undefined as unknown as Partial<ThemeConfig>)).toEqual(defaultTheme);
  });

  it("generates and applies custom properties", () => {
    const properties = generateCSSProperties(
      { colors: { primary: { 500: "#f00" }, accent: "#0f0" }, space: { "4": "2rem" } },
      "app",
    );
    expect(properties).toEqual({
      "--app-color-primary-500": "#f00",
      "--app-color-accent": "#0f0",
      "--app-space-4": "2rem",
    });
    const remove = applyCSSProperties(properties);
    expect(document.documentElement.style.getPropertyValue("--app-space-4")).toBe("2rem");
    remove();
    expect(document.documentElement.style.getPropertyValue("--app-space-4")).toBe("");
  });

  it("is a no-op without a document (server rendering)", () => {
    vi.stubGlobal("document", undefined);
    try {
      expect(() => applyCSSProperties({ "--x": "1" })()).not.toThrow();
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("reads theme colors by path, returning the path when unknown", () => {
    expect(getThemeColor(defaultTheme, "primary.500")).toBe("#0ea5e9");
    expect(getThemeColor(defaultTheme, "primary.999")).toBe("primary.999");
    expect(getThemeColor({ colors: { accent: "#0f0" } }, "accent")).toBe("#0f0");
    expect(getThemeColor({ colors: { primary: { 500: "#f00" } } }, "primary")).toBe(
      "[object Object]",
    );
    expect(getThemeColor({ colors: { nothing: null } } as unknown as ThemeConfig, "nothing")).toBe(
      "nothing",
    );
  });
});

describe("layout helpers", () => {
  it("shortens CSS alignment keywords", () => {
    expect(shortAlignment("flex-start")).toBe("start");
    expect(shortAlignment("space-between")).toBe("between");
    expect(shortAlignment("center")).toBe("center");
  });

  it("builds flex modifier classes, mapping wrap booleans", () => {
    expect(flexModifierClasses("flex", {})).toEqual([undefined, undefined, undefined, undefined]);
    expect(
      flexModifierClasses("stack", {
        direction: "row",
        wrap: true,
        align: "flex-end",
        justify: "space-evenly",
      }),
    ).toEqual([
      "mild-stack--row",
      "mild-stack--wrap",
      "mild-stack--items-end",
      "mild-stack--justify-evenly",
    ]);
    expect(flexModifierClasses("flex", { wrap: false })[1]).toBeUndefined();
    expect(flexModifierClasses("flex", { wrap: "nowrap" })[1]).toBe("mild-flex--nowrap");
  });

  it("expands plain and responsive values", () => {
    const toClass = (value: number, bp?: string) => (bp ? `${bp}-${value}` : `base-${value}`);
    expect(responsiveClasses(undefined, toClass)).toEqual([]);
    expect(responsiveClasses(3, toClass)).toEqual(["base-3"]);
    expect(responsiveClasses({ base: 1, md: 2, "2xl": 4 }, toClass)).toEqual([
      "base-1",
      "md-2",
      "2xl-4",
    ]);
    expect(responsiveClasses({ lg: 5 }, toClass)).toEqual(["lg-5"]);
  });
});
