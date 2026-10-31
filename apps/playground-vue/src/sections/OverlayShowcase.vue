<!-- apps/playground-vue/src/sections/OverlayShowcase.vue -->
<!-- The overlay and disclosure components: dialogs, tooltip, tabs, accordion, collapsible. -->
<script setup lang="ts">
import { ref, type ComponentPublicInstance } from "vue";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Container,
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Flex,
  Heading,
  Input,
  Stack,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  Tooltip,
} from "@mild-ui/vue";

const dialogOpen = ref(false);
const nestedOpen = ref(false);
const alertOpen = ref(false);
const cancelButton = ref<ComponentPublicInstance | null>(null);

const cancelElement = () => cancelButton.value?.$el as HTMLElement | undefined;

function openDialog(): void {
  dialogOpen.value = true;
}
function closeDialog(): void {
  dialogOpen.value = false;
}
function openNested(): void {
  nestedOpen.value = true;
}
function closeNested(): void {
  nestedOpen.value = false;
}
function openAlert(): void {
  alertOpen.value = true;
}
function closeAlert(): void {
  alertOpen.value = false;
}
</script>

<template>
  <Container
    as="section"
    size="md"
    padding="0"
    aria-labelledby="overlay-heading"
    class="playground__card"
  >
    <Stack gap="4">
      <Heading id="overlay-heading" :level="2" size="lg">Overlay and disclosure</Heading>

      <Flex gap="2" wrap>
        <Tooltip label="Opens a modal dialog">
          <Button size="sm" @click="openDialog">Open dialog</Button>
        </Tooltip>
        <Tooltip label="Asks before deleting" placement="bottom">
          <Button size="sm" variant="destructive" @click="openAlert">Delete account</Button>
        </Tooltip>
      </Flex>

      <Dialog v-model:open="dialogOpen">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogCloseButton />
          </DialogHeader>
          <DialogBody>
            <DialogDescription>Changes are saved when you press Save.</DialogDescription>
            <Stack gap="3">
              <Input aria-label="Display name" placeholder="Display name" />
              <Button size="sm" variant="outline" @click="openNested">Open nested dialog</Button>
            </Stack>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" @click="closeDialog">Cancel</Button>
            <Button @click="closeDialog">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog v-model:open="nestedOpen" size="sm">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nested dialog</DialogTitle>
            <DialogCloseButton />
          </DialogHeader>
          <DialogBody>
            <DialogDescription>Escape closes this one first.</DialogDescription>
          </DialogBody>
          <DialogFooter>
            <Button @click="closeNested">Got it</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog v-model:open="alertOpen" :least-destructive="cancelElement">
        <AlertDialogContent>
          <AlertDialogTitle>Delete account?</AlertDialogTitle>
          <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          <AlertDialogFooter>
            <Button ref="cancelButton" variant="outline" @click="closeAlert">Cancel</Button>
            <Button variant="destructive" @click="closeAlert">Delete</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Tabs default-value="overview" variant="underline">
        <TabsList aria-label="Account">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="danger" disabled>Danger zone</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview of the account.</TabsContent>
        <TabsContent value="billing">Billing details and invoices.</TabsContent>
        <TabsContent value="danger">Irreversible actions.</TabsContent>
      </Tabs>

      <Accordion default-value="shipping">
        <AccordionItem value="shipping">
          <AccordionTrigger>Shipping</AccordionTrigger>
          <AccordionContent>Orders ship within two business days.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="returns">
          <AccordionTrigger>Returns</AccordionTrigger>
          <AccordionContent>Free returns within 30 days.</AccordionContent>
        </AccordionItem>
      </Accordion>

      <Collapsible>
        <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
        <CollapsibleContent>
          <Text as="p" font-size="sm" color="muted">Nothing to tune yet.</Text>
        </CollapsibleContent>
      </Collapsible>
    </Stack>
  </Container>
</template>
