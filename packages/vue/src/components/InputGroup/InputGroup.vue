<!-- packages/vue/src/components/InputGroup/InputGroup.vue -->
<script lang="ts">
import {
  Fragment,
  computed,
  defineComponent,
  h,
  isVNode,
  type PropType,
  type VNode,
  type VNodeArrayChildren,
} from "vue";
import { cn } from "../../utils/cn";
import { provideInputGroup } from "./context";
import InputAddon from "./InputAddon.vue";
import InputElement from "./InputElement.vue";
import InputLeftAddon from "./InputLeftAddon.vue";
import InputRightAddon from "./InputRightAddon.vue";
import InputLeftElement from "./InputLeftElement.vue";
import InputRightElement from "./InputRightElement.vue";
import type { InputGroupPlacement, InputGroupSize } from "../../types/input-group";

interface Sides {
  leftAddon: boolean;
  rightAddon: boolean;
  leftElement: boolean;
  rightElement: boolean;
}

function flatten(children: VNodeArrayChildren): VNode[] {
  const result: VNode[] = [];
  for (const child of children) {
    if (!isVNode(child)) continue;
    if (child.type === Fragment && Array.isArray(child.children)) {
      result.push(...flatten(child.children));
    } else {
      result.push(child);
    }
  }
  return result;
}

/** Which sides carry an addon / element, read from the slot's vnodes. */
function detectSides(children: VNode[]): Sides {
  const sides: Sides = {
    leftAddon: false,
    rightAddon: false,
    leftElement: false,
    rightElement: false,
  };
  for (const child of children) {
    const placement =
      (child.props as { placement?: InputGroupPlacement } | null)?.placement ?? "left";
    switch (child.type) {
      case InputLeftAddon:
        sides.leftAddon = true;
        break;
      case InputRightAddon:
        sides.rightAddon = true;
        break;
      case InputAddon:
        sides[placement === "left" ? "leftAddon" : "rightAddon"] = true;
        break;
      case InputLeftElement:
        sides.leftElement = true;
        break;
      case InputRightElement:
        sides.rightElement = true;
        break;
      case InputElement:
        sides[placement === "left" ? "leftElement" : "rightElement"] = true;
        break;
      default:
        break;
    }
  }
  return sides;
}

/**
 * Wraps an `Input` with addons (`InputLeftAddon` / `InputRightAddon`: flush blocks outside the
 * field, e.g. "https://") and elements (`InputLeftElement` / `InputRightElement`: icons or
 * buttons inside it). The group shares its `size` with the input and makes room for the parts.
 * Inside a `FormField` the field wiring (`id`, `name`, `required`) passes through to the input.
 *
 * A render function rather than a template: which sides carry a part is read from the slot's
 * vnodes on every render.
 */
export default defineComponent({
  name: "InputGroup",
  props: {
    size: { type: String as PropType<InputGroupSize>, default: "md" },
    inline: { type: Boolean, default: false },
    id: { type: String, default: undefined },
    name: { type: String, default: undefined },
    required: { type: Boolean, default: undefined },
  },
  setup(props, { slots }) {
    provideInputGroup({
      size: computed(() => props.size),
      id: computed(() => props.id),
      name: computed(() => props.name),
      required: computed(() => props.required),
    });

    return () => {
      const children = flatten(slots.default?.() ?? []);
      const sides = detectSides(children);
      return h(
        "div",
        {
          class: cn(
            "mild-input-group",
            `mild-input-group--${props.size}`,
            props.inline && "mild-input-group--inline",
            sides.leftAddon && "mild-input-group--has-left-addon",
            sides.rightAddon && "mild-input-group--has-right-addon",
            sides.leftElement && "mild-input-group--has-left-element",
            sides.rightElement && "mild-input-group--has-right-element",
          ),
        },
        children,
      );
    };
  },
});
</script>
