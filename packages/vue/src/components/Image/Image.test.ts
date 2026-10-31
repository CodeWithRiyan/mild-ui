import { h } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { imageCases } from "@mild-ui/test-cases/image";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Image } from "./index";

runComponentCases(imageCases, (c) => h(Image, caseProps<{ alt: string }>(c)));

describe("Image", () => {
  it("renders a lazily loaded image by default", async () => {
    const onLoad = vi.fn();
    render(h(Image, { src: "photo.jpg", alt: "A photo", onLoad }));
    const image = screen.getByRole("img", { name: "A photo" });
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("decoding", "async");
    expect(image).toHaveClass("mild-image");
    expect(image).toHaveAttribute("data-state", "loading");
    expect(image.parentElement?.classList.contains("mild-image-frame")).toBe(false);

    await fireEvent.load(image);
    expect(image).toHaveAttribute("data-state", "loaded");
    expect(onLoad).toHaveBeenCalledTimes(1);
  });

  it("loads eagerly when lazy is off", () => {
    render(h(Image, { src: "photo.jpg", alt: "", lazy: false }));
    const image = document.querySelector("img")!;
    expect(image).not.toHaveAttribute("loading");
    expect(image).not.toHaveAttribute("decoding");
  });

  it("swaps to fallbackSrc on error, then to the placeholder if that fails too", async () => {
    const onError = vi.fn();
    render(h(Image, { src: "broken.jpg", alt: "Cover", fallbackSrc: "fallback.jpg", onError }));
    await fireEvent.error(screen.getByRole("img", { name: "Cover" }));
    expect(onError).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("img", { name: "Cover" })).toHaveAttribute("src", "fallback.jpg");

    await fireEvent.error(screen.getByRole("img", { name: "Cover" }));
    expect(document.querySelector("img")).toBeNull();
    const placeholder = screen.getByRole("img", { name: "Cover" });
    expect(placeholder).toHaveClass("mild-image__fallback");
    expect(placeholder.querySelector("svg")).toBeInTheDocument();
    expect(placeholder.closest(".mild-image-frame")).toHaveAttribute("data-state", "error");
  });

  it("renders a custom fallback slot, without a role for decorative images, and resets on a new src", async () => {
    const { rerender } = render(
      h(Image, { src: "broken.jpg", alt: "" }, { fallback: () => h("span", "No image") }),
    );
    await fireEvent.error(document.querySelector("img")!);
    const placeholder = document.querySelector(".mild-image__fallback")!;
    expect(placeholder).toHaveTextContent("No image");
    expect(placeholder).not.toHaveAttribute("role");

    await rerender({ src: "fixed.jpg", alt: "" });
    expect(document.querySelector("img")).toHaveAttribute("data-state", "loading");
    expect(document.querySelector(".mild-image__fallback")).toBeNull();
  });

  it("shows the placeholder until the image has loaded when asked", async () => {
    render(h(Image, { src: "photo.jpg", alt: "Cover", showFallbackWhileLoading: true }));
    const image = document.querySelector("img")!;
    expect(image.style.display).toBe("none");
    expect(document.querySelector(".mild-image__fallback")).toBeInTheDocument();
    await fireEvent.load(image);
    expect(image.style.display).toBe("");
    expect(document.querySelector(".mild-image__fallback")).toBeNull();
  });

  it("fills a fixed-ratio frame and maps fit, radius and the frame class", () => {
    render(
      h(Image, {
        src: "photo.jpg",
        alt: "Wide",
        ratio: "16/9",
        fit: "cover",
        radius: "lg",
        frameClass: "hero",
      }),
    );
    const image = screen.getByRole("img", { name: "Wide" });
    const frame = image.parentElement as HTMLElement;
    expect(frame).toHaveClass(
      "mild-image-frame",
      "mild-image-frame--ratio",
      "mild-image-frame--radius-lg",
      "hero",
    );
    expect(frame.style.getPropertyValue("--mild-image-ratio")).toBe("16 / 9");
    expect(image).toHaveClass("mild-image--cover");
    expect(image).not.toHaveClass("mild-image--radius-lg");
  });

  it("puts the radius and attributes on the image itself without a frame", () => {
    render(h(Image, { src: "photo.jpg", alt: "", radius: "full", sizes: "100vw" }));
    const image = document.querySelector("img")!;
    expect(image).toHaveClass("mild-image--radius-full");
    expect(image).toHaveAttribute("sizes", "100vw");
  });

  it("renders the placeholder when there is no source at all", () => {
    render(h(Image, { alt: "Missing" }));
    expect(document.querySelector("img")).toBeNull();
    expect(screen.getByRole("img", { name: "Missing" })).toHaveClass("mild-image__fallback");
  });
});

itHasNoSeriousAxeViolations("Image", () =>
  h("div", [
    h(Image, { src: "photo.jpg", alt: "A photo" }),
    h(Image, { src: "photo.jpg", alt: "", ratio: "4/3", radius: "md" }),
    h(Image, { alt: "Missing" }),
  ]),
);
