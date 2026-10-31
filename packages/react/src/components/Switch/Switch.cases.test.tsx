import * as React from "react";
import { switchCases } from "@mild-ui/test-cases/switch";
import { runComponentCases } from "../../test-utils/run-cases";
import { Switch, type SwitchProps } from "./Switch";

runComponentCases(switchCases, (c) => <Switch {...(c.props as SwitchProps)} />);
