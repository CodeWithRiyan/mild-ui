import{j as e,M as r}from"./index-BmJKa--t.js";import{useMDXComponents as s}from"./index-BEa19RWs.js";import"./iframe-UJbJ1XJN.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-DcSkslog.js";import"./index-DrFu-skq.js";function t(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Introduction"}),`
`,e.jsx(n.h1,{id:"welcome-to-mild-ui-vue",children:"Welcome to mild-ui Vue"}),`
`,e.jsx(n.p,{children:"mild-ui is a cross-framework UI component library inspired by the copy-paste approach of shadcn/ui, extended to work across React and Vue."}),`
`,e.jsx(n.h2,{id:"getting-started",children:"Getting Started"}),`
`,e.jsx(n.p,{children:"Components are designed to be copied into your project rather than imported as dependencies. Use our CLI tool to add components:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`# Install the CLI globally
npm install -g @mild-ui/cli

# Add components to your project
mild-ui add button --framework=vue
mild-ui add input --framework=vue
`})}),`
`,e.jsx(n.h2,{id:"features",children:"Features"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Cross-framework compatibility"}),": Works with React and Vue"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Framework-agnostic core"}),": Consistent design and behavior"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tailwind CSS"}),": Modern utility-first styling"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Accessibility"}),": Built with accessibility in mind"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"TypeScript"}),": Full TypeScript support"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Vue 3 Composition API"}),": Modern Vue development patterns"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Customizable"}),": Easy theming and customization"]}),`
`]}),`
`,e.jsx(n.h2,{id:"vue-specific-features",children:"Vue-Specific Features"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Composition API support"}),": Built with Vue 3 Composition API"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Script setup syntax"}),": Modern single-file component structure"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"v-model integration"}),": Proper two-way data binding"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Slot-based architecture"}),": Flexible content projection"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Reactive props"}),": Full reactivity with Vue's reactive system"]}),`
`]}),`
`,e.jsx(n.h2,{id:"available-components",children:"Available Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Button"}),": Primary, secondary, outline, and ghost variants with icon support"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Input"}),": Text input with validation states and v-model support"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Checkbox"}),": Checkbox with indeterminate state support"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Radio"}),": Radio buttons and radio groups"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Select"}),": Dropdown select with search and multi-select capabilities"]}),`
`]}),`
`,e.jsx(n.h2,{id:"usage-example",children:"Usage Example"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
  <div>
    <Button @click="handleClick">
      <template #leading-icon>
        <PlusIcon />
      </template>
      Add Item
    </Button>

    <Input v-model="inputValue" placeholder="Enter text..." :error="hasError" />

    <Checkbox v-model="isChecked" label="Accept terms" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Button, Input, Checkbox } from "./components";
import { PlusIcon } from "lucide-vue-next";

const inputValue = ref("");
const isChecked = ref(false);
const hasError = ref(false);

const handleClick = () => {
  console.log("Button clicked!");
};
<\/script>
`})}),`
`,e.jsx(n.h2,{id:"explore-the-components",children:"Explore the Components"}),`
`,e.jsx(n.p,{children:"Navigate through the sidebar to explore all available Vue components, their variants, and interactive examples."}),`
`,e.jsx(n.h2,{id:"resources",children:"Resources"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/codewithriyan/mild-ui",rel:"nofollow",children:"GitHub Repository"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://vuejs.org/",rel:"nofollow",children:"Vue Documentation"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/codewithriyan/mild-ui/tree/main/packages/cli",rel:"nofollow",children:"CLI Usage Guide"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"../react/",children:"React Storybook"})}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.p,{children:"Built with ❤️ for the Vue community"})]})}function u(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{u as default};
