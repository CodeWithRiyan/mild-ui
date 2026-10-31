# @mild-ui/playground-vue

A Vite app that renders **every** `@mild-ui/vue` component on a single form page:
`ThemeProvider` + `getColorModeScript()` + `useColorMode` (dark-mode switch), `Box`, `Text`,
`Label`, `Form`/`FormField`, `Input`, `InputGroup` (addons and elements), `InputPassword`,
`Textarea`, `Select`, `Radio`, `SegmentedControl`, `Checkbox`, `Switch`, `Button`, `ButtonGroup`,
`IconButton`, `CloseButton`, `Toggle`, `ToggleGroup` (the "Toolbar" section), the feedback
components `Alert`, `Spinner`, `Progress`, `CircularProgress`, `Skeleton`, `Toast` (via
`ToastProvider` + `useToast`), the overlay and disclosure components `Dialog` (nested),
`AlertDialog`, `Tooltip`, `Tabs`, `Accordion`, `Collapsible`, the data display components
`Card`, `Badge`, `Tag`, `Avatar`/`AvatarGroup`, `Image`, `Stat`, `Table`, `DataTable` and `Map`, the
typography and navigation components `Heading`, `Link`, `Breadcrumb`, `Code`, `Kbd`,
`List`/`ListItem`, and the layout components `Container`, `Stack`, `Flex`, `Grid`/`GridItem`,
`Divider`, `AspectRatio` and `ScrollArea` (the "Typography and navigation" and "Layout" sections
above the form).

```bash
pnpm --filter @mild-ui/playground-vue dev     # or: pnpm playground:vue
pnpm --filter @mild-ui/playground-vue build   # vue-tsc --noEmit && vite build
pnpm --filter @mild-ui/playground-vue test    # jsdom smoke test + server rendering of the page
```

The app resolves `@mild-ui/vue` (and the primitives/core) from **source** via Vite aliases,
exactly like the storybook setup, so no package build is required first.

`src/App.test.ts` is a smoke test that renders the page, drives the interactive components,
toggles the color mode and submits the form. `src/App.ssr.test.ts` renders the same page with
`vue/server-renderer` and hydrates it from that HTML without a mismatch warning, the contract Nuxt
relies on. Both run in the Vue version matrix (`pnpm test:vue:matrix`), so the page is verified on
the committed Vue version and on `vue@latest`.
