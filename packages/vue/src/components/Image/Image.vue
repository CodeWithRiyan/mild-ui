<!-- packages/vue/src/components/Image/Image.vue -->
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { cn } from "../../utils/cn";
import { toCssAspectRatio } from "../AspectRatio/AspectRatio.vue";
import { ImageIcon } from "../icons";
import type { ImageProps } from "../../types/data-display";

// Attributes (class, style, srcset, sizes...) go on the <img>, not the frame around it.
defineOptions({ inheritAttrs: false });

// `<img>` that loads lazily by default and degrades gracefully: on error it swaps to
// `fallbackSrc`, or renders the `fallback` slot (a placeholder glyph by default). With `ratio`
// it fills a fixed-ratio frame.
const props = withDefaults(defineProps<ImageProps>(), {
  src: undefined,
  fallbackSrc: undefined,
  lazy: true,
  fit: undefined,
  ratio: undefined,
  radius: undefined,
  showFallbackWhileLoading: false,
  frameClass: undefined,
});

const emit = defineEmits<{
  (e: "load", event: Event): void;
  (e: "error", event: Event): void;
}>();

defineSlots<{
  /** Rendered instead of the image when it fails (and `fallbackSrc` is not given). */
  fallback?: () => unknown;
}>();

type LoadState = "loading" | "loaded" | "error";

const state = ref<LoadState>("loading");
const useFallbackSrc = ref(false);
watch(
  () => props.src,
  () => {
    state.value = "loading";
    useFallbackSrc.value = false;
  },
);

const currentSrc = computed(() => (useFallbackSrc.value ? props.fallbackSrc : props.src));
const failed = computed(() => state.value === "error" || !currentSrc.value);
const showPlaceholder = computed(
  () => failed.value || (props.showFallbackWhileLoading && state.value === "loading"),
);
// The frame is rendered whenever a placeholder may appear, so the <img> keeps its place in
// the tree (moving it would remount it and load the picture twice).
const framed = computed(
  () => Boolean(props.ratio) || props.showFallbackWhileLoading || failed.value,
);

const imageClasses = computed(() =>
  cn(
    "mild-image",
    props.fit && `mild-image--${props.fit}`,
    props.radius && !props.ratio && `mild-image--radius-${props.radius}`,
  ),
);
const imageStyle = computed(() =>
  props.showFallbackWhileLoading && state.value === "loading" ? { display: "none" } : undefined,
);
const frameClasses = computed(() =>
  cn(
    "mild-image-frame",
    props.ratio && "mild-image-frame--ratio",
    props.radius && `mild-image-frame--radius-${props.radius}`,
    props.frameClass,
  ),
);
const frameStyle = computed(() =>
  props.ratio ? { "--mild-image-ratio": toCssAspectRatio(props.ratio) } : undefined,
);

function onLoad(event: Event): void {
  state.value = "loaded";
  emit("load", event);
}

function onError(event: Event): void {
  emit("error", event);
  if (!useFallbackSrc.value && props.fallbackSrc) {
    // Try the fallback picture first; only then give up and show the placeholder.
    useFallbackSrc.value = true;
    state.value = "loading";
    return;
  }
  state.value = "error";
}
</script>

<template>
  <div v-if="framed" :class="frameClasses" :style="frameStyle" :data-state="state">
    <img
      v-if="!failed"
      :src="currentSrc"
      :alt="alt"
      :loading="lazy ? 'lazy' : undefined"
      :decoding="lazy ? 'async' : undefined"
      :data-state="state"
      :class="imageClasses"
      :style="imageStyle"
      v-bind="$attrs"
      @load="onLoad"
      @error="onError"
    />
    <div
      v-if="showPlaceholder"
      class="mild-image__fallback"
      :role="alt ? 'img' : undefined"
      :aria-label="alt || undefined"
      :data-state="state"
    >
      <slot name="fallback"><ImageIcon /></slot>
    </div>
  </div>
  <img
    v-else
    :src="currentSrc"
    :alt="alt"
    :loading="lazy ? 'lazy' : undefined"
    :decoding="lazy ? 'async' : undefined"
    :data-state="state"
    :class="imageClasses"
    v-bind="$attrs"
    @load="onLoad"
    @error="onError"
  />
</template>
