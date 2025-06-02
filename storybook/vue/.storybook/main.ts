import type { StorybookConfig } from '@storybook/vue3-vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

const config: StorybookConfig = {
  stories: [
    '../src/stories/Introduction.mdx',
    '../src/stories/**/*.stories.@(js|ts|vue|mdx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    'storybook-dark-mode',
    '@storybook/addon-controls',
    '@storybook/addon-viewport'
  ],
  framework: {
    name: '@storybook/vue3-vite',
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
      '@mild-ui/vue': resolve(__dirname, '../../../packages/vue/src'),
      '@mild-ui/core': resolve(__dirname, '../../../packages/core/src'),
    };
    
    // Configure for different environments
    if (configType === 'PRODUCTION') {
      // Check if we're building for GitHub Pages (when GITHUB_ACTIONS is set)
      const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
      
      // Set base path for GitHub Pages deployment
      config.base = isGitHubPages ? '/mild-ui/vue/' : './';
      
      // Configure build options
      config.build = config.build || {};
      config.build.rollupOptions = config.build.rollupOptions || {};
      
      // Ensure proper asset handling
      config.build.rollupOptions.output = {
        ...config.build.rollupOptions.output,
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        manualChunks: undefined,
      };
      
      // Optimize for static hosting
      config.build.target = 'es2015';
      config.build.minify = 'esbuild';
      config.build.sourcemap = false;
      
      // Handle dynamic imports
      config.build.rollupOptions.output.format = 'es';
    }
    
    return config;
  },
  docs: {
    autodocs: 'tag',
    defaultName: 'Docs'
  },
  staticDirs: ['../public'],
};

export default config;