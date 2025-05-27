import { describe, it, expect } from "vitest";
import { cn } from "./cn";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("should handle conditional classes", () => {
    expect(cn("base", { conditional: true, hidden: false })).toBe(
      "base conditional",
    );
  });

  it("should merge Tailwind classes correctly", () => {
    expect(cn("p-2 bg-red-500", "p-4")).toBe("bg-red-500 p-4");
  });

  it("should handle undefined and null values", () => {
    expect(cn("base", undefined, null, "extra")).toBe("base extra");
  });

  it("should work with arrays", () => {
    expect(cn(["foo", "bar"], "baz")).toBe("foo bar baz");
  });
});
