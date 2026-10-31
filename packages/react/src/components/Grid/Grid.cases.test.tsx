import * as React from "react";
import { gridCases } from "@mild-ui/test-cases/grid";
import { runComponentCases } from "../../test-utils/run-cases";
import { Grid, type GridProps } from "./Grid";

runComponentCases(gridCases, (c) => <Grid {...(c.props as GridProps)}>{c.children}</Grid>);
