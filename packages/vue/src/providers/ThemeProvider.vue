<!-- packages/vue/src/providers/ThemeProvider.vue -->
<script setup lang="ts">
//
// Theme + color mode in one context.
//
//   <ColorModeScript />                        in <head>: applies the saved mode before first paint
//   <ThemeProvider default-color-mode="system"> owns the mode, persists it, follows the OS live
//   useTheme()        -> { theme, ...colorMode }
//   useColorMode()    -> the color-mode slice of the same context
//
// The resolved mode is written to <html data-theme="light|dark"> (what the core stylesheet keys
// on) and to <html style="color-scheme">, so native controls and scrollbars follow as well.
import { computed, onBeforeUnmount, onMounted, ref, watch, watchEffect } from "vue";
import type { ColorMode, ResolvedColorMode } from "../types";
import type { ThemeProviderProps } from "../types/theme";
import {
  applyCSSProperties,
  generateCSSProperties,
  mergeThemes,
  defaultTheme,
} from "../utils/theme";
import {
  COLOR_MODE_ATTRIBUTE,
  DEFAULT_STORAGE_KEY,
  RESOLVED_ATTRIBUTE,
  isColorMode,
} from "./color-mode";
import { provideTheme, type ThemeContextValue } from "./context";

const props = withDefaults(defineProps<ThemeProviderProps>(), {
  as: undefined,
  theme: undefined,
  defaultColorMode: undefined,
  defaultTheme: undefined,
  colorMode: undefined,
  storageKey: DEFAULT_STORAGE_KEY,
  cssVarPrefix: "mild",
});

const emit = defineEmits<{
  /** `v-model:colorMode` */
  (e: "update:colorMode", mode: ColorMode): void;
  (e: "colorModeChange", mode: ColorMode): void;
}>();

defineSlots<{
  default?: (context: ThemeContextValue) => unknown;
}>();

const DARK_QUERY = "(prefers-color-scheme: dark)";

function readStoredColorMode(storageKey: string | null): ColorMode | null {
  if (storageKey === null || typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(storageKey);
    return isColorMode(stored) ? stored : null;
  } catch {
    return null;
  }
}

function writeStoredColorMode(storageKey: string | null, mode: ColorMode): void {
  if (storageKey === null || typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey, mode);
  } catch {
    // Storage can be unavailable (privacy mode, quota); the mode still applies for the session.
  }
}

const theme = computed(() => (props.theme ? mergeThemes(defaultTheme, props.theme) : defaultTheme));

// Chosen mode: controlled, else stored, else the default.
const isControlled = computed(() => props.colorMode !== undefined);
// The first render must match the server HTML, so it starts from the default; the stored
// choice is applied right after mount (ColorModeScript already painted it, so nothing flashes).
const internalMode = ref<ColorMode>(props.defaultColorMode ?? props.defaultTheme ?? "system");
onMounted(() => {
  const stored = readStoredColorMode(props.storageKey);
  if (stored) internalMode.value = stored;
});
const colorMode = computed<ColorMode>(() =>
  isControlled.value ? (props.colorMode as ColorMode) : internalMode.value,
);

// OS preference, followed live (read after mount for the same reason).
const systemColorMode = ref<ResolvedColorMode>("light");
onMounted(() => {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
  const query = window.matchMedia(DARK_QUERY);
  const update = () => {
    systemColorMode.value = query.matches ? "dark" : "light";
  };
  update();
  query.addEventListener("change", update);
  onBeforeUnmount(() => query.removeEventListener("change", update));
});

const resolvedColorMode = computed<ResolvedColorMode>(() =>
  colorMode.value === "system" ? systemColorMode.value : colorMode.value,
);

function setColorMode(mode: ColorMode): void {
  if (!isControlled.value) internalMode.value = mode;
  writeStoredColorMode(props.storageKey, mode);
  emit("update:colorMode", mode);
  emit("colorModeChange", mode);
}

function toggleColorMode(): void {
  setColorMode(resolvedColorMode.value === "dark" ? "light" : "dark");
}

// Reflect the mode on <html>: data-theme drives the stylesheet, color-scheme the UA styles.
onMounted(() => {
  watchEffect(() => {
    const root = document.documentElement;
    root.setAttribute(RESOLVED_ATTRIBUTE, resolvedColorMode.value);
    root.setAttribute(COLOR_MODE_ATTRIBUTE, colorMode.value);
    root.style.colorScheme = resolvedColorMode.value;
  });
});

// Theme overrides become custom properties on <html>; the defaults already come from the
// stylesheet, so only what the consumer changed is written (and removed again on change).
let removeProperties: (() => void) | null = null;
onMounted(() => {
  watch(
    () => [props.theme, props.cssVarPrefix] as const,
    ([overrides, prefix]) => {
      removeProperties?.();
      removeProperties = overrides
        ? applyCSSProperties(generateCSSProperties(overrides, prefix))
        : null;
    },
    { immediate: true },
  );
});
onBeforeUnmount(() => removeProperties?.());

const context: ThemeContextValue = {
  theme,
  colorMode,
  resolvedColorMode,
  systemColorMode: computed(() => systemColorMode.value),
  setColorMode,
  toggleColorMode,
  isDark: computed(() => resolvedColorMode.value === "dark"),
  isLight: computed(() => resolvedColorMode.value === "light"),
  isSystem: computed(() => colorMode.value === "system"),
};

provideTheme(context);
</script>

<template>
  <component :is="as" v-if="as" class="mild-theme-provider"><slot v-bind="context" /></component>
  <slot v-else v-bind="context" />
</template>
