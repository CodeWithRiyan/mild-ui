import { h } from "vue";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { mapCases } from "@mild-ui/test-cases/map";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { boundingBox, openStreetMapEmbedUrl, openStreetMapUrl } from "../../utils";
import { Map } from "./index";
import type { MapProps } from "../../types/data-display";

runComponentCases(mapCases, (c) => h(Map, caseProps<MapProps>(c)));

const paris = { latitude: 48.8566, longitude: 2.3522 };

describe("Map", () => {
  it("embeds a titled, lazily loaded OpenStreetMap iframe with a link to the full map", () => {
    const { container } = render(h(Map, { ...paris, title: "Our office", "data-x": "y" }));
    const figure = container.firstElementChild as HTMLElement;
    expect(figure.tagName).toBe("FIGURE");
    expect(figure).toHaveClass("mild-map");
    expect(figure).toHaveAttribute("data-provider", "openstreetmap");
    expect(figure).toHaveAttribute("data-x", "y");
    expect(figure.style.getPropertyValue("--mild-map-ratio")).toBe("16 / 9");

    const iframe = figure.querySelector("iframe") as HTMLIFrameElement;
    expect(iframe).toHaveAttribute("title", "Our office");
    expect(iframe).toHaveAttribute("loading", "lazy");
    expect(iframe).toHaveAttribute("referrerpolicy", "no-referrer-when-downgrade");
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
      h(Map, {
        ...paris,
        zoom: 15,
        title: "Custom",
        src: "https://maps.example.com/embed?q=paris",
        marker: false,
        lazy: false,
        ratio: 4 / 3,
        caption: "HQ",
        linkLabel: "Open map",
        iframeProps: { allowfullscreen: true, class: "extra" },
      }),
    );
    const figure = document.querySelector(".mild-map") as HTMLElement;
    expect(figure).toHaveAttribute("data-provider", "custom");
    expect(figure.style.getPropertyValue("--mild-map-ratio")).toBe(String(4 / 3));
    const iframe = figure.querySelector("iframe") as HTMLIFrameElement;
    expect(iframe).toHaveAttribute("src", "https://maps.example.com/embed?q=paris");
    expect(iframe).not.toHaveAttribute("loading");
    expect(iframe).toHaveAttribute("allowfullscreen");
    expect(iframe).toHaveClass("mild-map__iframe", "extra");
    expect(screen.getByText("HQ")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Open map" });
    expect(link.getAttribute("href")).toContain("#map=15/");
    expect(link.getAttribute("href")).not.toContain("mlat");
  });

  it("renders a fallback (prop or slot) instead of the embed, and can drop the link", () => {
    const { unmount } = render(
      h(Map, { ...paris, title: "Office", showLink: false, fallback: "Map unavailable" }),
    );
    expect(document.querySelector("iframe")).toBeNull();
    expect(screen.getByRole("img", { name: "Office" })).toHaveTextContent("Map unavailable");
    expect(screen.queryByRole("link")).toBeNull();
    expect(document.querySelector("figcaption")).toBeNull();
    unmount();

    render(
      h(
        Map,
        { ...paris, title: "Office", showLink: false },
        {
          fallback: () => h("em", "Consent needed"),
          caption: () => h("strong", "Paris"),
        },
      ),
    );
    expect(screen.getByRole("img", { name: "Office" }).querySelector("em")).toHaveTextContent(
      "Consent needed",
    );
    // A caption slot keeps the figcaption even without the link.
    expect(document.querySelector("figcaption strong")).toHaveTextContent("Paris");
  });

  it("merges class and style on the figure", () => {
    const { container } = render(
      asComponent(() =>
        h(Map, { ...paris, title: "T", class: "custom", style: { marginTop: "1px" } }),
      ),
    );
    const figure = container.firstElementChild as HTMLElement;
    expect(figure).toHaveClass("mild-map", "custom");
    expect(figure.style.marginTop).toBe("1px");
    expect(figure.style.getPropertyValue("--mild-map-ratio")).toBe("16 / 9");
  });

  it("utilities build a bounding box around the point and clamp the zoom", () => {
    const [minLon, minLat, maxLon, maxLat] = boundingBox({ ...paris, zoom: 13 });
    expect(minLon).toBeLessThan(paris.longitude);
    expect(maxLon).toBeGreaterThan(paris.longitude);
    expect(minLat).toBeLessThan(paris.latitude);
    expect(maxLat).toBeGreaterThan(paris.latitude);
    expect(maxLon - minLon).toBeCloseTo(360 / 2 ** 13, 5);

    // Near the pole and the antimeridian the box is clamped into range, at both ends.
    const [, polarMin, , polarMax] = boundingBox({ latitude: 89.99, longitude: 0, zoom: 1 });
    expect(polarMax).toBe(90);
    expect(polarMin).toBeLessThan(90);
    const [westMin, southMin, eastMax, northMax] = boundingBox({
      latitude: -89.99,
      longitude: -179.99,
      zoom: 1,
    });
    expect(westMin).toBe(-180);
    expect(southMin).toBe(-90);
    expect(eastMax).toBeGreaterThan(-180);
    expect(northMax).toBeGreaterThan(-90);
    const [, , farEast] = boundingBox({ latitude: 0, longitude: 179.99, zoom: 1 });
    expect(farEast).toBe(180);

    expect(openStreetMapUrl({ ...paris, zoom: 99, marker: false })).toContain("#map=19/");
    expect(openStreetMapEmbedUrl({ ...paris, zoom: 0.2, marker: true })).toContain(
      "marker=48.8566%2C2.3522",
    );
    expect(openStreetMapEmbedUrl({ ...paris, zoom: 13, marker: false })).not.toContain("marker=");
  });
});

itHasNoSeriousAxeViolations("Map", () =>
  h("div", [
    h(Map, { ...paris, title: "Our office", caption: "Paris" }),
    h(Map, { ...paris, title: "Fallback", fallback: "Map unavailable" }),
  ]),
);
