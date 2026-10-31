// packages/vue/src/components/icons.ts
// Default glyphs for components that take an icon through a slot. Each is a plain inline SVG so
// the package has no icon dependency; pass your own slot content to replace them.
import { h, type FunctionalComponent, type SVGAttributes } from "vue";

type IconProps = SVGAttributes;

const BASE: SVGAttributes = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true",
  focusable: "false",
};

function icon(name: string, paths: () => ReturnType<typeof h>[]): FunctionalComponent<IconProps> {
  const component: FunctionalComponent<IconProps> = (props) =>
    h("svg", { ...BASE, ...props }, paths());
  component.displayName = name;
  return component;
}

export const CheckIcon = icon("CheckIcon", () => [h("path", { d: "M20 6 9 17l-5-5" })]);

export const MinusIcon = icon("MinusIcon", () => [h("path", { d: "M5 12h14" })]);

export const DotIcon = icon("DotIcon", () => [
  h("circle", { cx: 12, cy: 12, r: 5, fill: "currentColor", stroke: "none" }),
]);

export const ChevronDownIcon = icon("ChevronDownIcon", () => [h("path", { d: "m6 9 6 6 6-6" })]);

export const EyeIcon = icon("EyeIcon", () => [
  h("path", { d: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" }),
  h("circle", { cx: 12, cy: 12, r: 3 }),
]);

export const EyeOffIcon = icon("EyeOffIcon", () => [
  h("path", { d: "M9.9 4.2A10.9 10.9 0 0 1 12 4c6.5 0 10 8 10 8a18 18 0 0 1-2.2 3.2" }),
  h("path", { d: "M6.6 6.6C3.6 8.6 2 12 2 12s3.5 8 10 8a9.7 9.7 0 0 0 5.4-1.6" }),
  h("path", { d: "M14.1 14.1a3 3 0 1 1-4.2-4.2" }),
  h("path", { d: "m2 2 20 20" }),
]);

export const XIcon = icon("XIcon", () => [
  h("path", { d: "M18 6 6 18" }),
  h("path", { d: "m6 6 12 12" }),
]);

export const InfoIcon = icon("InfoIcon", () => [
  h("circle", { cx: 12, cy: 12, r: 10 }),
  h("path", { d: "M12 16v-4" }),
  h("path", { d: "M12 8h.01" }),
]);

export const CheckCircleIcon = icon("CheckCircleIcon", () => [
  h("circle", { cx: 12, cy: 12, r: 10 }),
  h("path", { d: "m9 12 2 2 4-4" }),
]);

export const AlertTriangleIcon = icon("AlertTriangleIcon", () => [
  h("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" }),
  h("path", { d: "M12 9v4" }),
  h("path", { d: "M12 17h.01" }),
]);

export const XCircleIcon = icon("XCircleIcon", () => [
  h("circle", { cx: 12, cy: 12, r: 10 }),
  h("path", { d: "m15 9-6 6" }),
  h("path", { d: "m9 9 6 6" }),
]);

/** The default glyph for a status (alerts, toasts). */
export const StatusIcon: FunctionalComponent<
  IconProps & { status: "info" | "success" | "warning" | "error" }
> = ({ status, ...props }) => {
  switch (status) {
    case "success":
      return h(CheckCircleIcon, props);
    case "warning":
      return h(AlertTriangleIcon, props);
    case "error":
      return h(XCircleIcon, props);
    default:
      return h(InfoIcon, props);
  }
};
StatusIcon.props = ["status"];

export const UserIcon = icon("UserIcon", () => [
  h("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }),
  h("circle", { cx: 12, cy: 7, r: 4 }),
]);

export const ImageIcon = icon("ImageIcon", () => [
  h("rect", { width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 }),
  h("circle", { cx: 9, cy: 9, r: 2 }),
  h("path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }),
]);

export const ArrowUpIcon = icon("ArrowUpIcon", () => [
  h("path", { d: "m5 12 7-7 7 7" }),
  h("path", { d: "M12 19V5" }),
]);

export const ArrowDownIcon = icon("ArrowDownIcon", () => [
  h("path", { d: "M12 5v14" }),
  h("path", { d: "m19 12-7 7-7-7" }),
]);
