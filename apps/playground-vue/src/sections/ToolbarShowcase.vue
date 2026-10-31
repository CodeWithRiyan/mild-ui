<!-- apps/playground-vue/src/sections/ToolbarShowcase.vue -->
<!-- The button and toggle components, arranged as an editor toolbar. -->
<script setup lang="ts">
import { ref } from "vue";
import {
  Button,
  ButtonGroup,
  CloseButton,
  Container,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
} from "@mild-ui/vue";

const pages = ["1", "2", "3"];

const format = ref<string[]>(["bold"]);
const align = ref<string | null>("left");
const muted = ref(false);
const dismissed = ref(false);

function dismiss(): void {
  dismissed.value = true;
}
</script>

<template>
  <Container
    as="section"
    size="md"
    padding="0"
    aria-labelledby="toolbar-heading"
    class="playground__card"
  >
    <Stack gap="4">
      <Flex align="center" justify="space-between">
        <Heading id="toolbar-heading" :level="2" size="lg">Toolbar</Heading>
        <CloseButton v-if="!dismissed" @click="dismiss" />
      </Flex>

      <Flex align="center" gap="3" wrap role="toolbar" aria-label="Editor">
        <ToggleGroup
          v-model="format"
          type="multiple"
          attached
          variant="outline"
          size="sm"
          aria-label="Text format"
        >
          <ToggleGroupItem value="bold" aria-label="Bold"><strong>B</strong></ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic"><em>I</em></ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline"><u>U</u></ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup v-model="align" size="sm" aria-label="Alignment">
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>

        <Toggle v-model:pressed="muted" size="sm" aria-label="Mute">
          {{ muted ? "Muted" : "Sound on" }}
        </Toggle>

        <ButtonGroup attached size="sm" aria-label="Pages">
          <IconButton label="Previous page"><span aria-hidden="true">‹</span></IconButton>
          <Button v-for="page in pages" :key="page">{{ page }}</Button>
          <IconButton label="Next page"><span aria-hidden="true">›</span></IconButton>
        </ButtonGroup>

        <IconButton label="Settings" variant="ghost" round>
          <span aria-hidden="true">⚙</span>
        </IconButton>
      </Flex>

      <Text as="p" font-size="sm" color="muted">
        Format: {{ format.join(", ") || "none" }} · Align: {{ align ?? "none" }}
      </Text>
    </Stack>
  </Container>
</template>
