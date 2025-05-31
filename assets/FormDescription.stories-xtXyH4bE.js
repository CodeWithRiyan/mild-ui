var re=Object.defineProperty,ne=Object.defineProperties;var oe=Object.getOwnPropertyDescriptors;var A=Object.getOwnPropertySymbols;var se=Object.prototype.hasOwnProperty,te=Object.prototype.propertyIsEnumerable;var W=(n,s,t)=>s in n?re(n,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[s]=t,r=(n,s)=>{for(var t in s||(s={}))se.call(s,t)&&W(n,t,s[t]);if(A)for(var t of A(s))te.call(s,t)&&W(n,t,s[t]);return n},o=(n,s)=>ne(n,oe(s));import{a as e,j as a}from"./jsx-runtime-Cr617v10.js";import{u as $,F as ee}from"./index.esm-0XuDu32R.js";import{G as i,l as F,U as f,H as b,b as w,u as x}from"./index-BfP1bvMz.js";import"./index-D2dH9QXU.js";import"./_commonjsHelpers-CDgoFxsB.js";import"./index-8BIPUTFA.js";const ue={title:"Components/Form/FormDescription",component:i,parameters:{layout:"centered",docs:{description:{component:"A form description component for providing helpful text and instructions to users."}}},argTypes:{children:{control:"text",description:"Description text content"},className:{control:"text",description:"Additional CSS classes"}}},c=({children:n,fieldName:s="testField",labelText:t="Field Label"})=>{const v=$({defaultValues:{[s]:""}});return e(ee,o(r({},v),{children:e(F,{control:v.control,name:s,render:()=>a(f,{children:[e(b,{children:t}),e(w,{children:e(x,{placeholder:"Sample input"})}),n]})})}))},p={render:n=>e(c,{children:e(i,o(r({},n),{children:"Enter your username. It must be unique and contain only letters and numbers."}))}),parameters:{docs:{storyDescription:"A basic form description providing helpful information to users."}}},l={render:n=>e(c,{children:e(i,o(r({},n),{children:"Required field"}))}),parameters:{docs:{storyDescription:"A short, concise form description."}}},m={render:n=>e(c,{children:e(i,o(r({},n),{children:"This is a longer description that provides detailed instructions about what the user should enter in this field. It can span multiple lines and provide comprehensive guidance to help users understand the requirements and expectations."}))}),parameters:{docs:{storyDescription:"A longer form description that spans multiple lines."}}},d={render:n=>e(c,{children:a(i,o(r({},n),{children:["Password must contain at least ",e("strong",{children:"8 characters"}),", including one ",e("em",{children:"uppercase letter"})," and one ",e("em",{children:"number"}),"."]}))}),parameters:{docs:{storyDescription:"A form description containing HTML markup for emphasis."}}},u={render:n=>e(c,{children:e(i,o(r({},n),{className:"text-blue-600 font-medium",children:"This description has custom styling applied"}))}),parameters:{docs:{storyDescription:"A form description with custom CSS styling."}}},h={render:n=>e(c,{labelText:"API Key",children:e(i,o(r({},n),{children:"You can find your API key in your account settings. Keep it secure and don't share it publicly."}))}),parameters:{docs:{storyDescription:"A form description providing specific instructions for finding information."}}},g={render:n=>e(c,{labelText:"Delete Account",children:e(i,o(r({},n),{className:"text-orange-600 font-medium",children:"⚠️ This action cannot be undone. All your data will be permanently deleted."}))}),parameters:{docs:{storyDescription:"A form description styled as a warning with custom colors and an icon."}}},D={render:()=>{const n=$({defaultValues:{username:"",email:"",password:""}});return e(ee,o(r({},n),{children:a("div",{className:"space-y-6 w-96",children:[e(F,{control:n.control,name:"username",render:()=>a(f,{children:[e(b,{children:"Username"}),e(w,{children:e(x,{placeholder:"Enter username"})}),e(i,{children:"Choose a unique username that you'll use to log in."})]})}),e(F,{control:n.control,name:"email",render:()=>a(f,{children:[e(b,{children:"Email"}),e(w,{children:e(x,{type:"email",placeholder:"Enter email"})}),e(i,{children:"We'll use this email to send you important updates about your account. Make sure it's an email you check regularly."})]})}),e(F,{control:n.control,name:"password",render:()=>a(f,{children:[e(b,{children:"Password"}),e(w,{children:e(x,{type:"password",placeholder:"Enter password"})}),a(i,{className:"text-orange-600",children:[e("strong",{children:"Security tip:"})," Use a combination of uppercase letters, lowercase letters, numbers, and symbols for a strong password."]})]})})]})}))},parameters:{docs:{storyDescription:"Multiple form descriptions showing different styles and content lengths."}}},y={render:n=>e(c,{labelText:"Terms of Service",children:a(i,o(r({},n),{children:["By creating an account, you agree to our"," ",e("a",{href:"#",className:"text-blue-600 underline hover:text-blue-800",children:"Terms of Service"})," ","and"," ",e("a",{href:"#",className:"text-blue-600 underline hover:text-blue-800",children:"Privacy Policy"}),"."]}))}),parameters:{docs:{storyDescription:"A form description containing clickable links."}}};var S,I,T;p.parameters=o(r({},p.parameters),{docs:o(r({},(S=p.parameters)==null?void 0:S.docs),{source:r({originalSource:`{
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
}`},(T=(I=p.parameters)==null?void 0:I.docs)==null?void 0:T.source)})});var k,P,C;l.parameters=o(r({},l.parameters),{docs:o(r({},(k=l.parameters)==null?void 0:k.docs),{source:r({originalSource:`{
  render: args => <FormDescriptionWrapper>
      <FormDescription {...args}>Required field</FormDescription>
    </FormDescriptionWrapper>,
  parameters: {
    docs: {
      storyDescription: "A short, concise form description."
    }
  }
}`},(C=(P=l.parameters)==null?void 0:P.docs)==null?void 0:C.source)})});var L,E,N;m.parameters=o(r({},m.parameters),{docs:o(r({},(L=m.parameters)==null?void 0:L.docs),{source:r({originalSource:`{
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
}`},(N=(E=m.parameters)==null?void 0:E.docs)==null?void 0:N.source)})});var M,q,U;d.parameters=o(r({},d.parameters),{docs:o(r({},(M=d.parameters)==null?void 0:M.docs),{source:r({originalSource:`{
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
}`},(U=(q=d.parameters)==null?void 0:q.docs)==null?void 0:U.source)})});var K,B,H;u.parameters=o(r({},u.parameters),{docs:o(r({},(K=u.parameters)==null?void 0:K.docs),{source:r({originalSource:`{
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
}`},(H=(B=u.parameters)==null?void 0:B.docs)==null?void 0:H.source)})});var j,V,G;h.parameters=o(r({},h.parameters),{docs:o(r({},(j=h.parameters)==null?void 0:j.docs),{source:r({originalSource:`{
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
}`},(G=(V=h.parameters)==null?void 0:V.docs)==null?void 0:G.source)})});var R,Y,_;g.parameters=o(r({},g.parameters),{docs:o(r({},(R=g.parameters)==null?void 0:R.docs),{source:r({originalSource:`{
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
}`},(_=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:_.source)})});var O,z,J;D.parameters=o(r({},D.parameters),{docs:o(r({},(O=D.parameters)==null?void 0:O.docs),{source:r({originalSource:`{
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
}`},(J=(z=D.parameters)==null?void 0:z.docs)==null?void 0:J.source)})});var Q,X,Z;y.parameters=o(r({},y.parameters),{docs:o(r({},(Q=y.parameters)==null?void 0:Q.docs),{source:r({originalSource:`{
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
}`},(Z=(X=y.parameters)==null?void 0:X.docs)==null?void 0:Z.source)})});const he=["BasicDescription","ShortDescription","LongDescription","DescriptionWithMarkup","CustomStyledDescription","DescriptionWithInstructions","WarningDescription","MultipleDescriptions","DescriptionWithLinks"];export{p as BasicDescription,u as CustomStyledDescription,h as DescriptionWithInstructions,y as DescriptionWithLinks,d as DescriptionWithMarkup,m as LongDescription,D as MultipleDescriptions,l as ShortDescription,g as WarningDescription,he as __namedExportsOrder,ue as default};
