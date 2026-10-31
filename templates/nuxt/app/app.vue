<!-- templates/nuxt/app/app.vue -->
<!-- The app root: the providers (color mode, toasts), then the page. Everything below is
     server-rendered by Nuxt and hydrated in the browser; the dialogs and toast regions teleport to
     <body> after mount, so they are not part of the server HTML and never cause a mismatch. -->
<script setup lang="ts">
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
  ThemeProvider,
  ToastProvider,
} from "@mild-ui/vue";

const breadcrumbs = [
  { label: "mild-ui", href: "https://github.com/CodeWithRiyan/mild-ui" },
  { label: "Playground", href: "#" },
  { label: "Nuxt" },
];

const releases = [
  { version: "1.0", highlights: "Forms, layout, theme", components: 25 },
  { version: "1.1", highlights: "Feedback, overlay, data display", components: 53 },
  { version: "1.2", highlights: "Table, DataTable, Vue parity", components: 54 },
];
</script>

<template>
  <ThemeProvider default-color-mode="system">
    <ToastProvider placement="bottom-right">
      <Container as="main" size="md" :style="{ paddingBlock: '2rem' }">
        <Stack gap="6">
          <Breadcrumb :items="breadcrumbs" />

          <Stack gap="2">
            <Heading :level="1">mild-ui on Nuxt</Heading>
            <Text as="p" color="muted">
              This page was rendered to HTML on the server and hydrated without a single warning;
              open the console to check. Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> in the editor to search
              the docs, or read the
              <Link href="https://codewithriyan.github.io/mild-ui/vue/" external>
                component reference </Link
              >.
            </Text>
          </Stack>

          <Divider label="Static: rendered on the server" />

          <Grid :columns="{ base: 1, sm: 2 }" gap="4">
            <Card as="article" variant="outlined" aria-label="Project card">
              <Image
                src="https://picsum.photos/seed/mild/640/360"
                alt="Mountain landscape"
                ratio="16/9"
                radius="none"
              >
                <template #fallback>Image unavailable</template>
              </Image>
              <CardHeader>
                <Flex align="center" justify="space-between" gap="2">
                  <CardTitle>mild-ui</CardTitle>
                  <Badge color-scheme="success" dot>Active</Badge>
                </Flex>
                <CardDescription>Framework-agnostic design system.</CardDescription>
              </CardHeader>
              <CardBody>
                <List spacing="1">
                  <ListItem>Install with <Code>npm i @mild-ui/vue @mild-ui/core</Code></ListItem>
                  <ListItem>Add the stylesheet once in <Code>nuxt.config.ts</Code></ListItem>
                  <ListItem>Use the components in any page or component</ListItem>
                </List>
              </CardBody>
              <CardFooter align="between">
                <AvatarGroup :max="3" size="sm" aria-label="Contributors">
                  <Avatar name="Ada Lovelace" />
                  <Avatar name="Grace Hopper" />
                  <Avatar name="Alan Turing" />
                  <Avatar name="Edsger Dijkstra" />
                </AvatarGroup>
                <Badge variant="outline" color-scheme="primary">v1.2</Badge>
              </CardFooter>
            </Card>

            <Card variant="filled">
              <CardBody>
                <Stack gap="4">
                  <StatGroup aria-label="Key figures">
                    <Stat label="Stars" value="1,204" trend="increase" trend-value="12%" />
                    <Stat label="Open issues" value="37" trend="decrease" trend-value="4" />
                  </StatGroup>
                  <Flex align="center" gap="4" wrap>
                    <Spinner label="Loading profile" />
                    <CircularProgress :value="62" label="Storage used" show-value />
                    <Box :style="{ flex: 1, minWidth: '10rem' }">
                      <Progress :value="62" label="Upload" show-value />
                    </Box>
                  </Flex>
                  <Flex align="center" gap="3">
                    <Skeleton variant="circle" />
                    <Box :style="{ flex: 1 }">
                      <SkeletonText :lines="2" />
                    </Box>
                  </Flex>
                </Stack>
              </CardBody>
            </Card>

            <GridItem :col-span="{ base: 1, sm: 2 }">
              <Map
                :latitude="48.8566"
                :longitude="2.3522"
                title="Office in Paris"
                caption="Paris, France"
              />
            </GridItem>

            <GridItem :col-span="{ base: 1, sm: 2 }">
              <Table variant="striped" size="sm">
                <TableCaption>Releases (a static table rendered on the server)</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Version</TableHead>
                    <TableHead>Highlights</TableHead>
                    <TableHead numeric>Components</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="release in releases" :key="release.version">
                    <TableCell>{{ release.version }}</TableCell>
                    <TableCell>{{ release.highlights }}</TableCell>
                    <TableCell numeric>{{ release.components }}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </GridItem>
          </Grid>

          <Divider label="Interactive" />

          <Showcase />
        </Stack>
      </Container>
    </ToastProvider>
  </ThemeProvider>
</template>
