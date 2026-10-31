import * as React from "react";
import { imageCases } from "@mild-ui/test-cases/image";
import { runComponentCases } from "../../test-utils/run-cases";
import { Image, type ImageProps } from "./Image";

runComponentCases(imageCases, (c) => <Image {...(c.props as ImageProps)}>{c.children}</Image>);
