import{j as n}from"./jsx-runtime-DF2Pcvd1.js";import{r as w}from"./index-B2-qRKKC.js";import{B as e}from"./Button-tFE5omYn.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cn-Dtjc6EhN.js";const a=()=>n.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:n.jsx("path",{d:"m9 18 6-6-6-6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),s=()=>n.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:[n.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),n.jsx("polyline",{points:"7,10 12,15 17,10",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),n.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]}),I=()=>n.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:n.jsx("path",{d:"M12 5v14M5 12h14",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),S=()=>n.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",className:"animate-spin",children:[n.jsx("circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4",className:"opacity-25"}),n.jsx("path",{d:"m12 2a10 10 0 0 1 10 10",stroke:"currentColor",strokeWidth:"4",className:"opacity-75"})]}),G={title:"Components/Button",component:e,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A versatile button component with multiple variants, sizes, and icon support."}}},argTypes:{variant:{control:"select",options:["primary","secondary","outline","ghost"]},size:{control:"select",options:["sm","md","lg"]},disabled:{control:"boolean"},onClick:{action:"clicked"}}},i={args:{children:"Button"}},l={args:{variant:"primary",children:"Primary Button"}},c={args:{variant:"secondary",children:"Secondary Button"}},d={args:{variant:"outline",children:"Outline Button"}},u={args:{variant:"ghost",children:"Ghost Button"}},m={args:{children:"Disabled Button",disabled:!0}},x={render:()=>n.jsxs("div",{className:"flex flex-wrap gap-4",children:[n.jsx(e,{variant:"primary",children:"Primary"}),n.jsx(e,{variant:"secondary",children:"Secondary"}),n.jsx(e,{variant:"outline",children:"Outline"}),n.jsx(e,{variant:"ghost",children:"Ghost"})]})},h={render:()=>n.jsxs("div",{className:"flex flex-col gap-4",children:[n.jsxs("div",{className:"flex items-center gap-4",children:[n.jsx(e,{size:"sm",children:"Small"}),n.jsx(e,{size:"md",children:"Medium"}),n.jsx(e,{size:"lg",children:"Large"})]}),n.jsxs("div",{className:"flex items-center gap-4",children:[n.jsx(e,{variant:"outline",size:"sm",children:"Small"}),n.jsx(e,{variant:"outline",size:"md",children:"Medium"}),n.jsx(e,{variant:"outline",size:"lg",children:"Large"})]})]})},p={render:()=>n.jsxs("div",{className:"flex flex-wrap gap-4",children:[n.jsx(e,{leadingIcon:n.jsx(I,{}),children:"Add Item"}),n.jsx(e,{variant:"secondary",leadingIcon:n.jsx(s,{}),children:"Download"}),n.jsx(e,{variant:"outline",leadingIcon:n.jsx(a,{}),children:"Continue"})]})},g={render:()=>n.jsxs("div",{className:"flex flex-wrap gap-4",children:[n.jsx(e,{trailingIcon:n.jsx(a,{}),children:"Next"}),n.jsx(e,{variant:"secondary",trailingIcon:n.jsx(s,{}),children:"Export"}),n.jsx(e,{variant:"outline",trailingIcon:n.jsx(a,{}),children:"Learn More"})]})},v={render:()=>n.jsxs("div",{className:"flex flex-wrap gap-4",children:[n.jsx(e,{leadingIcon:n.jsx(I,{}),trailingIcon:n.jsx(a,{}),children:"Add & Continue"}),n.jsx(e,{variant:"outline",leadingIcon:n.jsx(s,{}),trailingIcon:n.jsx(a,{}),children:"Download & Next"})]})},B={render:()=>{const[t,o]=w.useState(null),r=C=>{o(C),setTimeout(()=>o(null),2e3)};return n.jsxs("div",{className:"flex flex-wrap gap-4",children:[n.jsx(e,{onClick:()=>r("primary"),disabled:t==="primary",leadingIcon:t==="primary"?n.jsx(S,{}):void 0,children:t==="primary"?"Processing...":"Submit"}),n.jsx(e,{variant:"secondary",onClick:()=>r("secondary"),disabled:t==="secondary",leadingIcon:t==="secondary"?n.jsx(S,{}):n.jsx(s,{}),children:t==="secondary"?"Downloading...":"Download"}),n.jsx(e,{variant:"outline",onClick:()=>r("outline"),disabled:t==="outline",trailingIcon:t==="outline"?n.jsx(S,{}):n.jsx(a,{}),children:t==="outline"?"Loading...":"Continue"})]})}},j={render:()=>n.jsxs("div",{className:"flex flex-wrap gap-4",children:[n.jsx(e,{asChild:!0,children:n.jsx("a",{href:"#",role:"button",children:"Link as Button"})}),n.jsx(e,{variant:"outline",asChild:!0,children:n.jsx("a",{href:"#external",target:"_blank",rel:"noopener noreferrer",role:"button",children:"External Link"})})]})},f={render:()=>{const[t,o]=w.useState(0),[r,C]=w.useState(""),N=b=>{o(L=>L+1),C(b)};return n.jsxs("div",{className:"space-y-4",children:[n.jsxs("div",{className:"flex flex-wrap gap-4",children:[n.jsx(e,{onClick:()=>N("Primary"),children:"Primary Action"}),n.jsx(e,{variant:"secondary",onClick:()=>N("Secondary"),children:"Secondary Action"}),n.jsx(e,{variant:"outline",onClick:()=>N("Outline"),leadingIcon:n.jsx(I,{}),children:"Add Item"})]}),n.jsxs("div",{className:"text-sm text-gray-600",children:[n.jsxs("p",{children:["Total clicks: ",t]}),n.jsxs("p",{children:["Last clicked: ",r||"None"]})]})]})}},y={render:()=>n.jsxs("div",{className:"space-y-6",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"text-sm font-medium mb-2",children:"Action Group"}),n.jsxs("div",{className:"flex gap-2",children:[n.jsx(e,{size:"sm",children:"Save"}),n.jsx(e,{variant:"outline",size:"sm",children:"Cancel"})]})]}),n.jsxs("div",{children:[n.jsx("h3",{className:"text-sm font-medium mb-2",children:"Navigation"}),n.jsxs("div",{className:"flex gap-2",children:[n.jsx(e,{variant:"ghost",size:"sm",children:"← Previous"}),n.jsx(e,{size:"sm",children:"Next →"})]})]}),n.jsxs("div",{children:[n.jsx("h3",{className:"text-sm font-medium mb-2",children:"Toolbar"}),n.jsxs("div",{className:"flex gap-1",children:[n.jsx(e,{variant:"ghost",size:"sm",leadingIcon:n.jsx(I,{}),children:"New"}),n.jsx(e,{variant:"ghost",size:"sm",leadingIcon:n.jsx(s,{}),children:"Export"}),n.jsx(e,{variant:"ghost",size:"sm",children:"Settings"})]})]})]})},k={render:()=>n.jsxs("div",{className:"space-y-4 w-full max-w-md",children:[n.jsx(e,{className:"w-full",children:"Full Width Button"}),n.jsx(e,{variant:"outline",className:"w-full",leadingIcon:n.jsx(s,{}),children:"Full Width with Icon"}),n.jsxs("div",{className:"flex gap-2",children:[n.jsx(e,{className:"flex-1",children:"Flexible"}),n.jsx(e,{variant:"outline",className:"flex-1",children:"Flexible"})]})]})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Button"
  }
} satisfies Story`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "primary",
    children: "Primary Button"
  }
} satisfies Story`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "secondary",
    children: "Secondary Button"
  }
} satisfies Story`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "outline",
    children: "Outline Button"
  }
} satisfies Story`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "ghost",
    children: "Ghost Button"
  }
} satisfies Story`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Disabled Button",
    disabled: true
  }
} satisfies Story`,...m.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
} satisfies Story`,...x.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          Small
        </Button>
        <Button variant="outline" size="md">
          Medium
        </Button>
        <Button variant="outline" size="lg">
          Large
        </Button>
      </div>
    </div>
} satisfies Story`,...h.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      <Button leadingIcon={<PlusIcon />}>Add Item</Button>
      <Button variant="secondary" leadingIcon={<DownloadIcon />}>
        Download
      </Button>
      <Button variant="outline" leadingIcon={<ChevronRightIcon />}>
        Continue
      </Button>
    </div>
} satisfies Story`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      <Button trailingIcon={<ChevronRightIcon />}>Next</Button>
      <Button variant="secondary" trailingIcon={<DownloadIcon />}>
        Export
      </Button>
      <Button variant="outline" trailingIcon={<ChevronRightIcon />}>
        Learn More
      </Button>
    </div>
} satisfies Story`,...g.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      <Button leadingIcon={<PlusIcon />} trailingIcon={<ChevronRightIcon />}>
        Add & Continue
      </Button>
      <Button variant="outline" leadingIcon={<DownloadIcon />} trailingIcon={<ChevronRightIcon />}>
        Download & Next
      </Button>
    </div>
} satisfies Story`,...v.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [loading, setLoading] = useState<string | null>(null);
    const handleClick = (buttonId: string) => {
      setLoading(buttonId);
      setTimeout(() => setLoading(null), 2000);
    };
    return <div className="flex flex-wrap gap-4">
        <Button onClick={() => handleClick("primary")} disabled={loading === "primary"} leadingIcon={loading === "primary" ? <LoadingIcon /> : undefined}>
          {loading === "primary" ? "Processing..." : "Submit"}
        </Button>

        <Button variant="secondary" onClick={() => handleClick("secondary")} disabled={loading === "secondary"} leadingIcon={loading === "secondary" ? <LoadingIcon /> : <DownloadIcon />}>
          {loading === "secondary" ? "Downloading..." : "Download"}
        </Button>

        <Button variant="outline" onClick={() => handleClick("outline")} disabled={loading === "outline"} trailingIcon={loading === "outline" ? <LoadingIcon /> : <ChevronRightIcon />}>
          {loading === "outline" ? "Loading..." : "Continue"}
        </Button>
      </div>;
  }
} satisfies Story`,...B.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      <Button asChild>
        <a href="#" role="button">
          Link as Button
        </a>
      </Button>
      <Button variant="outline" asChild>
        <a href="#external" target="_blank" rel="noopener noreferrer" role="button">
          External Link
        </a>
      </Button>
    </div>
} satisfies Story`,...j.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [clickCount, setClickCount] = useState(0);
    const [lastClicked, setLastClicked] = useState<string>("");
    const handleClick = (buttonName: string) => {
      setClickCount(prev => prev + 1);
      setLastClicked(buttonName);
    };
    return <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => handleClick("Primary")}>Primary Action</Button>
          <Button variant="secondary" onClick={() => handleClick("Secondary")}>
            Secondary Action
          </Button>
          <Button variant="outline" onClick={() => handleClick("Outline")} leadingIcon={<PlusIcon />}>
            Add Item
          </Button>
        </div>

        <div className="text-sm text-gray-600">
          <p>Total clicks: {clickCount}</p>
          <p>Last clicked: {lastClicked || "None"}</p>
        </div>
      </div>;
  }
} satisfies Story`,...f.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Action Group</h3>
        <div className="flex gap-2">
          <Button size="sm">Save</Button>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Navigation</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            ← Previous
          </Button>
          <Button size="sm">Next →</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Toolbar</h3>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" leadingIcon={<PlusIcon />}>
            New
          </Button>
          <Button variant="ghost" size="sm" leadingIcon={<DownloadIcon />}>
            Export
          </Button>
          <Button variant="ghost" size="sm">
            Settings
          </Button>
        </div>
      </div>
    </div>
} satisfies Story`,...y.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 w-full max-w-md">
      <Button className="w-full">Full Width Button</Button>
      <Button variant="outline" className="w-full" leadingIcon={<DownloadIcon />}>
        Full Width with Icon
      </Button>
      <div className="flex gap-2">
        <Button className="flex-1">Flexible</Button>
        <Button variant="outline" className="flex-1">
          Flexible
        </Button>
      </div>
    </div>
} satisfies Story`,...k.parameters?.docs?.source}}};const R=["Default","Primary","Secondary","Outline","Ghost","Disabled","AllVariants","AllSizes","WithLeadingIcon","WithTrailingIcon","WithBothIcons","LoadingStates","AsChild","ClickHandlers","ButtonGroup","ResponsiveButtons"];export{h as AllSizes,x as AllVariants,j as AsChild,y as ButtonGroup,f as ClickHandlers,i as Default,m as Disabled,u as Ghost,B as LoadingStates,d as Outline,l as Primary,k as ResponsiveButtons,c as Secondary,v as WithBothIcons,p as WithLeadingIcon,g as WithTrailingIcon,R as __namedExportsOrder,G as default};
