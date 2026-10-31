import{j as e,M as o}from"./index-DeiZ5qjw.js";import{useMDXComponents as r}from"./index-BRyftzNl.js";import"./iframe-CcURSQ47.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CYg9OrUA.js";import"./index-Bhqu_tAV.js";function i(t){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Introduction"}),`
`,e.jsx(n.h1,{id:"mild-uivue",children:"@mild-ui/vue"}),`
`,e.jsxs(n.p,{children:["Vue 3 components for the mild-ui design system: styled by ",e.jsx(n.code,{children:"@mild-ui/core"}),`, driven by the
framework-agnostic `,e.jsx(n.code,{children:"@mild-ui/primitives"}),`, and mirrored one-to-one by
`,e.jsx(n.a,{href:"https://codewithriyan.github.io/mild-ui/react/",rel:"nofollow",children:e.jsx(n.code,{children:"@mild-ui/react"})}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install @mild-ui/vue @mild-ui/core
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<script setup lang="ts">
import "@mild-ui/core/mild-ui.css";
import { ThemeProvider, Button } from "@mild-ui/vue";
<\/script>

<template>
  <ThemeProvider>
    <Button>Get started</Button>
  </ThemeProvider>
</template>
`})}),`
`,e.jsx(n.h2,{id:"what-every-component-guarantees",children:"What every component guarantees"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Behaviour from the primitives."})," Roles, ",e.jsx(n.code,{children:"aria-*"}),` attributes and keyboard handling come from
`,e.jsx(n.code,{children:"@mild-ui/primitives"}),`, following the WAI-ARIA Authoring Practices patterns; every interactive
story links its pattern and the test that enforces it.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Server rendering."})," Every component renders with ",e.jsx(n.code,{children:"vue/server-renderer"}),` and hydrates without a
warning (Nuxt ready).`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Size budget."})," Each export is bundled on its own and gzipped; the budget is enforced in CI."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Theming."})," Light and dark modes through ",e.jsx(n.code,{children:"<html data-theme>"}),"; switch with the ",e.jsx(n.strong,{children:"Theme"}),` toolbar
above any story.`]}),`
`]}),`
`,e.jsx(n.h2,{id:"sections",children:"Sections"}),`
`,e.jsx(n.p,{children:`| Section      | Components                                                                                                                                                                    |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Components   | Button, ButtonGroup, IconButton, Checkbox, Radio, Switch, Select, SegmentedControl, Toggle, Input, InputGroup, InputPassword, Textarea, Label, Form, Text, Box, ThemeProvider |
| Layout       | Stack, Flex, Grid, Container, Divider, AspectRatio, ScrollArea                                                                                                                |
| Typography   | Heading, Link, Code, Kbd, List                                                                                                                                                |
| Navigation   | Breadcrumb                                                                                                                                                                    |
| Feedback     | Alert, Spinner, Progress, Skeleton, Toast                                                                                                                                     |
| Overlay      | Dialog, Tooltip                                                                                                                                                               |
| Disclosure   | Tabs, Accordion                                                                                                                                                               |
| Data Display | Card, Badge, Avatar, Image, Stat, Table                                                                                                                                       |`}),`
`,e.jsxs(n.p,{children:["Source and issues: ",e.jsx(n.a,{href:"https://github.com/CodeWithRiyan/mild-ui",rel:"nofollow",children:"github.com/CodeWithRiyan/mild-ui"}),"."]})]})}function m(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{m as default};
