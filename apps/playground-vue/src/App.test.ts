// apps/playground-vue/src/App.test.ts
// Smoke test: the playground page must render every component and submit.
import { h, nextTick } from "vue";
import { fireEvent, render, screen, within } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "@mild-ui/vue";
import App from "./App.vue";

async function renderPage() {
  const result = render({
    setup: () => () =>
      h(ThemeProvider, { defaultColorMode: "light", storageKey: null }, () => h(App)),
  });
  // The primitives attach after mount.
  await nextTick();
  return result;
}

describe("playground page", () => {
  it("renders every mild-ui component", async () => {
    const { container } = await renderPage();

    // Heading + Box
    expect(screen.getByRole("heading", { level: 1, name: "mild-ui vue playground" })).toHaveClass(
      "mild-heading",
      "mild-heading--level-1",
    );
    expect(container.querySelector(".mild-box")).toBeInTheDocument();
    expect(container.querySelector(".mild-text")).toBeInTheDocument();

    // Label + Switch (theme toggle)
    expect(container.querySelector("label.mild-label")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");

    // Inputs
    expect(container.querySelectorAll("input.mild-input").length).toBeGreaterThanOrEqual(3);
    expect(container.querySelector("input.mild-input-password")).toHaveAttribute(
      "type",
      "password",
    );

    // Select, Radio, Checkbox
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("radiogroup", { name: "Billing cycle" })).toHaveClass(
      "mild-radio-group",
    );
    expect(screen.getAllByRole("radio")).toHaveLength(2 + 3);
    // Two form checkboxes, plus the DataTable's select-all and three row checkboxes.
    expect(screen.getAllByRole("checkbox")).toHaveLength(2 + 4);

    // Buttons
    expect(screen.getByRole("button", { name: "Create account" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
    expect(container.querySelector(".mild-button--loading")).toBeInTheDocument();
  });

  it("renders the basic input components", async () => {
    await renderPage();

    // Textarea inside a FormField, auto-resizing
    const bio = screen.getByRole("textbox", { name: "Bio" });
    expect(bio.tagName).toBe("TEXTAREA");
    expect(bio).toHaveClass("mild-textarea", "mild-textarea--auto-resize");
    expect(bio).toHaveAttribute("name", "bio");

    // InputGroup: the label still names the input, the addon/element sit around it
    const website = screen.getByRole("textbox", { name: "Website" });
    const websiteGroup = website.closest(".mild-input-group");
    expect(websiteGroup).toHaveClass(
      "mild-input-group--has-left-addon",
      "mild-input-group--has-right-element",
    );
    expect(websiteGroup?.querySelector(".mild-input-addon--left")).toHaveTextContent("https://");
    expect(screen.getByRole("button", { name: "Clear website" })).toHaveClass("mild-close-button");
    expect(screen.getByRole("textbox", { name: "Email" }).closest(".mild-input-group")).toHaveClass(
      "mild-input-group--has-left-element",
    );

    // SegmentedControl: a radiogroup named by its field label
    const contact = screen.getByRole("radiogroup", { name: "Preferred contact" });
    expect(contact).toHaveClass("mild-segmented-control");
    expect(within(contact).getByRole("radio", { name: "Email" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(within(contact).getByRole("radio", { name: "Post" })).toBeDisabled();

    // ButtonGroup hands its variant to the buttons
    const actions = screen.getByRole("group", { name: "Secondary actions" });
    expect(actions).toHaveClass("mild-button-group");
    expect(within(actions).getByRole("button", { name: "Reset" })).toHaveClass(
      "mild-button--outline",
    );

    // Toolbar: ToggleGroups, Toggle, attached ButtonGroup with IconButtons, CloseButton
    const format = screen.getByRole("group", { name: "Text format" });
    expect(format).toHaveClass("mild-toggle-group--attached");
    expect(within(format).getByRole("button", { name: "Bold" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(within(format).getByRole("button", { name: "Italic" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    const alignment = screen.getByRole("group", { name: "Alignment" });
    expect(within(alignment).getByRole("button", { name: "Left" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "Mute" })).toHaveAttribute("aria-pressed", "false");

    const pages = screen.getByRole("group", { name: "Pages" });
    expect(pages).toHaveClass("mild-button-group--attached");
    expect(within(pages).getByRole("button", { name: "Previous page" })).toHaveClass(
      "mild-icon-button",
      "mild-icon-button--sm",
    );
    expect(screen.getByRole("button", { name: "Settings" })).toHaveClass("mild-icon-button--round");
    expect(screen.getByRole("button", { name: "Close" })).toHaveClass("mild-close-button");
  });

  it("drives the toolbar toggles", async () => {
    await renderPage();

    // Multiple toggle group: press italic next to bold
    await fireEvent.click(screen.getByRole("button", { name: "Italic" }));
    expect(screen.getByRole("button", { name: "Italic" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/Format: bold, italic/)).toBeInTheDocument();

    // Single toggle group: center replaces left
    await fireEvent.click(screen.getByRole("button", { name: "Center" }));
    expect(screen.getByRole("button", { name: "Left" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByText(/Align: center/)).toBeInTheDocument();

    // Standalone toggle
    await fireEvent.click(screen.getByRole("button", { name: "Mute" }));
    expect(screen.getByRole("button", { name: "Mute" })).toHaveTextContent("Muted");

    // Close button dismisses itself
    await fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("button", { name: "Close" })).toBeNull();
  });

  it("renders the feedback components", async () => {
    const { container } = await renderPage();

    // Alerts: a dismissible warning (assertive) and a success status
    const warning = screen.getByRole("alert");
    expect(warning).toHaveClass("mild-alert--warning", "mild-alert--left-accent");
    expect(screen.getByText("Account verified").closest(".mild-alert")).toHaveClass(
      "mild-alert--success",
    );
    await fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(screen.queryByRole("alert")).toBeNull();

    // Spinner + progress bars
    expect(container.querySelector(".mild-spinner")).toHaveTextContent("Loading profile");
    const upload = screen.getByRole("progressbar", { name: "Upload" });
    expect(upload).toHaveAttribute("aria-valuenow", "40");
    expect(screen.getByRole("progressbar", { name: "Storage used" })).toHaveClass(
      "mild-circular-progress",
    );
    expect(screen.getByRole("progressbar", { name: "Syncing" })).toHaveAttribute(
      "aria-busy",
      "true",
    );
    await fireEvent.click(screen.getByRole("button", { name: "+10" }));
    expect(upload).toHaveAttribute("aria-valuenow", "50");

    // Skeletons swap for content
    expect(container.querySelectorAll(".mild-skeleton").length).toBeGreaterThanOrEqual(3);
    await fireEvent.click(screen.getByRole("button", { name: "Finish loading" }));
    expect(container.querySelector(".mild-skeleton")).toBeNull();
    expect(screen.getByText(/Ada Lovelace · Analyst/)).toBeInTheDocument();
  });

  it("shows toasts in a region with a close button", async () => {
    await renderPage();
    await fireEvent.click(screen.getByRole("button", { name: "Show toast" }));
    await fireEvent.click(screen.getByRole("button", { name: "Show sticky error toast" }));
    await nextTick();

    const region = screen.getByRole("region", { name: "Notifications" });
    expect(region).toHaveClass("mild-toast-region--bottom-right");
    expect(within(region).getByRole("status")).toHaveTextContent("Saved");
    expect(within(region).getByRole("alert")).toHaveTextContent("Connection lost");

    await fireEvent.click(within(region).getAllByRole("button", { name: "Close" })[0]);
    expect(within(region).queryByRole("status")).toBeNull();
    expect(within(region).getByRole("alert")).toBeInTheDocument();
  });

  it("opens, nests and closes the dialogs, returning focus to the trigger", async () => {
    await renderPage();
    const trigger = screen.getByRole("button", { name: "Open dialog" });
    expect(trigger).toHaveAttribute("aria-describedby");
    trigger.focus();
    await fireEvent.click(trigger);
    await nextTick();

    const dialog = screen.getByRole("dialog", { name: "Edit profile" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(document.body.style.overflow).toBe("hidden");

    await fireEvent.click(within(dialog).getByRole("button", { name: "Open nested dialog" }));
    await nextTick();
    expect(screen.getAllByRole("dialog")).toHaveLength(2);

    // Escape closes the nested dialog first, then the outer one.
    await fireEvent.keyDown(document.activeElement as Element, { key: "Escape" });
    await nextTick();
    expect(screen.getAllByRole("dialog")).toHaveLength(1);
    await fireEvent.keyDown(document.activeElement as Element, { key: "Escape" });
    await nextTick();
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe("");

    // The alert dialog focuses Cancel and ignores the overlay.
    await fireEvent.click(screen.getByRole("button", { name: "Delete account" }));
    await nextTick();
    const alertDialog = screen.getByRole("alertdialog", { name: "Delete account?" });
    expect(within(alertDialog).getByRole("button", { name: "Cancel" })).toHaveFocus();
    await fireEvent.click(document.querySelector("[data-dialog-overlay]") as HTMLElement);
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    await fireEvent.click(within(alertDialog).getByRole("button", { name: "Cancel" }));
    await nextTick();
    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  it("drives the tabs, accordion and collapsible", async () => {
    await renderPage();

    // Tabs
    const tablist = screen.getByRole("tablist", { name: "Account" });
    expect(tablist).toHaveClass("mild-tabs-list--underline");
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute("aria-selected", "true");
    await fireEvent.click(screen.getByRole("tab", { name: "Billing" }));
    expect(screen.getByRole("tabpanel", { name: "Billing" })).toHaveTextContent("Billing details");
    expect(screen.getByRole("tab", { name: "Danger zone" })).toBeDisabled();

    // Accordion
    const shipping = screen.getByRole("button", { name: "Shipping" });
    expect(shipping).toHaveAttribute("aria-expanded", "true");
    expect(shipping.parentElement?.tagName).toBe("H3");
    await fireEvent.click(screen.getByRole("button", { name: "Returns" }));
    expect(shipping).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("region", { name: "Returns" })).toBeVisible();

    // Collapsible
    const advanced = screen.getByRole("button", { name: "Advanced settings" });
    expect(advanced).toHaveAttribute("aria-expanded", "false");
    await fireEvent.click(advanced);
    expect(advanced).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Nothing to tune yet.")).toBeVisible();
  });

  it("renders the data display components", async () => {
    const { container } = await renderPage();

    // Card with an image, badge, tags, avatars and stats
    const card = screen.getByRole("article", { name: "Project card" });
    expect(card).toHaveClass("mild-card", "mild-card--outlined");
    const cover = screen.getByRole("img", { name: "Mountain landscape" });
    expect(cover).toHaveAttribute("loading", "lazy");
    expect(cover.closest(".mild-image-frame")).toHaveClass("mild-image-frame--ratio");
    expect(within(card).getByRole("heading", { name: "mild-ui" })).toHaveClass("mild-card-title");
    expect(within(card).getByText("Active")).toHaveClass("mild-badge", "mild-badge--success");

    // Tags are removable from the keyboard
    expect(container.querySelectorAll(".mild-tag")).toHaveLength(3);
    await fireEvent.click(screen.getByRole("button", { name: "Remove Research" }));
    expect(container.querySelectorAll(".mild-tag")).toHaveLength(2);

    // Avatar group shows three and a +2 overflow
    const contributors = screen.getByRole("group", { name: "Contributors" });
    expect(within(contributors).getAllByRole("img")).toHaveLength(4);
    expect(within(contributors).getByRole("img", { name: "2 more" })).toHaveTextContent("+2");
    expect(within(contributors).getByRole("img", { name: "Grace Hopper" })).toHaveTextContent("GH");

    // Stats announce their trend; a standalone avatar with status
    expect(container.querySelector(".mild-stat__trend--increase")).toHaveTextContent(
      "increased by 12%",
    );
    expect(container.querySelector(".mild-stat__trend--decrease")).toHaveTextContent(
      "decreased by 4",
    );
    expect(screen.getByRole("img", { name: "online" })).toHaveClass("mild-avatar__badge--online");

    // Table: a composed table and a sortable, selectable DataTable
    const teamTable = screen.getByRole("table", { name: "Team" });
    expect(teamTable).toHaveClass("mild-table", "mild-table--outline", "mild-table--sm");
    expect(teamTable.parentElement).toHaveClass("mild-table-container");
    expect(within(teamTable).getAllByRole("columnheader")).toHaveLength(2);
    const invoicesTable = screen.getByRole("table", { name: "Invoices" });
    expect(invoicesTable).toHaveClass("mild-table--striped");
    const amount = within(invoicesTable).getByRole("columnheader", { name: "Amount" });
    expect(amount).toHaveAttribute("aria-sort", "descending");
    const firstRow = () => within(invoicesTable).getAllByRole("row")[1];
    expect(within(firstRow()).getAllByRole("cell")[1]).toHaveTextContent("Alan Turing");
    await fireEvent.click(within(amount).getByRole("button"));
    expect(amount).toHaveAttribute("aria-sort", "ascending");
    expect(within(firstRow()).getAllByRole("cell")[1]).toHaveTextContent("Grace Hopper");
    const selectAll = within(invoicesTable).getByRole("checkbox", { name: "Select all rows" });
    expect(selectAll).toHaveAttribute("aria-checked", "mixed");
    expect(screen.getByText(/Selected invoices: inv-2/)).toBeInTheDocument();
    await fireEvent.click(selectAll);
    expect(screen.getByText(/Selected invoices: inv-1, inv-2, inv-3/)).toBeInTheDocument();

    // Map: titled lazy iframe plus a link to the full map
    const map = container.querySelector("figure.mild-map") as HTMLElement;
    const iframe = map.querySelector("iframe") as HTMLIFrameElement;
    expect(iframe).toHaveAttribute("title", "Office in Paris");
    expect(iframe).toHaveAttribute("loading", "lazy");
    expect(iframe.getAttribute("src")).toContain("openstreetmap.org/export/embed.html");
    expect(screen.getByRole("link", { name: "View larger map" })).toHaveAttribute(
      "target",
      "_blank",
    );
  });

  it("renders the typography and navigation components", async () => {
    const { container } = await renderPage();

    // Breadcrumb: a labelled nav whose last step is the current page
    const trail = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(trail.querySelector("ol.mild-breadcrumb__list")).toBeInTheDocument();
    expect(within(trail).getByText("Vue")).toHaveAttribute("aria-current", "page");
    expect(within(trail).getAllByRole("link")).toHaveLength(2);
    expect(trail.querySelectorAll(".mild-breadcrumb-separator")).toHaveLength(2);

    // Heading levels render their own element
    const section = screen.getByRole("heading", { name: "Typography and navigation" });
    expect(section.tagName).toBe("H2");
    expect(screen.getByRole("heading", { level: 3, name: /Every heading level/ })).toHaveClass(
      "mild-heading--muted",
    );

    // Code (inline + block) and Kbd
    expect(container.querySelector("code.mild-code")).toHaveTextContent("npm i @mild-ui/vue");
    expect(container.querySelector("pre.mild-code--block")).toBeInTheDocument();
    const keys = container.querySelectorAll("kbd.mild-kbd");
    expect(keys.length).toBeGreaterThanOrEqual(3);
    expect(keys[2]).toHaveClass("mild-kbd--sm");

    // Link: external, disabled and plain variants
    const docs = screen.getByRole("link", { name: "documentation" });
    expect(docs).toHaveAttribute("target", "_blank");
    expect(docs).toHaveAttribute("rel", "noopener noreferrer");
    const disabled = screen.getByRole("link", { name: "A disabled link" });
    expect(disabled).toHaveAttribute("aria-disabled", "true");
    expect(disabled).not.toHaveAttribute("href");

    // List: unordered, ordered and unstyled with an icon
    const lists = container.querySelectorAll("ul.mild-list, ol.mild-list");
    expect(lists.length).toBeGreaterThanOrEqual(3);
    expect(container.querySelector("ol.mild-list")).toHaveClass("mild-list--marker-lower-alpha");
    expect(container.querySelector(".mild-list--unstyled")).toBeInTheDocument();
    expect(container.querySelector(".mild-list-item__icon")).toHaveAttribute("aria-hidden", "true");
  });

  it("renders the layout components", async () => {
    const { container } = await renderPage();

    // Container (as section) wrapping a Stack
    const layout = screen.getByRole("region", { name: "Layout" });
    expect(layout.tagName).toBe("SECTION");
    expect(layout).toHaveClass("mild-container", "mild-container--md");
    expect(layout.querySelector(".mild-stack.mild-stack--column")).toBeInTheDocument();

    // Flex rows + vertical Divider, labelled Dividers
    expect(container.querySelectorAll(".mild-flex--row").length).toBeGreaterThanOrEqual(2);
    const separators = screen.getAllByRole("separator");
    expect(separators.some((s) => s.getAttribute("aria-orientation") === "vertical")).toBe(true);
    expect(screen.getByText("Grid").closest(".mild-divider--with-label")).toBeInTheDocument();
    expect(screen.getByText("ScrollArea").closest(".mild-divider--label-start")).toHaveClass(
      "mild-divider--dashed",
    );

    // Responsive Grid with spanning items
    const grid = layout.querySelector(".mild-grid");
    expect(grid).toHaveClass("mild-grid--cols-1", "mild-grid--sm-cols-2", "mild-grid--lg-cols-4");
    expect(grid?.querySelector(".mild-grid-item--lg-col-span-4")).toBeInTheDocument();

    // AspectRatio boxes
    const ratios = layout.querySelectorAll<HTMLElement>(".mild-aspect-ratio");
    expect(ratios).toHaveLength(2);
    expect(ratios[0].style.getPropertyValue("--mild-aspect-ratio")).toBe(String(16 / 9));

    // ScrollArea (as a focusable list region)
    const scroll = screen.getByRole("region", { name: "Changelog" });
    expect(scroll.tagName).toBe("UL");
    expect(scroll).toHaveClass("mild-scroll-area", "mild-scroll-area--vertical");
    expect(scroll).toHaveAttribute("tabindex", "0");
    expect(scroll.style.maxHeight).toBe("var(--mild-space-32, 8rem)");
    expect(scroll.querySelectorAll("li").length).toBeGreaterThan(3);
  });

  it("toggles color mode through the Switch", async () => {
    await renderPage();
    const toggle = screen.getByRole("switch");

    await fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });

  it("submits the form and shows the collected values", async () => {
    const { container } = await renderPage();

    // Submitting empty shows linked errors instead of a result.
    await fireEvent.click(screen.getByRole("button", { name: "Create account" }));
    await nextTick();
    expect(screen.queryByRole("heading", { name: "Submitted values" })).toBeNull();
    const email = screen.getByRole("textbox", { name: "Email" });
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAccessibleDescription("Enter a valid email");

    const textInputs = container.querySelectorAll<HTMLInputElement>("input.mild-input");
    await fireEvent.update(textInputs[0], "Ada Lovelace");
    await fireEvent.update(textInputs[1], "ada@example.com");
    await fireEvent.update(container.querySelector("input.mild-input-password")!, "correct horse");
    await fireEvent.click(screen.getByRole("checkbox", { name: "I accept the terms" }));

    await fireEvent.click(screen.getByRole("button", { name: "Create account" }));
    await nextTick();

    expect(screen.getByRole("heading", { name: "Submitted values" })).toBeInTheDocument();
    expect(email).not.toHaveAttribute("aria-invalid");
    expect(screen.getByText(/"fullName": "Ada Lovelace"/)).toBeInTheDocument();
    expect(screen.getByText(/"plan": "free"/)).toBeInTheDocument();
    expect(screen.getByText(/"billing": "monthly"/)).toBeInTheDocument();
    expect(screen.getByText(/"contact": "email"/)).toBeInTheDocument();
    expect(screen.getByText(/"bio": ""/)).toBeInTheDocument();
    expect(screen.getByText(/"terms": true/)).toBeInTheDocument();
    expect(screen.getByText(/"newsletter": false/)).toBeInTheDocument();

    // Reset clears the errors and the result.
    await fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    await nextTick();
    expect(screen.queryByRole("heading", { name: "Submitted values" })).toBeNull();
  });
});
