import * as React from "react";
import { segmentedControlCases } from "@mild-ui/test-cases/segmented-control";
import { runComponentCases } from "../../test-utils/run-cases";
import { SegmentedControl, type SegmentedControlProps } from "./SegmentedControl";

runComponentCases(segmentedControlCases, (c) => (
  <SegmentedControl {...(c.props as SegmentedControlProps)} />
));
