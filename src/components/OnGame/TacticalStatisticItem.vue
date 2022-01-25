<template>
    <div style="text-align:center;">
        <n-space justify="space-between">
            <div class="data">{{ props.player["data"][0] }}</div>
            <div class="title">{{ props.player["title"] }}</div>
            <div class="data">{{ props.player["data"][1] }}</div>
        </n-space>
        <n-progress :show-indicator="false" :percentage="proNumber" :border-radius="1" :color="'rgb(2, 155, 255)'" :rail-color="'rgb(211, 38, 129)'"></n-progress>
    </div>
</template>

<script lang="ts" setup>
    import { computed, ComputedRef } from "vue";
    let props: any = defineProps({
        player: Object
    });
    let proNumber: ComputedRef = computed(() => {
        return props.player["data"][0] / (props.player["data"][0] + props.player["data"][1]) * 100;
    });
</script>

<style scoped>
    .data {
        width: 20px
    }
</style>