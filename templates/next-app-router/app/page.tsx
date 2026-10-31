// templates/next-app-router/app/page.tsx
//
// The page is a Server Component. @mild-ui/react is a Client Component boundary (every module
// starts with "use client"), so the components below are rendered to HTML on the server and
// hydrated in the browser; Server Components may use them as long as the props are
// serializable (no functions). Anything that needs handlers or state lives in
// ./showcase.tsx, a Client Component rendered from here.
import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Breadcrumb,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CircularProgress,
  Code,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Kbd,
  Link,
  List,
  ListItem,
  Map,
  Progress,
  Skeleton,
  SkeletonText,
  Spinner,
  Stack,
  Stat,
  StatGroup,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from "@mild-ui/react";
import { Showcase } from "./showcase";

export default function Page() {
  return (
    <Container as="main" size="md" style={{ paddingBlock: "2rem" }}>
      <Stack gap="6">
        <Breadcrumb
          items={[
            { label: "mild-ui", href: "https://github.com/CodeWithRiyan/mild-ui" },
            { label: "Playground", href: "#" },
            { label: "Next.js App Router" },
          ]}
        />

        <Stack gap="2">
          <Heading level={1}>mild-ui on the App Router</Heading>
          <Text as="p" color="muted">
            This page is a Server Component. Everything you see was rendered to HTML on the server
            and hydrated without a single warning; open the console to check. Press <Kbd>⌘</Kbd> +{" "}
            <Kbd>K</Kbd> in the editor to search the docs, or read the{" "}
            <Link href="https://codewithriyan.github.io/mild-ui/react/" external>
              component reference
            </Link>
            .
          </Text>
        </Stack>

        <Divider label="Static: rendered from the Server Component" />

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
              <List spacing="1">
                <ListItem>
                  Install with <Code>npm i @mild-ui/react</Code>
                </ListItem>
                <ListItem>Import the stylesheet once in the root layout</ListItem>
                <ListItem>Use the components from Server or Client Components</ListItem>
              </List>
            </CardBody>
            <CardFooter align="between">
              <AvatarGroup max={3} size="sm" aria-label="Contributors">
                <Avatar name="Ada Lovelace" />
                <Avatar name="Grace Hopper" />
                <Avatar name="Alan Turing" />
                <Avatar name="Edsger Dijkstra" />
              </AvatarGroup>
              <Badge variant="outline" colorScheme="primary">
                v1.2
              </Badge>
            </CardFooter>
          </Card>

          <Card variant="filled">
            <CardBody>
              <Stack gap="4">
                <StatGroup aria-label="Key figures">
                  <Stat label="Stars" value="1,204" trend="increase" trendValue="12%" />
                  <Stat label="Open issues" value="37" trend="decrease" trendValue="4" />
                </StatGroup>
                <Flex align="center" gap="4" wrap>
                  <Spinner label="Loading profile" />
                  <CircularProgress value={62} label="Storage used" showValue />
                  <Box style={{ flex: 1, minWidth: "10rem" }}>
                    <Progress value={62} label="Upload" showValue />
                  </Box>
                </Flex>
                <Flex align="center" gap="3">
                  <Skeleton variant="circle" />
                  <Box style={{ flex: 1 }}>
                    <SkeletonText lines={2} />
                  </Box>
                </Flex>
              </Stack>
            </CardBody>
          </Card>

          <GridItem colSpan={{ base: 1, sm: 2 }}>
            <Table variant="striped" size="sm">
              <TableCaption>Releases (a static table from the Server Component)</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Version</TableHead>
                  <TableHead>Highlights</TableHead>
                  <TableHead numeric>Components</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1.0</TableCell>
                  <TableCell>Forms, layout, theme</TableCell>
                  <TableCell numeric>25</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1.1</TableCell>
                  <TableCell>Feedback, overlay, data display</TableCell>
                  <TableCell numeric>53</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1.2</TableCell>
                  <TableCell>Table, DataTable, Vue parity</TableCell>
                  <TableCell numeric>54</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </GridItem>

          <GridItem colSpan={{ base: 1, sm: 2 }}>
            <Map
              latitude={48.8566}
              longitude={2.3522}
              title="Office in Paris"
              caption="Paris, France"
            />
          </GridItem>
        </Grid>

        <Divider label="Interactive: a Client Component" />

        <Showcase />
      </Stack>
    </Container>
  );
}
