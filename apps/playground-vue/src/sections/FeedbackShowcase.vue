<!-- apps/playground-vue/src/sections/FeedbackShowcase.vue -->
<!-- The feedback components: alerts, progress, loading placeholders and toasts. -->
<script setup lang="ts">
import { ref } from "vue";
import {
  Alert,
  AspectRatio,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Flex,
  Heading,
  Progress,
  Skeleton,
  SkeletonText,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@mild-ui/vue";

const { toast } = useToast();
const progress = ref(40);
const loaded = ref(false);
const alertVisible = ref(true);

function hideAlert(): void {
  alertVisible.value = false;
}
function decrease(): void {
  progress.value = Math.max(0, progress.value - 10);
}
function increase(): void {
  progress.value = Math.min(100, progress.value + 10);
}
function toggleLoaded(): void {
  loaded.value = !loaded.value;
}
function showToast(): void {
  toast({ title: "Saved", description: "Your changes are safe.", status: "success" });
}
function showStickyToast(): void {
  toast({
    title: "Connection lost",
    description: "Retrying in 5 seconds.",
    status: "error",
    duration: null,
  });
}
</script>

<template>
  <Container
    as="section"
    size="md"
    padding="0"
    aria-labelledby="feedback-heading"
    class="playground__card"
  >
    <Stack gap="4">
      <Heading id="feedback-heading" :level="2" size="lg">Feedback</Heading>

      <Alert
        v-if="alertVisible"
        status="warning"
        variant="left-accent"
        title="Unsaved changes"
        dismissible
        @dismiss="hideAlert"
      >
        Your draft is kept locally until you create the account.
      </Alert>
      <Alert status="success" title="Account verified" />

      <Flex align="center" gap="4" wrap>
        <Spinner label="Loading profile" />
        <CircularProgress :value="progress" label="Storage used" show-value />
        <CircularProgress label="Syncing" size="sm" />
        <Box :style="{ flex: 1, minWidth: '12rem' }">
          <Progress :value="progress" label="Upload" show-value striped animated />
        </Box>
        <ButtonGroup size="sm" variant="outline" aria-label="Progress">
          <Button @click="decrease">-10</Button>
          <Button @click="increase">+10</Button>
        </ButtonGroup>
      </Flex>

      <Flex align="center" gap="3">
        <Skeleton variant="circle" :loaded="loaded">
          <AspectRatio :ratio="1" :style="{ width: '2.5rem' }">
            <Flex align="center" justify="center" class="playground__cell">AL</Flex>
          </AspectRatio>
        </Skeleton>
        <Box :style="{ flex: 1 }">
          <SkeletonText :lines="2" :loaded="loaded">
            <Text as="p">Ada Lovelace · Analyst</Text>
          </SkeletonText>
        </Box>
        <Button size="sm" variant="ghost" @click="toggleLoaded">
          {{ loaded ? "Show skeleton" : "Finish loading" }}
        </Button>
      </Flex>

      <Flex gap="2" wrap>
        <Button size="sm" @click="showToast">Show toast</Button>
        <Button size="sm" variant="outline" @click="showStickyToast"
          >Show sticky error toast</Button
        >
      </Flex>
    </Stack>
  </Container>
</template>
