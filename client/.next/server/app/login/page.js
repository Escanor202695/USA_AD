(()=>{var e={};e.id=2626,e.ids=[2626],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},39491:e=>{"use strict";e.exports=require("assert")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},12781:e=>{"use strict";e.exports=require("stream")},76224:e=>{"use strict";e.exports=require("tty")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},42338:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>a.a,__next_app__:()=>d,originalPathname:()=>m,pages:()=>u,routeModule:()=>p,tree:()=>c});var r=s(67096),i=s(16132),o=s(37284),a=s.n(o),n=s(32564),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);s.d(t,l);let c=["",{children:["login",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,44074)),"/Users/mohsin/Desktop/programmer/project/upwork/sakib/USA_AD/client/app/login/page.js"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,58489)),"/Users/mohsin/Desktop/programmer/project/upwork/sakib/USA_AD/client/app/layout.js"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,9291,23)),"next/dist/client/components/not-found-error"]}],u=["/Users/mohsin/Desktop/programmer/project/upwork/sakib/USA_AD/client/app/login/page.js"],m="/login/page",d={require:s,loadChunk:()=>Promise.resolve()},p=new r.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/login/page",pathname:"/login",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},69390:(e,t,s)=>{Promise.resolve().then(s.bind(s,56739))},56739:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>Home});var r=s(30784),i=s(9885),o=s(17906),a=s(34751),n=s(57114),l=s(25732);function Home(){let[e,t]=(0,i.useState)(""),[s,c]=(0,i.useState)(""),[u,m]=(0,i.useState)(null),d=(0,n.useRouter)();(0,i.useEffect)(()=>{let e=localStorage.getItem("token");e&&d.push("/home")});let handleSubmit=async t=>{t.preventDefault(),console.log(e);try{let t=await o.Z.post("/auth/local/login",{email:e,password:s});console.log(t.data);let r=t.data.accessToken,i=t.data.user.email,n=t.data.user.name,l=t.data.user.role;localStorage.setItem("token",r),localStorage.setItem("useremail",i),localStorage.setItem("username",n),localStorage.setItem("role",l),a.Am.success("Login Successful!"),r&&d.push("/home"),m(null)}catch(e){console.error("Login failed:",e.response.data.error),a.Am.error("Email or password wrong!")}};return(0,r.jsxs)(r.Fragment,{children:[r.jsx(l.Z,{}),(0,r.jsxs)("div",{className:"flex min-h-full bg-[#101827] flex-1 flex-col justify-center px-6 py-12 lg:px-8",children:[r.jsx("div",{className:"sm:mx-auto sm:w-full sm:max-w-sm",children:r.jsx("h2",{className:"mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white",children:"Sign in to your account"})}),(0,r.jsxs)("div",{className:"mt-10 sm:mx-auto sm:w-full sm:max-w-sm",children:[(0,r.jsxs)("form",{className:"space-y-6",action:"#",method:"POST",children:[(0,r.jsxs)("div",{children:[r.jsx("label",{htmlFor:"email",className:"block text-sm font-medium leading-6 text-white",children:"Email address"}),r.jsx("div",{className:"mt-2",children:r.jsx("input",{id:"email",name:"email",type:"email",autoComplete:"email",onChange:e=>t(e.target.value),required:!0,className:"block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"})})]}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[r.jsx("label",{htmlFor:"password",className:"block text-sm font-medium leading-6 text-white",children:"Password"}),r.jsx("div",{className:"text-sm",children:r.jsx("a",{href:"/user/forgot-password",className:"font-semibold text-[#F04D99]  hover:text-[#bd7ee5]",children:"Forgot password?"})})]}),r.jsx("div",{className:"mt-2",children:r.jsx("input",{id:"password",name:"password",type:"password",autoComplete:"current-password",onChange:e=>c(e.target.value),required:!0,className:"block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"})})]}),r.jsx("div",{children:r.jsx("button",{type:"submit",onClick:handleSubmit,className:"flex w-full justify-center rounded-md bg-[#F04D99]  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#bd7ee5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",children:"Log in"})})]}),u&&r.jsx("p",{className:"mt-2 text-center text-sm text-red-600 ",children:u}),(0,r.jsxs)("p",{className:"mt-10 text-center text-sm text-white",children:["Not a member?"," ",r.jsx("a",{href:"/user/signup",className:"font-semibold leading-6 text-[#F04D99]   hover:text-indigo-500",children:"Sign Up"})]})]})]})]})}},44074:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>a,__esModule:()=>o,default:()=>l});var r=s(95153);let i=(0,r.createProxy)(String.raw`/Users/mohsin/Desktop/programmer/project/upwork/sakib/USA_AD/client/app/login/page.js`),{__esModule:o,$$typeof:a}=i,n=i.default,l=n}};var t=require("../../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),s=t.X(0,[8963,6716],()=>__webpack_exec__(42338));module.exports=s})();