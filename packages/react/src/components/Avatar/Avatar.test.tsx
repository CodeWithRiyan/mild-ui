import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar, AvatarGroup } from "./Avatar";
import { getInitials } from "../../utils";

describe("Avatar", () => {
  it("renders the picture named by `name`", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Avatar ref={ref} src="ada.png" name="Ada Lovelace" />);
    const image = screen.getByRole("img", { name: "Ada Lovelace" });
    expect(image.tagName).toBe("IMG");
    expect(image).toHaveClass("mild-avatar__image");
    expect(ref.current).toHaveClass("mild-avatar", "mild-avatar--md", "mild-avatar--circle");
    expect(ref.current).toHaveAttribute("data-state", "idle");
    fireEvent.load(image);
    expect(ref.current).toHaveAttribute("data-state", "loaded");
  });

  it("shows the initials without a picture, exposing the name", () => {
    const { container } = render(<Avatar name="Ada Lovelace" />);
    const avatar = container.firstElementChild as HTMLElement;
    expect(avatar).toHaveAttribute("role", "img");
    expect(avatar).toHaveAttribute("aria-label", "Ada Lovelace");
    expect(avatar.querySelector(".mild-avatar__fallback")).toHaveTextContent("AL");
    expect(avatar).toHaveAttribute("data-state", "fallback");
  });

  it("falls back to the initials when the picture fails to load", () => {
    const { container } = render(<Avatar src="broken.png" name="Ada Lovelace" />);
    fireEvent.error(screen.getByRole("img"));
    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector(".mild-avatar__fallback")).toHaveTextContent("AL");
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toHaveClass("mild-avatar");
  });

  it("shows a person icon without a name, or a custom fallback", () => {
    const { container, rerender } = render(<Avatar />);
    expect(container.querySelector(".mild-avatar__fallback svg")).toBeInTheDocument();
    rerender(<Avatar fallback="?" />);
    expect(container.querySelector(".mild-avatar__fallback")).toHaveTextContent("?");
  });

  it("maps size, shape, border and a status dot", () => {
    const { container } = render(
      <Avatar name="Ada" size="xl" shape="square" bordered status="online" />,
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
    expect(getInitials(undefined)).toBe("");
  });
});

describe("AvatarGroup", () => {
  it("shows `max` avatars and a +N overflow, handing the size down", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <AvatarGroup ref={ref} max={2} size="sm" aria-label="Assignees">
        <Avatar name="Ada Lovelace" />
        <Avatar name="Grace Hopper" />
        <Avatar name="Alan Turing" />
        <Avatar name="Edsger Dijkstra" />
      </AvatarGroup>,
    );
    const group = screen.getByRole("group", { name: "Assignees" });
    expect(ref.current).toBe(group);
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

  it("renders every avatar without max and custom overlap / overflow label", () => {
    render(
      <AvatarGroup overlap="1" max={1} overflowLabel={(n) => `${n} others`}>
        <Avatar name="Ada Lovelace" size="lg" />
        <Avatar name="Grace Hopper" />
      </AvatarGroup>,
    );
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toHaveClass("mild-avatar--lg");
    expect(screen.getByRole("img", { name: "1 others" })).toBeInTheDocument();
    expect(screen.getByRole("group").style.getPropertyValue("--mild-avatar-group-overlap")).toBe(
      "var(--mild-space-1, 0.25rem)",
    );
  });
});
