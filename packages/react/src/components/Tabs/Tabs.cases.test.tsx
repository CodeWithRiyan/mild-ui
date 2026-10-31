import * as React from "react";
import { tabsCases } from "@mild-ui/test-cases/tabs";
import { runComponentCases } from "../../test-utils/run-cases";
import { Tabs, TabsContent, TabsList, TabsTrigger, type TabsProps } from "./Tabs";

runComponentCases(tabsCases, (c) => (
  <Tabs {...(c.props as TabsProps)}>
    <TabsList>
      <TabsTrigger value="one">One</TabsTrigger>
      <TabsTrigger value="two">Two</TabsTrigger>
    </TabsList>
    <TabsContent value="one">Panel one</TabsContent>
    <TabsContent value="two">Panel two</TabsContent>
  </Tabs>
));
