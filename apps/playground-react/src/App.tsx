// apps/playground-react/src/App.tsx
// One page that exercises every public component of @mild-ui/react, with no form library:
// the form is native (FormData) and validation state is plain React state.
import React from "react";
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
  AspectRatio,
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Breadcrumb,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  CircularProgress,
  CloseButton,
  Code,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Container,
  DataTable,
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Divider,
  Flex,
  Form,
  FormField,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputPassword,
  InputRightElement,
  Kbd,
  Label,
  Link,
  List,
  ListItem,
  Map,
  Progress,
  Radio,
  ScrollArea,
  SegmentedControl,
  Select,
  Skeleton,
  SkeletonText,
  Spinner,
  Stack,
  Stat,
  StatGroup,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  Tag,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  Textarea,
  ToastProvider,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  useColorMode,
  useToast,
} from "@mild-ui/react";

type SignUpValues = {
  fullName: string;
  email: string;
  website: string;
  bio: string;
  password: string;
  plan: string;
  billing: string;
  contact: string;
  newsletter: boolean;
  terms: boolean;
};

type Errors = Partial<Record<keyof SignUpValues, string>>;

const plans = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "enterprise", label: "Enterprise" },
];

const billingCycles = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

function validate(values: SignUpValues): Errors {
  const errors: Errors = {};
  if (!values.fullName.trim()) errors.fullName = "Enter your name";
  if (!values.email.includes("@")) errors.email = "Enter a valid email";
  if (values.password.length < 8) errors.password = "Use at least 8 characters";
  if (!values.terms) errors.terms = "You must accept the terms";
  return errors;
}

const changelog = [
  "Layout primitives: Stack, Flex, Grid, Container, Divider, AspectRatio, ScrollArea",
  "Form: FormField links label, description and error automatically",
  "Theme: ThemeProvider owns the color mode; ColorModeScript prevents flashes",
  "Button: loading sets aria-busy and blocks clicks",
  "Box / Text: polymorphic `as`, token-only style props",
  "Label: clicking focuses custom controls",
  "InputPassword: the toggle keeps focus on the input",
  "Core: dimension tokens moved to --mild-dimension-*",
];

const toolbarPages = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
];

/** The button and toggle components, arranged as an editor toolbar. */
function ToolbarShowcase(): React.ReactElement {
  const [format, setFormat] = React.useState<string[]>(["bold"]);
  const [align, setAlign] = React.useState<string | null>("left");
  const [muted, setMuted] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);

  return (
    <Container
      as="section"
      size="md"
      padding="0"
      aria-labelledby="toolbar-heading"
      className="playground__card"
    >
      <Stack gap="4">
        <Flex align="center" justify="space-between">
          <Heading id="toolbar-heading" level={2} size="lg">
            Toolbar
          </Heading>
          {!dismissed && <CloseButton onClick={() => setDismissed(true)} />}
        </Flex>

        <Flex align="center" gap="3" wrap role="toolbar" aria-label="Editor">
          <ToggleGroup
            type="multiple"
            value={format}
            onValueChange={setFormat}
            attached
            variant="outline"
            size="sm"
            aria-label="Text format"
          >
            <ToggleGroupItem value="bold" aria-label="Bold">
              <strong>B</strong>
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <em>I</em>
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <u>U</u>
            </ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup value={align} onValueChange={setAlign} size="sm" aria-label="Alignment">
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
          </ToggleGroup>

          <Toggle pressed={muted} onPressedChange={setMuted} size="sm" aria-label="Mute">
            {muted ? "Muted" : "Sound on"}
          </Toggle>

          <ButtonGroup attached size="sm" aria-label="Pages">
            <IconButton label="Previous page" icon={<span aria-hidden="true">‹</span>} />
            {toolbarPages.map((page) => (
              <Button key={page.value}>{page.label}</Button>
            ))}
            <IconButton label="Next page" icon={<span aria-hidden="true">›</span>} />
          </ButtonGroup>

          <IconButton
            label="Settings"
            icon={<span aria-hidden="true">⚙</span>}
            variant="ghost"
            round
          />
        </Flex>

        <Text as="p" fontSize="sm" color="muted">
          Format: {format.join(", ") || "none"} · Align: {align ?? "none"}
        </Text>
      </Stack>
    </Container>
  );
}

const team = [
  { name: "Ada Lovelace", src: "https://i.pravatar.cc/80?u=ada" },
  { name: "Grace Hopper", src: "" },
  { name: "Alan Turing", src: "" },
  { name: "Edsger Dijkstra", src: "" },
  { name: "Barbara Liskov", src: "" },
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

/** The data display components: cards, badges, tags, avatars, images, stats, tables and a map. */
function DataDisplayShowcase(): React.ReactElement {
  const [tags, setTags] = React.useState(["Design", "Research", "Ops"]);
  const [selectedInvoices, setSelectedInvoices] = React.useState<string[]>(["inv-2"]);

  return (
    <Container
      as="section"
      size="md"
      padding="0"
      aria-labelledby="data-heading"
      className="playground__card"
    >
      <Stack gap="4">
        <Heading id="data-heading" level={2} size="lg">
          Data display
        </Heading>

        <Grid columns={{ base: 1, sm: 2 }} gap="4">
          <Card as="article" variant="outlined" aria-label="Project card">
            <Image
              src="https://picsum.photos/seed/mild/640/360"
              alt="Mountain landscape"
              ratio="16/9"
              radius="none"
              fallback="Image unavailable"
            />
            <CardHeader>
              <Flex align="center" justify="space-between" gap="2">
                <CardTitle>mild-ui</CardTitle>
                <Badge colorScheme="success" dot>
                  Active
                </Badge>
              </Flex>
              <CardDescription>Framework-agnostic design system.</CardDescription>
            </CardHeader>
            <CardBody>
              <Flex gap="2" wrap>
                {tags.map((tag) => (
                  <Tag
                    key={tag}
                    onClose={() => setTags((current) => current.filter((t) => t !== tag))}
                  >
                    {tag}
                  </Tag>
                ))}
                {tags.length === 0 && (
                  <Text fontSize="sm" color="muted">
                    No tags
                  </Text>
                )}
              </Flex>
            </CardBody>
            <CardFooter align="between">
              <AvatarGroup max={3} size="sm" aria-label="Contributors">
                {team.map((member) => (
                  <Avatar key={member.name} name={member.name} src={member.src || undefined} />
                ))}
              </AvatarGroup>
              <Button size="sm" variant="ghost">
                Open
              </Button>
            </CardFooter>
          </Card>

          <Card variant="filled">
            <CardBody>
              <StatGroup aria-label="Key figures">
                <Stat
                  label="Stars"
                  value="1,204"
                  trend="increase"
                  trendValue="12%"
                  helpText="this month"
                />
                <Stat
                  label="Open issues"
                  value="37"
                  trend="decrease"
                  trendValue="4"
                  helpText="this week"
                />
              </StatGroup>
            </CardBody>
            <CardFooter noBorder>
              <Flex align="center" gap="3" wrap>
                <Avatar name="Ada Lovelace" status="online" bordered />
                <Badge variant="solid" colorScheme="primary" pill>
                  Maintainer
                </Badge>
                <Badge variant="outline" colorScheme="warning">
                  Beta
                </Badge>
              </Flex>
            </CardFooter>
          </Card>
        </Grid>

        <Table variant="outline" size="sm" aria-label="Team">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {team.slice(0, 2).map((member) => (
              <TableRow key={member.name}>
                <TableCell>{member.name}</TableCell>
                <TableCell>Maintainer</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <DataTable
          caption="Invoices"
          columns={invoiceColumns}
          rows={invoices}
          defaultSort={{ key: "amount", direction: "descending" }}
          selectable
          selectedKeys={selectedInvoices}
          onSelectionChange={setSelectedInvoices}
          variant="striped"
          size="sm"
        />
        <Text as="p" fontSize="sm" color="muted">
          Selected invoices: {selectedInvoices.join(", ") || "none"}
        </Text>

        <Map
          latitude={48.8566}
          longitude={2.3522}
          title="Office in Paris"
          caption="Paris, France"
        />
      </Stack>
    </Container>
  );
}

/** The feedback components: alerts, progress, loading placeholders and toasts. */
function FeedbackShowcase(): React.ReactElement {
  const { toast } = useToast();
  const [progress, setProgress] = React.useState(40);
  const [loaded, setLoaded] = React.useState(false);
  const [alertVisible, setAlertVisible] = React.useState(true);

  return (
    <Container
      as="section"
      size="md"
      padding="0"
      aria-labelledby="feedback-heading"
      className="playground__card"
    >
      <Stack gap="4">
        <Heading id="feedback-heading" level={2} size="lg">
          Feedback
        </Heading>

        {alertVisible && (
          <Alert
            status="warning"
            variant="left-accent"
            title="Unsaved changes"
            dismissible
            onDismiss={() => setAlertVisible(false)}
          >
            Your draft is kept locally until you create the account.
          </Alert>
        )}
        <Alert status="success" title="Account verified" />

        <Flex align="center" gap="4" wrap>
          <Spinner label="Loading profile" />
          <CircularProgress value={progress} label="Storage used" showValue />
          <CircularProgress label="Syncing" size="sm" />
          <Box style={{ flex: 1, minWidth: "12rem" }}>
            <Progress value={progress} label="Upload" showValue striped animated />
          </Box>
          <ButtonGroup size="sm" variant="outline" aria-label="Progress">
            <Button onClick={() => setProgress((value) => Math.max(0, value - 10))}>-10</Button>
            <Button onClick={() => setProgress((value) => Math.min(100, value + 10))}>+10</Button>
          </ButtonGroup>
        </Flex>

        <Flex align="center" gap="3">
          <Skeleton variant="circle" loaded={loaded}>
            <AspectRatio ratio={1} style={{ width: "2.5rem" }}>
              <Flex align="center" justify="center" className="playground__cell">
                AL
              </Flex>
            </AspectRatio>
          </Skeleton>
          <Box style={{ flex: 1 }}>
            <SkeletonText lines={2} loaded={loaded}>
              <Text as="p">Ada Lovelace · Analyst</Text>
            </SkeletonText>
          </Box>
          <Button size="sm" variant="ghost" onClick={() => setLoaded((value) => !value)}>
            {loaded ? "Show skeleton" : "Finish loading"}
          </Button>
        </Flex>

        <Flex gap="2" wrap>
          <Button
            size="sm"
            onClick={() =>
              toast({ title: "Saved", description: "Your changes are safe.", status: "success" })
            }
          >
            Show toast
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              toast({
                title: "Connection lost",
                description: "Retrying in 5 seconds.",
                status: "error",
                duration: null,
              })
            }
          >
            Show sticky error toast
          </Button>
        </Flex>
      </Stack>
    </Container>
  );
}

/** The overlay and disclosure components: dialogs, tooltip, tabs, accordion, collapsible. */
function OverlayShowcase(): React.ReactElement {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [nestedOpen, setNestedOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Container
      as="section"
      size="md"
      padding="0"
      aria-labelledby="overlay-heading"
      className="playground__card"
    >
      <Stack gap="4">
        <Heading id="overlay-heading" level={2} size="lg">
          Overlay and disclosure
        </Heading>

        <Flex gap="2" wrap>
          <Tooltip label="Opens a modal dialog">
            <Button size="sm" onClick={() => setDialogOpen(true)}>
              Open dialog
            </Button>
          </Tooltip>
          <Tooltip label="Asks before deleting" placement="bottom">
            <Button size="sm" variant="destructive" onClick={() => setAlertOpen(true)}>
              Delete account
            </Button>
          </Tooltip>
        </Flex>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogCloseButton />
            </DialogHeader>
            <DialogBody>
              <DialogDescription>Changes are saved when you press Save.</DialogDescription>
              <Stack gap="3">
                <Input aria-label="Display name" placeholder="Display name" />
                <Button size="sm" variant="outline" onClick={() => setNestedOpen(true)}>
                  Open nested dialog
                </Button>
              </Stack>
            </DialogBody>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setDialogOpen(false)}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={nestedOpen} onOpenChange={setNestedOpen} size="sm">
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nested dialog</DialogTitle>
              <DialogCloseButton />
            </DialogHeader>
            <DialogBody>
              <DialogDescription>Escape closes this one first.</DialogDescription>
            </DialogBody>
            <DialogFooter>
              <Button onClick={() => setNestedOpen(false)}>Got it</Button>
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

        <Tabs defaultValue="overview" variant="underline">
          <TabsList aria-label="Account">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="danger" disabled>
              Danger zone
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">Overview of the account.</TabsContent>
          <TabsContent value="billing">Billing details and invoices.</TabsContent>
          <TabsContent value="danger">Irreversible actions.</TabsContent>
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

        <Collapsible>
          <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
          <CollapsibleContent>
            <Text as="p" fontSize="sm" color="muted">
              Nothing to tune yet.
            </Text>
          </CollapsibleContent>
        </Collapsible>
      </Stack>
    </Container>
  );
}

/** The typography and navigation components. */
function TypographyShowcase(): React.ReactElement {
  return (
    <Container
      as="section"
      size="md"
      padding="0"
      aria-labelledby="typography-heading"
      className="playground__card"
    >
      <Stack gap="4">
        <Heading id="typography-heading" level={2} size="lg">
          Typography and navigation
        </Heading>

        <Heading level={3} size="md" color="muted">
          Every heading level keeps its own element
        </Heading>

        <Text as="p">
          Install with <Code>npm i @mild-ui/react</Code>, then read the{" "}
          <Link href="https://codewithriyan.github.io/mild-ui/react/" external>
            documentation
          </Link>
          . Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to search, or <Kbd size="sm">Esc</Kbd> to close.
        </Text>

        <Code as="pre" block variant="outline">
          {'import { Heading, Link } from "@mild-ui/react";'}
        </Code>

        <List spacing="2">
          <ListItem>
            <Link href="#" underline="always">
              An always underlined link
            </Link>
          </ListItem>
          <ListItem>
            <Link href="#" disabled>
              A disabled link
            </Link>
          </ListItem>
          <ListItem>
            A{" "}
            <Link href="#" plain>
              plain link
            </Link>{" "}
            that inherits the text color
          </ListItem>
        </List>

        <List ordered marker="lower-alpha" spacing="1">
          <ListItem>Ordered, lower-alpha markers</ListItem>
          <ListItem>Second step</ListItem>
        </List>

        <List unstyled spacing="1">
          <ListItem icon={<span aria-hidden="true">✓</span>}>Items can carry an icon</ListItem>
        </List>
      </Stack>
    </Container>
  );
}

/** The layout components, composed the way a page would use them. */
function LayoutShowcase(): React.ReactElement {
  return (
    <Container as="section" size="md" padding="0" aria-label="Layout" className="playground__card">
      <Stack gap="4">
        <Heading level={2} size="lg">
          Layout
        </Heading>

        <Flex align="center" justify="space-between" gap="2" wrap>
          <Text fontWeight="medium">Flex: space-between row</Text>
          <Flex gap="2" align="center">
            <Text fontSize="sm" color="muted">
              React
            </Text>
            <Divider orientation="vertical" />
            <Text fontSize="sm" color="muted">
              Vue
            </Text>
          </Flex>
        </Flex>

        <Divider label="Grid" />

        <Grid columns={{ base: 1, sm: 2, lg: 4 }} gap="3">
          <GridItem colSpan={{ base: 1, sm: 2, lg: 4 }} className="playground__cell">
            Full-width item (colSpan follows the columns)
          </GridItem>
          <AspectRatio ratio={16 / 9} className="playground__cell">
            <Flex align="center" justify="center">
              16 / 9
            </Flex>
          </AspectRatio>
          <AspectRatio ratio={1} className="playground__cell">
            <Flex align="center" justify="center">
              1 / 1
            </Flex>
          </AspectRatio>
          <GridItem colSpan={{ base: 1, sm: 2 }} className="playground__cell">
            Two columns from `sm`
          </GridItem>
        </Grid>

        <Divider label="ScrollArea" labelPosition="start" variant="dashed" />

        <ScrollArea
          as="ul"
          maxHeight="32"
          role="region"
          aria-label="Changelog"
          className="playground__scroll"
        >
          {changelog.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ScrollArea>
      </Stack>
    </Container>
  );
}

function Page(): React.ReactElement {
  const { resolvedColorMode, toggleColorMode, isDark } = useColorMode();
  const [errors, setErrors] = React.useState<Errors>({});
  const [submitted, setSubmitted] = React.useState<SignUpValues | null>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values: SignUpValues = {
      fullName: String(data.get("fullName") ?? ""),
      email: String(data.get("email") ?? ""),
      website: String(data.get("website") ?? ""),
      bio: String(data.get("bio") ?? ""),
      password: String(data.get("password") ?? ""),
      plan: String(data.get("plan") ?? ""),
      billing: String(data.get("billing") ?? ""),
      contact: String(data.get("contact") ?? ""),
      newsletter: data.get("newsletter") !== null,
      terms: data.get("terms") !== null,
    };
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0 ? values : null);
  };

  const handleReset = () => {
    formRef.current?.reset();
    setErrors({});
    setSubmitted(null);
  };

  return (
    <Box className="playground" data-color-mode={resolvedColorMode}>
      <Breadcrumb
        items={[
          { label: "mild-ui", href: "#" },
          { label: "Playground", href: "#" },
          { label: "React" },
        ]}
      />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className="playground__header"
      >
        <Heading level={1} weight="bold">
          mild-ui react playground
        </Heading>
        <Box display="flex" alignItems="center" gap="2">
          <Label htmlFor="color-mode">Dark mode</Label>
          <Switch id="color-mode" checked={isDark} onCheckedChange={toggleColorMode} />
        </Box>
      </Box>

      <Text as="p" color="muted">
        Every component in the library is rendered below on a single form page.
      </Text>

      <TypographyShowcase />
      <ToolbarShowcase />
      <FeedbackShowcase />
      <OverlayShowcase />
      <DataDisplayShowcase />
      <LayoutShowcase />

      <Box className="playground__card">
        <Form ref={formRef} onSubmit={handleSubmit} noValidate>
          <FormField
            name="fullName"
            label="Full name"
            description="Shown on your profile."
            required
            error={errors.fullName}
          >
            <Input placeholder="Ada Lovelace" />
          </FormField>

          <FormField name="email" label="Email" required error={errors.email}>
            <InputGroup>
              <InputLeftElement>@</InputLeftElement>
              <Input type="email" placeholder="ada@example.com" />
            </InputGroup>
          </FormField>

          <FormField name="website" label="Website">
            <InputGroup>
              <InputLeftAddon>https://</InputLeftAddon>
              <Input placeholder="example.com" />
              <InputRightElement interactive>
                <CloseButton size="xs" label="Clear website" />
              </InputRightElement>
            </InputGroup>
          </FormField>

          <FormField name="bio" label="Bio" description="A few lines about yourself.">
            <Textarea placeholder="I build things with..." autoResize />
          </FormField>

          <FormField
            name="password"
            label="Password"
            description="At least 8 characters."
            error={errors.password}
          >
            <InputPassword placeholder="••••••••" />
          </FormField>

          <FormField name="plan" label="Plan">
            <Select options={plans} defaultValue="free" placeholder="Pick a plan" />
          </FormField>

          <FormField name="billing" label="Billing cycle">
            <Radio items={billingCycles} defaultValue="monthly" />
          </FormField>

          <FormField name="contact" label="Preferred contact">
            <SegmentedControl
              items={[
                { value: "email", label: "Email" },
                { value: "phone", label: "Phone" },
                { value: "post", label: "Post", disabled: true },
              ]}
              defaultValue="email"
            />
          </FormField>

          <FormField name="newsletter" label="Send me product updates">
            <Checkbox value="yes" />
          </FormField>

          <FormField name="terms" label="I accept the terms" required error={errors.terms}>
            <Checkbox value="yes" />
          </FormField>

          <Flex gap="2" wrap className="playground__actions">
            <Button type="submit">Create account</Button>
            <ButtonGroup aria-label="Secondary actions" variant="outline">
              <Button type="button" onClick={handleReset}>
                Reset
              </Button>
              <Button type="button" disabled>
                Disabled
              </Button>
            </ButtonGroup>
            <Button type="button" variant="ghost" loading>
              Saving
            </Button>
          </Flex>
        </Form>
      </Box>

      {submitted && (
        <Box className="playground__card playground__submitted">
          <Heading level={2} size="lg">
            Submitted values
          </Heading>
          <Text as="p">{JSON.stringify(submitted, null, 2)}</Text>
        </Box>
      )}
    </Box>
  );
}

/** The page inside the providers it needs (the theme provider is the app root's job). */
export function App(): React.ReactElement {
  return (
    <ToastProvider placement="bottom-right">
      <Page />
    </ToastProvider>
  );
}

export default App;
