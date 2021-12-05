<template>
    <h1>球员列表</h1>
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
import PlayerCard from '@PlayerCard.vue';
</script>