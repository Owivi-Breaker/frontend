<template>
    <NextGameHome></NextGameHome>
    <n-grid cols="2" x-gap="20">
        <n-gi>
            <MailBoxHome></MailBoxHome>
        </n-gi>
        <n-gi>
            <PointsTableHome></PointsTableHome>
        </n-gi>
    </n-grid>
    <PlayGround></PlayGround>
</template>

<script lang="ts" setup>
import NextGameHome from "@/components/NextGameHome.vue";
import MailBoxHome from "@/components/MailBoxHome.vue";
import PointsTableHome from "@/components/PointsTableHome.vue";
import PlayGround from "@/components/PlayGround.vue";
</script>