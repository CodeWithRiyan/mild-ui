<template>
  <div>
    <slot
      :theme="theme"
      :setTheme="setTheme"
      :config="config"
      :setConfig="setConfig"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, watch, computed } from "vue";
import {
  ThemeConfig,
  defaultTheme,
  darkTheme,
  applyTheme,
} from "@mild-ui/core";

type ThemeMode = "light" | "dark" | "system";

interface Props {
  defaultTheme?: ThemeMode;
  config?: ThemeConfig;
  storageKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  defaultTheme: "system",
  config: () => defaultTheme,
  storageKey: "mild-ui-theme",
});

const theme = ref<ThemeMode>(props.defaultTheme);
const config = ref<ThemeConfig>(props.config);

// Initialize theme from localStorage
onMounted(() => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(props.storageKey) as ThemeMode;
    if (stored) {
      theme.value = stored;
    }
  }
  applyCurrentTheme();
});

const setTheme = (newTheme: ThemeMode) => {
  theme.value = newTheme;
  if (typeof window !== "undefined") {
    localStorage.setItem(props.storageKey, newTheme);
  }
};

const setConfig = (newConfig: ThemeConfig) => {
  config.value = newConfig;
};

const effectiveTheme = computed(() => {
  if (theme.value === "system") {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  }
  return theme.value;
});

const applyCurrentTheme = () => {
  if (typeof window === "undefined") return;

  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(effectiveTheme.value);

  const activeConfig =
    effectiveTheme.value === "dark" ? darkTheme : config.value;
  applyTheme(activeConfig);
};

// Watch for theme changes
watch([theme, config], applyCurrentTheme);

// Listen for system theme changes
onMounted(() => {
  if (typeof window === "undefined") return;

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleChange = () => {
    if (theme.value === "system") {
      applyCurrentTheme();
    }
  };

  mediaQuery.addEventListener("change", handleChange);

  return () => {
    mediaQuery.removeEventListener("change", handleChange);
  };
});

// Provide theme context
provide("theme", {
  theme,
  setTheme,
  config,
  setConfig,
});
</script>
