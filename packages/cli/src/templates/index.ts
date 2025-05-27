import { getReactTemplates } from "./react";
import { getVueTemplates } from "./vue";
import { getSvelteTemplates } from "./svelte";

type Templates = Record<string, string>;

export function getTemplateForComponent(
  component: string,
  framework: string,
  typescript: boolean,
): Templates {
  switch (framework) {
    case "react":
      return getReactTemplates(component, typescript);
    case "vue":
      return getVueTemplates(component, typescript);
    case "svelte":
      return getSvelteTemplates(component, typescript);
    default:
      throw new Error(`Framework '${framework}' is not supported.`);
  }
}
