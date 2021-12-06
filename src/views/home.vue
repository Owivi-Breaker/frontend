<template>
    <n-h2>球员列表</n-h2>
    <n-grid cols="2" x-gap="12">
        <n-gi>
            <PlayerCard></PlayerCard>
        </n-gi>
        <n-gi>
            <PlayerCard></PlayerCard>
        </n-gi>
        <n-gi>
            <PlayerCard></PlayerCard>
        </n-gi>
        <n-gi>
            <PlayerCard></PlayerCard>
        </n-gi>
        <n-gi>
            <PlayerCard></PlayerCard>
        </n-gi>
    </n-grid>
</template>

<script lang="ts" setup>
import PlayerCard from '@/components/PlayerCard.vue';
</script>