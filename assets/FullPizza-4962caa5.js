import{R as e,d as o,e as l,j as t,L as d,f as u}from"./index-e6506352.js";const x=()=>{const[a,i]=e.useState(),{id:c}=o(),n=l();return e.useEffect(()=>{async function r(){try{const{data:s}=await u.get(`https://663c289f17145c4d8c354fa0.mockapi.io/items/${c}`);i(s)}catch{alert("Error occured while get pizza"),n("/")}}r()},[]),a?t.jsxs("div",{className:"container",children:[t.jsx("img",{src:a.imageUrl,alt:""}),t.jsx("h2",{children:a.title}),t.jsxs("h4",{children:["$",a.price]}),t.jsx(d,{to:"/notwqeq",children:t.jsx("button",{className:"button button--outline button--add",children:t.jsx("span",{children:"Back"})})})]}):"Loading..."};export{x as default};
