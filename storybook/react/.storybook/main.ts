import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'path';

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
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mild-ui/react': resolve(__dirname, '../../../packages/react/src'),
      '@mild-ui/core': resolve(__dirname, '../../../packages/core/src'),
    };
    
    // Configure for GitHub Pages deployment
    if (configType === 'PRODUCTION') {
      config.base = '/mild-ui/react/';
      
      // Ensure proper asset handling
      config.build = config.build || {};
      config.build.rollupOptions = config.build.rollupOptions || {};
      config.build.rollupOptions.output = {
        ...config.build.rollupOptions.output,
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
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