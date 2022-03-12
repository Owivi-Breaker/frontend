<template>
    <n-form ref="formRef" :model="model" :rules="rules" :show-label="false" size="large">
        <n-form-item path="phone">
            <n-input v-model:value="model.phone" placeholder="手机号码"/>
        </n-form-item>
        <n-form-item path="code">
            <div class="flex-y-center w-full">
                <n-input v-model:value="model.code" placeholder="验证码"/>
                <div class="w-18px"></div>
                <n-button :disabled="isCounting" :loading="smsLoading" size="large" @click="handleSmsCode">
                    {{ label }}
                </n-button>
            </div>
        </n-form-item>
        <n-form-item path="imgCode">
            <n-input v-model:value="model.imgCode" placeholder="验证码,点击图片刷新"/>
            <div class="pl-8px">
                <image-verify v-model:code="imgCode"/>
            </div>
        </n-form-item>
        <n-space :size="18" :vertical="true">
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
            <n-button :block="true" :round="true" size="large" @click="toLoginModule('pwd-login')">返回</n-button>
        </n-space>
    </n-form>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
import type {FormInst} from 'naive-ui';
import {ImageVerify} from '@/components';
import {useAuthStore} from '@/store';
import {useRouterPush} from '@/composables';
import {useSmsCode} from '@/hooks';
import {formRules, getImgCodeRule} from '@/utils';

const auth = useAuthStore();
const {login} = useAuthStore();
const {toLoginModule} = useRouterPush();
const {label, isCounting, loading: smsLoading, getSmsCode} = useSmsCode();

const formRef = ref<(HTMLElement & FormInst) | null>(null);
const model = reactive({
    phone: '',
    code: '',
    imgCode: ''
});
const imgCode = ref('');
const rules = {
    phone: formRules.phone,
    code: formRules.code,
    imgCode: getImgCodeRule(imgCode)
};

function handleSmsCode() {
    getSmsCode(model.phone);
}

function handleSubmit(e: MouseEvent) {
    if (!formRef.value) return;
    e.preventDefault();

    formRef.value.validate(errors => {
        if (!errors) {
            const {phone, code} = model;
            login(phone, code, 'sms');
        }
    });
}
</script>
<style scoped></style>
