import * as React from "react";
import { scrollAreaCases } from "@mild-ui/test-cases/scroll-area";
import { runComponentCases } from "../../test-utils/run-cases";
import { ScrollArea, type ScrollAreaProps } from "./ScrollArea";

runComponentCases(scrollAreaCases, (c) => (
  <ScrollArea {...(c.props as ScrollAreaProps)}>{c.children}</ScrollArea>
));
