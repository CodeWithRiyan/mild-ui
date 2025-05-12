# @mild-ui/cli

Command-line interface for the mild-ui component library.

## Overview

@mild-ui/cli provides a command-line tool to add mild-ui components to your project. It supports React, Vue, and Svelte, making it easy to use mild-ui components regardless of your frontend framework choice.

## Installation

Install the CLI globally:

```bash
npm install -g @mild-ui/cli
```

## Usage

### Initialize mild-ui in your project

```bash
mild-ui init
```

This command will:
- Detect your project's framework (React, Vue, or Svelte)
- Ask you where to store your components
- Ask you where to store your styles
- Set up the necessary files and styles

### Add components to your project

```bash
# Add a button component for React (default)
mild-ui add button

# Add a button component for Vue
mild-ui add button --framework=vue

# Add a button component for Svelte
mild-ui add button --framework=svelte

# Specify a custom components directory
mild-ui add button --directory=src/ui/components

# Specify a custom styles directory
mild-ui add button --stylesDir=src/assets/styles
```

### List available components

```bash
mild-ui list
```

## Command Options

- `add <component>`: Add a component to your project
  - `--framework=<framework>`: Specify the target framework (react, vue, svelte)
  - `--directory=<dir>`: Specify the output directory for components
  - `--stylesDir=<dir>`: Specify the directory for styles
  - `--theme=<theme>`: Specify a theme to use
  - `--typescript`: Generate TypeScript files (default: true)

- `init`: Initialize mild-ui in your project
- `list`: List available components
- `help`: Display help information

## Configuration

When you initialize mild-ui, a `mild-ui.json` configuration file is created in your project root. This file stores your preferences:

```json
{
  "framework": "react",
  "typescript": true,
  "componentsDir": "src/components",
  "stylesDir": "src/styles",
  "theme": "default"
}
```

You can edit this file manually to change your configuration.

## Available Components

- Button

More components will be added in future releases.

## Documentation

For complete documentation, visit our [Storybook site](https://codewithriyan.github.io/mild-ui/).

## License

MIT