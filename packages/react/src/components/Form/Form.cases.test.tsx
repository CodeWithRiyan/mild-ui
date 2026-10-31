import * as React from "react";
import { formCases } from "@mild-ui/test-cases/form";
import { runComponentCases } from "../../test-utils/run-cases";
import { FormField, type FormFieldProps } from "./Form";
import { Input } from "../Input";

// Form cases describe one <FormField> around an <Input>; `case.props` are the FormField props.
runComponentCases(formCases, (c) => (
  <FormField {...(c.props as Omit<FormFieldProps, "children">)}>
    <Input />
  </FormField>
));
