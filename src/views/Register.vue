<template>
    <div style="text-align: center;">
        <img id="logo" name="logo" src="https://www.naiveui.com/assets/naivelogo.93278402.svg" alt="logo" />
        <p id="title">注册</p>
        <n-form id="form" :show-label="false" :model="formValue" :rules="rules" ref="formRef">
            <n-form-item label="用户名" path="username">
                <n-input class="roundInput" v-model:value="formValue.username" placeholder="用户名" />
            </n-form-item>
            <n-form-item label="密码" path="password">
                <n-input class="roundInput" v-model:value="formValue.password" placeholder="密码" @keyup="ClearPasswordAgain" type="password" />
            </n-form-item>
            <n-form-item label="重复密码" path="passwordAgain">
                <n-input class="roundInput" v-model:value="formValue.passwordAgain" placeholder="重复密码" @keyup.enter="PostRegister" type="password" />
            </n-form-item>
            <n-form-item>
                <n-checkbox v-model:checked="readProtocol" style="--label-padding:0px 0px 0px 8px;">我已阅读并同意</n-checkbox>
                <p @click="ShowProtocol" style="text-decoration: underline; margin: 0px; cursor: pointer;">使用条款</p>
            </n-form-item>
            <n-form-item>
                <n-button class="roundButton" type="primary" v-on:click="PostRegister" attr-type="button">立即注册</n-button>
            </n-form-item>
        </n-form>
        <div>
            已经有账号？
            <a id="registerLink" href="/login">点我登录</a>
        </div>
        <n-modal v-model:show="showModal">
            <n-card style="width: 600px;" title="使用条款" :bordered="false" size="huge">
                <template #header-extra></template>
                <n-scrollbar x-scrollable style="max-height: 300px;">
                    <div v-html="protocol"></div>
                </n-scrollbar>
                <template #footer>
                    <n-button v-on:click="showModal = false">关闭</n-button>
                </template>
            </n-card>
        </n-modal>
    </div>
</template>
<script lang="ts" setup>
import axios from "axios";
import { ref } from "vue";
import { Ref } from "@vue/reactivity";
import { Router, useRouter } from "vue-router";
import { MessageApiInjection } from "naive-ui/lib/message/src/MessageProvider";
import { useMessage } from "naive-ui";
let formRef: Ref = ref(null);
let formValue: Ref<{ username: string; password: string; passwordAgain: string; }> = ref({ username: "", password: "", passwordAgain: "" });
let readProtocol: Ref<boolean> = ref(true);
let showModal: Ref<boolean> = ref(false);
let message: MessageApiInjection = useMessage();
let router: Router = useRouter();
let protocol: Ref<string> = ref("");
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
    },
    passwordAgain: {
        required: true,
        validator(rule: any, value: string) {
            if (!value) {
                return new Error("请输入重复密码。");
            }
            else if (value !== formValue.value.password) {
                return new Error("两次输入密码不一致。");
            }
            return true;
        },
        trigger: ["input", "blur"]
    }
};
function PostRegister(): void {
    formRef.value.validate((errors: boolean) => {
        if (!errors) {
            axios({
                method: "post",
                url: "/login/create-user",
                data: {
                    email: formValue.value.username,
                    is_active: true,
                    password: formValue.value.password
                },
            }).then(response => {
                message.success("注册成功。");
                setTimeout(() => { router.push({ name: "login" }); }, 1000);
            }).catch(error => {
                switch (error.message) {
                    case "Request failed with status code 404":
                    case "Network Error":
                        message.error("注册失败，网络错误。");
                        break;
                    case "Request failed with status code 400":
                        switch (error.response.data.detail) {
                            case "Email already registered":
                                message.error("注册失败，用户名已存在。");
                                break;
                        }
                        break;
                    default:
                        message.error("注册失败。");
                        break;
                }
            });
        } else {
            message.error("注册失败。");
        }
    })
}
function ClearPasswordAgain(): void {
    formValue.value.passwordAgain = "";
}
function ShowProtocol(): void {
    axios({
        method: "GET",
        url: "/login/protocol",
    }).then(response => {
        protocol.value = response.data;
    })
    showModal.value = true;
}
</script>
<style>
body {
    padding-top: 125px;
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
.roundInput {
    margin-top: 20px;
    width: 300px;
    padding: 5px;
    border-radius: 20px;
}
.roundButton {
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