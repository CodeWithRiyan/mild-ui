import{d as h}from"./index-DrFu-skq.js";const{useMemo:f,useEffect:_}=__STORYBOOK_MODULE_PREVIEW_API__,{global:B}=__STORYBOOK_MODULE_GLOBAL__,{logger:S}=__STORYBOOK_MODULE_CLIENT_LOGGER__;var p="backgrounds",{document:s,window:x}=B,O=()=>x.matchMedia("(prefers-reduced-motion: reduce)").matches,w=(r,e=[],a)=>{if(r==="transparent")return"transparent";if(e.find(n=>n.value===r))return r;let t=e.find(n=>n.name===a);if(t)return t.value;if(a){let n=e.map(o=>o.name).join(", ");S.warn(h`
        Backgrounds Addon: could not find the default color "${a}".
        These are the available colors for your story based on your configuration:
        ${n}.
      `)}return"transparent"},E=r=>{(Array.isArray(r)?r:[r]).forEach(A)},A=r=>{var a;let e=s.getElementById(r);e&&((a=e.parentElement)==null||a.removeChild(e))},L=(r,e)=>{let a=s.getElementById(r);if(a)a.innerHTML!==e&&(a.innerHTML=e);else{let t=s.createElement("style");t.setAttribute("id",r),t.innerHTML=e,s.head.appendChild(t)}},T=(r,e,a)=>{var n;let t=s.getElementById(r);if(t)t.innerHTML!==e&&(t.innerHTML=e);else{let o=s.createElement("style");o.setAttribute("id",r),o.innerHTML=e;let i=`addon-backgrounds-grid${a?`-docs-${a}`:""}`,d=s.getElementById(i);d?(n=d.parentElement)==null||n.insertBefore(o,d):s.head.appendChild(o)}},C=(r,e)=>{var c;let{globals:a,parameters:t}=e,n=(c=a[p])==null?void 0:c.value,o=t[p],i=f(()=>o.disable?"transparent":w(n,o.values,o.default),[o,n]),d=f(()=>i&&i!=="transparent",[i]),g=e.viewMode==="docs"?`#anchor--${e.id} .docs-story`:".sb-show-main",u=f(()=>`
      ${g} {
        background: ${i} !important;
        ${O()?"":"transition: background-color 0.3s;"}
      }
    `,[i,g]);return _(()=>{let l=e.viewMode==="docs"?`addon-backgrounds-docs-${e.id}`:"addon-backgrounds-color";if(!d){E(l);return}T(l,u,e.viewMode==="docs"?e.id:null)},[d,u,e]),r()},I=(r,e)=>{var y,v,k;let{globals:a,parameters:t}=e,n=t[p].grid,o=((y=a[p])==null?void 0:y.grid)===!0&&n.disable!==!0,{cellAmount:i,cellSize:d,opacity:g}=n,u=e.viewMode==="docs",c=t.layout===void 0||t.layout==="padded"?16:0,l=(v=n.offsetX)!=null?v:u?20:c,m=(k=n.offsetY)!=null?k:u?20:c,$=f(()=>{let b=e.viewMode==="docs"?`#anchor--${e.id} .docs-story`:".sb-show-main",M=[`${d*i}px ${d*i}px`,`${d*i}px ${d*i}px`,`${d}px ${d}px`,`${d}px ${d}px`].join(", ");return`
      ${b} {
        background-size: ${M} !important;
        background-position: ${l}px ${m}px, ${l}px ${m}px, ${l}px ${m}px, ${l}px ${m}px !important;
        background-blend-mode: difference !important;
        background-image: linear-gradient(rgba(130, 130, 130, ${g}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${g}) 1px, transparent 1px),
         linear-gradient(rgba(130, 130, 130, ${g/2}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${g/2}) 1px, transparent 1px) !important;
      }
    `},[d]);return _(()=>{let b=e.viewMode==="docs"?`addon-backgrounds-grid-docs-${e.id}`:"addon-backgrounds-grid";if(!o){E(b);return}L(b,$)},[o,$,e]),r()},G=[I,C],H={[p]:{grid:{cellSize:20,opacity:.5,cellAmount:5},values:[{name:"light",value:"#F8F8F8"},{name:"dark",value:"#333333"}]}},Y={[p]:null};export{G as decorators,Y as globals,H as parameters};
