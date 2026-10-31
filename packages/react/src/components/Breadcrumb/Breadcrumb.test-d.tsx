// packages/react/src/components/Breadcrumb/Breadcrumb.test-d.tsx
import * as React from "react";
import { describe, expectTypeOf, it } from "vitest";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  type BreadcrumbProps,
} from "./Breadcrumb";

describe("Breadcrumb types", () => {
  it("defaults to a nav and follows `as`", () => {
    expectTypeOf<BreadcrumbProps>().toEqualTypeOf<BreadcrumbProps<"nav">>();
    <Breadcrumb as="div" ref={React.createRef<HTMLDivElement>()} />;
    // @ts-expect-error a div ref does not fit a form element
    <Breadcrumb as="form" ref={React.createRef<HTMLDivElement>()} />;
  });

  it("items are label/href/current records", () => {
    <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Here" }]} />;
    <Breadcrumb items={[{ label: "Docs", href: "/docs", current: true }]} separator="›" />;
    // @ts-expect-error the label is required
    <Breadcrumb items={[{ href: "/" }]} />;
    // @ts-expect-error unknown key
    <Breadcrumb items={[{ label: "Home", url: "/" }]} />;
  });

  it("exposes the compound parts", () => {
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>;
    <BreadcrumbLink current>Here</BreadcrumbLink>;
    <BreadcrumbSeparator>/</BreadcrumbSeparator>;
    expectTypeOf(BreadcrumbItem).not.toBeAny();
    expectTypeOf(BreadcrumbLink).not.toBeAny();
    expectTypeOf(BreadcrumbSeparator).not.toBeAny();
  });

  it("contains no any", () => {
    expectTypeOf(Breadcrumb).not.toBeAny();
    expectTypeOf<BreadcrumbProps["items"]>().not.toBeAny();
  });
});
