import * as React from "react";
import { textareaCases } from "@mild-ui/test-cases/textarea";
import { runComponentCases } from "../../test-utils/run-cases";
import { Textarea, type TextareaProps } from "./Textarea";

runComponentCases(textareaCases, (c) => <Textarea {...(c.props as TextareaProps)} />);
