"use strict";exports.id=5309,exports.ids=[5309],exports.modules={55309:(e,t,s)=>{s.d(t,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var a=s(30784),l=s(9885),r=s(4199),d=s(17906);let __WEBPACK_DEFAULT_EXPORT__=()=>{let[e,t]=(0,l.useState)(null),fetchData=async()=>{let e=await d.Z.get("/dynamicform/form/v1"),s=e.data?.data;t(s)};return(0,l.useEffect)(()=>{fetchData()},[]),(0,a.jsxs)(a.Fragment,{children:[a.jsx("div",{className:"flex justify-center pt-[120px]",children:a.jsx("h1",{className:"text-white text-2xl font-bold",children:"Add your listing"})}),a.jsx("div",{className:" pt-5 pb-[50px] w-[80%] md:w-[75%] mx-auto",children:a.jsx(r.Z,{preview:!1,formValues:e})})]})}}};