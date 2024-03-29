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
        <n-form-item path="pwd">
            <n-input v-model:value="model.pwd" placeholder="密码"/>
        </n-form-item>
        <n-form-item path="confirmPwd">
            <n-input v-model:value="model.confirmPwd" placeholder="确认密码"/>
        </n-form-item>
        <n-space :size="18" :vertical="true">
            <login-agreement v-model:value="agreement"/>
            <n-button :block="true" :round="true" size="large" type="primary" @click="handleSubmit">确定</n-button>
            <n-button :block="true" :round="true" size="large" @click="toLoginModule('pwd-login')">返回</n-button>
        </n-space>
    </n-form>
</template>

<script lang="ts" setup>
import {reactive, ref, toRefs} from 'vue';
import type {FormInst, FormRules} from 'naive-ui';
import {LoginAgreement} from '@/components';
import {useRouterPush} from '@/composables';
import {useSmsCode} from '@/hooks';
import {formRules, getConfirmPwdRule} from '@/utils';

const {toLoginModule} = useRouterPush();
const {label, isCounting, loading: smsLoading, start} = useSmsCode();

const formRef = ref<(HTMLElement & FormInst) | null>(null);
const model = reactive({
    phone: '',
    code: '',
    pwd: '',
    confirmPwd: ''
});
const rules: FormRules = {
    phone: formRules.phone,
    code: formRules.code,
    pwd: formRules.pwd,
    confirmPwd: getConfirmPwdRule(toRefs(model).pwd)
};

const agreement = ref(false);

function handleSmsCode() {
    start();
}

function handleSubmit(e: MouseEvent) {
    if (!formRef.value) return;
    e.preventDefault();

    formRef.value.validate(errors => {
        if (!errors) {
            if (!agreement.value) return;
            window.$message?.success('验证成功');
        } else {
            window.$message?.error('验证失败');
        }
    });
}
</script>
<style scoped></style>
