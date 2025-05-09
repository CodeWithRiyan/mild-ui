import { Preview } from "@storybook/react";
import { withThemeByClassName } from '@storybook/addon-themes';

// Import Tailwind CSS
import './tailwind.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a202c',
        },
      ],
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
        system: 'system-theme',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;