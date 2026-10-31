import * as React from "react";
import { buttonCases } from "@mild-ui/test-cases/button";
import { runComponentCases } from "../../test-utils/run-cases";
import { Button, type ButtonProps } from "./Button";

runComponentCases(buttonCases, (c) => <Button {...(c.props as ButtonProps)}>{c.children}</Button>);
