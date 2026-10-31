// Vue 3.3 and 3.4 have no `useId`; the composable must still produce ids there.
import { defineComponent, h } from "vue";
import { render } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { useId } from "./useId";

vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  return { ...actual, useId: undefined };
});

describe("useId on a Vue without useId()", () => {
  it("falls back to a prefixed counter inside a component", () => {
    const Probe = defineComponent({
      setup() {
        const id = useId("legacy");
        return () => h("i", id);
      },
    });
    const { container } = render(Probe);
    expect(container.textContent).toMatch(/^legacy-\d+$/);
  });
});
