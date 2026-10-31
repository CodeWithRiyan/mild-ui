import * as React from "react";
import { badgeCases } from "@mild-ui/test-cases/badge";
import { runComponentCases } from "../../test-utils/run-cases";
import { Badge, type BadgeProps } from "./Badge";

runComponentCases(badgeCases, (c) => <Badge {...(c.props as BadgeProps)}>{c.children}</Badge>);
