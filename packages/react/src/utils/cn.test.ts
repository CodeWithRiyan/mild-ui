import { describe, it, expect } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("base-class", "additional-class")).toBe("base-class additional-class");
  });

  it("drops falsy values", () => {
    const isActive = true;
    const isHidden = false;
    expect(cn("base-class", isActive && "conditional-class", isHidden && "hidden-class")).toBe(
      "base-class conditional-class",
    );
    expect(cn("base-class", undefined, null, "valid-class")).toBe("base-class valid-class");
  });

  it("keeps every class, in order: it does not resolve Tailwind-style conflicts", () => {
    expect(cn("mild-button--sm", "mild-button--lg")).toBe("mild-button--sm mild-button--lg");
  });

  it("accepts arrays and objects", () => {
    expect(cn(["a", "b"], { c: true, d: false })).toBe("a b c");
  });
});
