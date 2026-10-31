<!-- apps/playground-vue/src/sections/DataDisplayShowcase.vue -->
<!-- The data display components: cards, badges, tags, avatars, images, stats, tables and a map. -->
<script setup lang="ts">
import { ref } from "vue";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Container,
  DataTable,
  Flex,
  Grid,
  Heading,
  Image,
  Map,
  Stack,
  Stat,
  StatGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tag,
  Text,
  type DataTableColumn,
} from "@mild-ui/vue";

const team = [
  { name: "Ada Lovelace", src: "https://i.pravatar.cc/80?u=ada" },
  { name: "Grace Hopper", src: "" },
  { name: "Alan Turing", src: "" },
  { name: "Edsger Dijkstra", src: "" },
  { name: "Barbara Liskov", src: "" },
];

interface Invoice extends Record<string, unknown> {
  id: string;
  customer: string;
  status: string;
  amount: number;
}

const invoiceColumns: DataTableColumn<Invoice>[] = [
  { key: "customer", header: "Customer", sortable: true },
  { key: "status", header: "Status" },
  { key: "amount", header: "Amount", numeric: true, sortable: true },
];

const invoices: Invoice[] = [
  { id: "inv-1", customer: "Ada Lovelace", status: "Paid", amount: 250 },
  { id: "inv-2", customer: "Grace Hopper", status: "Pending", amount: 125 },
  { id: "inv-3", customer: "Alan Turing", status: "Paid", amount: 400 },
];

const tags = ref(["Design", "Research", "Ops"]);
const selectedInvoices = ref<string[]>(["inv-2"]);

function removeTag(tag: string): void {
  tags.value = tags.value.filter((entry) => entry !== tag);
}
</script>

<template>
  <Container
    as="section"
    size="md"
    padding="0"
    aria-labelledby="data-heading"
    class="playground__card"
  >
    <Stack gap="4">
      <Heading id="data-heading" :level="2" size="lg">Data display</Heading>

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
            <Flex gap="2" wrap>
              <Tag v-for="tag in tags" :key="tag" closable @close="removeTag(tag)">{{ tag }}</Tag>
              <Text v-if="tags.length === 0" font-size="sm" color="muted">No tags</Text>
            </Flex>
          </CardBody>
          <CardFooter align="between">
            <AvatarGroup :max="3" size="sm" aria-label="Contributors">
              <Avatar
                v-for="member in team"
                :key="member.name"
                :name="member.name"
                :src="member.src || undefined"
              />
            </AvatarGroup>
            <Button size="sm" variant="ghost">Open</Button>
          </CardFooter>
        </Card>

        <Card variant="filled">
          <CardBody>
            <StatGroup aria-label="Key figures">
              <Stat
                label="Stars"
                value="1,204"
                trend="increase"
                trend-value="12%"
                help-text="this month"
              />
              <Stat
                label="Open issues"
                value="37"
                trend="decrease"
                trend-value="4"
                help-text="this week"
              />
            </StatGroup>
          </CardBody>
          <CardFooter no-border>
            <Flex align="center" gap="3" wrap>
              <Avatar name="Ada Lovelace" status="online" bordered />
              <Badge variant="solid" color-scheme="primary" pill>Maintainer</Badge>
              <Badge variant="outline" color-scheme="warning">Beta</Badge>
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
          <TableRow v-for="member in team.slice(0, 2)" :key="member.name">
            <TableCell>{{ member.name }}</TableCell>
            <TableCell>Maintainer</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <DataTable
        v-model:selected-keys="selectedInvoices"
        caption="Invoices"
        :columns="invoiceColumns"
        :rows="invoices"
        :default-sort="{ key: 'amount', direction: 'descending' }"
        selectable
        variant="striped"
        size="sm"
      />
      <Text as="p" font-size="sm" color="muted">
        Selected invoices: {{ selectedInvoices.join(", ") || "none" }}
      </Text>

      <Map
        :latitude="48.8566"
        :longitude="2.3522"
        title="Office in Paris"
        caption="Paris, France"
      />
    </Stack>
  </Container>
</template>
