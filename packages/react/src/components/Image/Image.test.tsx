import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Image } from "./Image";

describe("Image", () => {
  it("renders a lazily loaded image by default", () => {
    const ref = React.createRef<HTMLImageElement>();
    render(<Image ref={ref} src="photo.jpg" alt="A photo" />);
    const image = screen.getByRole("img", { name: "A photo" });
    expect(ref.current).toBe(image);
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("decoding", "async");
    expect(image).toHaveClass("mild-image");
    expect(image).toHaveAttribute("data-state", "loading");
    expect(image.parentElement?.classList.contains("mild-image-frame")).toBe(false);

    fireEvent.load(image);
    expect(image).toHaveAttribute("data-state", "loaded");
  });

  it("loads eagerly when lazy is off", () => {
    render(<Image src="photo.jpg" alt="" lazy={false} />);
    const image = document.querySelector("img") as HTMLImageElement;
    expect(image).not.toHaveAttribute("loading");
    expect(image).not.toHaveAttribute("decoding");
  });

  it("swaps to fallbackSrc on error, then to the placeholder if that fails too", () => {
    const onError = vi.fn();
    render(<Image src="broken.jpg" alt="Cover" fallbackSrc="fallback.jpg" onError={onError} />);
    const image = screen.getByRole("img", { name: "Cover" });
    fireEvent.error(image);
    expect(onError).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("img", { name: "Cover" })).toHaveAttribute("src", "fallback.jpg");

    fireEvent.error(screen.getByRole("img", { name: "Cover" }));
    expect(document.querySelector("img")).toBeNull();
    const placeholder = screen.getByRole("img", { name: "Cover" });
    expect(placeholder).toHaveClass("mild-image__fallback");
    expect(placeholder.querySelector("svg")).toBeInTheDocument();
    expect(placeholder.closest(".mild-image-frame")).toHaveAttribute("data-state", "error");
  });

  it("renders a custom fallback node, without a role for decorative images", () => {
    render(<Image src="broken.jpg" alt="" fallback={<span>No image</span>} />);
    fireEvent.error(document.querySelector("img") as HTMLImageElement);
    const placeholder = document.querySelector(".mild-image__fallback") as HTMLElement;
    expect(placeholder).toHaveTextContent("No image");
    expect(placeholder).not.toHaveAttribute("role");
  });

  it("shows the placeholder until the image has loaded when asked", () => {
    render(<Image src="photo.jpg" alt="Cover" showFallbackWhileLoading />);
    const image = document.querySelector("img") as HTMLImageElement;
    expect(image.style.display).toBe("none");
    expect(document.querySelector(".mild-image__fallback")).toBeInTheDocument();
    fireEvent.load(image);
    expect(image.style.display).toBe("");
    expect(document.querySelector(".mild-image__fallback")).toBeNull();
  });

  it("fills a fixed-ratio frame and maps fit and radius", () => {
    render(<Image src="photo.jpg" alt="Wide" ratio="16/9" fit="cover" radius="lg" />);
    const image = screen.getByRole("img", { name: "Wide" });
    const frame = image.parentElement as HTMLElement;
    expect(frame).toHaveClass(
      "mild-image-frame",
      "mild-image-frame--ratio",
      "mild-image-frame--radius-lg",
    );
    expect(frame.style.getPropertyValue("--mild-image-ratio")).toBe("16 / 9");
    expect(image).toHaveClass("mild-image--cover");
    expect(image).not.toHaveClass("mild-image--radius-lg");
  });

  it("puts the radius on the image itself without a frame", () => {
    render(<Image src="photo.jpg" alt="" radius="full" />);
    expect(document.querySelector("img")).toHaveClass("mild-image--radius-full");
  });

  it("renders the placeholder when there is no source at all", () => {
    render(<Image alt="Missing" />);
    expect(document.querySelector("img")).toBeNull();
    expect(screen.getByRole("img", { name: "Missing" })).toHaveClass("mild-image__fallback");
  });
});
