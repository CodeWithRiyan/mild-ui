import * as React from "react";
import { listCases } from "@mild-ui/test-cases/list";
import { runComponentCases } from "../../test-utils/run-cases";
import { List, type ListProps } from "./List";

runComponentCases(listCases, (c) => <List {...(c.props as ListProps)}>{c.children}</List>);
