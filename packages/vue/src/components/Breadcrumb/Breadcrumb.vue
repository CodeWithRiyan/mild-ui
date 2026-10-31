<!-- packages/vue/src/components/Breadcrumb/Breadcrumb.vue -->
<script lang="ts">
import {
  Comment,
  Fragment,
  Text,
  defineComponent,
  h,
  isVNode,
  type PropType,
  type VNode,
  type VNodeArrayChildren,
} from "vue";
import { cn } from "../../utils/cn";
import BreadcrumbItem from "./BreadcrumbItem.vue";
import BreadcrumbLink from "./BreadcrumbLink.vue";
import BreadcrumbSeparator from "./BreadcrumbSeparator.vue";
import type { BreadcrumbItemData, BreadcrumbUiClasses } from "../../types/breadcrumb";

/** The element/component vnodes of a slot: fragments flattened, comments and whitespace dropped. */
function steps(children: VNodeArrayChildren): VNode[] {
  const result: VNode[] = [];
  for (const child of children) {
    if (!isVNode(child)) continue;
    if (child.type === Fragment && Array.isArray(child.children)) {
      result.push(...steps(child.children));
    } else if (child.type !== Comment && !(child.type === Text && !String(child.children).trim())) {
      result.push(child);
    }
  }
  return result;
}

/**
 * Trail of links to the current page (`nav > ol`), with decorative separators inserted
 * between the steps. Pass `items` for the common case, or compose `BreadcrumbItem` /
 * `BreadcrumbLink` children yourself.
 *
 * A render function rather than a template: the separators go between whatever the slot
 * renders, which means reading the slot's vnodes.
 */
export default defineComponent({
  name: "Breadcrumb",
  props: {
    as: { type: String, default: "nav" },
    items: { type: Array as PropType<BreadcrumbItemData[]>, default: undefined },
    separator: { type: String, default: "/" },
    ui: { type: Object as PropType<BreadcrumbUiClasses>, default: undefined },
  },
  setup(props, { slots }) {
    function renderItem(item: BreadcrumbItemData, isLast: boolean): VNode {
      // The last step is the current page unless it links somewhere, or it says otherwise.
      const current = item.current ?? (isLast && !item.href);
      return h(BreadcrumbItem, { key: `${item.label}-${item.href ?? ""}` }, () =>
        h(BreadcrumbLink, { current, href: current ? undefined : item.href }, () => item.label),
      );
    }

    return () => {
      const list = props.items
        ? props.items.map((item, index) => renderItem(item, index === props.items!.length - 1))
        : steps(slots.default?.() ?? []);

      const children: VNode[] = [];
      list.forEach((step, index) => {
        if (index > 0) {
          children.push(
            h(BreadcrumbSeparator, { key: `separator-${index}`, class: props.ui?.separator }, () =>
              slots.separator ? slots.separator() : props.separator,
            ),
          );
        }
        children.push(step);
      });

      return h(
        props.as,
        // Several navigations can share a page, so the trail names itself.
        { class: "mild-breadcrumb", "aria-label": "Breadcrumb" },
        [h("ol", { class: cn("mild-breadcrumb__list", props.ui?.list) }, children)],
      );
    };
  },
});
</script>
