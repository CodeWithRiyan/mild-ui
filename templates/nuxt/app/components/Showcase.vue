<!-- templates/nuxt/app/components/Showcase.vue -->
<!-- The interactive components: anything that takes handlers or keeps state. Server-rendered all
     the same, then hydrated; Nuxt auto-imports this component into app.vue. -->
<script setup lang="ts">
import { ref, type ComponentPublicInstance } from "vue";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  Button,
  ButtonGroup,
  Checkbox,
  CloseButton,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DataTable,
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Flex,
  Form,
  FormField,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputPassword,
  InputRightElement,
  Radio,
  ScrollArea,
  SegmentedControl,
  Select,
  Stack,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
  Textarea,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  useColorMode,
  useToast,
} from "@mild-ui/vue";

const { isDark, toggleColorMode } = useColorMode();
const { toast } = useToast();

const dialogOpen = ref(false);
const alertOpen = ref(false);
const tags = ref(["Design", "Research", "Ops"]);
const format = ref<string[]>(["bold"]);
const selectedInvoices = ref<string[]>(["inv-2"]);
const errors = ref<{ email?: string }>({});
const cancelButton = ref<ComponentPublicInstance | null>(null);
const cancelElement = () => cancelButton.value?.$el as HTMLElement | undefined;

const plans = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
];
const billingCycles = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];
const contactChannels = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
];
const invoiceColumns = [
  { key: "customer", header: "Customer", sortable: true },
  { key: "status", header: "Status" },
  { key: "amount", header: "Amount", numeric: true, sortable: true },
];
const invoices = [
  { id: "inv-1", customer: "Ada Lovelace", status: "Paid", amount: 250 },
  { id: "inv-2", customer: "Grace Hopper", status: "Pending", amount: 125 },
  { id: "inv-3", customer: "Alan Turing", status: "Paid", amount: 400 },
];

function handleSubmit(event: Event): void {
  const email = String(new FormData(event.currentTarget as HTMLFormElement).get("email") ?? "");
  errors.value = email.includes("@") ? {} : { email: "Enter a valid email" };
  if (!errors.value.email) {
    toast({ title: "Saved", description: "Your profile is up to date.", status: "success" });
  }
}

function removeTag(tag: string): void {
  tags.value = tags.value.filter((entry) => entry !== tag);
}
</script>

<template>
  <Stack gap="6">
    <Flex align="center" justify="space-between" gap="3" wrap>
      <Heading :level="2" size="lg">Interactive</Heading>
      <Flex align="center" gap="2">
        <Switch :model-value="isDark" aria-label="Dark mode" @change="toggleColorMode" />
        <Tooltip label="Opens a modal dialog">
          <Button size="sm" @click="dialogOpen = true">Open dialog</Button>
        </Tooltip>
        <Button size="sm" variant="destructive" @click="alertOpen = true">Delete</Button>
      </Flex>
    </Flex>

    <Alert status="info" title="Hydration check" dismissible>
      Open the browser console: there must be no hydration warning on this page.
    </Alert>

    <Form novalidate @submit.prevent="handleSubmit">
      <Stack gap="4">
        <FormField name="email" label="Email" required :error="errors.email">
          <InputGroup>
            <InputLeftAddon>@</InputLeftAddon>
            <Input type="email" placeholder="ada@example.com" />
            <InputRightElement interactive>
              <CloseButton size="xs" label="Clear" />
            </InputRightElement>
          </InputGroup>
        </FormField>
        <FormField name="password" label="Password">
          <InputPassword placeholder="••••••••" />
        </FormField>
        <FormField name="bio" label="Bio">
          <Textarea auto-resize placeholder="A few lines about yourself" />
        </FormField>
        <FormField name="plan" label="Plan">
          <Select :options="plans" default-value="free" />
        </FormField>
        <FormField name="billing" label="Billing">
          <Radio :items="billingCycles" default-value="monthly" />
        </FormField>
        <FormField name="contact" label="Preferred contact">
          <SegmentedControl :items="contactChannels" default-value="email" />
        </FormField>
        <FormField name="terms" label="I accept the terms">
          <Checkbox value="yes" />
        </FormField>
        <Flex gap="2" wrap>
          <ButtonGroup attached aria-label="Form actions">
            <Button type="submit">Save</Button>
            <Button type="reset" variant="outline">Reset</Button>
          </ButtonGroup>
          <ToggleGroup
            v-model="format"
            type="multiple"
            attached
            size="sm"
            variant="outline"
            aria-label="Text format"
          >
            <ToggleGroupItem value="bold" aria-label="Bold"><strong>B</strong></ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic"><em>I</em></ToggleGroupItem>
          </ToggleGroup>
          <Toggle size="sm" aria-label="Mute">Mute</Toggle>
          <IconButton label="Settings" variant="ghost"
            ><span aria-hidden="true">⚙</span></IconButton
          >
        </Flex>
      </Stack>
    </Form>

    <Flex gap="2" wrap>
      <Tag v-for="tag in tags" :key="tag" closable @close="removeTag(tag)">{{ tag }}</Tag>
    </Flex>

    <Tabs default-value="overview" variant="underline">
      <TabsList aria-label="Account">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview of the account.</TabsContent>
      <TabsContent value="billing">Billing details and invoices.</TabsContent>
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

    <DataTable
      v-model:selected-keys="selectedInvoices"
      caption="Invoices (sortable, selectable)"
      :columns="invoiceColumns"
      :rows="invoices"
      :default-sort="{ key: 'amount', direction: 'descending' }"
      selectable
      size="sm"
    />

    <Collapsible>
      <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
      <CollapsibleContent>
        <ScrollArea max-height="32" role="region" aria-label="Log">
          <pre>{{ JSON.stringify({ tags, format, selectedInvoices }, null, 2) }}</pre>
        </ScrollArea>
      </CollapsibleContent>
    </Collapsible>

    <Dialog v-model:open="dialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogCloseButton />
        </DialogHeader>
        <DialogBody>
          <DialogDescription>Changes are saved when you press Save.</DialogDescription>
          <Input aria-label="Display name" placeholder="Display name" />
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" @click="dialogOpen = false">Cancel</Button>
          <Button @click="dialogOpen = false">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <AlertDialog v-model:open="alertOpen" :least-destructive="cancelElement">
      <AlertDialogContent>
        <AlertDialogTitle>Delete account?</AlertDialogTitle>
        <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
        <AlertDialogFooter>
          <Button ref="cancelButton" variant="outline" @click="alertOpen = false">Cancel</Button>
          <Button variant="destructive" @click="alertOpen = false">Delete</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </Stack>
</template>
