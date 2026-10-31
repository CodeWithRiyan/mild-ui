import * as React from "react";
import { cardCases } from "@mild-ui/test-cases/card";
import { runComponentCases } from "../../test-utils/run-cases";
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardProps,
} from "./Card";

runComponentCases(cardCases, (c) => (
  <Card {...(c.props as CardProps)}>
    <CardHeader>
      <CardTitle>Card title</CardTitle>
      <CardDescription>Card description</CardDescription>
    </CardHeader>
    <CardBody>Card body</CardBody>
    <CardFooter>Card footer</CardFooter>
  </Card>
));
