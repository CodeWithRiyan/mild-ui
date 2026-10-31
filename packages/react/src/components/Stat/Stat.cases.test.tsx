import * as React from "react";
import { statCases } from "@mild-ui/test-cases/stat";
import { runComponentCases } from "../../test-utils/run-cases";
import { Stat, type StatProps } from "./Stat";

runComponentCases(statCases, (c) => <Stat {...(c.props as StatProps)}>{c.children}</Stat>);
