import * as React from "react";
import { accordionCases } from "@mild-ui/test-cases/accordion";
import { runComponentCases } from "../../test-utils/run-cases";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  type AccordionProps,
} from "./Accordion";

runComponentCases(accordionCases, (c) => (
  <Accordion {...(c.props as AccordionProps)}>
    <AccordionItem value="a">
      <AccordionTrigger>Item A</AccordionTrigger>
      <AccordionContent>Body A</AccordionContent>
    </AccordionItem>
    <AccordionItem value="b">
      <AccordionTrigger>Item B</AccordionTrigger>
      <AccordionContent>Body B</AccordionContent>
    </AccordionItem>
  </Accordion>
));
