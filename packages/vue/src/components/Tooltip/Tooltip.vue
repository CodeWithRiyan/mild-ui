<!-- packages/vue/src/components/Tooltip/Tooltip.vue -->
<script lang="ts">
import {
  Comment,
  Fragment,
  Text,
  cloneVNode,
  computed,
  defineComponent,
  h,
  isVNode,
  mergeProps,
  ref,
  type ComponentPublicInstance,
  type PropType,
  type VNode,
  type VNodeArrayChildren,
} from "vue";
import { createTooltip } from "@mild-ui/primitives/tooltip";
import { cn } from "../../utils/cn";
import { useMachine } from "../../composables/useMachine";
import { useId } from "../../composables/useId";
import type { TooltipPlacement } from "../../types/tooltip";

/** The single element/component vnode of the slot: fragments flattened, whitespace dropped. */
function onlyChild(children: VNodeArrayChildren): VNode {
  const elements: VNode[] = [];
  const walk = (nodes: VNodeArrayChildren) => {
    for (const child of nodes) {
      if (!isVNode(child)) continue;
      if (child.type === Fragment && Array.isArray(child.children)) walk(child.children);
      else if (child.type !== Comment && !(child.type === Text && !String(child.children).trim()))
        elements.push(child);
    }
  };
  walk(children);
  if (elements.length !== 1) throw new Error("<Tooltip> expects exactly one child element");
  return elements[0];
}

/**
 * Describes its child with a small bubble (`role="tooltip"`, linked through
 * `aria-describedby`). Shows on hover after a delay and on keyboard focus at once; hides on
 * leave, blur or Escape. The bubble stays in the DOM so the description is always available.
 *
 * A render function rather than a template: the trigger is the slot's single child, cloned
 * with a ref so the primitive can be bound to it.
 */
export default defineComponent({
  name: "Tooltip",
  // Attributes (class, style) go on the bubble, not the anchor around the trigger.
  inheritAttrs: false,
  props: {
    label: { type: String, default: undefined },
    placement: { type: String as PropType<TooltipPlacement>, default: "top" },
    openDelay: { type: Number, default: 300 },
    closeDelay: { type: Number, default: 100 },
    disabled: { type: Boolean, default: false },
    multiline: { type: Boolean, default: false },
    id: { type: String, default: undefined },
  },
  setup(props, { slots, attrs }) {
    const tooltipId = props.id ?? `${useId()}-tooltip`;
    const open = ref(false);
    const trigger = ref<HTMLElement | null>(null);
    const bubble = ref<HTMLElement | null>(null);

    // The machine is bound to the bubble (rendered after the child, so the trigger ref is set).
    useMachine(
      bubble,
      (element, options) =>
        createTooltip({ trigger: trigger.value ?? element, tooltip: element, ...options }),
      () => ({
        openDelay: props.openDelay,
        closeDelay: props.closeDelay,
        onOpenChange: (next: boolean) => {
          open.value = next;
        },
      }),
      // `setOpen` cancels a pending show/hide, so only push state that actually differs.
      (instance) => {
        if (instance.isOpen() !== open.value) instance.setOpen(open.value);
      },
      () => [props.openDelay, props.closeDelay],
    );

    function setTrigger(value: Element | ComponentPublicInstance | null): void {
      const element = value instanceof Element ? value : (value?.$el ?? null);
      trigger.value = element instanceof HTMLElement ? element : null;
    }

    const classes = computed(() =>
      cn(
        "mild-tooltip",
        `mild-tooltip--${props.placement}`,
        props.multiline && "mild-tooltip--multiline",
      ),
    );

    return () => {
      const child = onlyChild(slots.default?.() ?? []);
      if (props.disabled) return child;
      return h("span", { class: "mild-tooltip-anchor" }, [
        cloneVNode(child, { ref: setTrigger }, true),
        h(
          "span",
          mergeProps(
            {
              ref: bubble,
              id: tooltipId,
              role: "tooltip",
              hidden: !open.value,
              "data-state": open.value ? "open" : "closed",
              "data-placement": props.placement,
              class: classes.value,
            },
            attrs,
          ),
          slots.label ? slots.label() : props.label,
        ),
      ]);
    };
  },
});
</script>
