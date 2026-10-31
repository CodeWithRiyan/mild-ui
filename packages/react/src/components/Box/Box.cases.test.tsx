import * as React from "react";
import { boxCases } from "@mild-ui/test-cases/box";
import { runComponentCases } from "../../test-utils/run-cases";
import { Box, type BoxProps } from "./Box";

runComponentCases(boxCases, (c) => <Box {...(c.props as BoxProps)}>{c.children}</Box>);
