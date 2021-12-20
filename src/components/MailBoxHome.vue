<template>
    <n-card title="收件箱">
        <template #header-extra>
            <n-button>查看更多</n-button>
        </template>
        <n-grid cols="1" x-gap="20">
            <n-gi v-for="item in mailList" v-if="!isLoading">
                <MailBoxHomeItem :mail="item"></MailBoxHomeItem>
            </n-gi>
        </n-grid>
    </n-card>
</template>
<script lang="ts" setup>
import { h, ref, onMounted } from "vue";
import { Ref } from "@vue/reactivity";
import MailBoxHomeItem from '@/components/MailBoxHomeItem.vue';
let mailList: Ref<Array<Object>> = ref([{}]);
let isLoading: Ref<boolean> = ref(true);
onMounted(
    () => {
        mailList.value = [
            {
                "title": "这是一封新邮件这是一封新邮件这是一封新邮件这是一封新邮件这是一封新邮件这是一封新邮件",
                "time": "2020-8-20",
                "read": true
            },
            {
                "title": "这是一封旧邮件",
                "time": "2020-8-19",
                "read": false
            },
        ];
        isLoading.value = false;
    }
);
let sss: Ref<string> = ref("ddd");
</script>