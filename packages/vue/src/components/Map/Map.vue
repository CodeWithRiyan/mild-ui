<!-- packages/vue/src/components/Map/Map.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { openStreetMapEmbedUrl, openStreetMapUrl } from "../../utils/map";
import { toCssAspectRatio } from "../AspectRatio/AspectRatio.vue";
import { Link } from "../Link";
import type { MapProps } from "../../types/data-display";

// An embedded map: an OpenStreetMap iframe (no API key, no script) in a fixed-ratio frame,
// named by `title` and followed by a link to the full map. Pass `src` to embed another
// provider, or `fallback` (prop or slot) to render something else in the frame (a static
// picture, a consent prompt) without loading the embed.
const props = withDefaults(defineProps<MapProps>(), {
  zoom: 13,
  provider: "openstreetmap",
  src: undefined,
  marker: true,
  ratio: "16/9",
  lazy: true,
  showLink: true,
  linkLabel: "View larger map",
  caption: undefined,
  fallback: undefined,
  iframeProps: undefined,
});

const slots = defineSlots<{
  /** Rendered in the frame instead of the embed; takes precedence over the `fallback` prop. */
  fallback?: () => unknown;
  /** Caption next to the link; takes precedence over the `caption` prop. */
  caption?: () => unknown;
}>();

const location = computed(() => ({
  latitude: props.latitude,
  longitude: props.longitude,
  zoom: props.zoom,
  marker: props.marker,
}));
const embedSrc = computed(
  () =>
    props.src ??
    (props.provider === "openstreetmap" ? openStreetMapEmbedUrl(location.value) : undefined),
);
const href = computed(() => openStreetMapUrl(location.value));
const hasFallback = computed(() => Boolean(slots.fallback) || props.fallback !== undefined);
const hasCaption = computed(() => Boolean(slots.caption) || props.caption !== undefined);
const iframeClass = computed(() =>
  cn("mild-map__iframe", props.iframeProps?.class as string | undefined),
);
</script>

<template>
  <figure
    class="mild-map"
    :data-provider="src ? 'custom' : provider"
    :style="{ '--mild-map-ratio': toCssAspectRatio(ratio) }"
  >
    <div class="mild-map__frame">
      <div v-if="hasFallback" class="mild-map__fallback" role="img" :aria-label="title">
        <slot name="fallback">{{ fallback }}</slot>
      </div>
      <iframe
        v-else
        :title="title"
        :src="embedSrc"
        :loading="lazy ? 'lazy' : undefined"
        referrerpolicy="no-referrer-when-downgrade"
        v-bind="iframeProps"
        :class="iframeClass"
      />
    </div>
    <figcaption v-if="showLink || hasCaption" class="mild-map__caption">
      <span
        ><slot name="caption">{{ caption }}</slot></span
      >
      <Link v-if="showLink" :href="href" external>{{ linkLabel }}</Link>
    </figcaption>
  </figure>
</template>
