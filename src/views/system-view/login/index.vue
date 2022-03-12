<template>
    <div class="loginDiv">
        <img alt="logo" class="logo" name="logo" src="http://s1.s100.vip:13127/Public/logo.png"/>
        <p id="title">登录</p>
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
                    @keyup.enter="PostLogin"
                />
            </n-form-item>
            <n-form-item>
                <n-checkbox v-model:checked="needSave">记住我</n-checkbox>
            </n-form-item>
            <n-form-item>
                <n-button attr-type="button" class="roundButton" type="primary" @click="PostLogin">进入OwiviOsa</n-button>
            </n-form-item>
        </n-form>
        <div>
            还没有账号？
            <a id="registerLink" href="/register">点我注册</a>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, Ref} from 'vue';
import {Router} from 'vue-router';
import qs from 'qs';
import {useRouterPush} from '@/composables';
import {storage} from '@/utils';
import {loginAPI} from '@/apis/login';

const {routerPush} = useRouterPush();

const formValue: Ref<{ username: string; password: string }> = ref({username: '', password: ''});
declare const window: Window & { $message: any; $router: Router };
// 输入验证
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
    }
};
// 获取浏览器中的cookie，如果有自动填入
const GetCookie = (): void => {
    if (document.cookie.length > 0) {
        const cookie: string[] = document.cookie.split('; ');
        cookie.forEach(function (element): void {
            const result: string[] = element.split('=');
            if (result[0] === 'username') {
                formValue.value.username = result[1];
            } else if (result[0] === 'password') {
                formValue.value.password = result[1];
            }
        });
    }
};
onMounted(() => {
    storage.remove('token');
    storage.remove('saveId');
    GetCookie();
});
/* 登录模块 */
const formRef: Ref = ref(null); // 登录信息表格
const needSave: Ref<boolean> = ref(true); // 是否记住账号密码
const SetCookie = (username: string, password: string, exdays: number): void => {
    const exdate: Date = new Date();
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
    window.document.cookie = `username` + `=${username};path=/;expires=${exdate.toUTCString()}`;
    window.document.cookie = `password` + `=${password};path=/;expires=${exdate.toUTCString()}`;
};
// 登录按钮点击事件，验证并发送请求
const PostLogin = (): void => {
    SetCookie('', '', -1);
    formRef.value.validate((errors: boolean) => {
        if (!errors) {
            loginAPI(
                qs.stringify({
                    username: formValue.value.username,
                    password: formValue.value.password
                })
            )
                .then((response: { access_token: string }) => {
                    window.$message.success('登录成功');
                    const token: string = response.access_token;
                    storage.set('token', token);
                    if (needSave.value) {
                        SetCookie(formValue.value.username, formValue.value.password, 7);
                    }
                    // setTimeout(() => {
                    // window.$router.push({ name: 'select-save' });
                    routerPush({name: 'select-save'});
                    // }, 1000);
                })
                .catch((_error: {}) => {
                });
        } else {
            window.$message.error('请正确输入信息');
        }
    });
};
defineExpose({formRef, formValue, rules, needSave, PostLogin});
</script>

<style scoped>
body {
    background-image: url('http://s1.s100.vip:13127/Public/background.png');
}

.loginDiv {
    text-align: center;
    width: 300px;
    height: 520px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.logo {
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
