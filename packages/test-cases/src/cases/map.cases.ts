// Shared cases for <Map />
import type { ComponentCases } from "../types";

const paris = { latitude: 48.8566, longitude: 2.3522, title: "Our office" };

export const mapCases: ComponentCases = {
  component: "Map",
  cases: [
    {
      name: "default embeds a titled lazy OpenStreetMap iframe in a 16/9 figure",
      props: paris,
      query: { selector: "figure.mild-map" },
      expected: {
        classes: ["mild-map"],
        attributes: { "data-provider": "openstreetmap", style: "--mild-map-ratio: 16 / 9;" },
      },
      parts: [
        {
          query: { selector: "iframe" },
          classes: ["mild-map__iframe"],
          attributes: { title: "Our office", loading: "lazy" },
        },
        { query: { role: "link", name: "View larger map" }, attributes: { target: "_blank" } },
      ],
    },
    {
      name: "custom src, no link, eager",
      props: { ...paris, src: "https://maps.example.com/embed", showLink: false, lazy: false },
      query: { selector: "figure.mild-map" },
      expected: { attributes: { "data-provider": "custom" } },
      parts: [
        {
          query: { selector: "iframe" },
          attributes: { src: "https://maps.example.com/embed" },
          absentAttributes: ["loading"],
        },
      ],
    },
    {
      name: "fallback replaces the embed",
      props: { ...paris, fallback: "Map unavailable" },
      query: { role: "img", name: "Our office" },
      expected: { classes: ["mild-map__fallback"], text: "Map unavailable" },
    },
    {
      name: "custom className is merged",
      props: { ...paris, className: "custom-map" },
      query: { selector: "figure.mild-map" },
      expected: { classes: ["mild-map", "custom-map"] },
    },
  ],
};

export default mapCases;
