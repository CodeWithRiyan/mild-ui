import type { Meta, StoryObj } from "@storybook/vue3";
import {
  Badge,
  DataTable,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  type DataTableColumn,
  type DataTableSort,
} from "@mild-ui/vue";
import { ref } from "vue";

interface Invoice extends Record<string, unknown> {
  id: string;
  customer: string;
  status: "Paid" | "Pending" | "Overdue";
  amount: number;
  due: string;
}

const columns: DataTableColumn<Invoice>[] = [
  { key: "customer", header: "Customer", sortable: true },
  { key: "status", header: "Status", sortable: true },
  { key: "due", header: "Due", sortable: true },
  { key: "amount", header: "Amount", numeric: true, sortable: true, width: "8rem" },
];

const rows: Invoice[] = [
  { id: "inv-1", customer: "Ada Lovelace", status: "Paid", amount: 250, due: "2025-01-12" },
  { id: "inv-2", customer: "Grace Hopper", status: "Pending", amount: 125, due: "2025-02-03" },
  { id: "inv-3", customer: "Alan Turing", status: "Overdue", amount: 400, due: "2024-12-20" },
  { id: "inv-4", customer: "Katherine Johnson", status: "Paid", amount: 980, due: "2025-01-30" },
  { id: "inv-5", customer: "Margaret Hamilton", status: "Pending", amount: 310, due: "2025-02-14" },
];

const meta: Meta<typeof Table> = {
  title: "Data Display/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Data table in a horizontally scrolling container. Compose `TableCaption`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead` and `TableCell`, or hand `DataTable` your `columns` and `rows` and get sorting (`aria-sort` per the [WAI-ARIA APG sortable table](https://www.w3.org/WAI/ARIA/apg/patterns/table/examples/sortable-table/)) and row selection (`aria-selected` + a tri-state select-all checkbox). Keyboard behaviour is covered in `packages/vue/src/components/DataTable/DataTable.test.ts`.",
      },
    },
  },
  argTypes: {
    variant: { control: "radio", options: ["simple", "striped", "outline"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    hoverable: { control: "boolean" },
    stickyHeader: { control: "boolean" },
  },
  args: { variant: "simple", size: "md", hoverable: false, stickyHeader: false },
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Composed: Story = {
  render: (args) => ({
    components: {
      Table,
      TableBody,
      TableCaption,
      TableCell,
      TableFooter,
      TableHead,
      TableHeader,
      TableRow,
      Badge,
    },
    setup: () => ({ args, rows }),
    template: `
      <Table v-bind="args" class="w-[44rem]">
        <TableCaption>Invoices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead numeric>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="row in rows" :key="row.id" :selected="row.id === 'inv-2'">
            <TableCell>{{ row.customer }}</TableCell>
            <TableCell>
              <Badge :color-scheme="row.status === 'Paid' ? 'success' : row.status === 'Overdue' ? 'danger' : 'warning'">
                {{ row.status }}
              </Badge>
            </TableCell>
            <TableCell numeric>\${{ row.amount.toFixed(2) }}</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colspan="2">Total</TableCell>
            <TableCell numeric>\${{ rows.reduce((sum, row) => sum + row.amount, 0).toFixed(2) }}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Text },
    setup: () => ({ rows: rows.slice(0, 3), variants: ["simple", "striped", "outline"] }),
    template: `
      <div class="flex flex-col gap-6 w-[40rem]">
        <div v-for="variant in variants" :key="variant">
          <Text as="p" font-weight="medium" class="mb-2">{{ variant }}</Text>
          <Table :variant="variant" size="sm" hoverable>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead align="center">Status</TableHead>
                <TableHead numeric>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="row in rows" :key="row.id">
                <TableCell>{{ row.customer }}</TableCell>
                <TableCell align="center">{{ row.status }}</TableCell>
                <TableCell numeric>{{ row.amount }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    `,
  }),
};

export const StickyHeader: Story = {
  name: "Sticky header",
  render: () => ({
    components: { Table, TableBody, TableCell, TableHead, TableHeader, TableRow },
    setup: () => ({
      rows: Array.from({ length: 30 }, (_, index) => ({
        id: index + 1,
        name: `Row ${index + 1}`,
        value: (index + 1) * 7,
      })),
    }),
    template: `
      <Table sticky-header variant="striped" size="sm" :ui="{ container: 'max-h-64 w-[28rem]' }">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead numeric>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="row in rows" :key="row.id">
            <TableCell>{{ row.id }}</TableCell>
            <TableCell>{{ row.name }}</TableCell>
            <TableCell numeric>{{ row.value }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    `,
  }),
};

export const DataTableSortable: Story = {
  name: "DataTable: sortable",
  render: () => ({
    components: { DataTable, Text },
    setup() {
      const sort = ref<DataTableSort | null>({ key: "due", direction: "ascending" });
      return { columns, rows, sort };
    },
    template: `
      <div class="flex flex-col gap-3 w-[44rem]">
        <DataTable :columns="columns" :rows="rows" caption="Invoices" v-model:sort="sort" hoverable />
        <Text as="p" font-size="sm" color="muted">Sort: {{ sort ? sort.key + ' ' + sort.direction : 'none' }}</Text>
      </div>
    `,
  }),
};

export const DataTableSelectable: Story = {
  name: "DataTable: selectable",
  render: () => ({
    components: { DataTable, Text },
    setup() {
      const selectedKeys = ref<string[]>(["inv-2"]);
      return { columns, rows, selectedKeys };
    },
    template: `
      <div class="flex flex-col gap-3 w-[46rem]">
        <DataTable
          :columns="columns"
          :rows="rows"
          caption="Invoices"
          selectable
          v-model:selected-keys="selectedKeys"
          :selection-label="(row) => 'Select ' + row.customer"
          variant="striped"
        />
        <Text as="p" font-size="sm" color="muted">Selected: {{ selectedKeys.join(', ') || 'none' }}</Text>
      </div>
    `,
  }),
};

export const DataTableCustomCells: Story = {
  name: "DataTable: custom cells",
  render: () => ({
    components: { DataTable, Badge },
    setup: () => ({ columns, rows }),
    template: `
      <DataTable :columns="columns" :rows="rows" caption="Invoices" class="w-[44rem]">
        <template #cell="{ column, value, row }">
          <Badge v-if="column.key === 'status'" :color-scheme="row.status === 'Paid' ? 'success' : row.status === 'Overdue' ? 'danger' : 'warning'">
            {{ value }}
          </Badge>
          <template v-else-if="column.key === 'amount'">\${{ Number(value).toFixed(2) }}</template>
          <template v-else>{{ value }}</template>
        </template>
      </DataTable>
    `,
  }),
};

export const DataTableStates: Story = {
  name: "DataTable: empty and loading",
  render: () => ({
    components: { DataTable },
    setup: () => ({ columns, rows }),
    template: `
      <div class="flex flex-col gap-6 w-[44rem]">
        <DataTable :columns="columns" :rows="[]" caption="No invoices" empty-message="No invoices yet" />
        <DataTable :columns="columns" :rows="rows" caption="Loading invoices" loading loading-message="Loading invoices" />
      </div>
    `,
  }),
};
