// packages/react/src/react-version.test.ts
// Guard for the React version matrix: makes sure a matrix leg really runs on the
// React major it claims to (see scripts/test-react-matrix.mjs, which sets
// MILD_REACT_MAJOR). Outside the matrix it just pins the supported range.
import * as React from "react";
import { version as reactDomVersion } from "react-dom";
import { describe, expect, it } from "vitest";

const SUPPORTED_MAJORS = ["18", "19"];
const major = (version: string) => version.split(".")[0];

describe("React runtime", () => {
  it("runs on a supported React major", () => {
    expect(SUPPORTED_MAJORS).toContain(major(React.version));
  });

  it("uses matching react and react-dom majors", () => {
    expect(major(reactDomVersion)).toBe(major(React.version));
  });

  it("matches the major requested by the matrix", () => {
    const requested = process.env.MILD_REACT_MAJOR;
    if (!requested) return; // plain `pnpm test` run
    expect(major(React.version)).toBe(requested);
  });
});
