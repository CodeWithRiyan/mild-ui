# @mild-ui/playground-react

A Vite app that renders **every** `@mild-ui/react` component on a single form page:
`ThemeProvider` + `ColorModeScript` + `useColorMode` (dark-mode switch), `Box`, `Text`, `Label`,
`Form`/`Field`, `Input`, `InputGroup` (addons and elements), `InputPassword`, `Textarea`,
`Select`, `Radio`, `SegmentedControl`, `Checkbox`, `Switch`, `Button`, `ButtonGroup`,
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
pnpm --filter @mild-ui/playground-react dev     # or: pnpm playground:react
pnpm --filter @mild-ui/playground-react build   # tsc --noEmit && vite build
pnpm --filter @mild-ui/playground-react test    # jsdom smoke test of the page
```

The app resolves `@mild-ui/react` (and the primitives/core) from **source** via Vite
aliases, exactly like the storybook setup, so no package build is required first.

`src/App.test.tsx` is a smoke test that renders the page, toggles the color mode and
submits the form. It runs in the React version matrix (`pnpm test:react:matrix`), so the
page is verified on React 18 and React 19.
