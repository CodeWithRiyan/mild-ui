// packages/vue/src/test-setup.ts
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/vue";
import { afterEach } from "vitest";

// Testing Library only auto-cleans when test globals are on; this project keeps them off.
afterEach(() => cleanup());
