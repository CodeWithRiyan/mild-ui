import * as React from "react";
import { selectCases } from "@mild-ui/test-cases/select";
import { runComponentCases } from "../../test-utils/run-cases";
import { Select, type SelectProps } from "./Select";

runComponentCases(selectCases, (c) => <Select {...(c.props as SelectProps)} />);
