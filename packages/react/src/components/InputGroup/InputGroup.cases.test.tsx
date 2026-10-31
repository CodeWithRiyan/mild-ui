import * as React from "react";
import { inputGroupCases } from "@mild-ui/test-cases/input-group";
import { runComponentCases } from "../../test-utils/run-cases";
import { Input } from "../Input";
import {
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  type InputGroupProps,
} from "./InputGroup";

type Part = "left-addon" | "right-addon" | "left-element" | "right-element";

runComponentCases(inputGroupCases, (c) => {
  const { parts, ...props } = c.props as InputGroupProps & { parts: Part[] };
  return (
    <InputGroup {...props}>
      {parts.includes("left-addon") && <InputLeftAddon>https://</InputLeftAddon>}
      {parts.includes("left-element") && <InputLeftElement>@</InputLeftElement>}
      <Input placeholder="site" />
      {parts.includes("right-element") && <InputRightElement>✓</InputRightElement>}
      {parts.includes("right-addon") && <InputRightAddon>.com</InputRightAddon>}
    </InputGroup>
  );
});
