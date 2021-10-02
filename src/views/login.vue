<template>
    <img id="logo" name="logo" src="https://www.naiveui.com/assets/naivelogo.93278402.svg" alt="logo" />
    <p id="title">登录</p>
    <n-form id="form" :show-label="false" :model="formValue" :rules="rules" ref="formRef">
        <n-form-item label="用户名" path="user_name">
            <n-input v-model:value="formValue.user_name" placeholder="用户名" />
        </n-form-item>
        <n-form-item label="密码" path="password">
            <n-input v-model:value="formValue.password" placeholder="密码" />
        </n-form-item>
        <n-form-item>
            <n-button @click="PostLogin" attr-type="button">进入OwiviOsa</n-button>
        </n-form-item>
    </n-form>
    <div>
        还没有账号？
        <a href="#">点我注册</a>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'
import axios from "axios"
export default defineComponent({
    setup() {
        let formRef: any = ref(null)
        const message = useMessage()
        let formValue: any = ref({ user_name: '', password: '' });
        let PostLogin = () => {
            formRef.value.validate((errors: any) => {
                if (!errors) {
                    axios({
                        method: 'post',
                        baseURL: 'http://127.0.0.1:8000/',
                        url: '',
                        data: {
                            user_name: formValue.user_name,
                            password: formValue.password
                        }
                    }).then(function (response) {
                        console.log(response);
                    });
                } else {
                    message.error('登录失败')
                }
            })
        }
        return {
            formRef,
            formValue,
            PostLogin,
            rules: {
                user_name: {
                    required: true,
                    validator(rule: any, value: any) {
                        if (!value) {
                            return new Error('请输入用户名')
                        }
                        return true
                    },
                    trigger: 'blur'
                },
                password: {
                    required: true,
                    message: '请输入密码',
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
</style>