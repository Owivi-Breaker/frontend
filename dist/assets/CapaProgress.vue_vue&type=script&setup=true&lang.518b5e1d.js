import{g as a}from"./colorMap.e8cf714b.js";import{d as e,r,o as p,b as t,w as s,e as n,aF as o,aB as l,g as u}from"./vendor.3f82f248.js";var i=e({props:{capaName:{type:String,required:!0,default:""},capaRating:{type:Number,required:!0,default:0}},setup:e=>(i,d)=>{const c=r("n-h5"),f=r("n-gi"),g=r("n-progress"),m=r("n-grid");return p(),t(m,{cols:"5"},{default:s((()=>[n(f,{span:"1"},{default:s((()=>[n(c,null,{default:s((()=>[o(l(e.capaName),1)])),_:1})])),_:1}),n(f,{span:"4"},{default:s((()=>[n(g,{color:u(a)(e.capaRating),percentage:Math.round(e.capaRating),"fill-border-radius":"12px 0px 0px 12px",height:"10",type:"line",unit:""},null,8,["color","percentage"])])),_:1})])),_:1})}});export{i as _};