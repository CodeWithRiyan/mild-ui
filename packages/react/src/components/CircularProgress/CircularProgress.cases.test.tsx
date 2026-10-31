import * as React from "react";
import { circularProgressCases } from "@mild-ui/test-cases/circular-progress";
import { runComponentCases } from "../../test-utils/run-cases";
import { CircularProgress, type CircularProgressProps } from "./CircularProgress";

runComponentCases(circularProgressCases, (c) => (
  <CircularProgress {...(c.props as CircularProgressProps)}>{c.children}</CircularProgress>
));
