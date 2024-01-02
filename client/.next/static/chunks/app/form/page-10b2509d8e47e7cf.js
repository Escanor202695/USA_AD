(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[609],{49731:function(e,s,n){Promise.resolve().then(n.bind(n,99246))},18730:function(e,s,n){"use strict";var t=n(57437);n(2265),s.Z=()=>(0,t.jsx)("footer",{className:"bg-gray-800 text-[#f04d99] py-6   w-full",children:(0,t.jsx)("div",{className:"container mx-auto flex justify-center items-center",children:(0,t.jsx)("nav",{children:(0,t.jsxs)("ul",{className:"flex space-x-4",children:[(0,t.jsx)("li",{children:(0,t.jsx)("a",{href:"/user/forgot-password",className:"hover:underline",children:"Forget Password"})}),(0,t.jsx)("li",{children:(0,t.jsx)("a",{href:"/login",className:"hover:underline",children:"Login"})}),(0,t.jsx)("li",{children:(0,t.jsx)("a",{href:"/user/signup",className:"hover:underline",children:"Register Account"})})]})})})})},86970:function(e,s,n){"use strict";n.d(s,{Z:function(){return navbar}});var t=n(57437),r=n(2265),l=n(54869),a=n(96689),o=n(24033),i=n(40536),profile=function(){return(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"w-5 h-5 mr-1",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"})})},key=function(){return(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"w-5 h-5 mr-1",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"})})},c=n(41810),d=n(60171),u=n(40613);let h=[{name:"Home",href:"/home"}];var navbar=()=>{let[e,s]=(0,r.useState)(!1),n=(0,o.useRouter)(),x=localStorage.getItem("token"),handleLogout=async()=>{await u.Z.get("/auth/local/logout"),localStorage.removeItem("token"),d.Am.success("LogOut Successful!"),n.push("/")},renderAuthButton=(e,s,n)=>(0,t.jsxs)("button",{className:"flex items-center text-white bg-[#F04D99] mr-2 px-4 py-2 my-2 rounded-lg",onClick:n,children:[s,e]});return(0,t.jsxs)("header",{className:"absolute inset-x-0 top-0 z-50 bg-black",children:[(0,t.jsxs)("nav",{className:"flex items-center justify-between p-3 lg:px-8","aria-label":"Global",children:[(0,t.jsx)("div",{className:"flex lg:flex-1 items-center",children:(0,t.jsxs)("a",{href:"#",className:"-m-1.5 p-1.5",children:[(0,t.jsx)("span",{className:"sr-only",children:"Your Company"}),(0,t.jsx)("img",{className:"h-16 w-auto",src:"/logo.png",alt:""})]})}),(0,t.jsx)("div",{className:"flex lg:hidden",children:(0,t.jsxs)("button",{type:"button",className:"-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#F04D99] bg-black",onClick:()=>s(!0),children:[(0,t.jsx)("span",{className:"sr-only",children:"Open main menu"}),(0,t.jsx)(c.Z,{})]})}),(0,t.jsx)("div",{className:"hidden lg:flex lg:gap-x-12 items-center mr-16",children:h.map(e=>(0,t.jsx)("a",{href:e.href,className:"text-md font-semibold leading-6 text-white hover:text-[#F04D99]",children:e.name},e.name))}),(0,t.jsx)("div",{className:"hidden  lg:flex items-center",children:(0,t.jsx)("div",{className:" flex",children:x?(0,t.jsxs)(t.Fragment,{children:[renderAuthButton("Post New Ad",(0,t.jsx)(i.Z,{}),()=>n.push("/form")),renderAuthButton("Profile",(0,t.jsx)(profile,{}),()=>n.push("/profile")),renderAuthButton("Logout",(0,t.jsx)(key,{}),handleLogout)]}):(0,t.jsxs)(t.Fragment,{children:[renderAuthButton("Post New Ad",(0,t.jsx)(i.Z,{}),()=>n.push("/form")),renderAuthButton("Register",(0,t.jsx)(profile,{}),()=>n.push("/user/signup")),renderAuthButton("Login",(0,t.jsx)(key,{}),()=>n.push("/login"))]})})})]}),(0,t.jsxs)(l.V,{as:"div",className:"lg:hidden",open:e,onClose:()=>s(!1),children:[(0,t.jsx)("div",{className:"fixed inset-0 z-50"}),(0,t.jsxs)(l.V.Panel,{className:"fixed inset-y-0 right-0 z-50 w-1/2 overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("a",{href:"#",className:"-m-1.5 p-1.5",children:[(0,t.jsx)("span",{className:"sr-only",children:"Your Company"}),(0,t.jsx)("img",{className:"h-8 w-auto",src:"/path/to/logo.png",alt:""})]}),(0,t.jsxs)("button",{type:"button",className:"-m-2.5 rounded-md p-2.5 text-gray-700",onClick:()=>s(!1),children:[(0,t.jsx)("span",{className:"sr-only",children:"Close menu"}),(0,t.jsx)(a.Z,{className:"h-6 w-6 text-white","aria-hidden":"true"})]})]}),(0,t.jsx)("div",{className:"mt-6 flow-root",children:(0,t.jsx)("div",{className:"-my-6 divide-y divide-gray-500/10",children:(0,t.jsx)("div",{className:"space-y-2 py-6",children:h.map(e=>(0,t.jsx)("a",{href:e.href,className:"-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-[#F04D99]",children:e.name},e.name))})})}),(0,t.jsx)("div",{className:"lg:hidden flex-col",children:x?(0,t.jsxs)(t.Fragment,{children:[renderAuthButton("Post New Ad",(0,t.jsx)(i.Z,{}),()=>n.push("/form")),renderAuthButton("Profile",(0,t.jsx)(profile,{}),()=>n.push("/profile")),renderAuthButton("Logout",(0,t.jsx)(key,{}),handleLogout)]}):(0,t.jsxs)(t.Fragment,{children:[renderAuthButton("Post New Ad",(0,t.jsx)(i.Z,{}),()=>n.push("/")),renderAuthButton("Register",(0,t.jsx)(profile,{}),()=>n.push("/user/signup")),renderAuthButton("Login",(0,t.jsx)(key,{}),()=>n.push("/login"))]})})]})]})]})}},41810:function(e,s,n){"use strict";var t=n(57437);n(2265),s.Z=function(){return(0,t.jsx)("svg",{className:"h-6 w-6",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 6h16M4 12h16m-7 6h7"})})}},40536:function(e,s,n){"use strict";var t=n(57437);n(2265),s.Z=function(){return(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"w-5 h-5 mr-1",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"})})}},22984:function(e,s,n){"use strict";var t=n(57437),r=n(2265),l=n(82816),a=n(40613);s.Z=()=>{let[e,s]=(0,r.useState)(null),fetchData=async()=>{var e;let n=await a.Z.get("/dynamicform/form/v1"),t=null===(e=n.data)||void 0===e?void 0:e.data;s(t)};return(0,r.useEffect)(()=>{fetchData()},[]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"flex justify-center pt-[120px]",children:(0,t.jsx)("h1",{className:"text-white text-2xl font-bold",children:"Add your listing"})}),(0,t.jsx)("div",{className:" pt-5 pb-[50px] w-[80%] md:w-[75%] mx-auto",children:(0,t.jsx)(l.Z,{preview:!1,formValues:e})})]})}},99246:function(e,s,n){"use strict";n.r(s),n.d(s,{default:function(){return FormPage}});var t=n(57437),r=n(18730),l=n(86970),a=n(22984);function FormPage(){return(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)("div",{className:"bg-[#101827] flex flex-col h-auto min-h-[100vh] overflow-scroll overflow-x-hidden",children:[(0,t.jsx)(l.Z,{}),(0,t.jsx)(a.Z,{}),(0,t.jsx)(r.Z,{})]})})}}},function(e){e.O(0,[760,990,580,574,71,625,892,806,816,971,472,744],function(){return e(e.s=49731)}),_N_E=e.O()}]);