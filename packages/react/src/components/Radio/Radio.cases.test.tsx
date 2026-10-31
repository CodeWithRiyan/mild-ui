import * as React from "react";
import { radioCases } from "@mild-ui/test-cases/radio";
import { runComponentCases } from "../../test-utils/run-cases";
import { Radio, type RadioProps } from "./Radio";

runComponentCases(radioCases, (c) => <Radio {...(c.props as RadioProps)} />);
