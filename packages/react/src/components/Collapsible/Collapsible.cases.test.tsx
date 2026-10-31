import * as React from "react";
import { collapsibleCases } from "@mild-ui/test-cases/collapsible";
import { runComponentCases } from "../../test-utils/run-cases";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  type CollapsibleProps,
} from "./Collapsible";

runComponentCases(collapsibleCases, (c) => (
  <Collapsible {...(c.props as CollapsibleProps)}>
    <CollapsibleTrigger>Details</CollapsibleTrigger>
    <CollapsibleContent>More</CollapsibleContent>
  </Collapsible>
));
