import * as React from "react";
import { dataTableCases } from "@mild-ui/test-cases/data-table";
import { runComponentCases } from "../../test-utils/run-cases";
import { DataTable, type DataTableProps } from "./DataTable";

runComponentCases(dataTableCases, (c) => (
  <DataTable {...(c.props as DataTableProps<Record<string, unknown>>)} />
));
