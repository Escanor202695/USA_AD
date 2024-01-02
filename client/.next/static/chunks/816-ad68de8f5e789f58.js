"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[816],{82816:function(e,l,n){var t=n(57437),a=n(2265),o=n(40613),i=n(79404),r=n(83905),s=n(25126),u=n(8287),d=n(73019),c=n(84792),v=n(73376),m=n(60171),h=n(24033),f=n(33071);l.Z=e=>{let{preview:l,formValues:n}=e,[g]=i.Z.useForm(),[p,x]=(0,a.useState)(!0),[y,b]=(0,a.useState)([]),[j,Z]=(0,a.useState)([]),[w,S]=(0,a.useState)([]),C=(0,h.useRouter)(),fetchData=async()=>{var e;let l=await o.Z.get("/dynamicform/country-state-city"),n=null===(e=l.data)||void 0===e?void 0:e.countries;b(n)};(0,a.useEffect)(()=>{fetchData()},[]);let handleCountryChange=e=>{let l=y.find(l=>l.name===e);l?(Z(l.states||[]),g.setFieldsValue({State:void 0,City:void 0})):Z([])},handleStateChange=e=>{let l=j.find(l=>l.name===e);l?(S(l.cities||[]),g.setFieldsValue({City:void 0})):S([])},handleFormSubmit=async e=>{if(!localStorage.getItem("token")){f.Z.confirm({title:"You need to login first",content:"Are you a valid user?",okText:"Login",okButtonProps:{style:{background:"red",borderColor:"red"}},onOk:()=>C.push("/login")});return}let l=Object.keys(e).find(l=>{var n,t,a,o,i;return Array.isArray(null===(n=e[l])||void 0===n?void 0:n.fileList)&&(null===(a=e[l])||void 0===a?void 0:null===(t=a.fileList[0])||void 0===t?void 0:t.response)||(null===(i=e[l])||void 0===i?void 0:null===(o=i.file)||void 0===o?void 0:o.response)});if(l){var t,a,i,r,s;Array.isArray(null===(t=e[l])||void 0===t?void 0:t.fileList)&&(null===(i=e[l])||void 0===i?void 0:null===(a=i.fileList[0])||void 0===a?void 0:a.response)?e[l]=e[l].fileList.map(e=>e.response):(null===(s=e[l])||void 0===s?void 0:null===(r=s.file)||void 0===r?void 0:r.response)&&(e[l]=[e[l].file.response])}console.log(e);let u={};n.forEach(l=>{u[l.section]={},l.fields.forEach(n=>{u[l.section][n.name]=e[n.name]})}),console.log(u);let d=await o.Z.post("/dynamicform/formdata",{data:u,email:localStorage.getItem("useremail")});console.log(d.data),m.Am.success("Form submitted successfully"),g.resetFields()};return(0,t.jsxs)("div",{className:"border bg-[#101827] rounded-lg border-[#F04D99] w-[100%] md:w-[75%] lg:w-[60%] mx-auto",children:[(0,t.jsxs)(i.Z,{form:g,onFinishFailed:()=>{x(!1)},onFinish:handleFormSubmit,layout:"vertical",style:{color:"white",padding:"20px",margin:"auto",borderRadius:"10px"},children:[null==n?void 0:n.map((e,l)=>{var n;return(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{children:null==e?void 0:e.section}),null==e?void 0:null===(n=e.fields)||void 0===n?void 0:n.map((e,l)=>{var n,a,o,i,m,h;return(null==e?void 0:e.type)==="text"?(0,t.jsx)(r.Z,{name:null==e?void 0:e.name,rules:[{required:null==e?void 0:e.isRequired,message:null!==(n=null==e?void 0:e.errorMessage)&&void 0!==n?n:"Please enter a value"}]},l):(null==e?void 0:e.type)==="phone"?(0,t.jsx)(s.Z,{name:null==e?void 0:e.name,rules:[{required:null==e?void 0:e.isRequired,message:null!==(a=null==e?void 0:e.errorMessage)&&void 0!==a?a:"Please enter a value"}]},l):(null==e?void 0:e.type)==="select"?(0,t.jsx)(u.Z,{name:null==e?void 0:e.name,data:(null==e?void 0:e.name)==="Country"?y:(null==e?void 0:e.name)==="State"?j:(null==e?void 0:e.name)==="City"?w:null==e?void 0:e.data,onChange:(null==e?void 0:e.name)==="Country"?handleCountryChange:(null==e?void 0:e.name)==="State"?handleStateChange:null,rules:[{required:null==e?void 0:e.isRequired,message:null!==(o=null==e?void 0:e.errorMessage)&&void 0!==o?o:"Please select a value"}]},l):(null==e?void 0:e.type)==="date"?(0,t.jsx)(d.Z,{name:null==e?void 0:e.name,rules:[{required:null==e?void 0:e.isRequired,message:null!==(i=null==e?void 0:e.errorMessage)&&void 0!==i?i:"Please select a value"}]},l):(null==e?void 0:e.type)==="radio"?(0,t.jsx)(c.Z,{name:null==e?void 0:e.name,data:null==e?void 0:e.data,rules:[{required:null==e?void 0:e.isRequired,message:null!==(m=null==e?void 0:e.errorMessage)&&void 0!==m?m:"Please select a value"}]},l):(null==e?void 0:e.type)==="image"?(0,t.jsx)(v.Z,{name:null==e?void 0:e.name,rules:[{required:null==e?void 0:e.isRequired,message:null!==(h=null==e?void 0:e.errorMessage)&&void 0!==h?h:"Please select a value"}]},l):void 0})]},l)}),(0,t.jsx)(i.Z.Item,{children:(0,t.jsx)("button",{className:"flex w-full justify-center rounded-md bg-[#F04D99]  px-3 py-2 text-md font-semibold leading-6 text-white shadow-sm hover:bg-[#bd7ee5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",children:"Submit"})})]}),l&&!p?(0,t.jsx)("div",{children:"All * fieldes have to be correct to submit a form"}):null]})}},73019:function(e,l,n){var t=n(57437),a=n(2265),o=n(79404),i=n(80568);n(62067),l.Z=e=>{let{name:l,rules:n}=e,[r,s]=a.useState(null);return(0,t.jsx)(o.Z.Item,{label:(0,t.jsx)("span",{style:{color:"white"},children:l}),name:l,rules:n,value:r,children:(0,t.jsx)(i.Z,{format:"DD/MM/YYYY",allowClear:!0,size:"large",onChange:(e,l)=>{console.log(e,l),s(l)},className:"rounded-lg",style:{width:"100%"}})})}},73376:function(e,l,n){var t=n(57437),a=n(2265),o=n(79404),i=n(65137),r=n(88110),s=n.n(r),u=n(46613);l.Z=e=>{let{name:l,rules:n}=e,[r,d]=(0,a.useState)([]),[c,v]=(0,a.useState)(null),onChange=async e=>{let{fileList:l}=e;d(l);let n=l.filter(e=>e.response).map(e=>e.response.url);v(n),console.log("Image upload response:",c)};return(0,t.jsx)(o.Z.Item,{label:(0,t.jsx)("span",{style:{color:"white"},children:l}),name:l,rules:n,value:c,children:(0,t.jsx)(i.Z,{action:"http://localhost:4000/api/dynamicform/upload",fileList:r,onChange:onChange,className:"flex-1 bg-white flex rounded-lg p-2",multiple:!0,children:(0,t.jsx)(s(),{icon:(0,t.jsx)(u.Z,{}),className:"bg-white",children:"Click to Upload"})})})}},25126:function(e,l,n){n.d(l,{Z:function(){return PhoneInput}});var t=n(57437),a=n(83352);let o=a.PhoneNumberUtil.getInstance(),validatePhoneNumber=e=>{try{let l=o.parse(e),n=o.isValidNumber(l);return n}catch(e){return!1}};var i=n(2265),r=n(15794),s=n.n(r);n(55323);var u=n(79404),PhoneInput=function(e){let{onChange:l,name:n,rules:a}=e,[o,r]=(0,i.useState)("");return(0,t.jsx)(u.Z.Item,{label:(0,t.jsx)("span",{style:{color:"white"},children:n}),name:n,rules:a,children:(0,t.jsx)(s(),{inputStyle:{width:"100%",height:"45px"},placeholder:"Enter phone number",enableSearch:!0,country:"us",autoFormat:!0,countryCodeEditable:!1,disableSearchIcon:!0,value:o,onChange:(e,n)=>{r("+".concat(e.toString())),l&&l("+".concat(e.toString()))},isValid:e=>!(e.length>3)||validatePhoneNumber("+".concat(e))})})}},84792:function(e,l,n){var t=n(57437),a=n(2265),o=n(79404),i=n(45623),r=n(67848);let{Option:s}=i.default;l.Z=e=>{let{name:l,data:n,rules:i}=e,[s,u]=(0,a.useState)(null);return(0,t.jsx)(o.Z.Item,{label:(0,t.jsx)("span",{style:{color:"white"},children:l}),name:l,rules:i,children:(0,t.jsx)(r.ZP.Group,{onChange:e=>u(e.target.value),value:s,className:"bg-white  p-2 w-full rounded-lg flex-1 flex",children:null==n?void 0:n.map(e=>(0,t.jsx)(r.ZP,{value:e._id,children:e.name},e._id))})})}},8287:function(e,l,n){var t=n(57437);n(2265);var a=n(79404),o=n(45623);let{Option:i}=o.default;l.Z=e=>{let{name:l,data:n,onChange:r,rules:s}=e;return(0,t.jsx)(a.Z.Item,{label:(0,t.jsx)("span",{style:{color:"white"},children:l}),name:l,rules:s,children:(0,t.jsx)(o.default,{size:"large",onChange:r,children:null==n?void 0:n.map(e=>(0,t.jsx)(i,{value:e.name,children:e.name},e._id))})})}},83905:function(e,l,n){var t=n(57437);n(2265);var a=n(79404),o=n(43574);l.Z=e=>{let{name:l,rules:n}=e;return(0,t.jsx)(a.Z.Item,{label:(0,t.jsx)("span",{style:{color:"white"},children:l}),name:l,rules:n,children:(0,t.jsx)(o.Z,{className:"rounded-lg"})})}},40613:function(e,l,n){var t=n(92173);let a=t.Z.create({baseURL:"http://localhost:4000/api"});a.interceptors.request.use(e=>{let l=localStorage.getItem("token");return l&&(e.headers.Authorization="Bearer ".concat(l)),e},function(e){return Promise.reject(e)}),a.interceptors.response.use(e=>{if(302===e.status){let l=null==e?void 0:e.headers.location;window.location.href=l}return e},e=>{var l;throw(null===(l=e.response)||void 0===l?void 0:l.status)===401&&localStorage.removeItem("accessToken"),e}),l.Z=a}}]);