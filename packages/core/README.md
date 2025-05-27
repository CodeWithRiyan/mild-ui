# @mild-ui/core

Framework-agnostic core for mild-ui component library that works across React, Vue, and Svelte.

## Overview

@mild-ui/core provides the shared logic, types, and styling definitions that are used by the framework-specific implementations of mild-ui. This package is not intended to be used directly by end users, but rather serves as a foundation for the framework-specific packages.

## Features

- Framework-agnostic component definitions
- Shared TypeScript interfaces and types
- Utility functions for common component logic
- CSS variable definitions and styling foundations

## Installation

This package is automatically installed as a dependency of the framework-specific packages:

```bash
# You don't need to install this directly
npm install @mild-ui/core
```

## Usage

If you're developing components for the mild-ui library, you can import types and utilities from this package:

```typescript
import { ButtonVariant, ButtonSize, getButtonAttributes } from "@mild-ui/core";
```

## Documentation

For complete documentation, visit our [Storybook site](https://codewithriyan.github.io/mild-ui/).

## License

MIT
