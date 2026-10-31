"use client";

// templates/next-app-router/app/showcase.tsx
// The interactive components: anything that takes handlers or keeps state needs a Client
// Component. Server-rendered all the same, then hydrated.
import * as React from "react";
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
} from "@mild-ui/react";

export function Showcase() {
  const { isDark, toggleColorMode } = useColorMode();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [tags, setTags] = React.useState(["Design", "Research", "Ops"]);
  const [format, setFormat] = React.useState<string[]>(["bold"]);
  const [selectedInvoices, setSelectedInvoices] = React.useState<string[]>(["inv-2"]);
  const [errors, setErrors] = React.useState<{ email?: string }>({});
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "");
    const nextErrors = email.includes("@") ? {} : { email: "Enter a valid email" };
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      toast({ title: "Saved", description: "Your profile is up to date.", status: "success" });
    }
  };

  return (
    <Stack gap="6">
      <Flex align="center" justify="space-between" gap="3" wrap>
        <Heading level={2} size="lg">
          Interactive
        </Heading>
        <Flex align="center" gap="2">
          <Switch checked={isDark} onCheckedChange={toggleColorMode} aria-label="Dark mode" />
          <Tooltip label="Opens a modal dialog">
            <Button size="sm" onClick={() => setDialogOpen(true)}>
              Open dialog
            </Button>
          </Tooltip>
          <Button size="sm" variant="destructive" onClick={() => setAlertOpen(true)}>
            Delete
          </Button>
        </Flex>
      </Flex>

      <Alert status="info" title="Hydration check" dismissible onDismiss={() => undefined}>
        Open the browser console: there must be no hydration warning on this page.
      </Alert>

      <Form onSubmit={handleSubmit} noValidate>
        <Stack gap="4">
          <FormField name="email" label="Email" required error={errors.email}>
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
            <Textarea autoResize placeholder="A few lines about yourself" />
          </FormField>
          <FormField name="plan" label="Plan">
            <Select
              options={[
                { value: "free", label: "Free" },
                { value: "pro", label: "Pro" },
              ]}
              defaultValue="free"
            />
          </FormField>
          <FormField name="billing" label="Billing">
            <Radio
              items={[
                { value: "monthly", label: "Monthly" },
                { value: "yearly", label: "Yearly" },
              ]}
              defaultValue="monthly"
            />
          </FormField>
          <FormField name="contact" label="Preferred contact">
            <SegmentedControl
              items={[
                { value: "email", label: "Email" },
                { value: "phone", label: "Phone" },
              ]}
              defaultValue="email"
            />
          </FormField>
          <FormField name="terms" label="I accept the terms">
            <Checkbox value="yes" />
          </FormField>
          <Flex gap="2" wrap>
            <ButtonGroup attached aria-label="Form actions">
              <Button type="submit">Save</Button>
              <Button type="reset" variant="outline">
                Reset
              </Button>
            </ButtonGroup>
            <ToggleGroup
              type="multiple"
              value={format}
              onValueChange={setFormat}
              attached
              size="sm"
              variant="outline"
              aria-label="Text format"
            >
              <ToggleGroupItem value="bold" aria-label="Bold">
                <strong>B</strong>
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Italic">
                <em>I</em>
              </ToggleGroupItem>
            </ToggleGroup>
            <Toggle size="sm" aria-label="Mute">
              Mute
            </Toggle>
            <IconButton label="Settings" icon={<span aria-hidden="true">⚙</span>} variant="ghost" />
          </Flex>
        </Stack>
      </Form>

      <Flex gap="2" wrap>
        {tags.map((tag) => (
          <Tag key={tag} onClose={() => setTags((current) => current.filter((t) => t !== tag))}>
            {tag}
          </Tag>
        ))}
      </Flex>

      <Tabs defaultValue="overview" variant="underline">
        <TabsList aria-label="Account">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview of the account.</TabsContent>
        <TabsContent value="billing">Billing details and invoices.</TabsContent>
      </Tabs>

      <Accordion defaultValue="shipping">
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
        caption="Invoices (sortable, selectable)"
        columns={[
          { key: "customer", header: "Customer", sortable: true },
          { key: "status", header: "Status" },
          { key: "amount", header: "Amount", numeric: true, sortable: true },
        ]}
        rows={[
          { id: "inv-1", customer: "Ada Lovelace", status: "Paid", amount: 250 },
          { id: "inv-2", customer: "Grace Hopper", status: "Pending", amount: 125 },
          { id: "inv-3", customer: "Alan Turing", status: "Paid", amount: 400 },
        ]}
        defaultSort={{ key: "amount", direction: "descending" }}
        selectable
        selectedKeys={selectedInvoices}
        onSelectionChange={setSelectedInvoices}
        size="sm"
      />

      <Collapsible>
        <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
        <CollapsibleContent>
          <ScrollArea maxHeight="32" role="region" aria-label="Log">
            <pre>{JSON.stringify({ tags, format, selectedInvoices }, null, 2)}</pre>
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setDialogOpen(false)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen} leastDestructiveRef={cancelRef}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete account?</AlertDialogTitle>
          <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          <AlertDialogFooter>
            <Button ref={cancelRef} variant="outline" onClick={() => setAlertOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setAlertOpen(false)}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Stack>
  );
}
