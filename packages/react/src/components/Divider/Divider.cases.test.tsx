import * as React from "react";
import { dividerCases } from "@mild-ui/test-cases/divider";
import { runComponentCases } from "../../test-utils/run-cases";
import { Divider, type DividerProps } from "./Divider";

runComponentCases(dividerCases, (c) => <Divider {...(c.props as DividerProps)} />);
