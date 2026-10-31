import { h } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { avatarCases } from "@mild-ui/test-cases/avatar";
import { avatarGroupCases } from "@mild-ui/test-cases/avatar-group";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Avatar, AvatarGroup } from "./index";
import { getInitials } from "../../utils";

runComponentCases(avatarCases, (c) => h(Avatar, caseProps(c)));
runComponentCases(avatarGroupCases, (c) =>
  h(AvatarGroup, caseProps(c), () => [
    h(Avatar, { name: "Ada Lovelace" }),
    h(Avatar, { name: "Grace Hopper" }),
    h(Avatar, { name: "Alan Turing" }),
    h(Avatar, { name: "Edsger Dijkstra" }),
  ]),
);

describe("Avatar", () => {
  it("renders the picture named by `name` and tracks its load state", async () => {
    const onLoad = vi.fn();
    const { container } = render(h(Avatar, { src: "ada.png", name: "Ada Lovelace", onLoad }));
    const avatar = container.firstElementChild as HTMLElement;
    const image = screen.getByRole("img", { name: "Ada Lovelace" });
    expect(image.tagName).toBe("IMG");
    expect(image).toHaveClass("mild-avatar__image");
    expect(avatar).toHaveClass("mild-avatar", "mild-avatar--md", "mild-avatar--circle");
    expect(avatar).toHaveAttribute("data-state", "idle");
    await fireEvent.load(image);
    expect(avatar).toHaveAttribute("data-state", "loaded");
    expect(onLoad).toHaveBeenCalledTimes(1);
  });

  it("shows the initials without a picture, exposing the name", () => {
    const { container } = render(h(Avatar, { name: "Ada Lovelace" }));
    const avatar = container.firstElementChild as HTMLElement;
    expect(avatar).toHaveAttribute("role", "img");
    expect(avatar).toHaveAttribute("aria-label", "Ada Lovelace");
    expect(avatar.querySelector(".mild-avatar__fallback")).toHaveTextContent("AL");
    expect(avatar).toHaveAttribute("data-state", "fallback");
  });

  it("falls back to the initials when the picture fails, and retries a new source", async () => {
    const onError = vi.fn();
    const { container, rerender } = render(
      h(Avatar, { src: "broken.png", name: "Ada Lovelace", onError }),
    );
    await fireEvent.error(screen.getByRole("img"));
    expect(onError).toHaveBeenCalledTimes(1);
    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector(".mild-avatar__fallback")).toHaveTextContent("AL");
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toHaveClass("mild-avatar");

    await rerender({ src: "fixed.png", name: "Ada Lovelace" });
    expect(container.querySelector("img")).toHaveAttribute("src", "fixed.png");
  });

  it("shows a person icon without a name, or a custom fallback", async () => {
    const { container, rerender } = render(h(Avatar));
    expect(container.querySelector(".mild-avatar__fallback svg")).toBeInTheDocument();
    await rerender({ fallback: "?" });
    expect(container.querySelector(".mild-avatar__fallback")).toHaveTextContent("?");
    const { container: slot } = render(
      h(
        Avatar,
        {},
        { fallback: () => h("b", "!"), default: () => h("i", { "data-testid": "extra" }) },
      ),
    );
    expect(slot.querySelector(".mild-avatar__fallback b")).toHaveTextContent("!");
    expect(screen.getByTestId("extra")).toBeInTheDocument();
  });

  it("maps size, shape, border and a status dot", () => {
    const { container } = render(
      h(Avatar, { name: "Ada", size: "xl", shape: "square", bordered: true, status: "online" }),
    );
    const avatar = container.firstElementChild as HTMLElement;
    expect(avatar).toHaveClass("mild-avatar--xl", "mild-avatar--square", "mild-avatar--bordered");
    expect(screen.getByRole("img", { name: "online" })).toHaveClass("mild-avatar__badge--online");
  });

  it("getInitials takes the first and last name", () => {
    expect(getInitials("Ada Lovelace")).toBe("AL");
    expect(getInitials("  ada   king   lovelace ")).toBe("AL");
    expect(getInitials("Plato")).toBe("P");
    expect(getInitials("")).toBe("");
    expect(getInitials("   ")).toBe("");
    expect(getInitials("Ada  ")).toBe("A");
    expect(getInitials(undefined)).toBe("");
  });
});

describe("AvatarGroup", () => {
  it("shows `max` avatars and a +N overflow, handing the size down", () => {
    render(
      asComponent(() =>
        h(AvatarGroup, { max: 2, size: "sm", "aria-label": "Assignees" }, () => [
          h(Avatar, { name: "Ada Lovelace" }),
          h(Avatar, { name: "Grace Hopper" }),
          h(Avatar, { name: "Alan Turing" }),
          h(Avatar, { name: "Edsger Dijkstra" }),
        ]),
      ),
    );
    const group = screen.getByRole("group", { name: "Assignees" });
    expect(group).toHaveClass("mild-avatar-group");
    expect(group.style.getPropertyValue("--mild-avatar-group-overlap")).toBe(
      "var(--mild-space-3, 0.75rem)",
    );
    const avatars = group.querySelectorAll(".mild-avatar");
    expect(avatars).toHaveLength(3);
    expect(avatars[0]).toHaveClass("mild-avatar--sm");
    expect(screen.getByRole("img", { name: "2 more" })).toHaveClass("mild-avatar-group__overflow");
    expect(screen.getByRole("img", { name: "2 more" })).toHaveTextContent("+2");
    expect(screen.queryByRole("img", { name: "Alan Turing" })).toBeNull();
  });

  it("ignores non-element children and treats a negative max as no limit", () => {
    render(
      asComponent(() =>
        h(AvatarGroup, { max: -1, "aria-label": "Loose" }, () => [
          "text",
          " ",
          h(Avatar, { name: "Ada Lovelace" }),
          h(Avatar, { name: "Grace Hopper" }),
        ]),
      ),
    );
    expect(
      screen.getByRole("group", { name: "Loose" }).querySelectorAll(".mild-avatar"),
    ).toHaveLength(2);
  });

  it("renders every avatar without max, with custom overlap and overflow label", () => {
    render(
      asComponent(() =>
        h(
          AvatarGroup,
          { overlap: "1", max: 1, overflowLabel: (n: number) => `${n} others` },
          () => [
            h(Avatar, { name: "Ada Lovelace", size: "lg" }),
            null,
            [h(Avatar, { name: "Grace Hopper" })],
          ],
        ),
      ),
    );
    const group = screen.getByRole("group");
    expect(group.style.getPropertyValue("--mild-avatar-group-overlap")).toBe(
      "var(--mild-space-1, 0.25rem)",
    );
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toHaveClass("mild-avatar--lg");
    expect(screen.getByRole("img", { name: "1 others" })).toBeInTheDocument();

    render(
      asComponent(() =>
        h(AvatarGroup, { "aria-label": "All" }, () => [
          h(Avatar, { name: "A" }),
          h(Avatar, { name: "B" }),
        ]),
      ),
    );
    expect(
      screen.getByRole("group", { name: "All" }).querySelectorAll(".mild-avatar"),
    ).toHaveLength(2);
  });
});

itHasNoSeriousAxeViolations("Avatar", () =>
  h("div", [
    h(Avatar, { src: "ada.png", name: "Ada Lovelace" }),
    h(Avatar, { name: "Grace Hopper", status: "busy", bordered: true }),
    h(AvatarGroup, { max: 1, "aria-label": "Team" }, () => [
      h(Avatar, { name: "A" }),
      h(Avatar, { name: "B" }),
    ]),
  ]),
);
