<!-- apps/playground-vue/src/sections/TypographyShowcase.vue -->
<!-- The typography and navigation components. -->
<script setup lang="ts">
import { Code, Container, Heading, Kbd, Link, List, ListItem, Stack, Text } from "@mild-ui/vue";
</script>

<template>
  <Container
    as="section"
    size="md"
    padding="0"
    aria-labelledby="typography-heading"
    class="playground__card"
  >
    <Stack gap="4">
      <Heading id="typography-heading" :level="2" size="lg">Typography and navigation</Heading>

      <Heading :level="3" size="md" color="muted"
        >Every heading level keeps its own element</Heading
      >

      <Text as="p">
        Install with <Code>npm i @mild-ui/vue</Code>, then read the
        <Link href="https://codewithriyan.github.io/mild-ui/vue/" external>documentation</Link>.
        Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to search, or <Kbd size="sm">Esc</Kbd> to close.
      </Text>

      <Code as="pre" block variant="outline">import { Heading, Link } from "@mild-ui/vue";</Code>

      <List spacing="2">
        <ListItem>
          <Link href="#" underline="always">An always underlined link</Link>
        </ListItem>
        <ListItem>
          <Link href="#" disabled>A disabled link</Link>
        </ListItem>
        <ListItem> A <Link href="#" plain>plain link</Link> that inherits the text color </ListItem>
      </List>

      <List ordered marker="lower-alpha" spacing="1">
        <ListItem>Ordered, lower-alpha markers</ListItem>
        <ListItem>Second step</ListItem>
      </List>

      <List unstyled spacing="1">
        <ListItem>
          <template #icon><span aria-hidden="true">✓</span></template>
          Items can carry an icon
        </ListItem>
      </List>
    </Stack>
  </Container>
</template>
