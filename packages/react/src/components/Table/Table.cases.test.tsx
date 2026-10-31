import * as React from "react";
import { tableCases } from "@mild-ui/test-cases/table";
import { runComponentCases } from "../../test-utils/run-cases";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  type TableProps,
} from "./Table";

runComponentCases(tableCases, (c) => (
  <Table {...(c.props as TableProps)}>
    <TableCaption>Invoices</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Customer</TableHead>
        <TableHead numeric sort="ascending">
          Amount
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Ada Lovelace</TableCell>
        <TableCell numeric>$250.00</TableCell>
      </TableRow>
      <TableRow selected>
        <TableCell>Grace Hopper</TableCell>
        <TableCell numeric>$125.00</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell>Total</TableCell>
        <TableCell numeric>$375.00</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
));
