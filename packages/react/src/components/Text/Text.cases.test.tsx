import * as React from "react";
import { textCases } from "@mild-ui/test-cases/text";
import { runComponentCases } from "../../test-utils/run-cases";
import { Text, type TextProps } from "./Text";

runComponentCases(textCases, (c) => <Text {...(c.props as TextProps)}>{c.children}</Text>);
