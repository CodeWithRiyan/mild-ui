import * as React from "react";
import { flexCases } from "@mild-ui/test-cases/flex";
import { runComponentCases } from "../../test-utils/run-cases";
import { Flex, type FlexProps } from "./Flex";

runComponentCases(flexCases, (c) => <Flex {...(c.props as FlexProps)}>{c.children}</Flex>);
