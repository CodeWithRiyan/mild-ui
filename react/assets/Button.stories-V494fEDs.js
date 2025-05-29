import{j as t,a as n}from"./cn-C5LAPttS.js";import{r as L}from"./index-BwDkhjyp.js";import{B as e}from"./Button-DgYrjr59.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-CMNekbXq.js";const r=()=>n("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:n("path",{d:"m9 18 6-6-6-6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),o=()=>t("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:[n("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),n("polyline",{points:"7,10 12,15 17,10",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),n("line",{x1:"12",y1:"15",x2:"12",y2:"3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]}),N=()=>n("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:n("path",{d:"M12 5v14M5 12h14",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),b=()=>t("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",className:"animate-spin",children:[n("circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4",className:"opacity-25"}),n("path",{d:"m12 2a10 10 0 0 1 10 10",stroke:"currentColor",strokeWidth:"4",className:"opacity-75"})]}),An={title:"Components/Button",component:e,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A versatile button component with multiple variants, sizes, and icon support."}}},argTypes:{variant:{control:"select",options:["primary","secondary","outline","ghost"]},size:{control:"select",options:["sm","md","lg"]},disabled:{control:"boolean"},onClick:{action:"clicked"}}},l={args:{children:"Button"}},c={args:{variant:"primary",children:"Primary Button"}},d={args:{variant:"secondary",children:"Secondary Button"}},u={args:{variant:"outline",children:"Outline Button"}},m={args:{variant:"ghost",children:"Ghost Button"}},h={args:{children:"Disabled Button",disabled:!0}},p={render:()=>t("div",{className:"flex flex-wrap gap-4",children:[n(e,{variant:"primary",children:"Primary"}),n(e,{variant:"secondary",children:"Secondary"}),n(e,{variant:"outline",children:"Outline"}),n(e,{variant:"ghost",children:"Ghost"})]})},g={render:()=>t("div",{className:"flex flex-col gap-4",children:[t("div",{className:"flex items-center gap-4",children:[n(e,{size:"sm",children:"Small"}),n(e,{size:"md",children:"Medium"}),n(e,{size:"lg",children:"Large"})]}),t("div",{className:"flex items-center gap-4",children:[n(e,{variant:"outline",size:"sm",children:"Small"}),n(e,{variant:"outline",size:"md",children:"Medium"}),n(e,{variant:"outline",size:"lg",children:"Large"})]})]})},v={render:()=>t("div",{className:"flex flex-wrap gap-4",children:[n(e,{leadingIcon:n(N,{}),children:"Add Item"}),n(e,{variant:"secondary",leadingIcon:n(o,{}),children:"Download"}),n(e,{variant:"outline",leadingIcon:n(r,{}),children:"Continue"})]})},B={render:()=>t("div",{className:"flex flex-wrap gap-4",children:[n(e,{trailingIcon:n(r,{}),children:"Next"}),n(e,{variant:"secondary",trailingIcon:n(o,{}),children:"Export"}),n(e,{variant:"outline",trailingIcon:n(r,{}),children:"Learn More"})]})},f={render:()=>t("div",{className:"flex flex-wrap gap-4",children:[n(e,{leadingIcon:n(N,{}),trailingIcon:n(r,{}),children:"Add & Continue"}),n(e,{variant:"outline",leadingIcon:n(o,{}),trailingIcon:n(r,{}),children:"Download & Next"})]})},x={render:()=>{const[a,s]=L.useState(null),i=S=>{s(S),setTimeout(()=>s(null),2e3)};return t("div",{className:"flex flex-wrap gap-4",children:[n(e,{onClick:()=>i("primary"),disabled:a==="primary",leadingIcon:a==="primary"?n(b,{}):void 0,children:a==="primary"?"Processing...":"Submit"}),n(e,{variant:"secondary",onClick:()=>i("secondary"),disabled:a==="secondary",leadingIcon:a==="secondary"?n(b,{}):n(o,{}),children:a==="secondary"?"Downloading...":"Download"}),n(e,{variant:"outline",onClick:()=>i("outline"),disabled:a==="outline",trailingIcon:a==="outline"?n(b,{}):n(r,{}),children:a==="outline"?"Loading...":"Continue"})]})}},y={render:()=>t("div",{className:"flex flex-wrap gap-4",children:[n(e,{asChild:!0,children:n("a",{href:"#",role:"button",children:"Link as Button"})}),n(e,{variant:"outline",asChild:!0,children:n("a",{href:"#external",target:"_blank",rel:"noopener noreferrer",role:"button",children:"External Link"})})]})},k={render:()=>{const[a,s]=L.useState(0),[i,S]=L.useState(""),w=Nn=>{s(Sn=>Sn+1),S(Nn)};return t("div",{className:"space-y-4",children:[t("div",{className:"flex flex-wrap gap-4",children:[n(e,{onClick:()=>w("Primary"),children:"Primary Action"}),n(e,{variant:"secondary",onClick:()=>w("Secondary"),children:"Secondary Action"}),n(e,{variant:"outline",onClick:()=>w("Outline"),leadingIcon:n(N,{}),children:"Add Item"})]}),t("div",{className:"text-sm text-gray-600",children:[t("p",{children:["Total clicks: ",a]}),t("p",{children:["Last clicked: ",i||"None"]})]})]})}},I={render:()=>t("div",{className:"space-y-6",children:[t("div",{children:[n("h3",{className:"text-sm font-medium mb-2",children:"Action Group"}),t("div",{className:"flex gap-2",children:[n(e,{size:"sm",children:"Save"}),n(e,{variant:"outline",size:"sm",children:"Cancel"})]})]}),t("div",{children:[n("h3",{className:"text-sm font-medium mb-2",children:"Navigation"}),t("div",{className:"flex gap-2",children:[n(e,{variant:"ghost",size:"sm",children:"← Previous"}),n(e,{size:"sm",children:"Next →"})]})]}),t("div",{children:[n("h3",{className:"text-sm font-medium mb-2",children:"Toolbar"}),t("div",{className:"flex gap-1",children:[n(e,{variant:"ghost",size:"sm",leadingIcon:n(N,{}),children:"New"}),n(e,{variant:"ghost",size:"sm",leadingIcon:n(o,{}),children:"Export"}),n(e,{variant:"ghost",size:"sm",children:"Settings"})]})]})]})},C={render:()=>t("div",{className:"space-y-4 w-full max-w-md",children:[n(e,{className:"w-full",children:"Full Width Button"}),n(e,{variant:"outline",className:"w-full",leadingIcon:n(o,{}),children:"Full Width with Icon"}),t("div",{className:"flex gap-2",children:[n(e,{className:"flex-1",children:"Flexible"}),n(e,{variant:"outline",className:"flex-1",children:"Flexible"})]})]})};var z,D,A;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    children: 'Button'
  }
} satisfies Story`,...(A=(D=l.parameters)==null?void 0:D.docs)==null?void 0:A.source}}};var P,W,G;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
} satisfies Story`,...(G=(W=c.parameters)==null?void 0:W.docs)==null?void 0:G.source}}};var M,O,R;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
} satisfies Story`,...(R=(O=d.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};var T,E,F;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    variant: 'outline',
    children: 'Outline Button'
  }
} satisfies Story`,...(F=(E=u.parameters)==null?void 0:E.docs)==null?void 0:F.source}}};var j,_,H;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    children: 'Ghost Button'
  }
} satisfies Story`,...(H=(_=m.parameters)==null?void 0:_.docs)==null?void 0:H.source}}};var V,q,J;h.parameters={...h.parameters,docs:{...(V=h.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    children: 'Disabled Button',
    disabled: true
  }
} satisfies Story`,...(J=(q=h.parameters)==null?void 0:q.docs)==null?void 0:J.source}}};var K,Q,U;p.parameters={...p.parameters,docs:{...(K=p.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
} satisfies Story`,...(U=(Q=p.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var X,Y,Z;g.parameters={...g.parameters,docs:{...(X=g.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
} satisfies Story`,...(Z=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var $,nn,en;v.parameters={...v.parameters,docs:{...($=v.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      <Button leadingIcon={<PlusIcon />}>Add Item</Button>
      <Button variant="secondary" leadingIcon={<DownloadIcon />}>Download</Button>
      <Button variant="outline" leadingIcon={<ChevronRightIcon />}>Continue</Button>
    </div>
} satisfies Story`,...(en=(nn=v.parameters)==null?void 0:nn.docs)==null?void 0:en.source}}};var tn,an,rn;B.parameters={...B.parameters,docs:{...(tn=B.parameters)==null?void 0:tn.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      <Button trailingIcon={<ChevronRightIcon />}>Next</Button>
      <Button variant="secondary" trailingIcon={<DownloadIcon />}>Export</Button>
      <Button variant="outline" trailingIcon={<ChevronRightIcon />}>Learn More</Button>
    </div>
} satisfies Story`,...(rn=(an=B.parameters)==null?void 0:an.docs)==null?void 0:rn.source}}};var on,sn,ln;f.parameters={...f.parameters,docs:{...(on=f.parameters)==null?void 0:on.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      <Button leadingIcon={<PlusIcon />} trailingIcon={<ChevronRightIcon />}>
        Add & Continue
      </Button>
      <Button variant="outline" leadingIcon={<DownloadIcon />} trailingIcon={<ChevronRightIcon />}>
        Download & Next
      </Button>
    </div>
} satisfies Story`,...(ln=(sn=f.parameters)==null?void 0:sn.docs)==null?void 0:ln.source}}};var cn,dn,un;x.parameters={...x.parameters,docs:{...(cn=x.parameters)==null?void 0:cn.docs,source:{originalSource:`{
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
} satisfies Story`,...(un=(dn=x.parameters)==null?void 0:dn.docs)==null?void 0:un.source}}};var mn,hn,pn;y.parameters={...y.parameters,docs:{...(mn=y.parameters)==null?void 0:mn.docs,source:{originalSource:`{
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
} satisfies Story`,...(pn=(hn=y.parameters)==null?void 0:hn.docs)==null?void 0:pn.source}}};var gn,vn,Bn;k.parameters={...k.parameters,docs:{...(gn=k.parameters)==null?void 0:gn.docs,source:{originalSource:`{
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
} satisfies Story`,...(Bn=(vn=k.parameters)==null?void 0:vn.docs)==null?void 0:Bn.source}}};var fn,xn,yn;I.parameters={...I.parameters,docs:{...(fn=I.parameters)==null?void 0:fn.docs,source:{originalSource:`{
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
} satisfies Story`,...(yn=(xn=I.parameters)==null?void 0:xn.docs)==null?void 0:yn.source}}};var kn,In,Cn;C.parameters={...C.parameters,docs:{...(kn=C.parameters)==null?void 0:kn.docs,source:{originalSource:`{
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
} satisfies Story`,...(Cn=(In=C.parameters)==null?void 0:In.docs)==null?void 0:Cn.source}}};const Pn=["Default","Primary","Secondary","Outline","Ghost","Disabled","AllVariants","AllSizes","WithLeadingIcon","WithTrailingIcon","WithBothIcons","LoadingStates","AsChild","ClickHandlers","ButtonGroup","ResponsiveButtons"];export{g as AllSizes,p as AllVariants,y as AsChild,I as ButtonGroup,k as ClickHandlers,l as Default,h as Disabled,m as Ghost,x as LoadingStates,u as Outline,c as Primary,C as ResponsiveButtons,d as Secondary,f as WithBothIcons,v as WithLeadingIcon,B as WithTrailingIcon,Pn as __namedExportsOrder,An as default};
