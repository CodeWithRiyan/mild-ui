// packages/vue/src/test-utils/render.ts
import { defineComponent, type Component, type VNode, type VNodeChild } from "vue";

/** Wraps a render-function body in a component, so `render()` can mount ad-hoc trees. */
export function asComponent(create: () => VNode | VNodeChild[]): Component {
  return defineComponent({
    name: "TestHarness",
    setup: () => create,
  });
}
