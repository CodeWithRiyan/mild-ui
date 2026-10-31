import { defineComponent, h, nextTick, ref, type PropType } from "vue";
import { render } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { useMachine } from "./useMachine";

interface FakeOptions {
  label: string;
  onPing?: (value: string) => void;
}

interface FakeInstance {
  element: HTMLElement;
  options: FakeOptions;
  destroy: () => void;
  ping: (value: string) => string | undefined;
}

const created: FakeInstance[] = [];

function createFake(element: HTMLElement, options: FakeOptions): FakeInstance {
  const instance: FakeInstance = {
    element,
    options,
    destroy: vi.fn(),
    ping: (value) => options.onPing?.(value) as string | undefined,
  };
  created.push(instance);
  return instance;
}

const sync = vi.fn();

const Harness = defineComponent({
  props: {
    label: { type: String, required: true },
    onPing: { type: Function as PropType<(value: string) => string>, default: undefined },
    dep: { type: Number, default: 0 },
    show: { type: Boolean, default: true },
  },
  setup(props) {
    const target = ref<HTMLDivElement | null>(null);
    const { instance } = useMachine(
      target,
      createFake,
      () => ({ label: props.label, onPing: props.onPing }),
      sync,
      () => props.dep,
    );
    return () =>
      props.show
        ? h("div", {
            ref: target,
            "data-testid": "target",
            "data-has-instance": String(instance.value !== null),
          })
        : h("p", "gone");
  },
});

describe("useMachine", () => {
  it("creates the instance on mount with the element, and destroys it on unmount", () => {
    created.length = 0;
    const { getByTestId, unmount } = render(Harness, { props: { label: "a" } });

    expect(created).toHaveLength(1);
    expect(created[0].element).toBe(getByTestId("target"));
    expect(created[0].options.label).toBe("a");

    unmount();

    expect(created[0].destroy).toHaveBeenCalledTimes(1);
  });

  it("routes callbacks to the latest props, not the ones that created the instance", async () => {
    created.length = 0;
    const first = vi.fn(() => "first");
    const second = vi.fn(() => "second");
    const { rerender } = render(Harness, { props: { label: "a", onPing: first } });

    await rerender({ label: "a", onPing: second });
    expect(created[0].ping("hello")).toBe("second");
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledWith("hello");

    // No callback at all: the forwarded wrapper is a no-op.
    await rerender({ label: "a", onPing: undefined });
    expect(created[0].ping("again")).toBeUndefined();
  });

  it("syncs after a callback returns and whenever the options change", async () => {
    created.length = 0;
    sync.mockClear();
    const { rerender } = render(Harness, { props: { label: "a", onPing: () => "x" } });
    await nextTick();
    sync.mockClear();

    created[0].ping("hello");
    expect(sync).toHaveBeenCalledTimes(1);
    expect(sync).toHaveBeenLastCalledWith(created[0], { label: "a", onPing: expect.any(Function) });

    await rerender({ label: "b", onPing: () => "x" });
    expect(sync).toHaveBeenLastCalledWith(created[0], { label: "b", onPing: expect.any(Function) });
  });

  it("recreates the instance on the same element when deps change", async () => {
    created.length = 0;
    const { rerender, getByTestId } = render(Harness, { props: { label: "a", dep: 1 } });
    expect(created).toHaveLength(1);

    await rerender({ label: "a", dep: 2 });

    expect(created).toHaveLength(2);
    expect(created[0].destroy).toHaveBeenCalledTimes(1);
    expect(created[1].element).toBe(getByTestId("target"));
  });

  it("destroys when the element leaves the DOM and rebuilds when it returns", async () => {
    created.length = 0;
    const { rerender, getByTestId } = render(Harness, { props: { label: "a" } });
    await nextTick();
    expect(getByTestId("target")).toHaveAttribute("data-has-instance", "true");

    await rerender({ label: "a", show: false });
    await nextTick();
    expect(created[0].destroy).toHaveBeenCalledTimes(1);

    await rerender({ label: "a", show: true });
    await nextTick();
    expect(created).toHaveLength(2);
    expect(created[1].element).toBe(getByTestId("target"));
  });
});
