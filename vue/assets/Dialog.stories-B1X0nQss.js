import{G as X,H as Y,e as c,o as w,f as E,C as Z,m as d,z as H,A as r,P as ee,y as oe,r as g,l as f,c as p,j as P,x as D,v as _,a as j}from"./vue.esm-bundler-DkB1Q1v8.js";import{_ as M}from"./Button-Ds3ZQdvo.js";import{c as $}from"./cn-CTdd_bgG.js";import{u as le}from"./useMachine-DL-Cf-96.js";import{u as ae}from"./useId-jK020Zqe.js";import{_ as te}from"./Label-DGQrqgZK.js";import{_ as ne}from"./Input-B4Elzf_c.js";import{_ as ie}from"./CloseButton-B1dKUqcN.js";import"./input-BiOxQ7f2.js";import"./icons-DSNlrOPV.js";import"./IconButton-4mzys15T.js";const K=Symbol("mild-ui:dialog");function se(e){Y(K,e)}function C(e){const o=X(K,null);if(!o)throw new Error(`<${e}> must be rendered inside <Dialog> or <AlertDialog>.`);return o}function S(e){return(typeof e=="function"?e():e)??null}const F=c({inheritAttrs:!1,__name:"Dialog",props:{role:{default:"dialog"},open:{type:Boolean},size:{default:"md"},closeOnOverlayClick:{type:Boolean,default:void 0},closeOnEscape:{type:Boolean,default:!0},initialFocus:{type:[null,Function],default:void 0},finalFocus:{type:[null,Function],default:void 0},blurOverlay:{type:Boolean,default:!1}},emits:["update:open"],setup(e,{emit:o}){const l=e,a=o,n=ae(),i=g(!1);w(()=>{i.value=!0});const y=p(()=>l.closeOnOverlayClick??l.role!=="alertdialog");function h(){a("update:open",!1)}se({role:p(()=>l.role),size:p(()=>l.size),closeOnEscape:p(()=>l.closeOnEscape),titleId:`${n}-title`,descriptionId:`${n}-description`,hasTitle:g(!1),hasDescription:g(!1),initialFocus:p(()=>l.initialFocus),finalFocus:p(()=>l.finalFocus),close:h});function m(u){y.value&&u.target===u.currentTarget&&h()}return(u,O)=>i.value&&e.open?(f(),E(ee,{key:0,to:"body"},[Z("div",H({class:r($)("mild-modal-overlay",e.blurOverlay&&"mild-modal-overlay--blur"),"data-dialog-overlay":""},u.$attrs,{onClick:m}),[d(u.$slots,"default")],16)])):oe("",!0)}});F.__docgenInfo={exportName:"default",displayName:"Dialog",description:"",tags:{},props:[{name:"blurOverlay",description:"Blur the page behind the overlay.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"finalFocus",description:"Element to focus on close; defaults to the element focused before the dialog opened.",required:!1,type:{name:"FocusTarget"},defaultValue:{func:!1,value:"undefined"}},{name:"initialFocus",description:"Element to focus on open; defaults to the first tabbable element in the dialog.",required:!1,type:{name:"FocusTarget"},defaultValue:{func:!1,value:"undefined"}},{name:"closeOnEscape",description:"Close on Escape. Default `true`.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"closeOnOverlayClick",description:"Close when the overlay is clicked. Default `true` for a dialog, `false` for an alert dialog.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"undefined"}},{name:"size",required:!1,type:{name:"DialogSize"},defaultValue:{func:!1,value:'"md"'}},{name:"open",description:"Whether the dialog is shown (`v-model:open`).",required:!0,type:{name:"boolean"}},{name:"role",description:'`"dialog"` (default) or `"alertdialog"` (see `AlertDialog`).',required:!1,type:{name:"DialogRole"},defaultValue:{func:!1,value:'"dialog"'}}],events:[{name:"update:open",type:{names:["boolean"]},description:"`v-model:open`: the user asked to close it (Escape, the overlay, a close button)."}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Dialog/Dialog.vue"]};const R=c({inheritAttrs:!1,__name:"AlertDialog",props:{leastDestructive:{type:[null,Function],default:void 0},open:{type:Boolean},size:{default:"md"},closeOnOverlayClick:{type:Boolean,default:!1},closeOnEscape:{type:Boolean,default:!0},finalFocus:{type:[null,Function],default:void 0},blurOverlay:{type:Boolean,default:!1}},emits:["update:open"],setup(e,{emit:o}){const l=o;return(a,n)=>(f(),E(F,H({role:"alertdialog",open:e.open,size:e.size,"close-on-overlay-click":e.closeOnOverlayClick,"close-on-escape":e.closeOnEscape,"initial-focus":e.leastDestructive,"final-focus":e.finalFocus,"blur-overlay":e.blurOverlay},a.$attrs,{"onUpdate:open":n[0]||(n[0]=i=>l("update:open",i))}),{default:P(()=>[d(a.$slots,"default")]),_:3},16,["open","size","close-on-overlay-click","close-on-escape","initial-focus","final-focus","blur-overlay"]))}});R.__docgenInfo={exportName:"default",displayName:"AlertDialog",description:"",tags:{},props:[{name:"leastDestructive",description:`The least destructive action (usually "Cancel"), focused when the dialog opens so that
an accidental Enter does not confirm.`,required:!1,type:{name:"FocusTarget"},defaultValue:{func:!1,value:"undefined"}},{name:"size",defaultValue:{func:!1,value:'"md"'}},{name:"closeOnOverlayClick",defaultValue:{func:!1,value:"false"}},{name:"closeOnEscape",defaultValue:{func:!1,value:"true"}},{name:"finalFocus",defaultValue:{func:!1,value:"undefined"}},{name:"blurOverlay",defaultValue:{func:!1,value:"false"}}],events:[{name:"update:open",type:{names:["boolean"]},description:"`v-model:open`"}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/AlertDialog/AlertDialog.vue"]};const re='a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable]:not([contenteditable="false"])',W="mild-modal-open",v=[];let b=null;function ue(e){return!e.closest("[hidden]")&&e.getAttribute("aria-hidden")!=="true"}function q(e){return Array.from(e.querySelectorAll(re)).filter(ue)}function ce(){b===null&&(b=document.body.style.overflow,document.body.style.overflow="hidden",document.body.classList.add(W))}function de(){b!==null&&(document.body.style.overflow=b,document.body.classList.remove(W),b=null)}function fe(e){const{element:o,onClose:l,initialFocus:a,closeOnEscape:n=!0,modal:i=!0}=e,y=e.returnFocus??!0,h=document.activeElement;o.setAttribute("aria-modal",String(i)),o.hasAttribute("tabindex")||o.setAttribute("tabindex","-1");const m={element:o,isTop:()=>v[v.length-1]===m,focusInitial:u,destroy:Q};function u(){(a??q(o)[0]??o).focus()}function O(t){if(!m.isTop())return;if(t.key==="Escape"&&n){t.preventDefault(),t.stopPropagation(),l?.();return}if(t.key!=="Tab"||!i)return;const s=q(o);if(s.length===0){t.preventDefault(),o.focus();return}const B=s[0],L=s[s.length-1],T=document.activeElement;t.shiftKey&&(T===B||T===o)?(t.preventDefault(),L.focus()):!t.shiftKey&&T===L&&(t.preventDefault(),B.focus())}function z(t){if(!i||!m.isTop())return;const s=t.target;s&&o.contains(s)||u()}function Q(){document.removeEventListener("keydown",O,!0),document.removeEventListener("focusin",z);const t=v.indexOf(m);t!==-1&&v.splice(t,1),i&&!v.some(B=>B.element.getAttribute("aria-modal")==="true")&&de();const s=y===!0?h:y===!1?null:y;s&&s.isConnected&&s.focus()}return v.push(m),i&&ce(),document.addEventListener("keydown",O,!0),document.addEventListener("focusin",z),u(),m}const me=["role","aria-labelledby","aria-describedby"],I=c({__name:"DialogContent",setup(e){const o=C("DialogContent"),l=g(null);le(l,(n,i)=>fe({element:n,...i,initialFocus:S(o.initialFocus.value)??void 0,returnFocus:S(o.finalFocus.value)??!0}),()=>({onClose:o.close,closeOnEscape:o.closeOnEscape.value,modal:!0}));const a=p(()=>$("mild-modal-content",`mild-modal-content--${o.size.value}`,o.role.value==="alertdialog"&&"mild-modal-content--alert"));return(n,i)=>(f(),D("div",{ref_key:"element",ref:l,role:r(o).role.value,"aria-labelledby":r(o).hasTitle.value?r(o).titleId:void 0,"aria-describedby":r(o).hasDescription.value?r(o).descriptionId:void 0,class:_(a.value)},[d(n.$slots,"default")],10,me))}});I.__docgenInfo={exportName:"default",displayName:"DialogContent",description:"",tags:{},slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Dialog/DialogContent.vue"]};const G=c({__name:"DialogHeader",props:{noBorder:{type:Boolean,default:!1}},setup(e){return(o,l)=>(f(),D("div",{class:_(["mild-modal-header",e.noBorder&&"mild-modal-header--no-border"])},[d(o.$slots,"default")],2))}});G.__docgenInfo={exportName:"default",displayName:"DialogHeader",description:"",tags:{},props:[{name:"noBorder",description:"Drop the divider under the header.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Dialog/DialogHeader.vue"]};const pe=["id"],V=c({__name:"DialogTitle",setup(e){const{titleId:o,hasTitle:l}=C("DialogTitle");return w(()=>{l.value=!0}),j(()=>{l.value=!1}),(a,n)=>(f(),D("h2",{id:r(o),class:"mild-modal-title"},[d(a.$slots,"default")],8,pe))}});V.__docgenInfo={exportName:"default",displayName:"DialogTitle",description:"",tags:{},slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Dialog/DialogTitle.vue"]};const ge=["id"],x=c({__name:"DialogDescription",setup(e){const{descriptionId:o,hasDescription:l}=C("DialogDescription");return w(()=>{l.value=!0}),j(()=>{l.value=!1}),(a,n)=>(f(),D("p",{id:r(o),class:"mild-modal-description"},[d(a.$slots,"default")],8,ge))}});x.__docgenInfo={exportName:"default",displayName:"DialogDescription",description:"",tags:{},slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Dialog/DialogDescription.vue"]};const U=c({__name:"DialogBody",props:{noPadding:{type:Boolean,default:!1}},setup(e){return(o,l)=>(f(),D("div",{class:_(["mild-modal-body",e.noPadding&&"mild-modal-body--no-padding"])},[d(o.$slots,"default")],2))}});U.__docgenInfo={exportName:"default",displayName:"DialogBody",description:"",tags:{},props:[{name:"noPadding",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Dialog/DialogBody.vue"]};const N=c({__name:"DialogFooter",props:{align:{default:"end"},noBorder:{type:Boolean,default:!1}},setup(e){const o=e,l=p(()=>$("mild-modal-footer",o.align!=="end"&&`mild-modal-footer--${o.align}`,o.noBorder&&"mild-modal-footer--no-border"));return(a,n)=>(f(),D("div",{class:_(l.value)},[d(a.$slots,"default")],2))}});N.__docgenInfo={exportName:"default",displayName:"DialogFooter",description:"",tags:{},props:[{name:"align",description:"Horizontal alignment of the actions. Default end.",required:!1,type:{name:"union",elements:[{name:'"start"'},{name:'"center"'},{name:'"end"'},{name:'"between"'}]},defaultValue:{func:!1,value:'"end"'}},{name:"noBorder",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Dialog/DialogFooter.vue"]};const J=c({__name:"DialogCloseButton",props:{label:{default:"Close"},colorScheme:{default:void 0},type:{default:void 0},variant:{default:"ghost"},size:{default:"sm"},round:{type:Boolean,default:!1},disabled:{type:Boolean,default:void 0},loading:{type:Boolean,default:void 0}},setup(e){const{close:o}=C("DialogCloseButton");return(l,a)=>(f(),E(r(ie),{label:e.label,variant:e.variant,size:e.size,round:e.round,disabled:e.disabled,loading:e.loading,"color-scheme":e.colorScheme,type:e.type,class:"mild-modal-close",onClick:r(o)},{default:P(()=>[d(l.$slots,"default")]),_:3},8,["label","variant","size","round","disabled","loading","color-scheme","type","onClick"]))}});J.__docgenInfo={exportName:"default",displayName:"DialogCloseButton",description:"",tags:{},props:[{name:"label",description:'Accessible name. Default `"Close"`.',required:!1,type:{name:"string"},defaultValue:{func:!1,value:'"Close"'}},{name:"variant",defaultValue:{func:!1,value:'"ghost"'}},{name:"size",defaultValue:{func:!1,value:'"sm"'}},{name:"round",defaultValue:{func:!1,value:"false"}},{name:"disabled",defaultValue:{func:!1,value:"undefined"}},{name:"loading",defaultValue:{func:!1,value:"undefined"}},{name:"colorScheme",defaultValue:{func:!1,value:"undefined"}},{name:"type",defaultValue:{func:!1,value:"undefined"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Dialog/DialogCloseButton.vue"]};const Oe={title:"Overlay/Dialog",component:F,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'Modal dialog (`v-model:open`). While open it renders in a teleport under an overlay, traps focus, locks the page scroll, closes on Escape (and on the overlay) and returns focus to the trigger. `AlertDialog` is `role="alertdialog"`: the overlay does not close it and focus starts on the least destructive action. Behaviour from `@mild-ui/primitives/dialog`, per the [WAI-ARIA APG dialog (modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) and [alert dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) patterns; keyboard and focus tests: `packages/vue/src/components/Dialog/Dialog.test.ts` and `AlertDialog/AlertDialog.test.ts`.'}}},argTypes:{size:{control:"select",options:["xs","sm","md","lg","xl","full"]},closeOnOverlayClick:{control:"boolean"},closeOnEscape:{control:"boolean"},blurOverlay:{control:"boolean"}},args:{size:"md"}},A={render:e=>({components:{Dialog:F,DialogContent:I,DialogHeader:G,DialogTitle:V,DialogDescription:x,DialogBody:U,DialogFooter:N,DialogCloseButton:J,Button:M,Input:ne,Label:te},setup(){const o=g(!1);return{args:e,open:o}},template:`
      <Button @click="open = true">Edit profile</Button>
      <Dialog v-model:open="open" v-bind="args">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogCloseButton />
          </DialogHeader>
          <DialogBody>
            <DialogDescription>Make changes to your profile here.</DialogDescription>
            <div class="flex flex-col gap-1 mt-3">
              <Label for="name">Name</Label>
              <Input id="name" model-value="Ada Lovelace" />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" @click="open = false">Cancel</Button>
            <Button @click="open = false">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    `})},k={name:"AlertDialog",render:()=>({components:{AlertDialog:R,AlertDialogContent:I,AlertDialogTitle:V,AlertDialogDescription:x,AlertDialogFooter:N,Button:M},setup(){const e=g(!1),o=g(null);return{open:e,cancel:o}},template:`
      <Button variant="destructive" @click="open = true">Delete project</Button>
      <AlertDialog v-model:open="open" :least-destructive="() => cancel?.$el">
        <AlertDialogContent>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>This cannot be undone. All data will be removed.</AlertDialogDescription>
          <AlertDialogFooter>
            <Button ref="cancel" variant="outline" @click="open = false">Cancel</Button>
            <Button variant="destructive" @click="open = false">Delete</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    `})};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogBody,
      DialogFooter,
      DialogCloseButton,
      Button,
      Input,
      Label
    },
    setup() {
      const open = ref(false);
      return {
        args,
        open
      };
    },
    template: \`
      <Button @click="open = true">Edit profile</Button>
      <Dialog v-model:open="open" v-bind="args">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogCloseButton />
          </DialogHeader>
          <DialogBody>
            <DialogDescription>Make changes to your profile here.</DialogDescription>
            <div class="flex flex-col gap-1 mt-3">
              <Label for="name">Name</Label>
              <Input id="name" model-value="Ada Lovelace" />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" @click="open = false">Cancel</Button>
            <Button @click="open = false">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    \`
  })
}`,...A.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: "AlertDialog",
  render: () => ({
    components: {
      AlertDialog,
      AlertDialogContent,
      AlertDialogTitle,
      AlertDialogDescription,
      AlertDialogFooter,
      Button
    },
    setup() {
      const open = ref(false);
      const cancel = ref<{
        $el: HTMLElement;
      } | null>(null);
      return {
        open,
        cancel
      };
    },
    template: \`
      <Button variant="destructive" @click="open = true">Delete project</Button>
      <AlertDialog v-model:open="open" :least-destructive="() => cancel?.$el">
        <AlertDialogContent>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>This cannot be undone. All data will be removed.</AlertDialogDescription>
          <AlertDialogFooter>
            <Button ref="cancel" variant="outline" @click="open = false">Cancel</Button>
            <Button variant="destructive" @click="open = false">Delete</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    \`
  })
}`,...k.parameters?.docs?.source}}};const Te=["Default","Alert"];export{k as Alert,A as Default,Te as __namedExportsOrder,Oe as default};
