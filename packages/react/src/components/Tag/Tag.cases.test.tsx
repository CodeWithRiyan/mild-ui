import * as React from "react";
import { tagCases } from "@mild-ui/test-cases/tag";
import { runComponentCases } from "../../test-utils/run-cases";
import { Tag, type TagProps } from "./Tag";

runComponentCases(tagCases, (c) => {
  const { closable, ...props } = c.props as TagProps & { closable?: boolean };
  return (
    <Tag {...props} onClose={closable ? () => {} : undefined}>
      {c.children}
    </Tag>
  );
});
