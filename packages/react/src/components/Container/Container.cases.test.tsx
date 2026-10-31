import * as React from "react";
import { containerCases } from "@mild-ui/test-cases/container";
import { runComponentCases } from "../../test-utils/run-cases";
import { Container, type ContainerProps } from "./Container";

runComponentCases(containerCases, (c) => (
  <Container {...(c.props as ContainerProps)}>{c.children}</Container>
));
