import * as React from "react";
import { iconButtonCases } from "@mild-ui/test-cases/icon-button";
import { runComponentCases } from "../../test-utils/run-cases";
import { IconButton, type IconButtonProps } from "./IconButton";

runComponentCases(iconButtonCases, (c) => (
  <IconButton icon={<svg data-testid="glyph" />} {...(c.props as IconButtonProps)} />
));
