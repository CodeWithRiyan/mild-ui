import { afterEach, describe, expect, it, vi } from "vitest";
import { createField } from "./field";

interface Parts {
  control: HTMLElement;
  label: HTMLLabelElement;
  span: HTMLElement;
  description: HTMLElement;
  error: HTMLElement;
}

function mount(): Parts {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <label></label>
    <span></span>
    <input type="text" />
    <p></p>
    <strong></strong>
  `;
  document.body.append(wrapper);
  return {
    label: wrapper.querySelector("label") as HTMLLabelElement,
    span: wrapper.querySelector("span") as HTMLElement,
    control: wrapper.querySelector("input") as HTMLElement,
    description: wrapper.querySelector("p") as HTMLElement,
    error: wrapper.querySelector("strong") as HTMLElement,
  };
}

function describedBy(control: HTMLElement): string[] {
  const value = control.getAttribute("aria-describedby");
  return value === null ? [] : value.split(" ");
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("createField: ids", () => {
  it("generates an id for a control that has none", () => {
    const { control } = mount();
    const field = createField({ control });

    expect(control.id).toMatch(/^mild-field-\d+$/);
    expect(field.ids.control).toBe(control.id);
  });

  it("keeps an id the control already has", () => {
    const { control } = mount();
    control.id = "email";
    const field = createField({ control });

    expect(control.id).toBe("email");
    expect(field.ids.control).toBe("email");
  });

  it("derives every id from an explicit base id", () => {
    const { control, label, description, error } = mount();
    const field = createField({ control, label, description, error, id: "signup-email" });

    expect(field.ids).toEqual({
      control: "signup-email",
      label: "signup-email-label",
      description: "signup-email-description",
      error: "signup-email-error",
    });
    expect(control.id).toBe("signup-email");
    expect(label.id).toBe("signup-email-label");
    expect(description.id).toBe("signup-email-description");
    expect(error.id).toBe("signup-email-error");
  });

  it("keeps ids the parts already have", () => {
    const { control, label, description, error } = mount();
    label.id = "my-label";
    description.id = "my-description";
    error.id = "my-error";
    const field = createField({ control, label, description, error, id: "base" });

    expect(field.ids).toEqual({
      control: "base",
      label: "my-label",
      description: "my-description",
      error: "my-error",
    });
  });

  it("gives each generated field a distinct id", () => {
    const first = createField({ control: mount().control });
    const second = createField({ control: mount().control });

    expect(first.ids.control).not.toBe(second.ids.control);
  });
});

describe("createField: label", () => {
  it("wires a <label> with for", () => {
    const { control, label } = mount();
    createField({ control, label, id: "email" });

    expect(label.getAttribute("for")).toBe("email");
    expect(control.hasAttribute("aria-labelledby")).toBe(false);
  });

  it("wires a non-label element with aria-labelledby", () => {
    const { control, span } = mount();
    createField({ control, label: span, id: "email" });

    expect(control.getAttribute("aria-labelledby")).toBe("email-label");
    expect(span.id).toBe("email-label");
    expect(span.hasAttribute("for")).toBe(false);
  });

  it("uses aria-labelledby for a <label> on a custom (non-labelable) control", () => {
    const { label } = mount();
    const control = document.createElement("span");
    control.setAttribute("role", "checkbox");
    document.body.append(control);
    createField({ control, label, id: "terms" });

    expect(control.getAttribute("aria-labelledby")).toBe("terms-label");
    expect(label.hasAttribute("for")).toBe(false);
  });

  it("makes a <label> click focus and activate a custom checkbox, like a native label", () => {
    const { label } = mount();
    const control = document.createElement("span");
    control.setAttribute("role", "checkbox");
    control.tabIndex = 0;
    document.body.append(control);
    const onClick = vi.fn();
    control.addEventListener("click", onClick);
    createField({ control, label });

    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    label.dispatchEvent(event);

    expect(document.activeElement).toBe(control);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(event.defaultPrevented).toBe(true);
  });

  it("makes a <label> click focus, but not activate, other custom controls", () => {
    const { label } = mount();
    const control = document.createElement("div");
    control.setAttribute("role", "combobox");
    control.tabIndex = 0;
    document.body.append(control);
    const onClick = vi.fn();
    control.addEventListener("click", onClick);
    createField({ control, label });

    label.click();

    expect(document.activeElement).toBe(control);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("leaves naming alone when there is no label", () => {
    const { control } = mount();
    const field = createField({ control });

    expect(control.hasAttribute("aria-labelledby")).toBe(false);
    expect(field.ids.label).toBeUndefined();
  });
});

describe("createField: description and error", () => {
  it("references the description from aria-describedby", () => {
    const { control, description } = mount();
    createField({ control, description, id: "email" });

    expect(describedBy(control)).toEqual(["email-description"]);
  });

  it("does not reference the error message while the field is valid", () => {
    const { control, description, error } = mount();
    const field = createField({ control, description, error, id: "email" });

    expect(describedBy(control)).toEqual(["email-description"]);
    expect(control.hasAttribute("aria-invalid")).toBe(false);
    expect(field.getInvalid()).toBe(false);
  });

  it("adds the error id after the description once invalid", () => {
    const { control, description, error } = mount();
    const field = createField({ control, description, error, id: "email", invalid: true });

    // Description first, error last, so the error is the final thing announced.
    expect(describedBy(control)).toEqual(["email-description", "email-error"]);
    expect(control.getAttribute("aria-invalid")).toBe("true");
    expect(field.getInvalid()).toBe(true);
  });

  it("references only the error when there is no description", () => {
    const { control, error } = mount();
    createField({ control, error, id: "email", invalid: true });

    expect(describedBy(control)).toEqual(["email-error"]);
  });

  it("sets no aria-describedby when there is nothing to describe", () => {
    const { control } = mount();
    createField({ control, invalid: true });

    expect(control.hasAttribute("aria-describedby")).toBe(false);
    expect(control.getAttribute("aria-invalid")).toBe("true");
  });

  it("toggles the error reference as validity changes", () => {
    const { control, description, error } = mount();
    const field = createField({ control, description, error, id: "email" });

    field.setInvalid(true);
    expect(describedBy(control)).toEqual(["email-description", "email-error"]);
    expect(control.getAttribute("aria-invalid")).toBe("true");

    field.setInvalid(false);
    expect(describedBy(control)).toEqual(["email-description"]);
    expect(control.hasAttribute("aria-invalid")).toBe(false);
    expect(field.getInvalid()).toBe(false);
  });

  it("drops aria-describedby entirely when the error was the only reference", () => {
    const { control, error } = mount();
    const field = createField({ control, error, id: "email", invalid: true });

    field.setInvalid(false);

    expect(control.hasAttribute("aria-describedby")).toBe(false);
  });
});

describe("createField: destroy", () => {
  it("removes the attributes it wired up on a <label> field", () => {
    const { control, label, description, error } = mount();
    const field = createField({ control, label, description, error, id: "email", invalid: true });

    field.destroy();

    expect(control.hasAttribute("aria-describedby")).toBe(false);
    expect(control.hasAttribute("aria-invalid")).toBe(false);
    expect(label.hasAttribute("for")).toBe(false);
  });

  it("removes aria-labelledby on a field labelled by a non-label element", () => {
    const { control, span } = mount();
    const field = createField({ control, label: span, id: "email" });

    field.destroy();

    expect(control.hasAttribute("aria-labelledby")).toBe(false);
  });

  it("stops delegating label clicks on a custom control", () => {
    const { label } = mount();
    const control = document.createElement("span");
    control.setAttribute("role", "switch");
    document.body.append(control);
    const onClick = vi.fn();
    control.addEventListener("click", onClick);
    const field = createField({ control, label });

    field.destroy();
    label.click();

    expect(onClick).not.toHaveBeenCalled();
    expect(control.hasAttribute("aria-labelledby")).toBe(false);
  });

  it("is safe on a field with no label", () => {
    const { control } = mount();
    const field = createField({ control });

    expect(() => field.destroy()).not.toThrow();
  });
});
