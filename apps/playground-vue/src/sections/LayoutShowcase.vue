<!-- apps/playground-vue/src/sections/LayoutShowcase.vue -->
<!-- The layout components, composed the way a page would use them. -->
<script setup lang="ts">
import {
  AspectRatio,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  ScrollArea,
  Stack,
  Text,
} from "@mild-ui/vue";

const changelog = [
  "Layout primitives: Stack, Flex, Grid, Container, Divider, AspectRatio, ScrollArea",
  "Form: FormField links label, description and error automatically",
  "Theme: ThemeProvider owns the color mode; the color mode script prevents flashes",
  "Button: loading sets aria-busy and blocks clicks",
  "Box / Text: polymorphic `as`, token-only style props",
  "Label: clicking focuses custom controls",
  "InputPassword: the toggle keeps focus on the input",
  "Core: dimension tokens moved to --mild-dimension-*",
];
</script>

<template>
  <Container as="section" size="md" padding="0" aria-label="Layout" class="playground__card">
    <Stack gap="4">
      <Heading :level="2" size="lg">Layout</Heading>

      <Flex align="center" justify="space-between" gap="2" wrap>
        <Text font-weight="medium">Flex: space-between row</Text>
        <Flex gap="2" align="center">
          <Text font-size="sm" color="muted">React</Text>
          <Divider orientation="vertical" />
          <Text font-size="sm" color="muted">Vue</Text>
        </Flex>
      </Flex>

      <Divider label="Grid" />

      <Grid :columns="{ base: 1, sm: 2, lg: 4 }" gap="3">
        <GridItem :col-span="{ base: 1, sm: 2, lg: 4 }" class="playground__cell">
          Full-width item (colSpan follows the columns)
        </GridItem>
        <AspectRatio :ratio="16 / 9" class="playground__cell">
          <Flex align="center" justify="center">16 / 9</Flex>
        </AspectRatio>
        <AspectRatio :ratio="1" class="playground__cell">
          <Flex align="center" justify="center">1 / 1</Flex>
        </AspectRatio>
        <GridItem :col-span="{ base: 1, sm: 2 }" class="playground__cell">
          Two columns from `sm`
        </GridItem>
      </Grid>

      <Divider label="ScrollArea" label-position="start" variant="dashed" />

      <ScrollArea
        as="ul"
        max-height="32"
        role="region"
        aria-label="Changelog"
        class="playground__scroll"
      >
        <li v-for="entry in changelog" :key="entry">{{ entry }}</li>
      </ScrollArea>
    </Stack>
  </Container>
</template>
