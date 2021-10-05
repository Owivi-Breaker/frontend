<template>
    <img id="logo" name="logo" src="https://www.naiveui.com/assets/naivelogo.93278402.svg" alt="logo" />
    <p id="title">登录</p>
    <n-form id="form" :show-label="false" :model="formValue" :rules="rules" ref="formRef">
        <n-form-item label="用户名" path="username">
            <n-input v-model:value="formValue.username" placeholder="用户名" />
        </n-form-item>
        <n-form-item label="密码" path="password">
            <n-input v-model:value="formValue.password" placeholder="密码" @keyup.enter="PostLogin" type="password" />
        </n-form-item>
        <n-form-item>
            <n-checkbox v-model:checked="needSave">记住我</n-checkbox>
        </n-form-item>
        <n-form-item>
            <n-button v-on:click="PostLogin" attr-type="button">进入OwiviOsa</n-button>
        </n-form-item>
    </n-form>
    <div>
        还没有账号？
        <a id="registerLink" href="/register" v-on:click="GoRegister">点我注册</a>
    </div>
</template>
<script lang="ts" setup>
import axios from "axios";
import qs from "qs";
import { ref } from "vue";
import { Ref } from "@vue/reactivity";
import { Router, useRouter } from "vue-router";
import { storage } from "../utils";
import { MessageApiInjection } from "naive-ui/lib/message/src/MessageProvider";
import { useMessage } from "naive-ui";
let formRef: Ref = ref(null);
let formValue: Ref<{ username: string; password: string; }> = ref({ username: "", password: "" });
let needSave: Ref<boolean> = ref(true);
let message: MessageApiInjection = useMessage();
let router: Router = useRouter();
let rules: object = {
    username: {
        required: true,
        validator(rule: any, value: string) {
            if (!value) {
                return new Error("请输入邮箱或手机号。");
            }
            else if (!/^(\w+@(\w+\.)+\w+)|([0-9]{11})|(\w+)$/.test(value)) {
                return new Error("请输入正确的邮箱或手机号。");
            }
            return true;
        },
        trigger: "blur"
    },
    password: {
        required: true,
        message: "请输入密码。",
        trigger: ["input", "blur"]
    }
};
GetCookie();
function SetCookie(username: string, password: string, exdays: number): void {
    let exdate: Date = new Date();
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
    window.document.cookie = "username" + "=" + username + ";path=/;expires=" + exdate.toUTCString();
    window.document.cookie = "password" + "=" + password + ";path=/;expires=" + exdate.toUTCString();
}
function GetCookie(): void {
    if (document.cookie.length > 0) {
        let cookie: string[] = document.cookie.split("; ");
        cookie.forEach(function (element): void {
            console.log(element)
            let result: string[] = element.split("=");
            if (result[0] === "username") {
                formValue.value.username = result[1];
            } else if (result[0] === "password") {
                formValue.value.password = result[1];
            }
        });
    }
}
function PostLogin(): void {
    SetCookie('', '', -1);
    formRef.value.validate((errors: boolean) => {
        if (!errors) {
            axios({
                method: "post",
                baseURL: "http://s3.s100.vip:35881/",
                url: "/login",
                data: qs.stringify({
                    username: formValue.value.username,
                    password: formValue.value.password
                }),
            }).then(response => {
                message.success("登录成功。");
                let token: string = response.data.access_token;
                storage.set("token", token);
                if (needSave.value) {
                    SetCookie(formValue.value.username, formValue.value.password, 7);
                }
                setTimeout(() => { router.push({ name: "home" }); }, 1000); // 在本地运行时为了先显示登录成功的消息后跳转页面的等待，后期部署删除
            }).catch(error => {
                switch (error.message) {
                    case "Request failed with status code 401":
                        message.error("登录失败，用户名或密码错误。");
                        break;
                    case "Network Error":
                        message.error("登录失败，网络错误。");
                        break;
                    default:
                        message.error("登录失败。");
                        break;
                }
            });
        } else {
            message.error("登录失败。");
        }
    })
}
function GoRegister(): void {
    router.push({ name: "register" });
}
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
.n-checkbox {
    margin-left: 15px;
}
</style>