(()=>{var e={};e.id=3805,e.ids=[3805],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},39491:e=>{"use strict";e.exports=require("assert")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},12781:e=>{"use strict";e.exports=require("stream")},76224:e=>{"use strict";e.exports=require("tty")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},47662:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>n.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>d,routeModule:()=>m,tree:()=>c});var r=s(67096),a=s(16132),o=s(37284),n=s.n(o),i=s(32564),l={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>i[e]);s.d(t,l);let c=["",{children:["user",{children:["account",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,44927)),"/Users/mohsin/Desktop/programmer/project/upwork/sakib/USA_AD/client/app/user/account/page.js"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,58489)),"/Users/mohsin/Desktop/programmer/project/upwork/sakib/USA_AD/client/app/layout.js"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,9291,23)),"next/dist/client/components/not-found-error"]}],d=["/Users/mohsin/Desktop/programmer/project/upwork/sakib/USA_AD/client/app/user/account/page.js"],u="/user/account/page",p={require:s,loadChunk:()=>Promise.resolve()},m=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/user/account/page",pathname:"/user/account",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},72635:(e,t,s)=>{Promise.resolve().then(s.bind(s,93215))},93215:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>page});var r=s(30784),a=s(34376),o=s(9885),n=s(57114),i=s(34751),l=s(54997),c=s(1808),d=s(57048),u=s(98680),p=s.n(u);function MyModal({data:e,open:t,setOpen:s,role:a,index:n,id:c,getUserInfo:u}){let[m,x]=(0,o.useState)(e.reject_message);console.log("data",e.message);let renderRequestDetail=(e,t)=>t&&"01/01/1970"!==t?(0,r.jsxs)("div",{className:"flex justify-between mt-2",children:[(0,r.jsxs)("p",{className:"text-sm font-bold text-gray-700 mr-2",children:[e,":"]}),r.jsx("p",{className:"text-sm text-gray-700 ",children:t})]}):null,handleRequest=async t=>{console.log(e);try{let r=await l.Z.patch(`https://o-ras.com/api/request/${e._id}`,{status:t,reject_message:m},{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});s(!1),console.log(r.data),i.Am.success("Request status updated!"),u(),s(!1)}catch(e){console.error(e.response)}};return r.jsx(p(),{isOpen:t,onRequestClose:()=>s(!1),className:"w-[400px] max-w-full bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] pt-[40px] p-[20px] shadow-sm border-[1px] rounded-lg",children:(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"flex justify-between text-xl text-center -mt-4 mb-6 font-semibold leading-6 text-gray-900",children:[r.jsx("p",{children:"Request Details"}),r.jsx("p",{className:"cursor-pointer",onClick:()=>s(!1),children:r.jsx(d.Z,{className:"h-6 w-6"})})]}),(0,r.jsxs)("div",{className:"mt-2 bg-white",children:[renderRequestDetail("Name",e.authUser?.name),renderRequestDetail("Email",e.authUser?.email),renderRequestDetail("Phone",e.authUser?.phone),renderRequestDetail("Request Type",e.type),renderRequestDetail("Created At",new Date(e.createdAt).toLocaleDateString()),renderRequestDetail("Center",e.center),renderRequestDetail("City",e.city),renderRequestDetail("Grade",e.grade),renderRequestDetail("Desired Rotation",e.desired_rotation),renderRequestDetail("From",new Date(e.from).toLocaleDateString()),renderRequestDetail("To",new Date(e.to).toLocaleDateString()),renderRequestDetail("Not Preferred Dates",e.not_preferred_dates),renderRequestDetail("Message",e.message)]}),"user"!==a&&"pending"===e.status&&(0,r.jsxs)("div",{className:"bg-white",children:[r.jsx("textarea",{id:"message",name:"message",type:"text",placeholder:"Write message if you want to reject",value:m,onChange:e=>x(e.target.value),className:"block w-full mt-4 bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}),(0,r.jsxs)("div",{className:"flex gap-2 mt-5 sm:mt-6",children:[r.jsx("button",{type:"button",className:"inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",onClick:()=>handleRequest("accepted"),children:"Accept"}),r.jsx("button",{type:"button",className:"inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",onClick:()=>handleRequest("rejected"),children:"Reject"})]})]})]})})}var m=s(60029);let page=function(e){let t=(0,n.useRouter)(),[s,u]=(0,o.useState)({}),[p,x]=(0,o.useState)([]),[h,g]=(0,o.useState)(!1),[f,b]=(0,o.useState)({}),[j,w]=(0,o.useState)(!1),[q,v]=(0,o.useState)(!0),getUserInfo=async()=>{try{v(!0);let e=await l.Z.get("https://o-ras.com/api/auth/local/userdetails",{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});if(e.data._id){let t=await l.Z.get(`https://o-ras.com/api/request/user/${e.data._id}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});x(t.data.reverse()),console.log(t.data)}console.log(e.data),u(e.data),v(!1)}catch(e){console.error("User info fetching failed:",e.response),v(!1)}};(0,o.useEffect)(()=>{let e=localStorage.getItem("token");e||t.push("/"),getUserInfo()},[]);let handleDelete=async e=>{try{let t=await l.Z.delete(`https://o-ras.com/api/request/${e}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});console.log(t.data),i.Am.success("Request has been deleted!"),getUserInfo()}catch(e){console.error(e.response),i.Am.error("Deletion Failed!")}};return(0,r.jsxs)(r.Fragment,{children:[r.jsx(m.Z,{role:"user"}),(0,r.jsxs)("div",{className:"flex",children:[r.jsx(a.Z,{page:"home"}),(0,r.jsxs)("div",{className:"flex-1 h-[100vh] flex items-center flex-col p-[20px] md:p-[50px] overflow-scroll",children:[(0,r.jsxs)("div",{className:"w-full lg:w-[600px] p-4 mb-8 border-[.5px] shadow-sm rounded-lg",children:[r.jsx("h1",{className:" text-3xl font-bold mb-4 text-center",children:"Account Details"}),(0,r.jsxs)("div",{className:"flex mb-4 gap-2",children:[r.jsx("p",{className:"font-semibold",children:"Name:"}),r.jsx("p",{children:s.name})]}),(0,r.jsxs)("div",{className:"flex mb-4 gap-2",children:[r.jsx("p",{className:"font-semibold",children:"Email:"}),r.jsx("p",{children:s.email})]}),(0,r.jsxs)("div",{className:"flex mb-4 gap-2",children:[r.jsx("p",{className:"font-semibold",children:"Phone:"}),r.jsx("p",{children:s.phone})]})]}),r.jsx("h1",{className:"text-3xl font-bold mb-8",children:"All Requests"}),q&&r.jsx("p",{children:"Loading..."}),!q&&0===p.length&&r.jsx("p",{children:"No requests to show"}),p.map((e,t)=>(0,r.jsxs)("div",{className:"w-full  lg:w-[600px] flex justify-between items-center p-2 my-2 border-[.5px] shadow-sm rounded-lg",onClick:()=>b(e),children:[(0,r.jsxs)("div",{className:"flex gap-6",children:[r.jsx("p",{children:new Date(e.createdAt).toLocaleDateString()}),r.jsx("p",{children:e.type})]}),(0,r.jsxs)("div",{className:"text-right flex gap-2 max-w-full items-center",children:[r.jsx("p",{className:"p-1 px-4 rounded-md",style:{backgroundColor:function(e){switch(e){case"pending":return"rgba(255, 255, 0, 0.5)";case"accepted":return"rgba(0, 255, 0, 0.5)";case"rejected":return"rgba(255, 0, 0, 0.5)";default:return"transparent"}}(e.status)},children:e.status}),r.jsx("button",{type:"button",onClick:()=>g(!0),children:r.jsx(c.Z,{className:"text-black w-8 h-8 bg-slate-200 hover:bg-indigo-500 p-2 hover:text-white rounded-md"})}),r.jsx("button",{type:"submit",onClick:()=>handleDelete(e._id),className:"text-black",children:r.jsx(d.Z,{className:"text-black w-8 h-8 bg-slate-200 hover:bg-indigo-500 p-2 hover:text-white rounded-md"})})]})]},t))]}),r.jsx(MyModal,{data:f,open:h,setOpen:g,role:"user"})]})]})}},44927:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>n,__esModule:()=>o,default:()=>l});var r=s(95153);let a=(0,r.createProxy)(String.raw`/Users/mohsin/Desktop/programmer/project/upwork/sakib/USA_AD/client/app/user/account/page.js`),{__esModule:o,$$typeof:n}=a,i=a.default,l=i}};var t=require("../../../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),s=t.X(0,[8963,1808,6716,4376],()=>__webpack_exec__(47662));module.exports=s})();