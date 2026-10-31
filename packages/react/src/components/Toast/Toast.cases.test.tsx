import * as React from "react";
import { toastCases } from "@mild-ui/test-cases/toast";
import { runComponentCases } from "../../test-utils/run-cases";
import { Toast, type ToastProps } from "./Toast";

runComponentCases(toastCases, (c) => <Toast {...(c.props as ToastProps)}>{c.children}</Toast>);
