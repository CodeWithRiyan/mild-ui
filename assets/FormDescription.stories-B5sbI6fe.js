var re=Object.defineProperty,ne=Object.defineProperties;var oe=Object.getOwnPropertyDescriptors;var A=Object.getOwnPropertySymbols;var se=Object.prototype.hasOwnProperty,te=Object.prototype.propertyIsEnumerable;var W=(n,s,t)=>s in n?re(n,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[s]=t,r=(n,s)=>{for(var t in s||(s={}))se.call(s,t)&&W(n,t,s[t]);if(A)for(var t of A(s))te.call(s,t)&&W(n,t,s[t]);return n},o=(n,s)=>ne(n,oe(s));import{a as e,j as a}from"./jsx-runtime-Cr617v10.js";import{u as $,F as ee}from"./index.esm-CovI7bOW.js";import{c as i,d as f,e as y,a as b,f as w}from"./Form-6JD4W4bJ.js";import{I as x}from"./Input-BSIDeAe2.js";import"./index-D2dH9QXU.js";import"./_commonjsHelpers-CDgoFxsB.js";import"./index-yjVGmfkS.js";import"./cn-C4RepMSz.js";import"./Label-BIqHYFl8.js";const Fe={title:"Components/Form/FormDescription",component:i,parameters:{layout:"centered",docs:{description:{component:"A form description component for providing helpful text and instructions to users."}}},argTypes:{children:{control:"text",description:"Description text content"},className:{control:"text",description:"Additional CSS classes"}}},c=({children:n,fieldName:s="testField",labelText:t="Field Label"})=>{const v=$({defaultValues:{[s]:""}});return e(ee,o(r({},v),{children:e(f,{control:v.control,name:s,render:()=>a(y,{children:[e(b,{children:t}),e(w,{children:e(x,{placeholder:"Sample input"})}),n]})})}))},p={render:n=>e(c,{children:e(i,o(r({},n),{children:"Enter your username. It must be unique and contain only letters and numbers."}))}),parameters:{docs:{storyDescription:"A basic form description providing helpful information to users."}}},m={render:n=>e(c,{children:e(i,o(r({},n),{children:"Required field"}))}),parameters:{docs:{storyDescription:"A short, concise form description."}}},l={render:n=>e(c,{children:e(i,o(r({},n),{children:"This is a longer description that provides detailed instructions about what the user should enter in this field. It can span multiple lines and provide comprehensive guidance to help users understand the requirements and expectations."}))}),parameters:{docs:{storyDescription:"A longer form description that spans multiple lines."}}},d={render:n=>e(c,{children:a(i,o(r({},n),{children:["Password must contain at least ",e("strong",{children:"8 characters"}),", including one ",e("em",{children:"uppercase letter"})," and one ",e("em",{children:"number"}),"."]}))}),parameters:{docs:{storyDescription:"A form description containing HTML markup for emphasis."}}},u={render:n=>e(c,{children:e(i,o(r({},n),{className:"text-blue-600 font-medium",children:"This description has custom styling applied"}))}),parameters:{docs:{storyDescription:"A form description with custom CSS styling."}}},h={render:n=>e(c,{labelText:"API Key",children:e(i,o(r({},n),{children:"You can find your API key in your account settings. Keep it secure and don't share it publicly."}))}),parameters:{docs:{storyDescription:"A form description providing specific instructions for finding information."}}},g={render:n=>e(c,{labelText:"Delete Account",children:e(i,o(r({},n),{className:"text-orange-600 font-medium",children:"⚠️ This action cannot be undone. All your data will be permanently deleted."}))}),parameters:{docs:{storyDescription:"A form description styled as a warning with custom colors and an icon."}}},F={render:()=>{const n=$({defaultValues:{username:"",email:"",password:""}});return e(ee,o(r({},n),{children:a("div",{className:"space-y-6 w-96",children:[e(f,{control:n.control,name:"username",render:()=>a(y,{children:[e(b,{children:"Username"}),e(w,{children:e(x,{placeholder:"Enter username"})}),e(i,{children:"Choose a unique username that you'll use to log in."})]})}),e(f,{control:n.control,name:"email",render:()=>a(y,{children:[e(b,{children:"Email"}),e(w,{children:e(x,{type:"email",placeholder:"Enter email"})}),e(i,{children:"We'll use this email to send you important updates about your account. Make sure it's an email you check regularly."})]})}),e(f,{control:n.control,name:"password",render:()=>a(y,{children:[e(b,{children:"Password"}),e(w,{children:e(x,{type:"password",placeholder:"Enter password"})}),a(i,{className:"text-orange-600",children:[e("strong",{children:"Security tip:"})," Use a combination of uppercase letters, lowercase letters, numbers, and symbols for a strong password."]})]})})]})}))},parameters:{docs:{storyDescription:"Multiple form descriptions showing different styles and content lengths."}}},D={render:n=>e(c,{labelText:"Terms of Service",children:a(i,o(r({},n),{children:["By creating an account, you agree to our"," ",e("a",{href:"#",className:"text-blue-600 underline hover:text-blue-800",children:"Terms of Service"})," ","and"," ",e("a",{href:"#",className:"text-blue-600 underline hover:text-blue-800",children:"Privacy Policy"}),"."]}))}),parameters:{docs:{storyDescription:"A form description containing clickable links."}}};var S,I,T;p.parameters=o(r({},p.parameters),{docs:o(r({},(S=p.parameters)==null?void 0:S.docs),{source:r({originalSource:`{
  render: args => <FormDescriptionWrapper>
      <FormDescription {...args}>
        Enter your username. It must be unique and contain only letters and
        numbers.
      </FormDescription>
    </FormDescriptionWrapper>,
  parameters: {
    docs: {
      storyDescription: "A basic form description providing helpful information to users."
    }
  }
}`},(T=(I=p.parameters)==null?void 0:I.docs)==null?void 0:T.source)})});var k,C,P;m.parameters=o(r({},m.parameters),{docs:o(r({},(k=m.parameters)==null?void 0:k.docs),{source:r({originalSource:`{
  render: args => <FormDescriptionWrapper>
      <FormDescription {...args}>Required field</FormDescription>
    </FormDescriptionWrapper>,
  parameters: {
    docs: {
      storyDescription: "A short, concise form description."
    }
  }
}`},(P=(C=m.parameters)==null?void 0:C.docs)==null?void 0:P.source)})});var L,E,N;l.parameters=o(r({},l.parameters),{docs:o(r({},(L=l.parameters)==null?void 0:L.docs),{source:r({originalSource:`{
  render: args => <FormDescriptionWrapper>
      <FormDescription {...args}>
        This is a longer description that provides detailed instructions about
        what the user should enter in this field. It can span multiple lines and
        provide comprehensive guidance to help users understand the requirements
        and expectations.
      </FormDescription>
    </FormDescriptionWrapper>,
  parameters: {
    docs: {
      storyDescription: "A longer form description that spans multiple lines."
    }
  }
}`},(N=(E=l.parameters)==null?void 0:E.docs)==null?void 0:N.source)})});var M,q,B;d.parameters=o(r({},d.parameters),{docs:o(r({},(M=d.parameters)==null?void 0:M.docs),{source:r({originalSource:`{
  render: args => <FormDescriptionWrapper>
      <FormDescription {...args}>
        Password must contain at least <strong>8 characters</strong>, including
        one <em>uppercase letter</em> and one <em>number</em>.
      </FormDescription>
    </FormDescriptionWrapper>,
  parameters: {
    docs: {
      storyDescription: "A form description containing HTML markup for emphasis."
    }
  }
}`},(B=(q=d.parameters)==null?void 0:q.docs)==null?void 0:B.source)})});var K,U,j;u.parameters=o(r({},u.parameters),{docs:o(r({},(K=u.parameters)==null?void 0:K.docs),{source:r({originalSource:`{
  render: args => <FormDescriptionWrapper>
      <FormDescription {...args} className="text-blue-600 font-medium">
        This description has custom styling applied
      </FormDescription>
    </FormDescriptionWrapper>,
  parameters: {
    docs: {
      storyDescription: "A form description with custom CSS styling."
    }
  }
}`},(j=(U=u.parameters)==null?void 0:U.docs)==null?void 0:j.source)})});var V,H,R;h.parameters=o(r({},h.parameters),{docs:o(r({},(V=h.parameters)==null?void 0:V.docs),{source:r({originalSource:`{
  render: args => <FormDescriptionWrapper labelText="API Key">
      <FormDescription {...args}>
        You can find your API key in your account settings. Keep it secure and
        don't share it publicly.
      </FormDescription>
    </FormDescriptionWrapper>,
  parameters: {
    docs: {
      storyDescription: "A form description providing specific instructions for finding information."
    }
  }
}`},(R=(H=h.parameters)==null?void 0:H.docs)==null?void 0:R.source)})});var Y,_,O;g.parameters=o(r({},g.parameters),{docs:o(r({},(Y=g.parameters)==null?void 0:Y.docs),{source:r({originalSource:`{
  render: args => <FormDescriptionWrapper labelText="Delete Account">
      <FormDescription {...args} className="text-orange-600 font-medium">
        ⚠️ This action cannot be undone. All your data will be permanently
        deleted.
      </FormDescription>
    </FormDescriptionWrapper>,
  parameters: {
    docs: {
      storyDescription: "A form description styled as a warning with custom colors and an icon."
    }
  }
}`},(O=(_=g.parameters)==null?void 0:_.docs)==null?void 0:O.source)})});var z,G,J;F.parameters=o(r({},F.parameters),{docs:o(r({},(z=F.parameters)==null?void 0:z.docs),{source:r({originalSource:`{
  render: () => {
    const form = useForm({
      defaultValues: {
        username: "",
        email: "",
        password: ""
      }
    });
    return <FormProvider {...form}>
        <div className="space-y-6 w-96">
          <FormField control={form.control} name="username" render={() => <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username" />
                </FormControl>
                <FormDescription>
                  Choose a unique username that you'll use to log in.
                </FormDescription>
              </FormItem>} />

          <FormField control={form.control} name="email" render={() => <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter email" />
                </FormControl>
                <FormDescription>
                  We'll use this email to send you important updates about your
                  account. Make sure it's an email you check regularly.
                </FormDescription>
              </FormItem>} />

          <FormField control={form.control} name="password" render={() => <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter password" />
                </FormControl>
                <FormDescription className="text-orange-600">
                  <strong>Security tip:</strong> Use a combination of uppercase
                  letters, lowercase letters, numbers, and symbols for a strong
                  password.
                </FormDescription>
              </FormItem>} />
        </div>
      </FormProvider>;
  },
  parameters: {
    docs: {
      storyDescription: "Multiple form descriptions showing different styles and content lengths."
    }
  }
}`},(J=(G=F.parameters)==null?void 0:G.docs)==null?void 0:J.source)})});var Q,X,Z;D.parameters=o(r({},D.parameters),{docs:o(r({},(Q=D.parameters)==null?void 0:Q.docs),{source:r({originalSource:`{
  render: args => <FormDescriptionWrapper labelText="Terms of Service">
      <FormDescription {...args}>
        By creating an account, you agree to our{" "}
        <a href="#" className="text-blue-600 underline hover:text-blue-800">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-blue-600 underline hover:text-blue-800">
          Privacy Policy
        </a>
        .
      </FormDescription>
    </FormDescriptionWrapper>,
  parameters: {
    docs: {
      storyDescription: "A form description containing clickable links."
    }
  }
}`},(Z=(X=D.parameters)==null?void 0:X.docs)==null?void 0:Z.source)})});const De=["BasicDescription","ShortDescription","LongDescription","DescriptionWithMarkup","CustomStyledDescription","DescriptionWithInstructions","WarningDescription","MultipleDescriptions","DescriptionWithLinks"];export{p as BasicDescription,u as CustomStyledDescription,h as DescriptionWithInstructions,D as DescriptionWithLinks,d as DescriptionWithMarkup,l as LongDescription,F as MultipleDescriptions,m as ShortDescription,g as WarningDescription,De as __namedExportsOrder,Fe as default};
