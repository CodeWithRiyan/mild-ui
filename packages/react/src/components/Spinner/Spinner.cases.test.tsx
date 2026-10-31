import * as React from "react";
import { spinnerCases } from "@mild-ui/test-cases/spinner";
import { runComponentCases } from "../../test-utils/run-cases";
import { Spinner, type SpinnerProps } from "./Spinner";

runComponentCases(spinnerCases, (c) => (
  <Spinner {...(c.props as SpinnerProps)}>{c.children}</Spinner>
));
