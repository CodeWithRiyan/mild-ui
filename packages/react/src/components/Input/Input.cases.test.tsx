import * as React from "react";
import { inputCases } from "@mild-ui/test-cases/input";
import { runComponentCases } from "../../test-utils/run-cases";
import { Input, type InputProps } from "./Input";

runComponentCases(inputCases, (c) => <Input {...(c.props as InputProps)} />);
