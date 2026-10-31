import { afterEach, describe, expect, it, vi } from "vitest";
import { createDialog, type DialogInstance } from "./dialog";

interface Mounted {
  trigger: HTMLButtonElement;
  dialog: HTMLDivElement;
  buttons: HTMLButtonElement[];
}

function mount(buttonCount = 2, parent: HTMLElement = document.body): Mounted {
  const trigger = document.createElement("button");
  trigger.textContent = "Open";
  parent.append(trigger);
  const dialog = document.createElement("div");
  dialog.setAttribute("role", "dialog");
  const buttons: HTMLButtonElement[] = [];
  for (let i = 0; i < buttonCount; i++) {
    const button = document.createElement("button");
    button.textContent = `Action ${i + 1}`;
    dialog.append(button);
    buttons.push(button);
  }
  parent.append(dialog);
  return { trigger, dialog, buttons };
}

function press(element: Element | Document, key: string, init: KeyboardEventInit = {}) {
  const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true, ...init });
  element.dispatchEvent(event);
  return event;
}

const open: DialogInstance[] = [];
function track(instance: DialogInstance): DialogInstance {
  open.push(instance);
  return instance;
}

afterEach(() => {
  for (const instance of open.splice(0)) instance.destroy();
  document.body.innerHTML = "";
  document.body.style.overflow = "";
});

describe("createDialog: ARIA wiring and initial focus", () => {
  it("marks the dialog modal, makes it focusable and focuses the first tabbable element", () => {
    const { dialog, buttons } = mount();
    track(createDialog({ element: dialog }));

    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(dialog.getAttribute("tabindex")).toBe("-1");
    expect(document.activeElement).toBe(buttons[0]);
  });

  it("focuses the initialFocus element when given", () => {
    const { dialog, buttons } = mount();
    track(createDialog({ element: dialog, initialFocus: buttons[1] }));

    expect(document.activeElement).toBe(buttons[1]);
  });

  it("focuses the dialog itself when nothing inside is tabbable", () => {
    const { dialog } = mount(0);
    track(createDialog({ element: dialog }));

    expect(document.activeElement).toBe(dialog);
  });

  it("skips hidden and disabled elements when looking for the first tabbable one", () => {
    const { dialog, buttons } = mount(3);
    buttons[0].disabled = true;
    buttons[1].hidden = true;
    track(createDialog({ element: dialog }));

    expect(document.activeElement).toBe(buttons[2]);
  });

  it("keeps an explicit tabindex", () => {
    const { dialog } = mount();
    dialog.setAttribute("tabindex", "0");
    track(createDialog({ element: dialog }));

    expect(dialog.getAttribute("tabindex")).toBe("0");
  });
});

describe("createDialog: focus trap", () => {
  it("wraps Tab from the last element to the first, and Shift+Tab from the first to the last", () => {
    const { dialog, buttons } = mount(2);
    track(createDialog({ element: dialog }));
    const [first, last] = buttons;

    last.focus();
    expect(press(last, "Tab").defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(first);

    expect(press(first, "Tab", { shiftKey: true }).defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(last);
  });

  it("lets Tab move normally between inner elements", () => {
    const { dialog, buttons } = mount(3);
    track(createDialog({ element: dialog }));

    buttons[0].focus();
    expect(press(buttons[0], "Tab").defaultPrevented).toBe(false);
  });

  it("Shift+Tab from the dialog itself goes to the last element", () => {
    const { dialog, buttons } = mount(2);
    track(createDialog({ element: dialog }));

    dialog.focus();
    press(dialog, "Tab", { shiftKey: true });
    expect(document.activeElement).toBe(buttons[1]);
  });

  it("keeps focus on the dialog when nothing inside is tabbable", () => {
    const { dialog } = mount(0);
    track(createDialog({ element: dialog }));

    expect(press(dialog, "Tab").defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(dialog);
  });

  it("brings focus back when it lands outside the dialog", () => {
    const { trigger, dialog, buttons } = mount();
    track(createDialog({ element: dialog }));

    trigger.focus();
    expect(document.activeElement).toBe(buttons[0]);
  });

  it("does not trap or lock when not modal", () => {
    const { trigger, dialog, buttons } = mount();
    track(createDialog({ element: dialog, modal: false }));

    expect(dialog.getAttribute("aria-modal")).toBe("false");
    expect(document.body.style.overflow).toBe("");
    trigger.focus();
    expect(document.activeElement).toBe(trigger);
    buttons[1].focus();
    expect(press(buttons[1], "Tab").defaultPrevented).toBe(false);
  });
});

describe("createDialog: Escape", () => {
  it("calls onClose on Escape and swallows the key", () => {
    const { dialog } = mount();
    const onClose = vi.fn();
    track(createDialog({ element: dialog, onClose }));

    const event = press(document.activeElement as Element, "Escape");
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(event.defaultPrevented).toBe(true);
  });

  it("ignores Escape when closeOnEscape is off", () => {
    const { dialog } = mount();
    const onClose = vi.fn();
    track(createDialog({ element: dialog, onClose, closeOnEscape: false }));

    press(document.activeElement as Element, "Escape");
    expect(onClose).not.toHaveBeenCalled();
  });

  it("leaves other keys alone", () => {
    const { dialog } = mount();
    const onClose = vi.fn();
    track(createDialog({ element: dialog, onClose }));

    expect(press(document.activeElement as Element, "Enter").defaultPrevented).toBe(false);
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe("createDialog: return focus", () => {
  it("returns focus to the element focused before the dialog opened", () => {
    const { trigger, dialog } = mount();
    trigger.focus();
    const instance = createDialog({ element: dialog });

    instance.destroy();
    expect(document.activeElement).toBe(trigger);
  });

  it("returns focus to a given element, or leaves it alone", () => {
    const { trigger, dialog } = mount();
    const other = document.createElement("button");
    document.body.append(other);
    trigger.focus();

    createDialog({ element: dialog, returnFocus: other }).destroy();
    expect(document.activeElement).toBe(other);

    trigger.focus();
    const instance = createDialog({ element: dialog, returnFocus: false });
    const inside = document.activeElement;
    instance.destroy();
    expect(document.activeElement).toBe(inside);
  });

  it("does not try to focus a trigger that left the document", () => {
    const { trigger, dialog } = mount();
    trigger.focus();
    const instance = createDialog({ element: dialog });
    trigger.remove();

    expect(() => instance.destroy()).not.toThrow();
    expect(document.activeElement).not.toBe(trigger);
  });
});

describe("createDialog: scroll lock", () => {
  it("locks the body scroll while open and restores the previous value after", () => {
    document.body.style.overflow = "auto";
    const { dialog } = mount();
    const instance = createDialog({ element: dialog });

    expect(document.body.style.overflow).toBe("hidden");
    expect(document.body.classList.contains("mild-modal-open")).toBe(true);

    instance.destroy();
    expect(document.body.style.overflow).toBe("auto");
    expect(document.body.classList.contains("mild-modal-open")).toBe(false);
  });
});

describe("createDialog: nested dialogs", () => {
  it("only the topmost dialog handles Escape, so they close one at a time", () => {
    const outer = mount();
    const onCloseOuter = vi.fn();
    const outerInstance = track(createDialog({ element: outer.dialog, onClose: onCloseOuter }));

    const inner = mount(2, outer.dialog);
    inner.trigger.focus();
    const onCloseInner = vi.fn();
    const innerInstance = createDialog({ element: inner.dialog, onClose: onCloseInner });

    expect(outerInstance.isTop()).toBe(false);
    expect(innerInstance.isTop()).toBe(true);
    expect(document.activeElement).toBe(inner.buttons[0]);

    press(document.activeElement as Element, "Escape");
    expect(onCloseInner).toHaveBeenCalledTimes(1);
    expect(onCloseOuter).not.toHaveBeenCalled();

    // The app closes the inner dialog: focus returns to its trigger inside the outer dialog,
    // the outer dialog is on top again and the scroll stays locked.
    innerInstance.destroy();
    expect(document.activeElement).toBe(inner.trigger);
    expect(outerInstance.isTop()).toBe(true);
    expect(document.body.style.overflow).toBe("hidden");

    press(document.activeElement as Element, "Escape");
    expect(onCloseOuter).toHaveBeenCalledTimes(1);
  });

  it("only the topmost dialog traps focus", () => {
    const outer = mount();
    track(createDialog({ element: outer.dialog }));
    const inner = mount(2, outer.dialog);
    track(createDialog({ element: inner.dialog }));

    // Focus on an outer button is outside the inner dialog: the inner trap reclaims it.
    outer.buttons[0].focus();
    expect(document.activeElement).toBe(inner.buttons[0]);

    // Tab wrapping is judged by the inner dialog only.
    inner.buttons[1].focus();
    press(inner.buttons[1], "Tab");
    expect(document.activeElement).toBe(inner.buttons[0]);
  });

  it("releases the scroll lock only when the last modal dialog closes", () => {
    const first = createDialog({ element: mount().dialog });
    const second = createDialog({ element: mount().dialog });

    second.destroy();
    expect(document.body.style.overflow).toBe("hidden");
    first.destroy();
    expect(document.body.style.overflow).toBe("");
  });

  it("a non-modal dialog on top of a modal one keeps the lock", () => {
    const modal = createDialog({ element: mount().dialog });
    const sheet = createDialog({ element: mount().dialog, modal: false });

    sheet.destroy();
    expect(document.body.style.overflow).toBe("hidden");
    modal.destroy();
    expect(document.body.style.overflow).toBe("");
  });

  it("destroying twice is harmless", () => {
    const instance = createDialog({ element: mount().dialog });
    instance.destroy();
    expect(() => instance.destroy()).not.toThrow();
    expect(document.body.style.overflow).toBe("");
  });
});
