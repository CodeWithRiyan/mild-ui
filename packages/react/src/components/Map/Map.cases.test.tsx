import * as React from "react";
import { mapCases } from "@mild-ui/test-cases/map";
import { runComponentCases } from "../../test-utils/run-cases";
import { Map, type MapProps } from "./Map";

runComponentCases(mapCases, (c) => <Map {...(c.props as MapProps)}>{c.children}</Map>);
