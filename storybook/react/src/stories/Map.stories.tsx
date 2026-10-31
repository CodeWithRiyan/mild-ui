import type { Meta, StoryObj } from "@storybook/react";
import { Map } from "@mild-ui/react";

const meta = {
  title: "Data Display/Map",
  component: Map,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Embedded map (OpenStreetMap by default: no API key, no script) in a fixed-ratio frame, with a link to the full map. `title` names the iframe for assistive technology. Pass `src` for another provider, or `fallback` to render something else without loading the embed.",
      },
    },
  },
  argTypes: {
    latitude: { control: "number" },
    longitude: { control: "number" },
    zoom: { control: { type: "range", min: 1, max: 19 } },
    title: { control: "text" },
    marker: { control: "boolean" },
    ratio: { control: "text" },
    lazy: { control: "boolean" },
    showLink: { control: "boolean" },
    caption: { control: "text" },
  },
  args: {
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 13,
    title: "Office in Paris",
    caption: "Paris, France",
  },
} satisfies Meta<typeof Map>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: (args) => (
    <div className="w-[36rem]">
      <Map {...args} />
    </div>
  ),
} satisfies Story;

export const WithFallback = {
  name: "Fallback instead of the embed",
  render: () => (
    <div className="w-[36rem]">
      <Map
        latitude={51.5074}
        longitude={-0.1278}
        title="Office in London"
        ratio="21/9"
        fallback="Map embeds are disabled in this environment."
      />
    </div>
  ),
} satisfies Story;
