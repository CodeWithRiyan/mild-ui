<!-- packages/vue/src/components/DataTable/DataTable.vue -->
<script setup lang="ts" generic="Row extends Record<string, unknown>">
import { computed, ref } from "vue";
import { cn } from "../../utils/cn";
import { nextSort, sortRows } from "../../utils/table";
import { Checkbox } from "../Checkbox";
import { Spinner } from "../Spinner";
import { ArrowUpIcon } from "../icons";
import Table from "../Table/Table.vue";
import TableBody from "../Table/TableBody.vue";
import TableCaption from "../Table/TableCaption.vue";
import TableCell from "../Table/TableCell.vue";
import TableHead from "../Table/TableHead.vue";
import TableHeader from "../Table/TableHeader.vue";
import TableRow from "../Table/TableRow.vue";
import type { DataTableColumn, DataTableProps, DataTableSort } from "../../types/table";

// Attributes (class, style, aria-*) go on the <table>.
defineOptions({ inheritAttrs: false });

// Table rendered from `columns` and `rows`. Sortable columns get a button in their header and
// announce the direction through `aria-sort` (APG "Sortable Table"); `selectable` adds a
// checkbox per row (and a select-all header) and marks selected rows with `aria-selected`. Both
// sort and selection can be controlled (`v-model:sort` / `v-model:selectedKeys`) or left to
// the component.
const props = withDefaults(defineProps<DataTableProps<Row>>(), {
  variant: "simple",
  size: "md",
  hoverable: false,
  stickyHeader: false,
  rowKey: undefined,
  caption: undefined,
  sort: undefined,
  defaultSort: null,
  selectable: false,
  selectedKeys: undefined,
  defaultSelectedKeys: () => [],
  selectionLabel: undefined,
  selectAllLabel: "Select all rows",
  emptyMessage: "No data",
  loading: false,
  loadingMessage: "Loading...",
  renderCell: undefined,
  ui: undefined,
});

const emit = defineEmits<{
  /** `v-model:sort` */
  (e: "update:sort", sort: DataTableSort): void;
  /** `v-model:selectedKeys` */
  (e: "update:selectedKeys", keys: string[]): void;
}>();

defineSlots<{
  /** Custom cell content; receives `{ row, column, index, value }`. */
  cell?: (scope: {
    row: Row;
    column: DataTableColumn<Row>;
    index: number;
    value: unknown;
  }) => unknown;
}>();

function keyOf(row: Row, index: number): string {
  if (typeof props.rowKey === "function") return props.rowKey(row, index);
  const id = row[props.rowKey ?? "id"];
  return id === undefined || id === null ? String(index) : String(id);
}

const sortControlled = computed(() => props.sort !== undefined);
const internalSort = ref<DataTableSort | null>(props.defaultSort);
const sort = computed(() => (sortControlled.value ? (props.sort ?? null) : internalSort.value));

const selectionControlled = computed(() => props.selectedKeys !== undefined);
const internalSelected = ref<string[]>([...props.defaultSelectedKeys]);
const selected = computed(() =>
  selectionControlled.value ? (props.selectedKeys as string[]) : internalSelected.value,
);

const sorted = computed(() => sortRows(props.rows, props.columns, sort.value));
const keys = computed(() => props.rows.map((row, index) => keyOf(row, index)));
const allSelected = computed(
  () => keys.value.length > 0 && keys.value.every((key) => selected.value.includes(key)),
);
const someSelected = computed(() => keys.value.some((key) => selected.value.includes(key)));
const columnCount = computed(() => props.columns.length + (props.selectable ? 1 : 0));

function changeSort(key: string): void {
  const next = nextSort(sort.value, key);
  if (!sortControlled.value) internalSort.value = next;
  emit("update:sort", next);
}

function changeSelection(next: string[]): void {
  if (!selectionControlled.value) internalSelected.value = next;
  emit("update:selectedKeys", next);
}

function toggleRow(key: string, checked: boolean | "indeterminate"): void {
  changeSelection(
    checked === true ? [...selected.value, key] : selected.value.filter((entry) => entry !== key),
  );
}

function toggleAll(checked: boolean | "indeterminate"): void {
  changeSelection(checked === true ? keys.value : []);
}

function rowLabel(row: Row, index: number): string {
  return props.selectionLabel ? props.selectionLabel(row, index) : `Select row ${index + 1}`;
}

function cellValue(row: Row, column: DataTableColumn<Row>): string {
  const value = row[column.key];
  return value === undefined || value === null ? "" : String(value);
}
</script>

<template>
  <div class="mild-data-table" :aria-busy="loading || undefined">
    <Table
      :variant="variant"
      :size="size"
      :hoverable="hoverable"
      :sticky-header="stickyHeader"
      :ui="{ container: ui?.container }"
      v-bind="$attrs"
    >
      <TableCaption v-if="caption">{{ caption }}</TableCaption>
      <TableHeader>
        <TableRow :class="ui?.row">
          <TableHead v-if="selectable" :class="cn('mild-table__selection', ui?.head)">
            <Checkbox
              :aria-label="selectAllLabel"
              :model-value="allSelected ? true : someSelected ? 'indeterminate' : false"
              :disabled="keys.length === 0"
              @change="toggleAll"
            />
          </TableHead>
          <TableHead
            v-for="column in columns"
            :key="column.key"
            :align="column.align"
            :numeric="column.numeric"
            :sort="
              column.sortable ? (sort?.key === column.key ? sort.direction : 'none') : undefined
            "
            :style="column.width ? { width: column.width } : undefined"
            :class="ui?.head"
          >
            <button
              v-if="column.sortable"
              type="button"
              class="mild-table__sort"
              @click="changeSort(column.key)"
            >
              {{ column.header }}
              <span
                class="mild-table__sort-icon"
                :data-direction="sort?.key === column.key ? sort.direction : 'none'"
                aria-hidden="true"
              >
                <ArrowUpIcon />
              </span>
            </button>
            <template v-else>{{ column.header }}</template>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-if="loading">
          <TableCell :colspan="columnCount" class="mild-data-table__empty">
            <Spinner size="sm" :label="loadingMessage" />
          </TableCell>
        </TableRow>
        <TableRow v-else-if="sorted.length === 0">
          <TableCell :colspan="columnCount" class="mild-data-table__empty">
            {{ emptyMessage }}
          </TableCell>
        </TableRow>
        <template v-else>
          <TableRow
            v-for="row in sorted"
            :key="keyOf(row, rows.indexOf(row))"
            :selected="selectable ? selected.includes(keyOf(row, rows.indexOf(row))) : undefined"
            :class="ui?.row"
          >
            <TableCell v-if="selectable" :class="cn('mild-table__selection', ui?.cell)">
              <Checkbox
                :aria-label="rowLabel(row, rows.indexOf(row))"
                :model-value="selected.includes(keyOf(row, rows.indexOf(row)))"
                @change="toggleRow(keyOf(row, rows.indexOf(row)), $event)"
              />
            </TableCell>
            <TableCell
              v-for="column in columns"
              :key="column.key"
              :align="column.align"
              :numeric="column.numeric"
              :class="ui?.cell"
            >
              <slot
                name="cell"
                :row="row"
                :column="column"
                :index="rows.indexOf(row)"
                :value="row[column.key]"
              >
                <template v-if="renderCell">
                  <component :is="() => renderCell!(row, column, rows.indexOf(row))" />
                </template>
                <template v-else>{{ cellValue(row, column) }}</template>
              </slot>
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>
