// storybook/vue/.storybook/main.ts - Updated with optimizations
import type { StorybookConfig } from "@storybook/vue3-vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

const config: StorybookConfig = {
  stories: [
    "../src/stories/Introduction.mdx",
    "../src/stories/**/*.stories.@(js|ts|vue|mdx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials", // This includes controls, viewport, docs, etc.
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "storybook-dark-mode",
    // Remove duplicates - these are included in essentials:
    // '@storybook/addon-docs',
    // '@storybook/addon-controls',
    // '@storybook/addon-viewport'
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  typescript: {
    check: false,
  },
  viteFinal: async (config, { configType }) => {
    // Add Vue plugin for handling .vue files
    config.plugins = config.plugins || [];
    config.plugins.push(vue());

    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@mild-ui/vue": resolve(__dirname, "../../../packages/vue/src"),
      "@mild-ui/core": resolve(__dirname, "../../../packages/core/src"),
    };

    if (configType === "PRODUCTION") {
      const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
      config.base = isGitHubPages ? "/mild-ui/vue/" : "./";

      config.build = config.build || {};
      config.build.rollupOptions = config.build.rollupOptions || {};

      // Improved chunking strategy
      config.build.rollupOptions.output = {
        ...config.build.rollupOptions.output,
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      };

      config.build.target = "es2020";
      config.build.minify = "esbuild";
      config.build.sourcemap = false; // Disable to avoid sourcemap warnings
      config.build.chunkSizeWarningLimit = 1000; // Reduce warning noise

      config.build.rollupOptions.output.format = "es";

      // Suppress warnings
      config.build.rollupOptions.onwarn = (warning, warn) => {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        if (warning.message && warning.message.includes("Use of eval")) {
          return;
        }
        warn(warning);
      };
    } else {
      // Development settings
      config.build = config.build || {};
      config.build.sourcemap = true;
    }

    return config;
  },
  docs: {
    autodocs: "tag",
    defaultName: "Docs",
  },
  staticDirs: ["../public"],
};

export default config;
