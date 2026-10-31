import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Map } from "./Map";
import { boundingBox, openStreetMapEmbedUrl, openStreetMapUrl } from "../../utils";

const paris = { latitude: 48.8566, longitude: 2.3522 };

describe("Map", () => {
  it("embeds a titled, lazily loaded OpenStreetMap iframe with a link to the full map", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Map ref={ref} {...paris} title="Our office" />);
    const figure = ref.current as HTMLElement;
    expect(figure.tagName).toBe("FIGURE");
    expect(figure).toHaveClass("mild-map");
    expect(figure).toHaveAttribute("data-provider", "openstreetmap");
    expect(figure.style.getPropertyValue("--mild-map-ratio")).toBe("16 / 9");

    const iframe = figure.querySelector("iframe") as HTMLIFrameElement;
    expect(iframe).toHaveAttribute("title", "Our office");
    expect(iframe).toHaveAttribute("loading", "lazy");
    expect(iframe).toHaveClass("mild-map__iframe");
    const src = new URL(iframe.getAttribute("src") as string);
    expect(src.origin + src.pathname).toBe("https://www.openstreetmap.org/export/embed.html");
    expect(src.searchParams.get("marker")).toBe("48.8566,2.3522");
    expect(src.searchParams.get("layer")).toBe("mapnik");
    expect(src.searchParams.get("bbox")?.split(",")).toHaveLength(4);

    const link = screen.getByRole("link", { name: "View larger map" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link.getAttribute("href")).toContain("#map=13/48.8566/2.3522");
    expect(link.getAttribute("href")).toContain("mlat=48.8566");
  });

  it("uses a custom src, no marker, a caption, eager loading and another ratio", () => {
    render(
      <Map
        {...paris}
        zoom={15}
        title="Custom"
        src="https://maps.example.com/embed?q=paris"
        marker={false}
        lazy={false}
        ratio={4 / 3}
        caption="HQ"
        linkLabel="Open map"
        iframeProps={{ allowFullScreen: true }}
      />,
    );
    const figure = document.querySelector(".mild-map") as HTMLElement;
    expect(figure).toHaveAttribute("data-provider", "custom");
    expect(figure.style.getPropertyValue("--mild-map-ratio")).toBe(String(4 / 3));
    const iframe = figure.querySelector("iframe") as HTMLIFrameElement;
    expect(iframe).toHaveAttribute("src", "https://maps.example.com/embed?q=paris");
    expect(iframe).not.toHaveAttribute("loading");
    expect(iframe).toHaveAttribute("allowfullscreen");
    expect(screen.getByText("HQ")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Open map" });
    expect(link.getAttribute("href")).toContain("#map=15/");
    expect(link.getAttribute("href")).not.toContain("mlat");
  });

  it("renders a fallback instead of the embed, and can drop the link", () => {
    render(
      <Map {...paris} title="Office" showLink={false} fallback={<span>Map unavailable</span>} />,
    );
    expect(document.querySelector("iframe")).toBeNull();
    expect(screen.getByRole("img", { name: "Office" })).toHaveTextContent("Map unavailable");
    expect(screen.queryByRole("link")).toBeNull();
    expect(document.querySelector("figcaption")).toBeNull();
  });

  it("utilities build a bounding box around the point and clamp the zoom", () => {
    const [minLon, minLat, maxLon, maxLat] = boundingBox({ ...paris, zoom: 13 });
    expect(minLon).toBeLessThan(paris.longitude);
    expect(maxLon).toBeGreaterThan(paris.longitude);
    expect(minLat).toBeLessThan(paris.latitude);
    expect(maxLat).toBeGreaterThan(paris.latitude);
    expect(maxLon - minLon).toBeCloseTo(360 / 2 ** 13, 5);

    // Near the pole the box is clamped into range.
    const [, , , polarMax] = boundingBox({ latitude: 89.99, longitude: 0, zoom: 1 });
    expect(polarMax).toBe(90);

    expect(openStreetMapUrl({ ...paris, zoom: 99, marker: false })).toContain("#map=19/");
    expect(openStreetMapEmbedUrl({ ...paris, zoom: 0.2, marker: true })).toContain(
      "marker=48.8566%2C2.3522",
    );
  });
});
