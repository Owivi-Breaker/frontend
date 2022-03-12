<template>
    <div class="registerDiv">
        <img id="logo" alt="logo" name="logo" src="http://s1.s100.vip:13127/Public/logo.png"/>
        <p id="title">注册</p>
        <n-form id="form" ref="formRef" :model="formValue" :rules="rules" :show-label="false">
            <n-form-item label="用户名" path="username">
                <n-input v-model:value="formValue.username" class="roundInput" placeholder="用户名"/>
            </n-form-item>
            <n-form-item label="密码" path="password">
                <n-input
                    v-model:value="formValue.password"
                    class="roundInput"
                    placeholder="密码"
                    type="password"
                    @keyup="clearPasswordAgain"
                />
            </n-form-item>
            <n-form-item label="重复密码" path="passwordAgain">
                <n-input
                    v-model:value="formValue.passwordAgain"
                    class="roundInput"
                    placeholder="重复密码"
                    type="password"
                    @keyup.enter="postRegister"
                />
            </n-form-item>
            <n-form-item>
                <n-checkbox v-model:checked="readProtocol" style="--label-padding: 0px 0px 0px 8px">我已阅读并同意</n-checkbox>
                <p style="text-decoration: underline; margin: 0px; cursor: pointer" @click="showProtocol">使用条款</p>
            </n-form-item>
            <n-form-item>
                <n-button attr-type="button" class="roundButton" type="primary" @click="postRegister">立即注册</n-button>
            </n-form-item>
        </n-form>
        <div>
            已经有账号？
            <a id="registerLink" href="/login">点我登录</a>
        </div>
        <n-modal v-model:show="showModal">
            <n-card :bordered="false" size="huge" style="width: 600px" title="使用条款">
                <n-scrollbar style="max-height: 300px" x-scrollable>
                    <div v-html="protocol"></div>
                </n-scrollbar>
                <template #footer>
                    <n-button @click="showModal = false">关闭</n-button>
                </template>
            </n-card>
        </n-modal>
    </div>
</template>
<script lang="ts" setup>
import {ref, Ref} from 'vue';
import {Router} from 'vue-router';
import {useRouterPush} from '@/composables';
import {createUserAPI} from '@/apis/user';
import {getProtocolAPI} from '@/apis/login';

const {routerPush} = useRouterPush();

interface Form {
    username: string;
    password: string;
    passwordAgain: string;
}

const formRef: Ref<any> = ref(null);
const formValue: Ref<Form> = ref({username: '', password: '', passwordAgain: ''});
const readProtocol: Ref<boolean> = ref(true);
const showModal: Ref<boolean> = ref(false);
const protocol: Ref<string> = ref('');
/* 用户注册 */
// 表单规则
const rules: object = {
    username: {
        required: true,
        validator(_rule: any, value: string) {
            if (!value) {
                return new Error('请输入邮箱或手机号。');
            }
            if (!/^(\w+@(\w+\.)+\w+)|([0-9]{11})|\w+$/.test(value)) {
                return new Error('请输入正确的邮箱或手机号。');
            }
            return true;
        },
        trigger: 'blur'
    },
    password: {
        required: true,
        message: '请输入密码。',
        trigger: ['input', 'blur']
    },
    passwordAgain: {
        required: true,
        validator(_rule: any, value: string) {
            if (!value) {
                return new Error('请输入重复密码。');
            }
            if (value !== formValue.value.password) {
                return new Error('两次输入密码不一致。');
            }
            return true;
        },
        trigger: ['input', 'blur']
    }
};
declare const window: Window & { $message: any; $router: Router };

function postRegister(): void {
    formRef.value.validate((errors: boolean) => {
        if (!errors) {
            createUserAPI({
                email: formValue.value.username,
                is_active: true,
                password: formValue.value.password
            })
                .then(_response => {
                    window.$message.success('注册成功');
                    // setTimeout(() => {
                    routerPush({name: 'login'});
                    // }, 800);
                })
                .catch((_error: {}) => {
                });
        } else {
            window.$message.error('请正确输入信息');
        }
    });
}

function clearPasswordAgain(): void {
    formValue.value.passwordAgain = '';
}

/* 展示协议 */
function showProtocol(): void {
    getProtocolAPI().then(response => {
        protocol.value = response;
    });
    showModal.value = true;
}

defineExpose({
    rules,
    formRef,
    formValue,
    readProtocol,
    showModal,
    protocol,
    postRegister,
    clearPasswordAgain,
    showProtocol
});
</script>
<style>
body {
    background-image: url('http://s1.s100.vip:13127/Public/background.png');
}

.registerDiv {
    text-align: center;
    width: 300px;
    height: 610px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

#logo {
    width: 100px;
    margin: auto;
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
