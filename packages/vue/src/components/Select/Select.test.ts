import { defineComponent, h, nextTick, ref } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { selectCases } from "@mild-ui/test-cases/select";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Select, SelectRoot, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./index";

const options = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada", disabled: true },
  { value: "mx", label: "Mexico" },
];

runComponentCases(selectCases, (c) => h(Select, caseProps(c)));

/** The popup listbox; `null` while closed (it stays mounted but hidden). */
const queryListbox = () => screen.queryByRole("listbox");

describe("Select (driven by @mild-ui/primitives/listbox)", () => {
  it("renders a closed combobox showing the placeholder", () => {
    render(h(Select, { options, placeholder: "Pick a country" }));
    const trigger = screen.getByRole("combobox");

    expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("data-placeholder", "");
    expect(trigger).toHaveAttribute("type", "button");
    expect(trigger).toHaveTextContent("Pick a country");
    expect(trigger.querySelector(".mild-select-placeholder")).not.toBeNull();
    expect(queryListbox()).toBeNull();
  });

  it("opens on click with a focused listbox, and shows the selected option", async () => {
    render(h(Select, { options, defaultValue: "mx" }));
    // Items register their labels with the root once mounted; the trigger shows it a tick later.
    await nextTick();
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent("Mexico");
    expect(trigger).not.toHaveAttribute("data-placeholder");

    await fireEvent.click(trigger);

    const listbox = screen.getByRole("listbox");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", listbox.id);
    expect(trigger).toHaveAttribute("data-state", "open");
    expect(document.activeElement).toBe(listbox);
    const mexico = screen.getByRole("option", { name: "Mexico" });
    expect(mexico).toHaveAttribute("aria-selected", "true");
    expect(mexico).toHaveAttribute("data-selected", "");
    expect(listbox).toHaveAttribute("aria-activedescendant", mexico.id);
  });

  it.each(["ArrowDown", "ArrowUp", "Enter", " "])(
    "opens with %j from the trigger and moves focus into the listbox",
    async (key) => {
      render(h(Select, { options }));

      await fireEvent.keyDown(screen.getByRole("combobox"), { key });

      expect(screen.getByRole("listbox")).toBeInTheDocument();
      expect(document.activeElement).toBe(screen.getByRole("listbox"));
    },
  );

  it("ignores other keys on the trigger", async () => {
    render(h(Select, { options }));
    await fireEvent.keyDown(screen.getByRole("combobox"), { key: "a" });
    expect(queryListbox()).toBeNull();
  });

  it("navigates with arrows, highlights the active option and selects on Enter", async () => {
    const onChange = vi.fn();
    const { emitted } = render(h(Select, { options, onChange }));
    await fireEvent.click(screen.getByRole("combobox"));
    const listbox = screen.getByRole("listbox");

    await fireEvent.keyDown(listbox, { key: "ArrowDown" });
    expect(screen.getByRole("option", { name: "United States" })).toHaveAttribute(
      "data-highlighted",
    );
    expect(onChange).not.toHaveBeenCalled();

    // Canada is disabled, so the next stop is Mexico.
    await fireEvent.keyDown(listbox, { key: "ArrowDown" });
    expect(screen.getByRole("option", { name: "Mexico" })).toHaveAttribute("data-highlighted");

    await fireEvent.keyDown(listbox, { key: "Enter" });

    expect(onChange).toHaveBeenCalledWith("mx");
    expect(emitted("update:modelValue")).toEqual([["mx"]]);
    expect(queryListbox()).toBeNull();
    expect(screen.getByRole("combobox")).toHaveTextContent("Mexico");
    expect(document.activeElement).toBe(screen.getByRole("combobox"));
  });

  it("selects the highlighted option with Space", async () => {
    const onChange = vi.fn();
    render(h(Select, { options, onChange }));
    await fireEvent.click(screen.getByRole("combobox"));
    const listbox = screen.getByRole("listbox");

    await fireEvent.keyDown(listbox, { key: "ArrowDown" });
    await fireEvent.keyDown(listbox, { key: " " });

    expect(onChange).toHaveBeenCalledWith("us");
    expect(queryListbox()).toBeNull();
  });

  it("types ahead to an option", async () => {
    render(h(Select, { options }));
    await fireEvent.click(screen.getByRole("combobox"));
    const listbox = screen.getByRole("listbox");

    await fireEvent.keyDown(listbox, { key: "m" });

    expect(screen.getByRole("option", { name: "Mexico" })).toHaveAttribute("data-highlighted");
  });

  it("selects on click, ignoring disabled options", async () => {
    const onChange = vi.fn();
    render(h(Select, { options, onChange }));
    await fireEvent.click(screen.getByRole("combobox"));

    await fireEvent.click(screen.getByRole("option", { name: "Canada" }));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole("option", { name: "Canada" })).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await fireEvent.click(screen.getByRole("option", { name: "United States" }));
    expect(onChange).toHaveBeenCalledWith("us");
    expect(queryListbox()).toBeNull();
  });

  it("closes on Escape and returns focus to the trigger, keeping the value", async () => {
    render(h(Select, { options, defaultValue: "us" }));
    await fireEvent.click(screen.getByRole("combobox"));

    await fireEvent.keyDown(screen.getByRole("listbox"), { key: "Escape" });

    expect(queryListbox()).toBeNull();
    expect(document.activeElement).toBe(screen.getByRole("combobox"));
    expect(screen.getByRole("combobox")).toHaveTextContent("United States");
  });

  it("closes when tabbing out of the listbox", async () => {
    render(h(Select, { options }));
    await fireEvent.click(screen.getByRole("combobox"));

    await fireEvent.keyDown(screen.getByRole("listbox"), { key: "Tab" });

    expect(queryListbox()).toBeNull();
  });

  it("closes when clicking outside, and toggles closed from the trigger", async () => {
    render(
      asComponent(() =>
        h("div", [h(Select, { options }), h("button", { type: "button" }, "elsewhere")]),
      ),
    );
    await fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await fireEvent.pointerDown(screen.getByText("elsewhere"));
    expect(queryListbox()).toBeNull();

    await fireEvent.click(screen.getByRole("combobox"));
    await fireEvent.pointerDown(screen.getByRole("listbox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await fireEvent.click(screen.getByRole("combobox"));
    expect(queryListbox()).toBeNull();
  });

  it("follows the controlled value", async () => {
    const { rerender } = render(h(Select, { options, modelValue: "us" }));
    await nextTick();
    expect(screen.getByRole("combobox")).toHaveTextContent("United States");

    await rerender({ modelValue: "mx" });
    expect(screen.getByRole("combobox")).toHaveTextContent("Mexico");

    // The parent ignores the change: the trigger keeps showing its value.
    await fireEvent.click(screen.getByRole("combobox"));
    await fireEvent.click(screen.getByRole("option", { name: "United States" }));
    expect(screen.getByRole("combobox")).toHaveTextContent("Mexico");
  });

  it("supports v-model and v-model:open", async () => {
    const Harness = defineComponent({
      setup() {
        const value = ref<string | undefined>(undefined);
        const open = ref(false);
        return () => [
          h(Select, {
            options,
            modelValue: value.value,
            open: open.value,
            "onUpdate:modelValue": (v) => (value.value = v),
            "onUpdate:open": (o) => (open.value = o),
          }),
          h("output", `${value.value ?? ""}|${open.value}`),
        ];
      },
    });
    render(Harness);

    await fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("status")).toHaveTextContent("|true");
    await fireEvent.click(screen.getByRole("option", { name: "Mexico" }));
    expect(screen.getByRole("status")).toHaveTextContent("mx|false");
    expect(screen.getByRole("combobox")).toHaveTextContent("Mexico");
  });

  it("stays closed while controlled open is false, and opens with defaultOpen", async () => {
    render(h(Select, { options, open: false }));
    await fireEvent.click(screen.getByRole("combobox"));
    expect(queryListbox()).toBeNull();

    render(h(Select, { options, defaultOpen: true, "aria-label": "Open one" }));
    expect(screen.getByRole("combobox", { name: "Open one" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("does not open while disabled", async () => {
    render(h(Select, { options, disabled: true }));

    await fireEvent.click(screen.getByRole("combobox"));

    expect(screen.getByRole("combobox")).toBeDisabled();
    expect(queryListbox()).toBeNull();
  });

  it("renders the default chevron and check mark, or the icons passed in", async () => {
    const { container } = render(h(Select, { options, defaultValue: "us" }));
    expect(container.querySelector("[data-icon] svg")).not.toBeNull();
    await fireEvent.click(screen.getByRole("combobox"));
    expect(container.querySelector(".mild-select-item__indicator svg")).not.toBeNull();

    render(
      h(
        Select,
        { options, defaultValue: "us", "aria-label": "Custom icons" },
        {
          icon: () => h("span", { "data-testid": "chevron" }),
          itemIndicator: () => h("span", { "data-testid": "check" }),
        },
      ),
    );
    expect(screen.getByTestId("chevron")).toBeInTheDocument();
    await fireEvent.click(screen.getByRole("combobox", { name: "Custom icons" }));
    expect(screen.getByTestId("check")).toBeInTheDocument();
  });

  it("styles the trigger: size, full width, error, required, class and id", () => {
    render(
      h(Select, {
        options,
        id: "country",
        size: "lg",
        fullWidth: true,
        error: true,
        required: true,
        class: "custom",
      }),
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("id", "country");
    expect(trigger).toHaveAttribute("aria-required", "true");
    expect(trigger).toHaveClass(
      "mild-select-trigger",
      "mild-select-trigger--lg",
      "mild-select-trigger--full-width",
      "mild-select-trigger--error",
      "custom",
    );
  });

  it("applies the ui classes per part", async () => {
    const { container } = render(
      h(Select, {
        options,
        defaultValue: "us",
        ui: { root: "r", trigger: "t", value: "v", icon: "i", content: "c", item: "o" },
      }),
    );
    await fireEvent.click(screen.getByRole("combobox"));
    expect(container.firstElementChild).toHaveClass("mild-select", "r");
    expect(screen.getByRole("combobox")).toHaveClass("mild-select-trigger", "t");
    expect(container.querySelector(".mild-select-value")).toHaveClass("v");
    expect(container.querySelector("[data-icon]")).toHaveClass("mild-select-icon", "i");
    expect(container.querySelector(".mild-select-content")).toHaveClass("c");
    for (const option of screen.getAllByRole("option")) {
      expect(option).toHaveClass("mild-select-item", "o");
    }
  });

  it("submits the chosen value inside a <form>, like a native select", async () => {
    const { container } = render(
      asComponent(() =>
        h("form", [
          h(Select, { options, name: "country", placeholder: "Pick" }),
          h("button", { type: "submit" }, "send"),
        ]),
      ),
    );
    const form = container.querySelector("form")!;

    expect(new FormData(form).get("country")).toBe("");

    await fireEvent.click(screen.getByRole("combobox"));
    await fireEvent.click(screen.getByRole("option", { name: "Mexico" }));
    expect(new FormData(form).get("country")).toBe("mx");
  });

  it("jumps to the first and last enabled option with Home and End", async () => {
    render(h(Select, { options, defaultValue: "us" }));
    await fireEvent.click(screen.getByRole("combobox"));
    const listbox = screen.getByRole("listbox");

    await fireEvent.keyDown(listbox, { key: "End" });
    expect(listbox).toHaveAttribute(
      "aria-activedescendant",
      screen.getByRole("option", { name: "Mexico" }).id,
    );

    await fireEvent.keyDown(listbox, { key: "Home" });
    expect(listbox).toHaveAttribute(
      "aria-activedescendant",
      screen.getByRole("option", { name: "United States" }).id,
    );
    // Moving the active option does not select it; Enter does.
    expect(screen.getByRole("combobox")).toHaveTextContent("United States");
  });

  it("keeps the listbox keyboard contract when the trigger is opened with the keyboard", async () => {
    render(h(Select, { options }));
    const trigger = screen.getByRole("combobox");

    await fireEvent.keyDown(trigger, { key: "ArrowDown" });
    const listbox = screen.getByRole("listbox");
    expect(document.activeElement).toBe(listbox);

    await fireEvent.keyDown(listbox, { key: "m" });
    await fireEvent.keyDown(listbox, { key: "Enter" });
    expect(trigger).toHaveTextContent("Mexico");
    expect(queryListbox()).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("picks up options added after mount", async () => {
    const { rerender } = render(h(Select, { options: options.slice(0, 1) }));
    await rerender({ options });
    await nextTick();
    await fireEvent.click(screen.getByRole("combobox"));
    await fireEvent.click(screen.getByRole("option", { name: "Mexico" }));
    expect(screen.getByRole("combobox")).toHaveTextContent("Mexico");
  });
});

describe("Select parts composed by hand", () => {
  function Composed(extra: Record<string, unknown> = {}) {
    return asComponent(() =>
      h(SelectRoot, { defaultValue: "b", name: "letter", ...extra }, () => [
        h(SelectTrigger, { size: "sm" }, () => h(SelectValue, { placeholder: "Letter" })),
        h(SelectContent, { position: "item-aligned" }, () => [
          h(SelectItem, { value: "a" }, () => "Alpha"),
          h(
            SelectItem,
            { value: "b", size: "lg" },
            { default: () => "Bravo", indicator: () => h("i", { "data-testid": "item-check" }) },
          ),
          h(SelectItem, { value: "c", disabled: true }, () => "Charlie"),
        ]),
      ]),
    );
  }

  it("shares state between the parts", async () => {
    const { container } = render(Composed());
    await nextTick();
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent("Bravo");
    expect(trigger).toHaveClass("mild-select-trigger--sm");
    expect(container.querySelector(".mild-select-content--item-aligned")).not.toBeNull();
    expect(container.querySelector<HTMLInputElement>('input[name="letter"]')?.value).toBe("b");

    await fireEvent.click(trigger);
    expect(screen.getByTestId("item-check")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Bravo" })).toHaveClass("mild-select-item--lg");
    expect(screen.getByRole("option", { name: "Alpha" })).toHaveClass("mild-select-item--md");

    await fireEvent.click(screen.getByRole("option", { name: "Alpha" }));
    expect(trigger).toHaveTextContent("Alpha");
    expect(container.querySelector<HTMLInputElement>('input[name="letter"]')?.value).toBe("a");
  });

  it("lets the trigger take the root's size and override disabled", async () => {
    render(
      asComponent(() =>
        h(SelectRoot, { size: "lg", disabled: true }, () => [
          h(SelectTrigger, { disabled: false }, () => h(SelectValue, { placeholder: "x" })),
          h(SelectContent, () => [h(SelectItem, { value: "a" }, () => "Alpha")]),
        ]),
      ),
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveClass("mild-select-trigger--lg");
    expect(trigger).toBeEnabled();
    // The root is disabled, so it still refuses to open.
    await fireEvent.click(trigger);
    expect(queryListbox()).toBeNull();
  });

  it("honours consumer click/keydown handlers that prevent default", async () => {
    const onClick = vi.fn((event: MouseEvent) => event.preventDefault());
    const onKeydown = vi.fn((event: KeyboardEvent) => event.preventDefault());
    render(
      asComponent(() =>
        h(SelectRoot, () => [
          h(SelectTrigger, { onClick, onKeydown }, () => h(SelectValue)),
          h(SelectContent, () => [h(SelectItem, { value: "a" }, () => "Alpha")]),
        ]),
      ),
    );
    await fireEvent.click(screen.getByRole("combobox"));
    await fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowDown" });
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onKeydown).toHaveBeenCalledTimes(1);
    expect(queryListbox()).toBeNull();
  });

  it("forgets an item's label when it unmounts", async () => {
    const show = ref(true);
    render(
      asComponent(() =>
        h(SelectRoot, { defaultValue: "a" }, () => [
          h(SelectTrigger, () => h(SelectValue, { placeholder: "None" })),
          h(SelectContent, () => [
            show.value ? h(SelectItem, { value: "a" }, () => "Alpha") : null,
            h(SelectItem, { value: "b" }, () => "Bravo"),
          ]),
        ]),
      ),
    );
    await nextTick();
    expect(screen.getByRole("combobox")).toHaveTextContent("Alpha");
    show.value = false;
    await nextTick();
    expect(screen.getByRole("combobox")).toHaveTextContent("None");
  });

  it.each([
    ["SelectTrigger", SelectTrigger],
    ["SelectValue", SelectValue],
    ["SelectContent", SelectContent],
    ["SelectItem", SelectItem],
  ])("throws a helpful error when %s is used outside a Select", (name, Part) => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(() => render(h(Part, { value: "x" }))).toThrow(
      `<${name}> must be used inside <Select> or <SelectRoot>`,
    );
    warn.mockRestore();
  });
});

itHasNoSeriousAxeViolations("Select", () =>
  h("div", [
    h(Select, { options, placeholder: "Closed", "aria-label": "Country" }),
    h(Select, { options, defaultValue: "mx", defaultOpen: true, "aria-label": "Open" }),
    h(Select, { options, disabled: true, error: true, "aria-label": "Disabled" }),
  ]),
);
