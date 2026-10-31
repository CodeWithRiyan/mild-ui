import * as React from "react";
import { linkCases } from "@mild-ui/test-cases/link";
import { runComponentCases } from "../../test-utils/run-cases";
import { Link, type LinkProps } from "./Link";

runComponentCases(linkCases, (c) => <Link {...(c.props as LinkProps)}>{c.children}</Link>);
