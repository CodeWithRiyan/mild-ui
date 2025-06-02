// storybook/react/.storybook/main.ts - Updated with optimizations
import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "path";

const config: StorybookConfig = {
  stories: [
    "../src/stories/Introduction.mdx",
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "storybook-dark-mode",
    // Remove duplicate addons - these are already included in essentials
    // "@storybook/addon-controls",
    // "@storybook/addon-viewport",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  viteFinal: async (config, { configType }) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@mild-ui/react": resolve(__dirname, "../../../packages/react/src"),
      "@mild-ui/core": resolve(__dirname, "../../../packages/core/src"),
    };

    // Configure for different environments
    if (configType === "PRODUCTION") {
      const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
      config.base = isGitHubPages ? "/mild-ui/react/" : "./";

      config.build = config.build || {};
      config.build.rollupOptions = config.build.rollupOptions || {};

      // Improved chunking strategy to reduce large chunks
      config.build.rollupOptions.output = {
        ...config.build.rollupOptions.output,
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      };

      config.build.target = "es2020";
      config.build.minify = "esbuild";
      
      // Disable sourcemap in production to avoid warnings
      config.build.sourcemap = false;
      
      // Increase chunk size warning limit to reduce noise
      config.build.chunkSizeWarningLimit = 1000;

      config.build.rollupOptions.output.format = "es";

      // Enhanced warning suppression
      config.build.rollupOptions.onwarn = (warning, warn) => {
        // Suppress "use client" warnings from Radix UI
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        // Suppress eval warnings from Storybook core (these are safe in dev/build context)
        if (warning.message && warning.message.includes('Use of eval')) {
          return;
        }
        warn(warning);
      };
    } else {
      // Development settings
      config.build = config.build || {};
      config.build.sourcemap = true; // Enable sourcemap in development
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