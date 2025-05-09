# Setting Up mild-ui for Development

This guide will help you set up your local development environment for the mild-ui component library.

## Prerequisites

- Node.js (version 18 or higher)
- pnpm (version 8 or higher)

## Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mild-ui.git
   cd mild-ui
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Running the development server**

   To start the development server:
   ```bash
   pnpm dev
   ```
   This will start a Vite server that redirects to Storybook after a few seconds. The server will open automatically in your browser.

4. **Running Storybook directly**

   To start Storybook directly:
   ```bash
   pnpm storybook
   ```

5. **Building the packages**

   To build all packages:
   ```bash
   pnpm build
   ```

## Project Structure

The mild-ui library is organized as a monorepo using pnpm workspaces:

- `packages/core`: Framework-agnostic utilities and styles
- `packages/react`: React components
- `packages/vue`: Vue components
- `packages/svelte`: Svelte components
- `packages/tailwind-preset`: Tailwind CSS preset

## Working with Storybook

Storybook is used for component development and documentation. It allows you to develop and test components in isolation.

To add a new story:

1. Create a `ComponentName.stories.tsx` file next to your component:
   ```typescript
   import type { Meta, StoryObj } from '@storybook/react'; // or vue, svelte
   import { ComponentName } from './ComponentName';

   const meta: Meta<typeof ComponentName> = {
     title: 'Components/ComponentName',
     component: ComponentName,
     parameters: {
       layout: 'centered',
     },
     tags: ['autodocs'],
     argTypes: {
       // Define your component props here
     },
   };

   export default meta;
   type Story = StoryObj<typeof ComponentName>;

   export const Default: Story = {
     args: {
       // Your component props
     },
   };
   ```

2. Run Storybook to see your component:
   ```bash
   pnpm storybook
   ```

## Development Workflow

1. **Create a new component**:
   - Add the component definition to the core package if it contains shared logic
   - Implement the framework-specific component in the respective package

2. **Style your component**:
   - Add Tailwind CSS classes for the default styling

3. **Document your component**:
   - Create a story for your component
   - Add proper JSDoc comments to your component props

4. **Test your component**:
   - Add tests using Vitest

## Building for Production

To build the packages for production:

```bash
pnpm build
```

This will create optimized builds in the `dist` directory of each package.

## Running the Examples

To run the examples:

```bash
# React example
cd examples/react-example
pnpm install
pnpm dev
```

## Troubleshooting

### Styles not loading properly

If styles are not loading properly, make sure:

1. Tailwind CSS is properly configured:
   - Check `tailwind.config.js` to ensure it includes all necessary paths
   - Make sure PostCSS is configured with `postcss.config.js`

2. The core styles are being imported:
   ```typescript
   import '@mild-ui/core/styles/base.css';
   ```

### Dev server not starting

If the dev server isn't starting:

1. Check for port conflicts:
   ```bash
   # Kill processes using port 3000
   npx kill-port 3000
   ```

2. Make sure all dependencies are installed:
   ```bash
   pnpm install
   ```

3. Check for errors in your terminal output

### Components not rendering as expected

If components don't render as expected:

1. Check the browser console for errors
2. Verify that all required props are provided
3. Check that the style system is properly configured (Tailwind CSS)
4. Ensure that the CSS variables are properly defined

## Using with Tailwind CSS

1. Import the core styles:
   ```typescript
   import '@mild-ui/core/styles/base.css';
   ```

2. Add the mild-ui preset to your Tailwind config:
   ```javascript
   // tailwind.config.js
   module.exports = {
     presets: [require('@mild-ui/tailwind-preset')],
     // Your other configuration...
   };
   ```

## Next Steps

After setting up the development environment, you might want to:

1. Add more components to the library
2. Improve the documentation
3. Add more examples for different frameworks
4. Set up automated testing and CI/CD