import * as React from "react";
import { act, render } from "@testing-library/react";
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
  ping: (value: string) => void;
}

const created: FakeInstance[] = [];

function createFake(element: HTMLElement, options: FakeOptions): FakeInstance {
  const instance: FakeInstance = {
    element,
    options,
    destroy: vi.fn(),
    ping: (value) => options.onPing?.(value),
  };
  created.push(instance);
  return instance;
}

function Harness({ label, onPing, deps = [] }: FakeOptions & { deps?: React.DependencyList }) {
  const sync = vi.fn();
  const { ref, instance } = useMachine(createFake, { label, onPing }, sync, deps);
  return (
    <div ref={ref} data-testid="target" data-has-instance={String(instance.current !== null)} />
  );
}

describe("useMachine", () => {
  it("creates the instance on mount with the element, and destroys it on unmount", () => {
    created.length = 0;
    const { getByTestId, unmount } = render(<Harness label="a" />);

    expect(created).toHaveLength(1);
    expect(created[0].element).toBe(getByTestId("target"));
    expect(created[0].options.label).toBe("a");

    unmount();

    expect(created[0].destroy).toHaveBeenCalledTimes(1);
  });

  it("routes callbacks to the latest render, not the one that created the instance", () => {
    created.length = 0;
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = render(<Harness label="a" onPing={first} />);

    rerender(<Harness label="a" onPing={second} />);
    act(() => created[0].ping("hello"));

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledWith("hello");
    expect(created).toHaveLength(1);
  });

  it("ignores a callback that was removed on a later render", () => {
    created.length = 0;
    const first = vi.fn();
    const { rerender } = render(<Harness label="a" onPing={first} />);

    rerender(<Harness label="a" />);
    expect(() => act(() => created[0].ping("hello"))).not.toThrow();
    expect(first).not.toHaveBeenCalled();
  });

  it("recreates the instance on the same element when deps change", () => {
    created.length = 0;
    const { rerender, getByTestId } = render(<Harness label="a" deps={[1]} />);
    expect(created).toHaveLength(1);

    rerender(<Harness label="b" deps={[2]} />);

    expect(created).toHaveLength(2);
    expect(created[0].destroy).toHaveBeenCalledTimes(1);
    expect(created[1].element).toBe(getByTestId("target"));
    expect(created[1].options.label).toBe("b");
  });

  it("does not recreate when deps are unchanged", () => {
    created.length = 0;
    const { rerender } = render(<Harness label="a" deps={[1]} />);

    rerender(<Harness label="b" deps={[1]} />);

    expect(created).toHaveLength(1);
  });

  it("calls sync with the current options after every render", () => {
    const calls: string[] = [];
    function Synced({ label }: { label: string }) {
      const { ref } = useMachine(createFake, { label }, (instance, options) => {
        calls.push(`${options.label}:${instance.options.label}`);
      });
      return <div ref={ref} />;
    }
    const { rerender } = render(<Synced label="a" />);
    rerender(<Synced label="b" />);

    // Options come from each render; the instance still holds the ones it was created with.
    expect(calls).toEqual(["a:a", "b:a"]);
  });

  it("returns a stable result, so a composed ref callback does not recreate the instance", () => {
    const seen: unknown[] = [];
    function Composed({ label }: { label: string }) {
      const machine = useMachine(createFake, { label });
      seen.push(machine);
      // The pattern every component uses: compose the machine ref with a forwarded ref.
      const composedRef = React.useCallback(
        (element: HTMLDivElement | null) => machine.ref(element),
        [machine],
      );
      return <div ref={composedRef} />;
    }
    const before = created.length;
    const { rerender } = render(<Composed label="a" />);
    rerender(<Composed label="b" />);
    rerender(<Composed label="c" />);

    expect(seen[0]).toBe(seen[1]);
    expect(seen[1]).toBe(seen[2]);
    expect(created.length - before).toBe(1);
    expect(created[before].destroy).not.toHaveBeenCalled();
  });
});
