import * as React from "react";
import { buttonGroupCases } from "@mild-ui/test-cases/button-group";
import { runComponentCases } from "../../test-utils/run-cases";
import { Button } from "../Button";
import { ButtonGroup, type ButtonGroupProps } from "./ButtonGroup";

runComponentCases(buttonGroupCases, (c) => (
  <ButtonGroup {...(c.props as ButtonGroupProps)}>
    <Button>One</Button>
    <Button>Two</Button>
  </ButtonGroup>
));
