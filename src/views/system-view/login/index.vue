<template>
    <div class="flex justify-center items-center h-screen" :style="{ backgroundColor: bgColor }">
        <dark-mode-switch
            :dark="theme.darkMode"
            class="absolute left-48px top-24px z-3 text-20px"
            @update:dark="theme.setDarkMode"
        />
        <div class="relative s-card p-14 z-4">
            <!-- logo -->
            <icon-ion:md-football class="absolute z-4 w-13 h-13 text-primary top-5 left-5" />

            <div class="text-6xl font-bold italic text-primary mb-13 mt-5 text-center">
                <span class="underline decoration-teal-500 decoration-6">TieB</span>reaker
            </div>

            <!-- <p id="title">登录</p> -->
            <n-form id="form" ref="formRef" :model="formValue" :rules="rules" :show-label="false">
                <n-form-item label="用户名" path="username">
                    <n-input v-model:value="formValue.username" class="p-2" placeholder="账号" round />
                </n-form-item>

                <n-form-item label="密码" path="password">
                    <n-input
                        v-model:value="formValue.password"
                        class="p-2"
                        placeholder="密码"
                        type="password"
                        @keyup.enter="PostLogin"
                        round
                    />
                </n-form-item>
                <n-form-item>
                    <n-checkbox v-model:checked="needSave">记住我</n-checkbox>
                </n-form-item>
                <n-form-item>
                    <n-button
                        class="w-full py-5 text-lg font-bold"
                        attr-type="button"
                        secondary
                        round
                        type="primary"
                        size="large"
                        @click="PostLogin"
                    >登录</n-button>
                </n-form-item>
            </n-form>
<!--            <transition name="fade-slide" mode="out-in" appear>-->
<!--                <component :is="activeModule.component" />-->
<!--            </transition>-->
            <div class="mt-2">
                还没有账号？
                <a id="registerLink" href="/register">点我注册</a>
            </div>
        </div>
        <login-bg :theme-color="bgThemeColor" />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref, computed } from 'vue';
import { Router } from 'vue-router';
import qs from 'qs';
import { useRouterPush } from '@/composables';
import { storage } from '@/utils';
import { loginAPI } from '@/apis/login';
import { getColorPalette, mixColor } from '@/utils';
import { useThemeStore } from '@/store';
const { routerPush } = useRouterPush();
import { LoginBg } from './components';


const theme = useThemeStore();


const bgThemeColor = computed(() => (theme.darkMode ? getColorPalette(theme.themeColor, 7) : theme.themeColor));
const bgColor = computed(() => {
    const COLOR_WHITE = '#ffffff';
    const ratio = theme.darkMode ? 0.5 : 0.2;
    return mixColor(COLOR_WHITE, theme.themeColor, ratio);
});


const formValue: Ref<{ username: string; password: string }> = ref({ username: '', password: '' });
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
                    routerPush({ name: 'select-save' });
                    // }, 1000);
                })
                .catch((_error: {}) => {
                });
        } else {
            window.$message.error('请正确输入信息');
        }
    });
};
defineExpose({ formRef, formValue, rules, needSave, PostLogin });
</script>

<style scoped>
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
