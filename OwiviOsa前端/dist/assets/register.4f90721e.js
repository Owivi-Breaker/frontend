import{d as e,aw as a,r,o as l,az as s,e as o,w as n,g as t,aV as u,aH as d,aA as i,aF as p}from"./vendor.3f82f248.js";import{c}from"./user.2fe52004.js";import{g as w}from"./login.88e7908c.js";import"./http.0fcac388.js";import"./index.c392d4bc.js";const g={class:"registerDiv"},m=i("img",{id:"logo",name:"logo",src:"http://s1.s100.vip:13127/Public/logo.png",alt:"logo"},null,-1),f=i("p",{id:"title"},"注册",-1),v=p("我已阅读并同意"),h=p("立即注册"),b=i("div",null,[p(" 已经有账号？ "),i("a",{id:"registerLink",href:"/login"},"点我登录")],-1),x=["innerHTML"],_=p("关闭");var y=e({setup(e){let p=a(null),y=a({username:"",password:"",passwordAgain:""}),k=a(!0),A=a(!1),j=a(""),U={username:{required:!0,validator:(e,a)=>a?!!/^(\w+@(\w+\.)+\w+)|([0-9]{11})|\w+$/.test(a)||new Error("请输入正确的邮箱或手机号。"):new Error("请输入邮箱或手机号。"),trigger:"blur"},password:{required:!0,message:"请输入密码。",trigger:["input","blur"]},passwordAgain:{required:!0,validator:(e,a)=>a?a===y.value.password||new Error("两次输入密码不一致。"):new Error("请输入重复密码。"),trigger:["input","blur"]}};function E(){p.value.validate((e=>{e?window.$message.error("请正确输入信息"):c({email:y.value.username,is_active:!0,password:y.value.password}).then((e=>{window.$message.success("注册成功"),window.$router.push({name:"login"})})).catch((e=>{}))}))}function $(){y.value.passwordAgain=""}function q(){w().then((e=>{j.value=e})),A.value=!0}return(e,a)=>{const c=r("n-input"),w=r("n-form-item"),C=r("n-checkbox"),H=r("n-button"),I=r("n-form"),K=r("n-scrollbar"),L=r("n-card"),z=r("n-modal");return l(),s("div",g,[m,f,o(I,{id:"form","show-label":!1,model:t(y),rules:t(U),ref:(e,a)=>{a.formRef=e,p=e}},{default:n((()=>[o(w,{label:"用户名",path:"username"},{default:n((()=>[o(c,{class:"roundInput",value:t(y).username,"onUpdate:value":a[0]||(a[0]=e=>t(y).username=e),placeholder:"用户名"},null,8,["value"])])),_:1}),o(w,{label:"密码",path:"password"},{default:n((()=>[o(c,{class:"roundInput",value:t(y).password,"onUpdate:value":a[1]||(a[1]=e=>t(y).password=e),placeholder:"密码",onKeyup:$,type:"password"},null,8,["value"])])),_:1}),o(w,{label:"重复密码",path:"passwordAgain"},{default:n((()=>[o(c,{class:"roundInput",value:t(y).passwordAgain,"onUpdate:value":a[2]||(a[2]=e=>t(y).passwordAgain=e),placeholder:"重复密码",onKeyup:u(E,["enter"]),type:"password"},null,8,["value","onKeyup"])])),_:1}),o(w,null,{default:n((()=>[o(C,{checked:t(k),"onUpdate:checked":a[3]||(a[3]=e=>d(k)?k.value=e:k=e),style:{"--label-padding":"0px 0px 0px 8px"}},{default:n((()=>[v])),_:1},8,["checked"]),i("p",{onClick:q,style:{"text-decoration":"underline",margin:"0px",cursor:"pointer"}},"使用条款")])),_:1}),o(w,null,{default:n((()=>[o(H,{class:"roundButton",type:"primary",onClick:E,"attr-type":"button"},{default:n((()=>[h])),_:1})])),_:1})])),_:1},8,["model","rules"]),b,o(z,{show:t(A),"onUpdate:show":a[5]||(a[5]=e=>d(A)?A.value=e:A=e)},{default:n((()=>[o(L,{style:{width:"600px"},title:"使用条款",bordered:!1,size:"huge"},{footer:n((()=>[o(H,{onClick:a[4]||(a[4]=e=>d(A)?A.value=!1:A=!1)},{default:n((()=>[_])),_:1})])),default:n((()=>[o(K,{"x-scrollable":"",style:{"max-height":"300px"}},{default:n((()=>[i("div",{innerHTML:t(j)},null,8,x)])),_:1})])),_:1})])),_:1},8,["show"])])}}});export{y as default};
