import * as React from "react";
import { alertCases } from "@mild-ui/test-cases/alert";
import { runComponentCases } from "../../test-utils/run-cases";
import { Alert, type AlertProps } from "./Alert";

runComponentCases(alertCases, (c) => <Alert {...(c.props as AlertProps)}>{c.children}</Alert>);
