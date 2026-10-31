import * as React from "react";
import { codeCases } from "@mild-ui/test-cases/code";
import { runComponentCases } from "../../test-utils/run-cases";
import { Code, type CodeProps } from "./Code";

runComponentCases(codeCases, (c) => <Code {...(c.props as CodeProps)}>{c.children}</Code>);
