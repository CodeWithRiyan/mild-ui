import * as React from "react";
import { checkboxCases } from "@mild-ui/test-cases/checkbox";
import { runComponentCases } from "../../test-utils/run-cases";
import { Checkbox, type CheckboxProps } from "./Checkbox";

runComponentCases(checkboxCases, (c) => <Checkbox {...(c.props as CheckboxProps)} />);
