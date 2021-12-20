<template>
    <NextGameHome></NextGameHome>
    <n-grid cols="2" x-gap="20">
        <n-gi>
            <MailBoxHome></MailBoxHome>
        </n-gi>
    </n-grid>
</template>

<script lang="ts" setup>
import NextGameHome from "@/components/NextGameHome.vue";
import MailBoxHome from "@/components/MailBoxHome.vue";
</script>