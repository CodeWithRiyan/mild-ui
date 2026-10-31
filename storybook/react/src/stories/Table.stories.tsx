import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
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
} from "@mild-ui/react";

interface Invoice {
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

const statusScheme = (status: Invoice["status"]) =>
  status === "Paid" ? "success" : status === "Overdue" ? "danger" : "warning";

const meta = {
  title: "Data Display/Table",
  tags: ["autodocs"],
  component: Table,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Data table in a horizontally scrolling container. Compose `TableCaption`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead` and `TableCell`, or hand `DataTable` your `columns` and `rows` and get sorting (`aria-sort` per the [WAI-ARIA APG sortable table](https://www.w3.org/WAI/ARIA/apg/patterns/table/examples/sortable-table/)) and row selection (`aria-selected` + a tri-state select-all checkbox). Keyboard behaviour is covered in `packages/react/src/components/DataTable/DataTable.test.tsx`.",
      },
    },
  },
  argTypes: {
    variant: { control: "radio", options: ["simple", "striped", "outline"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    hoverable: { control: "boolean" },
    stickyHeader: { control: "boolean" },
    className: { control: false },
  },
  args: { variant: "simple", size: "md", hoverable: false, stickyHeader: false },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Composed = {
  render: (args) => (
    <Table {...args} className="w-[44rem]">
      <TableCaption>Invoices</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead numeric>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id} selected={row.id === "inv-2"}>
            <TableCell>{row.customer}</TableCell>
            <TableCell>
              <Badge colorScheme={statusScheme(row.status)}>{row.status}</Badge>
            </TableCell>
            <TableCell numeric>${row.amount.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell numeric>
            ${rows.reduce((sum, row) => sum + row.amount, 0).toFixed(2)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
} satisfies Story;

export const Variants = {
  render: () => (
    <div className="flex flex-col gap-6 w-[40rem]">
      {(["simple", "striped", "outline"] as const).map((variant) => (
        <div key={variant}>
          <Text as="p" fontWeight="medium" className="mb-2">
            {variant}
          </Text>
          <Table variant={variant} size="sm" hoverable>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead align="center">Status</TableHead>
                <TableHead numeric>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.slice(0, 3).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell numeric>{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  ),
} satisfies Story;

export const StickyHeader = {
  name: "Sticky header",
  render: () => (
    <Table stickyHeader variant="striped" size="sm" ui={{ container: "max-h-64 w-[28rem]" }}>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead numeric>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 30 }, (_, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>Row {index + 1}</TableCell>
            <TableCell numeric>{(index + 1) * 7}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
} satisfies Story;

function SortableExample() {
  const [sort, setSort] = useState<DataTableSort | null>({ key: "due", direction: "ascending" });
  return (
    <div className="flex flex-col gap-3 w-[44rem]">
      <DataTable
        columns={columns}
        rows={rows}
        caption="Invoices"
        sort={sort}
        onSortChange={setSort}
        hoverable
      />
      <Text as="p" fontSize="sm" color="muted">
        Sort: {sort ? `${sort.key} ${sort.direction}` : "none"}
      </Text>
    </div>
  );
}

export const DataTableSortable = {
  name: "DataTable: sortable",
  render: () => <SortableExample />,
} satisfies Story;

function SelectableExample() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["inv-2"]);
  return (
    <div className="flex flex-col gap-3 w-[46rem]">
      <DataTable
        columns={columns}
        rows={rows}
        caption="Invoices"
        selectable
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        selectionLabel={(row) => `Select ${row.customer}`}
        variant="striped"
      />
      <Text as="p" fontSize="sm" color="muted">
        Selected: {selectedKeys.join(", ") || "none"}
      </Text>
    </div>
  );
}

export const DataTableSelectable = {
  name: "DataTable: selectable",
  render: () => <SelectableExample />,
} satisfies Story;

export const DataTableCustomCells = {
  name: "DataTable: custom cells",
  render: () => (
    <DataTable
      columns={columns}
      rows={rows}
      caption="Invoices"
      className="w-[44rem]"
      renderCell={(row, column) => {
        if (column.key === "status") {
          return <Badge colorScheme={statusScheme(row.status)}>{row.status}</Badge>;
        }
        if (column.key === "amount") return `$${row.amount.toFixed(2)}`;
        return String(row[column.key as keyof Invoice]);
      }}
    />
  ),
} satisfies Story;

export const DataTableStates = {
  name: "DataTable: empty and loading",
  render: () => (
    <div className="flex flex-col gap-6 w-[44rem]">
      <DataTable columns={columns} rows={[]} caption="No invoices" emptyMessage="No invoices yet" />
      <DataTable
        columns={columns}
        rows={rows}
        caption="Loading invoices"
        loading
        loadingMessage="Loading invoices"
      />
    </div>
  ),
} satisfies Story;
