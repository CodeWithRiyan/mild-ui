import * as React from "react";
import { aspectRatioCases } from "@mild-ui/test-cases/aspect-ratio";
import { runComponentCases } from "../../test-utils/run-cases";
import { AspectRatio, type AspectRatioProps } from "./AspectRatio";

runComponentCases(aspectRatioCases, (c) => (
  <AspectRatio {...(c.props as AspectRatioProps)}>{c.children}</AspectRatio>
));
