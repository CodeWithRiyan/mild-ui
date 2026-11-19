import * as React from "react";
import { navCases } from "@mild-ui/test-cases/nav";
import { runComponentCases } from "../../test-utils/run-cases";
import { Nav, type NavProps } from "./Nav";

runComponentCases(navCases, (c) => <Nav {...(c.props as NavProps)} />);
