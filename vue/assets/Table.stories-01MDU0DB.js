import{e as x,x as r,C as te,m as y,z as ne,v as p,A as C,c as u,l as s,r as O,B as f,j as i,f as v,F as V,D as B,y as U,J as $,K as W,n as Te,k as ve}from"./vue.esm-bundler-DkB1Q1v8.js";import{_ as se}from"./Badge-BR2nYQqz.js";import{_ as E}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{c as H}from"./cn-CTdd_bgG.js";import{A as ye}from"./icons-DSNlrOPV.js";import{_ as ae}from"./Checkbox-BhuDFWJD.js";import{_ as we}from"./Spinner-DwIstJ5s.js";import{_ as G}from"./Text-HyJ-f5G3.js";import"./useMachine-DL-Cf-96.js";import"./useId-jK020Zqe.js";import"./Label-DGQrqgZK.js";const ge=["data-sticky-header"],D=x({inheritAttrs:!1,__name:"Table",props:{ui:{default:void 0},variant:{default:"simple"},size:{default:"md"},hoverable:{type:Boolean,default:!1},stickyHeader:{type:Boolean,default:!1}},setup(e){const a=e,t=u(()=>H("mild-table",`mild-table--${a.variant}`,`mild-table--${a.size}`,a.hoverable&&"mild-table--hoverable",a.stickyHeader&&"mild-table--sticky-header"));return(d,m)=>(s(),r("div",{class:p(C(H)("mild-table-container",e.ui?.container)),"data-sticky-header":e.stickyHeader?"":void 0},[te("table",ne({class:t.value},d.$attrs),[y(d.$slots,"default")],16)],10,ge))}});D.__docgenInfo={exportName:"default",displayName:"Table",description:"",tags:{},props:[{name:"stickyHeader",description:"Keep the header row visible while the container scrolls.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"hoverable",description:"Highlight body rows on hover.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"size",description:'Cell padding. Default `"md"`.',required:!1,type:{name:"TableSize"},defaultValue:{func:!1,value:'"md"'}},{name:"variant",description:'Visual style. Default `"simple"`.',required:!1,type:{name:"TableVariant"},defaultValue:{func:!1,value:'"simple"'}},{name:"ui",required:!1,type:{name:"TableUiClasses"},defaultValue:{func:!1,value:"undefined"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Table/Table.vue"]};const J=x({__name:"TableCaption",props:{placement:{default:"top"}},setup(e){return(a,t)=>(s(),r("caption",{class:p(["mild-table__caption",e.placement==="bottom"&&"mild-table__caption--bottom"])},[y(a.$slots,"default")],2))}});J.__docgenInfo={exportName:"default",displayName:"TableCaption",description:"",tags:{},props:[{name:"placement",description:'Where the caption sits. Default `"top"`.',required:!1,type:{name:"union",elements:[{name:'"top"'},{name:'"bottom"'}]},defaultValue:{func:!1,value:'"top"'}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Table/TableCaption.vue"]};const oe={},he={class:"mild-table__header"};function Ce(e,a){return s(),r("thead",he,[y(e.$slots,"default")])}const P=E(oe,[["render",Ce]]);oe.__docgenInfo={displayName:"TableHeader",description:"",tags:{},slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Table/TableHeader.vue"]};const re={},ke={class:"mild-table__body"};function He(e,a){return s(),r("tbody",ke,[y(e.$slots,"default")])}const M=E(re,[["render",He]]);re.__docgenInfo={displayName:"TableBody",description:"",tags:{},slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Table/TableBody.vue"]};const ie={},_e={class:"mild-table__footer"};function xe(e,a){return s(),r("tfoot",_e,[y(e.$slots,"default")])}const De=E(ie,[["render",xe]]);ie.__docgenInfo={displayName:"TableFooter",description:"",tags:{},slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Table/TableFooter.vue"]};const Se=["aria-selected","data-selected"],w=x({__name:"TableRow",props:{selected:{type:Boolean,default:void 0}},setup(e){return(a,t)=>(s(),r("tr",{class:"mild-table__row","aria-selected":e.selected===void 0?void 0:e.selected,"data-selected":e.selected?"":void 0},[y(a.$slots,"default")],8,Se))}});w.__docgenInfo={exportName:"default",displayName:"TableRow",description:"",tags:{},props:[{name:"selected",description:"Marks the row as selected (`aria-selected`).",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"undefined"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Table/TableRow.vue"]};const Re=["scope","aria-sort"],_=x({__name:"TableHead",props:{sort:{default:void 0},scope:{default:"col"},align:{default:void 0},numeric:{type:Boolean,default:!1}},setup(e){const a=e,t=u(()=>H("mild-table__head",a.align&&`mild-table__head--${a.align}`,a.numeric&&"mild-table__head--numeric"));return(d,m)=>(s(),r("th",{scope:e.scope,"aria-sort":e.sort,class:p(t.value)},[y(d.$slots,"default")],10,Re))}});_.__docgenInfo={exportName:"default",displayName:"TableHead",description:"",tags:{},props:[{name:"numeric",description:"Right-aligned tabular figures.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"align",description:"Horizontal alignment.",required:!1,type:{name:"TableAlign"},defaultValue:{func:!1,value:"undefined"}},{name:"sort",description:'Current sort of this column (`aria-sort`); `"none"` marks it sortable but unsorted.',required:!1,type:{name:"union",elements:[{name:"TableSortDirection"},{name:'"none"'}]},defaultValue:{func:!1,value:"undefined"}},{name:"scope",description:'Default `"col"`.',required:!1,type:{name:"union",elements:[{name:'"col"'},{name:'"row"'},{name:'"colgroup"'},{name:'"rowgroup"'}]},defaultValue:{func:!1,value:'"col"'}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Table/TableHead.vue"]};const g=x({__name:"TableCell",props:{align:{default:void 0},numeric:{type:Boolean,default:!1}},setup(e){const a=e,t=u(()=>H("mild-table__cell",a.align&&`mild-table__cell--${a.align}`,a.numeric&&"mild-table__cell--numeric"));return(d,m)=>(s(),r("td",{class:p(t.value)},[y(d.$slots,"default")],2))}});g.__docgenInfo={exportName:"default",displayName:"TableCell",description:"",tags:{},props:[{name:"align",description:"Horizontal alignment.",required:!1,type:{name:"TableAlign"},defaultValue:{func:!1,value:"undefined"}},{name:"numeric",description:"Right-aligned tabular figures.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Table/TableCell.vue"]};function le(e,a){return e.sortValue?e.sortValue(a):a[e.key]}function Ve(e,a){return e==null&&a==null?0:e==null?1:a==null?-1:typeof e=="number"&&typeof a=="number"?e-a:String(e).localeCompare(String(a),void 0,{numeric:!0,sensitivity:"base"})}function Be(e,a,t){if(!t)return e;const d=a.find(c=>c.key===t.key);if(!d)return e;const m=t.direction==="descending"?-1:1;return e.map((c,h)=>({row:c,index:h})).sort((c,h)=>{const T=Ve(le(d,c.row),le(d,h.row));return T===0?c.index-h.index:T*m}).map(c=>c.row)}function $e(e,a){return e?.key!==a?{key:a,direction:"ascending"}:{key:a,direction:e.direction==="ascending"?"descending":"ascending"}}const Ae=["aria-busy"],qe=["onClick"],Fe=["data-direction"],A=x({inheritAttrs:!1,__name:"DataTable",props:{columns:{},rows:{},rowKey:{type:[String,Function],default:void 0},caption:{default:void 0},sort:{default:void 0},defaultSort:{default:null},selectable:{type:Boolean,default:!1},selectedKeys:{default:void 0},defaultSelectedKeys:{default:()=>[]},selectionLabel:{type:Function,default:void 0},selectAllLabel:{default:"Select all rows"},emptyMessage:{default:"No data"},loading:{type:Boolean,default:!1},loadingMessage:{default:"Loading..."},renderCell:{type:Function,default:void 0},ui:{default:void 0},variant:{default:"simple"},size:{default:"md"},hoverable:{type:Boolean,default:!1},stickyHeader:{type:Boolean,default:!1}},emits:["update:sort","update:selectedKeys"],setup(e,{emit:a}){const t=e,d=a;function m(n,o){if(typeof t.rowKey=="function")return t.rowKey(n,o);const l=n[t.rowKey??"id"];return l==null?String(o):String(l)}const c=u(()=>t.sort!==void 0),h=O(t.defaultSort),T=u(()=>c.value?t.sort??null:h.value),Q=u(()=>t.selectedKeys!==void 0),X=O([...t.defaultSelectedKeys]),k=u(()=>Q.value?t.selectedKeys:X.value),Y=u(()=>Be(t.rows,t.columns,T.value)),R=u(()=>t.rows.map((n,o)=>m(n,o))),de=u(()=>R.value.length>0&&R.value.every(n=>k.value.includes(n))),ue=u(()=>R.value.some(n=>k.value.includes(n))),Z=u(()=>t.columns.length+(t.selectable?1:0));function ce(n){const o=$e(T.value,n);c.value||(h.value=o),d("update:sort",o)}function ee(n){Q.value||(X.value=n),d("update:selectedKeys",n)}function me(n,o){ee(o===!0?[...k.value,n]:k.value.filter(l=>l!==n))}function be(n){ee(n===!0?R.value:[])}function fe(n,o){return t.selectionLabel?t.selectionLabel(n,o):`Select row ${o+1}`}function pe(n,o){const l=n[o.key];return l==null?"":String(l)}return(n,o)=>(s(),r("div",{class:"mild-data-table","aria-busy":e.loading||void 0},[f(D,ne({variant:e.variant,size:e.size,hoverable:e.hoverable,"sticky-header":e.stickyHeader,ui:{container:e.ui?.container}},n.$attrs),{default:i(()=>[e.caption?(s(),v(J,{key:0},{default:i(()=>[V(B(e.caption),1)]),_:1})):U("",!0),f(P,null,{default:i(()=>[f(w,{class:p(e.ui?.row)},{default:i(()=>[e.selectable?(s(),v(_,{key:0,class:p(C(H)("mild-table__selection",e.ui?.head))},{default:i(()=>[f(C(ae),{"aria-label":e.selectAllLabel,"model-value":de.value?!0:ue.value?"indeterminate":!1,disabled:R.value.length===0,onChange:be},null,8,["aria-label","model-value","disabled"])]),_:1},8,["class"])):U("",!0),(s(!0),r($,null,W(e.columns,l=>(s(),v(_,{key:l.key,align:l.align,numeric:l.numeric,sort:l.sortable?T.value?.key===l.key?T.value.direction:"none":void 0,style:Te(l.width?{width:l.width}:void 0),class:p(e.ui?.head)},{default:i(()=>[l.sortable?(s(),r("button",{key:0,type:"button",class:"mild-table__sort",onClick:b=>ce(l.key)},[V(B(l.header)+" ",1),te("span",{class:"mild-table__sort-icon","data-direction":T.value?.key===l.key?T.value.direction:"none","aria-hidden":"true"},[f(C(ye))],8,Fe)],8,qe)):(s(),r($,{key:1},[V(B(l.header),1)],64))]),_:2},1032,["align","numeric","sort","style","class"]))),128))]),_:1},8,["class"])]),_:1}),f(M,null,{default:i(()=>[e.loading?(s(),v(w,{key:0},{default:i(()=>[f(g,{colspan:Z.value,class:"mild-data-table__empty"},{default:i(()=>[f(C(we),{size:"sm",label:e.loadingMessage},null,8,["label"])]),_:1},8,["colspan"])]),_:1})):Y.value.length===0?(s(),v(w,{key:1},{default:i(()=>[f(g,{colspan:Z.value,class:"mild-data-table__empty"},{default:i(()=>[V(B(e.emptyMessage),1)]),_:1},8,["colspan"])]),_:1})):(s(!0),r($,{key:2},W(Y.value,l=>(s(),v(w,{key:m(l,e.rows.indexOf(l)),selected:e.selectable?k.value.includes(m(l,e.rows.indexOf(l))):void 0,class:p(e.ui?.row)},{default:i(()=>[e.selectable?(s(),v(g,{key:0,class:p(C(H)("mild-table__selection",e.ui?.cell))},{default:i(()=>[f(C(ae),{"aria-label":fe(l,e.rows.indexOf(l)),"model-value":k.value.includes(m(l,e.rows.indexOf(l))),onChange:b=>me(m(l,e.rows.indexOf(l)),b)},null,8,["aria-label","model-value","onChange"])]),_:2},1032,["class"])):U("",!0),(s(!0),r($,null,W(e.columns,b=>(s(),v(g,{key:b.key,align:b.align,numeric:b.numeric,class:p(e.ui?.cell)},{default:i(()=>[y(n.$slots,"cell",{row:l,column:b,index:e.rows.indexOf(l),value:l[b.key]},()=>[e.renderCell?(s(),v(ve(()=>e.renderCell(l,b,e.rows.indexOf(l))),{key:0})):(s(),r($,{key:1},[V(B(pe(l,b)),1)],64))])]),_:2},1032,["align","numeric","class"]))),128))]),_:2},1032,["selected","class"]))),128))]),_:3})]),_:3},16,["variant","size","hoverable","sticky-header","ui"])],8,Ae))}});A.__docgenInfo={exportName:"default",displayName:"DataTable",description:"",tags:{},props:[{name:"stickyHeader",description:"Keep the header row visible while the container scrolls.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"hoverable",description:"Highlight body rows on hover.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"size",description:'Cell padding. Default `"md"`.',required:!1,type:{name:"TableSize"},defaultValue:{func:!1,value:'"md"'}},{name:"variant",description:'Visual style. Default `"simple"`.',required:!1,type:{name:"TableVariant"},defaultValue:{func:!1,value:'"simple"'}},{name:"columns",required:!0,type:{name:"Array",elements:[{name:"DataTableColumn",elements:[{name:"Row"}]}]}},{name:"rows",required:!0,type:{name:"Array",elements:[{name:"Row"}]}},{name:"rowKey",description:'Row property used as the stable key (default `"id"`, else the index), or a function.',required:!1,type:{name:"union",elements:[{name:"string"},{name:"TSParenthesizedType"}]},defaultValue:{func:!1,value:"undefined"}},{name:"caption",description:"Table caption: the table's accessible name.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"sort",description:"`v-model:sort`: controlled sort.",required:!1,type:{name:"union",elements:[{name:"DataTableSort"},{name:"null"}]},defaultValue:{func:!1,value:"undefined"}},{name:"defaultSort",description:"Initial sort when uncontrolled.",required:!1,type:{name:"union",elements:[{name:"DataTableSort"},{name:"null"}]},defaultValue:{func:!1,value:"null"}},{name:"selectable",description:"Render a checkbox per row and a select-all header.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"selectedKeys",description:"`v-model:selectedKeys`: controlled selection (row keys).",required:!1,type:{name:"Array",elements:[{name:"string"}]},defaultValue:{func:!1,value:"undefined"}},{name:"defaultSelectedKeys",description:"Initial selection when uncontrolled.",required:!1,type:{name:"Array",elements:[{name:"string"}]},defaultValue:{func:!1,value:"() => []"}},{name:"selectionLabel",description:'Accessible name of a row\'s checkbox. Default `"Select row N"`.',required:!1,type:{name:"TSFunctionType"},defaultValue:{func:!1,value:"undefined"}},{name:"selectAllLabel",description:'Accessible name of the select-all checkbox. Default `"Select all rows"`.',required:!1,type:{name:"string"},defaultValue:{func:!1,value:'"Select all rows"'}},{name:"emptyMessage",description:'Shown across every column when there are no rows. Default `"No data"`.',required:!1,type:{name:"string"},defaultValue:{func:!1,value:'"No data"'}},{name:"loading",description:"Announces the table as busy and shows `loadingMessage` instead of the rows.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"loadingMessage",description:'Default `"Loading..."`.',required:!1,type:{name:"string"},defaultValue:{func:!1,value:'"Loading..."'}},{name:"renderCell",description:"Custom cell renderer; the default prints `row[key]`. The `cell` slot is an alternative.",required:!1,type:{name:"TSFunctionType"},defaultValue:{func:!1,value:"undefined"}},{name:"ui",required:!1,type:{name:"DataTableUiClasses"},defaultValue:{func:!1,value:"undefined"}}],events:[{name:"update:sort",type:{names:["DataTableSort"]},description:"`v-model:sort`"},{name:"update:selectedKeys",type:{names:["Array"],elements:[{name:"string"}]},description:"`v-model:selectedKeys`"}],slots:[{name:"cell",scoped:!0,bindings:[{name:"row",title:"binding"},{name:"column",title:"binding"},{name:"index",title:"binding"},{name:"value",title:"binding"}],description:"Custom cell content; receives `{ row, column, index, value }`."}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/DataTable/DataTable.vue"]};const j=[{key:"customer",header:"Customer",sortable:!0},{key:"status",header:"Status",sortable:!0},{key:"due",header:"Due",sortable:!0},{key:"amount",header:"Amount",numeric:!0,sortable:!0,width:"8rem"}],S=[{id:"inv-1",customer:"Ada Lovelace",status:"Paid",amount:250,due:"2025-01-12"},{id:"inv-2",customer:"Grace Hopper",status:"Pending",amount:125,due:"2025-02-03"},{id:"inv-3",customer:"Alan Turing",status:"Overdue",amount:400,due:"2024-12-20"},{id:"inv-4",customer:"Katherine Johnson",status:"Paid",amount:980,due:"2025-01-30"},{id:"inv-5",customer:"Margaret Hamilton",status:"Pending",amount:310,due:"2025-02-14"}],Ee={title:"Data Display/Table",component:D,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Data table in a horizontally scrolling container. Compose `TableCaption`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead` and `TableCell`, or hand `DataTable` your `columns` and `rows` and get sorting (`aria-sort` per the [WAI-ARIA APG sortable table](https://www.w3.org/WAI/ARIA/apg/patterns/table/examples/sortable-table/)) and row selection (`aria-selected` + a tri-state select-all checkbox). Keyboard behaviour is covered in `packages/vue/src/components/DataTable/DataTable.test.ts`."}}},argTypes:{variant:{control:"radio",options:["simple","striped","outline"]},size:{control:"radio",options:["sm","md","lg"]},hoverable:{control:"boolean"},stickyHeader:{control:"boolean"}},args:{variant:"simple",size:"md",hoverable:!1,stickyHeader:!1}},q={render:e=>({components:{Table:D,TableBody:M,TableCaption:J,TableCell:g,TableFooter:De,TableHead:_,TableHeader:P,TableRow:w,Badge:se},setup:()=>({args:e,rows:S}),template:`
      <Table v-bind="args" class="w-[44rem]">
        <TableCaption>Invoices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead numeric>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="row in rows" :key="row.id" :selected="row.id === 'inv-2'">
            <TableCell>{{ row.customer }}</TableCell>
            <TableCell>
              <Badge :color-scheme="row.status === 'Paid' ? 'success' : row.status === 'Overdue' ? 'danger' : 'warning'">
                {{ row.status }}
              </Badge>
            </TableCell>
            <TableCell numeric>\${{ row.amount.toFixed(2) }}</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colspan="2">Total</TableCell>
            <TableCell numeric>\${{ rows.reduce((sum, row) => sum + row.amount, 0).toFixed(2) }}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    `})},F={render:()=>({components:{Table:D,TableBody:M,TableCell:g,TableHead:_,TableHeader:P,TableRow:w,Text:G},setup:()=>({rows:S.slice(0,3),variants:["simple","striped","outline"]}),template:`
      <div class="flex flex-col gap-6 w-[40rem]">
        <div v-for="variant in variants" :key="variant">
          <Text as="p" font-weight="medium" class="mb-2">{{ variant }}</Text>
          <Table :variant="variant" size="sm" hoverable>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead align="center">Status</TableHead>
                <TableHead numeric>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="row in rows" :key="row.id">
                <TableCell>{{ row.customer }}</TableCell>
                <TableCell align="center">{{ row.status }}</TableCell>
                <TableCell numeric>{{ row.amount }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    `})},N={name:"Sticky header",render:()=>({components:{Table:D,TableBody:M,TableCell:g,TableHead:_,TableHeader:P,TableRow:w},setup:()=>({rows:Array.from({length:30},(e,a)=>({id:a+1,name:`Row ${a+1}`,value:(a+1)*7}))}),template:`
      <Table sticky-header variant="striped" size="sm" :ui="{ container: 'max-h-64 w-[28rem]' }">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead numeric>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="row in rows" :key="row.id">
            <TableCell>{{ row.id }}</TableCell>
            <TableCell>{{ row.name }}</TableCell>
            <TableCell numeric>{{ row.value }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    `})},K={name:"DataTable: sortable",render:()=>({components:{DataTable:A,Text:G},setup(){const e=O({key:"due",direction:"ascending"});return{columns:j,rows:S,sort:e}},template:`
      <div class="flex flex-col gap-3 w-[44rem]">
        <DataTable :columns="columns" :rows="rows" caption="Invoices" v-model:sort="sort" hoverable />
        <Text as="p" font-size="sm" color="muted">Sort: {{ sort ? sort.key + ' ' + sort.direction : 'none' }}</Text>
      </div>
    `})},z={name:"DataTable: selectable",render:()=>({components:{DataTable:A,Text:G},setup(){const e=O(["inv-2"]);return{columns:j,rows:S,selectedKeys:e}},template:`
      <div class="flex flex-col gap-3 w-[46rem]">
        <DataTable
          :columns="columns"
          :rows="rows"
          caption="Invoices"
          selectable
          v-model:selected-keys="selectedKeys"
          :selection-label="(row) => 'Select ' + row.customer"
          variant="striped"
        />
        <Text as="p" font-size="sm" color="muted">Selected: {{ selectedKeys.join(', ') || 'none' }}</Text>
      </div>
    `})},I={name:"DataTable: custom cells",render:()=>({components:{DataTable:A,Badge:se},setup:()=>({columns:j,rows:S}),template:`
      <DataTable :columns="columns" :rows="rows" caption="Invoices" class="w-[44rem]">
        <template #cell="{ column, value, row }">
          <Badge v-if="column.key === 'status'" :color-scheme="row.status === 'Paid' ? 'success' : row.status === 'Overdue' ? 'danger' : 'warning'">
            {{ value }}
          </Badge>
          <template v-else-if="column.key === 'amount'">\${{ Number(value).toFixed(2) }}</template>
          <template v-else>{{ value }}</template>
        </template>
      </DataTable>
    `})},L={name:"DataTable: empty and loading",render:()=>({components:{DataTable:A},setup:()=>({columns:j,rows:S}),template:`
      <div class="flex flex-col gap-6 w-[44rem]">
        <DataTable :columns="columns" :rows="[]" caption="No invoices" empty-message="No invoices yet" />
        <DataTable :columns="columns" :rows="rows" caption="Loading invoices" loading loading-message="Loading invoices" />
      </div>
    `})};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Table,
      TableBody,
      TableCaption,
      TableCell,
      TableFooter,
      TableHead,
      TableHeader,
      TableRow,
      Badge
    },
    setup: () => ({
      args,
      rows
    }),
    template: \`
      <Table v-bind="args" class="w-[44rem]">
        <TableCaption>Invoices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead numeric>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="row in rows" :key="row.id" :selected="row.id === 'inv-2'">
            <TableCell>{{ row.customer }}</TableCell>
            <TableCell>
              <Badge :color-scheme="row.status === 'Paid' ? 'success' : row.status === 'Overdue' ? 'danger' : 'warning'">
                {{ row.status }}
              </Badge>
            </TableCell>
            <TableCell numeric>\\\${{ row.amount.toFixed(2) }}</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colspan="2">Total</TableCell>
            <TableCell numeric>\\\${{ rows.reduce((sum, row) => sum + row.amount, 0).toFixed(2) }}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    \`
  })
}`,...q.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
      Text
    },
    setup: () => ({
      rows: rows.slice(0, 3),
      variants: ["simple", "striped", "outline"]
    }),
    template: \`
      <div class="flex flex-col gap-6 w-[40rem]">
        <div v-for="variant in variants" :key="variant">
          <Text as="p" font-weight="medium" class="mb-2">{{ variant }}</Text>
          <Table :variant="variant" size="sm" hoverable>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead align="center">Status</TableHead>
                <TableHead numeric>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="row in rows" :key="row.id">
                <TableCell>{{ row.customer }}</TableCell>
                <TableCell align="center">{{ row.status }}</TableCell>
                <TableCell numeric>{{ row.amount }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    \`
  })
}`,...F.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: "Sticky header",
  render: () => ({
    components: {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow
    },
    setup: () => ({
      rows: Array.from({
        length: 30
      }, (_, index) => ({
        id: index + 1,
        name: \`Row \${index + 1}\`,
        value: (index + 1) * 7
      }))
    }),
    template: \`
      <Table sticky-header variant="striped" size="sm" :ui="{ container: 'max-h-64 w-[28rem]' }">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead numeric>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="row in rows" :key="row.id">
            <TableCell>{{ row.id }}</TableCell>
            <TableCell>{{ row.name }}</TableCell>
            <TableCell numeric>{{ row.value }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    \`
  })
}`,...N.parameters?.docs?.source}}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: "DataTable: sortable",
  render: () => ({
    components: {
      DataTable,
      Text
    },
    setup() {
      const sort = ref<DataTableSort | null>({
        key: "due",
        direction: "ascending"
      });
      return {
        columns,
        rows,
        sort
      };
    },
    template: \`
      <div class="flex flex-col gap-3 w-[44rem]">
        <DataTable :columns="columns" :rows="rows" caption="Invoices" v-model:sort="sort" hoverable />
        <Text as="p" font-size="sm" color="muted">Sort: {{ sort ? sort.key + ' ' + sort.direction : 'none' }}</Text>
      </div>
    \`
  })
}`,...K.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: "DataTable: selectable",
  render: () => ({
    components: {
      DataTable,
      Text
    },
    setup() {
      const selectedKeys = ref<string[]>(["inv-2"]);
      return {
        columns,
        rows,
        selectedKeys
      };
    },
    template: \`
      <div class="flex flex-col gap-3 w-[46rem]">
        <DataTable
          :columns="columns"
          :rows="rows"
          caption="Invoices"
          selectable
          v-model:selected-keys="selectedKeys"
          :selection-label="(row) => 'Select ' + row.customer"
          variant="striped"
        />
        <Text as="p" font-size="sm" color="muted">Selected: {{ selectedKeys.join(', ') || 'none' }}</Text>
      </div>
    \`
  })
}`,...z.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: "DataTable: custom cells",
  render: () => ({
    components: {
      DataTable,
      Badge
    },
    setup: () => ({
      columns,
      rows
    }),
    template: \`
      <DataTable :columns="columns" :rows="rows" caption="Invoices" class="w-[44rem]">
        <template #cell="{ column, value, row }">
          <Badge v-if="column.key === 'status'" :color-scheme="row.status === 'Paid' ? 'success' : row.status === 'Overdue' ? 'danger' : 'warning'">
            {{ value }}
          </Badge>
          <template v-else-if="column.key === 'amount'">\\\${{ Number(value).toFixed(2) }}</template>
          <template v-else>{{ value }}</template>
        </template>
      </DataTable>
    \`
  })
}`,...I.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: "DataTable: empty and loading",
  render: () => ({
    components: {
      DataTable
    },
    setup: () => ({
      columns,
      rows
    }),
    template: \`
      <div class="flex flex-col gap-6 w-[44rem]">
        <DataTable :columns="columns" :rows="[]" caption="No invoices" empty-message="No invoices yet" />
        <DataTable :columns="columns" :rows="rows" caption="Loading invoices" loading loading-message="Loading invoices" />
      </div>
    \`
  })
}`,...L.parameters?.docs?.source}}};const Ge=["Composed","Variants","StickyHeader","DataTableSortable","DataTableSelectable","DataTableCustomCells","DataTableStates"];export{q as Composed,I as DataTableCustomCells,z as DataTableSelectable,K as DataTableSortable,L as DataTableStates,N as StickyHeader,F as Variants,Ge as __namedExportsOrder,Ee as default};
