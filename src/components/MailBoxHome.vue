<template>
    <n-card class="mailCard" title="收件箱">
        <template #header-extra>
            <n-button v-on:click="goToMail()">查看更多</n-button>
        </template>
        <n-scrollbar x-scrollable style="max-height: 400px;">
            <p v-for="item in mailList" v-if="!isLoading">
                <MailBoxHomeItem v-bind:mail="item"></MailBoxHomeItem>
            </p>
        </n-scrollbar>
    </n-card>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Ref } from "@vue/reactivity";
import MailBoxHomeItem from "@/components/MailBoxHomeItem.vue";
import { Router, useRouter } from "vue-router";
let router: Router = useRouter();
let mailList: Ref<Array<Object>> = ref([{}]);
let isLoading: Ref<boolean> = ref(true);
onMounted(
    () => {
        // 发get给后端获取list
        mailList.value = [
            {
                "id": 1,
                "title": "这是一封新邮件这是一封新邮件这是一封新邮件这是一封新邮件这是一封新邮件这是一封新邮件",
                "time": "2020-8-20",
                "read": false
            },
            {
                "id": 0,
                "title": "这是一封旧邮件",
                "time": "2020-8-19",
                "read": true
            },
            {
                "id": 1,
                "title": "这是一封新邮件这是一封新邮件这是一封新邮件这是一封新邮件这是一封新邮件这是一封新邮件",
                "time": "2020-8-20",
                "read": false
            },
            {
                "id": 0,
                "title": "这是一封旧邮件",
                "time": "2020-8-19",
                "read": true
            },
            {
                "id": 1,
                "title": "这是一封新邮件这是一封新邮件这是一封新邮件这是一封新邮件这是一封新邮件这是一封新邮件",
                "time": "2020-8-20",
                "read": false
            },
            {
                "id": 0,
                "title": "这是一封旧邮件",
                "time": "2020-8-19",
                "read": true
            },
            {
                "id": 1,
                "title": "这是一封新邮件这是一封新邮件这是一封新邮件这是一封新邮件这是一封新邮件这是一封新邮件",
                "time": "2020-8-20",
                "read": false
            },
            {
                "id": 0,
                "title": "这是一封旧邮件",
                "time": "2020-8-19",
                "read": true
            },
        ];
        isLoading.value = false;
    }
);
function goToMail(): void {
    router.push({ name: "mail" });
}
</script>
<style>
.mailCard {
    height: 500px;
    min-width: 800px;
}
</style>