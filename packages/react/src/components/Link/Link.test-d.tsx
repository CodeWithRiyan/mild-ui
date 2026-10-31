// packages/react/src/components/Link/Link.test-d.tsx
import * as React from "react";
import { describe, expectTypeOf, it } from "vitest";
import { Link, type LinkProps } from "./Link";

describe("Link types", () => {
  it("defaults to an anchor and follows `as`", () => {
    expectTypeOf<LinkProps>().toEqualTypeOf<LinkProps<"a">>();
    expectTypeOf<LinkProps<"button">["type"]>().toEqualTypeOf<
      React.ComponentPropsWithoutRef<"button">["type"]
    >();
    <Link as="button" type="button" ref={React.createRef<HTMLButtonElement>()} />;
    // @ts-expect-error an anchor ref does not fit a button element
    <Link as="button" ref={React.createRef<HTMLAnchorElement>()} />;
  });

  it("accepts a custom component through `as` (router links)", () => {
    const RouterLink = (props: { to: string; children?: React.ReactNode }) => (
      <a href={props.to}>{props.children}</a>
    );
    <Link as={RouterLink} to="/docs" underline="always">
      Docs
    </Link>;
    // @ts-expect-error the component's own props are still checked
    <Link as={RouterLink} href="/docs">
      Docs
    </Link>;
  });

  it("link props are a closed set of keywords", () => {
    <Link href="/" underline="none" external plain disabled />;
    // @ts-expect-error not an underline mode
    <Link underline="sometimes" />;
    // @ts-expect-error external is a flag
    <Link external="yes" />;
  });

  it("contains no any", () => {
    expectTypeOf(Link).not.toBeAny();
    expectTypeOf<LinkProps["underline"]>().not.toBeAny();
  });
});
