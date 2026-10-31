import * as React from "react";
import { headingCases } from "@mild-ui/test-cases/heading";
import { runComponentCases } from "../../test-utils/run-cases";
import { Heading, type HeadingProps } from "./Heading";

runComponentCases(headingCases, (c) => (
  <Heading {...(c.props as HeadingProps)}>{c.children}</Heading>
));
