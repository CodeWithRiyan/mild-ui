import * as React from "react";
import { tooltipCases } from "@mild-ui/test-cases/tooltip";
import { runComponentCases } from "../../test-utils/run-cases";
import { Tooltip, type TooltipProps } from "./Tooltip";

runComponentCases(tooltipCases, (c) => (
  <Tooltip {...(c.props as Omit<TooltipProps, "children">)}>
    <button type="button">Save</button>
  </Tooltip>
));
