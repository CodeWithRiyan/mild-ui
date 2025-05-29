var Dn=Object.defineProperty,An=Object.defineProperties;var Pn=Object.getOwnPropertyDescriptors;var A=Object.getOwnPropertySymbols;var Wn=Object.prototype.hasOwnProperty,Gn=Object.prototype.propertyIsEnumerable;var P=(o,i,s)=>i in o?Dn(o,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):o[i]=s,e=(o,i)=>{for(var s in i||(i={}))Wn.call(i,s)&&P(o,s,i[s]);if(A)for(var s of A(i))Gn.call(i,s)&&P(o,s,i[s]);return o},a=(o,i)=>An(o,Pn(i));import{j as r,a as n}from"./jsx-runtime-Cr617v10.js";import{r as D}from"./index-D2dH9QXU.js";import{B as t}from"./Button-iSO34TZv.js";import"./_commonjsHelpers-CDgoFxsB.js";import"./index-CJsXfnVD.js";import"./cn-ur_4nXRV.js";const l=()=>n("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:n("path",{d:"m9 18 6-6-6-6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),c=()=>r("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:[n("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),n("polyline",{points:"7,10 12,15 17,10",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),n("line",{x1:"12",y1:"15",x2:"12",y2:"3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]}),w=()=>n("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:n("path",{d:"M12 5v14M5 12h14",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),z=()=>r("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",className:"animate-spin",children:[n("circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4",className:"opacity-25"}),n("path",{d:"m12 2a10 10 0 0 1 10 10",stroke:"currentColor",strokeWidth:"4",className:"opacity-75"})]}),_n={title:"Components/Button",component:t,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A versatile button component with multiple variants, sizes, and icon support."}}},argTypes:{variant:{control:"select",options:["primary","secondary","outline","ghost"]},size:{control:"select",options:["sm","md","lg"]},disabled:{control:"boolean"},onClick:{action:"clicked"}}},d={args:{children:"Button"}},u={args:{variant:"primary",children:"Primary Button"}},m={args:{variant:"secondary",children:"Secondary Button"}},h={args:{variant:"outline",children:"Outline Button"}},p={args:{variant:"ghost",children:"Ghost Button"}},g={args:{children:"Disabled Button",disabled:!0}},v={render:()=>r("div",{className:"flex flex-wrap gap-4",children:[n(t,{variant:"primary",children:"Primary"}),n(t,{variant:"secondary",children:"Secondary"}),n(t,{variant:"outline",children:"Outline"}),n(t,{variant:"ghost",children:"Ghost"})]})},B={render:()=>r("div",{className:"flex flex-col gap-4",children:[r("div",{className:"flex items-center gap-4",children:[n(t,{size:"sm",children:"Small"}),n(t,{size:"md",children:"Medium"}),n(t,{size:"lg",children:"Large"})]}),r("div",{className:"flex items-center gap-4",children:[n(t,{variant:"outline",size:"sm",children:"Small"}),n(t,{variant:"outline",size:"md",children:"Medium"}),n(t,{variant:"outline",size:"lg",children:"Large"})]})]})},f={render:()=>r("div",{className:"flex flex-wrap gap-4",children:[n(t,{leadingIcon:n(w,{}),children:"Add Item"}),n(t,{variant:"secondary",leadingIcon:n(c,{}),children:"Download"}),n(t,{variant:"outline",leadingIcon:n(l,{}),children:"Continue"})]})},x={render:()=>r("div",{className:"flex flex-wrap gap-4",children:[n(t,{trailingIcon:n(l,{}),children:"Next"}),n(t,{variant:"secondary",trailingIcon:n(c,{}),children:"Export"}),n(t,{variant:"outline",trailingIcon:n(l,{}),children:"Learn More"})]})},y={render:()=>r("div",{className:"flex flex-wrap gap-4",children:[n(t,{leadingIcon:n(w,{}),trailingIcon:n(l,{}),children:"Add & Continue"}),n(t,{variant:"outline",leadingIcon:n(c,{}),trailingIcon:n(l,{}),children:"Download & Next"})]})},k={render:()=>{const[o,i]=D.useState(null),s=b=>{i(b),setTimeout(()=>i(null),2e3)};return r("div",{className:"flex flex-wrap gap-4",children:[n(t,{onClick:()=>s("primary"),disabled:o==="primary",leadingIcon:o==="primary"?n(z,{}):void 0,children:o==="primary"?"Processing...":"Submit"}),n(t,{variant:"secondary",onClick:()=>s("secondary"),disabled:o==="secondary",leadingIcon:o==="secondary"?n(z,{}):n(c,{}),children:o==="secondary"?"Downloading...":"Download"}),n(t,{variant:"outline",onClick:()=>s("outline"),disabled:o==="outline",trailingIcon:o==="outline"?n(z,{}):n(l,{}),children:o==="outline"?"Loading...":"Continue"})]})}},I={render:()=>r("div",{className:"flex flex-wrap gap-4",children:[n(t,{asChild:!0,children:n("a",{href:"#",role:"button",children:"Link as Button"})}),n(t,{variant:"outline",asChild:!0,children:n("a",{href:"#external",target:"_blank",rel:"noopener noreferrer",role:"button",children:"External Link"})})]})},C={render:()=>{const[o,i]=D.useState(0),[s,b]=D.useState(""),L=Ln=>{i(zn=>zn+1),b(Ln)};return r("div",{className:"space-y-4",children:[r("div",{className:"flex flex-wrap gap-4",children:[n(t,{onClick:()=>L("Primary"),children:"Primary Action"}),n(t,{variant:"secondary",onClick:()=>L("Secondary"),children:"Secondary Action"}),n(t,{variant:"outline",onClick:()=>L("Outline"),leadingIcon:n(w,{}),children:"Add Item"})]}),r("div",{className:"text-sm text-gray-600",children:[r("p",{children:["Total clicks: ",o]}),r("p",{children:["Last clicked: ",s||"None"]})]})]})}},N={render:()=>r("div",{className:"space-y-6",children:[r("div",{children:[n("h3",{className:"text-sm font-medium mb-2",children:"Action Group"}),r("div",{className:"flex gap-2",children:[n(t,{size:"sm",children:"Save"}),n(t,{variant:"outline",size:"sm",children:"Cancel"})]})]}),r("div",{children:[n("h3",{className:"text-sm font-medium mb-2",children:"Navigation"}),r("div",{className:"flex gap-2",children:[n(t,{variant:"ghost",size:"sm",children:"← Previous"}),n(t,{size:"sm",children:"Next →"})]})]}),r("div",{children:[n("h3",{className:"text-sm font-medium mb-2",children:"Toolbar"}),r("div",{className:"flex gap-1",children:[n(t,{variant:"ghost",size:"sm",leadingIcon:n(w,{}),children:"New"}),n(t,{variant:"ghost",size:"sm",leadingIcon:n(c,{}),children:"Export"}),n(t,{variant:"ghost",size:"sm",children:"Settings"})]})]})]})},S={render:()=>r("div",{className:"space-y-4 w-full max-w-md",children:[n(t,{className:"w-full",children:"Full Width Button"}),n(t,{variant:"outline",className:"w-full",leadingIcon:n(c,{}),children:"Full Width with Icon"}),r("div",{className:"flex gap-2",children:[n(t,{className:"flex-1",children:"Flexible"}),n(t,{variant:"outline",className:"flex-1",children:"Flexible"})]})]})};var W,G,M;d.parameters=a(e({},d.parameters),{docs:a(e({},(W=d.parameters)==null?void 0:W.docs),{source:e({originalSource:`{
  args: {
    children: 'Button'
  }
} satisfies Story`},(M=(G=d.parameters)==null?void 0:G.docs)==null?void 0:M.source)})});var O,R,T;u.parameters=a(e({},u.parameters),{docs:a(e({},(O=u.parameters)==null?void 0:O.docs),{source:e({originalSource:`{
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
} satisfies Story`},(T=(R=u.parameters)==null?void 0:R.docs)==null?void 0:T.source)})});var E,F,j;m.parameters=a(e({},m.parameters),{docs:a(e({},(E=m.parameters)==null?void 0:E.docs),{source:e({originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
} satisfies Story`},(j=(F=m.parameters)==null?void 0:F.docs)==null?void 0:j.source)})});var _,H,V;h.parameters=a(e({},h.parameters),{docs:a(e({},(_=h.parameters)==null?void 0:_.docs),{source:e({originalSource:`{
  args: {
    variant: 'outline',
    children: 'Outline Button'
  }
} satisfies Story`},(V=(H=h.parameters)==null?void 0:H.docs)==null?void 0:V.source)})});var q,J,K;p.parameters=a(e({},p.parameters),{docs:a(e({},(q=p.parameters)==null?void 0:q.docs),{source:e({originalSource:`{
  args: {
    variant: 'ghost',
    children: 'Ghost Button'
  }
} satisfies Story`},(K=(J=p.parameters)==null?void 0:J.docs)==null?void 0:K.source)})});var Q,U,X;g.parameters=a(e({},g.parameters),{docs:a(e({},(Q=g.parameters)==null?void 0:Q.docs),{source:e({originalSource:`{
  args: {
    children: 'Disabled Button',
    disabled: true
  }
} satisfies Story`},(X=(U=g.parameters)==null?void 0:U.docs)==null?void 0:X.source)})});var Y,Z,$;v.parameters=a(e({},v.parameters),{docs:a(e({},(Y=v.parameters)==null?void 0:Y.docs),{source:e({originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
} satisfies Story`},($=(Z=v.parameters)==null?void 0:Z.docs)==null?void 0:$.source)})});var nn,en,tn;B.parameters=a(e({},B.parameters),{docs:a(e({},(nn=B.parameters)==null?void 0:nn.docs),{source:e({originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">Small</Button>
        <Button variant="outline" size="md">Medium</Button>
        <Button variant="outline" size="lg">Large</Button>
      </div>
    </div>
} satisfies Story`},(tn=(en=B.parameters)==null?void 0:en.docs)==null?void 0:tn.source)})});var an,rn,on;f.parameters=a(e({},f.parameters),{docs:a(e({},(an=f.parameters)==null?void 0:an.docs),{source:e({originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      <Button leadingIcon={<PlusIcon />}>Add Item</Button>
      <Button variant="secondary" leadingIcon={<DownloadIcon />}>Download</Button>
      <Button variant="outline" leadingIcon={<ChevronRightIcon />}>Continue</Button>
    </div>
} satisfies Story`},(on=(rn=f.parameters)==null?void 0:rn.docs)==null?void 0:on.source)})});var sn,ln,cn;x.parameters=a(e({},x.parameters),{docs:a(e({},(sn=x.parameters)==null?void 0:sn.docs),{source:e({originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      <Button trailingIcon={<ChevronRightIcon />}>Next</Button>
      <Button variant="secondary" trailingIcon={<DownloadIcon />}>Export</Button>
      <Button variant="outline" trailingIcon={<ChevronRightIcon />}>Learn More</Button>
    </div>
} satisfies Story`},(cn=(ln=x.parameters)==null?void 0:ln.docs)==null?void 0:cn.source)})});var dn,un,mn;y.parameters=a(e({},y.parameters),{docs:a(e({},(dn=y.parameters)==null?void 0:dn.docs),{source:e({originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      <Button leadingIcon={<PlusIcon />} trailingIcon={<ChevronRightIcon />}>
        Add & Continue
      </Button>
      <Button variant="outline" leadingIcon={<DownloadIcon />} trailingIcon={<ChevronRightIcon />}>
        Download & Next
      </Button>
    </div>
} satisfies Story`},(mn=(un=y.parameters)==null?void 0:un.docs)==null?void 0:mn.source)})});var hn,pn,gn;k.parameters=a(e({},k.parameters),{docs:a(e({},(hn=k.parameters)==null?void 0:hn.docs),{source:e({originalSource:`{
  render: () => {
    const [loading, setLoading] = useState<string | null>(null);
    const handleClick = (buttonId: string) => {
      setLoading(buttonId);
      setTimeout(() => setLoading(null), 2000);
    };
    return <div className="flex flex-wrap gap-4">
        <Button onClick={() => handleClick('primary')} disabled={loading === 'primary'} leadingIcon={loading === 'primary' ? <LoadingIcon /> : undefined}>
          {loading === 'primary' ? 'Processing...' : 'Submit'}
        </Button>
        
        <Button variant="secondary" onClick={() => handleClick('secondary')} disabled={loading === 'secondary'} leadingIcon={loading === 'secondary' ? <LoadingIcon /> : <DownloadIcon />}>
          {loading === 'secondary' ? 'Downloading...' : 'Download'}
        </Button>
        
        <Button variant="outline" onClick={() => handleClick('outline')} disabled={loading === 'outline'} trailingIcon={loading === 'outline' ? <LoadingIcon /> : <ChevronRightIcon />}>
          {loading === 'outline' ? 'Loading...' : 'Continue'}
        </Button>
      </div>;
  }
} satisfies Story`},(gn=(pn=k.parameters)==null?void 0:pn.docs)==null?void 0:gn.source)})});var vn,Bn,fn;I.parameters=a(e({},I.parameters),{docs:a(e({},(vn=I.parameters)==null?void 0:vn.docs),{source:e({originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      <Button asChild>
        <a href="#" role="button">Link as Button</a>
      </Button>
      <Button variant="outline" asChild>
        <a href="#external" target="_blank" rel="noopener noreferrer" role="button">
          External Link
        </a>
      </Button>
    </div>
} satisfies Story`},(fn=(Bn=I.parameters)==null?void 0:Bn.docs)==null?void 0:fn.source)})});var xn,yn,kn;C.parameters=a(e({},C.parameters),{docs:a(e({},(xn=C.parameters)==null?void 0:xn.docs),{source:e({originalSource:`{
  render: () => {
    const [clickCount, setClickCount] = useState(0);
    const [lastClicked, setLastClicked] = useState<string>('');
    const handleClick = (buttonName: string) => {
      setClickCount(prev => prev + 1);
      setLastClicked(buttonName);
    };
    return <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => handleClick('Primary')}>
            Primary Action
          </Button>
          <Button variant="secondary" onClick={() => handleClick('Secondary')}>
            Secondary Action
          </Button>
          <Button variant="outline" onClick={() => handleClick('Outline')} leadingIcon={<PlusIcon />}>
            Add Item
          </Button>
        </div>
        
        <div className="text-sm text-gray-600">
          <p>Total clicks: {clickCount}</p>
          <p>Last clicked: {lastClicked || 'None'}</p>
        </div>
      </div>;
  }
} satisfies Story`},(kn=(yn=C.parameters)==null?void 0:yn.docs)==null?void 0:kn.source)})});var In,Cn,Nn;N.parameters=a(e({},N.parameters),{docs:a(e({},(In=N.parameters)==null?void 0:In.docs),{source:e({originalSource:`{
  render: () => <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Action Group</h3>
        <div className="flex gap-2">
          <Button size="sm">Save</Button>
          <Button variant="outline" size="sm">Cancel</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Navigation</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">← Previous</Button>
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
} satisfies Story`},(Nn=(Cn=N.parameters)==null?void 0:Cn.docs)==null?void 0:Nn.source)})});var Sn,wn,bn;S.parameters=a(e({},S.parameters),{docs:a(e({},(Sn=S.parameters)==null?void 0:Sn.docs),{source:e({originalSource:`{
  render: () => <div className="space-y-4 w-full max-w-md">
      <Button className="w-full">Full Width Button</Button>
      <Button variant="outline" className="w-full" leadingIcon={<DownloadIcon />}>
        Full Width with Icon
      </Button>
      <div className="flex gap-2">
        <Button className="flex-1">Flexible</Button>
        <Button variant="outline" className="flex-1">Flexible</Button>
      </div>
    </div>
} satisfies Story`},(bn=(wn=S.parameters)==null?void 0:wn.docs)==null?void 0:bn.source)})});const Hn=["Default","Primary","Secondary","Outline","Ghost","Disabled","AllVariants","AllSizes","WithLeadingIcon","WithTrailingIcon","WithBothIcons","LoadingStates","AsChild","ClickHandlers","ButtonGroup","ResponsiveButtons"];export{B as AllSizes,v as AllVariants,I as AsChild,N as ButtonGroup,C as ClickHandlers,d as Default,g as Disabled,p as Ghost,k as LoadingStates,h as Outline,u as Primary,S as ResponsiveButtons,m as Secondary,y as WithBothIcons,f as WithLeadingIcon,x as WithTrailingIcon,Hn as __namedExportsOrder,_n as default};
