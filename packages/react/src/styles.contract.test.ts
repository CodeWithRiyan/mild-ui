// packages/react/src/styles.contract.test.ts
// Guards the contract between the DOM the React components render and the selectors the core
// stylesheet paints. This is what let checkbox/radio/switch render unstyled: the SCSS still
// targeted native `input` markup after the components moved to the primitives.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { compile } from "sass";
import { describe, expect, it } from "vitest";

// Attribute selectors are compared unquoted, the way Sass emits them.
const css = compile(resolve(__dirname, "./styles/index.scss"), { style: "expanded" }).css.replace(
  /\[([a-z-]+)="([^"]*)"\]/g,
  "[$1=$2]",
);
const unquote = (selector: string) => selector.replace(/\[([a-z-]+)="([^"]*)"\]/g, "[$1=$2]");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(ts|tsx)$/.test(name) && !/\.test(-d)?\.tsx?$/.test(name) ? [path] : [];
  });
}

/** Static `mild-*` class names written in the component sources (template parts excluded). */
function emittedClassNames(): string[] {
  const names = new Set<string>();
  for (const file of sourceFiles(resolve(__dirname, "./components"))) {
    const source = readFileSync(file, "utf8");
    for (const match of source.matchAll(/["'`\s](mild-[a-z0-9]+(?:[-_]+[a-z0-9]+)*)["'`\s]/g)) {
      names.add(match[1]);
    }
  }
  return [...names].sort();
}

describe("core stylesheet vs React markup", () => {
  it("has a rule for every static class the components emit", () => {
    const missing = emittedClassNames().filter((name) => !css.includes(`.${name}`));
    expect(missing).toEqual([]);
  });

  it("no longer relies on native inputs inside the primitive-driven controls", () => {
    expect(css).not.toMatch(/\.mild-(checkbox|radio|switch)[^{]*input\[type=/);
  });

  it.each([
    // Checkbox: span[role=checkbox] with data-state
    '.mild-checkbox[data-state="checked"]',
    '.mild-checkbox[data-state="indeterminate"]',
    ".mild-checkbox[data-disabled]",
    ".mild-checkbox:hover:not([data-disabled])",
    '.mild-checkbox[aria-invalid="true"]',
    // Radio
    '.mild-radio[data-state="checked"]',
    ".mild-radio[data-disabled]",
    ".mild-radio:hover:not([data-disabled])",
    // Switch: track + thumb both carry data-state
    '.mild-switch[data-state="checked"]',
    '.mild-switch-thumb[data-state="checked"]',
    ".mild-switch:hover:not([data-disabled])",
    // Select
    ".mild-select-item[data-highlighted]",
    ".mild-select-item[data-selected]",
    ".mild-select-item[data-disabled]",
    ".mild-select-item__indicator",
    '.mild-select-trigger[aria-expanded="true"]',
    // Button
    ".mild-button[data-loading]",
    ".mild-button--solid.mild-button--primary:hover",
    // Form
    ".mild-form-item",
    ".mild-form-message",
    ".mild-form-description",
    // Label marker is an element, not generated content
    ".mild-label__marker",
    // Data display
    ".mild-card-header + .mild-card-content",
    ".mild-badge--solid.mild-badge--primary",
    ".mild-tag--outline.mild-tag--danger",
    ".mild-tag__close:hover",
    ".mild-avatar-group > .mild-avatar:not(:first-child)",
    ".mild-image-frame--ratio > .mild-image",
    ".mild-stat__trend--increase",
    ".mild-map__iframe",
    // Feedback / overlay / disclosure
    ".mild-progress--indeterminate .mild-progress__bar",
    ".mild-circular-progress__bar",
    ".mild-skeleton--wave::after",
    ".mild-toast-region--bottom-right",
    ".mild-toast__close",
    ".mild-modal-overlay",
    ".mild-modal-content--alert",
    "body.mild-modal-open",
    ".mild-tooltip[hidden]",
    ".mild-tabs-panel[hidden]",
    ".mild-accordion-content[hidden]",
    ".mild-accordion-header",
    '.mild-accordion-trigger-icon[data-state="open"]',
    ".mild-collapsible-content[hidden]",
    '.mild-collapsible-trigger[aria-expanded="true"] .mild-collapsible-trigger__icon',
    ".mild-spinner__label",
    // Basic input
    ".mild-textarea--auto-resize",
    ".mild-button-group--attached:not(.mild-button-group--vertical) > .mild-button:not(:first-child)",
    ".mild-input-group--has-left-element > .mild-input",
    ".mild-input-group--has-right-addon > .mild-input",
    '.mild-segmented-control__item[aria-checked="true"]',
    '.mild-toggle[aria-pressed="true"]',
    ".mild-toggle-group--attached:not(.mild-toggle-group--vertical) > .mild-toggle:not(:first-child)",
    // Typography / navigation
    ".mild-link:focus-visible",
    ".mild-link--underline-hover:hover",
    ".mild-breadcrumb__list",
    ".mild-breadcrumb-page",
    ".mild-list > li + li",
    ".mild-list-item__icon",
    // Layout: divider label line, aspect-ratio child fill, scroll area focus ring / scrollbars
    ".mild-divider--with-label::before",
    ".mild-divider__label",
    ".mild-aspect-ratio > *",
    ".mild-scroll-area:focus-visible",
    ".mild-scroll-area::-webkit-scrollbar-thumb",
    ".mild-scroll-area--always.mild-scroll-area--vertical",
    ".mild-scroll-area--hover:hover",
  ])("paints %s", (selector) => {
    expect(css).toContain(unquote(selector));
  });

  describe("dynamic modifiers", () => {
    // A rule targets the class when it is followed by a selector boundary: whitespace, a list
    // comma, the block, a pseudo (`::before`, `:hover`) or a chained class (`.a.b`).
    const has = (cls: string) =>
      css.includes(`.${cls} `) ||
      css.includes(`.${cls},`) ||
      css.includes(`.${cls}{`) ||
      css.includes(`.${cls}\n`) ||
      css.includes(`.${cls}:`) ||
      css.includes(`.${cls}.`);

    it.each([
      [
        "display",
        [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "grid",
          "inline-grid",
          "none",
          "contents",
        ],
        (v: string) => `mild-box--${v}`,
      ],
      [
        "flexDirection",
        ["row", "row-reverse", "column", "column-reverse"],
        (v: string) => `mild-box--flex-${v}`,
      ],
      ["flexWrap", ["nowrap", "wrap", "wrap-reverse"], (v: string) => `mild-box--flex-${v}`],
      [
        "alignItems",
        ["start", "end", "center", "baseline", "stretch"],
        (v: string) => `mild-box--items-${v}`,
      ],
      [
        "justifyContent",
        ["start", "end", "center", "between", "around", "evenly"],
        (v: string) => `mild-box--justify-${v}`,
      ],
      [
        "position",
        ["static", "relative", "absolute", "fixed", "sticky"],
        (v: string) => `mild-box--${v}`,
      ],
      [
        "overflow",
        ["visible", "hidden", "scroll", "auto"],
        (v: string) => `mild-box--overflow-${v}`,
      ],
      [
        "overflowX",
        ["visible", "hidden", "scroll", "auto"],
        (v: string) => `mild-box--overflow-x-${v}`,
      ],
      [
        "fontSize",
        ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"],
        (v: string) => `mild-text--${v}`,
      ],
      [
        "fontWeight",
        ["thin", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
        (v: string) => `mild-text--${v}`,
      ],
      ["textAlign", ["left", "center", "right", "justify"], (v: string) => `mild-text--${v}`],
      ["textTransform", ["uppercase", "lowercase", "capitalize"], (v: string) => `mild-text--${v}`],
      [
        "textDecoration",
        ["underline", "line-through", "overline"],
        (v: string) => `mild-text--${v}`,
      ],
      [
        "text color",
        ["primary", "secondary", "success", "warning", "danger", "muted"],
        (v: string) => `mild-text--${v}`,
      ],
      ["button size", ["xs", "sm", "md", "lg", "xl"], (v: string) => `mild-button--${v}`],
      // Layout components
      ...(["stack", "flex"] as const).flatMap((block) => [
        [
          `${block} direction`,
          ["row", "row-reverse", "column", "column-reverse"],
          (v: string) => `mild-${block}--${v}`,
        ],
        [`${block} wrap`, ["wrap", "nowrap", "wrap-reverse"], (v: string) => `mild-${block}--${v}`],
        [
          `${block} align`,
          ["start", "end", "center", "baseline", "stretch"],
          (v: string) => `mild-${block}--items-${v}`,
        ],
        [
          `${block} justify`,
          ["start", "end", "center", "between", "around", "evenly"],
          (v: string) => `mild-${block}--justify-${v}`,
        ],
        [`${block} inline`, ["inline"], (v: string) => `mild-${block}--${v}`],
      ]),
      [
        "grid columns",
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        (v: string) => `mild-grid--cols-${v}`,
      ],
      [
        "grid responsive columns",
        ["sm", "md", "lg", "xl", "2xl"],
        (v: string) => `mild-grid--${v}-cols-12`,
      ],
      ["grid rows", ["1", "2", "3", "4", "5", "6"], (v: string) => `mild-grid--rows-${v}`],
      [
        "grid flow",
        ["row", "column", "dense", "row-dense", "column-dense"],
        (v: string) => `mild-grid--flow-${v}`,
      ],
      [
        "grid align / justify",
        ["start", "end", "center", "stretch"],
        (v: string) => `mild-grid--items-${v}`,
      ],
      [
        "grid item col span",
        ["1", "6", "12", "full"],
        (v: string) => `mild-grid-item--col-span-${v}`,
      ],
      [
        "grid item responsive col span",
        ["sm", "md", "lg", "xl", "2xl"],
        (v: string) => `mild-grid-item--${v}-col-span-full`,
      ],
      ["grid item row span", ["1", "6", "full"], (v: string) => `mild-grid-item--row-span-${v}`],
      [
        "container size",
        ["sm", "md", "lg", "xl", "2xl", "full", "center-content"],
        (v: string) => `mild-container--${v}`,
      ],
      [
        "divider",
        [
          "horizontal",
          "vertical",
          "solid",
          "dashed",
          "dotted",
          "sm",
          "md",
          "lg",
          "with-label",
          "label-start",
          "label-end",
        ],
        (v: string) => `mild-divider--${v}`,
      ],
      [
        "scroll area",
        ["vertical", "horizontal", "both", "always", "hover", "hidden"],
        (v: string) => `mild-scroll-area--${v}`,
      ],
      [
        "card",
        ["default", "outlined", "elevated", "filled", "interactive", "disabled"],
        (v: string) => `mild-card--${v}`,
      ],
      ["card padding", ["none", "sm", "lg"], (v: string) => `mild-card-content--padding-${v}`],
      [
        "card footer",
        ["start", "center", "end", "between", "no-border"],
        (v: string) => `mild-card-footer--${v}`,
      ],
      [
        "badge",
        [
          "subtle",
          "solid",
          "outline",
          "gray",
          "primary",
          "success",
          "warning",
          "danger",
          "info",
          "sm",
          "md",
          "lg",
          "pill",
        ],
        (v: string) => `mild-badge--${v}`,
      ],
      [
        "tag",
        [
          "subtle",
          "solid",
          "outline",
          "gray",
          "primary",
          "success",
          "warning",
          "danger",
          "info",
          "sm",
          "md",
          "lg",
          "pill",
          "disabled",
        ],
        (v: string) => `mild-tag--${v}`,
      ],
      [
        "avatar",
        ["xs", "sm", "md", "lg", "xl", "2xl", "circle", "square", "bordered"],
        (v: string) => `mild-avatar--${v}`,
      ],
      [
        "avatar status",
        ["online", "offline", "busy", "away"],
        (v: string) => `mild-avatar__badge--${v}`,
      ],
      [
        "image fit",
        ["cover", "contain", "fill", "none", "scale-down"],
        (v: string) => `mild-image--${v}`,
      ],
      [
        "image radius",
        ["none", "sm", "md", "lg", "xl", "full"],
        (v: string) => `mild-image--radius-${v}`,
      ],
      ["image frame", ["ratio", "radius-lg"], (v: string) => `mild-image-frame--${v}`],
      ["stat", ["sm", "md", "lg"], (v: string) => `mild-stat--${v}`],
      [
        "alert status / variant / size",
        [
          "info",
          "success",
          "warning",
          "error",
          "subtle",
          "solid",
          "left-accent",
          "top-accent",
          "sm",
          "lg",
          "dismissible",
        ],
        (v: string) => `mild-alert--${v}`,
      ],
      [
        "spinner",
        ["border", "dots", "pulse", "bars", "xs", "sm", "md", "lg", "xl", "slow", "normal", "fast"],
        (v: string) => `mild-spinner--${v}`,
      ],
      [
        "progress",
        [
          "xs",
          "sm",
          "md",
          "lg",
          "primary",
          "success",
          "warning",
          "danger",
          "info",
          "striped",
          "animated",
          "indeterminate",
        ],
        (v: string) => `mild-progress--${v}`,
      ],
      [
        "circular progress",
        [
          "sm",
          "md",
          "lg",
          "xl",
          "primary",
          "success",
          "warning",
          "danger",
          "info",
          "indeterminate",
        ],
        (v: string) => `mild-circular-progress--${v}`,
      ],
      [
        "skeleton",
        ["text", "circle", "rect", "pulse", "wave", "none"],
        (v: string) => `mild-skeleton--${v}`,
      ],
      ["toast status", ["info", "success", "warning", "error"], (v: string) => `mild-toast--${v}`],
      [
        "toast placement",
        ["top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right"],
        (v: string) => `mild-toast-region--${v}`,
      ],
      [
        "dialog size",
        ["xs", "sm", "md", "lg", "xl", "full", "alert"],
        (v: string) => `mild-modal-content--${v}`,
      ],
      [
        "dialog footer",
        ["start", "center", "between", "no-border"],
        (v: string) => `mild-modal-footer--${v}`,
      ],
      [
        "tooltip placement",
        ["top", "bottom", "left", "right", "multiline"],
        (v: string) => `mild-tooltip--${v}`,
      ],
      [
        "tabs list",
        ["default", "pills", "underline", "horizontal", "vertical", "sm", "lg"],
        (v: string) => `mild-tabs-list--${v}`,
      ],
      [
        "tabs trigger",
        ["active", "disabled", "sm", "lg"],
        (v: string) => `mild-tabs-trigger--${v}`,
      ],
      [
        "accordion",
        ["default", "ghost", "bordered", "sm", "lg", "single", "multiple"],
        (v: string) => `mild-accordion--${v}`,
      ],
      [
        "accordion trigger",
        ["disabled", "sm", "lg"],
        (v: string) => `mild-accordion-trigger--${v}`,
      ],
      [
        "textarea variant",
        ["outline", "filled", "flushed", "unstyled"],
        (v: string) => `mild-textarea--${v}`,
      ],
      ["textarea size", ["sm", "md", "lg"], (v: string) => `mild-textarea--${v}`],
      [
        "textarea resize",
        ["none", "vertical", "horizontal", "both"],
        (v: string) => `mild-textarea--resize-${v}`,
      ],
      [
        "icon button size",
        ["xs", "sm", "md", "lg", "xl", "round"],
        (v: string) => `mild-icon-button--${v}`,
      ],
      [
        "button group",
        ["attached", "vertical", "full-width"],
        (v: string) => `mild-button-group--${v}`,
      ],
      [
        "input group",
        [
          "sm",
          "md",
          "lg",
          "inline",
          "has-left-addon",
          "has-right-addon",
          "has-left-element",
          "has-right-element",
        ],
        (v: string) => `mild-input-group--${v}`,
      ],
      ["input addon", ["left", "right"], (v: string) => `mild-input-addon--${v}`],
      [
        "input element",
        ["left", "right", "interactive"],
        (v: string) => `mild-input-element--${v}`,
      ],
      [
        "segmented control",
        ["sm", "md", "lg", "vertical", "full-width"],
        (v: string) => `mild-segmented-control--${v}`,
      ],
      ["toggle variant", ["ghost", "outline"], (v: string) => `mild-toggle--${v}`],
      ["toggle size", ["sm", "md", "lg"], (v: string) => `mild-toggle--${v}`],
      ["toggle group", ["attached", "vertical"], (v: string) => `mild-toggle-group--${v}`],
      ["heading level", ["1", "2", "3", "4", "5", "6"], (v: string) => `mild-heading--level-${v}`],
      [
        "heading size",
        ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"],
        (v: string) => `mild-heading--${v}`,
      ],
      [
        "heading weight",
        ["thin", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
        (v: string) => `mild-heading--${v}`,
      ],
      [
        "heading align",
        ["left", "center", "right", "justify"],
        (v: string) => `mild-heading--${v}`,
      ],
      [
        "heading color",
        ["primary", "secondary", "success", "warning", "danger", "muted"],
        (v: string) => `mild-heading--${v}`,
      ],
      ["link underline", ["none", "hover", "always"], (v: string) => `mild-link--underline-${v}`],
      ["link state", ["plain", "disabled"], (v: string) => `mild-link--${v}`],
      ["code variant", ["subtle", "solid", "outline"], (v: string) => `mild-code--${v}`],
      ["code size", ["sm", "md", "lg", "block"], (v: string) => `mild-code--${v}`],
      ["kbd size", ["sm", "md", "lg"], (v: string) => `mild-kbd--${v}`],
      [
        "list marker",
        [
          "disc",
          "circle",
          "square",
          "decimal",
          "decimal-leading-zero",
          "lower-alpha",
          "upper-alpha",
          "lower-roman",
          "upper-roman",
          "none",
        ],
        (v: string) => `mild-list--marker-${v}`,
      ],
      ["list unstyled", ["unstyled"], (v: string) => `mild-list--${v}`],
      [
        "input variant",
        ["outline", "filled", "flushed", "unstyled"],
        (v: string) => `mild-input--${v}`,
      ],
    ])("%s values all have a rule", (_prop, values, toClass) => {
      const missing = values.filter((value) => !has(toClass(value)));
      expect(missing).toEqual([]);
    });
  });

  it("does not generate a second required marker with ::after", () => {
    expect(css).not.toMatch(/--required::after\s*\{[^}]*content:\s*"\*"/);
  });

  it("keeps spacing and dimension tokens in separate namespaces", () => {
    expect(css).toMatch(/--mild-space-3-5:\s*0\.875rem/);
    expect(css).toMatch(/--mild-dimension-3-5:\s*60%/);
    expect(css).not.toMatch(/--mild-space-3-5:\s*60%/);
  });
});
