import * as React from "react";
import { stackCases } from "@mild-ui/test-cases/stack";
import { runComponentCases } from "../../test-utils/run-cases";
import { Stack, type StackProps } from "./Stack";

runComponentCases(stackCases, (c) => <Stack {...(c.props as StackProps)}>{c.children}</Stack>);
