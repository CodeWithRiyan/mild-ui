import * as React from "react";
import { labelCases } from "@mild-ui/test-cases/label";
import { runComponentCases } from "../../test-utils/run-cases";
import { Label, type LabelProps } from "./Label";

runComponentCases(labelCases, (c) => <Label {...(c.props as LabelProps)}>{c.children}</Label>);
