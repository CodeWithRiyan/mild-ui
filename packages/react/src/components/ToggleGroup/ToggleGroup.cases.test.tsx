import * as React from "react";
import { toggleGroupCases } from "@mild-ui/test-cases/toggle-group";
import { runComponentCases } from "../../test-utils/run-cases";
import { ToggleGroup, ToggleGroupItem, type ToggleGroupProps } from "./ToggleGroup";

runComponentCases(toggleGroupCases, (c) => (
  <ToggleGroup {...(c.props as ToggleGroupProps)}>
    <ToggleGroupItem value="left">left</ToggleGroupItem>
    <ToggleGroupItem value="center">center</ToggleGroupItem>
    <ToggleGroupItem value="right" disabled>
      right
    </ToggleGroupItem>
  </ToggleGroup>
));
