# mild-ui

A modern UI component library with support for React, styled with Tailwind CSS.

## Features

- 🌈 Support for frameworks: React
- 🎨 Elegant styling with Tailwind CSS
- 📦 Easy to install and use
- 🧩 Well-structured components with clear and well-defined props and interfaces
- 📚 Comprehensive documentation with Storybook

## Installation

### Core Package

```bash
npm install @mild-ui/core
```

### Framework-specific Packages

#### React

```bash
npm install @mild-ui/react
```
### Tailwind CSS Preset

```bash
npm install @mild-ui/tailwind-preset
```

## Usage

### React

```jsx
import { Button } from '@mild-ui/react';

function App() {
  return (
    <div>
      <Button color="primary" size="md" variant="filled">
        Click me
      </Button>
    </div>
  );
}
```

## Styling with Tailwind CSS

mild-ui uses Tailwind CSS for styling. To use mild-ui with Tailwind CSS, you need to add the mild-ui preset to your Tailwind CSS configuration.

```js
// tailwind.config.js
module.exports = {
  presets: [require('@mild-ui/tailwind-preset')],
  // ... your config
};
```

## Components

- Button
- Input (Coming Soon)
- Select (Coming Soon)
- Checkbox (Coming Soon)
- Radio (Coming Soon)
- Toggle (Coming Soon)
- Modal (Coming Soon)
- Card (Coming Soon)
- Alert (Coming Soon)
- Dropdown (Coming Soon)
- Tabs (Coming Soon)
- Accordion (Coming Soon)
- Badge (Coming Soon)
- Tooltip (Coming Soon)
- Spinner (Coming Soon)

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/mild-ui.git
cd mild-ui

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

This will start a Vite development server that automatically redirects to Storybook.

### Storybook

To run Storybook directly:

```bash
pnpm storybook
```

### Building packages

```bash
# Build all packages
pnpm build
```

For more detailed development instructions, see [SETUP.md](./SETUP.md).

### Directory Structure

```
mild-ui/
├── .storybook/                  # Storybook configuration
├── .github/                     # GitHub workflows for CI/CD
├── packages/
│   ├── core/                    # Framework-agnostic core logic and styles
│   ├── react/                   # React-specific implementationimplementationimplementation
│   └── tailwind-preset/         # Tailwind CSS preset configuration
├── examples/                    # Example implementations for each framework
└── ...
```

## License

MIT