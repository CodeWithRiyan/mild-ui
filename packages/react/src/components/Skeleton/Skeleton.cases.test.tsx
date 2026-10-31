import * as React from "react";
import { skeletonCases } from "@mild-ui/test-cases/skeleton";
import { runComponentCases } from "../../test-utils/run-cases";
import { Skeleton, type SkeletonProps } from "./Skeleton";

runComponentCases(skeletonCases, (c) => (
  <Skeleton {...(c.props as SkeletonProps)}>{c.children}</Skeleton>
));
