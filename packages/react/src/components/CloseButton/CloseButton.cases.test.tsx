import * as React from "react";
import { closeButtonCases } from "@mild-ui/test-cases/close-button";
import { runComponentCases } from "../../test-utils/run-cases";
import { CloseButton, type CloseButtonProps } from "./CloseButton";

runComponentCases(closeButtonCases, (c) => <CloseButton {...(c.props as CloseButtonProps)} />);
