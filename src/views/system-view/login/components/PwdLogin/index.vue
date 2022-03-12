<template>
    <n-form ref="formRef" :model="model" :rules="rules" :show-label="false" size="large">
        <n-form-item path="phone">
            <n-input v-model:value="model.phone" placeholder="请输入手机号码"/>
        </n-form-item>
        <n-form-item path="pwd">
            <n-input v-model:value="model.pwd" placeholder="请输入密码" show-password-on="click" type="password"/>
        </n-form-item>
        <n-space :size="24" :vertical="true">
            <div class="flex-y-center justify-between">
                <n-checkbox v-model:checked="rememberMe">记住我</n-checkbox>
                <n-button :text="true" @click="toLoginModule('reset-pwd')">忘记密码？</n-button>
            </div>
            <n-button
                :block="true"
                :loading="auth.loginLoding"
                :round="true"
                size="large"
                type="primary"
                @click="handleSubmit"
            >
                确定
            </n-button>
            <div class="flex-y-center justify-between">
                <n-button :block="true" class="flex-1" @click="toLoginModule('code-login')">
                    {{ EnumLoginModule['code-login'] }}
                </n-button>
                <div class="w-12px"></div>
                <n-button :block="true" class="flex-1" @click="toLoginModule('register')">
                    {{ EnumLoginModule.register }}
                </n-button>
            </div>
        </n-space>
        <other-login/>
    </n-form>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
import type {FormInst, FormRules} from 'naive-ui';
import {EnumLoginModule} from '@/enum';
import {useAuthStore} from '@/store';
import {useRouterPush} from '@/composables';
import {formRules} from '@/utils';
import {OtherLogin} from './components';

const auth = useAuthStore();
const {login} = useAuthStore();
const {toLoginModule} = useRouterPush();

const formRef = ref<(HTMLElement & FormInst) | null>(null);
const model = reactive({
    phone: '15170283876',
    pwd: 'abc123456'
});
const rules: FormRules = {
    phone: formRules.phone,
    pwd: formRules.pwd
};
const rememberMe = ref(false);

function handleSubmit(e: MouseEvent) {
    if (!formRef.value) return;
    e.preventDefault();

    formRef.value.validate(errors => {
        if (!errors) {
            const {phone, pwd} = model;
            login(phone, pwd, 'pwd');
        }
    });
}
</script>
<style scoped></style>
