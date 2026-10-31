import * as React from "react";
import { progressCases } from "@mild-ui/test-cases/progress";
import { runComponentCases } from "../../test-utils/run-cases";
import { Progress, type ProgressProps } from "./Progress";

runComponentCases(progressCases, (c) => (
  <Progress {...(c.props as ProgressProps)}>{c.children}</Progress>
));
