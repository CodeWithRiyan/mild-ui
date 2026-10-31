import * as React from "react";
import { inputPasswordCases } from "@mild-ui/test-cases/input-password";
import { runComponentCases } from "../../test-utils/run-cases";
import { InputPassword, type InputPasswordProps } from "./InputPassword";

runComponentCases(inputPasswordCases, (c) => (
  <InputPassword {...(c.props as InputPasswordProps)} />
));
