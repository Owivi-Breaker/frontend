<template>
    <n-card class="mailCard" title="收件箱">
        <template #header-extra>
            <n-button v-on:click="goToMail()">查看更多</n-button>
        </template>
        <n-scrollbar style="max-height: 400px;">
            <MailBoxHomeItem v-for="item in mailList" v-if="!isLoading" v-bind:mail="item"></MailBoxHomeItem>
        </n-scrollbar>
    </n-card>
</template>
<script lang="ts" setup>
import { ref, onMounted, Ref } from "vue";
import MailBoxHomeItem from "@/components/Home/MailBoxItem.vue";
import { Router } from "vue-router";
let mailList: Ref<Array<Object>> = ref([]);
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
declare const window: Window & { $router: Router };
function goToMail(): void {
    window.$router.push({ name: "mail" });
}
</script>


<style>
.mailCard {
    height: 500px;
}
</style>