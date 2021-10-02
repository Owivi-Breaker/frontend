<template>
    <img id="logo" name="logo" src="https://www.naiveui.com/assets/naivelogo.93278402.svg" alt="logo" />
    <p id="loginLabel">登录</p>
    <n-form id="form" :show-label="true" :model="formValue" :rules="rules" ref="formRef">
        <n-form-item label="邮箱" path="user.name">
            <n-input v-model:value="formValue.email" placeholder="邮箱地址" />
        </n-form-item>
        <n-form-item label="密码" path="user.age">
            <n-input v-model:value="formValue.password" placeholder="密码" />
        </n-form-item>
        <n-form-item>
            <n-button @click="PostLogin" attr-type="button">进入OwiviOsas</n-button>
        </n-form-item>
    </n-form>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'
import axios from "axios"
export default defineComponent({
    setup() {
        let formRef: any = ref(null)
        const message = useMessage()
        let formValue: any = ref({ email: '', password: '' });
        let PostLogin = () => {
            axios({
                method: 'post',
                url: 'www.baidu.com',
                data: {
                    email: formValue.email,
                    password: formValue.password
                }
            }).then(function (response) {
                console.log(response);
            });
        }
        return {
            formRef,
            formValue,
            PostLogin,
            rules: {
                email: {
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                },
                password: {
                    required: true,
                    message: '请输入年龄',
                    trigger: ['input', 'blur']
                }
            }
        }
    }
})
</script>
<style>
body {
    text-align: center;
    padding-top: 200px;
    background-image: url("../assets/背景.png");
}
#logo {
    width: 100px;
}
#loginLabel {
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
    border-radius: 20px;
}
</style>