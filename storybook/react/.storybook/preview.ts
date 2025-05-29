import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: { 
      toc: true,
      source: {
        state: 'open',
      },
    },
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0f172a' },
      ],
    },
    // Fix for GitHub Pages deployment
    options: {
      storySort: {
        order: ['Introduction', 'Components'],
      },
    },
  },
  globalTypes: { 
    darkMode: { 
      defaultValue: false 
    } 
  },
};

export default preview;