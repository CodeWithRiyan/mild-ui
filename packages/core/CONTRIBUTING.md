# Contributing to @mild-ui/core

Thank you for your interest in contributing to Mild UI's core design system! We welcome contributions from the community.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Basic knowledge of SASS/SCSS
- Understanding of design systems and utility-first CSS

### Development Setup

1. **Clone and Install**
   ```bash
   git clone https://github.com/CodeWithRiyan/mild-ui.git
   cd mild-ui/packages/core
   pnpm install
   ```

2. **Development Commands**
   ```bash
   # Watch for changes and rebuild CSS
   pnpm run dev
   
   # Build CSS from SASS
   pnpm run build
   
   # Clean build artifacts
   pnpm run clean
   ```

## 📁 Project Structure

```
packages/core/
├── src/
│   ├── sass/               # Design tokens and base styles
│   │   ├── tokens/         # Design tokens (colors, spacing, etc.)
│   │   ├── base/           # Base styles and resets
│   │   ├── themes/         # Theme configurations
│   │   └── index.scss      # Main entry point
│   └── utilities/          # Utility class generators
│       ├── _layout.scss    # Display, position, flexbox, grid
│       ├── _spacing.scss   # Margin, padding utilities
│       ├── _colors.scss    # Text, background, border colors
│       ├── _typography.scss # Font utilities
│       ├── _borders.scss   # Border and radius utilities
│       └── _effects.scss   # Shadows, opacity, transforms
├── dist/                   # Compiled CSS output
└── README.md
```

## 🎯 Contributing Guidelines

### Design System Principles

1. **Utility-First**: All classes should be utility-focused, not component-specific
2. **Consistent Naming**: Follow the `mild-{property}-{value}` convention
3. **Design Tokens**: Use design tokens for all values (colors, spacing, typography)
4. **No Conflicts**: All classes must use `mild-` prefix to avoid Tailwind conflicts
5. **Responsive**: Consider responsive variants for layout utilities
6. **Accessibility**: Ensure utilities support accessible design patterns

### Code Style

- Use 2 spaces for indentation
- Follow existing SASS patterns and conventions
- Use design token functions: `color()`, `spacing()`, `font-size()`
- Add comments for complex utility generators
- Keep utilities organized by category

### Making Changes

#### Adding New Utilities

1. **Identify the Category**: Determine which utility file your changes belong to
2. **Use Design Tokens**: Always reference existing design tokens
3. **Follow Naming Convention**: Use `mild-{category}-{value}` pattern
4. **Test Across Themes**: Ensure utilities work in both light and dark modes

Example of adding a new utility:
```scss
// In _spacing.scss
// Gap utilities for flexbox and grid
@each $size-name, $size-value in $mild-spacing {
  .mild-gap-#{$size-name} { gap: #{$size-value}; }
  .mild-gap-x-#{$size-name} { column-gap: #{$size-value}; }
  .mild-gap-y-#{$size-name} { row-gap: #{$size-value}; }
}
```

#### Adding New Design Tokens

1. **Add to Token Files**: Update the appropriate token file in `src/sass/tokens/`
2. **Update CSS Variables**: Ensure new tokens generate CSS custom properties
3. **Document Usage**: Add examples to README if it's a major addition

Example:
```scss
// In src/sass/tokens/_spacing.scss
$mild-spacing: map-merge($mild-spacing, (
  '18': 4.5rem,  // 72px
  '20': 5rem,    // 80px
));
```

#### Testing Changes

1. **Build and Test**
   ```bash
   pnpm run build
   ```

2. **Test HTML Example**
   Create a test HTML file to verify your utilities:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <link rel="stylesheet" href="dist/mild-ui.css">
   </head>
   <body>
     <div class="mild-your-new-utility">Test content</div>
   </body>
   </html>
   ```

3. **Check File Size**: Ensure changes don't significantly increase bundle size

### Submitting Changes

#### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/add-new-utilities
   ```

2. **Make Your Changes**
   - Follow the guidelines above
   - Test your changes thoroughly
   - Update documentation if needed

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat(core): add gap utilities for flexbox and grid"
   ```

4. **Create Pull Request**
   - Provide clear description of changes
   - Include examples of new utilities
   - Reference any related issues

#### PR Requirements

- [ ] All utilities use `mild-` prefix
- [ ] Design tokens are used for all values
- [ ] Changes are tested and working
- [ ] Documentation updated if needed
- [ ] No breaking changes to existing utilities
- [ ] CSS builds without errors or warnings

## 🐛 Bug Reports

### Before Reporting

1. Check existing issues to avoid duplicates
2. Test with the latest version
3. Provide minimal reproduction case

### Bug Report Template

```markdown
**Bug Description**
Clear description of the issue

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Reproduction Steps**
1. Step one
2. Step two
3. Step three

**Environment**
- @mild-ui/core version: x.x.x
- Browser: Chrome/Firefox/Safari
- OS: Windows/macOS/Linux
```

## 💡 Feature Requests

We welcome suggestions for new utilities and improvements! Please:

1. Check existing issues for similar requests
2. Provide clear use case and examples
3. Consider if it fits the utility-first philosophy
4. Think about naming consistency

## 📝 Documentation

Documentation improvements are always welcome:

- Fix typos or unclear explanations
- Add more usage examples
- Improve installation instructions
- Update utility class references

## 🤝 Community

- Be respectful and inclusive
- Help others learn and contribute
- Share knowledge and best practices
- Follow our code of conduct

## 📞 Getting Help

- Create an issue for bugs or questions
- Check the README for usage examples
- Review existing issues and discussions

Thank you for contributing to Mild UI! 🎉