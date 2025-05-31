import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/stories/Introduction.stories.mdx',
    '../src/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'
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
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config, { configType }) => {
    // Ensure resolve config exists
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    
    // No workspace aliases needed - using published packages
    
    // Configure for different environments
    if (configType === 'PRODUCTION') {
      const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
      
      // Set base path for GitHub Pages
      config.base = isGitHubPages ? './' : './';
      
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
      
      // Suppress warnings
      config.build.rollupOptions.onwarn = (warning, warn) => {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        warn(warning);
      };
    }
    
    return config;
  },
  docs: {
    autodocs: 'tag',
    defaultName: 'Docs'
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  staticDirs: ['../public'],
};

export default config;