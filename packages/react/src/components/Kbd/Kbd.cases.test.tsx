import * as React from "react";
import { kbdCases } from "@mild-ui/test-cases/kbd";
import { runComponentCases } from "../../test-utils/run-cases";
import { Kbd, type KbdProps } from "./Kbd";

runComponentCases(kbdCases, (c) => <Kbd {...(c.props as KbdProps)}>{c.children}</Kbd>);
