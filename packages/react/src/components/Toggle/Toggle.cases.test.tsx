import * as React from "react";
import { toggleCases } from "@mild-ui/test-cases/toggle";
import { runComponentCases } from "../../test-utils/run-cases";
import { Toggle, type ToggleProps } from "./Toggle";

runComponentCases(toggleCases, (c) => <Toggle {...(c.props as ToggleProps)}>{c.children}</Toggle>);
