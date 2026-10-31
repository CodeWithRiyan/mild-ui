import * as React from "react";
import { breadcrumbCases } from "@mild-ui/test-cases/breadcrumb";
import { runComponentCases } from "../../test-utils/run-cases";
import { Breadcrumb, type BreadcrumbProps } from "./Breadcrumb";

runComponentCases(breadcrumbCases, (c) => <Breadcrumb {...(c.props as BreadcrumbProps)} />);
