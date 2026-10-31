import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./Select";

const options = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada", disabled: true },
  { value: "mx", label: "Mexico" },
];

describe("Select (driven by @mild-ui/primitives/listbox)", () => {
  it("renders a closed combobox showing the placeholder", () => {
    render(<Select options={options} placeholder="Pick a country" />);
    const trigger = screen.getByRole("combobox");

    expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveTextContent("Pick a country");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("opens on click with a focused listbox, and shows the selected option", () => {
    render(<Select options={options} defaultValue="mx" />);
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent("Mexico");

    fireEvent.click(trigger);

    const listbox = screen.getByRole("listbox");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", listbox.id);
    expect(document.activeElement).toBe(listbox);
    expect(screen.getByRole("option", { name: "Mexico" })).toHaveAttribute("aria-selected", "true");
    expect(listbox).toHaveAttribute(
      "aria-activedescendant",
      screen.getByRole("option", { name: "Mexico" }).id,
    );
  });

  it("opens with the keyboard from the trigger", () => {
    render(<Select options={options} />);

    fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowDown" });

    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("navigates with arrows, highlights the active option and selects on Enter", () => {
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    const listbox = screen.getByRole("listbox");

    fireEvent.keyDown(listbox, { key: "ArrowDown" });
    expect(screen.getByRole("option", { name: "United States" })).toHaveAttribute(
      "data-highlighted",
    );
    expect(onChange).not.toHaveBeenCalled();

    // Canada is disabled, so the next stop is Mexico.
    fireEvent.keyDown(listbox, { key: "ArrowDown" });
    expect(screen.getByRole("option", { name: "Mexico" })).toHaveAttribute("data-highlighted");

    fireEvent.keyDown(listbox, { key: "Enter" });

    expect(onChange).toHaveBeenCalledWith("mx");
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(screen.getByRole("combobox")).toHaveTextContent("Mexico");
    expect(document.activeElement).toBe(screen.getByRole("combobox"));
  });

  it("types ahead to an option", () => {
    render(<Select options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    const listbox = screen.getByRole("listbox");

    fireEvent.keyDown(listbox, { key: "m" });

    expect(screen.getByRole("option", { name: "Mexico" })).toHaveAttribute("data-highlighted");
  });

  it("selects on click, ignoring disabled options", () => {
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("combobox"));

    fireEvent.click(screen.getByRole("option", { name: "Canada" }));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("option", { name: "United States" }));
    expect(onChange).toHaveBeenCalledWith("us");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("closes on Escape and returns focus to the trigger, keeping the value", () => {
    render(<Select options={options} defaultValue="us" />);
    fireEvent.click(screen.getByRole("combobox"));

    fireEvent.keyDown(screen.getByRole("listbox"), { key: "Escape" });

    expect(screen.queryByRole("listbox")).toBeNull();
    expect(document.activeElement).toBe(screen.getByRole("combobox"));
    expect(screen.getByRole("combobox")).toHaveTextContent("United States");
  });

  it("closes when clicking outside", () => {
    render(
      <div>
        <Select options={options} />
        <button type="button">elsewhere</button>
      </div>,
    );
    fireEvent.click(screen.getByRole("combobox"));

    fireEvent.pointerDown(screen.getByText("elsewhere"));

    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("follows the controlled value", () => {
    const { rerender } = render(<Select options={options} value="us" />);
    expect(screen.getByRole("combobox")).toHaveTextContent("United States");

    rerender(<Select options={options} value="mx" />);
    expect(screen.getByRole("combobox")).toHaveTextContent("Mexico");
  });

  it("does not open while disabled", () => {
    render(<Select options={options} disabled />);

    fireEvent.click(screen.getByRole("combobox"));

    expect(screen.getByRole("combobox")).toBeDisabled();
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("renders the default chevron and check mark, or the icons passed in", () => {
    const { rerender } = render(<Select options={options} defaultValue="us" />);
    expect(screen.getByRole("combobox").querySelector("[data-icon] svg")).not.toBeNull();

    rerender(
      <Select
        options={options}
        defaultValue="us"
        icon={<span data-testid="chevron" />}
        itemIndicator={<span data-testid="check" />}
      />,
    );
    expect(screen.getByTestId("chevron")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByTestId("check")).toBeInTheDocument();
  });

  it("submits the value through a hidden input when given a name", () => {
    const { container } = render(<Select options={options} name="country" defaultValue="mx" />);

    expect(container.querySelector<HTMLInputElement>('input[name="country"]')?.value).toBe("mx");
  });

  it("submits the chosen value inside a <form>, like a native select", () => {
    let data: FormData | null = null;
    render(
      <form
        onSubmit={(event) => {
          event.preventDefault();
          data = new FormData(event.currentTarget);
        }}
      >
        <Select options={options} name="country" placeholder="Pick" />
        <button type="submit">send</button>
      </form>,
    );

    fireEvent.click(screen.getByText("send"));
    expect(data!.get("country")).toBe("");

    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "Mexico" }));
    fireEvent.click(screen.getByText("send"));
    expect(data!.get("country")).toBe("mx");
  });

  it("jumps to the first and last enabled option with Home and End", () => {
    render(<Select options={options} defaultValue="us" />);
    fireEvent.click(screen.getByRole("combobox"));
    const listbox = screen.getByRole("listbox");

    fireEvent.keyDown(listbox, { key: "End" });
    expect(listbox).toHaveAttribute(
      "aria-activedescendant",
      screen.getByRole("option", { name: "Mexico" }).id,
    );

    fireEvent.keyDown(listbox, { key: "Home" });
    expect(listbox).toHaveAttribute(
      "aria-activedescendant",
      screen.getByRole("option", { name: "United States" }).id,
    );
    // Moving the active option does not select it; Enter does.
    expect(screen.getByRole("combobox")).toHaveTextContent("United States");
  });

  it("keeps the listbox keyboard contract when the trigger is opened with the keyboard", () => {
    render(<Select options={options} />);
    const trigger = screen.getByRole("combobox");

    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    const listbox = screen.getByRole("listbox");
    expect(document.activeElement).toBe(listbox);

    fireEvent.keyDown(listbox, { key: "m" });
    fireEvent.keyDown(listbox, { key: "Enter" });
    expect(trigger).toHaveTextContent("Mexico");
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});
