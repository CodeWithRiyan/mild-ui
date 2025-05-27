// packages/core/src/components/Button/Button.styles.test.ts
import { describe, it, expect } from "vitest";
import { buttonVariants } from "./Button.styles";

describe("buttonVariants", () => {
  it("should generate correct classes for default variant", () => {
    const classes = buttonVariants({ variant: "primary", size: "md" });
    expect(classes).toContain("bg-primary");
    expect(classes).toContain("text-primary-foreground");
    expect(classes).toContain("h-10");
  });

  it("should generate correct classes for outline variant", () => {
    const classes = buttonVariants({ variant: "outline", size: "sm" });
    expect(classes).toContain("border");
    expect(classes).toContain("border-input");
    expect(classes).toContain("h-9");
  });

  it("should use default values when no props provided", () => {
    const classes = buttonVariants();
    expect(classes).toContain("bg-primary");
    expect(classes).toContain("h-10");
  });
});
