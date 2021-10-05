<template>
    <img id="logo" name="logo" src="https://www.naiveui.com/assets/naivelogo.93278402.svg" alt="logo" />
    <p id="title">注册</p>
    <n-form id="form" :show-label="false" ref="formRef"></n-form>
</template>
<style>
body {
    text-align: center;
    padding-top: 150px;
    background-image: url("../assets/背景.png");
}
#logo {
    width: 100px;
}
#title {
    color: white;
    font-size: 20px;
}
#form {
    display: inline-block;
    width: 300px;
}
.n-input {
    margin-top: 20px;
    width: 300px;
    padding: 5px;
    border-radius: 20px;
}
.n-button {
    margin-top: 20px;
    padding: 20px;
    color: white;
    width: 300px;
    border-radius: 20px;
}
label {
    color: white;
}
#registerLink {
    color: #246ace;
}
</style>