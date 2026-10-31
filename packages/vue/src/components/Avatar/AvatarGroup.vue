<!-- packages/vue/src/components/Avatar/AvatarGroup.vue -->
<script lang="ts">
import {
  Comment,
  Fragment,
  Text,
  computed,
  defineComponent,
  h,
  isVNode,
  type PropType,
  type VNode,
  type VNodeArrayChildren,
} from "vue";
import { cn } from "../../utils/cn";
import { getSpacingValue } from "../../utils/styling";
import { provideAvatarGroup } from "./context";
import Avatar from "./Avatar.vue";
import type { AvatarSize } from "../../types/data-display";
import type { SpaceToken } from "../../types/tokens";

/** The element/component vnodes of the slot: fragments flattened, comments and whitespace dropped. */
function flatten(children: VNodeArrayChildren): VNode[] {
  const result: VNode[] = [];
  for (const child of children) {
    if (!isVNode(child)) continue;
    if (child.type === Fragment && Array.isArray(child.children)) {
      result.push(...flatten(child.children));
    } else if (child.type !== Comment && !(child.type === Text && !String(child.children).trim())) {
      result.push(child);
    }
  }
  return result;
}

/**
 * Overlapping avatars. Beyond `max`, the remaining ones are replaced by a "+N" avatar. The
 * group hands its `size` to the avatars inside.
 *
 * A render function rather than a template: the avatars beyond `max` are counted and dropped
 * from the slot's vnodes.
 */
export default defineComponent({
  name: "AvatarGroup",
  props: {
    max: { type: Number, default: undefined },
    size: { type: String as PropType<AvatarSize>, default: undefined },
    overlap: { type: String as PropType<SpaceToken>, default: "3" },
    overflowLabel: {
      type: Function as PropType<(count: number) => string>,
      default: (count: number) => `${count} more`,
    },
  },
  setup(props, { slots }) {
    provideAvatarGroup({ size: computed(() => props.size) });

    return () => {
      const all = flatten(slots.default?.() ?? []);
      const limit = props.max !== undefined && props.max >= 0 ? props.max : all.length;
      const shown = all.slice(0, limit);
      const hidden = all.length - shown.length;
      return h(
        "div",
        {
          role: "group",
          class: "mild-avatar-group",
          style: { "--mild-avatar-group-overlap": getSpacingValue(props.overlap) },
        },
        [
          ...shown,
          hidden > 0
            ? h(Avatar, {
                class: cn("mild-avatar-group__overflow"),
                name: props.overflowLabel(hidden),
                fallback: `+${hidden}`,
                size: props.size,
                "data-overflow": "",
              })
            : null,
        ],
      );
    };
  },
});
</script>
