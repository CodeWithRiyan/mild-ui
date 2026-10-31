import { defineComponent, h } from "vue";
import { render } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { useId } from "./useId";

describe("useId", () => {
  it("returns a unique id per call inside a component", () => {
    const seen: string[] = [];
    const Probe = defineComponent({
      setup() {
        seen.push(useId(), useId());
        return () => h("i");
      },
    });
    render(Probe);
    expect(seen).toHaveLength(2);
    expect(seen[0]).not.toBe(seen[1]);
    expect(seen.every((id) => id.length > 0)).toBe(true);
  });

  it("falls back to a prefixed counter outside a component", () => {
    const outside = useId("test");
    expect(outside).toMatch(/^test-\d+$/);
    expect(useId("test")).not.toBe(outside);
  });
});
